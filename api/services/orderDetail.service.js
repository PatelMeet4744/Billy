const { orderDetail } = require("../models/orderDetail.model");
const { MONGO_DB_CONFIG } = require('../config/app.config');

async function createOrderDetail(params, callback) {
    if (!params.orderMaster || !params.item || !params.orderQty || !params.variant || !params.addon || !params.addextra) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }
    const { orderMaster, item, orderQty, variant, addon, addextra } = params;

    // Build Item Order Detail object
    const orderDetailFields = {};
    orderDetailFields.orderMaster = orderMaster;
    orderDetailFields.item = item;
    orderDetailFields.orderQty = orderQty;
    orderDetailFields.variant = variant;
    orderDetailFields.addon = addon.split(',')
        .map((element) => element.trim());
    orderDetailFields.addextra = addextra.split(',')
        .map((element) => element.trim());

    const model = new orderDetail(orderDetailFields);
    model.save().then((response) => {
        return callback(null, response);
    })
        .catch((error) => {
            return callback(error);
        });
}

async function getOrderDetail(params, callback) {

    orderDetail.aggregate([
              {
            $lookup: {
                from: "items",
                let: { item: "$item" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ['$_id', '$$item'] }
                        }
                    },
                    {
                        $lookup: {
                            from: "restaurants",
                            localField: "restaurant",
                            foreignField: "_id",
                            as: "restaurant"
                        }
                    }, 
                    {
                        $lookup: {
                            from: "categories",
                            localField: "category",
                            foreignField: "_id",
                            as: "category"
                        }
                    },
                    {
                        $project: {                           
                            "category._id":1,
                            "category.categoryName":1,
                            "itemName":1,                           
                            "itemType":1,                           
                            "itemDescription":1, 
                            "itemImage":1,            
                            "restaurant._id":1,
                            "restaurant.restaurantName":1,
                            "restaurant.restaurantContact":1,
                        }
                    },
                    {
                        $unwind: "$category"
                    },
                    {
                        $unwind: "$restaurant"
                    },
                ],
                as: "item"
            }
        },
        {
            $unwind: "$item"
        },
        {
            $lookup: {
                from: "variants",
                localField: "variant",
                foreignField: "_id",
                as: "variant"
            }
        },{
            $project: {                           
                "variant.variantStatus":0,
                "variant.updatedAt":0,
                "variant.createdAt":0,
                "variant.__v":0
            }
        },
        {
            $unwind: "$variant"
        },
        {
            $lookup: {
                from: "addons",
                localField: "addon",
                foreignField: "_id",
                as: "addon"
            }
        },
        {
            $project: {                           
                "addon.restaurant":0,
                "addon.approvalStatus":0,
                "addon.addonStatus":0,
                "addon.updatedAt":0,
                "addon.createdAt":0,
                "addon.__v":0
            }
        },
        {
            $lookup: {
                from: "addextras",
                localField: "addextra",
                foreignField: "_id",
                as: "addextra"
            }
        },
        {
            $project: {                           
                "addextra.restaurant":0,
                "addextra.approvalStatus":0,
                "addextra.addextraStatus":0,
                "addextra.updatedAt":0,
                "addextra.createdAt":0,
                "addextra.__v":0
            }
        },
        {
            $lookup: {
                from: "ordermasters",
                let: { orderMaster: "$orderMaster" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ['$_id', '$$orderMaster'] }
                        }
                    },
                    {
                        $lookup: {
                            from: "customers",
                            localField: "customer",
                            foreignField: "_id",
                            as: "customer"
                        }
                    },     
                    {
                        $project: {                           
                            "customer.customerPassword":0,
                            "customer.billingAddress":0,
                            "customer.customerOTP":0,
                            "customer.customerHash":0,
                            "customer.customerReferralcode":0,
                            "customer.customerFromReferralcode":0,
                            "customer.customerStatus":0,
                            "customer.updatedAt":0,
                            "customer.createdAt":0,
                            "customer.__v":0
                        }
                    },                
                    {
                        $unwind: "$customer"
                    },
                    {
                        $lookup: {
                            from: "billingaddresses",
                            localField: "billingAddress",
                            foreignField: "_id",
                            as: "billingAddress"
                        }
                    }, 
                    {
                        $project: {    
                            "billingAddress.updatedAt":0,
                            "billingAddress.createdAt":0,
                            "billingAddress.__v":0
                        }
                    },                
                    {
                        $unwind: "$billingAddress"
                    },
                ],
                as: "orderMaster"
            }
        },
    ])
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
    // let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    // let page = (Math.abs(params.page) || 1) - 1;
    // // orderDetail.find({}, { "variant": 0, "addon": 0, "addextra": 0 }).populate({ path: "orderMaster", populate: "customer", populate: "billingAddress", select: "customerName customerEmailID customerContact title" }).populate({ path: "item", select: "itemName itemType itemDescription itemImage itemStatus", populate: { path: "restaurant category", select: "restaurantName restaurantAddress restaurantCity restaurantContact ownerName categoryName" } })
    // orderDetail.find({}, { "variant": 0, "addon": 0, "addextra": 0 }).populate({ path: "orderMaster", populate: "customer", select: "customerName customerEmailID customerContact" }).populate({ path: "item", select: "itemName itemType itemDescription itemImage itemStatus", populate: { path: "restaurant category", select: "restaurantName restaurantAddress restaurantCity restaurantContact ownerName categoryName" } })
    //     // .limit(perPage)
    //     // .skip(perPage * page)
    //     .then((response) => {
    //         return callback(null, response);
    //     })
    //     .catch((error) => {
    //         return callback(error);
    //     });

    // ex totalRecord = 20, pageSize = 10. Page 1 =>
}

module.exports = {
    createOrderDetail,
    getOrderDetail
};