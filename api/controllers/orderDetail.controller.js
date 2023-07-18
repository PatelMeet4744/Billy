const orderDetailService = require("../services/orderDetail.service");

// Create and Save a new Order Detail
exports.create = (req, res, next) => {
    var model = {
        orderMaster: req.body.orderMaster,
        item: req.body.item,
        orderQty: req.body.orderQty,
        variant: req.body.variant,
        addon: req.body.addon,
        addextra: req.body.addextra,
    };

    orderDetailService.createOrderDetail(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                status: true,
                message: results,
            });
        }
    });
}

// Retrieve all Order Deatil Basic Information from the database.
exports.findAll = (req, res, next) => {
    var model = {
        pageSize: req.query.pageSize,
        page: req.query.page
    };

    orderDetailService.getOrderDetail(model, (error, results) => {
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