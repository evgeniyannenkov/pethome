"use strict";

const express = require('express');
const passport = require('passport');
const Author = require('../../schemas/author');
const Advert = require('../../schemas/advert');
const response = require("../../middleware/response");
const router = express.Router();

//Author Get All
router.get('/', ( req, res, next ) => {
    Author.find({})
          .then(( authorsArray )=> {
              if ( authorsArray ) {
                  let authors = {},
                      author;

                  for ( let index = 0; index < authorsArray.length; index++ ) {
                      author = authorsArray[ index ];
                      authors[ author._id ] = author;
                  }

                  res.json({
                      success : true,
                      authors
                  });
              } else {
                  res.json({
                      success : false,
                      user : "Get users : No users"
                  });
              }
          })
          .catch(( error )=> {
              res.json({
                  success : false,
                  message : error.message
              });
          });
});
//Author Get Current
router.get('/current', response.ifLoggedOut(), ( req, res, next ) => {
    res.json({
        success : true,
        user : req.user
    });
});

//Author Get
router.get('/:id', ( req, res, next ) => {
    const _id = req.params.id || 0;

    Author.findById(_id)
          .then(( author )=> {
              if ( author ) {
                  res.json({
                      author,
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

//Author Update
router.put('/:id', response.ifLoggedOut(), ( req, res, next ) => {
    const _id = req.params.id || 0;

    const author = req.body || {};

    if ( _id && author._id && req.user && (_id === author._id.toString() && (_id === req.user._id.toString() || req.user.is_admin)) ) {

        Author.findOneAndUpdate({ _id, is_admin : author.is_admin }, author, { new : true })
              .then(( author )=> {

                  if ( author ) {
                      res.json({
                          author,
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

//Author Get Adverts
router.get('/:id/adverts', ( req, res, next ) => {
    const _id = req.params.id || 0;

    Advert.find({ "author" : _id })
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

//Author Delete
router.get("/:id/delete", response.ifLoggedOut(), ( req, res, next ) => {
    const _id = req.params.id;

    if ( req.user._id == _id ) {
        Author.findByIdAndRemove(_id)
              .then(() => {
                  Advert.remove({ author : _id })
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

//Author Block
router.get("/:id/block", response.ifNotAdmin(), ( req, res, next ) => {
    const _id = req.params.id;

    if ( req.user._id != _id ) {
        Author.findByIdAndUpdate(_id, { blocked : true })
              .then(( author ) => {
                  if ( author ) {
                      res.json({ success : true, message : "Author Block : Blocked." });
                  } else {
                      res.json({
                          success : false,
                          message : "Author Block : Not Found."
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
            success : false,
            message : "Author Block : Can Not Block Yourself, stupido"
        });
    }
});

//Author Unblock
router.get("/:id/unblock", response.ifNotAdmin(), ( req, res, next ) => {
    const _id = req.params.id;

    if ( req.user._id != _id ) {
        Author.findByIdAndUpdate(_id, { blocked : false })
              .then(( author ) => {
                  if ( author ) {
                      res.json({ success : true, message : "Author Block : Unblocked." });
                  } else {
                      res.json({
                          success : false,
                          message : "Author Block : Not Found."
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
            success : false,
            message : "Author Block : Can Not Unblock Yourself, stupido"
        });
    }
});

module.exports = router;
