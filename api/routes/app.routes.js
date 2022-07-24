const restaurantController = require("../controllers/restaurant.controller");
const cuisinesController = require("../controllers/cuisines.controller");
const express = require("express");
const router = express.Router();

/* Restaurant Route */
// Create a new Restaurant
router.post("/restaurant", restaurantController.create);
// Attach Restaurant Document and Other Details Add
router.put("/restaurant/document/:id", restaurantController.attachDocument);

/* Cuisines Route */
// Create a new Cuisines
router.post("/cuisines", cuisinesController.create);
module.exports = router;