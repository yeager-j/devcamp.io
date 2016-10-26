var mongoose = require('mongoose');
// var crypto = require('crypto');

var personalSchema = new mongoose.Schema({
    u_id: {
        type: String,
        required: true
    },
    s_id:{
        type: String,
        required: true
    },
    date: { type: Date, default: Date.now },
    prior_experience: Boolean,
    industry: Boolean,
    amount_completed: Number,
    pre_completed: String,
    previous_salary: Number,
    age: Number,
    gender: String,
    edu_level: String
});

var schoolSchema = new mongoose.Schema({
    u_id: {
        type: String,
        required: true
    },
    s_id:{
        type: String,
        required: true
    },
    teacher_rating: Number,
    ciriculum_rating: Number,
    job_search: Number,
    job_assist: Number
});

var jobSchema = new mongoose.Schema({
    u_id: {
        type: String,
        required: true
    },
    s_id:{
        type: String,
        required: true
    },
    teacher_rating: Number,
    ciriculum_rating: Number,
    job_search: Number,
    job_assist: Number
});


module.exports = mongoose.model('Personal_Sub', personalSchema);
module.exports = mongoose.model('School_Sub', schoolSchema);
module.exports = mongoose.model('Job_Sub', jobSchema);
