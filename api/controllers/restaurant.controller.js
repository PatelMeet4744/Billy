const restaurantService = require("../services/restaurant.service");
const uploadImage = require("../middleware/restaurantImage.upload");

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