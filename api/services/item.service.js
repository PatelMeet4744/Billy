const { item } = require("../models/item.model");
const { MONGO_DB_CONFIG } = require('../config/app.config');

async function creatItem(params, callback) {
    if (!params.restaurant || !params.category || !params.itemName || !params.itemDescription || !params.itemImage) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }

    const model = new item(params);
    model.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getItem(params, callback) {
    const itemName = params.itemName;
    var condition = itemName ? { itemName: { $regex: new RegExp(itemName), $options: "i" } } : {};

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;

    item.find(condition, "").populate("category", "categoryName").populate("itemAddon").populate("itemAddExtra")
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

async function getItemById({ itemId }, callback) {
    item.findById(itemId).populate("category", "categoryName").populate("itemAddon").populate("itemAddExtra")
        .then((response) => {
            if (!response) callback("Not Found Item with ID " + itemId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateItem(params, callback) {
    const itemId = params.itemId;
    // return console.log(params);
    item.findByIdAndUpdate(itemId, params, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Item with ID " + itemId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function deleteItem({ itemId }, callback) {
    item.findByIdAndDelete(itemId)
        .then((response) => {
            if (!response) callback("Not Found Item with ID " + itemId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateItemStatus({ itemId, itemStatus }, callback) {
    // Convert String to Boolean status
    const status = itemStatus === "true" ? true : false

    item.findByIdAndUpdate(itemId, { itemStatus: status }, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Item with ID " + itemId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateItemApprovalStatus({ itemId, approvalStatus }, callback) {
    // Convert String to Number status
    const status = Number(approvalStatus);

    item.findByIdAndUpdate(itemId, { approvalStatus: status }, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Item with ID " + itemId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    creatItem,
    getItem,
    getItemById,
    updateItem,
    deleteItem,
    updateItemStatus,
    updateItemApprovalStatus
};