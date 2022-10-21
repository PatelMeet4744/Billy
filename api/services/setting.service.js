const { setting } = require("../models/setting.model");

async function createSetting(params, callback) {
    if (!params.settingCartMinPrice || !params.settingCartMinPriceMessage || !params.settingDeliveryCharge || !params.settingGst) {
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

module.exports = {
    createSetting
};