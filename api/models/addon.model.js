const mongoose = require("mongoose");

const addon = mongoose.model(
    "Addon",
    mongoose.Schema(
        {
            restaurant: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Restaurant'
            },
            addonName: {
                type: String,
                require: true,
                unique: true
            },
            addonType: {
                type: String,
                enum: ['veg', 'non-veg', 'egg'],
                default: 'veg'
            },
            addonPrice: {
                type: Number,
                require: true
            },
            addonAdditionalPrice: {
                type: Number,
                require: true
            },
            addonFinalPrice: {
                type: Number,
                require: true
            },
            approvalStatus: {
                type: Number,
                default: 1 // 1->Submission Pending, 2->In Review, 3->Approved, 4->Rejected by Billy
            },
            addonStatus: {
                type: Boolean,
                default: true // true -> Active & false -> DeActive
            }
        },
        {
            timestamps: true,
            toJSON: {
                transform: function (doc, ret) {
                    ret.addonId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                }
            }
        }
    )
);

module.exports = {
    addon
};