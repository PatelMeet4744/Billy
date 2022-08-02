const restaurantController = require("../controllers/restaurant.controller");
const cuisinesController = require("../controllers/cuisines.controller");
const { authenticateToken } = require("../middleware/auth");
const express = require("express");
const router = express.Router();

/* Restaurant Route */
// Create a new Restaurant
router.post("/restaurant", restaurantController.create);
// Attach Restaurant Document and Other Details Add
router.put("/restaurant/attachdocument/:id", restaurantController.attachDocument);
// Restaurant Login
router.post("/restaurant/login", restaurantController.login);
// Update Restaurant Basic Details by Partner
router.put("/restaurant/:restaurantId", [authenticateToken], restaurantController.updateBasicDetailsByPartner);
// Update Restaurant Document by Admin
router.put("/restaurant/updatedocument/:restaurantId", [authenticateToken], restaurantController.udpdateDocumentByAdmin);

/* Cuisines Route */
// Create a new Cuisines
router.post("/cuisines", [authenticateToken], cuisinesController.create);
// Update Cuisines
router.put("/cuisines/:cuisinesId", [authenticateToken], cuisinesController.update);
// Retrieve all Cuisines
router.get("/cuisines", [authenticateToken], cuisinesController.findAll);
// Delete a Cuisines with id
router.delete("/cuisines/:cuisinesId", [authenticateToken], cuisinesController.delete);

module.exports = router;