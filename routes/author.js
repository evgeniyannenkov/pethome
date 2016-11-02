"use strict";

const express = require('express');
const Author = require('../schemas/author');
const router = express.Router();

router.get("/:id", ( req, res, next ) => {
    const _id = req.params.id;

    if ( req.user && _id == req.user._id ) {
        res.redirect('/profile');
    } else {
        Author.findOne({ _id })
              .then(( author ) => {
                  if ( (author && !author.blocked) || (req.user && req.user.is_admin) ) {
                      res.render("author-single", { author });
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