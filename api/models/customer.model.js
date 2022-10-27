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
            billingAddress: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'BillingAddress'
                }
            ],
            customerOTP: {
                type: String,
                default: ''
            },
            customerHash: {
                type: String,
                default: ''
            },
            customerReferralcode: {
                type: String,
                default: ''
            },
            customerFromReferralcode: {
                type: String,
                default: ''
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