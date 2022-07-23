const multer = require("multer");
const Path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/restaurant/pdf");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const fileFilter = (req, file, callback) => {
    const acceptableExt = [".pdf"];
    if (!acceptableExt.includes(Path.extname(file.originalname))) {
        return callback(new Error("Only .pdf format allowed!"));
    }

    const filesize = parseInt(req.headers["content-length"]);

    if (filesize > 5242880) {
        return callback(new Error("File Size Big!"));
    }
    callback(null, true);
};

let upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    filesize: 5242880 // 5 mb each file have 1 mb
});

module.exports = upload.fields([{ name: 'gstCertificate' }, { name: 'fssaiCertificate' }, { name: 'sampleBill' }, { name: 'sampleMenu' }, { name: 'ownerPan' }])