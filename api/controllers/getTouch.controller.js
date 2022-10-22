const getTouchService = require("../services/getTouch.service");

// Create and Save a new Get Touch
exports.create = (req, res, next) => {

    var model = {
        restaurant: req.body.restaurant,
        getTouchSubject: req.body.getTouchSubject,
        getTouchMessage: req.body.getTouchMessage
    };

    getTouchService.createGetTouch(model, (error, results) => {
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