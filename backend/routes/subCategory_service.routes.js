// DEEPAK ----

const express = require("express");
const upload = require("../utils/fileUpload");
const {
  createService,
  getServicesBySubCategory,
  getServices,
  getAllServices,
  updateServiceRating,
  deleteService,
  updateService,
  togglePromoCode,
  getServicesByProvider,
  getBestServices,
  getServicesUsed,
  getRecommendedServices,
  getonlyServicesByProvider
} = require("../controllers/subCategory_service.controller");
const router = express.Router();
const authenticateToken = require("../middleware/auth");

/** PROVIDER */
router.post(
  "/create/:subCategoryId",
  authenticateToken,
  upload.array("serviceImages"),
  createService
);

// Update Service
router.put(
  "/update/:serviceId",
  authenticateToken,
  upload.array("serviceImages"),
  updateService
);

// delete Service
router.put("/delete/:serviceId", authenticateToken, deleteService);

router.post("/toggle-promo/:serviceId", authenticateToken, togglePromoCode);

/** USER */

// Fetch subcategories for a category by ID
router.get("/category/:subCategoryId", getServicesBySubCategory);

// fetch only service
router.get("/service/:serviceId", getServices);

// fetch all service
router.get("/services", getAllServices);

// Get Services Based for Provider
router.get("/services/provider/:providerId", getServicesByProvider);
router.get("/only-services/provider/:providerId", getonlyServicesByProvider); //only service

// Best Services Provider
router.get("/our-best-services", getBestServices);

// Services used fetch
router.get("/services-used", authenticateToken, getServicesUsed);

// Recommended Services used fetch
router.get("/recommended-services", authenticateToken, getRecommendedServices);

//update Rating
router.put("/rating/:serviceId", updateServiceRating);

module.exports = router;
