const { category } = require("../models/category.model");
const { MONGO_DB_CONFIG } = require('../config/app.config');

async function creatCategory({ restaurant, categoryName }, callback) {
    if (!categoryName) {
        return callback({
            message: "Category Name is Required!"
        }, "");
    }

    const model = new category({ restaurant, categoryName });
    model.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getCategoryById({ categoryId }, callback) {

    category.findById(categoryId).populate("restaurant", "restaurantName")
        .then((response) => {
            if (!response) callback("Not Found Category with ID " + categoryId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateCategory({ categoryId, categoryName }, callback) {
    if (!categoryName) {
        return callback({
            message: "Category Name is Required!"
        }, "");
    }
    // return console.log(categoryName);
    category.findByIdAndUpdate(categoryId, { categoryName }, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Category with ID " + categoryId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getCategory(params, callback) {
    const categoryName = params.categoryName;
    var condition = categoryName ? { categoryName: { $regex: new RegExp(categoryName), $options: "i" } } : {};

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;

    category.find(condition, "").populate("restaurant", "restaurantName")
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

async function deleteCategory(params, callback) {
    const categoryId = params.categoryId;

    category.findByIdAndDelete(categoryId)
        .then((response) => {
            if (!response) callback("Not Found Category with ID " + categoryId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    creatCategory,
    getCategoryById,
    updateCategory,
    getCategory,
    deleteCategory
};