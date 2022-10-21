const settingService = require("../services/setting.service");

// Create and Save a new Setting
exports.create = (req, res, next) => {

    var model = {
        settingCartMinPrice: req.body.settingCartMinPrice,
        settingCartMinPriceMessage: req.body.settingCartMinPriceMessage,
        settingDeliveryCharge: req.body.settingDeliveryCharge,
        settingGst: req.body.settingGst
    };
    // return console.log(model)
    settingService.createSetting(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results,
            });
        }
    });
}

// Retrieve all Setting from the database.
exports.findAll = (req, res, next) => {
    var model = {
        settingCartMinPrice: req.query.settingCartMinPrice,
        pageSize: req.query.pageSize,
        page: req.query.page
    };

    settingService.getSetting(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results
            });
        }
    });
}