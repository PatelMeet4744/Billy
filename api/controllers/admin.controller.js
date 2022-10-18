const { mongoose } = require("mongoose");
const adminService = require("../services/admin.service");

//Create Or Save New Admin
exports.create = (req, res, next) => {

    var model = {
        adminName: req.body.adminName,
        adminUserName: req.body.adminUserName,
        adminPassword: req.body.adminPassword,
        adminEmailID: req.body.adminEmailID
    }

    adminService.CreateAdmin(model, (error, results) => {
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

// Login Admin
exports.login = (req, res, next) => {
    const { adminEmailID, adminPassword } = req.body;
    // return console.log(req.body);
    // return console.log({ ownerEmailID, ownerPassword });
    adminService.loginAdmin({ adminEmailID, adminPassword }, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results
        });
    });
}