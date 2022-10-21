const wishlistService = require("../services/wishlist.service");

// Create and Save a new Wishlist
exports.create = (req, res, next) => {

    var model = {
        customer: req.body.customer,
        item: req.body.item,
        addon: req.body.addon,
        addextra: req.body.addextra
    };
    // console.log(req.body);
    wishlistService.createWishlist(model, (error, results) => {
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

// Retrieve all Wishlist from the database.
exports.findAll = (req, res, next) => {

    wishlistService.getWishlist((error, results) => {
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

// Delete a Wishlist with the specified id in the request
exports.delete = (req, res, next) => {
    const wishlistId = req.params.wishlistId;

    wishlistService.deleteWishlist({ wishlistId }, (error, results) => {
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