const { orderMaster } = require("../models/orderMaster.model");
const { MONGO_DB_CONFIG } = require('../config/app.config');

async function createOrderMaster(params, callback) {
    if (!params.customer || !params.billingAddress || !params.orderTotalPrice || !params.orderFinalPrice || !params.orderPaymentStatus || !params.orderPaymentType || !params.orderStatus) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }

    const model = new orderMaster(params);
    model.save().then((response) => {
        return callback(null, response);
    })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createOrderMaster
};