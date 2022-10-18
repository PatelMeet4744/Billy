const { billingAddress } = require("../models/billingAddress.model");
const { MONGO_DB_CONFIG } = require('../config/app.config');

async function createBillingAddress(params, callback) {
    // return console.log(params);

    if (!params.billingAddressTitle || !params.billingAddress || !params.billingAddressCountry || !params.billingAddressState || !params.billingAddressCity || !params.billingAddressPincode) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }

    const model = new billingAddress(params);
    model.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getBillingAddress(params, callback) {
    const billingAddressTitle = params.billingAddressTitle;
    var condition = billingAddressTitle ? { billingAddressTitle: { $regex: new RegExp(billingAddressTitle), $options: "i" } } : {};

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;

    billingAddress.find(condition, "")
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

async function getBillingAddressById({ billingAddressId }, callback) {

    billingAddress.findById(billingAddressId)
        .then((response) => {
            if (!response) callback("Not Found Billing Address with ID " + billingAddressId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateBillingAddress(params, callback) {
    const billingAddressId = params.billingAddressId;

    billingAddress.findByIdAndUpdate(billingAddressId, params, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Billing Address with ID " + billingAddressId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function deleteBillingAddress(params, callback) {
    const billingAddressId = params.billingAddressId;

    billingAddress.findByIdAndDelete(billingAddressId)
        .then((response) => {
            if (!response) callback("Not Found Billing Address with ID " + billingAddressId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createBillingAddress,
    getBillingAddress,
    getBillingAddressById,
    updateBillingAddress,
    deleteBillingAddress
}