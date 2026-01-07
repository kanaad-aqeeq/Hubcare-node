const express = require("express");

const authController = require("../controllers/auth.controller");
const upload = require("../utils/fileUpload");
const authenticateToken = require("../middleware/auth");
const router = express.Router();

router.post(
  "/signin",
  upload.fields([
    { name: "govtId", maxCount: 1 },
    { name: "supportingDocument", maxCount: 1 },
    { name: "nationalId", maxCount: 1 },
  ]),
  authController.signupController
);

router.post("/login", authController.login);

router.post("/send-otp", authController.sendOtpController);

router.post("/verify-otp", authController.verifyOtpController);

router.post("/social-login", authController.socialLogin);

router.put(
  "/update-profile",
  authenticateToken,
  upload.single("image"),
  authController.userUpdateProfile
);

router.put(
  "/update-provider-profile",
  authenticateToken,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "govtId", maxCount: 1 },
    { name: "supportingDocument", maxCount: 1 },
    { name: "nationalId", maxCount: 1 },
  ]),
  authController.providerUpdateProfile
);

router.put(
  "/change-password",
  authenticateToken,
  authController.changePassword
);

router.get(
  "/get-user-profile",
  authenticateToken,
  authController.getUserProfile
);

router.post("/logout",authenticateToken,authController.logOut);

router.post("/forgot-password", authController.forgotPassword);

// router.post("/reset-Password", otpController.resetPassword);

module.exports = router;
