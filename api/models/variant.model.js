const mongoose = require("mongoose");

const variant = mongoose.model(
    "Variant",
    mongoose.Schema(
        {
            restaurant: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Restaurant'
            },
            variantName: {
                type: String,
                require: true
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