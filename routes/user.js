var config = require('../config'),
    crypto = require('crypto'),
    fs = require('fs'),
    mongoose = require('mongoose');

// db configuration
mongoose.connect(config.MONGOLAB_URI);


// define schema
var userSchema = mongoose.Schema ({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created: { type: Date }
})

var User = mongoose.model('User', userSchema);


// find user by id
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving user: ' + id);

    User.findById(id, function (err, user) {
        if (!err) {
            res.send(user);
        } else {
            console.log(err);
        }
    });
};


// find user by username
exports.findByUsername = function(req, res) {
    var username = req.params.username;
    console.log('Retrieving user: ' + username);

    User.findOne({username: username}, function (err, user) {
        if (!err) {
            console.log('Founded user: ' + JSON.stringify(user));
            res.send(user);
        } else {
            console.log(err);
        }
    });
};


// get all users
exports.findAll = function(req, res) {
    User.find(function(err, users) {
        if (!err) {
            res.send(users);
        } else {
            console.log(err);
        }
    });
};


// create new user
exports.add = function(req, res) {
    
    console.log('Adding user: ' + JSON.stringify(req.body));
    
    var user = new User({
        username: req.body.username,
        email: req.body.email,
        password: crypto.createHash('sha256').update(req.body.password).digest('hex'),
        created: Date.now()
    });

    user.save(function (err) {
        if (!err) {
            console.log('Success: ' + JSON.stringify(user));
            res.send(user);
        } else {
            console.log(err);
            res.send({'error':'An error has occurred'});
        }
    });
};


// update user data
exports.update = function(req, res) {
    var id = req.params.id;
    
    console.log('Updating user: ' + id);
    console.log(JSON.stringify(req.body));
    
    User.findById(id, function (err, user) {
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = crypto.createHash('sha256').update(req.body.password).digest('hex');

        user.save(function (err) {
            if (!err) {
                res.send(users);
            } else {
                console.log(err);
                res.send({'error':'An error has occurred'});
            }    
        });
    });
};
 

// delete user by id
exports.delete = function(req, res) {
    var id = req.params.id;

    console.log('Deleting user: ' + id);

    User.findById(id, function (err, user) {

        user.remove(function (err) {
            if (!err) {
                res.send('');
            } else {
                console.log(err);
                res.send({'error':'An error has occurred'});
            }    
        });
    });
};


// add users profile image
exports.updateProfileImage = function(req, res) {
    var id = req.params.id;
    var fileName = config.UPLOAD_DIRECTORY + id + '.bin';

    console.log("writing " + fileName);
    
    var writeStream = fs.createWriteStream(fileName);
    
    req.pipe(writeStream);
    req.on('end', function() {
        res.writeHead(200);
        res.end();
    });
};


// validating user credentials
exports.isValidUser = function(username, password, callback) {
    User.findOne({username: username}, function (err, user) {
        if (!err) {
            console.log('Founded user: ' + JSON.stringify(user));
            var passwordHash = crypto.createHash('sha256').update(password).digest('hex');

            callback( passwordHash == user.password );
        } else {
            console.log(err);
            callback(false);
        }
    });
}

