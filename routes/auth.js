"use strict";

const express = require('express');
const router = express.Router();
const routesConfig = require("../config/routes");
const passport = require("passport");
const passportConfig = require("../config/passport");

//Facebook Routes
//router.get('/facebook', passport.authenticate('facebook', {scope : ['email']}), ( req, res, next ) => {
//
//});
//router.get('/facebook/callback', passport.authenticate('facebook', routesConfig.passportMiddlewareFail), ( req, res, next ) => {
//    res.redirect('/profile');
//});

/* Auth fail. */
router.get('/fail', ( req, res, next ) => {
    res.status(400).json({
        success : false,
        message : req.session.flash.error[req.session.flash.error.length - 1]
    });
});

module.exports = router;
