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

module.exports = {
    creatVariant,
    getVariant
};