const mongoose = require("mongoose");

const question = mongoose.model(
    "Question",
    mongoose.Schema(
        {
            questionName: {
                type: String,
                require: true
            }
        },
        {
            timestamps: true,
            toJSON: {
                transform: function (doc, ret) {
                    ret.questionId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                }
            }
        }
    )
);

module.exports = {
    question
};