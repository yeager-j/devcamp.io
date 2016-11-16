![Logo](public/images/logo_1.png "Devcamp.io Logo")

# Devcamp.io
A forum and blog software written in the MEAN Stack.

## Problems Solved
**Danny**
My greatest challenge was working with the NoSQL database in a manner that was efficient as well as relational.  I discovered through using the ObjectId property type in my mongoose schema `cat_id: {type: mongoose.Schema.Types.ObjectId, ref:'Category'}` I could embed data in the form of arrays into my response relating one collection of data to another.  This reduced the amount of queries that needed to be made and allowed for a more intuitive organization of the data.  Originally, I would have had to of created two queries to retrieve the data necessary to populate the forums home page:
``` javascript
module.exports.getCategory = function (req, res){
    Category.find({}).exec(function(err, category){
        sendJSONresponse(res, 200, category);      
    });
};

module.exports.getForums = function (req, res){
    Forum.find({cat_id: req.params.id}).exec(function (err, forum){
        sendJSONresponse(res, 200, forum);      
    });
};```

As you can see this requires one query to get all the different categories and another query PER CATEGORY to populate all the data needed!!  But by using the ObjectId type I am simply and cleanly able to write:
```javascript
module.exports.getCategories = function (req, res) {
    Category.find({}).populate({path: 'forum', select: '-threads'}).exec(function (err, category) {
        sendJSONresponse(res, 200, category);
    });
};
```
This gathers all the categories and every forum for each category.  The ObjectId Type is so powerful that if I didn't specify `select: '-threads'` Every forum's threads and their replies would be included in a massive response.

**Jackson**
The biggest issue by far was the forums - both from a design standpoint and from a code standpoint. I had to work closely with Danny in order to get the data in the correct format. Another big issue was user authentication. Passport seemed like an appropriate choice since OAuth was overkill for what we had in mind. I decided on JSONWebTokens instead of Sessions. With JWT, you can send data encoded with a secret key. I sent the user's ID and their password hash. When the user needed to perform an action requiring authentication, the token is sent in the header. If the token is valid and the hash matches the hash in the database, we know they are who they say they are. Subsequently, if they change their password, a new token is generated and sent to them. If someone managed to steal their token, that person would lose access immediately.


## Techologies
- **MongoDB**: MongoDB is used for storing users, threads, replies, blogs, etc. MongoDB is the obvious choice when working with Node.js

- **Mongoose**: Mongoose is a MongoDB wrapper that introduces schematics and provides helpful functions when working with the database.

- **Express**: I'm using Express for routing. If I used purely Node.js to route, this project would be much larger. Express is the natural choice when working with Node.js.

- **AngularJS**: AngularJS is being used as my front-end framework. 

- **Node.js**: This piece of technology is being used as my server. Thanks node.

- **Compass**: While I'm not going to have a lot of styling, I still prefer to work with Compass because it has support for variables and nesting.

- **AJAX**: AJAX will handle POST and GET requests to and from the server so that the page isn't reloaded every time the user makes a post.

- **D3**: A canvas/SVG framework for JavaScript for easily implementing visual representations of information. We're using it to display information about schools such as hours, attendance, costs, salary upon graduation, and time looking for a job.


## Concept
Coding bootcamps are becoming extremely popular. Lots of students are beginning to turn to these programs instead of college because they are cheaper and usually more immersive. This website serves as a community where students and instructors alike can have a real conversation.

The main feature of the website is the forums. Anyone can create a thread and reply to threads. When a thread gets popular, it will be featured on the Blog page. Each user has a profile that contains all of their content, whether they are a (prospective) student or instructor, and their location. Users can follow other users. 

##Contributors

Danny Arango [Github](http://www.github.com/thenew000) [Website](http://www.dannyarango.com)

Responsible for the database, backend, and routing.

Jackson Yeager [Github](http://www.github.com/volitiondevelopment) [Website](https://www.volition-dev.com)

Responsible for authentication, design, and front-end.

## Screenshots

![Graph!](/public/images/screenshots/graph.png "It's A Graph!!")
![Toast!](/public/images/screenshots/toast.png "It's Toast!!")
![Left Navigation](/public/images/screenshots/leftnav.png "Left Navigation!!")
![Right Navigation](/public/images/screenshots/rightnav.png "Right Navigation!!")
![A thread and reply](/public/images/screenshots/thread.png "A thread and reply!!")


## Installation
If you'd like to spin up your own server, follow these instructions:

`git clone https://github.com/yeager-j/devcamp.io`

`cd devcamp.io`

`npm install`

`bower install`

`node bin/www`

Open your browser and connect to `http://localhost:3000`

## Live Demo

The official website is hosted here: http://devcamp.io
