const mongoose = require("mongoose");

const cart = mongoose.model(
    "Cart",
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
            cartQty: {
                type: Number,
                default: 1
            },
            variant: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Variant'
            },
            addon: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Addon'
                }
            ],
            addextra: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Addextra'
                }
            ],
        },
        {
            timestamps: true,
            toJSON: {
                transform: function (doc, ret) {
                    ret.cartId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                }
            }
        }
    )
);

module.exports = {
    cart
};