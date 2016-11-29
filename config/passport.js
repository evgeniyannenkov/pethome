"use strict";

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Author = require('../schemas/author');
const authors = require("../controllers/author");
const config = require('./oauth');
const FacebookStrategy = require('passport-facebook').Strategy;
const VkStrategy = require('passport-vkontakte').Strategy;
const mailer = require("../config/mailer");
const base64 = require('js-base64').Base64;
const md5 = require('md5');
const hasher = require('password-hash-and-salt');

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
            const token = process.env.EMAIL_VERIFY_SECRET + email;
            const emailHash = base64.encodeURI(email);

            hasher(token).hash(( err, hash ) => {
                if ( err ) {
                    done(err);
                } else {

                    const letter = {
                        to : [email],
                        from : 'pethome@gmail.com',
                        subject : 'Registration',
                        html : `<h4>Confirm <a href="${process.env.HOST}/author/verify/${emailHash}/${hash}">email</a></h4>`
                    };

                    authors.create({
                        "contactInfo.email" : email,
                        password,
                        date : new Date().getTime(),
                        "verification.email_secret" : hash
                    })
                           .then(( response ) => {
                               if ( response.success ) {
                                   done(null, response.author);
                                   mailer.send(letter);
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
            const email = profile.emails[0].value;
            const emailHash = base64.encodeURI(email);
            const time = new Date().getTime();
            const password = md5(email + time);
            const token = process.env.EMAIL_VERIFY_SECRET + email;

            const letter = {
                to : [email],
                from : 'pethome@gmail.com',
                subject : 'Facebook registration',
                html : `<h4>Password ${password}</h4>`
            };

            Author.findOne({"contactInfo.email" : email})
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

                          hasher(token).hash(( err, hash ) => {
                              if ( err ) {
                                  done(err);
                              } else {

                                  const confirmLetter = {
                                      to : [email],
                                      from : 'pethome@gmail.com',
                                      subject : 'Registration',
                                      html : `<h4>Confirm <a href="${process.env.HOST}/author/verify/${emailHash}/${hash}">email</a></h4>`
                                  };

                                  authors.create({
                                      oauthID : {facebook : profile.id},
                                      avatar : profile.photos[0].value || "",
                                      name : profile.name.givenName + " " + profile.name.familyName || "Not specified",
                                      contactInfo : {email : email},
                                      password : password,
                                      date : time,
                                      "verification.email_secret" : hash
                                  }).then(( response ) => {
                                      if ( response.success ) {
                                          done(null, response.author);
                                          mailer.send(letter);
                                          mailer.send(confirmLetter);
                                      } else {
                                          done(null, false, {message : response.message});
                                      }
                                  }).catch(( err ) => {
                                      done(err);
                                  });

                              }
                          });

                      }
                  })
                  .catch(( err ) => {
                      done(err);
                  });

        }
    ));

    //VkStrategy
    passport.use(new VkStrategy({
            clientID : config.vk.clientID,
            clientSecret : config.vk.clientSecret,
            callbackURL : config.vk.callbackURL,
            scope : ['email'],
            profileFields : ['email', 'name', 'photos']
        },
        ( accessToken, refreshToken, params, profile, done ) => {

            if ( !params.email ) {
                done(null, false, {message : "VK Authentication: User denied access to email"});
            }

            const email = params.email;
            const emailHash = base64.encodeURI(email);
            const time = new Date().getTime();
            const password = md5(email + time);
            const token = process.env.EMAIL_VERIFY_SECRET + email;
            const letter = {
                to : [email],
                from : 'pethome@gmail.com',
                subject : 'VK registration',
                html : `<h4>Password ${password}</h4>`
            };

            Author.findOne({"contactInfo.email" : email})
                  .then(( user ) => {
                      if ( user !== null ) {
                          if ( user.oauthID.vk && user.oauthID.vk == profile.id ) {
                              done(null, user);
                          } else {
                              user.oauthID.vk = profile.id;
                              user.save()
                                  .then(( user ) => {
                                      if ( user ) {
                                          done(null, user);
                                      } else {
                                          done(null, false, {message : "VK Authentication: User doesn't saved"});
                                      }
                                  })
                                  .catch(( err ) => {
                                      done(err);
                                  });
                          }
                      } else {

                          hasher(token).hash(( err, hash ) => {
                              if ( err ) {
                                  done(err);
                              } else {

                                  const confirmLetter = {
                                      to : [email],
                                      from : 'pethome@gmail.com',
                                      subject : 'Registration',
                                      html : `<h4>Confirm <a href="${process.env.HOST}/author/verify/${emailHash}/${hash}">email</a></h4>`
                                  };

                                  authors.create({
                                      oauthID : {vk : profile.id},
                                      avatar : profile.photos[0].value || "",
                                      name : profile.name.givenName + " " + profile.name.familyName || "Not specified",
                                      contactInfo : {email : email},
                                      password : password,
                                      date : time,
                                      "verification.email_secret" : hash
                                  }).then(( response ) => {
                                      if ( response.success ) {
                                          done(null, response.author);
                                          mailer.send(letter);
                                          mailer.send(confirmLetter);
                                      } else {
                                          done(null, false, {message : response.message});
                                      }
                                  }).catch(( err ) => {
                                      done(err);
                                  });
                              }
                          });

                      }
                  })
                  .catch(( err ) => {
                      done(err);
                  });

        }
    ));

};