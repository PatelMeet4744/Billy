const mongoose = require("mongoose");

const getTouch = mongoose.model(
    "GetTouch",
    mongoose.Schema(
        {
            restaurant: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Restaurant'
            },
            getTouchSubject: {
                type: String,
                require: true
            },
            getTouchMessage: {
                type: String,
                require: true
            },
            getTouchStatus: {
                type: Boolean,
                default: true // true -> Active & false -> DeActive
            }
        },
        {
            timestamps: true,
            toJSON: {
                transform: function (doc, ret) {
                    ret.getTouchId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                }
            }
        }
    )
);

module.exports = {
    getTouch
}