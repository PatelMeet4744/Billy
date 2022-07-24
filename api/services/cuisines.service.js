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

module.exports = {
    createCuisines
};