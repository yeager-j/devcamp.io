var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var mongoose = require('mongoose');
var mongoUrl = 'mongodb://localhost:27017/graph_data';
mongoose.connect(mongoUrl);
var config = require('../config/config');
var auth = jwt({
    secret: config.secretKey,
    userProperty: 'payload'
});

var authentication = require('../controllers/auth');
var users = require('../controllers/user');
var schools = require('../controllers/school');

router.post('/register', authentication.register);
router.post('/login', authentication.login);
router.post('/school_register', auth, schools.schoolRegister);
router.post('/student_register', auth, schools.studentRegister);

router.get('/get_user/:id', users.getUser);
router.get('/get_users', users.getUsers);
router.get('/get_schools/:id', schools.getSchoolsByUser);
router.get('/get_school_key/:id', auth, schools.getSecretKey);

router.post('/', function(req,res,next){

});

module.exports = router;
