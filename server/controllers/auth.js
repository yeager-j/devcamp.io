var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
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
            console.log(err);

            var token;
            token = user.generateJwt();
            res.status(200);
            res.json({
                token: token
            });
        });
    }
};

    


module.exports.login = function (req, res) {

    if (!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    passport.authenticate('local', function (err, user, info) {
        var token;

        if (err) {
            res.status(404).json(err);
            return;
        }

        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                token: token
            });
        } else {
            res.status(401).json(info);
        }
    })(req, res);
};
