const nodemailer = require('nodemailer');
const { MAIL_CONFIG } = require("../config/app.config");
var handlebars = require('handlebars');
var fs = require('fs');

var readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            callback(err);
            throw err;

        }
        else {
            callback(null, html);
        }
    });
};

function send(email, subject, body, option) {
    // return console.log(option);
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: MAIL_CONFIG.AUTH_EMAIL,
            pass: MAIL_CONFIG.AUTH_PASS,
        }
    });
    const today = new Date();
    const year = today.getFullYear();
    readHTMLFile("./html/uploadDocument.html", function (err, html) {
        var template = handlebars.compile(html);
        var replacements = {
            MYDATA: body,
            redirecturl: `http://localhost:3001/Resturant/AttachDocument/${body}`,
            currentyear: year
        };
        var htmlToSend = template(replacements);

        if(option == "couponcode"){
            htmlToSend = body
        }
        // console.log(subject)
        //Send Bulk mail Code
        /*var maillist = ['19bmiit0015@gmail.com','19bmiit032@gmail.com','a.p.choksi420@gmail.com'];
            const mailOptions = {
            from: '"Billy"<MAIL_CONFIG.AUTH_EMAIL>',
            to: maillist,
            subject: subject,
            html: "Hello"
        };
        */
        if(option == "forgot"){
            htmlToSend = body
        }
        const mailOptions = {
            from: '"Billy"<MAIL_CONFIG.AUTH_EMAIL>',
            to: email,
            subject: subject,
            html: htmlToSend
        };



        return transporter.sendMail(mailOptions)
    });
    // transporter.sendMail(mailOptions).then(() => {
    //     return res.status(200).send({ message: "Verification Email send" });
    // })
    //     .catch((error) => {
    //         console.log(error);
    //         return res.status(500).send({ message: "Verification Email Failed" });
    //     })
};

module.exports = {
    send
};