const { getTouch } = require("../models/getTouch.model");

async function createGetTouch(params, callback) {
    // return console.log(params);
    if (!params.restaurant || !params.getTouchSubject || !params.getTouchMessage) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }
    const model = new getTouch(params);
    model.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createGetTouch
}