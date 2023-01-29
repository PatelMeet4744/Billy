const restaurantService = require("../services/restaurant.service");
const uploadImage = require("../middleware/restaurantImage.upload");
const uploadPDF = require("../middleware/restaurantPDF.upload");
const fs = require("fs");

// Create and Save a new Restaurant
exports.create = (req, res, next) => {
    uploadImage(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

            var model = {
                restaurantName: req.body.restaurantName,
                restaurantAddress: req.body.restaurantAddress,
                restaurantCity: req.body.restaurantCity,
                restaurantContact: req.body.restaurantContact,
                ownerName: req.body.ownerName,
                ownerContact: req.body.ownerContact,
                ownerEmailID: req.body.ownerEmailID,
                ownerPassword: req.body.ownerPassword,
                restaurantImage: path != "" ? "/" + path : ""
            };

            restaurantService.createRestaurant(model, (error, results) => {
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

// Attach Document In  Restaurant
exports.attachDocument = (req, res, next) => {
    uploadPDF(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            const gstCertificatepath = req.files['gstCertificate'] != undefined ? req.files['gstCertificate'][0].path.replace(/\\/g, "/") : "";
            const fssaiCertificatepath = req.files['fssaiCertificate'] != undefined ? req.files['fssaiCertificate'][0].path.replace(/\\/g, "/") : "";
            const sampleBillpath = req.files['sampleBill'] != undefined ? req.files['sampleBill'][0].path.replace(/\\/g, "/") : "";
            const sampleMenupath = req.files['sampleMenu'] != undefined ? req.files['sampleMenu'][0].path.replace(/\\/g, "/") : "";
            const ownerPanpath = req.files['ownerPan'] != undefined ? req.files['ownerPan'][0].path.replace(/\\/g, "/") : "";

            var model = {
                restaurantId: req.params.id,
                gstCertificate: gstCertificatepath != "" ? "/" + gstCertificatepath : "",
                fssaiCertificate: fssaiCertificatepath != "" ? "/" + fssaiCertificatepath : "",
                sampleBill: sampleBillpath != "" ? "/" + sampleBillpath : "",
                sampleMenu: sampleMenupath != "" ? "/" + sampleMenupath : "",
                ownerPan: ownerPanpath != "" ? "/" + ownerPanpath : "",
                cuisines: req.body.cuisines
            };

            if (req.body.monday) model['monday'] = req.body.monday;
            if (req.body.tuesday) model['tuesday'] = req.body.tuesday;
            if (req.body.wednesday) model['wednesday'] = req.body.wednesday;
            if (req.body.thursday) model['thursday'] = req.body.thursday;
            if (req.body.friday) model['friday'] = req.body.friday;
            if (req.body.saturday) model['saturday'] = req.body.saturday;
            if (req.body.sunday) model['sunday'] = req.body.sunday;

            // return console.log("The Model Value is",model);
            restaurantService.attachDocumentRestaurant(model, (error, results) => {
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

// Login Restaurant
exports.login = (req, res, next) => {
    const { ownerEmailID, ownerPassword } = req.body;
    // return console.log(req.body);
    // return console.log({ ownerEmailID, ownerPassword });
    restaurantService.loginRestaurant({ ownerEmailID, ownerPassword }, (error, results) => {
        if (error) {
            return next(error);
        }

        return res.status(200).send({
            message: "Success",
            data: results
        });
    });
}

// Retrieve a single  Restaurant Basic Details By Partner
exports.findOneBasicDetailsByPartner = (req, res, next) => {
    const restaurantId = req.params.id;

    restaurantService.getSingleRestaurantBasicDetailsByPartner({ restaurantId }, (error, results) => {
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

// Update Restaurant Basic Details By Partner
exports.updateBasicDetailsByPartner = (req, res, next) => {
    uploadImage(req, res, function (err) {
        let restaurantImage = "";

        if (err) {
            next(err);
        } else {
            if (req.file != undefined) {
                const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";
                restaurantImage = "/" + path;

                try {
                    fs.unlinkSync("." + req.body.old_image);
                } catch (error) {
                    next(error);
                }

            } else {
                restaurantImage = req.body.old_image;
            }

            var model = {
                restaurantId: req.params.restaurantId,
                restaurantName: req.body.restaurantName,
                restaurantContact: req.body.restaurantContact,
                restaurantImage: restaurantImage
            };
            // return console.log(model);
            restaurantService.updateRestaurantBasicDetailsByPartner(model, (error, results) => {
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

// Retrieve a single Restaurant Document by Admin
exports.findOneDocumentByAdmin = (req, res, next) => {
    const restaurantId = req.params.id;

    restaurantService.getRestaurantDocumentByAdmin({ restaurantId }, (error, results) => {
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

// Update Restaurant Document by Admin
exports.udpdateDocumentByAdmin = (req, res, next) => {
    uploadPDF(req, res, function (err) {
        let gstCertificatepath = "";
        let fssaiCertificatepath = "";
        let sampleBillpath = "";
        let sampleMenupath = "";
        let ownerPanpath = "";
        if (err) {
            next(err);
        } else {
            // return console.log(req.files);
            gstCertificatepath = req.files['gstCertificate'] != undefined ? "/" + req.files['gstCertificate'][0].path.replace(/\\/g, "/") : req.body.old_gstCertificate;
            fssaiCertificatepath = req.files['fssaiCertificate'] != undefined ? "/" + req.files['fssaiCertificate'][0].path.replace(/\\/g, "/") : req.body.old_fssaiCertificate;
            sampleBillpath = req.files['sampleBill'] != undefined ? "/" + req.files['sampleBill'][0].path.replace(/\\/g, "/") : req.body.old_sampleBill;
            sampleMenupath = req.files['sampleMenu'] != undefined ? "/" + req.files['sampleMenu'][0].path.replace(/\\/g, "/") : req.body.old_sampleMenu;
            ownerPanpath = req.files['ownerPan'] != undefined ? "/" + req.files['ownerPan'][0].path.replace(/\\/g, "/") : req.body.old_ownerPan;

            var model = {
                restaurantId: req.params.id,
                gstCertificate: gstCertificatepath,
                fssaiCertificate: fssaiCertificatepath,
                sampleBill: sampleBillpath,
                sampleMenu: sampleMenupath,
                ownerPan: ownerPanpath
            };

            // return console.log(model);
            restaurantService.udpdateRestaurantDocumentByAdmin(model, (error, results) => {
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

// Update a Restaurant status by the id in the request
exports.updateStatus = (req, res, next) => {
    const { restaurantId, restaurantStatus } = req.params;
    // return console.log({ restaurantId, restaurantStatus });
    restaurantService.updateRestaurantStatus({ restaurantId, restaurantStatus }, (error, results) => {
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

// Retrive All Restaurant By Customer
exports.findAllRestaurant = (req, res, next) => {
    var model = {
        restaurantName: req.query.restaurantName,
        pageSize: req.query.pageSize,
        page: req.query.page
    };

    restaurantService.getAllRestauranByCustomer(model, (error, results) => {
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

exports.updatePassword = (req, res, next) => {
    var model = {
        restaurantId: req.body.restaurantId,
        ownerPassword: req.body.ownerPassword,
        newpassword: req.body.newpassword,
        confirmPassword: req.body.confirmPassword
    };
    restaurantService.updateRestaurantPassword(model, (error, results) => {
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