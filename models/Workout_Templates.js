/**
 * @author Rajiv
 */

var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;
var ObjectID = Schema.ObjectId;

var Set = new Schema({
	reps: {type: Number, default: 0},
	weight: {type: Number, default: 0},
	duration: {type: Number, default: 0}
});

var Exercise = new Schema({
	exerciseName: {type: String, default: ""},
	exerciseDesc: {type: String, default: ""},
	sets: [Set]
});

var WorkoutTemplate = new Schema({
	workoutTemplateId: ObjectId,
	parentId: {type: String, default: ""},
	userId: {type: String, default: ""},
	workoutName: {type: String, default: ""},
	workoutDesc: {type: String, default: ""},
	exercises: [Exercise] 
	
});

var db = Mongoose.connect('mongodb://localhost/fitnessPlanner');

//Insert Statics here
WorkoutTemplate.statics.getWorkout = function getWorkout(userIds, workoutTemplateIds) {
	var query = Model.find({});
	query.where('workoutId').in(workoutTemplateIds)
	.or
	.where('userId').in(userIds);
	query.execute( function (err, workoutTemplates){
		if(err){
			console.log("Error finding workouts");
			cb(err);
			return;
		}
		else {
			console.log("Found " + workoutTemplates.length + "workouts");
			cb(err, workoutTemplates);
		}
	});
	}
//define model
var WorkoutTemplateModel = Mongoose.model('WorkoutTemplate', WorkoutTemplate);

//Methods

module.exports.addNewWorkout = function(workoutTemplateParam, cb){
	var workoutTemplate = new WorkoutTemplateModel();
	var error;
	if(workoutTemplateParam.exercises.length === 0 || workoutTemplateParam.exercises[0].sets.length === 0 || workoutTemplateParam.exercises[0].sets[0].reps === 0) {
		error = "Workout Template needs atleast one exercise and one set and one rep"; 
		console.log(error);
		cb(error);
	}
	//Copy values onto workoutTemplate
	for (var propertyName in workoutTemplateParam) {
		if(! (workoutTemplateParam[propertyName] instanceof Function) && ! (workoutTemplateParam[propertyName] == null)){
			workoutTemplate[propertyName] = workoutTemplateParam[propertyName];
		}
	}
	workoutTemplate.save(function(err){
				if (err) {
					console.log("error in saving workout");
					throw err;
					cb(err);
				}
				console.log("saved workoutTemplate in collection WorkoutTemplates in database fitnessPlanner");
				cb(err, user);
			});
};

