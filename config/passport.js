"use strict";

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../schemas/advertizer');

module.exports = () => {

    //Save user id to session
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    //Get user by id from session
    passport.deserializeUser((userId, done) => {
        User.findById(userId, (err, user) => {
            done(err, user);
        });
    });

    passport.use('local-login', new LocalStrategy({
            "usernameField" : "email",
            "passwordField" : "password",
        },
        function ( email, password, done ) {
            User.findOne({email, password}, ( err, user ) => {
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