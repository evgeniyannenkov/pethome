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

router.get("/:id/delete", ( req, res, next ) => {
    const _id = req.params.id;

    if ( req.user && req.user._id == _id ) {
        Advertiser.findByIdAndRemove(_id)
                  .then(() => {
                      Advert.remove({ advertiserID : _id })
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
            message : "You must be logged in."
        });
    }
});

module.exports = router;
