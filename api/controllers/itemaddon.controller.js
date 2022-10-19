const itemaddonService = require("../services/itemaddon.service");

// Create and Save a new Item Add-On
exports.create = (req, res, next) => {
    var model = {
        title: req.body.title,
        customerSelection: req.body.customerSelection,
        addon: req.body.addon
    };

    itemaddonService.createItemAddon(model, (error, results) => {
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

// Retrieve all Item Add-On from the database.
exports.findAll = (req, res, next) => {
    var model = {
        title: req.query.title,
        pageSize: req.query.pageSize,
        page: req.query.page
    };

    itemaddonService.getItemAddon(model, (error, results) => {
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

// Find a single Item Add-On with an id
exports.findOne = (req, res, next) => {
    const itemAddonId = req.params.id;

    itemaddonService.getItemAddOnById({ itemAddonId }, (error, results) => {
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

// Update a Item Add-On by the id in the request
exports.update = (req, res, next) => {

    var model = {
        itemAddonId: req.params.itemAddonId,
        title: req.body.title,
        customerSelection: req.body.customerSelection,
        addon: req.body.addon
    };
    // console.log(model);

    itemaddonService.updateItemAddon(model, (error, results) => {
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

// Delete a Item Add-On with the specified id in the request
exports.delete = (req, res, next) => {
    const itemAddonId = req.params.itemAddonId;

    itemaddonService.deleteItemAddon({ itemAddonId }, (error, results) => {
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