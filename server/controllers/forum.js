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
    forum.cat_id = req.params.id;
    forum.permissions = req.body.permissions;
    forum.save(function(err, document){
        if (err){
            console.log(err);
            sendJSONresponse(res, 500, {
                "message": "Server Error Nooooo!!!"
            });
        } else{
            console.log(document);
            Category.update({_id: req.params.id}, {$push: {forum: forum._id}}).exec(
                sendJSONresponse(res, 200, {
                    'message': 'Forum Successfully Added!  Your peers and your community thank you!'
                })
            );
        }
    });
};

module.exports.createThread = function (req, res){
    var thread = new Thread();
    thread.title = req.body.title;
    thread.author_id = req.payload._id;
    thread.post_content = req.body.post_content;
    thread.forum_id = req.params.id;
    thread.save(function(err, document){
        if (err){
            console.log(err);
            sendJSONresponse(res, 500, {
                "message": "Server Error Nooooo!!!"
            });
        } else{
            console.log(document);
            Forum.update({_id: req.params.id}, {$push: {threads: thread._id}}).exec(
                sendJSONresponse(res, 200, {
                    'message': 'Thread Successfully Added!  Your entire freaking world thanks you!'
                })
            );
        }
    });
};

module.exports.createReply = function (req, res){
    var reply = new Reply();
    reply.author_id = req.payload._id;
    reply.post_content = req.body.post_content;
    reply.thread_id = req.params.id;
    reply.save(function(err, document){
        if (err){
            console.log(err);
            sendJSONresponse(res, 500, {
                "message": "Server Error Nooooo!!!"
            });
        } else{
            console.log(reply._id);
            Thread.update({_id: req.params.id}, {$push: {replies: reply._id}}).exec(
                sendJSONresponse(res, 200, {
                    'message': 'Reply Successfully Posted!  The original poster is thrilled!'
                })
            );
        }
    });
};


module.exports.removeForum = function (req, res){
    Category.findById(req.body.cat_id).exec(function(err, data){
        if (err){
            console.log(err);
        }else{
            var index = data.threads.indexOf(req.params.id);
            if (index > -1){
                data.threads.splice(index, 1);
                data.save();
                Forum.find().remove({_id: req.params.id}).exec(function(err, count){
                    if (err){
                        console.log(err);
                    }else{
                        sendJSONresponse(res, 200, {
                            'message': count.result.n + ' forum EXECUTED!!'
                        });
                    }
                });
            }   
        }
    });
};

module.exports.removeThread = function (req, res){
    Forum.findById(req.body.forum_id).exec(function(err, data){
        if (err){
            console.log(err);
        }else{
            var index = data.threads.indexOf(req.params.id);
            if (index > -1){
                data.threads.splice(index, 1);
                data.save();
                Thread.find().remove({_id: req.params.id}).exec(function(err, count){
                    if (err){
                        console.log(err);
                    }else{
                        sendJSONresponse(res, 200, {
                            'message': count.result.n + ' thread EXECUTED!!'
                        });
                    }
                });
            }   
        }
    });
};

module.exports.removeReply = function (req, res){
    Thread.findById(req.body.thread_id).exec(function(err, data){
        if (err){
            console.log(err);
        }else{
            var index = data.threads.indexOf(req.params.id);
            if (index > -1){
                data.threads.splice(index, 1);
                data.save();
                Reply.find().remove({_id: req.params.id}).exec(function(err, count){
                    if (err){
                        console.log(err);
                    }else{
                        sendJSONresponse(res, 200, {
                            'message': count.result.n + ' reply EXECUTED!!'
                        });
                    }
                });
            }   
        }
    });
};

module.exports.getUserThreads = function (req, res){
    Thread.find({author_id: req.params.id}).select('-replies').exec(function (err, thread){
        sendJSONresponse(res, 200, thread);      
    });
};

module.exports.getUserReplies = function (req, res){
    Reply.find({author_id: req.params.id}).exec(function (err, reply){
        sendJSONresponse(res, 200, reply);      
    });
};

module.exports.getCategories = function (req, res){
    Category.find({}).populate({path: 'forum', select: '-threads'}).exec(function(err, category){
        sendJSONresponse(res, 200, category);      
    });
};

module.exports.getForums = function (req, res){
    Forum.find({cat_id: req.params.id}).populate({path: 'threads', select: '-replies'}).exec(function (err, forum){
        sendJSONresponse(res, 200, forum);      
    });
};

module.exports.getThreads = function (req, res){
    Thread.find({forum_id: req.params.id}).populate({path: 'replies'}).exec(function (err, thread){
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



