jQuery(function() {
	var menuBtn = jQuery('#mobileMenuBtn');
	var menu = jQuery('.mobile-nav-sub #menuElem');
	menuBtn.click(function(e) {
		e.preventDefault();
		if (menu.is(':visible')) {
			menu.slideUp(600);
		} else {
			menu.slideDown(600);
		};
	});
});
jQuery(document).ready(function() {
	if (jQuery('.sub-shadow').length > 0) {
		jQuery('.shadow').removeClass('shadow');
	};
});

//Site Map
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