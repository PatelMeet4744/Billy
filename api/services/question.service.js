const { question } = require("../models/question.model");
const { MONGO_DB_CONFIG } = require('../config/app.config');

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

// Retrive All Questions
async function getQuestion(params, callback) {
    const questionName = params.questionName;
    var condition = questionName ? { questionName: { $regex: new RegExp(questionName), $options: "i" } } : {};

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;

    question.find(condition, "")
        .limit(perPage)
        .skip(perPage * page)
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });

    // ex totalRecord = 20, pageSize = 10. Page 1 =>
}

module.exports = {
    createQuestion,
    getQuestion
}