const sendEmail = require("../middleware/sendEmail");

async function testsendemail(params, callback) {
   
    const email = params.email;
    const subject = params.subject;
    const html = params.html;
    
    console.log(email,"Subject", subject, "HTML",html)

    sendEmail.send(email,subject,html).then((response) => {
        return callback(null, response);
    })
    .catch((error) => {
        return callback(error);
    });
}

module.exports = {testsendemail};