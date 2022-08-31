const { itemAddon } = require("../models/itemAddon.model");
const { MONGO_DB_CONFIG } = require('../config/app.config');

async function creatItemAddon(params, callback) {
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

module.exports = {
    creatItemAddon
};