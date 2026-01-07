// DEEPAK ----

const express = require("express");
const {
  addOffer,
  updateOffer,
  deleteOffer,
  getAllOffers,
  getOfferById,
  checkCouponCode
} = require("../controllers/promo_offer.controller");
const router = express.Router();
const upload = require("../utils/fileUpload"); // assuming multer config here
const authenticateToken = require("../middleware/auth");

//***ADMIN */
router.post("/add-offer", authenticateToken,upload.single("offerImage"), addOffer);
router.post("/delete-offer/:offerId", authenticateToken, deleteOffer);
router.put("/update-offer/:offerId", authenticateToken, upload.single("offerImage"),updateOffer);

//**USER */
router.get("/offers", getAllOffers);
router.get("/offer/:offerId", getOfferById);
router.get("/checkCouponCode", checkCouponCode);

module.exports = router;
