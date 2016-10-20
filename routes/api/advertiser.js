"use strict";

const express = require('express');
const passport = require('passport');
const routesConfig = require('../../config/routes');
const Advertiser = require('../../schemas/advertiser');
const Advert = require('../../schemas/advert');
const router = express.Router();

router.get('/:id', ( req, res, next ) => {
    const _id = req.params.id || 0;

    Advertiser.findById(_id)
              .then((user)=>{
                  if(user) {
                      res.json(user);
                  } else {
                      res.json({
                          message: "Get User: user not found",
                          success: false
                      });
                  }
              })
              .catch((error)=>{
                  if(error) {
                      res.json({
                          message: error.message,
                          success: false
                      });
                  }
              });
});
router.get('/:id/adverts', ( req, res, next ) => {
    const _id = req.params.id || 0;

    if ( !_id ) {
        res.json({
            message : "No user id provided.",
            success : false
        });
    } else {
        Advert.find({"advertiserID" : _id}).sort({"publicationDate" : "desc"})
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
