"use strict";

const express = require('express');
const router = express.Router();
const routesConfig = require("../config/routes");
const passport = require("passport");

//Facebook
//router.get('/facebook', passport.authenticate('facebook', {scope : ['email']}), ( req, res, next ) => {
//
//});
//router.get('/facebook/callback', passport.authenticate('facebook', routesConfig.passportMiddlewareFail), ( req, res, next ) => {
//    res.redirect('/profile');
//});

//Registration Route
router.post('/', passport.authenticate('local-register', routesConfig.passportMiddlewareFail), ( req, res, next ) => {
    res.json({
        message : "Registration: success",
        success : true
    });
});

//Login Route
router.post('/login', passport.authenticate('local-login', routesConfig.passportMiddlewareFail), ( req, res, next ) => {
    res.json({
        message : "Login: success",
        success : true
    });
});

//Logout Router
router.get('/logout', ( req, res, next ) => {
    if ( req.session ) {
        req.logout();
        req.session.destroy(( err ) => {
            if ( err ) {
                res.json({
                    message : "Logout failed",
                    success : false
                });
            } else {
                res.json({
                    message : "User logged out",
                    success : true
                });
            }
        });
    }
});

/* Auth fail. */
router.get('/fail', ( req, res, next ) => {
    res.status(400).json({
        success : false,
        message : req.session.flash.error[req.session.flash.error.length - 1]
    });
});

module.exports = router;
