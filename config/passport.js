"use strict";

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Author = require('../schemas/author');
const authors = require("../controllers/author");

module.exports = () => {

    //Save user id to session
    passport.serializeUser(( user, done ) => {
        done(null, user._id);
    });

    //Get user by id from session
    passport.deserializeUser(( userId, done ) => {
        Author.findById(userId, ( err, user ) => {
            done(err, user);
        });
    });

    passport.use('local-register', new LocalStrategy({
            "usernameField" : "email",
            "passwordField" : "password",
        },
        function ( email, password, done ) {
            authors.create({ "contactInfo.email" : email, password })
                   .then(( response ) => {
                       if ( response.success ) {
                           done(null, response.author);
                       } else {
                           done(null, false, response.message);
                       }
                   })
                   .catch(( error ) => {
                       done(error);
                   });
        }
    ));

    passport.use('local-login', new LocalStrategy({
            "usernameField" : "email",
            "passwordField" : "password",
        },
        function ( email, password, done ) {
            Author.findOne({ "contactInfo.email" : email }, ( err, user ) => {
                if ( err ) {
                    done(err);
                }
                if ( !user ) {
                    done(null, false, "Login: User not found");
                } else {
                    user.validatePassword(password)
                        .then(( data ) => {
                            if ( data.success ) {
                                done(null, user);
                            } else {
                                done(null, false, { message : data.message });
                            }
                        })
                        .catch(( err ) => {
                            done(null, false, { message : err });
                        });
                }
            });
        }
    ));
};