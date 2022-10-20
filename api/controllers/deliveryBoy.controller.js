const deliveryBoyService = require("../services/deliveryBoy.service");

// Create and Save a new Delivery Boy
exports.create = (req, res, next) => {

    var model = {
        deliveryBoyName: req.body.deliveryBoyName,
        deliveryBoyMobile: req.body.deliveryBoyMobile,
        deliveryBoyPassword: req.body.deliveryBoyPassword
    };
    
    deliveryBoyService.createDeliveryBoy(model, (error, results) => {
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

// Retrieve all Delivery Boy from the database.
exports.findAll = (req, res, next) => {
    var model = {
        deliveryBoyName: req.query.deliveryBoyName,
        pageSize: req.query.pageSize,
        page: req.query.page
    };

    deliveryBoyService.getDeliveryBoy(model, (error, results) => {
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