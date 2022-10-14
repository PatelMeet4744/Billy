const mailService = require("../services/mail.service");

exports.create = (req, res, next) => {

    var model = {
        email: req.body.email,
        subject: req.body.subject,
        html: req.body.body
    };

    console.log(model)

    mailService.testsendemail(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results,
            });
        }
    });

};

