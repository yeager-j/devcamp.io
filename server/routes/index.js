var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var config = require('../config/config');
var auth = jwt({
    secret: config.secretKey,
    userProperty: 'payload'
});

var auth = require('../controllers/auth');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/schoolRegister', auth.schoolRegister);

router.get('/get_user/:id', auth.getUser);

module.exports = router;
