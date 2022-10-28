const cuisinesService = require("../services/cuisines.service");
const uploadImage = require("../middleware/cuisinesImage.upload");
const fs = require("fs");

// Create and Save a new Cuisines
exports.create = (req, res, next) => {
    uploadImage(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            // console.log(req.files);
            const cuisinesImage = req.files['cuisinesImage'] != undefined ? req.files['cuisinesImage'][0].path.replace(/\\/g, "/") : "";
            const cuisinesBanner = req.files['cuisinesBanner'] != undefined ? req.files['cuisinesBanner'][0].path.replace(/\\/g, "/") : "";


            var model = {
                cuisinesName: req.body.cuisinesName,
                cuisinesImage: cuisinesImage != "" ? "/" + cuisinesImage : "",
                cuisinesDescription: req.body.cuisinesDescription,
                cuisinesBanner: cuisinesBanner != "" ? "/" + cuisinesBanner : ""
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

// Find a single Cuisines with an id
exports.findOne = (req, res, next) => {
    const cuisinesId = req.params.id;

    cuisinesService.getCuisinesById({ cuisinesId }, (error, results) => {
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

// Update a Cuisines by the id in the request
exports.update = (req, res, next) => {
    uploadImage(req, res, function (err) {
        let cuisinesImage = "";
        let cuisinesBanner = "";

        if (err) {
            next(err);
        } else {
            if (req.files['cuisinesImage'] != undefined) {
                const cuisinesImagepath = req.files['cuisinesImage'] != undefined ? req.files['cuisinesImage'][0].path.replace(/\\/g, "/") : "";
                cuisinesImage = "/" + cuisinesImagepath;

                try {
                    fs.unlinkSync("." + req.body.old_cuisinesImage);
                } catch (error) {
                    next(error);
                }

            } else {
                cuisinesImage = req.body.old_cuisinesImage;
            }

            if (req.files['cuisinesBanner'] != undefined) {
                const cuisinesBannerpath = req.files['cuisinesBanner'] != undefined ? req.files['cuisinesBanner'][0].path.replace(/\\/g, "/") : "";
                cuisinesBanner = "/" + cuisinesBannerpath;

                try {
                    fs.unlinkSync("." + req.body.old_cuisinesBanner);
                } catch (error) {
                    next(error);
                }
            } else {
                cuisinesBanner = req.body.old_cuisinesBanner;
            }

            var model = {
                cuisinesId: req.params.cuisinesId,
                cuisinesName: req.body.cuisinesName,
                cuisinesImage: cuisinesImage,
                cuisinesDescription: req.body.cuisinesDescription,
                cuisinesBanner: cuisinesBanner
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
// Retrieve all Cuisines from the database.
exports.findAllCuisines = (req, res, next) => {
    var model = {
        cuisinesName: req.query.cuisinesName,
        pageSize: req.query.pageSize,
        page: req.query.page
    };

    cuisinesService.getCuisinesByCustomer(model, (error, results) => {
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
    // return console.log(req.body.cuisinesBanner);
    if (!req.body.cuisinesImage && !req.body.cuisinesBanner) {
        return res.status(500).json({
            message: "Cuisines Image OR Banner is Required!"
        });
    }
    else {
        try {
            fs.unlinkSync("." + req.body.cuisinesImage);
            fs.unlinkSync("." + req.body.cuisinesBanner);
        } catch (error) {
            next(error);
        }
    }

    const cuisinesId = req.params.cuisinesId;

    cuisinesService.deleteCuisines({ cuisinesId }, (error, results) => {
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