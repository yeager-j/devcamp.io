var mongoose = require('mongoose');

var catSchema = new mongoose.Schema({
    title: String,
    genesis: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Category', catSchema);
