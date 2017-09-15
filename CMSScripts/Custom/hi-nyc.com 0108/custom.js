//addClass to body
jQuery(document).ready(function() {
  jQuery("body").addClass('em');
});  


//format phone number top of page
jQuery(document).ready(function() {
    jQuery(".phone").text(function(i, text) {
        text = text.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
        return text;
    });
});  


//addClass to navigation
jQuery(document).ready(function() {
  jQuery(".navigation nav ul:first-child").addClass('enumenu_ul menu desk');
});  
 

// Email Signup Form in Footer
jQuery(function() {
  var emailForm = jQuery('#client-form .sign-form'),
     emailFormInput = emailForm.find('.txt-area'),
            defaultValue = "";
        // Submit functions
        function submitEmailForm(val) {
            var email = val;
            if (email == defaultValue || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
                alert("Please enter a valid email address.");
                return false;
            };
            document.location.href = ('/email-signup/?em=' + email);
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
        emailForm.find('.button').on('click', function(e) {
            e.preventDefault();
            var val = jQuery(this).parent().find('.txt-area').val();
            submitEmailForm(val);
        });
    });  


    //-- Site Map
    jQuery(function() {
        jQuery('*').click(function(e) {
            var target = jQuery(e.target);
            if (target.hasClass('sitemap-toggle')) {
                e.preventDefault();
                e.stopPropagation();
                if (jQuery('.sitemap-float').is(':visible')) {
                    jQuery(".sitemap-float").fadeOut(500);
                } else {
                    jQuery(".sitemap-float").fadeIn(500);
                };
            } else {
                if (jQuery('.sitemap-float').is(':visible') && !target.hasClass('sitemap-float') && !jQuery('.sitemap-float').has(target).length > 0) {
                    if (!target.hasClass('.sitemap-float')) {
                        jQuery('.sitemap-float').fadeOut(500);
                    };
                };
            };
        });
    });
   
//-- Site Map Position
jQuery(document).ready(function() {
  jQuery('footer .main .right-ftr .ftr-nav ul#menuElem').append('<li><a href="#" class="sitemap-toggle">Site Map</a></li>');
}); 