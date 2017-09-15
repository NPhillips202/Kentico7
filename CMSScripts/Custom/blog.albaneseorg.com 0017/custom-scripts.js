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
    
    // Footer links
    jQuery('#footerNav .pop').click(function(e) {
        e.preventDefault();
        var url = jQuery(this).attr('href');
        window.open(url,'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=608,height=440');
    });
});