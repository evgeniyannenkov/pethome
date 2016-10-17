const express = require('express');
const router = express.Router();
const redirect = require("../middleware/redirect");

/* GET home page. */
router.get('/', ( req, res, next ) => {
    res.render('index', { title : 'Home' });
});

/* GET profile page. */
router.get('/profile', redirect.ifLoggedOut(), ( req, res, next ) => {
    res.render('profile', { title : 'Profile' });
});

module.exports = router;
