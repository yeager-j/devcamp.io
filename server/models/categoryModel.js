var mongoose = require('mongoose');
var Forum = mongoose.model('Forum');


var catSchema = new mongoose.Schema({
    title: String,
    genesis: { type: Date, default: Date.now },
    forum: [{type: mongoose.Schema.Types.ObjectId, ref: 'Forum'}]
});

module.exports = mongoose.model('Category', catSchema);
