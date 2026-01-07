const express = require("express");
const router = express.Router();
const {
  getPrivacyPolicy,
  createPrivacyPolicy,
  updatePrivacyPolicy,
  deletePrivacyPolicy,
} = require("../controllers/privacy_policy.controller");

const authenticateToken = require("../middleware/auth");
const { isAdmin } = require("../middleware/authRole");

router.get("/policy", getPrivacyPolicy);

//** ADMIN */
router.post("/create", authenticateToken, isAdmin, createPrivacyPolicy);
router.put("/update", authenticateToken, isAdmin, updatePrivacyPolicy);
router.delete("/delete", authenticateToken, isAdmin, deletePrivacyPolicy);

module.exports = router;
