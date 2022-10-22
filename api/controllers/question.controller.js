const questionService = require("../services/question.service");

// Create and Save a new Question
exports.create = (req, res, next) => {

    var model = {
        questionName: req.body.questionName
    };
    // console.log(req.body);
    questionService.createQuestion(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results,
            });
        }
    });
}