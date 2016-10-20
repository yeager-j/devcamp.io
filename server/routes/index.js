var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'UYI*^()$536euq2iyfru6&RTYUj',
    userProperty: 'payload'
});

var userAuth = require('../controllers/auth');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/register', userAuth.register);


module.exports = router;
