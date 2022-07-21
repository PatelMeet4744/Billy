const { restaurant } = require("../models/restaurant.model");
const bcrypt = require('bcryptjs');

async function createRestaurant(params, callback) {
    if (!params.restaurantName || !params.restaurantAddress || !params.restaurantContact || !params.ownerName || !params.ownerContact || !params.ownerEmailID || !params.ownerPassword) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }

    let model = new restaurant(params);

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    model.ownerPassword = await bcrypt.hash(params.ownerPassword, salt);

    model.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createRestaurant
};