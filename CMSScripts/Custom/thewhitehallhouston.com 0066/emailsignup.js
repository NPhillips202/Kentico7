// Email Signup Form in Footer
    jQuery(function() {
         var emailForm = jQuery('.social-right'),
            emailFormInput = emailForm.find('.text-box'),
            defaultValue = "";
        // Submit functions
        function submitEmailForm(val) {
            var email = val;
            if (email == defaultValue || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
                alert("Please enter a valid email address.");
                return false;
            };
            document.location.href = ('/email-sign-up/?em=' + email);
        };
        emailFormInput.on('focus', function() {
            jQuery(document.body).delegate('input:text', 'keypress', function(e) {
                if (e.which === 13) {
                    e.preventDefault();
                    var val = jQuery(this).val();
                    submitEmailForm(val);
                };
            });
        });
        emailForm.find('.input-search').on('click', function(e) {
            e.preventDefault();
            var val = jQuery(this).parent().find('.text-box').val();
            submitEmailForm(val);
        });
    });