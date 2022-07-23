const restaurantController = require("../controllers/restaurant.controller");
const express = require("express");
const router = express.Router();

/* Restaurant Route */
// Create a new Add Extra
router.post("/restaurant", restaurantController.create);
router.put("/restaurant/document/:id", restaurantController.attachDocument);
module.exports = router;