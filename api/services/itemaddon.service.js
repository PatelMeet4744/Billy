const { itemAddon } = require("../models/itemAddon.model");
const { MONGO_DB_CONFIG } = require('../config/app.config');

async function createItemAddon(params, callback) {
    if (!params.title || !params.customerSelection || !params.addon) {
        return callback({
            message: "Some Fields are Required!"
        }, "");
    }

    const { title, customerSelection, addon } = params;
    // Build Item Added-On object
    const itemAddonFields = {};
    itemAddonFields.title = title;
    itemAddonFields.customerSelection = customerSelection;
    itemAddonFields.addon = addon.split(',')
        .map((item) => item.trim());

    const model = new itemAddon(itemAddonFields);
    // return console.log(model);
    model.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getItemAddon(params, callback) {
    const title = params.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;

    itemAddon.find(condition, "").populate("addon")
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

async function getItemAddOnById({ itemAddonId }, callback) {
    itemAddon.findById(itemAddonId).populate("addon")
        .then((response) => {
            if (!response) callback("Not Found Item Add-On with ID " + itemAddonId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateItemAddon(params, callback) {
    if (!params.title || !params.customerSelection || !params.addon) {
        return callback({
            message: "Some Fields are Required!"
        }, "");
    }
    const itemAddonId = params.itemAddonId;

    const { title, customerSelection, addon } = params;
    // Build Item Added-On object
    const itemAddonFields = {};
    itemAddonFields.title = title;
    itemAddonFields.customerSelection = customerSelection;
    itemAddonFields.addon = addon.split(',')
        .map((item) => item.trim());
    // return console.log(itemAddonFields);

    itemAddon.findOneAndUpdate({ itemAddonId: itemAddonId }, { $set: itemAddonFields }, { new: true })
        .then((response) => {
            if (!response) callback("Not Found Item Add-On with ID " + itemAddonId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function deleteItemAddon(params, callback) {
    const itemAddonId = params.itemAddonId;

    itemAddon.findByIdAndDelete(itemAddonId)
        .then((response) => {
            if (!response) callback("Not Found Item Add-On with ID " + itemAddonId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createItemAddon,
    getItemAddon,
    getItemAddOnById,
    updateItemAddon,
    deleteItemAddon
};