"use strict";

const express = require('express');
const passport = require('passport');
const routesConfig = require('../../config/routes');
const Advertiser = require('../../schemas/advertiser');
const Advert = require('../../schemas/advert');
const router = express.Router();

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

//Logout Router
router.get('/:id/adverts', ( req, res, next ) => {
    const _id = req.params.id || 0;

    if ( !_id ) {
        res.json({
            message : "No user id provided.",
            success : false
        });
    } else {
        Advert.find({ "advertiserID" : _id }).sort({ "publicationDate" : "desc" })
              .then(( adverts ) => {
                  res.json({
                      adverts,
                      success : true
                  });
              })
              .catch(( error ) => {
                  res.json({
                      success : false,
                      message : error.message
                  });
              });
    }
});

module.exports = router;
