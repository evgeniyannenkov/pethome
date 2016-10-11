"use strict";

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Advertiser = require('../schemas/advertiser');
const hasher = require('password-hash-and-salt');

module.exports = () => {

    //Save user id to session
    passport.serializeUser(( user, done ) => {
        done(null, user._id);
    });

    //Get user by id from session
    passport.deserializeUser(( userId, done ) => {
        Advertiser.findById(userId, ( err, user ) => {
            done(err, user);
        });
    });

    passport.use('local-register', new LocalStrategy({
            "usernameField" : "email",
            "passwordField" : "password",
        },
        function ( email, password, done ) {
            Advertiser.findOne({"contactInfo.email" : email}, ( err, user ) => {
                if ( err ) {
                    done(err);
                }
                if ( !user ) {
                    hasher(password).hash(( err, hash ) => {
                        if ( err ) {
                            done(err);
                        }
                        else {
                            user = new Advertiser({
                                password : hash,
                                contactInfo : {
                                    email
                                }
                            });
                            user.save()
                                .then(( user )=> {
                                    console.log(user);
                                    done(null, user);
                                })
                                .catch(( err ) => {
                                    console.log(err);
                                    done(err)
                                });
                        }
                    });
                } else {
                    done(null, false, {success : false, message : "Email is already taken"});
                }
            });
        }
    ));

    passport.use('local-login', new LocalStrategy({
            "usernameField" : "email",
            "passwordField" : "password",
        },
        function ( email, password, done ) {
            Advertiser.findOne({"contactInfo.email" : email, password}, ( err, user ) => {
                if ( err ) {
                    done(err);
                }
                if ( !user ) {
                    done(null, false, "user not found");
                } else {
                    done(null, user);
                }
            });
        }
    ));
};