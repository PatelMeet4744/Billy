const mongoose = require("mongoose");

const variant = mongoose.model(
    "Variant",
    mongoose.Schema(
        {
            variantName: {
                type: String,
                require: true,
                unique: true
            },
            variantuom: {
                type: String,
                require: true
            },
            variantPrice: {
                type: Number,
                require: true
            },
            variantSalesPrice: {
                type: Number,
                require: true
            },
            variantStatus: {
                type: Boolean,
                default: true // true -> Available & false -> Unavailable
            }
        },
        {
            timestamps: true,
            toJSON: {
                transform: function (doc, ret) {
                    ret.variantId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                }
            }
        }
    )
);

module.exports = {
    variant
};