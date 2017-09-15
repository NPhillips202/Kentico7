//--Mobile Navigation
	jQuery(function() {
		 var mobile_menu = jQuery('<nav />').attr('id', 'menu');
		 var ul = jQuery('<ul></ul>');
		 var nav_clone = jQuery('.navigation > ul').clone();
		 nav_clone.find('> li').each(function() {
			 ul.append(jQuery(this));
		 });
		 mobile_menu.append(ul);
		 mobile_menu.prependTo('body');
		 jQuery('nav#menu').mmenu({
			 offCanvas: {
				position  : "top",
				zposition : "front",
				 classes: "mm-light"
			 },
		 })
			  .on( 'opening.mm', function() {
			jQuery( '#nav-toggle' ).addClass('active');
		})
		// navicon animation
		.on( 'closing.mm', function() {//.on( 'closed.mm', function() {
			jQuery( '#nav-toggle' ).removeClass('active');
		});
	});
	
//--Product accordion for mobile
	jQuery(function() {
		jQuery('.accordion .subArrow').click(function(e) {
			e.preventDefault();
			var currentLink = jQuery(this);
			var currentSub = jQuery(this).next();
			var delay = 500;
			
			jQuery('.accordion > .accordion-content').slideUp(delay);
			if (jQuery(this).hasClass('on')) {
				jQuery('.subArrow').removeClass('on');
			} else {
				jQuery('.subArrow').removeClass('on');
				jQuery(this).addClass('on');
				
				var top = jQuery('.accordion > .subArrow').first().offset().top - jQuery('header').height();
				jQuery('html, body').animate({scrollTop: top}, delay);
				setTimeout(function(){
					var top = jQuery(currentLink).offset().top - jQuery('header').height();
					jQuery(currentSub).slideDown(delay);
					jQuery('html,body').animate({scrollTop: top}, delay);
				}, delay);
			};
		});
	});
 
//--Navigation dropdowns
	//jQuery("#nav ul.child").removeClass("child");
	//jQuery(".navigation li").has("ul").hover(function(){
	//	var child = jQuery(this).children("ul");
	//	var parent = jQuery(this);
	//	if (child.width() < parent.width()) {
	//		child.width(parent.width());
	//	};
	//	jQuery(this).addClass("current").children("ul").fadeIn(500);
	//}, function() {
	//	jQuery(this).removeClass("current").children("ul").hide();
	//});

//--Form On Focus
	var el = jQuery('input[type=text], textarea');
	el.focus(function(e) {
		if (e.target.value == e.target.defaultValue)
			e.target.value = '';
	});
	el.blur(function(e) {
		if (e.target.value == '')
			e.target.value = e.target.defaultValue;
	});

//--Top bar sizing
	function barHeight() {
		var barHeight = jQuery('header').outerHeight();
		jQuery('.top').css('padding',barHeight+'px 0 0 0');
	};
	jQuery(function() {
		barHeight();
	});
	jQuery(window).resize(function() {
		barHeight();
	});

//--Top bar collapse for mobile
	var mobileHeaderCollapse = function() {
		console.log('test');
		var y = jQuery(this).scrollTop();
		if (y > 50) {
			jQuery('.free-bird').slideDown();
			jQuery('header').addClass('collapsed');
			// Recalc top padding
			var barHeight = jQuery('.header-inner').outerHeight();
			jQuery('.top').css('padding',barHeight+'px 0 0 0');
		} else {
			jQuery('.free-bird').slideUp();
			jQuery('header').removeClass('collapsed');
			// Recalc top padding
			var barHeight = jQuery('header').outerHeight();
			jQuery('.top').css('padding',barHeight+'px 0 0 0');
		}
	};
	function enableMobileHeaderCollapse() {
		if (jQuery("#mobileQuery").is(":visible")) {
			jQuery(window).bind('scroll',mobileHeaderCollapse);
		} else {
			jQuery(window).unbind('scroll',mobileHeaderCollapse);
			// Remove classes here
		};
	};
	jQuery(function() {
		enableMobileHeaderCollapse();
	});
	jQuery(window).resize(function() {
		enableMobileHeaderCollapse();
	});

//--Homepage slide sizing
	function slideSize() {
		// Set slide height
		var height = jQuery(window).height() - jQuery('header').outerHeight();
		jQuery('.home-slide').height(height);
		// Set vertical bar height
		jQuery('.home-slide').each(function() {
			//var contentHeight = jQuery(this).find('.slideContentWrapper').outerHeight();
			var difference = (((jQuery(window).height() - jQuery(this).find('.slideContentWrapper').outerHeight()) + (jQuery('header').height())) / 2);
			jQuery(this).find('.vertLine').height(difference);
		});
	};
	jQuery(function() {
		slideSize();
	});
	jQuery(window).resize(function() {
		slideSize();
	});

//--Homepage Parallax
	jQuery(function() {
		// Homepage Slides
		dzsprx_init('.dzsparallaxer.home-slide', {
			settings_mode: "scroll",
			mode_scroll: "normal",
			easing: "easeIn",
			animation_duration: "100",
			direction: "normal"
		});
		// Animation layers inside homepage slides
		dzsprx_init('.dzsparallaxer.home-slide-content', {
			settings_mode: "scroll",
			mode_scroll: "normal",
			easing: "easeIn",
			animation_duration: "100",
			direction: "reverse"
		});
		// Additional animation layers inside homepage slides
		dzsprx_init('.dzsparallaxer.home-slide-content-2', {
			settings_mode: "scroll",
			mode_scroll: "normal",
			easing: "easeIn",
			animation_duration: "100",
			direction: "normal"
		});
    });

//--Custom Scrollbar for Parallax
	//jQuery(function() {
	//	//window.dzsscr_init(jQuery('#wrapper'),{
	//	jQuery('#wrapper').scroller({
	//		'type':'scrollTop',
	//		'settings_skin':'skin_default',
	//		enable_easing: 'on',
	//		settings_autoresizescrollbar: 'on',
	//		settings_chrome_multiplier : 0.06
	//		//settings_refresh:10000
	//	});
    //});

//--Subpage Navigation Animation
	jQuery(function() {
		var wrapperWidth = jQuery('.sub-navigation').width();
		var navWidth = jQuery('.sub-navigation-inner').width();
		var difference = wrapperWidth - navWidth;
		if (difference < 0) {
			jQuery('.sub-navigation-inner').css('margin-left',difference);
			jQuery('.sub-navigation-inner').animate({
				 marginLeft: '0',
				 border: '1px solid #000'
			}, 600);
		};
	});

//--Contact Form Move Labels on Focus
    var el = jQuery('.contactForm input[type=text], .contactForm textarea');
	var labelMargin = "-30px";
	var inputMargin = "30px";
	
    el.focus(function(e) {
        if (e.target.value == e.target.defaultValue) {
            jQuery(this).parent().parent().children('label').css('margin-top',labelMargin);
			jQuery(this).css('margin-top',inputMargin);
        };
    });
    el.change(function(e) {
        jQuery(this).parent().parent().children('label').css('margin-top',labelMargin);
		jQuery(this).css('margin-top',inputMargin);
    });
    el.blur(function(e) {
        if (e.target.value == '') {
            jQuery(this).parent().parent().children('label').css('margin-top','0');
			jQuery(this).css('margin-top','0');
        };
    });
    jQuery(function() {
        el.each(function() {
            if (jQuery(this).val() != '') {
				jQuery(this).parent().parent().children('label').css('margin-top',labelMargin);
				jQuery(this).css('margin-top',inputMargin);
            };
        });
    });