const mongoose = require("mongoose");

const addextra = mongoose.model(
    "Addextra",
    mongoose.Schema(
        {
            restaurant: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Restaurant'
            },
            addextraName: {
                type: String,
                require: true,
                unique: true
            },
            addextraType: {
                type: String,
                enum: ['veg', 'non-veg', 'egg'],
                default: 'veg'
            },
            addextraPrice: {
                type: Number,
                require: true
            },
            addextraAdditionalPrice: {
                type: Number,
                require: true
            },
            addextraFinalPrice: {
                type: Number,
                require: true
            },
            approvalStatus: {
                type: Number,
                default: 1 // 1->Submission Pending, 2->In Review, 3->Approved, 4->Rejected by Billy
            },
            addextraStatus: {
                type: Boolean,
                default: true // true -> Active & false -> DeActive
            }
        },
        {
            timestamps: true,
            toJSON: {
                transform: function (doc, ret) {
                    ret.addextraId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                }
            }
        }
    )
);

module.exports = {
    addextra
};