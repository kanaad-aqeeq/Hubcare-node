// DEEPAK ----

const express = require("express");
const authenticateToken = require("../middleware/auth");
const { locationAdd, getLocation,getLocationById, deleteLocationById } = require("../controllers/user_locations.controller");
const router = express.Router();

//***User */
router.post("/add-location", authenticateToken, locationAdd);
router.get("/get-location", authenticateToken, getLocation);
router.get("/location/:locationId", authenticateToken, getLocationById);
router.post("/delete-location/:locationId", authenticateToken, deleteLocationById);

module.exports = router;
