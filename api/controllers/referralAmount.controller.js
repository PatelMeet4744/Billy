const referralAmountService = require("../services/referralAmount.service");

// Create and Save a new Referral Amount
exports.create = (req, res, next) => {
    var model = {
        referralAmount: req.body.referralAmount,
    };

    referralAmountService.createReferralAmount(model, (error, results) => {
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

// Retrieve all Referral Amount from the database.
exports.findAll = (req, res, next) => {
    var model = {
        referralAmount: req.query.referralAmount,
        pageSize: req.query.pageSize,
        page: req.query.page
    };

    referralAmountService.getReferralAmount(model, (error, results) => {
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