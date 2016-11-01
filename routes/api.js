"use strict";

const router = require('express').Router();

const author = require('./api/author');
const advert = require('./api/advert');

router.use("/author", author);
router.use("/advert", advert);

module.exports = router;