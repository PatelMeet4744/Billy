const mongoose = require("mongoose");

const referralAmount = mongoose.model(
    "ReferralAmount",
    mongoose.Schema(
        {
            referralAmount: {
                type: Number,
                require: true
            }
        },
        {
            timestamps: true,
            toJSON: {
                transform: function (doc, ret) {
                    ret.referralAmountId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                }
            }
        }
    )
);

module.exports = {
    referralAmount
}