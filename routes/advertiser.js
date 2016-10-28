"use strict";

const express = require('express');
const Advertiser = require('../schemas/advertiser');
const router = express.Router();

router.get("/:id", ( req, res, next ) => {
    const _id = req.params.id;
    if ( _id != req.user._id ) {
        Advertiser.findById(_id)
                  .then(( advertiser ) => {
                      if ( advertiser ) {
                          res.render("advertiser-single", {advertiser});
                      } else {
                          next();
                      }
                  })
                  .catch(( error ) => {
                      res.json({
                          success : false,
                          message : error.message
                      });
                  });
    } else {
        res.redirect('/profile');
    }
});

module.exports = router;