var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Category = mongoose.model('Category');
var Forum = mongoose.model('Forum');
var Thread = mongoose.model('Thread');
var Reply = mongoose.model('ThreadReply');
var validate = require('../utilities/validate');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.createCategory = function (req, res){
    var category = new Category();
    category.title = req.body.title;
    category.save(function(err, document){
        if (err){
            console.log(err);
            sendJSONresponse(res, 500, {
                "message": "Server Error Nooooo!!!"
            });
        } else{
            console.log(document)
            sendJSONresponse(res, 200, {
                'message': 'Category Successfully Added!  Your community thanks you!'
            });
        }
    });
};

module.exports.createForum = function (req, res){
    var forum = new Forum();
    forum.title = req.body.title;
    forum.description = req.body.description;
    forum.last_post = req.body.last_post;
    forum.cat_id = req.body.cat_id;
    forum.permissions = req.body.permissions;
    forum.save(function(err, document){
        if (err){
            console.log(err);
            sendJSONresponse(res, 500, {
                "message": "Server Error Nooooo!!!"
            });
        } else{
            console.log(document)
            sendJSONresponse(res, 200, {
                'message': 'Forum Successfully Added!  Your peers and your community thank you!'
            });
        }
    });
};

module.exports.createThread = function (req, res){
    var thread = new Thread();
    thread.title = req.body.title;
    thread.author_id = req.payload._id;
    thread.post_content = req.body.post_content;
    thread.forum_id = req.body.forum_id;
    thread.save(function(err, document){
        if (err){
            console.log(err);
            sendJSONresponse(res, 500, {
                "message": "Server Error Nooooo!!!"
            });
        } else{
            console.log(document)
            sendJSONresponse(res, 200, {
                'message': 'Thread Successfully Added!  Your entire freaking world thanks you!'
            });
        }
    });
};

module.exports.createReply = function (req, res){
    var reply = new Reply();
    reply.author_id = req.payload._id;
    reply.post_content = req.body.post_content;
    reply.thread_id = req.body.thread_id;
    reply.save(function(err, document){
        if (err){
            console.log(err);
            sendJSONresponse(res, 500, {
                "message": "Server Error Nooooo!!!"
            });
        } else{
            console.log(document)
            sendJSONresponse(res, 200, {
                'message': 'Reply Successfully Posted!  The original poster is thrilled!'
            });
        }
    });
};

// module.exports.getAllForums = function (req, res){
//     var display = [];
//     Category.find({}).exec(function(err, category){
//         for (var i = 0; i < category.length; i++) {
//             display.push({"id": category[i]._id, "title": category[i].title, "forum": []});
//             Forum.find({cat_id: category[i]._id}).exec(function (err, forum){
//                 for (var j = 0; j < display.length; j++) {
//                     display[j].forum = forum;
//                 }
//                 sendJSONresponse(res, 200, display);      
//             });
//         }
//     });
// };

// module.exports.getAll = function (req, res){
//     var display = [];
//     Category.find({}).exec(function(err, category){
//         for (var i = 0; i < category.length; i++) {
//             display.push({"id": category[i]._id, "title": category[i].title, "forum": []});
//         }
//         Forum.find({cat_id: category[i]._id}).exec(function (err, forum){
//             for (var j = 0; j < display.length; j++) {
//                 display[j].forum = forum;
//             }
//             sendJSONresponse(res, 200, display);      
//         });
//     });
// };

module.exports.getCategories = function (req, res){
    Category.find({}).populate({path: 'forum', Select: 'title description genesis last_post permissions'}).exec(function(err, category){
        sendJSONresponse(res, 200, category);      
    });
};

module.exports.getForums = function (req, res){
    Forum.find({cat_id: req.params.id}).populate({path: 'threads', select: 'title created author_id post_content forum_id locked pinned'}).exec(function (err, forum){
        sendJSONresponse(res, 200, forum);      
    });
};

module.exports.getThreads = function (req, res){
    Thread.find({forum_id: req.params.id}).populate({path: 'replies', select: 'created author_id post_content thread_id'}).exec(function (err, thread){
        sendJSONresponse(res, 200, thread);      
    });
};




// Danny's Original Individual Queries, refactored above for Optimum Performance!


// module.exports.getCategory = function (req, res){
//     Category.find({}).exec(function(err, category){
//         sendJSONresponse(res, 200, category);      
//     });
// };

// module.exports.getForums = function (req, res){
//     Forum.find({cat_id: req.params.id}).exec(function (err, forum){
//         sendJSONresponse(res, 200, forum);      
//     });
// };

// module.exports.getThreads = function (req, res){
//     Thread.find({forum_id: req.params.id}).exec(function (err, thread){
//         sendJSONresponse(res, 200, thread);      
//     });
// };

// module.exports.getReplies = function (req, res){
//     Reply.find({thread_id: req.params.id}).exec(function (err, reply){
//         sendJSONresponse(res, 200, reply);      
//     });
// };



