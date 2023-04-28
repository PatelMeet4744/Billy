const settingService = require("../services/setting.service");

// Create and Save a new Setting
exports.create = (req, res, next) => {

    var model = {
        restaurant: req.body.restaurant,
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
        page: req.query.page,
        restaurant: req.query.restaurant
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

// Update a Setting by the id in the request
exports.update = (req, res, next) => {

    var model = {
        settingId: req.params.settingId,
        settingCartMinPrice: req.body.settingCartMinPrice,
        settingCartMinPriceMessage: req.body.settingCartMinPriceMessage,
        settingDeliveryCharge: req.body.settingDeliveryCharge,
        settingGst: req.body.settingGst
    };

    settingService.updateSetting(model, (error, results) => {
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