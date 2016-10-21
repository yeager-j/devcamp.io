var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var config = require('../config/config');
var auth = jwt({
    secret: config.secretKey,
    userProperty: 'payload'
});

var userAuth = require('../controllers/auth');

router.post('/register', userAuth.register);
router.post('/login', userAuth.login);
router.post('/school_register', userAuth.schoolRegister);

router.get('/get_user/:id', userAuth.getUser);

module.exports = router;
