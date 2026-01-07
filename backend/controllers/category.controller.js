// DEEPAK ----

const db = require("../database/db");
const { categories ,user, subCategory_services,review_ratings} = db;
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");

const fetchCategory = async (req, res) => {
  try {
    const allCategories = await categories.findAll({
      // where: { isActive: true }, // Only fetch active categories
    });

    return res.status(201).json({
      status: true,
      message: "Category fetch successfully.",
      data: allCategories,
    });
  } catch (error) {
    console.error("Fetch Category Error:", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong while creating the category.",
      error: error.message,
    });
  }
};

const getProvidersByCategoryId1 = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({
        status: false,
        message: "categoryId is required in params.",
      });
    }

    // Fetch all approved providers from the specified category
    const providers = await user.findAll({
      where: {
        // categoryId: {
        //   [Op.contains]: [categoryId], // This works with PostgreSQL arrays
        // },
        categoryId,
        role: "Provider",
        // isApproved: true, // Optional: Only show approved providers
      },
      attributes: {
        exclude: ["password", "device_token"], // Optional: Hide sensitive fields
      },
      include: [
        {
          association: "category", // From User.associate
          attributes: ["id", "categoryName"],
        },
        {
          association: "user_locations",
        },
      ],
    });

    if (!providers.length) {
      return res.status(404).json({
        status: false,
        message: "No providers found for this category.",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Providers fetched successfully.",
      data: providers,
    });
  } catch (error) {
    console.error("Get Providers Error:", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong while fetching providers.",
      error: error.message,
    });
  }
};

// Fix Filter Based on CategoryId By Fetch Providers
const getProvidersByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const {
      minPrice,
      maxPrice,
      minRating, // सिर्फ minRating use होगा
      sortBy = "createdAt",
      sortOrder = "DESC",
      searchText = "",
      priceSort, // "low" | "high"
      ratingSort, // "low" | "high"
      page = 1,
      limit = 10,
    } = req.query;

    if (!categoryId) {
      return res.status(400).json({
        status: false,
        message: "categoryId is required in params.",
      });
    }

    // 👉 Step 1: Fetch all providers of this category
    let providers = await user.findAll({
      where: {
        categoryId,
        role: "Provider",
      },
      attributes: { exclude: ["password", "device_token"] },
      include: [
        { association: "category", attributes: ["id", "categoryName"] },
        { association: "user_locations" },
        {
          association: "subCategory_services",
          attributes: ["serviceName", "servicePrice"],
        },
      ],
      order: [[sortBy, sortOrder]],
    });

    if (!providers.length) {
      consooe.log("No providers found in this category");
      return res.status(404).json({
        status: false,
        message: "No providers found for this category.",
      });
    }

    // 👉 Step 2: Price + search filter (service level)
    providers = providers.filter((p) => {
      const services = p.subCategory_services || [];

      // searchText filter
      if (
        searchText &&
        !services.some((s) =>
          s.serviceName?.toLowerCase().includes(searchText.toLowerCase())
        )
      ) {
        return false;
      }

      const prices = services.map((s) => s.servicePrice).filter((x) => x != null);
      if (!prices.length) return false;

      const providerMin = Math.min(...prices);
      const providerMax = Math.max(...prices);

      // price filter
      if (minPrice && providerMax < +minPrice) return false;
      if (maxPrice && providerMin > +maxPrice) return false;

      return true;
    });

    if (!providers.length) {
      console.log("No providers after price/search filter");
      return res.status(404).json({
        status: false,
        message: "No providers found with given filters.",
      });
    }

    // 👉 Step 3: Reviews लाओ
    const providerIds = providers.map((p) => p.id);
    const reviews = await review_ratings.findAll({
      where: { providerId: { [Op.in]: providerIds } },
      attributes: ["providerId", "rating"],
      raw: true,
    });

    const providerRatings = {};
    reviews.forEach((r) => {
      if (!providerRatings[r.providerId]) providerRatings[r.providerId] = [];
      providerRatings[r.providerId].push(r.rating);
    });

    // 👉 Step 4: Compute price range + rating per provider
    let providersWithExtra = providers.map((p) => {
      const ratings = providerRatings[p.id] || [];
      const totalReviews = ratings.length;
      const averageRating = totalReviews
        ? parseFloat(
            (
              ratings.reduce((sum, r) => sum + r, 0) / totalReviews
            ).toFixed(2)
          )
        : 0;

      const prices = p.subCategory_services
        .map((s) => s.servicePrice)
        .filter((x) => x != null);
      const minServicePrice = prices.length ? Math.min(...prices) : 0;
      const maxServicePrice = prices.length ? Math.max(...prices) : 0;

      const providerJson = p.toJSON();
      delete providerJson.subCategory_services;

      return {
        ...providerJson,
        averageRating,
        totalReviews,
        minServicePrice,
        maxServicePrice,
      };
    });

    // 👉 Step 5: Rating filter (सिर्फ minRating से)
    providersWithExtra = providersWithExtra.filter((p) => {
      if (minRating && p.averageRating < +minRating) return false;
      return true;
    });

    if (!providersWithExtra.length) {
      console.log("No providers after rating filter");
      return res.status(404).json({
        status: false,
        message: "No providers found with given rating filters.",
      });
    }

    const totalProviders = providersWithExtra.length;

    // 👉 Step 6: Sorting
    if (priceSort === "low") {
      providersWithExtra = providersWithExtra.sort(
        (a, b) => a.minServicePrice - b.minServicePrice
      );
    } else if (priceSort === "high") {
      providersWithExtra = providersWithExtra.sort(
        (a, b) => b.maxServicePrice - a.maxServicePrice
      );
    }

    if (ratingSort === "low") {
      providersWithExtra = providersWithExtra.sort(
        (a, b) => a.averageRating - b.averageRating
      );
    } else if (ratingSort === "high") {
      providersWithExtra = providersWithExtra.sort(
        (a, b) => b.averageRating - a.averageRating
      );
    }

    // 👉 Step 7: Apply pagination
    const start = (page - 1) * limit;
    const end = start + parseInt(limit);
    const paginatedProviders = providersWithExtra.slice(start, end);

    return res.status(200).json({
      status: true,
      message: "Providers fetched successfully.",
      totalProviders,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalProviders / limit),
      data: paginatedProviders,
    });
  } catch (error) {
    console.error("Get Providers Error:", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong while fetching providers.",
      error: error.message,
    });
  }
};

