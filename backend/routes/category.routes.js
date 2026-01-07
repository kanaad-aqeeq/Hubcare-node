// DEEPAK ----

const express = require("express");
const upload = require("../utils/fileUpload"); // assuming multer config here
const { createCategory, fetchCategory,deleteCategory, updateCategory,toggleStatus,fetchAllCategories,getProvidersByCategoryId} = require("../controllers/category.controller");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const { isAdmin, isProvider, isUser } = require("../middleware/authRole");

router.get("/list", fetchCategory);
router.get("/all-provider/:categoryId",getProvidersByCategoryId);
//** ADMIN */
router.get("/all-categories",authenticateToken,isAdmin, fetchAllCategories);
router.post("/create",authenticateToken,isAdmin, upload.single("categoryImage"), createCategory);
router.put("/update/:categoryId",authenticateToken,isAdmin, upload.single("categoryImage"), updateCategory);
router.put("/delete/:categoryId",authenticateToken,isAdmin,deleteCategory);
router.put("/toggle/:categoryId",authenticateToken,isAdmin, toggleStatus);

module.exports = router;
