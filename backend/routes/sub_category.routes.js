// DEEPAK ----

const express = require("express");
const upload = require("../utils/fileUpload");
const {
  getCategoryWithSubCategories,
  getProvidersBySubCategoryId,
  getSubCategoriesByProviderId,
  createSubCategory,
  deleteSubCategory,
  updateSubCategory,
  toggleStatus,
  fetchAllSubCategories,
} = require("../controllers/sub_category.controller");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const { isAdmin, isProvider, isUser } = require("../middleware/authRole");

// Fetch subcategories for a category by ID
router.get("/category/:categoryId", getCategoryWithSubCategories);

// All Providers fetched with SubCategoryId Based
router.get("/get-Providers/:subCategoryId", getProvidersBySubCategoryId );

// All SubCategories fetched with ProviderId Based
router.get("/get-subCategories/:providerId", getSubCategoriesByProviderId );

//** ADMIN */
// Get All subcategory
router.get(
  "/all-subCategories",
  authenticateToken,
  isAdmin,
  fetchAllSubCategories
);

// Create a new subcategory
router.post(
  "/create/:categoryId",
  authenticateToken,
  isAdmin,
  upload.single("subCategoryImage"),
  createSubCategory
);

// Update subcategory
router.put(
  "/update/:subCategoryId",
  authenticateToken,
  isAdmin,
  upload.single("subCategoryImage"),
  updateSubCategory
);

// Delete subcategory
router.put(
  "/delete/:subCategoryId",
  authenticateToken,
  isAdmin,
  deleteSubCategory
);

// Toggle status of subcategory
router.put("/toggle/:subCategoryId", authenticateToken, isAdmin, toggleStatus);

module.exports = router;
