var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var School = mongoose.model('School');
var validate = require('../utilities/validate');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.schoolRegister = function (req, res) {
    if (!req.body.schoolName || !req.body.city || !req.body.state) {
        sendJSONresponse(res, 400, {
            "message": "All fields required!"
        });
    } else {
        User.findOne({
            'schoolName': req.body.schoolName
        }, function (err, userInfo) {
            if (userInfo) {
                sendJSONresponse(res, 500, {
                    "message": "This school is already registered!"
                });
            } else {
                var passed = validate.validate([
                    {
                        value: req.body.schoolName,
                        checks: {
                            required: true,
                            minlength: 3,
                            maxlength: 60,
                            regex: /^[a-zA-Z0-9_\s]*$/
                        }
                    },
                    {
                        value: req.body.city,
                        checks: {
                            required: true,
                            minlength: 3,
                            maxlength: 30,
                            regex: /^[a-zA-Z0-9_\s]*$/
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
                        value: req.body.description,
                        checks: {
                            required: true,
                            minlength: 30,
                            maxlength: 1000
                        }
                    }
                ]);

                if (passed) {
                    var school = new School();
                    school.schoolName = req.body.schoolName;
                    school.city = req.body.city;
                    school.state = req.body.state;
                    school.email = req.body.email;
                    school.description = req.body.description;
                    school.faculty = [req.payload._id];
                    school.save(function (err) {
                        if (err) {
                            console.log(err);
                            sendJSONresponse(res, 500, {
                                message: "Server error. Bad bad bad!"
                            })
                        } else {
                            sendJSONresponse(res, 200, {
                                'message': 'School Successfully Added!  Good job buddy!'
                            });
                        }

                    });
                } else {
                    sendJSONresponse(res, 401, {
                        message: "Invalid input. Please don't mess with Angular's form validation."
                    })
                }
            }
        });
    }
};

module.exports.getSchoolsByUser = function (req, res) {
    if (!req.params.id) {
        sendJSONresponse(res, 400, {
            message: 'No user provided'
        })
    } else {
        console.log(req.params.id);

        School.find({
            faculty: {
                $in: [req.params.id]
            }
        }, function (err, schools) {
            if (schools) {
                sendJSONresponse(res, 200, schools);
            }

            if (err) {
                console.error(err);

                sendJSONresponse(res, 500, {
                    message: 'There was an unexpected error'
                });
            }
        })
    }
};
