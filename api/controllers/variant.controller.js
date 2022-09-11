const variantService = require("../services/variant.service");

// Create and Save a new Variant
exports.create = (req, res, next) => {
    variantService.creatVariant(req.body, (error, results) => {
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

// Retrieve all Variant from the database.
exports.findAll = (req, res, next) => {
    var model = {
        variantName: req.query.variantName,
        pageSize: req.query.pageSize,
        page: req.query.page
    };

    variantService.getVariant(model, (error, results) => {
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

// Find a single Variant with an id
exports.findOne = (req, res, next) => {
    const variantId = req.params.id;

    variantService.getVariantById({ variantId }, (error, results) => {
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