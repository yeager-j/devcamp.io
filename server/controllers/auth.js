var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var School = mongoose.model('School');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function (req, res) {
    if (!req.body.username || !req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
    }else{
        User.findOne({'email': req.body.email}, function(err, userInfo){
            if (userInfo){
                res.status(500);
                res.json({'message': 'Email already registered'});
            } else {
                User.findOne({'username': req.body.username}, function (err, userInfo) {
                    if (userInfo) {
                        res.status(500);
                        res.json({'message': 'Username already registered'});
                    } else {
                        var user = new User();
                        user.username = req.body.username;
                        user.fullname = req.body.fullname;
                        user.email = req.body.email;
                        user.state = req.body.state;
                        user.usertype = req.body.userType;
                        user.school = -1;
                        user.avatar = '';
                        user.setPassword(req.body.password);

                        user.save(function (err) {
                            var token;
                            token = user.generateJwt();
                            res.status(200);
                            res.json({
                                token: token
                            });
                        });
                    }
                });
            }
        });
    }
};


module.exports.login = function (req, res) {
    if (!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
    }else{
        passport.authenticate('local', function (err, user, info) {
            var token;
            if (err) {
                res.status(404).json(err);
            } else if (user) {
                token = user.generateJwt();
                res.status(200);
                console.log(token);
                res.json({
                    token: token
                });
            } else {
                res.status(401).json(info);
            }
        })(req, res);
    }
};

module.exports.schoolRegister = function (req, res) {
    if (!req.body.schoolname || !req.body.city || !req.body.state) {
        sendJSONresponse(res, 400, {
            "message": "All fields required!"
        });
    }else{
        User.findOne({'schoolname': req.body.schoolname, 'city': req.body.city, state: req.body.state}, function(err, userInfo){
            if (userInfo){
                sendJSONresponse(res, 500, {
                    "message": "This school at this location is already registered!"
                });
            }
        });
        var school = new School();
        school.schoolname = req.body.schoolname;
        school.city = req.body.city;
        school.state = req.body.state;
        school.description = req.body.description;
        school.motto = req.body.motto;
        school.setPassword(req.body.password);

        school.save(function (err) {
            if (err){
                res.status(500);
                res.json({'message': 'Poopy pants'})
            }
            var token;
            token = user.generateJwt();
            res.status(200);
            res.json({
                token: token
            });
        });
    }
};
