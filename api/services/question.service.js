const { question } = require("../models/question.model");

// Create and Save question
async function createQuestion(params, callback) {
    if (!params.questionName) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }

    const model = new question(params);
    model.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createQuestion
}