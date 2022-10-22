const { wallet } = require("../models/wallet.model");

async function createWallet(params, callback) {
    // return console.log(params);

    if (!params.customer || !params.walletAmount || !params.walletMessage || !params.walletType) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }

    const model = new wallet(params);
    model.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createWallet
};