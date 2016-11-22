"use strict";

const express = require('express');
const Pet = require('../schemas/pet');
const router = express.Router();

router.get("/:id", ( req, res, next ) => {
    const _id = req.params.id;
    Pet.findById(_id)
          .then(( pet ) => {
              if ( pet ) {
                  res.render("pet-single", { pet });
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
});

module.exports = router;