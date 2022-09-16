const restaurantController = require("../controllers/restaurant.controller");
const cuisinesController = require("../controllers/cuisines.controller");
const categoryController = require("../controllers/category.controller");
const addonController = require("../controllers/addon.controller");
const addextraController = require("../controllers/addextra.controller");
const itemaddonController = require("../controllers/itemaddon.controller");
const itemaddextraController = require("../controllers/itemaddextra.controller");
const itemController = require("../controllers/item.controller");
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
router.get("/category/:id", [authenticateToken], categoryController.findOne);
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
router.get("/addon/:id", [authenticateToken], addonController.findOne);
// Update Add-On
router.put("/addon/:addonId", [authenticateToken], addonController.update);
// Retrieve all Add-On
router.get("/addon", [authenticateToken], addonController.findAll);
// Delete a Add-On with id
router.delete("/addon/:addonId", [authenticateToken], addonController.delete);
// Update Add-On Status
router.put("/addon/:addonId/:addonStatus", [authenticateToken], addonController.updateStatus);
// Update Add-On Approval Status
router.put("/addon/:addonId/:approvalStatus", [authenticateToken], addonController.updateApprovalStatus);

/* Add-Extra */
// Create a new Add-Extra
router.post("/addextra", [authenticateToken], addextraController.create);
// Retrieve a single Add-Extra with id
router.get("/addextra/:id", [authenticateToken], addextraController.findOne);
// Update Add-Extra
router.put("/addextra/:addextraId", [authenticateToken], addextraController.update);
// Retrieve all Add-Extra
router.get("/addextra", [authenticateToken], addextraController.findAll);
// Delete a Add-Extra with id
router.delete("/addextra/:addextraId", [authenticateToken], addextraController.delete);
// Update Add-Extra Status
router.put("/addextra/:addextraId/:addextraStatus", [authenticateToken], addextraController.updateStatus);
// Update Add-Extra Approval Status
router.put("/addextra/:addextraId/:approvalStatus", [authenticateToken], addextraController.updateApprovalStatus);

/* Item Add-On */
// Create a new Item Add-On
router.post("/itemaddon", [authenticateToken], itemaddonController.create);
// Retrieve all Item Add-On
router.get("/itemaddon", [authenticateToken], itemaddonController.findAll);
// Retrieve a single Item Add-On with id
router.get("/itemaddon/:id", [authenticateToken], itemaddonController.findOne);
// Update Item Add-On
router.put("/itemaddon/:itemAddonId", [authenticateToken], itemaddonController.update);
// Delete a Item Add-On with id
router.delete("/itemaddon/:itemAddonId", [authenticateToken], itemaddonController.delete);

/* Item Add-Extra */
// Create a new Item Add-Extra
router.post("/itemaddextra", [authenticateToken], itemaddextraController.create);
// Retrieve all Item Add-Extra
router.get("/itemaddextra", [authenticateToken], itemaddextraController.findAll);
// Retrieve a single Item Add-Extra with id
router.get("/itemaddextra/:id", [authenticateToken], itemaddextraController.findOne);
// Update Item Add-Extra
router.put("/itemaddextra/:itemAddExtraId", [authenticateToken], itemaddextraController.update);
// Delete a Item Add-Extra with id
router.delete("/itemaddextra/:itemAddExtraId", [authenticateToken], itemaddextraController.delete);

/* Item*/
// Create a new Item
router.post("/item", [authenticateToken], itemController.create);
// Retrieve all Item
router.get("/item", [authenticateToken], itemController.findAll);
// Retrieve a single Item with id
router.get("/item/:id", [authenticateToken], itemController.findOne);
// Update Item
router.put("/item/:itemId", [authenticateToken], itemController.update);
// Delete a Item with id
router.delete("/item/:itemId", [authenticateToken], itemController.delete);
// Update Item Status
router.put("/item/:itemId/:itemStatus", [authenticateToken], itemController.updateStatus);
// Update Item Approval Status
router.put("/item/:itemId/:approvalStatus", [authenticateToken], itemController.updateApprovalStatus);

module.exports = router;