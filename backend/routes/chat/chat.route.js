const express = require("express");
const chatController = require("../../controllers/chat/chat.controller");
const authenticateToken = require("../../middleware/auth");
const router = express.Router();

// Send a message to a group
// router.post('/send',authenticateToken ,chatController.sendMessage);
router.post('/send/:bookingId',authenticateToken ,chatController.sendMessage);

// Get all messages in a group
// router.get('/getmessages/:receiverId',authenticateToken, chatController.getMessages);
router.get('/getmessages/:bookingId',authenticateToken, chatController.getMessages);

// Mark message  read
router.post('/messageread/:messageId',authenticateToken, chatController.markMessageAsRead);

module.exports = router;

