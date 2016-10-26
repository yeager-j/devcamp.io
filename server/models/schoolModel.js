var mongoose = require('mongoose');
var crypto = require('crypto');

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
    email: String,
    logo: String,
    languages: Array,
    faculty: Array,
    students: Array,
    secretKey: String
});

schoolSchema.methods.generateKey = function () {
    this.secretKey = crypto.randomBytes(16).toString('hex');
};

module.exports = mongoose.model('School', schoolSchema);
