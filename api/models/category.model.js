const mongoose = require("mongoose");

const category = mongoose.model(
    "Category",
    mongoose.Schema(
        {
            restaurant: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Restaurant'
            },
            categoryName: {
                type: String,
                require: true,
                unique: true
            },
            categoryStatus: {
                type: Boolean,
                default: true // true -> Available & false -> Unavailable
            },
            approvalStatus: {
                type: Number,
                default: 1 // 1->Submission Pending, 2->In Review, 3->Approved, 4->Rejected by Billy
            }
        },
        {
            timestamps: true,
            toJSON: {
                transform: function (doc, ret) {
                    ret.categoryId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                }
            }
        }
    )
);

module.exports = {
    category
};