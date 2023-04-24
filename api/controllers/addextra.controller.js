const { model } = require("mongoose");
const addExtraService = require("../services/addextra.service");

// Create and Save a new Add-Extra
exports.create = (req, res, next) => {

    var model = {
        restaurant: req.body.restaurant,
        addextraName: req.body.addextraName,
        addextraType: req.body.addextraType,
        addextraPrice: req.body.addextraPrice,
        addextraAdditionalPrice: req.body.addextraAdditionalPrice,
        addextraFinalPrice: req.body.addextraFinalPrice
    };
    // console.log(req.body);
    addExtraService.createAddExtra(model, (error, results) => {
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

// Find a single Add-Extra with an id
exports.findOne = (req, res, next) => {
    const addextraId = req.params.id;

    addExtraService.getAddExtraById({ addextraId }, (error, results) => {
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

// Update a Add-Extra status by the id in the request
exports.update = (req, res, next) => {

    var model = {
        addextraId: req.params.addextraId,
        addextraName: req.body.addextraName,
        addextraType: req.body.addextraType,
        addextraPrice: req.body.addextraPrice,
        addextraAdditionalPrice: req.body.addextraAdditionalPrice,
        addextraFinalPrice: req.body.addextraFinalPrice
    };
    // return console.log(req.body);
    addExtraService.updateAddExtra(model, (error, results) => {
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

// Retrieve all  Add-Extra from the database.
exports.findAll = (req, res, next) => {
    var model = {
        addextraName: req.query.addextraName,
        pageSize: req.query.pageSize,
        page: req.query.page,
        restaurant: req.params.restaurantid,
    };

    addExtraService.getAddExtra(model, (error, results) => {
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

// Delete a Add-Extra with the specified id in the request
exports.delete = (req, res, next) => {
    const addextraId = req.params.addextraId;

    addExtraService.deleteAddExtra({ addextraId }, (error, results) => {
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

// Update a Add-Extra status by the id in the request
exports.updateStatus = (req, res, next) => {
    const { addextraId, addextraStatus } = req.params;
    // return console.log({ addextraId, addextraStatus });
    addExtraService.updateAddextraStatus({ addextraId, addextraStatus }, (error, results) => {
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

// Update a Add-Extra Approval status by the id in the request
exports.updateApprovalStatus = (req, res, next) => {
    const { addextraId, approvalStatus } = req.params;
    // return console.log({ addextraId, approvalStatus });
    addExtraService.updateAddExtraApprovalStatus({ addextraId, approvalStatus }, (error, results) => {
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