var mongoose = require('mongoose');

var threadSchema = new mongoose.Schema({
    title: String,
    created: { type: Date, default: Date.now },
    author_id: String,
    post_content: String,
    forum_id: String,
    locked: {type: Boolean, default: false},
    pinned: {type: Boolean, default: false}
});

module.exports = mongoose.model('Thread', threadSchema);
