const cartService = require("../services/cart.service");

// Create and Save a new Cart
exports.create = (req, res, next) => {
    var model = {
        customer: req.body.customer,
        item: req.body.item,
        variant: req.body.variant,
        addon: req.body.addon,
        addextra: req.body.addextra,
    };

    if (req.body.cartQty) model['cartQty'] = req.body.cartQty;

    cartService.createCart(model, (error, results) => {
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

// Retrieve all Cart Basic Information from the database.
exports.findAll = (req, res, next) => {
    var model = {
        pageSize: req.query.pageSize,
        page: req.query.page
    };

    cartService.getCart(model, (error, results) => {
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

// Retrieve all Cart Customize Information from the database.
exports.findOneCustomize = (req, res, next) => {
    var model = {
        cartId: req.params.id,
        pageSize: req.query.pageSize,
        page: req.query.page
    };

    cartService.getCartCustomizeById(model, (error, results) => {
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

// Update a Cart by the id in the request
exports.update = (req, res, next) => {

    var model = {
        cartId: req.params.cartId,
        cartQty: req.body.cartQty,
        variant: req.body.variant,
        addon: req.body.addon,
        addextra: req.body.addextra,
    };
    // console.log(model);

    cartService.updateCart(model, (error, results) => {
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

// Delete a Cart with the specified id in the request
exports.delete = (req, res, next) => {
    const cartId = req.params.cartId;

    cartService.deleteCart({ cartId }, (error, results) => {
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