// DEEPAK ----

const express = require("express");
const authenticateToken = require("../middleware/auth");
const {
  getWalletByUserId,
  latestWalletTransactions,
  addToWallet,
} = require("../controllers/wallet.controller");
const router = express.Router();

router.post("/add-to-wallet", authenticateToken, addToWallet);

// GET /wallet
router.get("/my-wallet", authenticateToken, getWalletByUserId);


// Get latest wallet transactions
router.get("/latest-transactions", authenticateToken, latestWalletTransactions);

/// Skip-case Payment
const { addToWalletlink,skipCashWebhook } = require("../utils/payment");
router.post("/payment-url",authenticateToken,addToWalletlink);
router.post("/skipcash/webhook", skipCashWebhook);
module.exports = router;
