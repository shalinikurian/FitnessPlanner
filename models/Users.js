/**
 * Users.js defines a Schema for a user . It contains various methods operating on a User.
 */

/*
 * require node modules
 * 
 * mongoose: is an ORM to mongodb 
 * crypto:   is the cryptography module for node
 */ 
var Mongoose = require('mongoose');
var crypto = require('crypto');

//create a new Hash Object based on the sha1 algorithm
var sha1 = crypto.createHash('sha1');

//create a new Schema
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

/*
 * Define the User Model and Access it
 */
var NewUser = Mongoose.model('User',User);

/*
 * getters and setters for Schema attributes
 */

/*
 * generateHashedPassword creates a hashedPassword from the password 
 */
function generateHashedPassword(password) {
	//TODO: add a salt (append a random string to the password before hashing)
	
	//give sha1 data for hashing
	sha1.update(password);
	
	//create a hash for the password
	var hashedPassword = sha1.digest('hex');	
	
	return hashedPassword;
}

/*
 * functions to be used by other files
 */

/*
 * addNewUser adds a new User to the database
 */
module.exports.addNewUser = function (new_user) {

    // user is an instance of New_User
	var user = new NewUser();                 
	user.firstName = new_user.firstName || "";
	user.lastName = new_user.lastName || "";
	user.nickName = new_user.nickName || "";
	//setter for model attribute hashedPassword is called to create the hashedPassword
	user.hashedPassword = new_user.password || "";
	user.emailAddress = new_user.emailAddress || "";
	user.gender = new_user.gender || "";
	user.height = new_user.height || 0;
	user.weight = new_user.weight || 0;
	user.goal = new_user.goal || "";
	
	//save the user in the database
	user.save(function(err){
		if (err){
			throw err; // TODO: return it to controller and handle error 
		}
	});
	
}



