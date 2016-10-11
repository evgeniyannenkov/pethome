var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function ( req, res, next ) {
    res.render('index', {title : 'Home'});
});

router.get('/registration', function ( req, res, next ) {
    res.render('auth', {type : 'registration'});
});

router.get('/login', function ( req, res, next ) {
    res.render('auth', {type : 'login'});
});

module.exports = router;
