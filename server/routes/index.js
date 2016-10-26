var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var config = require('../config/config');
var auth = jwt({
    secret: config.secretKey,
    userProperty: 'payload'
});

var authentication = require('../controllers/auth');
var users = require('../controllers/user');
var schools = require('../controllers/school');
var data = require('../controllers/data');

router.post('/register', authentication.register);
router.post('/login', authentication.login);
router.post('/school_register', auth, schools.schoolRegister);
router.post('/school_update', auth, schools.schoolUpdate);
router.post('/student_register', auth, schools.studentRegister);
router.post('/school_data', auth, data.dataInput);
// router.post('/update_user_school', auth, data.dataUpdate);

router.get('/get_user/:id', users.getUser);
router.get('/get_users', users.getUsers);
router.get('/get_schools/:id', schools.getSchoolsByUser);
router.get('/get_school_key/:id', auth, schools.getSecretKey);



module.exports = router;
