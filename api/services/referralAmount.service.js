const { referralAmount } = require("../models/referralAmount.model");

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

module.exports = {
    createReferralAmount
}