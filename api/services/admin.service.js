const { admin } = require("../models/admin.model");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

async function CreateAdmin(params, callback) {
    if (!params.adminName || !params.adminUserName || !params.adminPassword || !params.adminEmailID) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }

    let model = new admin(params);

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    model.adminPassword = await bcrypt.hash(params.adminPassword, salt);

    await model.save()
        .then((response) => {
            return callback(null, response);
            // return callback(null, { message: "Admin Registration is done successfully..!" });
        })
        .catch((error) => {
            return callback(error);
        });
}

async function loginAdmin({ adminEmailID, adminPassword }, callback) {
    const adminModel = await admin.findOne({ adminEmailID }, { adminName: 1, adminUserName: 1, adminPassword: 1 });
    if (adminModel != null) {
        if (bcrypt.compareSync(adminPassword, adminModel.adminPassword)) {
            const token = auth.generateAccessToken(adminModel.toJSON());
            let admin = { ...adminModel.toJSON() }
            delete admin.adminPassword;
            return callback(null, { admin, token });
        } else {
            return callback({
                message: "Invalid Email/Password"
            });
        }
    }
    else {
        return callback({
            message: "Invalid Email/Password"
        });
    }
}

module.exports = {
    CreateAdmin,
    loginAdmin
};