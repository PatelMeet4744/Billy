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
// Retrieve a single Restaurant Basic Details by Partner
router.get("/restaurant/:id", [authenticateToken], restaurantController.findOneBasicDetailsByPartner);
// Update Restaurant Basic Details by Partner
router.put("/restaurant/:restaurantId", [authenticateToken], restaurantController.updateBasicDetailsByPartner);
// Retrieve a single Restaurant Document by Admin
router.get("/restaurant/getdocument/:id", [authenticateToken], restaurantController.findOneDocumentByAdmin);
// Update Restaurant Document by Admin
router.put("/restaurant/updatedocument/:restaurantId", [authenticateToken], restaurantController.udpdateDocumentByAdmin);
// Update Restaurant Status
router.put("/restaurant/:restaurantId/:restaurantStatus", [authenticateToken], restaurantController.updateStatus);

/* Cuisines Route */
// Create a new Cuisines
router.post("/cuisines", [authenticateToken], cuisinesController.create);
// Retrieve a single Cuisines with id
router.get("/cuisines/:id", [authenticateToken], cuisinesController.findOne);
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
// Update Category Status
router.put("/category/:categoryId/:categoryStatus", [authenticateToken], categoryController.updateStatus);
// Update Category Approval Status
router.put("/category/approval/:categoryId/:approvalStatus", [authenticateToken], categoryController.updateApprovalStatus);

/* Add-On */
// Create a new Add-On
router.post("/addon", [authenticateToken], addonController.create);
// Retrieve a single Add-On with id
router.get("/addon/:id", addonController.findOne);
// Update Add-On
router.put("/addon/:addonId", [authenticateToken], addonController.update);
// Retrieve all Add-On
router.get("/addon", [authenticateToken], addonController.findAll);
// Delete a Add-On with id
router.delete("/addon/:addonId", [authenticateToken], addonController.delete);

module.exports = router;