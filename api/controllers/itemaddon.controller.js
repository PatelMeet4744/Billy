const itemaddonService = require("../services/itemaddon.service");

// Create and Save a new Item Add-On
exports.create = (req, res, next) => {
    var model = {
        title: req.body.title,
        customerSelection: req.body.customerSelection,
        addon: req.body.addon
    };

    itemaddonService.creatItemAddon(model, (error, results) => {
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