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
            restaurantTiming:
            {
                monday: {
                    time: {
                        type: [Date]
                    }
                },
                tuesday: {
                    time: {
                        type: [Date]
                    }
                },
                wednesday: {
                    time: {
                        type: [Date]
                    }
                },
                thursday: {
                    time: {
                        type: [Date]
                    }
                },
                friday: {
                    time: {
                        type: [Date]
                    }
                },
                saturday: {
                    time: {
                        type: [Date]
                    }
                },
                sunday: {
                    time: {
                        type: [Date]
                    }
                }
            },
            cuisines: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Cuisines'
                }
            ],
            restaurantStatus: {
                type: Boolean,
                default: false // true -> Active & false -> DeActive
            }
        },
        {
            timestamps: true,
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