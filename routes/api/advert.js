"use strict";

const express = require('express');
const Advert = require('../../schemas/advert');
const router = express.Router();
const response = require("../../middleware/response");

router.get("/", ( req, res, next ) => {
    Advert.find({})
          .sort({"publicationDate" : "desc"})
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

router.get("/:id", ( req, res, next ) => {
    const _id = req.params.id;
    Advert.findById(_id)
          .then(( advert ) => {
              res.json({advert, success : true});
          })
          .catch(( error ) => {
              res.json({
                  success : false,
                  message : error.message
              });
          });
});

router.put("/:id", response.ifLoggedOut(), ( req, res, next ) => {
    const _id = req.params.id;
    const advert = req.body || {};

    if ( _id && advert._id && advert._id == _id ) {

        Advert.findOneAndUpdate({_id, advertiserID : req.user.id}, advert, {new : true})
              .then(( advert ) => {
                  if ( advert ) {
                      res.json({advert, success : true});
                  } else {
                      res.json({
                          message: "Update Advert: not found",
                          success: false
                      });
                  }
              })
              .catch(( error ) => {
                  res.json({
                      success : false,
                      message : error.message
                  });
              });
    } else {
        res.json({
            message : "Update Advert: id isn't correct",
            success : false
        });
    }
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