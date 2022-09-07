const itemService = require("../services/item.service");
const uploadImage = require("../middleware/itemImage.upload");
const fs = require("fs");

// Create and Save a new Item
exports.create = (req, res, next) => {
    uploadImage(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            // console.log(req.file);
            const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

            var model = {
                restaurant: req.body.restaurant,
                category: req.body.category,
                itemName: req.body.itemName,
                itemType: req.body.itemType,
                itemDescription: req.body.itemDescription,
                itemAddon: req.body.itemAddon,
                itemAddExtra: req.body.itemAddExtra,
                itemImage: path != "" ? "/" + path : ""
            };

            itemService.creatItem(model, (error, results) => {
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
    });
}

// Retrieve all Item from the database.
exports.findAll = (req, res, next) => {
    var model = {
        itemName: req.query.itemName,
        pageSize: req.query.pageSize,
        page: req.query.page
    };

    itemService.getItem(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results
            });
        }
    });
}

// Find a single item with an id
exports.findOne = (req, res, next) => {
    const itemId = req.params.id;

    itemService.getItemById({ itemId }, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results
            });
        }
    });
}


// Update a Cuisines by the id in the request
exports.update = (req, res, next) => {
    uploadImage(req, res, function (err) {
        let itemImage = "";

        if (err) {
            next(err);
        } else {
            if (req.file != undefined) {
                const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";
                itemImage = "/" + path;

                try {
                    fs.unlinkSync("." + req.body.old_image);
                } catch (error) {
                    next(error);
                }

            } else {
                itemImage = req.body.old_image;
            }

            var model = {
                itemId: req.params.itemId,
                category: req.body.category,
                itemName: req.body.itemName,
                itemType: req.body.itemType,
                itemDescription: req.body.itemDescription,
                itemAddon: req.body.itemAddon,
                itemAddExtra: req.body.itemAddExtra,
                itemImage: itemImage
            };

            itemService.updateItem(model, (error, results) => {
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
    });
}

// Delete a Item with the specified id in the request
exports.delete = (req, res, next) => {
    // return console.log(req.body.itemImage);
    if (!req.body.itemImage) {
        return res.status(500).json({
            message: "Item Image is Required!"
        });
    }
    else {
        try {
            fs.unlinkSync("." + req.body.itemImage);
        } catch (error) {
            next(error);
        }
    }

    const itemId = req.params.itemId;

    itemService.deleteItem({ itemId }, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results
            });
        }
    });
}

// Update a Item status by the id in the request
exports.updateStatus = (req, res, next) => {
    const { itemId, itemStatus } = req.params;
    // return console.log({ itemId, itemStatus });
    itemService.updateItemStatus({ itemId, itemStatus }, (error, results) => {
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

// Update a Item  Approval status by the id in the request
exports.updateApprovalStatus = (req, res, next) => {
    const { itemId, approvalStatus } = req.params;
    // return console.log({ itemId, approvalStatus });
    itemService.updateItemApprovalStatus({ itemId, approvalStatus }, (error, results) => {
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