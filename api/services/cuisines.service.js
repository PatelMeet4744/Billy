const { cuisines } = require("../models/cuisines.model");
const { restaurant } = require("../models/restaurant.model");
const { MONGO_DB_CONFIG } = require('../config/app.config');

async function createCuisines(params, callback) {
    if (!params.cuisinesName || !params.cuisinesDescription || !params.cuisinesImage || !params.cuisinesBanner) {
        return callback({
            message: "Some Fields are Required"
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

async function getCuisinesById({ cuisinesId }, callback) {

    cuisines.findById(cuisinesId)
        .then((response) => {
            if (!response) callback("Not Found Cuisines with ID " + cuisinesId);
            else callback(null, response);
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
async function getCuisinesByCustomer(params, callback) {
    const cuisinesName = params.cuisinesName;
    var condition = cuisinesName ? { cuisinesName: { $regex: new RegExp(cuisinesName), $options: "i" }, cuisinesStatus: true } : { cuisinesStatus: true };

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

async function deleteCuisines({ cuisinesId }, callback) {
    cuisines.findByIdAndDelete(cuisinesId)
        .then((response) => {
            if (!response) callback("Not Found Cuisines with ID " + cuisinesId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateCuisinesStatus({ cuisinesId, cuisinesStatus }, callback) {
    // Convert String to Boolean status
    const status = cuisinesStatus === "true" ? true : false

    cuisines.findByIdAndUpdate(cuisinesId, { cuisinesStatus: status }, { useFindAndModify: false })
        .then((response) => {
            restaurant.updateMany({ cuisines: cuisinesId }, { $set: { restaurantStatus: status } }, { useFindAndModify: false })
                .catch((error) => {
                    return callback(error);
                });
            if (!response) callback("Not Found Cuisines with ID " + cuisinesId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createCuisines,
    getCuisinesById,
    updateCuisines,
    getCuisines,
    deleteCuisines,
    updateCuisinesStatus,
    getCuisinesByCustomer
};