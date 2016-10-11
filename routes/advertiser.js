"use strict";

const express = require('express');
const passport = require('passport');
const Advertiser = require('../schemas/advertiser');
const router = express.Router();

//Registration Route
router.post('/', passport.authenticate('local-register'), (req, res, next) => {
    res.json(req.user);
});

//Login Route
router.post('/login', passport.authenticate('local-login'), (req, res, next) => {
    res.json(req.user);
});

//Logout Router
router.get('/logout', (req, res, next) => {
    if(req.session) {
        req.logout();
        req.session.destroy((err) => {
            if(err) {
                next(err);
            } else {
                res.json({
                    message: "User logged out",
                    success: true
                });
            }
        });
    }
});
module.exports = router;
