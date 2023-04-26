const { setting } = require("../models/setting.model");
const { MONGO_DB_CONFIG } = require('../config/app.config');

async function createSetting(params, callback) {
    if (!params.settingCartMinPrice || !params.settingCartMinPriceMessage || !params.settingDeliveryCharge || !params.settingGst || !params.restaurant) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }

    const model = new setting(params);
    model.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getSetting(params, callback) {
    const settingCartMinPrice = params.settingCartMinPrice;
    const restaurant = params.restaurant;
    var condition = settingCartMinPrice ? { settingCartMinPrice: { $regex: new RegExp(settingCartMinPrice), $options: "i" }, restaurant: restaurant } : { restaurant: restaurant };

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;

    setting.find(condition, "")
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

async function updateSetting(params, callback) {
    const settingId = params.settingId;

    setting.findByIdAndUpdate(settingId, params, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Setting with ID " + settingId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createSetting,
    getSetting,
    updateSetting
};