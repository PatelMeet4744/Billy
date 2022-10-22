const restaurantController = require("../controllers/restaurant.controller");
const cuisinesController = require("../controllers/cuisines.controller");
const categoryController = require("../controllers/category.controller");
const addonController = require("../controllers/addon.controller");
const addextraController = require("../controllers/addextra.controller");
const itemaddonController = require("../controllers/itemaddon.controller");
const itemaddextraController = require("../controllers/itemaddextra.controller");
const itemController = require("../controllers/item.controller");
const variantController = require("../controllers/variant.controller");
const customerController = require("../controllers/customer.controller");
const mailController = require("../controllers/mail.controller");
const billingAddressController = require("../controllers/billingAddress.controller");
const cartController = require("../controllers/cart.controller");
const orderMasterController = require("../controllers/orderMaster.controller");
const orderDetailController = require("../controllers/orderDetail.controller");
const adminController = require("../controllers/admin.controller");
const bannerController = require("../controllers/banner.controller");
const complainController = require("../controllers/complain.controller");
const deliveryBoyController = require("../controllers/deliveryBoy.controller");
const couponCodeController = require("../controllers/couponCode.controller");
const referralAmountController = require("../controllers/referralAmount.controller");
const settingController = require("../controllers/setting.controller");
const wishlistController = require("../controllers/wishlist.controller");
const walletController = require("../controllers/wallet.controller");
const getTouchController = require("../controllers/getTouch.controller");
const questionController = require("../controllers/question.controller");
const reviewController = require("../controllers/review.controller");

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
router.post("/cuisines", cuisinesController.create);
// Retrieve a single Cuisines with id
router.get("/cuisines/:id", [authenticateToken], cuisinesController.findOne);
// Update Cuisines
router.put("/cuisines/:cuisinesId", [authenticateToken], cuisinesController.update);
// Retrieve all Cuisines
router.get("/cuisines", cuisinesController.findAll);
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
router.put("/addon/approval/:addonId/:approvalStatus", [authenticateToken], addonController.updateApprovalStatus);

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
router.put("/addextra/approval/:addextraId/:approvalStatus", [authenticateToken], addextraController.updateApprovalStatus);

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

/* Item */
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
router.put("/item/approval/:itemId/:approvalStatus", [authenticateToken], itemController.updateApprovalStatus);

/* Variant */
// Create a new Variant
router.post("/variant", [authenticateToken], variantController.create);
// Retrieve all Variant
router.get("/variant", [authenticateToken], variantController.findAll);
// Retrieve a Variant with id
router.get("/variant/:id", [authenticateToken], variantController.findOne);
// Update a Variant
router.put("/variant/:variantId", [authenticateToken], variantController.update);
// Delete a Variant with id
router.delete("/variant/:variantId", [authenticateToken], variantController.delete);
// Update Variant Status
router.put("/variant/:variantId/:variantStatus", [authenticateToken], variantController.updateStatus);

/* Billing Address */
// Create a new Billing Address
router.post("/billingaddress", billingAddressController.create);
// Retrieve all Billing Address
router.get("/billingaddress", billingAddressController.findAll);
// Retrieve a single Billing Address with id
router.get("/billingaddress/:id", billingAddressController.findOne);
// Update Billing Address
router.put("/billingaddress/:billingAddressId", billingAddressController.update);
// Delete a Billing Address with id
router.delete("/billingaddress/:billingAddressId", billingAddressController.delete);

/* Cart Route */
// Create a new Cart
router.post("/cart", [authenticateToken], cartController.create);
// Retrieve all Cart
router.get("/cart", [authenticateToken], cartController.findAll);
// Retrieve a Cart Customize with id
router.get("/cart/customize/:id", [authenticateToken], cartController.findOneCustomize);
// Update a Cart
router.put("/cart/:cartId", [authenticateToken], cartController.update);
// Delete a Cart with id
router.delete("/cart/:cartId", [authenticateToken], cartController.delete);

/* Order Master Route */
// Create a new Order Master
router.post("/ordermaster", [authenticateToken], orderMasterController.create);

/* Order Detail Route */
// Create a new Order Detail
router.post("/orderdetail", [authenticateToken], orderDetailController.create);
// Retrieve all Order Detail
router.get("/orderdetail", [authenticateToken], orderDetailController.findAll);

/* Admin */
//Create Or Save New Admin
router.post("/admin", adminController.create);
// Admin Login
router.post("/admin/login", adminController.login);

/* Banner Route */
// Create a new Banner
router.post("/banner", [authenticateToken],  bannerController.create);
// Retrieve a single Banner with id
router.get("/banner/:id", [authenticateToken],  bannerController.findOne);
// Retrieve all Banner
router.get("/banner", [authenticateToken],  bannerController.findAll);
// Update Banner Details
router.put("/banner/:bannerId", [authenticateToken],  bannerController.updateBannerDetails);
// Delete a Banner with id
router.delete("/banner/:bannerId", [authenticateToken], bannerController.delete);
// Update Banner Status
router.put("/banner/:bannerId/:bannerStatus", [authenticateToken], bannerController.updateStatus);
// Update Banner Approval Status
router.put("/banner/Aprove/:bannerId/:approvalStatus", [authenticateToken], bannerController.updateApprovalStatus);

/* Complain */
// Create a new Complain
router.post("/complain", [authenticateToken], complainController.create);
// Retrieve all Complain
router.get("/complain", [authenticateToken], complainController.findAll);
// Update Complain Status
router.put("/complain/:complainId/:complainStatus", [authenticateToken], complainController.updateStatus);

