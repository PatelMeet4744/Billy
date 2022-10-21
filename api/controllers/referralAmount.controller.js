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
