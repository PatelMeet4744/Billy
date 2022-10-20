const bannerService = require("../services/banner.service");
const uploadImage = require("../middleware/bannerImage.upload");
const fs = require("fs");

// Create and Save a new Banner
exports.create = (req, res, next) => {
    // return console.log(req.body.bannerName);
    uploadImage(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

            var model = {
                restaurant: req.body.restaurant,
                bannerName: req.body.bannerName,
                bannerImage: path != "" ? "/" + path : "",                
            };

            bannerService.createBanner(model, (error, results) => {
                if (error) {
                    return next(error);
                } else {
                    return res.status(200).send({
                        status: true,
                        data: results,
                    });
                }
            });
        }
    });
}

// Find a single Banner with an id
exports.findOne = (req, res, next) => {
    const bannerId = req.params.id;

    bannerService.getBannerById({ bannerId }, (error, results) => {
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

// Retrieve all Banner from the database.
exports.findAll = (req, res, next) => {
    var model = {
        bannerName: req.query.bannerName,
        pageSize: req.query.pageSize,
        page: req.query.page
    };

    bannerService.getBanner(model, (error, results) => {
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

// Update a Banner by the id in the request
exports.updateBannerDetails = (req, res, next) => {
    // return console.log(req.body);
    uploadImage(req, res, function (err) {
        let bannerImage = "";

        if (err) {
            next(err);
        } else {
            if (req.file != undefined) {
                const bannerImagepath = req.file!= undefined ? req.file.path.replace(/\\/g, "/") : "";
                bannerImage = "/" + bannerImagepath;

                try {
                    fs.unlinkSync("." + req.body.old_bannerImage);
                } catch (error) {
                    next(error);
                }

            } else {
                bannerImage = req.body.old_bannerImage;
            }

            var model = {
                bannerId: req.params.bannerId,
                bannerName: req.body.bannerName,
                bannerImage: bannerImage
            };
            // return console.log(model);

            bannerService.updateBannerDetails(model, (error, results) => {
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

// Delete a Banner with the specified id in the request
exports.delete = (req, res, next) => {
    if (!req.body.bannerImage) {
        return res.status(500).json({
            message: "Banner Image is Required!"
        });
    }
    else {
        try {
            fs.unlinkSync("." + req.body.bannerImage);
        } catch (error) {
            next(error);
        }
    }
    const bannerId = req.params.bannerId;

    bannerService.deleteBanner({ bannerId }, (error, results) => {
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

// Update a Banner status by the id in the request
exports.updateStatus = (req, res, next) => {
    const { bannerId, bannerStatus } = req.params;
    // return console.log({ bannerId, bannerStatus });
    bannerService.updateBannerStatus({ bannerId, bannerStatus }, (error, results) => {
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

// Update a Banner Approval status by the id in the request
exports.updateApprovalStatus = (req, res, next) => {
    const { bannerId, approvalStatus } = req.params;
    bannerService.updateBannerApprovalStatus({ bannerId, approvalStatus }, (error, results) => {
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