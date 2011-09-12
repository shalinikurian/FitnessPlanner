
/**
 * Module dependencies.
 */

var express = require('express');
var fs = require('fs');
var app = module.exports = express.createServer();
var MemStore = require('connect').session.MemoryStore;

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieParser());
  app.use(express.session({
		secret: "shalini",
		store:MemStore({
		reapInterval: 60000*10
  })}));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

//Controllers


//Controller for a User
var UserController = require('./controllers/user');


//Routes


//on root send index.html
app.get('/', function(req, res){
  res.sendfile('/public/index.html');
});


//on /signup route to newUser in UserController
app.post('/signup', UserController.newUser);

//on /login route to logingUser in UserController
app.post('/login', UserController.loginUser);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
