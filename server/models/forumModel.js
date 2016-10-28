var mongoose = require('mongoose');

var forumSchema = new mongoose.Schema({
    title: String,
    description: String,
    genesis: { type: Date, default: Date.now },
    last_post: { type: Date },
    permissions: Array,
    cat_id: String
});

module.exports = mongoose.model('Forum', forumSchema);
