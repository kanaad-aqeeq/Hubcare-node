// DEEPAK ----

const express = require("express");
const {
  submitReview,
  getReviewsByService,
} = require("../controllers/reviewRating.controller");
const router = express.Router();
const authenticateToken = require("../middleware/auth");

// Submit Rating & Review
router.post("/submitReview/:providerId", authenticateToken, submitReview);

router.get("/review/:providerId", getReviewsByService);
module.exports = router;
