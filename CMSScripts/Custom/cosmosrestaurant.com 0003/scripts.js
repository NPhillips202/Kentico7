// Mobile Menu
jQuery(function() {
	var menuBtn = jQuery('#mobileMenuBtn');
	var menu = jQuery('.drop ul');
	menuBtn.click(function(e) {
		e.preventDefault();
		if (menu.is(':visible')) {
			menu.slideUp(600, function() {
                jQuery('.purple-block').css('z-index','16');
            });
		} else {
            jQuery('.purple-block').css('z-index','19');
			menu.slideDown(600);
		};
	});
});

// Turns header bar opague on scroll
jQuery(window).scroll(function() {
    if (jQuery(this).scrollTop() > 9) {
        jQuery( ".header #background" ).fadeIn();
    } else {
        console.log('there');
        jQuery( ".header #background" ).fadeOut();
    }
});

// Adds Subpage Class
jQuery(function() {
    if (jQuery('.content-block').length > 0) {
        jQuery('body').addClass('sub');
    };
});