const categoryService = require("../services/category.service");

// Create and Save a new Category
exports.create = (req, res, next) => {
    const { restaurant, categoryName } = req.body;
    // return console.log(req.body);
    categoryService.creatCategory({ restaurant, categoryName }, (error, results) => {
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

// Find a single category with an id
exports.findOne = (req, res, next) => {
    const categoryId = req.params.id;

    categoryService.getCategoryById({ categoryId }, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results
            });
        }
    });
}

// Update a Category status by the id in the request
exports.update = (req, res, next) => {

    const categoryId = req.params.categoryId;
    const categoryName = req.body.categoryName;
    // return console.log({ categoryId, categoryName });
    categoryService.updateCategory({ categoryId, categoryName }, (error, results) => {
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

// Retrieve all Category from the database.
exports.findAll = (req, res, next) => {

    var model = {
        categoryName: req.query.categoryName,
        pageSize: req.query.pageSize,
        page: req.query.page
    };

    categoryService.getCategory(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results
            });
        }
    });
}

// Delete a Category with the specified id in the request
exports.delete = (req, res, next) => {
    const categoryId = req.params.categoryId;

    categoryService.deleteCategory({ categoryId }, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results
            });
        }
    });
}

// Update a Category status by the id in the request
exports.updateStatus = (req, res, next) => {
    const { categoryId, categoryStatus } = req.params;
    // return console.log({ categoryId, categoryStatus });
    categoryService.updateCategoryStatus({ categoryId, categoryStatus }, (error, results) => {
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