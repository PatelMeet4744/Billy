const mongoose = require("mongoose");

const banner = mongoose.model(
    "Banner",
    mongoose.Schema(
        {
            restaurant: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Restaurant'
            },
            bannerName: {
                type: String,
                require: true,
                unique: true
            },
            bannerImage: {
                type: String,
                require: true
            },
            bannerStatus: {
                type: Boolean,
                default: true // true -> Available & false -> Unavailable
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
                    ret.bannerId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                }
            }
        }
    )
);

module.exports ={
    banner
};