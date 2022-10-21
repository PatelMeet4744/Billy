const { referralAmount } = require("../models/referralAmount.model");
const { MONGO_DB_CONFIG } = require('../config/app.config');

async function createReferralAmount(params, callback) {
    // return console.log(params);

    if (!params.referralAmount) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }

    const model = new referralAmount(params);
    model.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getReferralAmount(params,callback) {
    const _referralAmount = params.referralAmount;
    var condition = _referralAmount ? { referralAmount: { $regex: new RegExp(_referralAmount), $options: "i" } } : {};

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;

    referralAmount.find(condition, "")
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

async function updateReferralAmount(params, callback) {
    const referralAmountId = params.referralAmountId;

    referralAmount.findByIdAndUpdate(referralAmountId, params, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Referral Amount with ID " + referralAmountId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createReferralAmount,
    getReferralAmount,
    updateReferralAmount
}