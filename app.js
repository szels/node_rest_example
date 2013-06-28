
var config = require('./config'),
    express = require('express'),
    user = require('./routes/user');

var app = express();
 


// express configuration
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.json());
    app.use(express.urlencoded());
});


// authentication
var auth = express.basicAuth(function(username, password, callback) {
    user.isValidUser(username, password, function(result) {     
        callback(null /* error */, result);
    });
});


// routes definitions

// root route
app.get('/',  function(req, res) {
    res.send({'version' : '0.0.1'})
});

// user routes
app.get('/users', auth, user.findAll);
// app.get('/users/:id', user.findById);
app.get('/users/:username', user.findByUsername);
app.post('/users', user.add);
app.put('/users/:id', auth, user.update);
app.delete('/users/:id', auth, user.delete);

app.post('/users/:id/profileimage', auth, user.updateProfileImage);



// make server turn on 
// and listen at defined port 
app.listen(config.SERVER_PORT, function() {
  console.log('Listening on port ' + config.SERVER_PORT + ' ...');
});


module.exports = app;