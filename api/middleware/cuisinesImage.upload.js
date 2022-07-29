const multer = require("multer");
const Path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/cuisines/image");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const fileFilter = (req, file, callback) => {
    const acceptableExt = [".png", ".jpg", ".jpeg"];
    if (!acceptableExt.includes(Path.extname(file.originalname))) {
        return callback(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }

    const filesize = parseInt(req.headers["content-length"]);

    if (filesize > 1048576) {
        return callback(new Error("File Size Big!"));
    }

    callback(null, true);
};

let upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    filesize: 1048576
});

module.exports = upload.single("cuisinesImage");