const billingAddressService = require("../Services/billingAddress.service");

// Create and Save a new Billing Address
exports.create = (req, res, next) => {

    var model = {
        billingAddressTitle: req.body.billingAddressTitle,
        billingAddress: req.body.billingAddress,
        billingAddressCountry: req.body.billingAddressCountry,
        billingAddressState: req.body.billingAddressState,
        billingAddressCity: req.body.billingAddressCity,
        billingAddressPincode: req.body.billingAddressPincode
    };
    // console.log(req.body);
    billingAddressService.createBillingAddress(model, (error, results) => {
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

// Retrieve all Billing Address from the database.
exports.findAll = (req, res, next) => {
    var model = {
        billingAddressTitle: req.query.billingAddressTitle,
        pageSize: req.query.pageSize,
        page: req.query.page
    };

    billingAddressService.getBillingAddress(model, (error, results) => {
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

// Find a single Billing Address with an id
exports.findOne = (req, res, next) => {
    const billingAddressId = req.params.id;

    billingAddressService.getBillingAddressById({ billingAddressId }, (error, results) => {
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

// Update a Billing Address by the id in the request
exports.update = (req, res, next) => {

    var model = {
        billingAddressId: req.params.billingAddressId,
        billingAddressTitle: req.body.billingAddressTitle,
        billingAddress: req.body.billingAddress,
        billingAddressCountry: req.body.billingAddressCountry,
        billingAddressState: req.body.billingAddressState,
        billingAddressCity: req.body.billingAddressCity,
        billingAddressPincode: req.body.billingAddressPincode
    };

    billingAddressService.updateBillingAddress(model, (error, results) => {
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

// Delete a Billing Address with the specified id in the request
exports.delete = (req, res, next) => {
    const billingAddressId = req.params.billingAddressId;

    billingAddressService.deleteBillingAddress({ billingAddressId }, (error, results) => {
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