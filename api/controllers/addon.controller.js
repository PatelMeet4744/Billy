const { model } = require("mongoose");
const addonService = require("../services/addon.service");

// Create and Save a new Add-On
exports.create = (req, res, next) => {

    var model = {
        restaurant: req.body.restaurant,
        addonName: req.body.addonName,
        addonType: req.body.addonType,
        addonPrice: req.body.addonPrice,
        addonAdditionalPrice: req.body.addonAdditionalPrice,
        addonFinalPrice: req.body.addonFinalPrice
    };
    // console.log(req.body);
    addonService.createAddOn(model, (error, results) => {
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

// Find a single Add-On with an id
exports.findOne = (req, res, next) => {
    const addonId = req.params.id;

    addonService.getAddOnById({ addonId }, (error, results) => {
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

// Update a Add-On status by the id in the request
exports.update = (req, res, next) => {

    var model = {
        addonId: req.params.addonId,
        addonName: req.body.addonName,
        addonType: req.body.addonType,
        addonPrice: req.body.addonPrice,
        addonAdditionalPrice: req.body.addonAdditionalPrice,
        addonFinalPrice: req.body.addonFinalPrice,
        approvalStatus:2
    };

    addonService.updateAddOn(model, (error, results) => {
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

// Retrieve all  Add-On from the database.
exports.findAll = (req, res, next) => {
    var model = {
        addonName: req.query.addonName,
        pageSize: req.query.pageSize,
        page: req.query.page,
        restaurant: req.query.restaurant,
    };

    addonService.getAddOn(model, (error, results) => {
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

// Delete a Add-On with the specified id in the request
exports.delete = (req, res, next) => {
    const addonId = req.params.addonId;

    addonService.deleteAddOn({ addonId }, (error, results) => {
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

// Update a Add-On status by the id in the request
exports.updateStatus = (req, res, next) => {
    const { addonId, addonStatus } = req.params;
    // return console.log({ addonId, addonStatus });
    addonService.updateAddonStatus({ addonId, addonStatus }, (error, results) => {
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

// Update a Add-On Approval status by the id in the request
exports.updateApprovalStatus = (req, res, next) => {
    const { addonId, approvalStatus } = req.params;
    // return console.log({ addonId, approvalStatus });
    addonService.updateAddOnApprovalStatus({ addonId, approvalStatus }, (error, results) => {
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