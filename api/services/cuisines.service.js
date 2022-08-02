const { cuisines } = require("../models/cuisines.model");

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

module.exports = {
    createCuisines,
    updateCuisines
};