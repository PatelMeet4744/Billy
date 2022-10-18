const mongoose = require("mongoose");

const customer = mongoose.model(
    "Customer",
    mongoose.Schema(
        {
            customerName: {
                type: String,
                require: true
            },
            customerEmailID: {
                type: String,
                require: true,
                unique: true
            },
            customerPassword: {
                type: String,
                require: true
            },
            customerContact: {
                type: Number,
                require: true,
                unique: true
            },
            billingaddress: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Billingaddress'
                }
            ],
            customerEmailVerify: {
                type: Boolean,
                default: false // true -> verify & false -> notverify
            },
            customerRandomstring: {
                type: String,
                unique: true
            },
            customerReferralcode: {
                type: String,
                unique: true
            },
            customerFromreferralcode: {
                type: String,
                unique: true
            },
            customerStatus: {
                type: Boolean,
                default: true // true -> Active & false -> DeActive
            }
        },
        {
            timestamps: true,
            toJSON: {
                transform: function (doc, ret) {
                    ret.customerId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                }
            }
        }
    )
);

module.exports = {
    customer
};