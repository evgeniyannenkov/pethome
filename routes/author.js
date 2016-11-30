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
    const token = moment().format("DD/MM/YYYY") + process.env.RESET_PASSWORD_SECRET + email;

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

router.get("/verify/:emailHash/:hash", ( req, res, next ) => {
    const hash = req.params.hash;
    const email = base64.decode(req.params.emailHash);
    const token = process.env.EMAIL_VERIFY_SECRET + email;

    hasher(token).verifyAgainst(hash, function ( err, verified ) {
        if ( err ) {
            next();
        }
        if ( !verified ) {
            next();
        } else {

            Author.findOneAndUpdate({
                "contactInfo.email" : email,
                "verification.is_verified" : false
            }, { "verification.is_verified" : true })
                  .then(( user ) => {
                      if ( user ) {
                          res.redirect("/profile");
                      } else {
                          next();
                      }
                  })
                  .catch(( error ) => {
                      next();
                  });
        }
    });

});

module.exports = router;