//** ADMIN */
const createCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ status: false, errors: errors.array() });
    }

    const { categoryName } = req.body;

    // Required field check
    if (!categoryName) {
      return res.status(400).json({
        status: false,
        message: "categoryName is required.",
      });
    }

    // Image validation
    if (!req.file) {
      return res.status(400).json({
        status: false,
        message: "Category image is required.",
      });
    }
    // Base URL for images
    const BASE_URL = `/public/images/`;

    // Extract filenames
    const categoryImage = `${BASE_URL}${req.file.filename}`;

    // Create category
    const newCategory = await categories.create({
      categoryName,
      categoryImage,
    });

    return res.status(201).json({
      status: true,
      message: "Category created successfully.",
      data: newCategory,
    });
  } catch (error) {
    console.error("Create Category Error:", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong while creating the category.",
      error: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Validate ID
    if (!categoryId) {
      return res.status(400).json({
        status: false,
        message: "A valid categoryId is required in params.",
      });
    }

    // Check if category exists
    const category = await categories.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({
        status: false,
        message: "Category not found.",
      });
    }

    // Delete category
    await category.destroy();

    return res.status(200).json({
      status: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Category Error:", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong while deleting the category.",
      error: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({
        status: false,
        message: "A valid categoryId is required in params.",
      });
    }

    const category = await categories.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({
        status: false,
        message: "Category not found.",
      });
    }

    const uploadedFile = req.file;
    console.log(uploadedFile);
    const categoryName = req.body.categoryName;

    // Check if at least one field is provided
    if (!categoryName && !uploadedFile) {
      return res.status(400).json({
        status: false,
        message:
          "At least one field (categoryName or categoryImage) must be provided to update.",
      });
    }

    const updateData = {};

    if (categoryName) {
      updateData.categoryName = categoryName;
    }

    if (uploadedFile) {
      const BASE_URL = `/public/images/`;
      const categoryImagePath = `${BASE_URL}${uploadedFile.filename}`;
      updateData.categoryImage = categoryImagePath;
    }

    await categories.update(updateData, {
      where: { id: categoryId },
    });

    return res.status(200).json({
      status: true,
      message: "Category updated successfully!",
    });
  } catch (error) {
    console.error("Category Update Error:", error);
    return res.status(500).json({
      status: false,
      error: "Internal server error",
      details: error.message,
    });
  }
};

const toggleStatus = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({
        status: false,
        message: "A valid categoryId is required in params.",
      });
    }

    const category = await categories.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({
        status: false,
        message: "Category not found.",
      });
    }

    // Toggle isActive value
    const updatedStatus = !category.isActive;

    await categories.update(
      { isActive: updatedStatus },
      { where: { id: categoryId } }
    );

    return res.status(200).json({
      status: true,
      message: `Category status toggled to ${
        updatedStatus ? "Active" : "Inactive"
      } successfully!`,
      data: { isActive: updatedStatus },
    });
  } catch (error) {
    console.error("Category Update Error:", error);
    return res.status(500).json({
      status: false,
      error: "Internal server error",
      details: error.message,
    });
  }
};

const fetchAllCategories = async (req, res) => {
  try {
    const { searchText = "", page = 1, limit = 10 } = req.query;
    const whereCondition = {};

    const offset = (page - 1) * limit;
    if (searchText) {
      whereCondition.categoryName = { [Op.iLike]: `%${searchText}%` };
    }

    const { rows: allCategories, count: totalCount } = await categories.findAndCountAll(
      {
        where: whereCondition,
        order: [["createdAt", "DESC"]],
        limit: parseInt(limit),
        offset: parseInt(offset),
      }
    );

    const totalPages = Math.ceil(totalCount / limit);
    return res.status(201).json({
      status: true,
      message: "Category fetch successfully.",
      data: allCategories,
      totalCount,
      page: parseInt(page),
      totalPages,
    });
  } catch (error) {
    console.error("Fetch Category Error:", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong while creating the category.",
      error: error.message,
    });
  }
};

module.exports = {
  createCategory,
  fetchCategory,
  deleteCategory,
  updateCategory,
  toggleStatus,
  fetchAllCategories,
  getProvidersByCategoryId,
};
