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

module.exports = {
    creatVariant
};