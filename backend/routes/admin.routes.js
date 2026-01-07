// DEEPAK ----

const express = require("express");
const upload = require("../utils/fileUpload");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const { isAdmin, isProvider, isUser } = require("../middleware/authRole");
const {
  getAdminDashboard,
  getAllUser,
  getUserDetails,
  getAllVendor,
  getAllBookingsHistory,
  getCustomerActivity,
  getCustomerFeedbackReport,
  getVendoreDashbord,
  getPerformanceReports,
  getUserDeviceOsReport,
  getProviderPerformanceReport,
  getPayoutReport,
  getOnboardingReport,
  getRevenueReport,
  providerTransactionReport,
  commissionReport,
  texReport,
  getUserEngagementReport,
  getPushNotificationReport,
  getPromoCampaignReport,
  customerComplaintsReport,
  serviceProviderIssuesReport,
  toggleUserStatus,
  getBookingList,
  supportList,
} = require("../controllers/admin.controller");
const {
  getBookingDetailsByUserId,
  getProviderIdBookings,
  getBookingOverAllHistoryByUserId,
  getBookingDetailById
} = require("../controllers/booking_service.controller");
const { transactionSummary } = require("../controllers/wallet.controller");
router.get("/dashboard", authenticateToken, isAdmin, getAdminDashboard);

// User Base Api
router.get("/all-user", authenticateToken, isAdmin, getAllUser); // All User
router.get("/single-user/:id", authenticateToken, isAdmin, getUserDetails); // User & Provider
router.get(
  "/user-overall-booking-history/:id",
  authenticateToken,
  isAdmin,
  getBookingOverAllHistoryByUserId
); // Booking Details of User Id
router.put("/toggle-user-status/:id", authenticateToken, toggleUserStatus); // Toggle User Status
router.get(
  "/booking-detail/:bookingId",
  authenticateToken,
  isAdmin,
  getBookingDetailById
); 
router.get(
  "/user-booking-details/:id",
  authenticateToken,
  isAdmin,
  getBookingDetailsByUserId
); // Booking Details of User Id


// Vendor Base Api
router.get("/all-vendor", authenticateToken, isAdmin, getAllVendor); // All Provider
router.get("/vendor-dashboard/:providerId", authenticateToken, isAdmin, getVendoreDashbord); // All Provider
router.get("/provider-bookings/:providerId",authenticateToken, isAdmin, getProviderIdBookings); // Provider id Base all Booking
router.get("/transaction-summary/:userId",authenticateToken, isAdmin, transactionSummary); // Provider id Base all Booking


// Customer Page 
router.get("/booking-history", authenticateToken, isAdmin, getAllBookingsHistory); // All Booking History
router.get("/customer-activity", authenticateToken, isAdmin, getCustomerActivity); // Customer Activity   // Abhi work krna h 
router.get("/customer-feedback-report", authenticateToken, isAdmin, getCustomerFeedbackReport); // Customer Feedback Report

//System Reports
router.get("/performance-report",authenticateToken, isAdmin,getPerformanceReports);
router.get("/device-os-report",authenticateToken, isAdmin,getUserDeviceOsReport);

// Booking List
router.get("/booking-list",authenticateToken, isAdmin,getBookingList);

// Marketing Page
router.get("/promo-campaign-report",authenticateToken, isAdmin, getPromoCampaignReport);
router.get("/user-engagement-report",authenticateToken, isAdmin, getUserEngagementReport);
router.get("/push-notification-report",authenticateToken, isAdmin, getPushNotificationReport);

// Services Page
router.get("/provider-performance-report", authenticateToken, isAdmin,getProviderPerformanceReport ); // All Services
router.get("/payout-report", authenticateToken, isAdmin,getPayoutReport ); // All Services
router.get("/onboarding-report", authenticateToken, isAdmin,getOnboardingReport ); // All Services

// Support Report
router.get("/support-list", authenticateToken, isAdmin,supportList ); // Support Report
router.get("/customer-complaints-report", authenticateToken, isAdmin,customerComplaintsReport ); // Support Report
router.get("/service-provider-issues-report", authenticateToken, isAdmin,serviceProviderIssuesReport ); // Support Report

// // Financial
router.get("/revenue-report", authenticateToken, isAdmin,getRevenueReport ); 
router.get("/transaction-report",authenticateToken, isAdmin,providerTransactionReport);
router.get("/commission-report",authenticateToken, isAdmin,commissionReport);
router.get("/tax-report",authenticateToken, isAdmin,texReport);

module.exports = router;
