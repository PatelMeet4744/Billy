const mongoose = require("mongoose");

const wishlist = mongoose.model(
    "Wishlist",
    mongoose.Schema(
        {
            customer: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Customer'
            },
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item'
            },
            addon: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Addon'
            },
            addextra: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Addextra'
            }
        },
        {
            timestamps: true,
            toJSON: {
                transform: function (doc, ret) {
                    ret.wishlistId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                }
            }
        }
    )
);

module.exports = {
    wishlist
};