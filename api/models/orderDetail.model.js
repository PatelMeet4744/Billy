const mongoose = require("mongoose");

const orderDetail = mongoose.model(
    "OrderDetail",
    mongoose.Schema(
        {
            orderMaster: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'OrderMaster'
            },
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item'
            },
            orderQty: {
                type: Number,
                default: 1
            },
            variant: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Variant'
            },
            addon: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Addon'
                }
            ],
            addextra: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Addextra'
                }
            ]
        },
        {
            timestamps: true,
            toJSON: {
                transform: function (doc, ret) {
                    ret.orderDetailId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                }
            }
        }
    )
);

module.exports = {
    orderDetail
};