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
        School.findOne({
            'schoolName': req.body.schoolName
        }, function (err, userInfo) {
            console.log(userInfo);

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
                    school.generateKey();
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
        School.find({$or: [{students: {$in: [req.params.id]}}, {faculty: {$in: [req.params.id]}}]}, function (err, schools) {
            if (schools) {
                schools.map(function (school) {
                    school.secretKey = '';
                });

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

module.exports.getSecretKey = function (req, res) {
    if (!req.params.id) {
        sendJSONresponse(res, 400, {
            message: 'No school provided'
        })
    } else {
        School.findById(req.params.id, function (err, school) {
            if (school) {
                if (school.faculty.indexOf(req.payload._id) > -1) {
                    sendJSONresponse(res, 200, school.secretKey);
                } else {
                    sendJSONresponse(res, 401, {
                        message: "You are not authorized to generate this school's secret key."
                    })
                }
            }

            if (err) {
                console.error(err);

                sendJSONresponse(res, 500, {
                    message: 'There was an unexpected error'
                });
            }
        });
    }
};

module.exports.schoolUpdate = function (req, res) {
    School.update(
        { "_id": "580f9a631976731aaf637b3e" },
        {   $set: {
                "schoolName": req.body.schoolName,
                "city": req.body.city,
                "state": req.body.state,
                "email": req.body.email,
                "description": req.body.description
            }
        },
        function(err, data){
            if (err){
                console.log(err);
                sendJSONresponse(res, 400, {
                    "message": "There was an error!"
                });
            }else{
                sendJSONresponse(res, 200, {
                    "message": "Information was successfully updated!"
                });
            }
        }
    )
};

module.exports.studentRegister = function (req, res) {
    console.log(req.body.secretKey);
    if (!req.body.secretKey) {
        sendJSONresponse(res, 400, {
            message: 'No Key provided'
        });
    } else {
        School.findOne({'secretKey': req.body.secretKey}, function (err, school) {
            if (school) {
                school.students.push(req.payload._id);
                school.save(function(err){
                    if (err){
                        console.log(err);
                    }else{
                        sendJSONresponse(res, 200, {'message': 'Student Successfully Added!'});
                    }
                });
            }
        });
    }
};
