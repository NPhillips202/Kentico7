// Navigation dropdowns
jQuery(function() {    
	jQuery('#mainNav > ul > li').hover(
        function () {
            //show its submenu
            jQuery(this).children('ul').stop().slideDown(200);
        }, 
        function () {
            //hide its submenu
            jQuery(this).children('ul').stop().slideUp(250);    
        }
    );
}); 

// Mobile footer fade in
jQuery(function() {
	jQuery(window).scroll(function() {
		if (jQuery(window).width() < 660) {
			var scrollTop = jQuery(window).scrollTop();
			var scrollDistance = jQuery(document).height() - jQuery(window).innerHeight() - 80;
			if(scrollTop >= scrollDistance){
				jQuery('.footerRight').fadeIn('fast');
			}else{
				jQuery('.footerRight').fadeOut('fast');
			}
		};
	});
});

// Mobile menu button
jQuery(function() {
    jQuery('#mobileMenuBtn').click(function(e) {
        e.preventDefault(); 
		if (jQuery('#mainNav ul').is(':visible')) {
        	jQuery('#mainNav ul').slideUp(800);
		} else {
        	jQuery('#mainNav ul').slideDown(800);
		};
    });
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


// Navigation Schema
 
 


 