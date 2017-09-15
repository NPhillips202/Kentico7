// Log Function
function logMe(str) {
	if (window.console && window.console.log) {
		window.console.log(str);
	};
};

// Add booking link to mobile nav
jQuery(function() {
   if (jQuery(window).width() <= 595) {
       var bookingLink = 'http://reservations.kittitianhill.com//#/roomsBooking/rate///1///////Belle Mont Farm';
       jQuery('#navigation > ul').prepend('<li class="booking-link"><a href="' + bookingLink + '" target="_blank">Check Availability</a></li>');
   };
});

// Footer Expand
jQuery(document).ready(function() {
	jQuery('#contactDetails a').click(function(e) {
		e.preventDefault();
		var sectionID = jQuery('#footerExpand');
		
		if (jQuery(sectionID).is(':visible')) {
			jQuery(sectionID).slideUp(750, function() {
				jQuery('#contactDetails a').removeClass('on');
			});
		} else {
			jQuery(sectionID).slideDown(750, function() {
				jQuery('#contactDetails a').addClass('on');
			});
		};
	});
});

// Site Map
jQuery(function() {
    jQuery(".sitemap-toggle").click(function(e) {
        e.preventDefault();
        if (jQuery('.sitemap-float').is(':visible')) {
            jQuery(".sitemap-float").fadeOut(500);
        } else {
            jQuery(".sitemap-float").fadeIn(500);
        };
    });
});

// Mobile Navigation Menu
jQuery(function() {
	var jQuerymenu = jQuery('#top #navigation'),
		jQuerymenuTrigger = jQuery('a#mobileMenu'),
        speed = 500;
	
	jQuerymenuTrigger.click(function(e) {
		e.preventDefault();
        if (jQuery('#headerWrapper').hasClass('navOpen')) {
              jQuerymenu.slideUp(speed, function() {
                 jQuery('#headerWrapper').removeClass('navOpen');
              });
        } else {
            jQuery('#headerWrapper').addClass('navOpen');
            jQuerymenu.slideDown(speed);          
        };
	});
});


// Make the top nav bar solid when the user scrolls
function changeBarOpacity() {
	var currentScroll = jQuery(document).scrollTop(),
		topBar = jQuery('.bellemont-header'),
		changeBarOpacityAfterScrollingThisMuch = (jQuery(window).height() - topBar.height());
	
	if (currentScroll > changeBarOpacityAfterScrollingThisMuch) {
		topBar.addClass('opacityFull');
	} else {
		topBar.removeClass('opacityFull');
	};
};
jQuery(function() {
	changeBarOpacity();
});
jQuery(window).scroll(function() {
	changeBarOpacity();
});