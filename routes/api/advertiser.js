"use strict";

const express = require('express');
const passport = require('passport');
const Advertiser = require('../../schemas/advertiser');
const Advert = require('../../schemas/advert');
const response = require("../../middleware/response");
const router = express.Router();

//Advertiser Get
router.get('/:id', ( req, res, next ) => {
    const _id = req.params.id || 0;

    Advertiser.findById(_id)
              .then(( advertiser )=> {
                  if ( advertiser ) {
                      res.json({
                          advertiser,
                          success : true
                      });
                  } else {
                      res.json({
                          message : "Get User: user not found",
                          success : false
                      });
                  }
              })
              .catch(( error )=> {
                  if ( error ) {
                      res.json({
                          message : error.message,
                          success : false
                      });
                  }
              });
});

//Advertiser Update
router.put('/:id', response.ifLoggedOut(), ( req, res, next ) => {
    const _id = req.params.id || 0;

    const advertiser = req.body || {};

    console.log(req.user);

    if ( _id && advertiser._id && (_id === advertiser._id.toString() && _id === req.user._id.toString()) ) {

        Advertiser.findByIdAndUpdate(_id, advertiser, {new : true})
                  .then(( advertiser )=> {
                      if ( advertiser ) {
                          res.json({
                              advertiser,
                              success : true
                          });
                      } else {
                          res.json({
                              message : "Update User: user not found",
                              success : false
                          });
                      }
                  })
                  .catch(( error )=> {
                      if ( error ) {
                          res.json({
                              message : error.message,
                              success : false
                          });
                      }
                  });

    } else {
        res.json({
            message : "Update User: id isn't correct",
            success : false
        });
    }

});

//Advertiser Get Adverts
router.get('/:id/adverts', ( req, res, next ) => {
    const _id = req.params.id || 0;

    Advert.find({"advertiserID" : _id})
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

//Advertiser Delete
router.get("/:id/delete", response.ifLoggedOut(), ( req, res, next ) => {
    const _id = req.params.id;

    if ( req.user._id == _id ) {
        Advertiser.findByIdAndRemove(_id)
                  .then(() => {
                      Advert.remove({advertiserID : _id})
                            .then(( data ) => {
                                res.json({
                                    success : true,
                                    data
                                });
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
    } else {
        res.json({
            success : false,
            message : "Delete User: id isn't correct"
        });
    }
});

module.exports = router;
