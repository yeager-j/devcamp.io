var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var School = mongoose.model('School');
var Data = mongoose.model('Data');
var validate = require('../utilities/validate');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.dataInput = function (req, res){
    console.log('HERE');
    var data = new Data();
    data.u_id = req.payload._id;
    data.s_id = req.body.s_id;
    data.prior_experience = req.body.prior_experience;
    data.industry = req.body.industry;
    data.amount_completed = req.body.amount_completed;
    data.pre_completed = req.body.pre_completed;
    data.previous_salary = req.body.previous_salary;
    data.age = req.body.age;
    data.gender = req.body.gender;
    data.edu_level = req.body.edu_level;
    data.teacher_rating = req.body.teacher_rating;
    data.ciriculum_rating = req.body.ciriculum_rating;
    data.job_search = req.body.job_search;
    data.job_assist = req.body.job_assist;
    data.job_language = req.body.job_language;
    data.salary = req.body.salary;
    data.relocation = req.body.relocation;
    data.job_title = req.body.job_title;

    data.save(function(err, document){
        if (err){
            console.log(err);
            sendJSONresponse(res, 500, {
                "message": "Server error. Bad bad bad!"
            });
        } else{
            console.log(document)
            sendJSONresponse(res, 200, {
                'message': 'Information Successfully Added!  Your peers and your country thank you!'
            });
        }
    });
};

module.exports.dataUpdate = function (req, res){
    Data.update(
        { u_id: req.payload._id, s_id: req.body.s_id },
        {   $set: {
                "prior_experience": req.body.prior_experience,
                "industry": req.body.industry,
                "amount_completed": req.body.amount_completed,
                "pre_completed": req.body.pre_completed,
                "previous_salary": req.body.previous_salary,
                "age": req.body.age,
                "gender": req.body.gender,
                "edu_level": req.body.edu_level,
                "teacher_rating": req.body.teacher_rating,
                "ciriculum_rating": req.body.ciriculum_rating,
                "job_search": req.body.job_search,
                "job_assist": req.body.job_assist,
                "job_language": req.body.job_language,
                "salary": req.body.salary,
                "relocation": req.body.relocation,
                "job_title": req.body.job_title
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
    );
};

