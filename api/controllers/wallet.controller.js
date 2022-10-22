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