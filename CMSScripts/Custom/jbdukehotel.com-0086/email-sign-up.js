// Email Form in Footer //
jQuery(function() {
    var emailForm = jQuery('.email');
    var defaultValue = "Enter Your Email";
    // Clear text in field when focused
    emailForm.find('.emailSignUp').focus(function() {
        if (jQuery(this).val() == defaultValue) {
            jQuery(this).val('');
        };
    });
    emailForm.find('.emailSignUp').blur(function() {
        if (jQuery(this).val() == '') {
            jQuery(this).val(defaultValue);
        };
    });
    // Submit functions
    function submitEmailForm() {
		var email = emailForm.find('.emailSignUp').val();
		if (email == defaultValue || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
			alert("Please enter a valid email address.");
			return false;
		};
		document.location.href = ('/email/?em=' + email);
    };
    emailForm.find('.emailSignUp').focus(function() {
        jQuery(document.body).delegate('input:text', 'keypress', function(e) {
            if (e.which === 13) {
                e.preventDefault();
                submitEmailForm();
            };
        });
    });
	emailForm.find('button').click(function(e) {
		e.preventDefault();
		submitEmailForm();
	});
});