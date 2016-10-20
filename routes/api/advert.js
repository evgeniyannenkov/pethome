"use strict";

const express = require('express');
const Advert = require('../../schemas/advert');
const router = express.Router();

router.get("/", ( req, res, next ) => {
    Advert.find({})
          .sort({ "publicationDate" : "desc" })
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
              res.json({ advert, success : true });
          })
          .catch(( error ) => {
              res.json({
                  success : false,
                  message : error.message
              });
          });
});

router.get("/:id/delete", ( req, res, next ) => {
    const _id = req.params.id;

    Advert.findById(_id)
          .then(( advert ) => {
              advert.remove()
                    .then(() => {
                        res.json({ success : true, redirect : "/profile" });
                    })
                    .catch(( error ) => {
                        res.json({
                            success : false,
                            message : error.message
                        });
                    });
          })
          .catch(( error ) => {
              res.json({
                  success : false,
                  message : error.message
              });
          });
});

router.put("/:id", ( req, res, next ) => {
    const _id = req.params.id;
    const advert = req.body || {};
    let updateData = {};
    if ( _id && advert._id && advert._id == _id && req.user && advert.advertiserID && advert.advertiserID == req.user._id ) {

        if ( advert.name ) {
            updateData.name = advert.name;
        }
        if ( advert.age ) {
            updateData.age = advert.age;
        }
        if ( advert.breed ) {
            updateData.breed = advert.breed;
        }
        if ( advert.gender ) {
            updateData.gender = advert.gender;
        }
        if ( advert.info ) {
            updateData.info = advert.info;
        }
        if ( advert.type ) {
            updateData.type = advert.type;
        }

        Advert.findByIdAndUpdate(_id, updateData, { new : true })
              .then(( advert ) => {
                  res.json({ advert, success : true });
              })
              .catch(( error ) => {
                  res.json({
                      success : false,
                      message : error.message
                  });
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