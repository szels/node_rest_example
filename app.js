
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



// routes definitions

// user routes
app.get('/users', user.findAll);
app.get('/users/:id', user.findById);
app.post('/users', user.add);
app.put('/users/:id', user.update);
app.delete('/users/:id', user.delete);

app.post('/users/:id/profileimage', user.updateProfileImage);



// make server turn on 
// and listen at defined port 
app.listen(config.SERVER_PORT, function() {
  console.log('Listening on port ' + config.SERVER_PORT + ' ...');
});
