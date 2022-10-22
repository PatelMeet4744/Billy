const mongoose = require("mongoose");

const wallet = mongoose.model(
    "Wallet",
    mongoose.Schema(
        {
            customer: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Customer'
            },
            walletAmount: {
                type: Number,
                require: true
            },
            walletMessage: {
                type: String,
                require: true
            },
            walletType: {
                type: String,
                enum: ['in', 'out'],
                default: 'in'
            },
            walletPaymentId: {
                type: String,
                default: ''
            },
        },
        {
            timestamps: true,
            toJSON: {
                transform: function (doc, ret) {
                    ret.walletId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                }
            }
        }
    )
);

module.exports = {
    wallet
};