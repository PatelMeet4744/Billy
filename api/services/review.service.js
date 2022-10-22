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

async function getReviewById({ reviewId }, callback) {

    // review.findById(reviewId).populate("customer", "customerName").populate("order", "orderName").populate("item")
    review.findById(reviewId).populate("customer", "customerName").populate("item")
        .then((response) => {
            if (!response) callback("Not Found Review with ID " + reviewId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getReviewByCustomerId({ customer }, callback) {

    // review.findById(reviewId).populate("customer", "customerName").populate("order", "orderName").populate("item")
    review.find({customer}).populate("customer", "customerName").populate("item")
        .then((response) => {
            if (!response) callback("Not Found Review with Customer ID " + customer);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createReview,
    getReviewById,
    getReviewByCustomerId
};