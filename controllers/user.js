/**
 * @author Shalini Kurian
 * controller user 
 */

//user is an instance of User model

var user = require('../models/Users');


/*
 * newUser extracts a new user information from the request body and asks the user model to add a new user
 */

module.exports.newUser = function(req, res) {
	var userObject = req.body.user;
	user.addNewUser(userObject);
}
