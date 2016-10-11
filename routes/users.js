"use strict";

const express = require('express');
const passport = require('passport');
const User = require('../schemas/user');
const router = express.Router();

//Registration Router
router.post('/registration', ( req, res, next ) => {
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save()
        .then(function ( response ) {
            res.json(response);
        })
        .catch(function ( response ) {
            res.json(response);
        });
});

//Login Router
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
