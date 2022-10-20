const mongoose = require("mongoose");

const couponCode = mongoose.model(
    "CouponCode",
    mongoose.Schema(
        {
            couponCodeName: {
                type: String,
                require: true,
                unique: true
            },
            couponCodeType: {
                type: String,
                enum: ['p', 'f'],
                default: 'f' // p -> Percentage & f -> fixed
            },
            couponCodeValue: {
                type: Number,
                require: true
            },
            couponCodeCartMinValue: {
                type: Number,
                require: true
            },
            couponCodeExpiredon: {
                type: Date,
                require: true
            },
            couponCodeStatus: {
                type: Boolean,
                default: true // true -> Available & false -> Unavailable
            },
        },
        {
            timestamps: true,
            toJSON: {
                transform: function (doc, ret) {
                    ret.couponCodeId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                }
            }
        }
    )
);

module.exports = {
    couponCode
}