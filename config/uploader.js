"use strict";

const multer = require('multer');

const imagesStorage = multer.diskStorage({
    destination : ( req, file, callback ) => {
        callback(null, __dirname + '/../uploads/')
    },
    filename : ( req, file, callback ) => {
        callback(null, req.params.id + "-" + file.originalname)
    }
});

const imagesUpload = multer({ storage : imagesStorage });

module.exports = {
    imagesUpload
};