var mongoose = require('mongoose');

var schoolSchema = new mongoose.Schema({
    schoolName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    description: String,
    motto: String,
    logo: String,
    faculty: Array,
    students: Array
});


module.exports = mongoose.model('School', schoolSchema);
