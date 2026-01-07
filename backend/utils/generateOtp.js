const axios = require("axios");
// require("dotenv").config();
const db = require("../database/db");

const jwt = require("jsonwebtoken"); // Import JWT package

const generateOTP = () => Math.floor(1000 + Math.random() * 9000);

const sendOTP = async (phoneNumber, deviceType = null, deviceToken = null) => {
  try {
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60000);
    console.log("Generated OTP:", otp, "Expires At:", expiresAt);

    //  Store OTP in Database using db.Otp
    const res = await db.otp.create({
      phoneNumber,
      otp,
      deviceType,
      deviceToken,
    });
    console.log("OTP saved in database:", res);

    //  Prepare MSG91 API request
    const url = "https://control.msg91.com/api/v5/flow/";
    const data = {
      flow_id: process.env.MSG91_FLOW_ID, // Ensure this is defined in .env
      recipients: [
        {
          mobiles: `91${phoneNumber}`,
          var1: otp,
        },
      ],
    };

    // Call MSG91 API
    const response = await axios.post(url, data, {
      headers: {
        authkey: process.env.MSG91_AUTH_KEY,
        "Content-Type": "application/json",
      },
    });

    console.log("OTP Sent Successfully:", response.data);
    return { status: true, message: "OTP Sent Successfully!", otp: otp };
  } catch (error) {
    console.error(" OTP Sending Failed:", error.response?.data || error);
    throw new Error("Failed to send OTP.");
  }
};

const verifyOTP = async (phoneNumber, otp) => {
  try {
    const otpRecord = await db.otp.findOne({
      where: { phoneNumber },
      order: [['createdAt', 'DESC']], // Get the latest OTP
    });

    if (!otpRecord) {
      throw new Error("Invalid OTP.");
    }

    console.log("wwwwwwww");
    if (otpRecord.otp !== otp) {
      throw new Error("Incorrect OTP.");
    }
    // console.log("wwwwwwww")

    // Delete OTP after successful verification
    await db.otp.destroy({ where: { phoneNumber } });

    // Check if user already exists
    let user = await db.user.findOne({ where: { phone: phoneNumber } });
    console.log("user===========", user);

    if (!user) {
      user = await db.user.create({ phone: phoneNumber, role: "User" });
      console.log("New user created:", user);
    }
    if (user) {
      console.log("User already exists.", user);
    }
    console.log("oooooooooooo", user.id);

    // Check if the user has a complete profile
    const isProfile = user.name || user.email ? 1 : 0;

    console.log("User:", user.id, "isProfile:", isProfile);
    // Generate JWT Token
    const token = jwt.sign({ id: user.id,role:user.role }, process.env.JWT_SECRET, {
      expiresIn: "9h",
    });

    return {
      status: true,
      message: "OTP Verified Successfully!",
      token,
      isProfile,
    };
  } catch (error) {
    console.error("Error verifying OTP:", error.message);
    return { status: false, message: error.message };
  }
};

// module.exports = verifyOTP;

module.exports = { sendOTP, verifyOTP };
