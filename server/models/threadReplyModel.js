var mongoose = require('mongoose');

var threadReplySchema = new mongoose.Schema({
    created: { type: Date, default: Date.now },
    author_id: String,
    post_content: String,
    thread_id: String
});

module.exports = mongoose.model('ThreadReply', threadReplySchema);
