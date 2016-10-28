"use strict";

const express = require('express');
const Advertiser = require('../schemas/advertiser');
const router = express.Router();

router.get("/:id", ( req, res, next ) => {
    const _id = req.params.id;

    if ( req.user && _id == req.user._id ) {
        res.redirect('/profile');
    } else {
        Advertiser.findOne({ _id })
                  .then(( advertiser ) => {
                      if ( advertiser ) {
                          res.render("advertiser-single", { advertiser });
                      } else {
                          next();
                      }
                  })
                  .catch(( error ) => {
                      next();
                  });
    }
});

module.exports = router;