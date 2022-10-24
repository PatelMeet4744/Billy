const customerService = require("../services/customer.service");
const { v4: uuidv4 } = require('uuid');

// Create and Save a new Customer
exports.create = (req, res, next) => {

    const uniqueString = uuidv4();
    var model = {
        customerName: req.body.customerName,
        customerEmailID: req.body.customerEmailID,
        customerPassword: req.body.customerPassword,
        customerContact: req.body.customerContact,
        customerRandomstring: uniqueString
    };
    // return console.log(model);
    customerService.createCustomer(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results,
            });
        }
    });
}

// Find a single Customer with an id
exports.findOne = (req, res, next) => {
    const customerId = req.params.id;

    customerService.getCustomerById({ customerId }, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results
            });
        }
    });
}

// Update a Customer status by the id in the request
exports.update = (req, res, next) => {

    var model = {
        customerId: req.params.customerId,
        customerName: req.body.customerName,
        customerEmailID: req.body.customerEmailID,
        customerContact: req.body.customerContact
    };
    // return console.log(req.body);
    customerService.updateCustomer(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results,
            });
        }
    });
}

// Retrieve all Customer from the database.
exports.findAll = (req, res, next) => {
    var model = {
        customerName: req.query.customerName,
        pageSize: req.query.pageSize,
        page: req.query.page
    };

    customerService.getCustomer(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results
            });
        }
    });
}

// Delete a Customer with the specified id in the request
exports.delete = (req, res, next) => {
    const customerId = req.params.customerId;

    customerService.deleteCustomer({ customerId }, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results
            });
        }
    });
}

// Update a Customer status by the id in the request
exports.updateStatus = (req, res, next) => {
    const { customerId, customerStatus } = req.params;

    customerService.updateCustomerStatus({ customerId, customerStatus }, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results,
            });
        }
    });
}

// Login Customer
exports.login = (req, res, next) => {
    const { customerEmailID, customerPassword } = req.body;

    customerService.loginCustomer({ customerEmailID, customerPassword }, (error, results) => {
        if (error) {
            return next(error);
        }

        return res.status(200).send({
            message: "Success",
            data: results
        });
    });
}

// Customer Email Verification
exports.EmailVerify = (req, res, next) => {
    const { customerId, customerRandomstring } = req.params;

    customerService.updateCustomerEmailVerify({ customerId, customerRandomstring }, (error, results) => {
        if (error) {
            return next(error);
        }

        return res.status(200).send({
            message: "Success",
            data: results
        });
    });
}

// Customer Password Update
exports.PasswordUpdate = (req, res, next) => {

    var model = {
        customerId: req.params.customerId,
        customerPassword: req.body.customerPassword,
        newpassword: req.body.newpassword
    };
    customerService.updateCustomerPassword(model, (error, results) => {
        if (error) {
            return next(error);
        }

        return res.status(200).send({
            message: "Success",
            data: results
        });
    });
}