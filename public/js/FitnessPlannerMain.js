/**
 * this is for testing the backend. Futute implementation in Backbone.js
 */

/*
 * override sync funtion 
 * READ - POST request
 */
/*Backbone.sync = function (method, model, success, error){
	var params = _.extend({
      type:         'POST',
      dataType:     'json',
      data:         model.getCredentials(), 
      success: function(res) {
      	if (res.model){ //found muser
      		alert("success functon");
      		success(res.model);
      	} else if (res.error) {
      		alert("error");
      		error(res.error);
      	}
      },
      error: function (jqSHR, textStatus, errorThrown) {
      	alert("error");
      	alert(textStatus);
      	error();
      }
    });
  
    if (method == 'create') {
    	params.url = '/signup';
    } else if (method == 'read') {
    	params.url = model.url;
    }
    alert(JSON.stringify(params));
    $.ajax(params);
}*/

/*
 * define a user model
 */
var userModel = Backbone.Model.extend({
	initialize : function () {},	
	url: '/login',
	// returns data for post request
	getCredentials: function() {
		return "email="+this.get("emailAddress")+ "&password="+this.get("password");	
	},
	
	sync: function (method, model, success, error){
		var params = _.extend({
	    	type:         'POST',
	        dataType:     'json',
	        data:         model.getCredentials(), 
	        success: function(res) {
		      	if (res.model){ //found muser
		      		alert("success functon");
		      		success(res.model);
		      	} else if (res.error) {
		      		alert("error");
		      		error(res.error);
		      	}
	       },
	       error: function (jqSHR, textStatus, errorThrown) {
	      		alert("error");
	      		alert(textStatus);
	      		//handle error
	      	}
	    });
	  
	    if (method == 'create') {
	    	params.url = '/signup';
	    } else if (method == 'read') {
	    	params.url = model.url;
	    }
	    alert(JSON.stringify(params));
	    $.ajax(params);
	}
});

$('document').ready(function() {

	$('#new_user').click(function() {
		var gender = $('.select-box').val();
		$('#gender-hidden').val(gender);
		$('#new_user_form').submit();
	});



	$('#login-button').click(function(){
		var email = $('#email').val();
		var password = $('#password').val();
		//make a new user model
		var user = new userModel({emailAddress: email, password: password});
		
		//do a fetch operation
		user.fetch({
			//success function
			success: function(model){
				alert(JSON.stringify(model));
				//model is still empty
				alert(JSON.stringify(user));	
			},
			
			error: function(error) {
				alert("wrong username or password");
				//handle error
			}
		});
		
		
	});
	
});


