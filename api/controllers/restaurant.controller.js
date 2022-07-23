const restaurantService = require("../services/restaurant.service");
const uploadImage = require("../middleware/restaurantImage.upload");
const uploadPDF = require("../middleware/restaurantPDF.upload");

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
                        message: "Success",
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
            // return console.log(req.files);
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
            };


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