jQuery(function () {
    // Site Map
    jQuery(".sitemap-toggle").click(function(e) {
        e.preventDefault();
        if (jQuery('.sitemap-float').is(':visible')) {
            jQuery(".sitemap-float").fadeOut(500);
        } else {
            jQuery(".sitemap-float").fadeIn(500);
        };
    });
    
	// Navigation dropdowns
	var navElement = jQuery('#topNav > ul > li');
	var navSpeed = 300;
    // Increase dropdown width if less than width of the main anchor
	//navElement.each(function() {
    //    var dropdownWidth = jQuery(this).children('ul').width();
    //    var buttonWidth = jQuery(this).outerWidth();
    //    var widthDifference = dropdownWidth - buttonWidth;
    //    if (widthDifference < 0) {
    //        jQuery(this).children('ul').width(buttonWidth+'px');
    //    };
    //});
	// Open & Close
    if (jQuery(window).width() > 760) {
        navElement.hover(function() {
            if (jQuery(this).children('ul').length > 0) {
                jQuery(this).addClass('active');
                jQuery(this).children('ul').stop(true,false);
                jQuery(this).children('ul').hide(); // Fix for slidedown
                jQuery(this).children('ul').slideDown(navSpeed);
            };
        }, function() {
            jQuery(this).removeClass('active');
            jQuery(this).children('ul:visible').stop(true,false);
            jQuery(this).children('ul:visible').slideUp(navSpeed);	
        });
    };
	
	// Mobile menu
	var menu = jQuery('#topNav');
	jQuery('#mobileNavBtn').click(function(e) {
		e.preventDefault();
		if (menu.is(':visible')) {
			menu.slideUp(600, function() {
                jQuery('#header').removeClass('navOpen');
            });
		} else {
            jQuery('#header').addClass('navOpen');
			menu.slideDown(600);
		};
	});
	
	// Mobile subnav
	var subMenu = jQuery('#subNav > ul');
	jQuery('#subNav .explore').click(function(e) {
		e.preventDefault();
		if (subMenu.is(':visible')) {
			subMenu.slideUp(600);
		} else {
			subMenu.slideDown(600);
		};
	});
	
	// Mobile footer expand
	var contactMenu = jQuery('#footerContactExpand');
	jQuery('#footerContactExpandBtn').click(function(e) {
		e.preventDefault();
		if (contactMenu.is(':visible')) {
			contactMenu.slideUp(600);
		} else {
			contactMenu.slideDown(600);
		};
	});
    
    // Directions form
    function submitDirections() {
		var from = jQuery('.directionsForm .saddr').val();
		var to = jQuery('.directionsForm .daddr').val();
		var url = "https://maps.google.com/maps?saddr=" + from + "&daddr=" + to;
		window.open(url);
    };
    jQuery('.directionsForm .saddr').focus(function() {
        jQuery(document.body).delegate('input:text', 'keypress', function(e) {
            if (e.which === 13) {
                e.preventDefault();
                submitDirections();
            };
        });
    });
	jQuery('.directionsForm .submitSm').click(function() {
        submitDirections();
	});
});