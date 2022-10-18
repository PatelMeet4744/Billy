const mongoose = require("mongoose");

const orderMaster = mongoose.model(
    "OrderMaster",
    mongoose.Schema(
        {
            customer: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Customer'
            },
            billingAddress: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'BillingAddress'
            },
            orderTotalPrice: {
                type: Number,
                require: true
            },
            orderCouponCode: {
                type: String,
                require: false
            },
            orderFinalPrice: {
                type: Number,
                require: true
            },
            deliveryBoy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'DeliveryBoy'
            },
            orderPaymentStatus: {
                type: String,
                enum: ['pending', 'paid'],
                default: 'pending'
            },
            orderPaymentType: {
                type: String,
                default: 'cod'
            },
            orderPaymentId: {
                type: String,
                default: ''
            },
            orderStatus: {
                type: String,
                enum: ['pending', 'cooking', 'ontheway', 'delivered'],
                default: 'pending'
            },
            orderCancelBy: {
                type: String,
                default: ''
            },
            orderCancelAt: {
                type: Date,
                require: false
            },
            orderDeliveredOn: {
                type: Date,
                require: false
            },
            orderRefundStatus: {
                type: Boolean,
                default: false
            }
        },
        {
            timestamps: true,
            toJSON: {
                transform: function (doc, ret) {
                    ret.orderMasterId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                }
            }
        }
    )
);

module.exports = {
    orderMaster
};