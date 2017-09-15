//fancybox
jQuery(document).ready(function() {
	/*
	 *  Simple image gallery. Uses default settings
	 */

	jQuery('.fancybox').fancybox();

	/*
	 *  Different effects
	 */

	// Change title type, overlay closing speed
	jQuery(".fancybox-effects-a").fancybox({
		helpers: {
			title : {
				type : 'outside'
			},
			overlay : {
				speedOut : 0
			}
		}
	});

	// Disable opening and closing animations, change title type
	jQuery(".fancybox-effects-b").fancybox({
		openEffect  : 'none',
		closeEffect	: 'none',

		helpers : {
			title : {
				type : 'over'
			}
		}
	});

	// Set custom style, close if clicked, change title type and overlay color
	jQuery(".fancybox-effects-c").fancybox({
		wrapCSS    : 'fancybox-custom',
		closeClick : true,

		openEffect : 'none',

		helpers : {
			title : {
				type : 'inside'
			},
			overlay : {
				css : {
					'background' : 'rgba(238,238,238,0.85)'
				}
			}
		}
	});

	// Remove padding, set opening and closing animations, close if clicked and disable overlay
	jQuery(".fancybox-effects-d").fancybox({
		padding: 0,

		openEffect : 'elastic',
		openSpeed  : 150,

		closeEffect : 'elastic',
		closeSpeed  : 150,

		closeClick : true,

		helpers : {
			overlay : null
		}
	});
  
});

//menu mobile
jQuery(function() {
	jQuery('body').addClass('js');
	var jQuerymenu = jQuery('.menuMobile'),
		jQuerymenulink = jQuery('.menu-link'),
		jQuerymenuTrigger = jQuery('.menuMobile .has-submenu > a');
	
	jQuerymenulink.click(function(e) {
		e.preventDefault();
		jQuerymenulink.toggleClass('active');
		jQuerymenu.toggleClass('active');
        jQuerymenu.slideToggle();
	});
	
	jQuerymenuTrigger.click(function(e) {
		e.preventDefault();
		var jQuerythis = jQuery(this);
		jQuerythis.toggleClass('active').next('ul').toggleClass('active');
	});
});

//Slides
jQuery("#slides").responsiveSlides({
  auto: true,             // Boolean: Animate automatically, true or false
  speed: 1000,            // Integer: Speed of the transition, in milliseconds
  timeout: 4000,          // Integer: Time between slide transitions, in milliseconds
  pager: false,           // Boolean: Show pager, true or false
  nav: false,             // Boolean: Show navigation, true or false
  prevText: "Previous",   // String: Text for the "previous" button
  nextText: "Next",       // String: Text for the "next" button
  maxwidth: "none",       // Integer: Max-width of the slideshow, in pixels
  controls: "",           // Selector: Where controls should be appended to
  namespace: "rslides"    // String: change the default namespace used
});
 
//select box
jQuery(function () {
	jQuery("#adults").selectbox();
	jQuery("#children").selectbox();
});

// Menu positioning fix
jQuery(function() {
	var menuTarget = jQuery('.menu ul ul > li');
	menuTarget.hover(function() {
		var subMenu = jQuery(this).children('ul');
		if (subMenu.length > 0) {
			// Default it left
			subMenu.css('left','100%');
			subMenu.css('right','inherit');
			// Detect if submenu is extending off the page
			var currentPosition = jQuery(this).offset();
				currentPosition = currentPosition.left + jQuery(this).width();
			var navWidth = jQuery('#nav').width();
			if (currentPosition >= navWidth) {
				subMenu.css('left','inherit');
				subMenu.css('right','100%');
			};
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