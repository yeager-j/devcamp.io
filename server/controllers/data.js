var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var School = mongoose.model('School');
var Personal_sub = mongoose.model('Personal_Sub');
var School_sub = mongoose.model('School_Sub');
var Job_sub = mongoose.model('Job_Sub');

var validate = require('../utilities/validate');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};


module.exports.dataInput = function (req, res){

    var pData = new Personal_sub();
    pData.u_id = req.payload._id;
    pData.s_id = req.body.s_id;
    pData.prior_experience = req.body.priorExp;
    pData.industry = req.body.industry;
    pData.amount_completed = req.body.completion;
    pData.pre_completed = req.body.preWork;
    pData.previous_salary = req.body.salary;
    pData.age = req.body.age;
    pData.gender = req.body.gender;
    pData.edu_level = req.body.education;

    var sData = new School_sub();
    sData.u_id = req.payload._id;
    sData.s_id = req.body.s_id;
    sData.teacher_rating = req.body.teacher;
    sData.ciriculum_rating = req.body.rating;
    sData.job_search = req.body.jobSearch;
    sData.job_assist = req.body.assist;

    var jData = new Job_sub();
    jData.u_id = req.payload._id;
    jData.s_id = req.body.s_id;
    jData.job_language = req.body.language;
    jData.salary = req.body.salary;
    jData.relocation = req.body.relocation;
    jData.job_title = req.body.title;    

    var data = [pData, sData, jData];

    for (var i = 0; i < data.length - 1; i++) {
        data[i].save(function(err, document){
            if (err){
                console.log(err);
                sendJSONresponse(res, 500, {
                    message: "Server error. Bad bad bad!"
                });
            } else {
                console.log(document);
                sendJSONresponse(res, 200, {
                    'message': 'Information Successfully Added!  Your peers and your country thank you!'
                });
            }
        });
    }
};

module.exports.dataUpdate = function (req, res){
    Data.update(
        { "u_id": req.payload._id, "s_id": req.body.s_id },
        {   $set: {
                "personal_data": {
                    "prior_experience": req.body.priorExp,
                    "industry": req.body.industry,
                    "amount_completed": req.body.completion,
                    "pre_completed": req.body.preWork,
                    "previous_salary": req.body.salary,
                    "age": req.body.age,
                    "gender": req.body.gender,
                    "edu_level": req.body.education
                },
                "school_data": {
                    "teacher_rating": req.body.teacher,
                    "ciriculum_rating": req.body.rating,
                    "job_search": req.body.jobSearch,
                    "job_assist": req.body.assist
                },
                "job_data": {
                    "job_language": req.body.language,
                    "salary": req.body.salary,
                    "relocation": req.body.relocation,
                    "job_title": req.body.title
                }
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

