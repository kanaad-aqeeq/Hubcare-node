const { v4 } = require("uuid");
const cryptojs = require("crypto-js");
const {
  wallet,
  wallet_transaction,
  user,
  sequelize,
  wallet_payment_request,
} = require("../database/db");

// Production Test
const paymentGatewayDetails = {
  sandboxURL: process.env.SKIPCASH_TEST_SANDBOX_URL, // Replace with the actual sandbox URL
  productionURL: process.env.SKIPCASH_TEST_PRODUCTION_URL, // Replace with the actual production URL
  secretKey:process.env.SKIPCASH_TEST_KEY_SECRET, // Replace with the actual secretKey
  keyId: process.env.SKIPCASH_TEST_KEY_ID, // Replace with the actual keyId
  clientId:process.env.SKIPCASH_TEST_CLIENT_ID, // Replace with the actual clientId
};

const webhookStatus = {
  0: "new",
  1: "pending",
  2: "paid",
  3: "canceled",
  4: "failed",
  5: "rejected",
  6: "refunded",
  7: "pending refund",
  8: "refund failed",
};

// ========== Generate Payment Link ==========
const validatePhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, ""); // remove all non-digit characters
  return cleaned.length >= 10 && cleaned.length <= 15 ? cleaned : null;
};
const generatePaymentRequest = async (user, amount) => {
  const [firstName = "", lastName = ""] = user.name
    ? user.name.split(" ")
    : ["User", "Hube"];
  const paymentUid = v4(); // This will be used as our main payment UID
  const paymentDetails = {
    Uid: paymentUid,
    KeyId: paymentGatewayDetails.keyId,
    Amount: String(amount),
    FirstName: firstName,
    LastName: lastName,
    Phone: cleanedPhone,
    Email: user.email || "noemail@example.com",
    Street: user.companyaddress || "123 Maple Avenue",
    City: "Toronto",
    State: "ON",
    Country: "CA",
    PostalCode: "M5H 2N2",
    TransactionId: `TRA-${Date.now()}`,
    Custom1: "Wallet",
  };

  const combinedData = Object.entries(paymentDetails)
    .map(([key, value]) => `${key}=${value}`)
    .join(",");

  const hash = cryptojs.HmacSHA256(
    combinedData,
    paymentGatewayDetails.secretKey
  );
  const signature = cryptojs.enc.Base64.stringify(hash);

  const response = await fetch(
    `${paymentGatewayDetails.sandboxURL}/api/payments`,
    {
      method: "POST",
      headers: {
        Authorization: signature,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentDetails),
    }
  );

  const data = await response.json();
  return { data, uid: paymentUid };
};


///// Skip Case-----
// ========== Create Wallet Recharge Request ==========
const addToWalletlink = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.user.id;
    const { amount, description } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ status: false, message: "Invalid amount" });
    }

    const currentUser = await user.findByPk(userId);
    if (!currentUser) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const { data: paymentData, uid } = await generatePaymentRequest(
      currentUser,
      amount
    );

    if (!paymentData.resultObj || paymentData.returnCode !== 200) {
      return res.status(400).json({
        status: false,
        message: paymentData.errorMessage || "Payment request failed",
        details: paymentData,
      });
    }

    await wallet_payment_request.create(
      {
        id: uid,
        userId,
        amount,
        status: "PENDING",
        merchant_reference_id: paymentData.resultObj?.merchantReference || uid,
        skipcash_payment_id: paymentData.resultObj?.id,
        payment_url: paymentData.resultObj?.payUrl,
        description: description || "Wallet recharge via SkipCash",
      },
      { transaction: t }
    );

    await t.commit();
    return res.status(200).json({
      status: true,
      message: "Payment request created successfully",
      payUrl: paymentData.resultObj?.payUrl,
      uid,
    });
  } catch (error) {
    await t.rollback();
    console.error("Add to wallet error:", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// ========== Webhook Handler ==========
const skipCashWebhook = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { PaymentId, StatusId } = req.body;

    if (!PaymentId || StatusId === undefined) {
      return res.status(400).json({
        status: false,
        message: "Missing PaymentId or StatusId",
      });
    }

    const paymentRecord = await wallet_payment_request.findOne({
      where: { skipcash_payment_id: PaymentId },
    });

    if (!paymentRecord || paymentRecord.status === "COMPLETED") {
      return res.status(404).json({
        status: false,
        message: "Invalid or already processed payment",
      });
    }

    // If payment failed or is not yet "paid"
    if (parseInt(StatusId) !== 2) {
      paymentRecord.status = "FAILED";
      await paymentRecord.save({ transaction: t });
      await t.commit();
      return res.status(200).json({
        status: true,
        message: `Payment not successful. Current statusId: ${StatusId}`,
      });
    }

    // Find or create user wallet
    let userWallet = await wallet.findOne({
      where: { userId: paymentRecord.userId },
      transaction: t,
    });

    if (!userWallet) {
      userWallet = await wallet.create(
        { userId: paymentRecord.userId, balance: 0.0 },
        { transaction: t }
      );
    }

    // Update wallet balance
    userWallet.balance =
      parseFloat(userWallet.balance) + parseFloat(paymentRecord.amount);
    await userWallet.save({ transaction: t });

    // Add wallet transaction entry
    await wallet_transaction.create(
      {
        userId: paymentRecord.userId,
        amount: paymentRecord.amount,
        type: "CREDIT",
        description:
          paymentRecord.description || "Wallet recharge via SkipCash",
      },
      { transaction: t }
    );

    // Update payment status
    paymentRecord.status = "COMPLETED";
    await paymentRecord.save({ transaction: t });

    await t.commit();
    return res.status(200).json({
      status: true,
      message: "Wallet updated via webhook",
    });
  } catch (error) {
    await t.rollback();
    console.error("Webhook error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ========== Exports ==========
module.exports = {
  addToWalletlink,
  skipCashWebhook,
};
