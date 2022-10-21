const { model } = require("mongoose");
const customerService = require("../services/customer.service");

// Create and Save a new Customer
exports.create = (req, res, next) => {

    var model = {
        customerName: req.body.customerName,
        customerEmailID: req.body.customerEmailID,
        customerPassword: req.body.customerPassword,
        customerContact: req.body.customerContact,
        billingaddress: req.body.billingaddress
    };
    
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
