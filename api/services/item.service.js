const { item } = require("../models/item.model");
const { MONGO_DB_CONFIG } = require('../config/app.config');
const mongodb = require('mongodb');
async function createItem(params, callback) {
    if (!params.restaurant || !params.category || !params.itemName || !params.itemDescription || !params.variant || !params.itemImage) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }
    const { restaurant, category, itemName, itemType, itemDescription, itemAddon, itemAddExtra, variant, itemImage } = params;
    // Build Item object
    const itemFields = {};
    itemFields.variant = variant.split(',')
        .map((item) => item.trim());

    itemFields.restaurant = restaurant;
    itemFields.category = category;
    itemFields.itemName = itemName;
    itemFields.itemType = itemType;
    itemFields.itemDescription = itemDescription;
    itemFields.itemAddon = itemAddon;
    itemFields.itemAddExtra = itemAddExtra;
    itemFields.itemImage = itemImage;

    const model = new item(itemFields);
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

    // item.find(condition, "").populate("category", "categoryName").populate({ path: "itemAddon", populate: { path: "addon" } }).populate({ path: "itemAddExtra", populate: { path: "addextra", select: "addextraName addextraPrice" } })
    item.find(condition, "").populate("category", "categoryName").populate({ path: "itemAddon", populate: { path: "addon" } }).populate({ path: "itemAddExtra", populate: { path: "addextra" } }).populate("variant")
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
    item.findById(itemId).populate("category", "categoryName").populate("itemAddon").populate("itemAddExtra").populate("variant")
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

    const { category, itemName, itemType, itemDescription, itemAddon, itemAddExtra, variant, itemImage } = params;
    // Build Item object
    const itemFields = {};
    itemFields.variant = variant.split(',')
        .map((item) => item.trim());

    itemFields.category = category;
    itemFields.itemName = itemName;
    itemFields.itemType = itemType;
    itemFields.itemDescription = itemDescription;
    itemFields.itemAddon = itemAddon;
    itemFields.itemAddExtra = itemAddExtra;
    itemFields.itemImage = itemImage;

    item.findByIdAndUpdate(itemId, itemFields, { useFindAndModify: false })
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

async function getItemByCategory(callback) {
    item.aggregate([{
        $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category"
        }
    }, {
        $unwind: "$category"
    }, {
        $group: {
            _id: "$category.categoryName",
            total: { $sum: 1 },
            item: {
                $push: "$$ROOT"
            }
        }
        ,
    }])
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getItemByRestaurant(restaurantId, callback) {
    const myId = new mongodb.ObjectID(restaurantId);
    item.aggregate([{
        $match: { restaurant: myId, itemStatus: true, approvalStatus: 3 }
    },
    {
        $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category"
        }
    },
    {
        $unwind: "$category"
    },
    {
        $group: {
            _id: "$category.categoryName",
            item: {
                $push: "$$ROOT"
            }
        }
    },
    ])
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createItem,
    getItem,
    getItemById,
    updateItem,
    deleteItem,
    updateItemStatus,
    updateItemApprovalStatus,
    getItemByCategory,
    getItemByRestaurant
};