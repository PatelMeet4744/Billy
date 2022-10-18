const { customer } = require("../models/customer.model");
const bcrypt = require('bcryptjs');
const auth = require("../middleware/auth");
const sendEmail = require("../middleware/sendEmail");

async function creatCustomer(params, callback) {
    // return console.log(params);

    if (!params.customerName || !params.customerEmailID || !params.customerPassword || !params.customerContact || !params.billingaddress) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }

    const model = new customer(params);
    model.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}


module.exports = {
   creatCustomer
};