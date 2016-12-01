"use strict";

const hasher = require('password-hash-and-salt');

const generateHash = ( token ) => {
    return new Promise(( resolve, reject ) => {

        hasher(token).hash(( err, hash ) => {
            if ( err ) {
                reject(err);
            }
            resolve(hash);
        });

    });
};

module.exports = {
    generateHash
};