jQuery(function() {
	jQuery('#emailSubmitBtn').click(function(e) {
		e.preventDefault();
		
		var email = jQuery('.emailSignUp .signUp').val();
		
		if (email == "Enter your email address" || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
			alert("Please enter a valid email address.");
			return false;
		};
		
		document.location.href = ('/email-sign-up/?em=' + email);
	});
});