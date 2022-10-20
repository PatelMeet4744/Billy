const { deliveryBoy } = require("../models/deliveryBoy.model");
const bcrypt = require('bcryptjs');

async function createDeliveryBoy(params, callback) {
    // return console.log(params);

    if (!params.deliveryBoyName || !params.deliveryBoyMobile || !params.deliveryBoyPassword) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }

    let model = new deliveryBoy(params);

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    model.deliveryBoyPassword = await bcrypt.hash(params.deliveryBoyPassword, salt);

    model.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createDeliveryBoy
}