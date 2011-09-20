/**
 * @author Shalini Kurian
 * controller user 
 */

//user is an instance of User model

var users = require('../models/Users');
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

/*
 * newUser extracts a new user information from the request body and asks the user model to add a new user
 */

module.exports.newUser = function(req, res) {
	var userObject = req.body.user;
	users.addNewUser(userObject, function(err, user){
		if (err){
			
			res.send("email in use");
			//TODO handle error
			return;
		}
		req.session.user = user;
		console.log("in session");
		res.send("signed up and logged in "+req.session.user.firstName);
	});
	//to do : do this as a callback and not sequentially
	
}

/*
 * loginUser checks if the given user exists
 */
module.exports.loginUser = function(req, res){
	var email = req.body.email;
	var password = req.body.password;
	
	UserModel.authenticate(email, password, function(err, user){
		if(err){
			//TODO handle err
			return;
		}else{
			
		}
		if (user){
			req.session.user = user;
			console.log("in session");
			//res.send("signed up and logged in "+req.session.user.firstName);
			res.send({"model":user});
		}else {
			console.log("wrong user or password");
			res.send("wrong user/password");
		}	
	});
	
}

