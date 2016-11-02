"use strict";

const express = require('express');
const redirect = require("../middleware/redirect");
const router = express.Router();

router.get("/", redirect.ifNotAdmin(), ( req, res, next ) => {
    res.send("ADMIN");
});

module.exports = router;