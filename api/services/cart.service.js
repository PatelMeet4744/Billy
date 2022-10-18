const { cart } = require("../models/cart.model");
const { MONGO_DB_CONFIG } = require('../config/app.config');

async function createCart(params, callback) {
    if (!params.customer || !params.item || !params.variant || !params.addon || !params.addextra) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }
    const { customer, item, variant, addon, addextra } = params;

    // Build Item Cart object
    const cartFields = {};
    cartFields.customer = customer;
    cartFields.item = item;
    if (params.cartQty) cartFields.cartQty = params.cartQty;
    cartFields.variant = variant;
    cartFields.addon = addon.split(',')
        .map((element) => element.trim());
    cartFields.addextra = addextra.split(',')
        .map((element) => element.trim());

    const model = new cart(cartFields);
    model.save().then((response) => {
        return callback(null, response);
    })
        .catch((error) => {
            return callback(error);
        });
}

async function getCart(params, callback) {

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;
    cart.find({}, { "variant": 0, "addon": 0, "addextra": 0 }).populate("customer", "customerName customerEmailID customerContact").populate({ path: "item", select: "itemName itemType itemDescription itemImage itemStatus", populate: { path: "restaurant category", select: "restaurantName restaurantAddress restaurantCity restaurantContact ownerName categoryName" } })
        .limit(perPage)
        .skip(perPage * page)
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });

    // ex totalRecord = 20, pageSize = 10. Page 1 =>
}

async function getCartCustomizeById(params, callback) {
    const cartId = params.cartId;
    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;
    cart.findById(cartId).populate("addon").populate("addextra")
        .limit(perPage)
        .skip(perPage * page)
        .then((response) => {
            if (!response) callback("Not Found Item with ID " + itemId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });

    // ex totalRecord = 20, pageSize = 10. Page 1 =>
}

async function deleteCart({ cartId }, callback) {
    cart.findByIdAndDelete(cartId)
        .then((response) => {
            if (!response) callback("Not Found Cart with ID " + cartId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateCart(params, callback) {
    if (!params.cartQty || !params.variant || !params.addon || !params.addextra) {
        return callback({
            message: "Some Fields are Required!"
        }, "");
    }
    const cartId = params.cartId;

    const { cartQty, variant, addon, addextra } = params;
    // Build Item Added-On object
    const cartFields = {};
    cartFields.cartQty = cartQty;
    cartFields.variant = variant;
    cartFields.addon = addon.split(',')
        .map((element) => element.trim());
    cartFields.addextra = addextra.split(',')
        .map((element) => element.trim());
    // return console.log(cartFields);

    cart.findOneAndUpdate({ cartId: cartId }, { $set: cartFields }, { new: true })
        .then((response) => {
            if (!response) callback("Not Found Item Cart Id with ID " + cartId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createCart,
    getCart,
    getCartCustomizeById,
    updateCart,
    deleteCart
};