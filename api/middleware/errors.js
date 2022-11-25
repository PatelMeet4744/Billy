function errorHandler(err, req, res, next) {
    console.error(err);
    if (typeof err === "string") {
        // custom application error
        return res.status(400).json({ status: false, message: err });
    }

    if (err.name === "ValidationError") {
        // mongoose validation error
        return res.status(400).json({ status: false, message: err.message });
    }

    if (err.name === "UnauthorizedError") {
        // jwt authentication error
        return res.status(401).json({ status: false, message: "Token not valid" });
    }

    if (err.name === "UnauthorizedOTP") {
        return res.status(401).json({ status: false, message: err.message });
    }

    if (err.name === "RequiredField") {
        return res.status(400).json({ status: false, message: err.message });
    }

    return res.status(500).json({ status: false, message: err.message });
}

module.exports = {
    errorHandler
};