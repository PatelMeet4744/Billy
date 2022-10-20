const mongoose = require("mongoose");

const complain = mongoose.model(
    "Complain",
    mongoose.Schema(
        {
            customer: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Customer'
            },
            order: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Order'
            },
            question: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Question'
            },
            complainMessage: {
                type: String,
                require: true
            },
            complainStatus: {
                type: Boolean,
                default: true // true -> Available & false -> Unavailable
            },
        },
        {
            timestamps: true,
            toJSON: {
                transform: function (doc, ret) {
                    ret.complainId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                }
            }
        }
    )
);

module.exports = {
    complain
}