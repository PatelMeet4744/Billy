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

async function getWishlist(callback) {

    wishlist.find().populate("customer", "customerName customerEmailID customerContact").populate("item").populate("addon").populate("addextra")
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });

    // ex totalRecord = 20, pageSize = 10. Page 1 =>
}

async function deleteWishlist(params, callback) {
    const wishlistId = params.wishlistId;

    wishlist.findByIdAndDelete(wishlistId)
        .then((response) => {
            if (!response) callback("Not Found Wishlist with ID " + wishlistId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createWishlist,
    getWishlist,
    deleteWishlist
};