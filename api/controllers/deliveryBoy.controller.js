const deliveryBoyService = require("../services/deliveryBoy.service");

// Create and Save a new Delivery Boy
exports.create = (req, res, next) => {

    var model = {
        deliveryBoyName: req.body.deliveryBoyName,
        deliveryBoyMobile: req.body.deliveryBoyMobile,
        deliveryBoyPassword: req.body.deliveryBoyPassword
    };
    // console.log(req.body);
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

// Find a single Delivery Boy with an id
exports.findOne = (req, res, next) => {
    const deliveryBoyId = req.params.id;

    deliveryBoyService.getDeliveryBoyById({ deliveryBoyId }, (error, results) => {
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

// Login Delivery Boy
exports.login = (req, res, next) => {
    const { deliveryBoyMobile, deliveryBoyPassword } = req.body;
    // return console.log(req.body);
    // return console.log({ ownerEmailID, ownerPassword });
    deliveryBoyService.loginDeliveryBoy({ deliveryBoyMobile, deliveryBoyPassword }, (error, results) => {
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

// Update a Delivery Boy by the id in the request
exports.update = (req, res, next) => {

    var model = {
        deliveryBoyId: req.params.deliveryBoyId,
        deliveryBoyName: req.body.deliveryBoyName,
        deliveryBoyMobile: req.body.deliveryBoyMobile,
        deliveryBoyPassword: req.body.deliveryBoyPassword
    };

    deliveryBoyService.updateDeliveryBoy(model, (error, results) => {
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

// Delete a Delivery Boy with the specified id in the request
exports.delete = (req, res, next) => {
    const deliveryBoyId = req.params.deliveryBoyId;

    deliveryBoyService.deleteDeliveryBoy({ deliveryBoyId }, (error, results) => {
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

// Update a Delivery Boy status by the id in the request
exports.updateStatus = (req, res, next) => {
    const { deliveryBoyId, deliveryBoyStatus } = req.params;
    // return console.log({ addonId, addonStatus });
    deliveryBoyService.updateDeliveryBoyStatus({ deliveryBoyId, deliveryBoyStatus }, (error, results) => {
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