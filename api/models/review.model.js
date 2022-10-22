const mongoose = require("mongoose");

const review = mongoose.model(
    "Review",
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
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item'
            },
            reviewRating: {
                type: Number,
                require: true
            },
            reviewComment: {
                type: String,
                require: true
            }
        },
        {
            timestamps: true,
            toJSON: {
                transform: function (doc, ret) {
                    ret.reviewId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                }
            }
        }
    )
);

module.exports = {
    review
};