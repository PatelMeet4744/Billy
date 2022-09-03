const { itemAddExtra } = require("../models/itemAddExtra.model");
const { MONGO_DB_CONFIG } = require('../config/app.config');

async function creatItemAddExtra(params, callback) {
    if (!params.title || !params.customerSelection || !params.addextra) {
        return callback({
            message: "Some Fields are Required!"
        }, "");
    }

    const { title, customerSelection, addextra } = params;
    // Build Item Added-On object
    const itemAddExtraFields = {};
    itemAddExtraFields.title = title;
    itemAddExtraFields.customerSelection = customerSelection;
    itemAddExtraFields.addextra = addextra.split(',')
        .map((item) => item.trim());

    // return console.log(itemAddExtraFields);
    const model = new itemAddExtra(itemAddExtraFields);
    model.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getItemAddExtra(params, callback) {
    const title = params.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;

    itemAddExtra.find(condition, "").populate("addextra")
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

async function getItemAddExtraById({ itemAddExtraId }, callback) {
    itemAddExtra.findById(itemAddExtraId).populate("addextra")
        .then((response) => {
            if (!response) callback("Not Found Item Add-Extra with ID " + itemAddExtraId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateItemAddExtra(params, callback) {
    if (!params.title || !params.customerSelection || !params.addextra) {
        return callback({
            message: "Some Fields are Required!"
        }, "");
    }
    const itemAddExtraId = params.itemAddExtraId;

    const { title, customerSelection, addextra } = params;
    // Build Item Added-On object
    const itemAddExtraFields = {};
    itemAddExtraFields.title = title;
    itemAddExtraFields.customerSelection = customerSelection;
    itemAddExtraFields.addextra = addextra.split(',')
        .map((item) => item.trim());
    // return console.log(itemAddExtraFields);

    itemAddExtra.findOneAndUpdate({ itemAddExtraId: itemAddExtraId }, { $set: itemAddExtraFields }, { new: true })
        .then((response) => {
            if (!response) callback("Not Found Item Add-Extra with ID " + itemAddExtraId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function deleteItemAddExtra(params, callback) {
    const itemAddExtraId = params.itemAddExtraId;

    itemAddExtra.findByIdAndDelete(itemAddExtraId)
        .then((response) => {
            if (!response) callback("Not Found Item Add-Extra with ID " + itemAddExtraId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    creatItemAddExtra,
    getItemAddExtra,
    getItemAddExtraById,
    updateItemAddExtra,
    deleteItemAddExtra
};