/* /* Delivery Boy Route */
// Create a new Delivery Boy
router.post("/deliveryBoy", [authenticateToken], deliveryBoyController.create);
// Retrieve all Delivery Boy
router.get("/deliveryBoy", [authenticateToken], deliveryBoyController.findAll);
// Delivery Boy Login
router.post("/deliveryBoy/login", deliveryBoyController.login);
// Retrieve a single Delivery Boy
router.get("/deliveryBoy/:id", [authenticateToken], deliveryBoyController.findOne);
// Update Delivery Boy Details
router.put("/deliveryBoy/:deliveryBoyId", [authenticateToken], deliveryBoyController.update);
// Delete a Delivery Boy with id
router.delete("/deliveryBoy/:deliveryBoyId", [authenticateToken], deliveryBoyController.delete);
// Update Delivery Boy Status
router.put("/deliveryBoy/:deliveryBoyId/:deliveryBoyStatus", [authenticateToken], deliveryBoyController.updateStatus);

/* Coupon Code */
// Create a new Coupon Code
router.post("/couponCode", [authenticateToken], couponCodeController.create);
// Retrieve all Coupon Code
router.get("/couponCode", [authenticateToken], couponCodeController.findAll);
// Retrieve a single Coupon Code with id
router.get("/couponCode/:id", [authenticateToken], couponCodeController.findOne);
// Update Coupon Code
router.put("/couponCode/:couponCodeId", [authenticateToken], couponCodeController.update);
// Delete a Coupon Code with id
router.delete("/couponCode/:couponCodeId", [authenticateToken], couponCodeController.delete);
// Update Coupon Code Status
router.put("/couponCode/:couponCodeId/:couponCodeStatus", [authenticateToken], couponCodeController.updateStatus);
// Coupon Code Expired
router.post("/couponCode/Expired", [authenticateToken], couponCodeController.ExpiredOn);
// Coupon Code Send
router.post("/couponCode/SendCoupon", [authenticateToken], couponCodeController.SendCouponCode);

/* Referral Amount */
// Create a new Referral Amount
router.post("/referralAmount", [authenticateToken], referralAmountController.create);
// Retrieve all Referral Amount
router.get("/referralAmount", [authenticateToken], referralAmountController.findAll);
// Update Referral Amount
router.put("/referralAmount/:referralAmountId", [authenticateToken], referralAmountController.update);

/* Setting */
// Create a new Setting
router.post("/setting", [authenticateToken], settingController.create);
// Retrieve all Setting
router.get("/setting", [authenticateToken], settingController.findAll);
// Update Setting
router.put("/setting/:settingId", [authenticateToken], settingController.update);

/* Wishlist Route */
// Create a new Wishlist
router.post("/wishlist", [authenticateToken], wishlistController.create);
// Retrieve all Wishlist
router.get("/wishlist", [authenticateToken], wishlistController.findAll);
// Delete a Wishlist with id
router.delete("/wishlist/:wishlistId", [authenticateToken], wishlistController.delete);

/* Customer Route */
// Create a new Customer
router.post("/customer", customerController.create);
// Retrieve a single Customer with id
router.get("/customer/:id", [authenticateToken], customerController.findOne);
// Customer Login
router.post("/customer/login", customerController.login);
// Update Customer
router.put("/customer/:customerId", [authenticateToken], customerController.update);
// Retrieve all Customer
router.get("/customer", [authenticateToken], customerController.findAll);
// Delete a Customer with id
router.delete("/customer/:customerId", [authenticateToken], customerController.delete);
// Update Customer Status
router.put("/customer/:customerId/:customerStatus", [authenticateToken], customerController.updateStatus);
// Update Customer Email Verify Status
router.put("/customer/verify/:customerId/:customerRandomstring", customerController.EmailVerify);
// Update Customer Password Update
router.put("/customer/password/password/:customerId", customerController.PasswordUpdate);

/* Wallet Route */
// Create a new Wallet
router.post("/wallet", [authenticateToken], walletController.create);
// Retrieve all Wallet
router.get("/wallet", [authenticateToken], walletController.findAll);
// Retrieve a single Wallet with id
router.get("/wallet/:id", [authenticateToken], walletController.findOne);
// Retrieve a single Wallet with Customer id
router.get("/wallet/customer/:customer", [authenticateToken], walletController.findOneCustomerID);
// Delete a Wallet with id
router.delete("/wallet/:walletId", walletController.delete);

/* Get Touch */
// Create a new Get Touch
router.post("/getTouch", [authenticateToken], getTouchController.create);
// Retrieve all Get Touch
router.get("/getTouch", [authenticateToken], getTouchController.findAll);
// Retrieve a single Get Touch with Restaurant id
router.get("/getTouch/:id", [authenticateToken], getTouchController.findOne);
// Update Get Touch Status
router.put("/getTouch/:getTouchId/:getTouchStatus", [authenticateToken], getTouchController.updateStatus);

/* Question */
// Create a new Question
router.post("/question", [authenticateToken],  questionController.create);
// Retrieve all Question
router.get("/question", [authenticateToken],  questionController.findAll);
// Retrieve a single Question with id
router.get("/question/:id", [authenticateToken],  questionController.findOne);
// Update Question
router.put("/question/:questionId", [authenticateToken],  questionController.update);
// Delete a Question with id
router.delete("/question/:questionId", [authenticateToken],  questionController.delete);

/* Review */
// Create a new Review
router.post("/review", reviewController.create);

// Send mail
router.post("/send", mailController.create);

module.exports = router;