const { wallet } = require("../models/wallet.model");
const { MONGO_DB_CONFIG } = require('../config/app.config');

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

async function getWallet(params, callback) {
    const walletAmount = params.walletAmount;
    var condition = walletAmount ? { walletAmount: { $regex: new RegExp(walletAmount), $options: "i" } } : {};

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;

    wallet.find(condition, "").populate("customer", "customerName")
        .limit(perPage)
        .skip(perPage * page)
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });

    // ex totalRecord = 20, pageSize = 10. Page 1 =>
}

async function getWalletById({ walletId }, callback) {

    wallet.findById(walletId).populate("customer", "customerName customerEmailID customerContact")
        .then((response) => {
            if (!response) callback("Not Found Wallet with ID " + walletId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createWallet,
    getWallet,
    getWalletById
};