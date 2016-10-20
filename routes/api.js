"use strict";

const router = require('express').Router();

const advertiser = require('./api/advertiser');
const advert = require('./api/advert');

router.use("/advertiser", advertiser);
router.use("/advert", advert);

module.exports = router;