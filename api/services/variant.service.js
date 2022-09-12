const { variant } = require("../models/variant.model");
const { MONGO_DB_CONFIG } = require('../config/app.config');

async function creatVariant(params, callback) {
    if (!params.item || !params.variantName || !params.variantuom || !params.variantPrice || !params.variantSalesPrice) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }

    const model = new variant(params);
    model.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getVariant(params, callback) {
    const variantName = params.variantName;
    var condition = variantName ? { variantName: { $regex: new RegExp(variantName), $options: "i" } } : {};

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;
    variant.find(condition, "").populate("item")
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

async function getVariantById({ variantId }, callback) {
    variant.findById(variantId).populate("item")
        .then((response) => {
            if (!response) callback("Not Found Variant with ID " + variantId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getVariantByItemId(itemId, callback) {
    variant.find({ item: itemId }).populate("item")
        .then((response) => {
            if (!response) callback("Not Found Variant with Item ID " + itemId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateVariant(variantId, params, callback) {
    // return console.log(params);
    variant.findByIdAndUpdate(variantId, params, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Variant with ID " + variantId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function deleteVariant({ variantId }, callback) {
    variant.findByIdAndDelete(variantId)
        .then((response) => {
            if (!response) callback("Not Found Variant with ID " + variantId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateVariantStatus({ variantId, variantStatus }, callback) {
    // Convert String to Boolean status
    const status = variantStatus === "true" ? true : false

    variant.findByIdAndUpdate(variantId, { variantStatus: status }, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Variant with ID " + variantId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    creatVariant,
    getVariant,
    getVariantById,
    getVariantByItemId,
    updateVariant,
    deleteVariant,
    updateVariantStatus
};