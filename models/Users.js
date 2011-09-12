/**
 * Users.js defines a Schema for a user . It contains various methods operating on a User.
 */

/*
 * require node modules
 * mongoose: ORM to mongodb
 * crypto: provides functions related to cryptography
 */
var Mongoose = require('mongoose');
var crypto = require('crypto');

/*
 * define a Mongoose Schema
 */
var Schema = Mongoose.Schema;
var ObjectID = Schema.ObjectId;

/*
 * Define a Schema for a User
 */
var User = new Schema({
	userId: ObjectID,
	firstName: String,
	lastName: String,
	nickName: String,
	hashedPassword: {type: String, index: true, set: generateHashedPassword},
	emailAddress: {type: String, index: true},
	gender: String,
	height: Number,
	weight: Number, 
	goal: String,
	privacyOptions: {
					 	firstName: { type: Boolean , default: false},
					 	lastName: { type: Boolean , default: false},
					 	nickName: { type: Boolean , default: false},
						gender: { type: Boolean , default: false},
						height: { type: Boolean , default: false},
						weight: { type: Boolean , default: false},
						goal: { type: Boolean , default: false}
	}
});

//Connect to the mongoose database fitnessPlanner
var db = Mongoose.connect('mongodb://localhost/fitnessPlanner');
/*
 * statics and methods
 */
/*
 * getUser returns a user for the given email and password and returns null if no user is found
 */
User.statics.authenticate = function authenticate(email, password,cb){
	//TODO two queries after adding salt
	var hashedPassword = generateHashedPassword(password);

    this.findOne({emailAddress:email, hashedPassword:hashedPassword}, function(err,user){
    	console.log("after find one");
    	if (err){
    		throw err;
    		cb(err);
    	}
		cb(err, user);
	});
}

User.statics.checkEmailInUse = function checkEmailInUse(email, cb){
	this.findOne({emailAddress:email}, function(err,user){
    	if (err){
    		throw err;
    		//cb(err);
    	}
    	console.log("user");
    	console.log(user);
    	if (user){
    		console.log("email in use");
    		cb("email in use");
    	}else {
    		cb(null);
    	}
    	
	});
}
/*
 * Define the User Model and Access it
 */
var NewUser = Mongoose.model('User',User);


/*
 * setters and getters for attributes of model User
 */

/*
 * generateHashedPassword is a setter for attribute password which generates a hash for the password
 */
function generateHashedPassword(password) {
	
	/*
 	* sha1 is an instance of a Hash Object using the sha1 encryption algorithm
 	*/
	var sha1 = crypto.createHash('sha1');
	// store the password to be hashed
	sha1.update(password);
	
	//create a hash for the password
	var hashedPassword = sha1.digest('hex');	
	console.log("hahsed password for ");
	return hashedPassword;
}

/*
 * functions to be exported for use in other files
 */
/*
 * addNewUser adds a new User to the database
 */
module.exports.addNewUser = function (new_user, cb) {
    //check if the given email exists in the database
    NewUser.checkEmailInUse(new_user.emailAddress,function(err) {
    	if (err){ //send error back to controller
    		cb(err);
    	}else { 
    		createNewUser(new_user, cb);
    	}
    });
	
}

/*
 * createNewUser creates a new User
 */
function createNewUser(new_user, cb) {
	var user = new NewUser();                 //instance of New_User
	user.firstName = new_user.firstName || "";
			user.lastName = new_user.lastName || "";
			user.nickName = new_user.nickName || "";
			user.hashedPassword = new_user.password || ""; //setter called here
			user.emailAddress = new_user.emailAddress || "";
			user.gender = new_user.gender || "";
			user.height = new_user.height || 0;
			user.weight = new_user.weight || 0;
			user.goal = new_user.goal || ""; 	
			
			user.save(function(err){
				if (err) {
					console.log("error in saving user in database fitnessPlanner");
					throw err;
					cb(err);
				}
				console.log("saved user information in collection users in database fitnessPlanner");
				cb(err, user);
			});
}


