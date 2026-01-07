const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const {
  createHelpSupport,
  getAllTickets,
  updateTicketStatus,
  deleteTicket,
} = require("../controllers/help_support.controller");

const { isAdmin, isProvider, isUser } = require("../middleware/authRole");

// USER ROUTES
router.post("/create", createHelpSupport);

// ADMIN ROUTES
router.get("/all", authenticateToken, isAdmin, getAllTickets);
router.put("/update/:ticketId", authenticateToken, isAdmin, updateTicketStatus);
router.delete("/delete/:ticketId", authenticateToken, isAdmin, deleteTicket);

module.exports = router;
