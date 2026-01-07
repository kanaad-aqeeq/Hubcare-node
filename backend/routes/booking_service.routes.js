// DEEPAK ----

const express = require("express");
const upload = require("../utils/fileUpload");
const {
  addBooking,
  cancelBooking,
  approveBookingRequest,
  getUserBookings,
  confirmCashPayment,
  getProviderBookings,
  assignWorkerToBooking,
  assignSingleWorker,
  getBookingStatus,
  getAssignedWorkers,
  getBookingDetailsById,
  getUserBookingDetailsById,
  bookingAction,
} = require("../controllers/booking_service.controller");
const router = express.Router();
const authenticateToken = require("../middleware/auth");

/// *** User
router.post(
  "/confirm-cashPayment/:bookingId",
  authenticateToken,
  confirmCashPayment
); // Cash Paymet Done Service
router.post("/add-booking/:serviceId", authenticateToken, addBooking); //Add Booking
router.post("/booking-action/:bookingId", authenticateToken, bookingAction); // Booking Start and Complete
router.post("/cancel-booking/:bookingId", authenticateToken, cancelBooking); // Both Provider & User Cancel
router.get("/bookings", authenticateToken, getUserBookings); // user all Booking
router.get("/booking-details/:id", authenticateToken, getBookingDetailsById); // Booking Details
router.get("/booking-status/:bookingId", authenticateToken, getBookingStatus); // user all Booking
router.get("/assigned-workers/:bookingId", authenticateToken, getAssignedWorkers); //Booking Id Based assigned workers fetch

//// ** Provider ----
router.get("/provider-bookings", authenticateToken, getProviderBookings); // Provider Base all Booking
router.get("/user-booking-details/:id", authenticateToken, getUserBookingDetailsById); // Booking Details
router.put("/approve-bookings/:bookingId", authenticateToken, approveBookingRequest); // Provider Approve Booking
router.post("/assignWorker-multi-bookings/:bookingId", authenticateToken, assignWorkerToBooking); // Provider Assign Multiple Worker Booking
router.post("/assignWorker-single-bookings/:bookingId", authenticateToken, assignSingleWorker); // Provider Assign Single Worker Booking

module.exports = router;
