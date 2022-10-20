const complainService = require("../services/complain.service");

// Create and Save a new Complain
exports.create = (req, res, next) => {

    var model = {
        customer: req.body.customer,
        order: req.body.order,
        question: req.body.question,
        complainMessage: req.body.complainMessage
    };
    // console.log(req.body);
    complainService.createComplain(model, (error, results) => {
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

// Retrieve all Complain from the database.
exports.findAll = (req, res, next) => {
    var model = {
        complainMessage: req.query.complainMessage,
        pageSize: req.query.pageSize,
        page: req.query.page
    };

    complainService.getComplain(model, (error, results) => {
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

// Update a Complain status by the id in the request
exports.updateStatus = (req, res, next) => {
    const { complainId, complainStatus } = req.params;
    // return console.log({ addonId, addonStatus });
    complainService.updateComplainStatus({ complainId, complainStatus }, (error, results) => {
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