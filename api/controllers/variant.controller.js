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