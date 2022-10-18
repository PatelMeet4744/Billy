const mongoose = require("mongoose");

const admin = mongoose.model(
    "Admin",
    mongoose.Schema(
        {
            adminName: {
                type: String,
                require: true,
                unique: true
            },
            adminUserName: {
                type: String,
                require: true,
            },
            adminPassword: {
                type: String,
                require: true
            },
            adminEmailID: {
                type: String,
                require: true,
                unique: true
            }
        },
        {
            timestamps: true,
            toJSON: {
                transform: function (doc, ret) {
                    ret.adminId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                }
            }
        }
    )
);

module.exports = {
    admin
};