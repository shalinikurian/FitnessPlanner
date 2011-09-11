/**
 * this is for testing the backend. Futute implementation in Backbone.js
 */
$('document').ready(function() {
	$('#new_user').click(function() {
		var gender = $('.select-box').val();
		$('#gender-hidden').val(gender);
		$('#new_user_form').submit();
	});

});
