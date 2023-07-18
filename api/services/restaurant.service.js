const { restaurant } = require("../models/restaurant.model");
const bcrypt = require('bcryptjs');
const auth = require("../middleware/auth");
const sendEmail = require("../middleware/sendEmail");
const { MONGO_DB_CONFIG } = require('../config/app.config');
const mongoose = require("mongoose");
const { cuisines } = require("../models/cuisines.model");
const crypto = require("crypto");

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

    await model.save()
        .then((response) => {
            const email = params.ownerEmailID;
            const subject = "Restaurant Registration";
            const html = response._id.toString().split('"');
            sendEmail.send(email, subject, html)
            return callback(null, { message: "Restaurant Registration is done successfully and check the Email..!" });
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

    // return console.log("Fields: ", restaurantFields, "\nID: ", restaurantId);

    restaurant.findOneAndUpdate({ _id: restaurantId }, { $set: restaurantFields }, { new: true })
        .then((response) => {
            if (!response) callback(`Cannot update Restaurant with ID ${restaurantId}`);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function loginRestaurant({ ownerEmailID, ownerPassword }, callback) {
    const restaurantModel = await restaurant.findOne({ ownerEmailID }, { restaurantName: 1, ownerName: 1, ownerPassword: 1, restaurantStatus: 1 });
    if (restaurantModel != null) {
        if (restaurantModel.restaurantStatus == true) {
            if (bcrypt.compareSync(ownerPassword, restaurantModel.ownerPassword)) {
                const token = auth.generateAccessToken(restaurantModel.toJSON());
                let restaurant = { ...restaurantModel.toJSON() }
                delete restaurant.ownerPassword;
                return callback(null, { restaurant, token });
            } else {
                return callback({
                    message: "Invalid Password"
                });
            }
        }else{
            return callback({
                message: "The status is deactive"
            });
        }
    }
    else {
        return callback({
            message: "Invalid Email ID"
        });
    }
}

async function getSingleRestaurantBasicDetailsByPartner({ restaurantId }, callback) {

    restaurant.findById(restaurantId, "restaurantName restaurantContact restaurantImage")
        .then((response) => {
            if (!response) callback("Not Found Restaurant with ID " + restaurantId);
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

async function getRestaurantDocumentByAdmin({ restaurantId }, callback) {

    restaurant.findById(restaurantId, "documents")
        .then((response) => {
            if (!response) callback("Not Found Restaurant with ID " + restaurantId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function udpdateRestaurantDocumentByAdmin(params, callback) {

    const restaurantId = params.restaurantId;
    const { gstCertificate, fssaiCertificate, sampleBill, sampleMenu, ownerPan } = params;

    // return console.log(monday.split(','));

    // Build Restaurant object
    const restaurantFields = {};

    // Build Documet object
    restaurantFields.documents = {};
    restaurantFields.documents.gstCertificate = gstCertificate;
    restaurantFields.documents.fssaiCertificate = fssaiCertificate;
    restaurantFields.documents.sampleBill = sampleBill;
    restaurantFields.documents.sampleMenu = sampleMenu;
    restaurantFields.documents.ownerPan = ownerPan;

    // return console.log(restaurantFields);

    restaurant.findOneAndUpdate({ _id: restaurantId }, { $set: restaurantFields }, { new: true })
        .then((response) => {
            if (!response) callback(`Cannot update Restaurant with ID ${restaurantId}`);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateRestaurantStatus({ restaurantId, restaurantStatus }, callback) {
    // Convert String to Boolean status
    const status = restaurantStatus === "true" ? true : false
    // return console.log(status);
    restaurant.findByIdAndUpdate(restaurantId, { restaurantStatus: status }, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Restaurant with ID " + restaurantId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getAllRestauranByCustomer(params, callback) {
    const restaurantName = params.restaurantName;
    var condition = restaurantName ? { restaurantName: { $regex: new RegExp(restaurantName), $options: "i" }, restaurantStatus: true } : { restaurantStatus: true };

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;

    restaurant.find(condition, "").populate("cuisines", "cuisinesName")
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

async function updateRestaurantPassword(params, callback) {
    // return console.log("The Parma",params)
    // restaurant.findById(restaurantId)

    const restaurantModel = await restaurant.findById(params.restaurantId, { ownerPassword: 1 });
    if (restaurantModel != null) {
        if (bcrypt.compareSync(params.ownerPassword, restaurantModel.ownerPassword)) {
            if (params.newpassword == params.confirmPassword) {
                if (params.newpassword == params.ownerPassword) {
                    return callback({
                        message: "The old password and new password is same"
                    })
                } else {
                    const salt = await bcrypt.genSalt(10);
                    hashpassword = await bcrypt.hash(params.newpassword, salt);
                    restaurant.findByIdAndUpdate(params.restaurantId, { ownerPassword: hashpassword }, { useFindAndModify: false })
                        .then((response) => {
                            return callback(null, response);
                        })
                        .catch((error) => {
                            return callback(error);
                        });
                }
            } else {
                return callback({
                    message: "The new Passwords and confirm password are not Match"
                });
            }
        } else {
            return callback({
                message: "The old Password was wrong"
            });
        }
    } else {
        return callback({
            message: "The Email is not Found"
        });
    }
}

async function getRestaurantbyCuisines(cuisinesId, callback) {

    restaurant.find({ "cuisines": cuisinesId, "restaurantStatus": true }, { restaurantName: 1, restaurantImage: 1, restaurantAddress: 1 }).populate({ path: "cuisines", match: { cuisinesStatus: true }, select: "cuisinesName" })
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

// Forgot Password
async function forgotPassword(params, callback) {
    
    const restaurantModel = await restaurant.findOne({ ownerEmailID: params.ownerEmailID })

    if (!restaurantModel) {
        return callback(null, { message: "The Restaurant Is not found with" });
    }
    let resetToken = crypto.randomBytes(20).toString("hex");
    let email = params.ownerEmailID
    const id = restaurantModel._id.toString().split('"');
    const resetPasswordUrl = `http://localhost:3000/Partner/password/reset/${id[0]}/${resetToken}`;
    const subject = "Billy Password Recovery"
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n<br/>If you have not requested this email then, please ignore it.`;

    const option = "forgot"
    try {
        sendEmail.send(email, subject, message, option)
        restaurant.findByIdAndUpdate(id[0], { restPasswordToken: resetToken }, { useFindAndModify: false })
            .then((response) => {
                if (!response) callback("Not Found Restaurant with ID " + restaurantId);
                else return callback(null, { message: "The Email is send to your email id please check the Email..!" });
            })
            .catch((error) => {
                return callback(error);
            });

    }
    catch (e) {
        console.log(e);
    }
};

async function resetPassword(params, callback) {
    const restaurantModel = await restaurant.findById(params.restaurantId, { restPasswordToken: 1 });
    if (restaurantModel != null) {
        if (params.newpassword == params.confirmPassword) {
            if (params.restPasswordToken == restaurantModel.restPasswordToken) {
                const salt = await bcrypt.genSalt(10);
                hashpassword = await bcrypt.hash(params.newpassword, salt);
                restaurant.findByIdAndUpdate(params.restaurantId, { ownerPassword: hashpassword, restPasswordToken: '' }, { useFindAndModify: false })
                    .then((response) => {
                        return callback(null, { message: "The Password reset Sucssfully!" });
                    })
                    .catch((error) => {
                        return callback(error);
                    });

            } else {
                return callback({
                    message: "The Token was wrong"
                });
            }
        } else {
            return callback({
                message: "The new Passwords and confirm password are not Match"
            });
        }

    } else {
        return callback({
            message: "The Restaurant is not Found"
        });
    }
};

module.exports = {
    createRestaurant,
    attachDocumentRestaurant,
    loginRestaurant,
    getSingleRestaurantBasicDetailsByPartner,
    updateRestaurantBasicDetailsByPartner,
    getRestaurantDocumentByAdmin,
    udpdateRestaurantDocumentByAdmin,
    updateRestaurantStatus,
    getAllRestauranByCustomer,
    updateRestaurantPassword,
    getRestaurantbyCuisines,
    forgotPassword,
    resetPassword
};