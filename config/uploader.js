"use strict";

const multer = require('multer');
const fs = require('fs');

const imagesStorage = multer.diskStorage({
    destination : ( req, file, callback ) => {
        callback(null, __dirname + '/../uploads/')
    },
    filename : ( req, file, callback ) => {
        callback(null, req.params.id + "-" +  new Date().getTime() + "-" + file.originalname)
    }
});

const imagesUpload = multer({ storage : imagesStorage });

const deleteFile = ( src ) => {
    return new Promise(( resolve, reject ) => {
        fs.unlink(src, ( error ) => {
            if ( error ) {
                reject({
                    success : false,
                    message : error.message
                });
            }
            resolve({
                success : true
            });
        });
    });
};

module.exports = {
    imagesUpload,
    deleteFile
};