// JavaScript Document
jQuery(document).ready(function () {
    jQuery(".sitemap-toggle").click(function(e) {
		e.preventDefault();
		if (jQuery('.sitemap-float').is(':visible')) {
			jQuery(".sitemap-float").slideUp(500);
		} else {
			if (jQuery('.portfolio-float').is(':visible')) {
				jQuery(".portfolio-float").slideUp(500, function() {
					jQuery(".sitemap-float").slideDown(500);
				});
			} else {
				jQuery(".sitemap-float").slideDown(500);
			};
		};
    });
});