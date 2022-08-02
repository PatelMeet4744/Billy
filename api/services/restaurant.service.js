const { restaurant } = require("../models/restaurant.model");
const bcrypt = require('bcryptjs');

async function createRestaurant(params, callback) {
    if (!params.restaurantName || !params.restaurantAddress || !params.restaurantContact || !params.ownerName || !params.ownerContact || !params.ownerEmailID || !params.ownerPassword) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }

    let model = new restaurant(params);

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    model.ownerPassword = await bcrypt.hash(params.ownerPassword, salt);

    model.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function attachDocumentRestaurant(params, callback) {
    if (!params.gstCertificate || !params.fssaiCertificate || !params.sampleBill || !params.sampleMenu || !params.ownerPan) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }
    const restaurantId = params.restaurantId;
    const { gstCertificate, fssaiCertificate, sampleBill, sampleMenu, ownerPan, cuisines, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = params;

    // return console.log(monday.split(','));

    // Build Restaurant object
    const restaurantFields = {};
    restaurantFields.cuisines = cuisines.split(',')
        .map((item) => item.trim());

    // Build Restaurant Timing object
    restaurantFields.restaurantTiming = {};
    if (monday) {
        restaurantFields.restaurantTiming.monday = monday.split(',')
            .map((item) => item.trim());
    }
    if (tuesday) {
        restaurantFields.restaurantTiming.tuesday = tuesday.split(',')
            .map((item) => item.trim());
    }
    if (wednesday) {
        restaurantFields.restaurantTiming.wednesday = wednesday.split(',')
            .map((item) => item.trim());
    }
    if (thursday) {
        restaurantFields.restaurantTiming.thursday = thursday.split(',')
            .map((item) => item.trim());
    }
    if (friday) {
        restaurantFields.restaurantTiming.friday = friday.split(',')
            .map((item) => item.trim());
    }
    if (saturday) {
        restaurantFields.restaurantTiming.saturday = saturday.split(',')
            .map((item) => item.trim());
    }
    if (sunday) {
        restaurantFields.restaurantTiming.sunday = sunday.split(',')
            .map((item) => item.trim());
    }

    // Build Documet object
    restaurantFields.documents = {};
    restaurantFields.documents.gstCertificate = gstCertificate;
    restaurantFields.documents.fssaiCertificate = fssaiCertificate;
    restaurantFields.documents.sampleBill = sampleBill;
    restaurantFields.documents.sampleMenu = sampleMenu;
    restaurantFields.documents.ownerPan = ownerPan;

    // return console.log(restaurantFields);

    restaurant.findOneAndUpdate({ restaurantId: restaurantId }, { $set: restaurantFields }, { new: true })
        .then((response) => {
            if (!response) callback(`Cannot update Restaurant with ID ${productId}`);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateRestaurantBasicDetailsByPartner(params, callback) {
    if (!params.restaurantName || !params.restaurantContact) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }
    const restaurantId = params.restaurantId;
    restaurant.findByIdAndUpdate(restaurantId, params, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Restaurant with ID " + restaurantId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}


module.exports = {
    createRestaurant,
    attachDocumentRestaurant,
    updateRestaurantBasicDetailsByPartner
};