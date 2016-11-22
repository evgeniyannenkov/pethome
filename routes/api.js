"use strict";

const router = require('express').Router();

const author = require('./api/author');
const pet = require('./api/pet');

router.use("/author", author);
router.use("/pet", pet);

module.exports = router;