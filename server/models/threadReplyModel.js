var mongoose = require('mongoose');

var threadReplySchema = new mongoose.Schema({
    created: { type: Date, default: Date.now },
    author_id: String,
    post_content: String,
    thread_id: {
           type: mongoose.Schema.Types.ObjectId, ref:'Thread'
        }
});

module.exports = mongoose.model('ThreadReply', threadReplySchema);
