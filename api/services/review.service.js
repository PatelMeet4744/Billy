const { review } = require("../models/review.model");
const { MONGO_DB_CONFIG } = require('../config/app.config');

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

async function updateReview(params, callback) {
    const reviewId = params.reviewId;

    review.findByIdAndUpdate(reviewId, params, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Review with ID " + reviewId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getReview(params, callback) {
    const reviewRating = params.reviewRating;
    var condition = reviewRating ? { reviewRating: { $regex: new RegExp(reviewRating), $options: "i" } } : {};

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;

    review.find(condition, "").populate("item","itemName").populate("customer", "customerName")
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
    createReview,
    getReviewById,
    getReviewByCustomerId,
    updateReview,
    getReview
};