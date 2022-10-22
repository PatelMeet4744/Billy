const walletService = require("../services/wallet.service");

// Create and Save a new Wallet
exports.create = (req, res, next) => {

    var model = {
        customer: req.body.customer,
        walletAmount: req.body.walletAmount,
        walletMessage: req.body.walletMessage,
        walletType: req.body.walletType
    };

    if (req.body.walletPaymentId) model['walletPaymentId'] = req.body.walletPaymentId;

    walletService.createWallet(model, (error, results) => {
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

// Retrieve all Wallet from the database.
exports.findAll = (req, res, next) => {
    var model = {
        walletAmount: req.query.walletAmount,
        pageSize: req.query.pageSize,
        page: req.query.page
    };

    walletService.getWallet(model, (error, results) => {
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

// Find a single Wallet with an id
exports.findOne = (req, res, next) => {
    const walletId = req.params.id;

    walletService.getWalletById({ walletId }, (error, results) => {
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

// Find a single Wallet with an Customer id
exports.findOneCustomerID = (req, res, next) => {
    const customer = req.params.customer;

    walletService.getWalletByCustomerId({ customer }, (error, results) => {
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

// Delete a Wallet with the specified id in the request
exports.delete = (req, res, next) => {
    const walletId = req.params.walletId;

    walletService.deleteWallet({ walletId }, (error, results) => {
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