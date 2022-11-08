const { banner } = require("../models/banner.model");
const { MONGO_DB_CONFIG } = require("../config/app.config");

//Create and Save Banner
async function createBanner(params, callback) {
    // return console.log(params);

    if (!params.restaurant || !params.bannerName || !params.bannerImage) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }

    const model = new banner(params);
    model.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

//Get Single Banner By Id
async function getBannerById({ bannerId }, callback) {

    banner.findById(bannerId).populate("restaurant", "restaurantName")
        .then((response) => {
            if (!response) callback("Not Found Banner with ID " + bannerId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

//Get All Banners
async function getBanner(params, callback) {
    const bannerName = params.bannerName;
    var condition = bannerName ? { bannerName: { $regex: new RegExp(bannerName), $options: "i" } } : {};

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;

    banner.find(condition, "").populate("restaurant", "restaurantName")
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

//Get All Banners By Customer
async function getBannerByCustomer(params, callback) {
    const bannerName = params.bannerName;
    var condition = bannerName ? { bannerName: { $regex: new RegExp(bannerName), $options: "i" }, approvalStatus: 3 } : { approvalStatus: 3 };

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;

    banner.find(condition, "").populate("restaurant", "restaurantName")
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

//Delete Banner Using Id
async function deleteBanner({ bannerId }, callback) {
    banner.findByIdAndDelete(bannerId)
        .then((response) => {
            if (!response) callback("Not Found Banner with ID " + bannerId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

//Update the Banner Status
async function updateBannerStatus({ bannerId, bannerStatus }, callback) {
    // Convert String to Boolean status
    const status = bannerStatus === "true" ? true : false

    banner.findByIdAndUpdate(bannerId, { bannerStatus: status }, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Banner with ID " + bannerId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

//Update the Banner ApproveStatus
async function updateBannerApprovalStatus({ bannerId, approvalStatus }, callback) {
    // Convert String to Number status
    const status = Number(approvalStatus);

    banner.findByIdAndUpdate(bannerId, { approvalStatus: status }, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Banner with ID " + bannerId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateBannerDetails(params, callback) {
    if (!params.bannerName || !params.bannerImage) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }
    const bannerId = params.bannerId;
    banner.findByIdAndUpdate(bannerId, params, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Banner with ID " + bannerId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}
module.exports = {
    createBanner,
    getBannerById,
    updateBannerDetails,
    getBanner,
    deleteBanner,
    updateBannerStatus,
    updateBannerApprovalStatus,
    getBannerByCustomer
};