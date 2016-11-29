"use strict";

const express = require('express');
const Author = require('../schemas/author');
const router = express.Router();
const base64 = require('js-base64').Base64;
const hasher = require('password-hash-and-salt');
const moment = require("moment");

router.get("/:id", ( req, res, next ) => {
    const _id = req.params.id;

    if ( req.user && _id == req.user._id ) {
        res.redirect('/profile');
    } else {
        Author.findOne({ _id })
              .then(( author ) => {
                  if ( (author && !author.blocked) || (req.user && req.user.is_admin) ) {
                      res.render("author-single", { author });
                  } else {
                      next();
                  }
              })
              .catch(( error ) => {
                  next();
              });
    }
});

router.get("/reset/:emailHash/:hash", ( req, res, next ) => {
    const emailHash = req.params.emailHash;
    const hash = req.params.hash;
    const email = base64.decode(emailHash);
    const token = moment().format("DD/MM/YYYY") + "_evgenius_verstalikas_superus_adminius_" + email;

    hasher(token).verifyAgainst(hash, function ( err, verified ) {
        if ( err ) {
            next();
        }
        if ( !verified ) {
            next();
        } else {
            res.render("reset", { emailHash, hash });
        }
    });
});

module.exports = router;