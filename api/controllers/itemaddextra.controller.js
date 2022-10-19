const itemaddextraService = require("../services/itemaddextra.service");

// Create and Save a new Item Add-Extra
exports.create = (req, res, next) => {
    var model = {
        title: req.body.title,
        customerSelection: req.body.customerSelection,
        addextra: req.body.addextra
    };

    itemaddextraService.createItemAddExtra(model, (error, results) => {
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

// Retrieve all Item Add-Extra from the database.
exports.findAll = (req, res, next) => {
    var model = {
        title: req.query.title,
        pageSize: req.query.pageSize,
        page: req.query.page
    };

    itemaddextraService.getItemAddExtra(model, (error, results) => {
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

// Find a single Item Add-Extra with an id
exports.findOne = (req, res, next) => {
    const itemAddExtraId = req.params.id;

    itemaddextraService.getItemAddExtraById({ itemAddExtraId }, (error, results) => {
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

// Update a Item Add-Extra by the id in the request
exports.update = (req, res, next) => {

    var model = {
        itemAddExtraId: req.params.itemAddExtraId,
        title: req.body.title,
        customerSelection: req.body.customerSelection,
        addextra: req.body.addextra
    };
    // console.log(model);

    itemaddextraService.updateItemAddExtra(model, (error, results) => {
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

// Delete a Item Add-Extra with the specified id in the request
exports.delete = (req, res, next) => {
    const itemAddExtraId = req.params.itemAddExtraId;

    itemaddextraService.deleteItemAddExtra({ itemAddExtraId }, (error, results) => {
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