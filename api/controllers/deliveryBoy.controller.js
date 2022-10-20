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
