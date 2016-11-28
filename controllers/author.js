"use strict";
const Author = require('../schemas/author');
const hasher = require('password-hash-and-salt');

const create = ( data ) => {
    return new Promise(( resolve, reject ) => {
        hasher(data.password).hash(( err, hash ) => {
            if ( err ) {
                reject(err);
            }
            else {
                data.password = hash;
                new Author(data)
                    .save()
                    .then(( author ) => {
                        resolve({
                            success : true,
                            author
                        });
                    })
                    .catch(( error ) => {
                        reject({
                            success : true,
                            message : error.message
                        });
                    });
            }
        });
    });
};

module.exports = {
    create
};