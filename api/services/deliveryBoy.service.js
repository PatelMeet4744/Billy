const { deliveryBoy } = require("../models/deliveryBoy.model");
const bcrypt = require('bcryptjs');
const auth = require("../middleware/auth");
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

async function getDeliveryBoyById({ deliveryBoyId }, callback) {

    deliveryBoy.findById(deliveryBoyId)
        .then((response) => {
            if (!response) callback("Not Found Delivery Boy with ID " + deliveryBoyId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function loginDeliveryBoy({ deliveryBoyMobile, deliveryBoyPassword }, callback) {

    const deliveryBoyModel = await deliveryBoy.findOne({ deliveryBoyMobile }, { deliveryBoyName: 1, deliveryBoyMobile: 1, deliveryBoyPassword: 1 });
    console.log(deleteDeliveryBoy)
    if (deliveryBoyModel != null) {
        if (bcrypt.compareSync(deliveryBoyPassword, deliveryBoyModel.deliveryBoyPassword)) {
            const token = auth.generateAccessToken(deliveryBoyModel.toJSON());
            let deliveryBoy = { ...deliveryBoyModel.toJSON() }
            delete deliveryBoy.deliveryBoyPassword;
            return callback(null, { deliveryBoy, token });
        } else {
            return callback({
                message: "Invalid Password"
            });
        }
    }
    else {
        return callback({
            message: "Invalid Mobile Number"
        });
    }
}

async function updateDeliveryBoy(params, callback) {
    const deliveryBoyId = params.deliveryBoyId;

    deliveryBoy.findByIdAndUpdate(deliveryBoyId, params, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Delivery Boy with ID " + deliveryBoyId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function deleteDeliveryBoy(params, callback) {
    const deliveryBoyId = params.deliveryBoyId;

    deliveryBoy.findByIdAndDelete(deliveryBoyId)
        .then((response) => {
            if (!response) callback("Not Found Delivery Boy with ID " + deliveryBoyId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateDeliveryBoyStatus({ deliveryBoyId, deliveryBoyStatus }, callback) {
    // Convert String to Boolean status
    const status = deliveryBoyStatus === "true" ? true : false
    deliveryBoy.findByIdAndUpdate(deliveryBoyId, { deliveryBoyStatus: status }, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Delivery Boy with ID " + deliveryBoyId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createDeliveryBoy,
    getDeliveryBoy,
    loginDeliveryBoy,
    getDeliveryBoyById,
    updateDeliveryBoy,
    deleteDeliveryBoy,
    updateDeliveryBoyStatus
}