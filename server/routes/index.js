var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var config = require('../config/config');
var auth = jwt({
    secret: config.secretKey,
    userProperty: 'payload'
});

var userAuth = require('../controllers/auth');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/register', userAuth.register);
router.post('/login', userAuth.login);
router.post('/schoolRegister', userAuth.schoolRegister);

router.get('/getUser/:id', userAuth.getUser);

module.exports = router;
