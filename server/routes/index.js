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
var forums = require('../controllers/forum');

router.post('/register', authentication.register);
router.post('/login', authentication.login);
router.post('/school_register', auth, schools.schoolRegister);
router.post('/school_update', auth, schools.schoolUpdate);
router.post('/student_register', auth, schools.studentRegister);
router.post('/school_data', auth, data.dataInput);
router.post('/update_user_school', auth, data.dataUpdate);

router.post('/category', auth, forums.createCategory);
router.post('/forums/:id', auth, forums.createForum);
router.post('/thread/:id', auth, forums.createThread);
router.post('/thread_reply/:id', auth, forums.createReply);


router.post('/forum_remove/:id', auth, forums.removeForum);
router.post('/thread_remove/:id', auth, forums.removeThread);
router.post('/reply_remove/:id', auth, forums.removeReply);

router.get('/get_user/:id', users.getUser);
router.get('/get_users', users.getUsers);

router.get('/get_schools/:id', schools.getSchoolsByUser);
router.get('/get_school/:id', schools.getSchool);
router.get('/get_school_key/:id', auth, schools.getSecretKey);

router.get('/forum_main', forums.getCategories);
router.get('/forum/:id', forums.getForums);
router.get('/thread/:id', forums.getThreads);

router.get('/user_threads/:id', forums.getUserThreads);
router.get('/user_replies/:id', forums.getUserReplies);


module.exports = router;
