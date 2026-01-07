// DEEPAK ----

const express = require("express");
const upload = require("../utils/fileUpload");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const {
  createBanner,
  deleteBanner,
  getBanners,
} = require("../controllers/banner.controller");

/** ADMIN */
router.post("/create", authenticateToken, upload.single("images"), createBanner);

// delete Service
router.delete("/delete/:id", authenticateToken, deleteBanner);

router.get("/slider", getBanners);

module.exports = router;
