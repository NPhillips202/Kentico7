jQuery(function() {
	// Form submit
    function submitEmailForm() {
		var email = jQuery('.emailSignUp .signUp').val();
		
		if (email == "your email here" || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
			alert("Please enter a valid email address.");
			return false;
		};
        
		document.location.href = ('/email-sign-up/?em=' + email);
	};
    
    // Submit form when user presses Enter
    jQuery('.signUp').focus(function() {
        jQuery(document.body).delegate('input:text', 'keypress', function(e) {
            if (e.which === 13) {
                e.preventDefault();
                submitEmailForm();
            };
        });
    });
  
    // Submit form when user clicks Submit
	jQuery('#emailSubmitBtn').click(function(e) {
		e.preventDefault();
        submitEmailForm();
    });
});