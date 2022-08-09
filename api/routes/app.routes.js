const restaurantController = require("../controllers/restaurant.controller");
const cuisinesController = require("../controllers/cuisines.controller");
const categoryController = require("../controllers/category.controller");
const addonController = require("../controllers/addon.controller");
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
// Update Restaurant Status
router.put("/restaurant/:restaurantId/:restaurantStatus", [authenticateToken], restaurantController.updateStatus);

/* Cuisines Route */
// Create a new Cuisines
router.post("/cuisines", [authenticateToken], cuisinesController.create);
// Update Cuisines
router.put("/cuisines/:cuisinesId", [authenticateToken], cuisinesController.update);
// Retrieve all Cuisines
router.get("/cuisines", [authenticateToken], cuisinesController.findAll);
// Delete a Cuisines with id
router.delete("/cuisines/:cuisinesId", [authenticateToken], cuisinesController.delete);
// Update Cuisines Status
router.put("/cuisines/:cuisinesId/:cuisinesStatus", [authenticateToken], cuisinesController.updateStatus);

/* Category Route */
// Create a new Category
router.post("/category", [authenticateToken], categoryController.create);
// Retrieve a single Category with id
router.get("/category/:id", categoryController.findOne);
// Update Category
router.put("/category/:categoryId", [authenticateToken], categoryController.update);
// Retrieve all Category
router.get("/category", [authenticateToken], categoryController.findAll);
// Delete a Category with id
router.delete("/category/:categoryId", [authenticateToken], categoryController.delete);

/* Add-On */
// Create a new Add-On
router.post("/addon", [authenticateToken], addonController.create);
// Retrieve a single Add-On with id
router.get("/addon/:id", addonController.findOne);
// Retrieve all Add-On
router.get("/addon", [authenticateToken], addonController.findAll);
// Delete a Add-On with id
router.delete("/addon/:addonId", [authenticateToken], addonController.delete);

module.exports = router;