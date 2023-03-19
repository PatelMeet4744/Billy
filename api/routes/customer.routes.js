const { authenticateToken } = require("../middleware/auth");
const express = require("express");
const router = express.Router();

const cuisinesController = require("../controllers/cuisines.controller");
const bannerController = require("../controllers/banner.controller");
const restaurantController = require("../controllers/restaurant.controller");

/* Banner Route */
// Retrieve all Banner By Customer
router.get("/customer/banner", [authenticateToken], bannerController.findAllBanner);

/* Cuisines Route */
// Retrieve all Cuisines By Customer
router.get("/customer/cuisines", [authenticateToken], cuisinesController.findAllCuisines);

/* Restaurant Route */
// Retrieve all Restaurant By Customer
router.get("/customer/restaurant", [authenticateToken], restaurantController.findAllRestaurant);
// Retrive Restaurant By Cuisines
router.get("/customer/restaurant/cuisines/:id", [authenticateToken], restaurantController.getRestaurantbyCuisines);

module.exports = router;