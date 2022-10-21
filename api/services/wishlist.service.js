const { wishlist } = require("../models/wishlist.model");

async function createWishlist(params, callback) {
    // return console.log(params);

    if (!params.customer || !params.item || !params.addon || !params.addextra) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }

    const model = new wishlist(params);
    model.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createWishlist
};