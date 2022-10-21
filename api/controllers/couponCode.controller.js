const couponCodeService = require("../services/couponCode.service");

// Create and Save a new Coupon Code
exports.create = (req, res, next) => {

    var model = {
        couponCodeName: req.body.couponCodeName,
        couponCodeType: req.body.couponCodeType,
        couponCodeValue: req.body.couponCodeValue,
        couponCodeCartMinValue: req.body.couponCodeCartMinValue,
        couponCodeExpiredon: req.body.couponCodeExpiredon
    };
    // console.log(req.body);
    couponCodeService.createCouponCode(model, (error, results) => {
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

// Find a single Coupon Code with an id
exports.findOne = (req, res, next) => {
    const couponCodeId = req.params.id;

    couponCodeService.getCouponCodeById({ couponCodeId }, (error, results) => {
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

// Update a Coupon Code Details
exports.update = (req, res, next) => {

    var model = {
        couponCodeId: req.params.couponCodeId,
        couponCodeName: req.body.couponCodeName,
        couponCodeType: req.body.couponCodeType,
        couponCodeValue: req.body.couponCodeValue,
        couponCodeCartMinValue: req.body.couponCodeCartMinValue,
        couponCodeExpiredon: req.body.couponCodeExpiredon
    };

    couponCodeService.updateCouponCode(model, (error, results) => {
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

// Retrieve all Coupon Code from the database.
exports.findAll = (req, res, next) => {
    var model = {
        couponCodeName: req.query.couponCodeName,
        pageSize: req.query.pageSize,
        page: req.query.page
    };

    couponCodeService.getCouponCode(model, (error, results) => {
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

// Delete a Coupon Code with the specified id in the request
exports.delete = (req, res, next) => {
    const couponCodeId = req.params.couponCodeId;

    couponCodeService.deleteCouponCode({ couponCodeId }, (error, results) => {
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

// Update a Coupon Code status by the id in the request
exports.updateStatus = (req, res, next) => {
    const { couponCodeId, couponCodeStatus } = req.params;

    couponCodeService.updateCouponCodeStatus({ couponCodeId, couponCodeStatus }, (error, results) => {
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

// Update Status if Coupon Code is expired
exports.ExpiredOn = (req, res, next) => {
   
    couponCodeService.ExpiredCouponCode((error, results) => {
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

// Find a single Coupon Code with an id
exports.SendCouponCode = (req, res, next) => {
    var model = {
        CustomerEmailId: req.body.CustomerEmailId,
    };
    couponCodeService.SendCouponCode(model, (error, results) => {
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