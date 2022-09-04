const mongoose = require("mongoose");

const itemAddExtra = mongoose.model(
    "ItemAddExtra",
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
            addextra: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Addextra'
                }
            ],
        },
        {
            timestamps: true,
            toJSON: {
                transform: function (doc, ret) {
                    ret.itemAddExtraId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                }
            }
        }
    )
);

module.exports = {
    itemAddExtra
};