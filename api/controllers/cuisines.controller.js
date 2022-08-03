const cuisinesService = require("../services/cuisines.service");
const uploadImage = require("../middleware/cuisinesImage.upload");
const fs = require("fs");

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

// Update a Cuisines by the id in the request
exports.update = (req, res, next) => {
    uploadImage(req, res, function (err) {
        let cuisinesImage = "";

        if (err) {
            next(err);
        } else {
            if (req.file != undefined) {
                const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";
                cuisinesImage = "/" + path;

                try {
                    fs.unlinkSync("." + req.body.old_cuisinesImage);
                } catch (error) {
                    next(error);
                }

            } else {
                cuisinesImage = req.body.old_cuisinesImage;
            }

            var model = {
                cuisinesId: req.params.cuisinesId,
                cuisinesName: req.body.cuisinesName,
                cuisinesImage: cuisinesImage
            };

            cuisinesService.updateCuisines(model, (error, results) => {
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

// Retrieve all Cuisines from the database.
exports.findAll = (req, res, next) => {
    var model = {
        cuisinesName: req.query.cuisinesName,
        pageSize: req.query.pageSize,
        page: req.query.page
    };

    cuisinesService.getCuisines(model, (error, results) => {
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

// Delete a Cuisines with the specified id in the request
exports.delete = (req, res, next) => {
    // return console.log(req.body.cuisinesImage);
    if (!req.body.cuisinesImage) {
        return res.status(500).json({
            message: "Cuisines Image is Required!"
        });
    }
    else {
        try {
            fs.unlinkSync("." + req.body.cuisinesImage);
        } catch (error) {
            next(error);
        }
    }

    var model = {
        cuisinesId: req.params.cuisinesId,
    };

    cuisinesService.deleteCuisines(model, (error, results) => {
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

// Update a Cuisines status by the id in the request
exports.updateStatus = (req, res, next) => {
    const { cuisinesId, cuisinesStatus } = req.params;
    // return console.log({ cuisinesId, cuisinesStatus });
    cuisinesService.updateCuisinesStatus({ cuisinesId, cuisinesStatus }, (error, results) => {
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