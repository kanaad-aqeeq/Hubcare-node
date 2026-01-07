// DEEPAK ----

const express = require("express");
const upload = require("../utils/fileUpload");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const {
  createSlider,
  updateSlider,
  deleteSlider,
  getSlider,
} = require("../controllers/slider.controller");

/** ADMIN */
router.post("/create", authenticateToken, upload.array("images"), createSlider);

// Update Service
router.put(
  "/update",
  authenticateToken,
  upload.array("images"),
  updateSlider
);

// delete Service
router.put("/delete", authenticateToken, deleteSlider);

router.get("/slider", getSlider);

module.exports = router;
