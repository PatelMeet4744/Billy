const { addextra } = require("../models/addextra.model");
const { MONGO_DB_CONFIG } = require('../config/app.config');

async function createAddExtra(params, callback) {
    // return console.log(params);

    if (!params.restaurant || !params.addextraName || !params.addextraType || !params.addextraPrice || !params.addextraFinalPrice) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }

    const model = new addextra(params);
    model.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getAddExtraById({ addextraId }, callback) {

    addextra.findById(addextraId).populate("restaurant", "restaurantName")
        .then((response) => {
            if (!response) callback("Not Found Add-Extra with ID " + addextraId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateAddExtra(params, callback) {
    const addextraId = params.addextraId;

    addextra.findByIdAndUpdate(addextraId, params, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Add-Extra with ID " + addextraId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getAddExtra(params, callback) {
    const addextraName = params.addextraName;
    const restaurant = params.restaurant;
    var condition = addextraName ? { addextraName: { $regex: new RegExp(addextraName), $options: "i" }, restaurant: restaurant } : { restaurant: restaurant };

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;

    addextra.find(condition, "").populate("restaurant", "restaurantName")
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

async function deleteAddExtra(params, callback) {
    const addextraId = params.addextraId;

    addextra.findByIdAndDelete(addextraId)
        .then((response) => {
            if (!response) callback("Not Found Add-Extra with ID " + addextraId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateAddextraStatus({ addextraId, addextraStatus }, callback) {
    // Convert String to Boolean status
    const status = addextraStatus === "true" ? true : false

    addextra.findByIdAndUpdate(addextraId, { addextraStatus: status }, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Add-Extra with ID " + addextraId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateAddExtraApprovalStatus({ addextraId, approvalStatus }, callback) {
    // Convert String to Number status
    const status = Number(approvalStatus);

    addextra.findByIdAndUpdate(addextraId, { approvalStatus: status }, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Add-Extra with ID " + addextraId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createAddExtra,
    getAddExtraById,
    updateAddExtra,
    getAddExtra,
    deleteAddExtra,
    updateAddextraStatus,
    updateAddExtraApprovalStatus
};