var mongoose = require('mongoose');
var Thread = mongoose.model('Thread');

var forumSchema = new mongoose.Schema({
    title: String,
    description: String,
    genesis: { type: Date, default: Date.now },
    last_post: { type: Date },
    permissions: Array,
    cat_id: {
           type: mongoose.Schema.Types.ObjectId, ref:'Category'
        },
    threads: [{type: mongoose.Schema.Types.ObjectId, ref: 'Thread'}]
});

module.exports = mongoose.model('Forum', forumSchema);
