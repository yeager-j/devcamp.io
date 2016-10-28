var mongoose = require('mongoose');
// var crypto = require('crypto');

// var personalSchema = new mongoose.Schema({
//     prior_experience: Boolean,
//     industry: Boolean,
//     amount_completed: Number,
//     pre_completed: String,
//     previous_salary: Number,
//     age: Number,
//     gender: String,
//     edu_level: String
// });


var dataSchema = new mongoose.Schema({
    u_id: {
        type: String,
        required: true
    },
    s_id:{
        type: String,
        required: true
    },
    prior_experience: Boolean,
    industry: Boolean,
    amount_completed: Number,
    pre_completed: String,
    previous_salary: Number,
    age: Number,
    gender: String,
    edu_level: String,
    teacher_rating: Number,
    ciriculum_rating: Number,
    job_search: Number,
    job_assist: Number,
    job_language: {type: String, lowercase: true},
    salary: Number,
    relocation: Boolean,
    job_title: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Data', dataSchema);
