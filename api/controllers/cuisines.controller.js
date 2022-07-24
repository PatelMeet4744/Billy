const cuisinesService = require("../services/cuisines.service");
const uploadImage = require("../middleware/cuisinesImage.upload");

// Create and Save a new Cuisines
exports.create = (req, res, next) => {
    uploadImage(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

            var model = {
                cuisinesName: req.body.cuisinesName,
                cuisinesImage: path != "" ? "/" + path : ""
            };

            cuisinesService.createCuisines(model, (error, results) => {
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
    });
}