const mongoose = require("mongoose");

const deliveryBoy = mongoose.model(
    "DeliveryBoy",
    mongoose.Schema(
        {
            deliveryBoyName: {
                type: String,
                require: true
            },
            deliveryBoyMobile: {
                type: Number,
                require: true,
                unique: true
            },
            deliveryBoyPassword: {
                type: String,
                require: true
            },
            deliveryBoyStatus: {
                type: Boolean,
                default: true // true -> Active & false -> DeActive
            }
        },
        {
            timestamps: true,
            toJSON: {
                transform: function (doc, ret) {
                    ret.deliveryBoyId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                }
            }
        }
    )
);

module.exports = {
    deliveryBoy
}