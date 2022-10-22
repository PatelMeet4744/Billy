const { review } = require("../models/review.model");

async function createReview(params, callback) {
    // return console.log(params);

    if (!params.customer || !params.order || !params.item || !params.reviewRating || !params.reviewComment) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }

    const model = new review(params);
    model.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createReview
};