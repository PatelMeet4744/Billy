const { item } = require("../models/item.model");
const { MONGO_DB_CONFIG } = require('../config/app.config');

async function creatItem(params, callback) {
    if (!params.category || !params.itemName || !params.itemDescription || !params.itemImage) {
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

module.exports = {
    creatItem
};