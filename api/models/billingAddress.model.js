const mongoose = require("mongoose");

const billingAddress = mongoose.model(
    "BillingAddress",
    mongoose.Schema(
        {
            billingAddressTitle: {
                type: String,
                require: true
            },
            billingAddress: {
                type: String,
                require: true
            },
            billingAddressCountry: {
                type: String,
                require: true
            },
            billingAddressState: {
                type: String,
                require: true
            },
            billingAddressCity: {
                type: String,
                require: true
            },
            billingAddressPincode: {
                type: Number,
                require: true
            },
        },
        {
            timestamps: true,
            toJSON: {
                transform: function (doc, ret) {
                    ret.billingAddressId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                }
            }
        }
    )
);

module.exports = {
    billingAddress
}