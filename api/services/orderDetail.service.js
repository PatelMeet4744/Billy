const { orderDetail } = require("../models/orderDetail.model");
const { MONGO_DB_CONFIG } = require('../config/app.config');

async function createOrderDetail(params, callback) {
    if (!params.orderMaster || !params.item || !params.orderQty || !params.variant || !params.addon || !params.addextra) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }
    const { orderMaster, item, orderQty, variant, addon, addextra } = params;

    // Build Item Order Detail object
    const orderDetailFields = {};
    orderDetailFields.orderMaster = orderMaster;
    orderDetailFields.item = item;
    orderDetailFields.orderQty = orderQty;
    orderDetailFields.variant = variant;
    orderDetailFields.addon = addon.split(',')
        .map((element) => element.trim());
    orderDetailFields.addextra = addextra.split(',')
        .map((element) => element.trim());

    const model = new orderDetail(orderDetailFields);
    model.save().then((response) => {
        return callback(null, response);
    })
        .catch((error) => {
            return callback(error);
        });
}

async function getOrderDetail(params, callback) {

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;
    // orderDetail.find({}, { "variant": 0, "addon": 0, "addextra": 0 }).populate({ path: "orderMaster", populate: "customer", populate: "billingAddress", select: "customerName customerEmailID customerContact title" }).populate({ path: "item", select: "itemName itemType itemDescription itemImage itemStatus", populate: { path: "restaurant category", select: "restaurantName restaurantAddress restaurantCity restaurantContact ownerName categoryName" } })
    orderDetail.find({}, { "variant": 0, "addon": 0, "addextra": 0 }).populate({ path: "orderMaster", populate: "customer", select: "customerName customerEmailID customerContact" }).populate({ path: "item", select: "itemName itemType itemDescription itemImage itemStatus", populate: { path: "restaurant category", select: "restaurantName restaurantAddress restaurantCity restaurantContact ownerName categoryName" } })
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

module.exports = {
    createOrderDetail,
    getOrderDetail
};