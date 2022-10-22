const { customer } = require("../models/customer.model");
const bcrypt = require('bcryptjs');
const auth = require("../middleware/auth");
const { MONGO_DB_CONFIG } = require('../config/app.config');

async function createCustomer(params, callback, req, res) {
    // return console.log(params);

    if (!params.customerName || !params.customerEmailID || !params.customerPassword || !params.customerContact || !params.billingAddress) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }
    let model = new customer(params);

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    model.customerPassword = await bcrypt.hash(params.customerPassword, salt);
    //  return console.log(model);
    const customerEmailID = params.customerEmailID;

    customer.find({customerEmailID}).then(result => {
        console.log("Result Data",result)
        if (result.length) {
            return callback(null, { message: "Customer with the provided Email already exists!" });
        } else {          
            model.save()
                .then((response) => {
                    return callback(null, response);
                })
                .catch((error) => {
                    return callback(error);
                });
        }
    }).catch(err => {
        return callback(err);
    })
}

async function getCustomerById({ customerId }, callback) {

    // customer.findById(customerId).populate("billingAddress")
    customer.findById(customerId).populate("billingAddress")
        .then((response) => {
            if (!response) callback("Not Found Customer with ID " + customerId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateCustomer(params, callback) {
    const customerId = params.customerId;

    customer.findByIdAndUpdate(customerId, params, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Customer with ID " + customerId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getCustomer(params, callback) {
    const customerName = params.customerName;
    var condition = customerName ? { customerName: { $regex: new RegExp(customerName), $options: "i" } } : {};

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;

    customer.find(condition, "")
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

async function deleteCustomer(params, callback) {
    const customerId = params.customerId;

    customer.findByIdAndDelete(customerId)
        .then((response) => {
            if (!response) callback("Not Found Customer with ID " + customerId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateCustomerStatus({ customerId, customerStatus }, callback) {
    // Convert String to Boolean status
    const status = customerStatus === "true" ? true : false

    customer.findByIdAndUpdate(customerId, { customerStatus: status }, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Customer with ID " + customerId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function loginCustomer({ customerEmailID, customerPassword }, callback) {
    const customerModel = await customer.findOne({ customerEmailID }, { customerName: 1, customerPassword: 1 });
    // console.log(customerModel);
    if (customerModel != null) {
        if (bcrypt.compareSync(customerPassword, customerModel.customerPassword)) {
            const token = auth.generateAccessToken(customerModel.toJSON());
            let customer = { ...customerModel.toJSON() }
            delete customer.customerPassword;
            return callback(null, { customer, token });
        } else {
            return callback({
                message: "Invalid Password"
            });
        }
    }
    else {
        return callback({
            message: "Invalid Email"
        });
    }
}

async function updateCustomerEmailVerify({ customerId, customerRandomstring }, callback) {
    customer.findById(customerId)
    const customerModel = await customer.findById(customerId, { customerRandomstring: 1});
    if (customerModel != null) {
        if(customerModel.customerRandomstring === customerRandomstring)
        {
            customer.findByIdAndUpdate(customerId, { customerEmailVerify: true }, { useFindAndModify: false })
            .then((response) => {
                if (!response) callback("Not Found Customer with ID " + customerId);
                else callback(null, response);
            })
            .catch((error) => {
                return callback(error);
            });
        }else {
            return callback({
                message: "The Random String was wrong"
            });
        }
    }else {
        return callback({
            message: "The Email is not Found"
        });
    }
}

async function updateCustomerPassword({ customerId, customerPassword, newpassword }, callback) {
    customer.findById(customerId)
    const customerModel = await customer.findById(customerId, { customerPassword: 1});
    if (customerModel != null) {
        if (bcrypt.compareSync(customerPassword, customerModel.customerPassword)) {
            const salt = await bcrypt.genSalt(10);
            hashpassword = await bcrypt.hash(newpassword, salt);
            customer.findByIdAndUpdate(customerId, { customerPassword: hashpassword }, { useFindAndModify: false })
            .then((response) => {
                if (!response) callback("Not Found Customer with ID " + customerId);
                else callback(null, response);
            })
            .catch((error) => {
                return callback(error);
            });
        }else {
            return callback({
                message: "The Password was wrong"
            });
        }
    }else {
        return callback({
            message: "The Email is not Found"
        });
    }
}

module.exports = {
    createCustomer,
    getCustomerById,
    updateCustomer,
    getCustomer,
    deleteCustomer,
    updateCustomerStatus,
    loginCustomer,
    updateCustomerEmailVerify,
    updateCustomerPassword
};