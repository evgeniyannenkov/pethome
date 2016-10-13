"use strict";

const express = require('express');
const Advert = require('../schemas/advert');
const router = express.Router();

router.get("/", ( req, res, next ) => {
    Advert.find({})
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
});

//Registration Route
router.post('/', ( req, res, next ) => {
    if ( req.user ) {
        const advert = new Advert();

        advert.type = req.body.type || "dog";
        advert.gender = req.body.gender || "boy";
        advert.age = req.body.age || "1";
        advert.name = req.body.name || `${advert.type}, ${advert.gender} ${advert.age}`;
        advert.publicationDate = new Date();
        advert.advertiserID = req.user._id;

        if ( req.body.breed ) {
            advert.breed = req.body.breed;
        }

        if ( req.body.info ) {
            advert.info = req.body.info;
        }

        advert.save()
              .then(( data )=> {
                  res.json({
                      success : true,
                      advert : data
                  });
              })
              .catch(( error )=> {
                  res.json({
                      success : false,
                      message : error.message
                  });
              });
    } else {
        res.json({
            success : false,
            message : "you should be logged in"
        });
    }
});

module.exports = router;