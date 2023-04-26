const mongoose = require("mongoose");

const setting = mongoose.model(
    "Setting",
    mongoose.Schema(
        {
            restaurant: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Restaurant'
            },
            settingCartMinPrice: {
                type: Number,
                require: true
            },
            settingCartMinPriceMessage: {
                type: String,
                require: true
            },
            settingDeliveryCharge: {
                type: Number,
                require: true
            },
            settingGst: {
                type: Number,
                require: true
            }
        },
        {
            timestamps: true,
            toJSON: {
                transform: function (doc, ret) {
                    ret.settingId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                }
            }
        }
    )
);

module.exports = {
    setting
}