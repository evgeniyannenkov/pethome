"use strict";
const Author = require('../schemas/author');
const hasher = require('password-hash-and-salt');

const create = ( data ) => {
    return new Promise(( resolve, reject ) => {
        Author.findOne({ "contactInfo.email" : data.email }, ( err, author ) => {
            if ( err ) {
                reject(err);
            }
            if ( !author ) {
                hasher(data.password).hash(( err, hash ) => {
                    if ( err ) {
                        reject(err);
                    }
                    else {
                        data.password = hash;
                        author = new Author(data);
                        author.save()
                              .then(( author )=> {
                                  resolve({
                                      success : true,
                                      author
                                  });
                              })
                              .catch(( err ) => {
                                  reject(err);
                              });
                    }
                });
            } else {
                resolve({ success : false, message : "Email is already taken." });
            }
        });
    });
};

module.exports = {
    create
};