"use strict";

const express = require('express');
const Advert = require('../schemas/advert');
const router = express.Router();

router.get("/:id", ( req, res, next ) => {
    const _id = req.params.id;
    Advert.findById(_id)
          .then(( advert ) => {
              res.render("advert-single", { advert });
          })
          .catch(( error ) => {
              res.json({
                  success : false,
                  message : error.message
              });
          });
});

module.exports = router;