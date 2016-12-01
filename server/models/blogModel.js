var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
    title: String,
    description: String,
    body: String,
    genesis: { type: Date, default: Date.now },
    cat_id: {
           type: mongoose.Schema.Types.ObjectId, ref:'User'
        },
    likes: Number
});

module.exports = mongoose.model('Blog', blogSchema);
