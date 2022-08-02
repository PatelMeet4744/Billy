const { cuisines } = require("../models/cuisines.model");
const { MONGO_DB_CONFIG } = require('../config/app.config');

async function createCuisines(params, callback) {
    if (!params.cuisinesName) {
        return callback({
            message: "Cuisines Name is Required!"
        }, "");
    }

    const model = new cuisines(params);
    model.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateCuisines(params, callback) {
    const cuisinesId = params.cuisinesId;

    cuisines.findByIdAndUpdate(cuisinesId, params, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Cuisines with ID " + cuisinesId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getCuisines(params, callback) {
    const cuisinesName = params.cuisinesName;
    var condition = cuisinesName ? { cuisinesName: { $regex: new RegExp(cuisinesName), $options: "i" } } : {};

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;

    cuisines.find(condition, "")
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

async function deleteCuisines(params, callback) {
    const cuisinesId = params.cuisinesId;

    cuisines.findByIdAndDelete(cuisinesId)
        .then((response) => {
            if (!response) callback("Not Found Cuisines with ID " + cuisinesId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}
module.exports = {
    createCuisines,
    updateCuisines,
    getCuisines,
    deleteCuisines
};