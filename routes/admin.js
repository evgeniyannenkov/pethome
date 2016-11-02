"use strict";

const express = require('express');
const redirect = require("../middleware/redirect");
const router = express.Router();

router.use(redirect.ifNotAdmin);

router.get("/", ( req, res, next ) => {
    res.render("admin", { title : "Admin Area" });
});

module.exports = router;