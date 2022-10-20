const { complain } = require("../models/complain.model");
const { MONGO_DB_CONFIG } = require('../config/app.config');

async function createComplain(params, callback) {
    // return console.log(params);
    if (!params.customer || !params.order || !params.question || !params.complainMessage) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }

    const model = new complain(params);
    model.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getComplain(params, callback) {
    const complainMessage = params.complainMessage;
    var condition = complainMessage ? { complainMessage: { $regex: new RegExp(complainMessage), $options: "i" } } : {};

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;

    complain.find(condition, "").populate("customer", "customerName customerEmailID customerContact").populate("question", "questionName")
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

async function updateComplainStatus({ complainId, complainStatus }, callback) {
    // Convert String to Boolean status
    const status = complainStatus === "true" ? true : false

    complain.findByIdAndUpdate(complainId, { complainStatus: status }, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Complain with ID " + complainId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createComplain,
    getComplain,
    updateComplainStatus
};