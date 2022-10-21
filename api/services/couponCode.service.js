const { couponCode } = require("../models/couponCode.model");
const { MONGO_DB_CONFIG } = require('../config/app.config');
const sendEmail = require("../middleware/sendEmail");

async function createCouponCode(params, callback) {
    // return console.log(params);

    if (!params.couponCodeName || !params.couponCodeType || !params.couponCodeValue || !params.couponCodeCartMinValue || !params.couponCodeExpiredon) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }

    const model = new couponCode(params);
    model.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getCouponCode(params, callback) {
    const couponCodeName = params.couponCodeName;
    var condition = couponCodeName ? { couponCodeName: { $regex: new RegExp(couponCodeName), $options: "i" } } : {};

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;

    couponCode.find(condition, "")
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

async function getCouponCodeById({ couponCodeId }, callback) {

    couponCode.findById(couponCodeId)
        .then((response) => {
            if (!response) callback("Not Found Coupon Code with ID " + couponCodeId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateCouponCode(params, callback) {
    const couponCodeId = params.couponCodeId;

    couponCode.findByIdAndUpdate(couponCodeId, params, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Coupon Code with ID " + couponCodeId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function deleteCouponCode(params, callback) {
    const couponCodeId = params.couponCodeId;

    couponCode.findByIdAndDelete(couponCodeId)
        .then((response) => {
            if (!response) callback("Not Found Coupon Code with ID " + couponCodeId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateCouponCodeStatus({ couponCodeId, couponCodeStatus }, callback) {
    // Convert String to Boolean status
    const status = couponCodeStatus === "true" ? true : false

    couponCode.findByIdAndUpdate(couponCodeId, { couponCodeStatus: status }, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Coupon Code with ID " + couponCodeId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function ExpiredCouponCode(callback) {

    couponCode.find()
        .then((response) => {
            if (!response) callback("Not Found Coupon Code");
            else {
                response.map(function (element) {
                    var today = new Date();
                    // console.log("Todya value is", today);
                    // const CurrentDate = today.getFullYear()+ "-" + (today.getMonth() + 1) + "-" + today.getDate();
                    // console.log(" The Current Date is",CurrentDate)
                    // console.log(element.couponcodeExpiredon)
                    // var FinalDate =  expireddate.toString();
                    // console.log("The Expired",expireddate)
                    if (element.couponCodeExpiredon < today) {
                        var id = element._id.toString().split('"');
                        // console.log("The expired Date ID", id);
                        couponCode.findByIdAndUpdate(id, { couponCodeStatus: false })
                            .then((response) => {
                                if (!response) callback("Not Found Coupon Code with ID " + id);
                                else {
                                    console.log("Status Updated");
                                }
                            })
                            .catch((error) => {
                                return callback(error);
                            });
                    }
                });
                callback(null, response);
            }
        })
        .catch((error) => {
            return callback(error);
        });
}

async function SendCouponCode(params, callback) {

    couponCode.find()
        .then((response) => {
            const sendcouponCodeValue = response.map(item => ({ couponcodeName: item.couponCodeName, couponcodeValue: item.couponCodeValue }));
            // var sendcouponCodeValue = [];
            // sendcouponCodeValue = response.map(item => item.couponcodeName, item.couponcodeValue);
            // return console.log("The Coupon code Send Value is ", sendcouponCodeValue);
            // setattachDocument({ ...attachDocument, cuisines: [setdddata.map(item => item.cuisinesId).join(', ')] })

            const email = params.CustomerEmailId;
            const subject = "Coupon Code";
            const html = "";
            // console.log("Run Successfuuly")
            // sendEmail.send(email, subject, html);

            try {
                sendEmail.send(email, subject, html);
                callback("Email Send");
            }
            catch (e) {
                console.log(e);
            }
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createCouponCode,
    getCouponCode,
    getCouponCodeById,
    updateCouponCode,
    deleteCouponCode,
    updateCouponCodeStatus,
    ExpiredCouponCode,
    SendCouponCode
}