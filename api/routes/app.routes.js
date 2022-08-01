const restaurantController = require("../controllers/restaurant.controller");
const cuisinesController = require("../controllers/cuisines.controller");
const express = require("express");
const router = express.Router();

/* Restaurant Route */
// Create a new Restaurant
router.post("/restaurant", restaurantController.create);
// Attach Restaurant Document and Other Details Add
router.put("/restaurant/attachdocument/:id", restaurantController.attachDocument);
// Update Restaurant Basic Details by Partner
router.put("/restaurant/:restaurantId", restaurantController.updateBasicDetailsByPartner);
// Update Restaurant Document by Admin
// router.put("/restaurant/updatedocument/:restaurantId", restaurantController.);

/* Cuisines Route */
// Create a new Cuisines
router.post("/cuisines", cuisinesController.create);
module.exports = router;