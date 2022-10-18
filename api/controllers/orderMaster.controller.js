const orderMasterService = require("../services/orderMaster.service");

// Create and Save a new Order Master
exports.create = (req, res, next) => {
    var model = {
        customer: req.body.customer,
        billingAddress: req.body.billingAddress,
        orderTotalPrice: req.body.orderTotalPrice,
        orderCouponCode: req.body.orderCouponCode,
        orderFinalPrice: req.body.orderFinalPrice,
        orderPaymentStatus: req.body.orderPaymentStatus,
        orderPaymentType: req.body.orderPaymentType,
        orderStatus: req.body.orderStatus
    };

    orderMasterService.createOrderMaster(model, (error, results) => {
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