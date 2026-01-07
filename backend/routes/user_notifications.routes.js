// DEEPAK ----

const express = require("express");
const authenticateToken = require("../middleware/auth");
const {
    getAllNotifications,
    getAllNotificationCount,
    markNotificationClicked,
    markNotificationConverted,
    sendNotification,
  } = require("../controllers/user_notifications.controller");
const router = express.Router();


router.get("/all-notifications", authenticateToken, getAllNotifications); // All Notifications 
router.get("/notification-count", authenticateToken, getAllNotificationCount); //Count Noutifications
router.get("/mark-clicked/:id", authenticateToken, markNotificationClicked); //Count Noutifications
router.get("/mark-converted/:id", authenticateToken, markNotificationConverted); //Count Noutifications

// Not uses this Api
router.get("/send-notification", sendNotification); //Only Checking 

module.exports = router;
