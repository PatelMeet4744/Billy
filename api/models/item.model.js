const mongoose = require("mongoose");

const item = mongoose.model(
    "Item",
    mongoose.Schema(
        {
            category: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Category'
            },
            itemName: {
                type: String,
                require: true
            },
            itemType: {
                type: String,
                enum: ['veg', 'non-veg', 'egg'],
                default: 'veg'
            },
            itemDescription: {
                type: String,
                require: true
            },
            itemAddon: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ItemAddon'
            },
            itemAddExtra: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ItemAddExtra'
            },
            itemImage: {
                type: String,
                require: true
            },
            itemStatus: {
                type: Boolean,
                default: false // true -> Active & false -> DeActive
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
                    ret.itemId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                }
            }
        }
    )
);

module.exports = {
    item
};