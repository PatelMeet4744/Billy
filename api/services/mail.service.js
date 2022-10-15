const sendEmail = require("../middleware/sendEmail");

async function testsendemail(params, callback) {

    const email = params.email;
    const subject = params.subject;
    const html = params.html;

    // console.log(email,"Subject", subject, "HTML",html)
    try {
        const response = sendEmail.send(email, subject, html);
        callback(null, response);
    } catch (error) {
        return callback(error);
    }
}

module.exports = { testsendemail };