"use strict";

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Author = require('../schemas/author');
const authors = require("../controllers/author");
const config = require('./oauth');
const FacebookStrategy = require('passport-facebook').Strategy;

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
            authors.create({"contactInfo.email" : email, password, date : new Date().getTime()})
                   .then(( response ) => {
                       if ( response.success ) {
                           done(null, response.author);
                       } else {
                           done(null, false, {message : response.message});
                       }
                   })
                   .catch(( error ) => {
                       if ( error.message.indexOf(email) == -1 && error.message.indexOf("duplicate") == -1 ) {
                           done(error);
                       } else {
                           done(null, false, {message : "This Email is taken."});
                       }
                   });
        }
    ));

    passport.use('local-login', new LocalStrategy({
            "usernameField" : "email",
            "passwordField" : "password",
        },
        function ( email, password, done ) {
            Author.findOne({"contactInfo.email" : email})
                  .then(( user ) => {
                      if ( !user ) {
                          done(null, false, "Login: User not found");
                      } else {
                          if ( !user.blocked ) {
                              user.validatePassword(password)
                                  .then(( data ) => {
                                      if ( data.success ) {
                                          done(null, user);
                                      } else {
                                          done(null, false, {message : data.message});
                                      }
                                  })
                                  .catch(( err ) => {
                                      done(null, false, {message : err});
                                  });
                          } else {
                              done(null, false, {message : "This account is blocked."});
                          }
                      }

                  })
                  .catch(( err ) => {
                      done(err);
                  })
        }
    ));

    //FacebookStrategy
    passport.use(new FacebookStrategy({
            clientID : config.facebook.clientID,
            clientSecret : config.facebook.clientSecret,
            callbackURL : config.facebook.callbackURL,
            profileFields : ['email', 'name', 'photos']
        },
        ( accessToken, refreshToken, profile, done ) => {
            Author.findOne({"contactInfo.email" : profile.emails[0].value})
                  .then(( user ) => {
                      if ( user !== null ) {
                          if ( user.oauthID.facebook && user.oauthID.facebook == profile.id ) {
                              done(null, user);
                          } else {
                              user.oauthID.facebook = profile.id;
                              user.save()
                                  .then(( user ) => {
                                      if ( user ) {
                                          done(null, user);
                                      } else {
                                          done(null, false, {message : "Facebook Authentication: User doesn't saved"});
                                      }
                                  })
                                  .catch(( err ) => {
                                      done(err);
                                  });
                          }
                      } else {
                          authors.create({
                              oauthID : {facebook : profile.id},
                              avatar : profile.photos[0].value || "",
                              name : profile.name.givenName + " " + profile.name.familyName || "Not specified",
                              contactInfo : {email : profile.emails[0].value},
                              password : "test"
                          }).then(( response ) => {
                              if ( response.success ) {
                                  done(null, response.author);
                              } else {
                                  done(null, false, {message : response.message});
                              }
                          }).catch(( err ) => {
                              done(err);
                          });
                      }
                  })
                  .catch(( err ) => {
                      done(err);
                  });
        }
    ));

};