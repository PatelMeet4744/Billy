const { getTouch } = require("../models/getTouch.model");
const { MONGO_DB_CONFIG } = require('../config/app.config');

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

async function getGetTouch(params, callback) {
    const getTouchSubject = params.getTouchSubject;
    var condition = getTouchSubject ? { getTouchSubject: { $regex: new RegExp(getTouchSubject), $options: "i" } } : {};

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;

    getTouch.find(condition, "").populate("restaurant", "restaurantName")
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

// Retrieve a Single Get Touch with Restaurant Id
async function getGetTouchById({ restaurant }, callback) {

    getTouch.find({ restaurant: restaurant }).populate("restaurant", "restaurantName")
        .then((response) => {
            if (!response) callback("Not Found Get Touch with ID " + restaurant);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateGetTouchStatus({ getTouchId, getTouchStatus }, callback) {
    // Convert String to Boolean status
    const status = getTouchStatus === "true" ? true : false

    getTouch.findByIdAndUpdate(getTouchId, { getTouchStatus: status }, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Get Touch with ID " + getTouchId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createGetTouch,
    getGetTouch,
    getGetTouchById,
    updateGetTouchStatus
}