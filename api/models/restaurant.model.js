const mongoose = require("mongoose");

const restaurant = mongoose.model(
    "Restaurant",
    mongoose.Schema(
        {
            restaurantName: {
                type: String,
                require: true,
                unique: true
            },
            restaurantImage: {
                type: String,
                require: true
            },
            restaurantAddress: {
                type: String,
                require: true
            },
            restaurantCity: {
                type: String,
                default: 'Bardoli'
            },
            restaurantContact: {
                type: Number,
                require: true,
                unique: true
            },
            ownerName: {
                type: String,
                require: true,
            },
            ownerContact: {
                type: Number,
                require: true,
                unique: true
            },
            ownerEmailID: {
                type: String,
                require: true,
                unique: true
            },
            ownerPassword: {
                type: String,
                require: true
            },
            documents: {
                gstCertificate: {
                    type: String,
                    default: ''
                },
                fssaiCertificate: {
                    type: String,
                    default: ''
                },
                sampleBill: {
                    type: String,
                    default: ''
                },
                sampleMenu: {
                    type: String,
                    default: ''
                },
                ownerPan: {
                    type: String,
                    default: ''
                }
            },
            restaurantTiming: [
                {
                    startTime: {
                        type: Date,
                        required: true
                    },
                    endTime: {
                        type: Date,
                        required: true
                    }
                }
            ],
            cuisines: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Cuisines'
                }
            ],
            restaurantStatus: {
                type: Boolean,
                default: true // true -> Active & false -> DeActive
            },
            restaurantAddedOn: {
                type: Date,
                default: Date.now
            }
        },
        {
            toJSON: {
                transform: function (doc, ret) {
                    ret.restaurantId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                }
            }
        }
    )
);

module.exports = {
    restaurant
};