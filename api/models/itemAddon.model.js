const mongoose = require("mongoose");

const itemAddon = mongoose.model(
    "ItemAddon",
    mongoose.Schema(
        {
            title: {
                type: String,
                require: true
            },
            customerSelection: {
                type: String,
                enum: ['optional', 'compulsory'],
                default: 'optional'
            },
            addon: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Addon'
                }
            ],
        },
        {
            timestamps: true,
            toJSON: {
                transform: function (doc, ret) {
                    ret.itemAddonId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                }
            }
        }
    )
);

module.exports = {
    itemAddon
};