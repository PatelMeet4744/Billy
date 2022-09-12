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

// Find a single Variant with an itemid
exports.findItem = (req, res, next) => {
    variantService.getVariantByItemId(req.params.itemId, (error, results) => {
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

// Update a Variant by the id in the request
exports.update = (req, res, next) => {
    const variantId = req.params.variantId;
    var model = req.body;
    // return console.log(model);
    variantService.updateVariant(variantId, model, (error, results) => {
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

// Delete a Variant with the specified id in the request
exports.delete = (req, res, next) => {
    const variantId = req.params.variantId;

    variantService.deleteVariant({ variantId }, (error, results) => {
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