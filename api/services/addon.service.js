const { addon } = require("../models/addon.model");
const { MONGO_DB_CONFIG } = require('../config/app.config');

async function createAddOn(params, callback) {
    // return console.log(params);

    if (!params.restaurant || !params.addonName || !params.addonType || !params.addonPrice || !params.addonFinalPrice) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }

    const model = new addon(params);
    model.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getAddOnById({ addonId }, callback) {

    addon.findById(addonId).populate("restaurant", "restaurantName")
        .then((response) => {
            if (!response) callback("Not Found Add-On with ID " + addonId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateAddOn(params, callback) {
    const addonId = params.addonId;

    addon.findByIdAndUpdate(addonId, params, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Add-On with ID " + addonId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getAddOn(params, callback) {
    const addonName = params.addonName;
    const restaurant = params.restaurant;
    var condition = addonName ? { addonName: { $regex: new RegExp(addonName), $options: "i" } } : {};

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;

    addon.find({restaurant}).populate("restaurant", "restaurantName")
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

async function deleteAddOn(params, callback) {
    const addonId = params.addonId;

    addon.findByIdAndDelete(addonId)
        .then((response) => {
            if (!response) callback("Not Found Add-On with ID " + addonId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateAddonStatus({ addonId, addonStatus }, callback) {
    // Convert String to Boolean status
    const status = addonStatus === "true" ? true : false

    addon.findByIdAndUpdate(addonId, { addonStatus: status }, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Add-On with ID " + addonId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateAddOnApprovalStatus({ addonId, approvalStatus }, callback) {
    // Convert String to Number status
    const status = Number(approvalStatus);

    addon.findByIdAndUpdate(addonId, { approvalStatus: status }, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Add-On with ID " + addonId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createAddOn,
    getAddOnById,
    updateAddOn,
    getAddOn,
    deleteAddOn,
    updateAddonStatus,
    updateAddOnApprovalStatus
};