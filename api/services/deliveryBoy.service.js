const { deliveryBoy } = require("../models/deliveryBoy.model");
const bcrypt = require('bcryptjs');
const { MONGO_DB_CONFIG } = require('../config/app.config');

async function createDeliveryBoy(params, callback) {
    // return console.log(params);

    if (!params.deliveryBoyName || !params.deliveryBoyMobile || !params.deliveryBoyPassword) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }

    let model = new deliveryBoy(params);

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    model.deliveryBoyPassword = await bcrypt.hash(params.deliveryBoyPassword, salt);

    model.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getDeliveryBoy(params, callback) {
    const deliveryBoyName = params.deliveryBoyName;
    var condition = deliveryBoyName ? { deliveryBoyName: { $regex: new RegExp(deliveryBoyName), $options: "i" } } : {};

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;

    deliveryBoy.find(condition, "")
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
    createDeliveryBoy,
    getDeliveryBoy
}