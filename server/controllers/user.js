var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

var scrub = function (user) {
    user.hash = '';
    user.salt = '';

    return user;
};

module.exports.getUser = function (req, res) {
    User.findOne({_id: req.params.id}, function (err, user) {
        if (user) {
            user = scrub(user);
            sendJSONresponse(res, 200, user);
        } else {
            User.findOne({username: req.params.id}, function (err, user) {
                if (user) {
                    user = scrub(user);
                    sendJSONresponse(res, 200, user)
                } else {
                    User.findOne({email: req.params.id}, function (err, user) {
                        if (user) {
                            user = scrub(user);
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

module.exports.getUsers = function (req, res) {
    User.find({}, function (err, users) {
        var response = users.map(function (user) {
            return scrub(user);
        });

        sendJSONresponse(res, 200, response);
    })
};

module.exports.editUser = function (req, res) {
    User.findOneAndUpdate({_id: req.payload._id}, {
        $set: {
            username: req.body.username,
            fullname: req.body.fullname,
            email: req.body.email
        }
    }, function (err, data){
        if(err){
            console.log(err);
            sendJSONresponse(res, 400, {
                "message": "There was an error!"
            });
        } else {
            console.log(data);
            sendJSONresponse(res, 200, {
                "token": data.generateJwt(),
                "message": "Information was successfully updated!"
            });
        }
    });

};
