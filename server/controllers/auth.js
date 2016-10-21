var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var School = mongoose.model('School');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var validate = require('../utilities/validate');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function (req, res) {
    if (!req.body.username || !req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
    } else {
        User.findOne({'email': req.body.email}, function (err, userInfo) {
            if (userInfo) {
                res.status(500);
                res.json({'message': 'Email already registered'});
            } else {
                User.findOne({'username': req.body.username}, function (err, userInfo) {
                    if (userInfo) {
                        res.status(500);
                        res.json({'message': 'Username already registered'});
                    } else {
                        var passed = validate.validate([
                            {
                                value: req.body.username,
                                checks: {
                                    required: true,
                                    minlength: 3,
                                    maxlength: 18,
                                    regex: /^[a-zA-Z0-9_]*$/
                                }
                            },
                            {
                                value: req.body.fullname,
                                checks: {
                                    required: true,
                                    minlength: 3,
                                    maxlength: 30,
                                    regex: /^[a-zA-Z0-9_\s]*$/
                                }
                            },
                            {
                                value: req.body.email,
                                checks: {
                                    required: true,
                                    minlength: 3,
                                    maxlength: 100,
                                    regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                }
                            },
                            {
                                value: req.body.state,
                                checks: {
                                    required: true,
                                    matches: ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
                                    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
                                    'WY').split(' ')
                                }
                            },
                            {
                                value: req.body.usertype,
                                checks: {
                                    required: true,
                                    matches: ('Prospective Student,Student,Alumni,Instructor,Employer,Recruiter,Other').split(',')
                                }
                            },
                            {
                                value: req.body.password,
                                checks: {
                                    required: true,
                                    matches: req.body.confirm,
                                    minlength: 8,
                                    maxlength: 40
                                }
                            }
                        ]);

                        if (passed) {
                            var user = new User();
                            user.username = req.body.username;
                            user.fullname = req.body.fullname;
                            user.email = req.body.email;
                            user.state = req.body.state;
                            user.usertype = req.body.usertype;
                            user.rank = 1;
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
                        } else {
                            sendJSONresponse(res, 401, {
                                message: "Invalid input. Please don't mess with Angular's form validation."
                            })
                        }
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
    } else {
        passport.authenticate('local', function (err, user, info) {
            var token;
            if (err) {
                sendJSONresponse(res, 404, {
                    'message': 'Error!'
                });
            } else if (user) {
                token = user.generateJwt();
                sendJSONresponse(res, 200, {
                    token: token
                });
            } else {
                res.status(401).json(info);
            }
        })(req, res);
    }
};

module.exports.getUser = function (req, res) {
    User.findOne({_id: req.params.id}, function (err, user) {
        if (user) {
            user.hash = '';
            user.salt = '';
            sendJSONresponse(res, 200, user);
        } else {
            User.findOne({username: req.params.id}, function (err, user) {
                if (user) {
                    user.hash = '';
                    user.salt = '';
                    sendJSONresponse(res, 200, user)
                } else {
                    User.findOne({email: req.params.id}, function (err, user) {
                        if (user) {
                            user.hash = '';
                            user.salt = '';
                            sendJSONresponse(res, 200, user)
                        } else {
                            sendJSONresponse(res, 404, {
                                message: "User not found."
                            })
                        }
                    })
                }
            })
        }
    });
};

module.exports.schoolRegister = function (req, res) {
    if (!req.body.schoolname || !req.body.city || !req.body.state) {
        sendJSONresponse(res, 400, {
            "message": "All fields required!"
        });
    } else {
        User.findOne({
            'schoolname': req.body.schoolname,
            'city': req.body.city,
            state: req.body.state
        }, function (err, userInfo) {
            if (userInfo) {
                sendJSONresponse(res, 500, {
                    "message": "This school at this location is already registered!"
                });
            } else {
                var school = new School();
                school.schoolname = req.body.schoolname;
                school.city = req.body.city;
                school.state = req.body.state;
                school.description = req.body.description;
                school.motto = req.body.motto;
                school.save(function (err) {
                    sendJSONresponse(res, 200, {
                        'message': 'School Successfully Added!  Good job buddy!'
                    });
                });
            }
        });
    }
};
