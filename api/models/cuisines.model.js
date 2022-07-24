const mongoose = require("mongoose");

const cuisines = mongoose.model(
    "Cuisines",
    mongoose.Schema(
        {
            cuisinesName: {
                type: String,
                require: true,
                unique: true
            },
            cuisinesImage: {
                type: String,
                require: true
            },
            cuisinesStatus: {
                type: Boolean,
                default: true // true -> Active & false -> DeActive
            }
        },
        {
            timestamps: true,
            toJSON: {
                transform: function (doc, ret) {
                    ret.cuisinesId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                }
            }
        }
    )
);

module.exports = {
    cuisines
};