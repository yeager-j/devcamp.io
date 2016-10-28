var mongoose = require('mongoose');
var Reply = mongoose.model('ThreadReply');

var threadSchema = new mongoose.Schema({
    title: String,
    created: { type: Date, default: Date.now },
    author_id: String,
    post_content: String,
    forum_id: {
           type: mongoose.Schema.Types.ObjectId, ref:'Forum'
        },
    locked: {type: Boolean, default: false},
    pinned: {type: Boolean, default: false},
    replies: [{type: mongoose.Schema.Types.ObjectId, ref: 'ThreadReply'}]
});

module.exports = mongoose.model('Thread', threadSchema);
