"use strict";

const express = require('express');
const Advert = require('../../schemas/advert');
const router = express.Router();
const response = require("../../middleware/response");
const uploader = require("../../config/uploader");

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
    const newAdvert = req.body || {};

    let image;

    if ( newAdvert._id && newAdvert._id == _id ) {

        Advert.findOne({_id, advertiserID : req.user.id})
              .then(( advert ) => {
                  if ( advert ) {
                      for ( let i = 0; i < advert.images.length; i++ ) {
                          image = advert.images[i];
                          if ( newAdvert.images.indexOf(image) === -1 ) {
                              uploader.deleteFile(image)
                                  .then(( response ) => {
                                      console.log(response.data.success);
                                  })
                                  .catch(( error ) => {
                                      console.log(err);
                                  });
                          }
                      }
                      advert.images = newAdvert.images;
                      advert.save()
                            .then(( newAdvert ) => {
                                res.json({newAdvert, success : true, message: "Update Advert: saved"});
                            })
                            .catch(( err ) => {
                                res.json({
                                    message : "Update Advert: not saved",
                                    error_message : err.message,
                                    success : false
                                });
                            });
                  } else {
                      res.json({
                          message : "Update Advert: not found",
                          success : false
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

router.post('/', response.ifLoggedOut(), ( req, res, next ) => {

    const advert = new Advert();

    advert.type = req.body.type || advert.type;
    advert.gender = req.body.gender || advert.gender;
    advert.age = req.body.age || advert.age;
    advert.name = req.body.name || `${advert.type}, ${advert.gender} ${advert.age}`;
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

});

router.get("/:id/delete", response.ifLoggedOut(), ( req, res, next ) => {
    const _id = req.params.id;

    let image;

    Advert.findOneAndRemove({_id, advertiserID : req.user._id})
          .then(( advert ) => {
              if ( advert ) {
                  for ( let i = 0; i < advert.images.length; i++ ) {
                      image = advert.images[i];
                      uploader.deleteFile(image)
                          .then(( response ) => {
                              console.log(response.data.success);
                          })
                          .catch(( error ) => {
                              console.log(err);
                          });
                  }
                  res.json({success : true, advert, redirect : "/profile"});
              } else {
                  res.json({success : false, message : "No advert was removed."});
              }
          })
          .catch(( error ) => {
              res.json({
                  success : false,
                  message : error.message
              });
          });
});

router.post("/:id/images", response.ifLoggedOut(), uploader.imagesUpload.single('images'), ( req, res, next ) => {
    const _id = req.params.id;
    const uploads = "uploads/";
    const src = uploads + req.file.filename;

    Advert.findOne({_id})
          .then(( advert ) => {
              if ( advert ) {
                  advert.images.push(src);
                  if ( !advert.mainImage ) {
                      advert.mainImage = src;
                  }
                  advert.save()
                        .then(( newAdvert ) => {
                            res.json({newAdvert, success : true});
                        })
                        .catch(( err ) => {
                            res.json({
                                message : "Save Advert: not saved",
                                error_message : err.message,
                                success : false
                            });
                        });

              } else {
                  res.json({
                      message : "Find Advert: not found",
                      success : false
                  });
              }
          })
          .catch(( error ) => {
              res.json({
                  success : false,
                  message : error.message
              });
          });

});

module.exports = router;