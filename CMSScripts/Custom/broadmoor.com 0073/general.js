/*
@name			Broadmoor 2016 - general.js
@version		1.0.0
@author-uri		http://cendynone.com
*/

// browser check
var is_chrome = navigator.userAgent.indexOf('Chrome') > -1,
	is_explorer = navigator.userAgent.indexOf('MSIE') > -1,
	is_firefox = navigator.userAgent.indexOf('Firefox') > -1,
	is_safari = navigator.userAgent.indexOf("Safari") > -1,
	is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1,
	// reset
	is_safari = ( (is_chrome) && (is_safari) ) ? false : is_safari,
	is_chrome = ( (is_chrome) && (is_opera) ) ? false : is_chrome;

//--Header Height
function headerHeight() {

	var header_height = jQuery('header').outerHeight();
	jQuery('#wrapper').css('marginTop', header_height + 'px');
}
//jQuery(function() { headerHeight(); });
//jQuery(window).resize(function() { headerHeight(); });

//--Divide footer nav into multuple columns
function initFooterColumnization() {

	var numOfItemsPerColumn = 4,
		elements = jQuery('.footerNav li');

	elements.each(function(i) {
		if( i % numOfItemsPerColumn == 0 ) {
			jQuery(this).nextAll().andSelf().slice(0,numOfItemsPerColumn).wrapAll('<div class="footerNavCol"><ul></ul></div>');
		};
	});
	// Get rid of the old ul
	jQuery('.footerNavCol').unwrap();
	// Move search into last column
	var col = jQuery('.footerNavCol').last();
	//var col = (jQuery('.footerNavCol').length >= 3) ? jQuery('.footerNavCol').last() : jQuery('<div class="footerNavCol"><ul></ul></div>').appendTo(elements.closest('.footerNav'));
	//console.log(jQuery('.footerNavCol').length);
	jQuery('.footerArea .search').appendTo(col);
};

/*
//--Meeting planner slideout
var toggleMeetingPlannerBox = function(closeBoxInstantly) {

	var wrapper = jQuery('.meetingPlanner'),
		box = jQuery('.meetingPlannerBox'),
		width = box.outerWidth(),
		speed = 600;

	//if (closeBoxInstantly === true) {
	//	wrapper.css('left','-' + width + 'px');
	//} else {
	//	if (wrapper.offset().left === 0) {
	//		wrapper.animate({left:'-' + width}, speed);
	//	} else {
	//		wrapper.animate({left:'0'}, speed);
	//	}
	//}
	if (closeBoxInstantly === true) {
		wrapper.css('right','-' + width + 'px');
	} else {
		var offset = parseInt(wrapper.css('right'));
		if (offset === 0) {
			wrapper.animate({right:'-' + width}, speed);
		} else {
			wrapper.animate({right:'0'}, speed);
		}
	}
};
var initMeetingPlannerEvents = function() {

	jQuery('.meetingPlannerIcon').click(function(e) {
		toggleMeetingPlannerBox();
	});
	if (jQuery(document).width() > 750) {
		setTimeout(function(){
			//if (jQuery('.meetingPlanner').offset().left === 0) {
			var offset = parseInt(jQuery('.meetingPlanner').css('right'));
			if (offset === 0) {
				toggleMeetingPlannerBox(false);
			};
		}, 3000);
	} else {
		toggleMeetingPlannerBox(true);
	};
};
*/
/*jQuery(function() {
	initMeetingPlannerEvents();
});*/

//--Sea Island slideout
function toggleSeaIslandCalloutBox(closeBoxInstantly) {

	var wrapper = jQuery('.seaIslandCallout'),
		box = jQuery('.seaIslandCalloutBox'),
		height = box.outerHeight(),
		speed = 600;

	//if (closeBoxInstantly === true) {
	//	wrapper.css('left','-' + width + 'px');
	//} else {
	//	if (wrapper.offset().left === 0) {
	//		wrapper.animate({left:'-' + width}, speed);
	//	} else {
	//		wrapper.animate({left:'0'}, speed);
	//	}
	//}
	if (closeBoxInstantly === true) {
		wrapper.css('right','-' + height + 'px');
	} else {
		var offset = parseInt(wrapper.css('bottom'));
		if (offset === 0) {
			wrapper.animate({bottom:'-' + height}, speed);
		} else {
			wrapper.animate({bottom:'0'}, speed);
		}
	}
};
function initSeaIslandCalloutEvents() {

	jQuery('.seaIslandCalloutIcon').click(function(e) {
		toggleSeaIslandCalloutBox();
	});
	if (jQuery(document).width() > 750) {
		setTimeout(function(){
			//if (jQuery('.meetingPlanner').offset().left === 0) {
			var offset = parseInt(jQuery('.seaIslandCallout').css('bottom'));
			if (offset === 0) {
				toggleSeaIslandCalloutBox(false);
			};
		}, 3000);
	} else {
		toggleSeaIslandCalloutBox(true);
	};
};

//--Video of the Day
var divToCollapse = jQuery('.videoCollapse'),
	position = jQuery('header').outerHeight(),
	collapseAfterThisHeight = 100,
	animationSpeed = 400;

// Initial positioning
function collapseVideoBoxInitPosition() {

	if(divToCollapse.length) {
		divToCollapse.css('top', position + 'px');
	}
};
// Collapse on scroll
function collapseVideoBox() {

	var currentScroll = jQuery(window).scrollTop();

	if(divToCollapse.length) {
		if (currentScroll > collapseAfterThisHeight) {
			divToCollapse.slideUp(animationSpeed);
		} else {
			divToCollapse.slideDown(animationSpeed);
		}
	}
};
//jQuery(function() { collapseVideoBoxInitPosition();collapseVideoBox(); });
//jQuery(window).scroll(function() { collapseVideoBox(); });

//--Swipers
function initSwiperSliders() {

	// Testimonials rotation
	if(jQuery('.testimonialsArea .swiper-container').length) {
		var swiperTestimonials = new Swiper('.testimonialsArea .swiper-container', {
			speed: 2000,
			autoplay: 3000,
			pagination: jQuery('.testimonialsArea .pagination'),
			paginationClickable: true,
			loop: true,
			autoplayDisableOnInteraction: false
		});
	}

	// Wilderness Experience rotation
	if(jQuery('.wildernessExperiencesSliderBox:not(.bottomImageCarousel) > .swiper-container').length) {
		var swiperSpecials = new Swiper('.wildernessExperiencesSliderBox > .swiper-container', {
			speed: 2000,
			autoplay: 7500,
			//effect: 'fade',
			//parallax: true,
			direction: 'horizontal',
			pagination: jQuery('.wildernessExperiencesSliderBox .pagination'),
			paginationClickable: true,
			calculateHeight: true,
			loop: true,
			autoplayDisableOnInteraction: true,
			preloadImages: false, // Disable preloading of all images
			lazyLoading: true, // Enable lazy loading
			lazyLoadingInPrevNext: true,
			lazyLoadingOnTransitionStart: true,
			onTransitionStart: function() {
				// do something
				// such as lazy image image with libraries
				// like "bLazy.revalidate()" or "jQueryLazy()"
				// or call outside function
			},
			onTransitionEnd: function() {
				// do something
				// such as lazy image image with libraries
				// like "bLazy.revalidate()" or "jQueryLazy()"
				// or call outside function
			}
		});
	}

	// Wilderness Experience rotation
	if(jQuery('.bottomImageCarousel > .swiper-container').length) {
		var swiperSpecials = new Swiper('.bottomImageCarousel > .swiper-container', {
			speed: 2000,
			//autoplay: 7500,
			slidesPerView: 2,
			spaceBetween: 0,
			direction: 'horizontal',
			prevButton: '.prev',
			nextButton: '.next',
			//paginationClickable: true,
			calculateHeight: true,
			loop: true,
			autoplayDisableOnInteraction: true,
			breakpoints: {
				"750": {
					slidesPerView: 1
					//slidesPerView: 2,
				}
			}
		});
	}

	// Specials background image (controlled by the main specials swiper)
	if(jQuery('.specialsArea > .swiper-container').length) {
		var swiperSpecialsBg = new Swiper('.specialsArea > .swiper-container', {
			allowSwipeToPrev: false,
			allowSwipeToNext: false,
			speed: 2000,
			autoplay: 4000,
			effect: 'fade',
			loop: true,
			autoplayDisableOnInteraction: true,
			preloadImages: false, // Disable preloading of all images
			lazyLoading: true, // Enable lazy loading
			lazyLoadingInPrevNext: true,
			lazyLoadingOnTransitionStart: true,
			onTransitionStart: function() {
				// do something
				// such as lazy image image with libraries
				// like "bLazy.revalidate()" or "jQueryLazy()"
				// or call outside function
			},
			onTransitionEnd: function() {
				// do something
				// such as lazy image image with libraries
				// like "bLazy.revalidate()" or "jQueryLazy()"
				// or call outside function
			}
		});
	}

	// Main specials rotation
	if(jQuery('.specialsBox .swiper-container').length) {
		var swiperSpecials = new Swiper('.specialsBox .swiper-container', {
			speed: 2000,
			autoplay: 4000,
			pagination: jQuery('.specialsBox .pagination'),
			paginationClickable: true,
			loop: true,
			autoplayDisableOnInteraction: true,
			control: [swiperSpecialsBg],
			onInit: function(swiper) {
				// Video area height fallback for IE bugs
				var specials_area = jQuery('.specialsArea'),
					//video_and_featured_area = jQuery('.videoArea, .videoArea > *, .featuredArea, .featuredArea > *').addClass('do-height-adjustment_with-specials'),
					video_and_featured_area = jQuery('.videoArea > *, .featuredArea > *').addClass('do-height-adjustment_with-specials'),
					//video_and_featured_area = jQuery('.videoArea > .videoBg, .featuredArea > *').addClass('do-height-adjustment_with-specials'),
					do_height_adjustment__with_specials = jQuery('.do-height-adjustment_with-specials');

				//console.log(jQuery('.specialsArea').height());

				do_height_adjustment__with_specials.height(jQuery('.specialsArea').height());
				jQuery(window).resize(function() {
					do_height_adjustment__with_specials.height(jQuery('.specialsArea').height());
				});
				/*do_height_adjustment__with_specials.each(function(){
					var $this = jQuery(this);
					$this.css('height', jQuery('.specialsArea').height());
					//$this.height(jQuery('.specialsArea').height());
					jQuery(window).resize(function() {
						$this.css('height', jQuery('.specialsArea').height());
						//$this.height(jQuery('.specialsArea').height());
					});
				});*/
			}
		});
	}

	// Room type photo rotation
	//console.log(jQuery('.room-type-photos .swiper-container .swiper-wrapper > .swiper-slide').length);
	//if(jQuery('.room-type-photos .swiper-container .swiper-wrapper > .swiper-slide').length > 1){
	//}
	var swiperRoomTypesSlidersArray = [],
		swiperRoomTypesSliders = jQuery('.room-type-photos .swiper-container').find('> .swiper-wrapper'),
		swiperRoomTypes,
		swiperRoomTypesPrefix = 'swiper-room-types_';

	// loop thru all Room Types Elements
	if(swiperRoomTypesSliders.length) {
		swiperRoomTypesSliders.each(function(index, element) {
			var $this = jQuery(this).closest('.swiper-container').addClass(swiperRoomTypesPrefix + index),
				swipperRoomTypeClass = '.' + swiperRoomTypesPrefix + index;
			//console.log($this.find('> .swiper-slide').length);
			//console.log($this.closest('.room-type-media-wrapper').find('p strong').text());

			//console.log($this.find('> .swiper-slide').find('img').eq(0).attr('data-src'));
			//console.log($this.find('> .swiper-slide').find('img').eq(1).attr('data-src'));
			//console.log($this.find('> .swiper-slide').find('img').eq(2).attr('data-src'));

			if($this.find('> .swiper-wrapper').find('> .swiper-slide').length == 1){
				$this.addClass('single-slide');
				jQuery('.single-slide').find('.prev, .next').addClass('hide');
			} else {
				$this.addClass('not-single-slide');
				jQuery('.not-single-slide').find('.prev, .next').removeClass('hide');
			}
			if($this.find('.swiper-slide').length > 1){
				//console.log('multiple');
				swiperRoomTypes = new Swiper(swipperRoomTypeClass + '.not-single-slide', {
				//swiperRoomTypes = new Swiper('.room-type-photos .swiper-container.not-single-slide', {
					speed: 1000,
					loop: true,
					prevButton: '.prev',
					nextButton: '.next',
					preloadImages: false, // Disable preloading of all images
					lazyLoading: true, // Enable lazy loading

					lazyLoadingInPrevNext: true,
					lazyLoadingOnTransitionStart: true/*,
					onLazyImageLoad: function (swiper, slide, image) {
						console.log('swiper: ' + image.src);
					}*/
				});
			} else {
				//console.log('single');
				swiperRoomTypes = new Swiper(swipperRoomTypeClass + '.single-slide', {
				//swiperRoomTypes = new Swiper('.room-type-photos .swiper-container.single-slide', {
					//speed: 1000,
					//loop: true,
					//prevButton: '.prev',
					//nextButton: '.next',
					allowSwipeToPrev: false,
					allowSwipeToNext: false,
					preloadImages: false, // Disable preloading of all images
					lazyLoading: true, // Enable lazy loading

					//lazyLoadingInPrevNext: true,
					//lazyLoadingOnTransitionStart: true,

					noSwiping: true/*,
					onLazyImageLoad: function (swiper, slide, image) {
						console.log(image.src);
					}*/
				});
			}
		});
	}
};

//--Main navigation dropdowns
var navElement = jQuery('#mainNav > ul > li'),
	navSpeed = 400;

// Reposition dropdowns that are too far to the right
function repositionNavDropdowns() {

	navElement.each(function() {
		jQuery(this).children('ul').show(); // Offset fix

		//var dropdownRightPos = jQuery(this).children('ul').offset().left + jQuery(this).children('ul').outerWidth(),
		//    navRightPos = jQuery('#mainNav').offset().left + jQuery('#mainNav').outerWidth(),
		//    difference = navRightPos - dropdownRightPos;
		var mainNav = jQuery('#mainNav'),
			mainNavOffset = mainNav.offset(),
			children = jQuery(this).children('ul'),
			childrenOffset = children.offset(),
			dropdownRightPos = (children.is(":visible") ? childrenOffset.left : 0) + children.outerWidth(),
			navRightPos = (mainNav.is(":visible") ? mainNavOffset.left : 0) + mainNav.outerWidth(),
			difference = navRightPos - dropdownRightPos;

		children.hide(); // Offset fix

		//console.log(dropdownRightPos + ' | ' + navRightPos + ' | ' + difference);

		if (difference < 0) {
			children.addClass('right-position');
			children.css('left','inherit');
			children.css('right','0');
		};
	});
};
//jQuery(function() { repositionNavDropdowns(); });
//jQuery(window).resize(function() { repositionNavDropdowns(); });
// Open & Close
function navHoverActions() {

	navElement.hover(function() {
		var $this = jQuery(this);
		var children = jQuery(this).children('ul');
		if(children.length > 0) {
			$this.addClass('active');
			children.stop(true, false);
			children.hide(); // Fix for slidedown
			//children.slideDown(navSpeed, function(){
			//	jQuery(this).css('opacity', 1);
			//});
			children.animate({
				opacity: 1,
				top: '100%',
				//left: "+=50",
				//height: "toggle"
			}, navSpeed, function() {
				// Animation complete.
				jQuery(this).addClass('hovered');
			});
		};
	}, function() {
		jQuery(this).removeClass('active');
		jQuery(this).children('ul:visible').stop(true, false);
		//jQuery(this).children('ul:visible').slideUp(navSpeed, function(){
		//	jQuery(this).css('opacity', 0);
		//});
		jQuery(this).children('ul:visible').animate({
			opacity: 0,
			top: '-999px',
		}, navSpeed, function() {
			// Animation complete.
			jQuery(this).removeClass('hovered');
		});
	});
};
//jQuery(function() {
//});

//--Mobile navigation slideout menu
function initMobileMenu() {

	//jQuery('#siteMapNav').mmenu({
	jQuery('#mainNav').mmenu({
		// Options
		navbar: {
			title: 'The Broadmoor'
		},
		extensions: [
			"broadmoor",
			"border-full",
			"effect-slide-menu",
			"pageshadow"
		],
		offCanvas: {
			position: "right",
		},
		counters: true,
		labels: true
	}, {
		// Configuration
		clone: true,
		offCanvas {
			//menuWrapperSelector: "#wrapper",
			//pageNodetype: "form",
			pageSelector: "#wrapper"
		}
	}).on('init', function(){
		var menu = jQuery('.mm-panel').first(),
			reservations = jQuery('#reservationsBtnMobile.mobileReservations'),
			secondaryNav = jQuery('#topNavInner > ul > li'),
			meetingPlannerBox = jQuery('.meetingPlannerBox');

		reservations.clone().prependTo(menu).removeClass('mobileReservations');
		secondaryNav.clone().appendTo(menu.children('ul'));
		meetingPlannerBox.clone().appendTo(menu);
		// add space within empty links
		/*menu.find('a[href]').each(function(){
			var $this = jQuery(this);
			if($this.text() == "" && $this.children().length == 0) {
				//console.log($this.text());
				$this.html('<span class="hide">Explore ' + $this.next().text() + ' Section</span>');
			}
		});*/
	}).trigger( "init" );

	jQuery('#mm-0').find('ul li:first').remove();
};

// sub nav
function initSubNav() {
	// get start time
	//console.time('subNav');

	// Sub nav Click
	jQuery('#subnav-toggle').click(function(e) {
		e.preventDefault();
		//jQuery(this).find('> .lines-button').toggleClass('close');
		jQuery('html').toggleClass('submenu-opened');
		jQuery('#subNav:visible').stop().slideUp().fadeOut(400, function() {
			jQuery(this).css('display','none');
		});
		jQuery('#subNav').not(":visible").stop().slideDown().fadeIn(400, function() {
			jQuery(this).css('display','block');
		});
	});

	//console.timeEnd('subNav');
	// add up time to get load time
};

// get query string
function getQuery(q) {

	return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
};
// Function for enabling main page scrolling
function enablePageScroll() {

	var scrollTop = parseInt(jQuery('html').css('top'));
	jQuery('html').removeClass('noscroll');
	jQuery('html,body').scrollTop(-scrollTop);
};
// Function for disabling main page scrolling
function disablePageScroll() {

	if (!jQuery('html').hasClass('noscroll')) {
		if (jQuery(document).height() > jQuery(window).height()) {
			var scrollTop = (jQuery('html').scrollTop()) ? jQuery('html').scrollTop() : jQuery('body').scrollTop();
			jQuery('html').addClass('noscroll').css('top',-scrollTop);
		};
	};
};
// Function for auto-centering the overlay vertically
function centerVertically() {

	jQuery('.formOverlay').css({
		'top' : '50%',
		'margin-top' : -jQuery('.formOverlay').height()/2
	});
};
// Close function
function closeOverlay() {

	enablePageScroll();
	jQuery('.formOverlayWrapper').fadeOut(500, function()
	{
		jQuery('.formOverlayWrapper').remove();
		jQuery(window).unbind('resize',centerVertically);
	});
	// Unbind click event for closing overlay
	jQuery(document).unbind('click',closeOverlayOnOutsideClick);
};
// Close on click outside of box
function closeOverlayOnOutsideClick(e) {

	if (jQuery('.formOverlayWrapper').is(':visible')) {
		var ele = jQuery(e.target);
		if (!ele.hasClass("formOverlay")) {
			closeOverlay();
		};
	};
};
// Close on click outside of box
function customLightBoxClickEvents(e) {

	// Open overlay - Iframe; e.g. Calendar forms, etc.
	jQuery('a.openOverlay, li.openOverlay > a').live('click',function(e) {
		e.preventDefault();
		var overlay = jQuery('<div class="formOverlayWrapper"><div class="formOverlay"><div class="formOverlayClose"><i class="fa fa-times"></i></div><div class="formOverlayContent" /></div></div>'),
			href = jQuery(this).attr('href'),
			iframe = "<iframe src='" + href + "' allowtransparency='yes' frameborder='0' scrolling='yes' width='100%'></iframe>";
		disablePageScroll();
		// Create overlay div and fill with iframe content, then fade in
		jQuery('body').append(overlay);
		overlay.find('.formOverlayContent').html(iframe);
		overlay.fadeIn(500);
		centerVertically();
		jQuery(window).bind('resize', centerVertically);
		// Bind click event for closing overlay
		jQuery(document).bind('click', closeOverlayOnOutsideClick);
	});
	// Close on click
	jQuery('.formOverlayWrapper .close').live('click',function(e) {
		e.preventDefault();
		closeOverlay();
	});
};

// Full Calendar Adjustments
function fullCalendarAdjustments() {

	/*jQuery('*').live('click', function(e) {
		var target = jQuery(e.target);
		if (target.hasClass('ui-dialog')) {
			e.preventDefault();
			e.stopPropagation();
			if (jQuery('.ui-dialog').is(':visible')) {
				jQuery(".ui-dialog").fadeOut(500);
			} else {
				jQuery(".ui-dialog").fadeIn(500);
			};
		} else {
			if (jQuery('.ui-dialog').is(':visible') && !target.hasClass('ui-dialog') && !jQuery('.ui-dialog').has(target).length > 0) {
				if (!target.hasClass('.ui-dialog')) {
					jQuery('.ui-dialog').fadeOut(500);
				};
			};
		};
	});*/
	/*jQuery( "#dialog1" ).dialog({
		autoOpen: false,
		show: {
			effect: "fade",
			duration: 150
		},
		hide: {
			effect: "fade",
			duration: 150
		},
		position: {
			my: "center",
			at: "center"
		},
		// Add the 2 options below to use click outside feature
		clickOutside: true, // clicking outside the dialog will close it
		clickOutsideTrigger: "#opener1"  // Element (id or class) that triggers the dialog opening
	});
	jQuery('*').not('.ui-dialog').live('click', function(){
		alert('closed!');
		jQuery('.ui-dialog').dialog('close');
	});

	jQuery(document).bind('click', function(e){
		e.preventDefault();
		e.stopPropagation();
		if (jQuery('.ui-dialog > *:not(.ui-dialog-content)').is(':visible')) {
			var ele = jQuery(e.target);
			if (!ele.hasClass("ui-dialog-content")) {
				//closeOverlay();
				jQuery('.ui-dialog').css('display','none');
			};
		};
	});*/

	// quick adjustment
	jQuery('.fc-event').live('click', function() {
		//console.log(jQuery('#description.CalendarContent').length);
		jQuery('#description.CalendarContent').attr('colspan', 4);
	});

	// mobile device adjustments for datepicker (Full Calendar ONLY)
	var isMobile = (!window.matchMedia) ? window.matchMedia = {} : window.matchMedia('only screen and (max-width: 650px)');

	if (isMobile.matches) {
		jQuery('#miniCalendar').each(function() {
			jQuery(this).get(0).type='date';
			jQuery(this).datepicker( "destroy" );
			jQuery(this).removeClass("hasDatepicker");
			//jQuery('input#miniCalendar[type="date"]').datepicker( "destroy" );
			//jQuery('input#miniCalendar[type="date"]').removeClass("hasDatepicker");
		});
	}
};
/*jQuery(function(){ fullCalendarAdjustments(); });*/

// init sitemap
function initSiteMap() {

	//--Site Map Position
	var sitemap_link = jQuery('<li><a href="#" class="sitemap-toggle">Site Map</a></li>');
	jQuery('.footerNav .footerNavCol:last-of-type').find('ul li:last-of-type').after(sitemap_link);
	//--Site Map Click Event
	//jQuery('*').click(function(e) {
	jQuery('*').live('click', function(e) {
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
	/*jQuery(".sitemap-toggle").live('click',function(e) {
		e.preventDefault();
		if (jQuery('.sitemap-float').is(':visible')) {
			jQuery(".sitemap-float").fadeOut(500);
		} else {
			jQuery(".sitemap-float").fadeIn(500);
		}
	});
	jQuery('.sitemap-content li').each(function() {
		jQuery(this).find( "a:contains('Bali'), a:contains('Jakarta')" ).closest('li').addClass( 'sitemap-label' );
	});*/
};

// Submit functions
function submitEmailForm(input, value) {

	var email = input.val();
	if (email == value || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
		alert("Please enter a valid email address.");
		//form.find('.emailSignUp').focus();
		input.css( "border", "1px solid red" ).focus();
		return false;
	}
	document.location.href = ('/email-signup/?em=' + email + '#main-content-area');
};
function submitSearchForm(input, value) {

	var search = input.val();
	if (search == value) {
		alert("Please enter a search value.");
		input.css( "border", "1px solid red" ).focus();
		return false;
	}
	document.location.href = ('/search');
};
// init email form events
function initEmailFormEvents() {

	var emailForm = jQuery('.emailForm'),
		//emailInput = emailForm.children('.emailInput'),
		emailInput = emailForm.children('[type="text"]'),
		emailSubmit = emailForm.children('[type="submit"]'),
		defaultValue = emailForm.children('[type="text"]').val();
	/*
	// Clear text in field when focused
	emailForm.find('.emailSignUp').focus(function() {
		if (jQuery(this).val() === defaultValue) {
			jQuery(this).val('');
		}
	});
	emailForm.find('.emailSignUp').blur(function() {
		if (jQuery(this).val() === '') {
			jQuery(this).val(defaultValue);
		}
	});
	// Email Form Submit
	emailForm.find('.emailSignUp').focus(function() {
		jQuery(document.body).delegate('input:text', 'keypress', function(e) {
			if (e.which === 13) {
				e.preventDefault();
				submitEmailForm(emailForm, defaultValue);
			}
		});
	});
	*/
	// Clear text in field when focused
	emailForm.find('[type="text"]').on('focus blur', function(e){
		if (e.type === 'focus'){
			//alert(e.type);
			if (jQuery(this).val() == defaultValue) {
				jQuery(this).val('');
			}
			jQuery(document.body).delegate('input:text', 'keypress', function(e) {
				if (e.which === 13) {
					e.preventDefault();
					emailInput = jQuery(this);
					submitEmailForm(emailInput, defaultValue);
					//submitEmailForm();
				}
			});
		} else if (e.type === 'blur'){
			//alert(e.type);
			if (jQuery(this).val() === '') {
				jQuery(this).val(defaultValue);
			}
		}
	});
	emailSubmit.click(function(e) {
		e.preventDefault();
		emailInput = jQuery(this).prev();
		submitEmailForm(emailInput, defaultValue);
	});
	// Form On Focus //
	/*var el = jQuery('input[type=text], textarea');
	el.focus(function(e) {
		if (e.target.value === e.target.defaultValue)
			e.target.value = '';
	});
	el.blur(function(e) {
		if (e.target.value === '')
			e.target.value = e.target.defaultValue;
	});*/
};
// init search form events
function initSearchFormEvents() {

	var searchForm = jQuery('.searchForm'),
		searchInput = searchForm.children('[type="text"]'),
		searchSubmit = searchForm.children('[type="submit"]'),
		defaultValue = searchForm.children('[type="text"]').val();
	// Clear text in field when focused
	searchForm.find('[type="text"]').on('focus blur', function(e){
		if (e.type === 'focus'){
			//alert(e.type);
			if (jQuery(this).val() == defaultValue) {
				jQuery(this).val('');
			}
			jQuery(document.body).delegate('input:text', 'keypress', function(e) {
				if (e.which === 13) {
					e.preventDefault();
					searchInput = jQuery(this);
					submitSearchForm(searchInput, defaultValue);
				}
			});
		} else if (e.type === 'blur'){
			//alert(e.type);
			if (jQuery(this).val() === '') {
				jQuery(this).val(defaultValue);
			}
		}
	});
	searchSubmit.click(function(e) {
		e.preventDefault();
		searchInput = jQuery(this).prev();
		submitSearchForm(searchInput, defaultValue);
	});
};

// init print link events
function initPrintEvents() {

	// apply click to print icons
	jQuery('.print').click(function() {
		if(jQuery(this).closest('.printable').length) {
			var id = getRandomInt(1, 999);
			jQuery(this).closest('.printable').attr('id', 'printable-' + id);
			jQuery(this).attr('rel', 'printable-' + id);
		}
		jQuery('#printable-' + id).print();
		return false;
	});
};

// mega Menu Adjustment
// http://www.weblinc.com/labs/split-one-list-into-equal-sized-columns-with-jquery-columnlist/
// https://github.com/weblinc/jquery-columnlist
function megaMenuGeneration() {

	//$('.wl-primary-nav > ul > li > ul').each(function () {
	jQuery('#mainNav > ul > li > ul').each(function () {
		// cache the list we are currently working with
		var $this = jQuery(this),
			// count the number of LIs in the current list
			count = $this.children().length,
			// determine how many columns to use
			// the design calls for 7 items per column and a max of 3 columns
			//cols = Math.ceil(count / 7 > 3 ? 3 : count / 7);
			cols = Math.ceil(count / 5 > 3 ? 3 : count / 5);

		// call the columnlist method to split the list into columns
		$this.columnlist({
			size: cols,
			'class' : 'column-list',
			incrementClass : 'column-list-'
		});

		// add width
		// encodeURIComponent($this.closest('li').attr('data-teaser-image'))
		//$this.width($this.find('.column-list').width()*cols).css('background-image': 'url(' +  + ')');
		var parent_width = parseInt($this.find('.column-list').css('max-width'))*cols;

		// add teaser image
		//var teaser_image = encodeURIComponent($this.closest('li').attr('data-teaser-image'));
		var teaser_image = $this.closest('li').attr('data-teaser-image');
		$this.width(parent_width).css('background-image', 'url(' + teaser_image + ')');

		// add teaser link
		var teaser_href = $this.closest('li').find('> a').attr('href');
		var teaser_text = $this.closest('li').find('> a').text();
		$this.prepend('<li class="teaser-image-link"><a href="' + teaser_href + '"><span class="hide">Go to ' + teaser_text + '</span></a></li>');
	});
	/*jQuery('#mainNav ul ul').each(function(index) {
	});
	win.resize(function(){
		// http://jsfiddle.net/G7qfq/5/
	}).resize();*/
};

// Show more content on toggle
function toggleDescriptionText() {

	var default_height = parseInt(jQuery('.item-description.has-toggle').css('max-height')),//112,//150,//400;
		item_description = jQuery('.js-item-description'),
		item_description_toggle = jQuery('.js-item-description-toggle');

	//console.log(default_height);
	//console.log(item_description.height());

	if(item_description.height() < default_height) {
		item_description.removeClass('has-toggle');
		item_description_toggle.addClass('hide').removeClass('is-hidden');
	} else {
		item_description.addClass('has-toggle');
		item_description_toggle.removeClass('hide').addClass('is-hidden');

		/*var wordArray = item_description.get(0).innerHTML.split(' ');
		while(item_description.get(0).scrollHeight > item_description.get(0).offsetHeight) {
			wordArray.pop();
			item_description.get(0).innerHTML = wordArray.join(' ') + '...';
		}*/
	}

	item_description_toggle.on('click', function(e) {
		e.preventDefault();
		if(item_description.is('.has-toggle')){
			jQuery('html, body').stop(true).animate({
				scrollTop: jQuery('.siteWidth').offset().top - jQuery('header').height()
			}, 750);
		}
		item_description.toggleClass('has-toggle');
		item_description.toggleClass('is-expanded');
		item_description_toggle.toggleClass('is-expanded');
	});
};
//}.call(this);

/*
// loadGalleryDeepLink
var loadGalleryDeepLink = function() {

	var prefix = "#gallery-";
	var h = location.hash;

	if (document.g_magnific_hash_loaded === undefined && h.indexOf(prefix) === 0) {
		h = h.substr(prefix.length);
		var $img = jQuery('*[data-image_id="' + h + '"]');
		if ($img.length) {
			document.g_magnific_hash_loaded = true;
			//$img.get(0).click();
			$img.parents().find('.simple-gallery').magnificPopup("open", $img.index());
		}
	}
};
*/
// Video, Virtual Tours, Iframe, or etc. - Magnific Popup
function initMagnificPopup(elem, gallery) {

	// Broadmoor branding DIV
	//var bookNowURL = 'https://resv.broadmoor.com/cgi-bin/lansaweb?procfun+rn+resnet+RES+funcparms+UP%28A2560%29:;;;;;';
	var broadmoorLogoImg = '/getmedia/6e7d4918-cbbc-4ebe-90f9-416a9c1ee4a8/main-logo.png',// /getmedia/6e7d4918-cbbc-4ebe-90f9-416a9c1ee4a8/main-logo.gif';
	var broadmoor_branding = '<div class="mfp-broadmoor"><img src="' + broadmoorLogoImg + '" /><a class="button" target="_blank" href="' + bookNowURL + '">Book Now</a></div>';

	//jQuery('.video-popup').magnificPopup({
	jQuery(elem).magnificPopup({
		//disableOn: 700, // DO NOT SHOW ON MOBILE 700px width
		type: 'iframe',
		mainClass: 'fade-in-scale videoHeaderArea_Player', // 'mfp-fade videoHeaderArea_Player',
		removalDelay: 160,
		preloader: true,
		fixedContentPos: true,
		//overflowY: 'hidden',
		//modal: true,
		iframe: {
			markup: '<div class="mfp-iframe-scaler">'+
					'<div title="Close (Esc)" class="mfp-close"></div>'+
					'<div class="mfp-top-bar">'+
						'<div class="mfp-title"></div>'+
					'</div>' +
					'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
					broadmoor_branding +
				'</div>',
			patterns: {
				youtube: {
					index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

					id: 'v=', // String that splits URL in a two parts, second part should be %id%
					// Or null - full URL will be returned
					// Or a function that should return %id%, for example:
					// id: function(url) { return 'parsed id'; }

					//src: '//www.youtube.com/embed/%id%?autoplay=1',
					src: '//www.youtube-nocookie.com/embed/%id%?wmode=opaque&vq=hd720&autoplay=1&rel=0&feature=oembed&autoplay=1&autohide=1&modestbranding=1&showinfo=0&theme=dark&enablejsapi=1&color=white&iv_load_policy=3&cc_load_policy=0&format=xml', // URL that will be set as a source for iframe.
				},
				vimeo: {
					index: 'vimeo.com/',
					//id: '/',
					id: function(src){
						if (src.indexOf('external') > -1) {
							return 'external/' + src.substr(src.lastIndexOf('/') + 1, src.length);
						//} else if (src.indexOf('postinteractive') > -1) {
						//	return 'postinteractive/review/' + src.substr(src.lastIndexOf('/') + 1, src.length);
						} else {
							//return 'video/' + src.substr(src.lastIndexOf('/') + 1, src.length);
							return src.substr(src.lastIndexOf('/') + 1, src.length);
						}
					},
					src: '//player.vimeo.com/video/%id%?autoplay=1',
				},
				dailymotion: {
					index: 'dailymotion.com',
					id: function(url) {
						var m = url.match(/^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/);
						if (m !== null) {
							if(m[4] !== undefined) {
								return m[4];
							}
							return m[2];
						}
						return null;
					},
					src: 'http://www.dailymotion.com/embed/video/%id%'
				},
				gmaps: {
					index: '//maps.google.',
					src: '%id%&output=embed',
				}
				// you may add here more sources
			},
			srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
		},
		/*inline: {
			markup: '<div class="mfp-iframe-scaler">' +
					'<div class="mfp-top-bar">' +
						'<div class="mfp-title"></div>' +
					'</div>' +
					broadmoor_branding +
				'</div>',
		},*/
		callbacks: {
			markupParse: function(template, values, item) {
				//console.log('Parsing:', template);
				//console.log('Parsing:', template, values, item);
				values.title = item.el.attr('title');

				if(item.type == 'inline') {
					template.addClass('mfp-iframe-holder');
					//console.log(item);
					//console.log('is video...');
				} else {
					//console.log('normal iframe...');
				}
			},
			elementParse: function(item) {
				// Function will fire for each target element
				// "item.el" is a target DOM element (if present)
				// "item.src" is a source that you may modify
					//console.log(item.el.attr('href').split('#'));
				//url.split('#')[1]

				jQuery('.mfp-container.mfp-inline-holder').addClass('mfp-iframe-holder');
				//jQuery('.mfp-container.mfp-inline-holder').addClass('mfp-iframe-holder').append(jQuery('<div class="mfp-iframe-scaler">' + '<div class="mfp-top-bar">' + '<div class="mfp-title">' + item.el.attr('title') + '</div>' + '</div>' + broadmoor_branding + '</div>'));

				//if(item.src === undefined || item.src === null) {
				/*if(item.el.attr('href').indexOf("#") != -1) {
					var item_src_inline = item.el.attr('data-mfp-src');
					var item_src = null;
				} else {
					var item_src = (item.src.match(/[^\\\/]\.([^.\\\/]+)$/) || [null]).pop();
					var item_src_inline = null;
				}*/
				var item_src = (item.src.match(/[^\\\/]\.([^.\\\/]+)$/) || [null]).pop();
				var item_hash = item.el.attr('href').indexOf("#");
				var item_img = (item.el.find('img').attr('src') == 'undefined') ? item.el.find('img').attr('src') : item.el.parent().find('img').attr('src');
				var item_href_mobile_webm = item.el.attr('href-mobile-webm');
				var item_href_mobile_ogg = item.el.attr('href-mobile-ogg');
				var item_id = item.el.attr('title').replace(" ","-");

				//(navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1)

					//console.log('is_safari: '+is_safari);
					//console.log('is_chrome: '+is_chrome);
				//console.log(navigator.userAgent.indexOf('Safari'));
				//console.log(navigator.userAgent.match(/Safari/i));

				if(item_src == 'mp4' || item_src == 'mov') {
					// ref: http://codepen.io/dimsemenov/pens/popular/
					item.type = 'inline'; // video
					item.src = //'<div class="mfp-iframe-scaler">' +
						//'<div class="mfp-top-bar">' +
						//	'<div class="mfp-title">' + item.el.attr('title') + '</div>' +
						//'</div>' +

						(
							( item_src == 'mp4' && (navigator.userAgent.match(/iPad/i) === null) && !is_safari ) ?
							(
							'<div class="mfp-iframe-scaler">' +
							'<div class="mfp-top-bar">' +
							'<div class="mfp-title">' + item.el.attr('title') + '</div>' +
							'</div>' +
							//'<div id="' + item_id + '_container"></div>' +
							//'<video id="' + item_id + '" controls="true" autoplay preload="auto" data-mejsoptions=\'{"alwaysShowControls": true}\'>' +
							//'<video id="' + item_id + '" controls="controls" preload="none" poster="' + item_img + '" autoplay class="mejs-player" style="width:100%;height:100%;" width="100%" height="100%" src="' + item.src + '">' +
							'<video id="' + item_id + '" poster="' + item_img + '" preload autoplay controls style="width:100%;height:100%;" width="100%" height="100%">' +

								'<source src="' + item.src + '" type=\'video/mp4; codecs="avc1.42E01E, mp4a.40.2"\' />' +
								(
									(item_href_mobile_webm != '') ?
									'<source src="' + item_href_mobile_webm + '" type=\'video/webm; codecs="vp8, vorbis"\' />' :
									''
								) +
								(
									(item_href_mobile_ogg != '') ?
									'<source src="' + item_href_mobile_ogg + '" type=\'video/ogg; codecs="theora, vorbis"\' />' :
									''
								) +

								'<object width="320" height="240" type="application/x-shockwave-flash" data="https://cdnjs.cloudflare.com/ajax/libs/flowplayer/5.4.6/flowplayer.swf">' +
									'<param name="movie" value="https://cdnjs.cloudflare.com/ajax/libs/flowplayer/5.4.6/flowplayer.swf" />' +
									'<param name="allowfullscreen" value="true" />' +

									'<param name="flashvars" value="config={\'clip\': { \'url\': \'' + item.src + '\', \'autoPlay\': false, \'autoBuffering\': true } }" />' +

									'<img src="' + item_img + '" width="320" height="240" title="No video playback capabilities" />' +
									'<p>Download video as <a href="' + item.src + '">MP4</a>, <a href="' + item_href_mobile_webm + '">WebM</a>, or <a href="' + item_href_mobile_ogg + '">Ogg</a>.</p>' +
								'</object>' +

							'</video>' +
							broadmoor_branding +
							'</div>'
							) :
							""
						) +
						(
							//(item_src == 'mp4' && (navigator.userAgent.match(/iPad/i) !== null) && navigator.userAgent.toLowerCase().search("android") > -1) ?
							//(item_src == 'mp4' && navigator.userAgent.toLowerCase().search("android") > -1) ?
							( item_src == 'mp4' && ( jQuery.magnificPopup.instance.isIOS ) ) ?
							(
							'<div class="mfp-iframe-scaler">' +
							'<div class="mfp-top-bar">' +
							'<div class="mfp-title">' + item.el.attr('title') + '</div>' +
							'</div>' +
							//'<video id="' + item_id + '" controls="controls" preload="none" poster="' + item_img + '" autoplay class="mejs-player" style="width:100%;height:100%;" width="100%" height="100%" src="' + item.src + '">' +
							'<div class="flowplayer" data-ratio="0.5625" data-volume="0.5">' +
							//'<a href="http://demos.flowplayer.org/basics/ios-web-app.html">Watch video!</a>' +
							//'<video preload="none" poster="' + item_img + '" id="' + item_id + '" loop controls="true" style="width:100%;height:100%;" width="100%" height="100%" src="' + item.src + '" type="video/mp4">' +
							'<video controls autoplay>' +

								//'<source type="application/x-mpegurl" src="//stream.flowplayer.org/bauhaus.m3u8">' +

								'<source src="' + item.src + '" type=\'video/mp4; codecs="avc1.42E01E, mp4a.40.2"\' />' +
								(
									(item_href_mobile_webm != '') ?
									'<source src="' + item_href_mobile_webm + '" type=\'video/webm; codecs="vp8, vorbis"\' />' :
									''
								) +
								(
									(item_href_mobile_ogg != '') ?
									'<source src="' + item_href_mobile_ogg + '" type=\'video/ogg; codecs="theora, vorbis"\' />' :
									''
								) +
							'</video>' +
							'</div>' +
							broadmoor_branding +
							'</div>'

							//jQuery.magnificPopup.instance.st.el.src
							//item.el.html()
							) :
							""
						) +
						(
							( item_src == 'mov' || is_safari ) ?
							(
							'<div class="mfp-iframe-scaler">' +
							'<div class="mfp-top-bar">' +
							'<div class="mfp-title">' + item.el.attr('title') + '</div>' +
							'</div>' +
							'<object codebase="http://www.apple.com/qtactivex/qtplugin.cab" classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B">' +
							'<param name="src" value="' + item.src + '">' +
							'<param name="autoplay" value="true" />' +
							'<embed src="' + item.src + '" autoplay="true"></embed>' +
							'</object>' +/**/
							//'<video controls autoplay src="' + item_href_mobile_ogg + '">' +
							//'</video>' +
							broadmoor_branding +
							'</div>'
							) :
							""
						);// +

						//broadmoor_branding +
					//'</div>';

					//item.markup = '<div class="white-popup"><div class="mfp-close"></div>'+
					//'<a class="mfp-userWebsite">'+
					//'<div class="mfp-userAvatarUrl"></div>'+
					//'<h2 class="mfp-username"></h2>'+
					//'</a>'+
					//'<div class="mfp-userLocation"></div>'+
					//'</div>';

					// detect if IOS
					//console.log( (navigator.userAgent.match(/iPad/i) !== null) ? "iOS" : "not iOS");
					//console.log(jQuery.magnificPopup.instance.isIOS);

				//} else if(item_src_inline != "") {
				} else if(item_hash != -1) {
					item.type = 'inline'; // video
					item.src ='<div class="">' +
						'<div class="mfp-top-bar">' +
							'<div class="mfp-title">' + item.el.attr('title') + '</div>' +
						'</div>' +

						'<div class="' + item.el.closest('div').next('.timeline-full-content').attr('class') + '">' +
							item.el.closest('div').next('.timeline-full-content').html() +
						'</div>' +
						//broadmoor_branding +
					'</div>';
				} else {
					item.type = 'iframe';
				}
			},
			open: function() {
				// Will fire when this exact popup is opened
				// this - is Magnific Popup object
				jQuery('html').addClass('magnific-popup-opened');
			},
			close: function() {
				// Will fire when popup is closed
				jQuery('html').removeClass('magnific-popup-opened');
			}/*,
			close: function () {
				location.hash = "";
				//parent.location.hash = '';
			},
			change: function () {
				console.log('Content changed');
				location.hash = "gallery-" + this.currItem.el.data("image_id"); // #gallery-18305
			}
			beforeOpen: function() {
				// options: fade-in-scale, slide-in-top, fade-h-3d, rotate-carouse-left
				this.st.mainClass = 'fade-in-scale mfp-no-margins mfp-misc-popup';
			},*/
		},
		gallery: {
			enabled: gallery,
			//preload: [0,1], // Will preload 0 - before current, and 1 after the current image
			//counter: '<span class="mfp-counter">%curr% of %total%</span>'
		},
	});
	//loadGalleryDeepLink();
};

// youtube video on content
// e.g. <div class="youtube" data-ytsrc="//youtube.com/watch?v=C0DPdy98e4c" data-thumb=""></div>
/*function youtubeVideoEmbed() {
	jQuery.getJSON("http://gdata.youtube.com/feeds/api/users/RIDEChannel/uploads?max-results=1&v=2.1&alt=jsonc&callback=?", function (myvid) {
		var vid = $("#vid");
		$.each(myvid.data.items, function (i, item) {
			vid.append("<img width='300' height='250' src='" + item.thumbnail.hqDefault + "'>");
			$(document).on("click", "#vid img", function (event) {
				vid.append("<iframe width='300' height='250' src='http://www.youtube.com/embed/" + item.id + "?autoplay=1' frameborder='0'></iframe>");
				$(this).hide();
			});
		});
	});
};*/

/*var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('youtube', {
		height: '390',
		width: '640',
		videoId: 'M7lc1UVf-VE',
		events: {
			'onReady': onPlayerReady,
		}
	});
}
function onPlayerReady(event) {
	jQuery('#play_vid').click(function() {
		event.target.playVideo();
	});
}
onPlayerReady();
jQuery(function() {
	jQuery('#player').hide();
	jQuery('#play_vid').click(function() {
	    jQuery('#player').show();
	    jQuery('#play_vid').hide();
	});
});*/

// By Chris Coyier & tweaked by Mathias Bynens
/*jQuery(function() {

	// .videoWrapper

	// Find all YouTube videos
	var $allVideos = jQuery("iframe[src^='http://www.youtube.com']"),
		// The element that is fluid width
		$fluidEl = jQuery("body");

	// Figure out and save aspect ratio for each video
	$allVideos.each(function() {
		jQuery(this)
			.data('aspectRatio', this.height / this.width)
			// and remove the hard coded width/height
			.removeAttr('height')
			.removeAttr('width');
	});

	// When the window is resized
	// (You'll probably want to debounce this)
	jQuery(window).resize(function() {
		var newWidth = $fluidEl.width();
		// Resize all videos according to their own aspect ratio
		$allVideos.each(function() {
			var $el = $(this);
			$el
				.width(newWidth)
				.height(newWidth * $el.data('aspectRatio'));
		});
	// Kick off one resize to fix all videos on page load
	}).resize();
});*/

/*
Thanks to CSS Tricks for pointing out this bit of jQuery
http://css-tricks.com/equal-height-blocks-in-rows/
http://codepen.io/micahgodbolt/pen/FgqLc
It's been modified into a function called at page load
and then each time the page is resized. One large modification
was to remove the set height before each new calculation.
*/
function setConformingHeight(el, newHeight) {

	//console.log('actual: '+el.data("originalHeight"));
	// set the height to something new, but remember the original height in case things change
	el.data("originalHeight", (el.data("originalHeight") == undefined) ? (el.height()) : (el.data("originalHeight")));
	el.height(newHeight);
};
function getOriginalHeight(el) {

	// if the height has changed, send the originalHeight
	return (el.data("originalHeight") == undefined) ? (el.height()) : (el.data("originalHeight"));
};
function equalHeight2(container) {

	var currentTallest = 0,
		currentRowStart = 0,
		//rowDivs = new Array(),
		rowDivs = [],
		$el,
		topPosition = 0;
	// find the tallest DIV in the row, and set the heights of all of the DIVs to match it.
	jQuery(container).each(function(ind) {
		$el = jQuery(this);
		jQuery($el).height('auto');
		//topPostion = ($el.position().top == 0) ? $el.parent().position().top : $el.position().top;
		topPostion = ($el.offset().top === 0) ? $el.parent().offset().top : $el.offset().top;

			//console.log('------------------------');
			//console.log('#' + ind);
			//console.log('rowDivs: ' + rowDivs.length);
			//console.log('currentRowStart: ' + currentRowStart);
		//console.log('OLE topPostion: ' + $el.offset().top);
			//console.log('#########################');
			//console.log('topPostion: ' + topPostion);
			//console.log('Parent topPostion: ' + $el.parent().offset().top);
			//console.log('Element topPostion: ' + $el.offset().top);
		//console.log('#########################');
		if (currentRowStart !== topPostion) {
				//console.log('###### Set NEW height #######');
			// we just came to a new row.  Set all the heights on the completed row
			for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
				//console.log('currentDiv: ' + currentDiv);
				setConformingHeight(rowDivs[currentDiv], currentTallest);
				//rowDivs[currentDiv].height(currentTallest);
			}
			// set the variables for the new row
			rowDivs.length = 0; // empty the array
			currentRowStart = topPostion;
			currentTallest = $el.height();
			rowDivs.push($el);

				//console.log('currentRowStart !== topPostion: ' + currentTallest);
		} else {
			// another div on the current row.  Add it to the list and check if it's taller
			rowDivs.push($el);
			currentTallest = (currentTallest < getOriginalHeight($el)) ? (getOriginalHeight($el)) : (currentTallest);
			//currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);

				//console.log('currentRowStart === topPostion: ' + getOriginalHeight($el));
				//console.log('currentRowStart === topPostion: ' + currentTallest);
		}
		//console.log('*************************');
		for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
			//console.log('currentDiv: '+currentDiv);
			setConformingHeight(rowDivs[currentDiv], currentTallest);
			//rowDivs[currentDiv].height(currentTallest);

				//console.log(currentTallest);
			//alert(currentTallest);
		}
		//console.log('*************************');
	});
};

// http://codepen.io/micahgodbolt/pen/FgqLc
// https://github.com/liabru/jquery-match-height
function equalHeight(container) {

	var currentTallest = 0,
		currentRowStart = 0,
		rowDivs = new Array(),
		$el,
		topPosition = 0;

	jQuery(container).each(function() {
		$el = jQuery(this);
		jQuery($el).height('auto')
		topPostion = $el.position().top;

		if (currentRowStart != topPostion) {
			for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
				rowDivs[currentDiv].height(currentTallest);
			}
			rowDivs.length = 0; // empty the array
			currentRowStart = topPostion;
			currentTallest = $el.height();
			rowDivs.push($el);
		} else {
			rowDivs.push($el);
			currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
		}
		for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
			rowDivs[currentDiv].height(currentTallest);
		}
	});
};

// Get Viewport
function getViewport() {

	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
	return x;
};

// Get CurrentScroll
function getCurrentScroll() {

	return window.pageYOffset || document.documentElement.scrollTop;
};

// generate random number
// ref: https://gist.github.com/kerimdzhanov/7529623
/**
 * Get a random integer between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {int} a random integer
 */
function getRandomInt(min, max) {

	return Math.floor(Math.random() * (max - min + 1) + min);
};

// Detect support for transition with JavaScript
// ref: http://stackoverflow.com/questions/10888211/detect-support-for-transition-with-javascript
function detectCSSFeature(featurename) {

	var feature = false,
	domPrefixes = 'Webkit Moz ms O'.split(' '),
	elm = document.createElement('div'),
	featurenameCapital = null;

	featurename = featurename.toLowerCase();

	if( elm.style[featurename] !== undefined ) { feature = true; }

	if( feature === false ) {
	    featurenameCapital = featurename.charAt(0).toUpperCase() + featurename.substr(1);
	    for( var i = 0; i < domPrefixes.length; i++ ) {
	        if( elm.style[domPrefixes[i] + featurenameCapital ] !== undefined ) {
	          feature = true;
	          break;
	        }
	    }
	}
	return feature;
};

// check IE
// ref: http://stackoverflow.com/questions/31757852/how-can-i-detect-internet-explorer-ie-and-microsoft-edge-using-javascript
function isIEorEDGE() {

	return navigator.appName == 'Microsoft Internet Explorer' || (navigator.appName == "Netscape" && navigator.appVersion.indexOf('Trident') > -1);
};

// apply adjustments to elements
function minorAdjustmentsToElements() {

	//--Background blend fallback
	//if(typeof window.getComputedStyle(document.body).backgroundBlendMode == 'undefined') {
	if( !detectCSSFeature('background-blend-mode') ) {
		jQuery('html').addClass('no-background-blend-mode');
	};
	//--Animation fallback
	//var hasCssTransitionSupport = detectCSSFeature("transition");
	//console.log(hasCssTransitionSupport);
	//var hasCssTransitionSupport = detectCSSFeature("animation");
	//console.log(hasCssTransitionSupport);
	if ( !detectCSSFeature('animation') ) {
		//document.documentElement.className += ' textShadow';
		jQuery('html').addClass('no-animation');
	}

	// add class to body
	var url = location.href;
	var className = url.match(/\/[^\/]+(_|\.)[^\/]+$/);
	jQuery('body').addClass(className);

	// hide content if empty
	// https://stackoverflow.com/questions/14535733/how-to-check-if-div-element-is-empty
	jQuery('.mainContent, .contentBorder').each(function(){
		$this = jQuery(this);

		//if($this.is(':empty')) { $this.hide(); }

		//console.log(!jQuery.trim( $this.html() ));
		//console.log('is empty:', $this.text());
		//console.log('is empty:', $this.is(':empty'));
		if(!jQuery.trim($this.html())) { $this.hide(); }
	});

	// .videoArea DIV for Featured Items block instead of Special and Video blocks

	//console.log('jQuery(.specialsBox .swiper-container).length: ' + jQuery('.specialsBox .swiper-container').length);

	if(jQuery('.specialsBox .swiper-container').length == 0){
		// Video area height fallback for IE bugs
		var specials_box_height = 350,
			video_featured_area = jQuery('.videoArea, .featuredArea').addClass('do-height-adjustment'),
			//featured_area = jQuery('.featuredArea').addClass('do-height-adjustment'),
			featured_area_children = jQuery('.videoArea > *, .featuredArea > *').addClass('do-height-adjustment'),
			//featured_area_children = jQuery('.featuredArea > *').addClass('do-height-adjustment'),
			do_height_adjustment = jQuery('.do-height-adjustment');
		if(video_featured_area.find('> img').is('.b-lazy')) {
			bLazy.revalidate();
		}


		//if(jQuery('.featuredArea > img').height() < specials_box_height)


		jQuery('.featuredArea').each(function(){
			var window_width = getViewport(),
				fa_p = jQuery(this).closest('.fullWidth'),
				//s = hs.find('.slick > .slick-slider-img'),
				fa_l = fa_p.find('.featuredAreaLeft'),
				fa_r = fa_p.find('.featuredAreaRight'),
				fa_nh = ((fa_p.outerWidth()*specials_box_height)/getViewport());
				//fa_nh = ((fa_p.outerWidth()*specials_box_height)/getViewport()) + 'px';

			//console.log(fa_p.outerWidth());
			//console.log('vp: ' + getViewport(), ', height: ' + jQuery('.featuredArea > img').height(), ', fa_nh: ' + fa_nh);


			//if(getViewport() > 828){
			if(jQuery('.featuredArea > img').height() <= specials_box_height){
				//fa_l.height(s_nh);
				//fa_r.height(s_nh);
				do_height_adjustment.height(fa_nh);
			} else {
				//fa_l.height('auto');
				//fa_r.height('auto');
				do_height_adjustment.height(specials_box_height);
			};/**/
			jQuery(window).resize(function() {
				fa_nh = ((fa_p.outerWidth()*specials_box_height)/getViewport()) + 'px';
				//console.log(fa_p.outerWidth());
				//console.log('vp: ' + getViewport(), ', height: ' + jQuery('.featuredArea > img').height(), ', fa_nh: ' + fa_nh);

				//if(getViewport() > 828){
				if(jQuery('.featuredArea > img').height() <= specials_box_height){
					//fa_l.height(s_nh);
					//fa_r.height(s_nh);
					do_height_adjustment.height(fa_nh);
				} else {
					//fa_l.height('auto');
					//fa_r.height('auto');
					do_height_adjustment.height(specials_box_height);
				};/**/
			});

			//if(getViewport() > 828){
			/*if(jQuery('.featuredArea > img').height() <= specials_box_height){
				//fa_l.height(s_nh);
				//fa_r.height(s_nh);
				do_height_adjustment.height(fa_nh);
			} else {
				//fa_l.height('auto');
				//fa_r.height('auto');
				do_height_adjustment.height(specials_box_height);
			};*/
		});


		//do_height_adjustment.height(specials_box_height);
		//jQuery(window).resize(function() {
		//	do_height_adjustment.height(specials_box_height);
		//});
	}
};

// apply adjustments to elements on resize
function minorAdjustmentsToElementsOnResize() {

	// do some IE stuff, unfortunately, check for IE7
	if(isIEorEDGE()) {
		jQuery('html').addClass('ie');
		jQuery('.image-group').each(function(){
			var $this = jQuery(this),
				divs = $this.find('> div'),
				divs1 = $this.find('> div:first'),
				divs_count = divs.length,

				parent_width = $this.width(),
				border_width_left = divs1.css('borderLeftWidth'),
				border_width_right = divs1.css('borderRightWidth'),
				width_padding = parseInt(border_width_left) + parseInt(border_width_right),

				width = (parent_width / divs_count) - width_padding,
				width_percent = ( (width / parent_width) * 100 ) + '%';
			//console.log(divs_count);
			//console.log(parent_width);
			//console.log(width);
			//console.log(width_percent);
			//console.log(width_padding);
			// set width
			divs.css('width', width_percent);
			divs.css('float', 'left');
		});
	}
};

// function hashTagEvent() {};

/*
// custom event for ALL browsers
// In IE you have to use attachEvent rather than the standard addEventListener.
// ref: http://stackoverflow.com/questions/1695376/msie-and-addeventlistener-problem-in-javascript
function bindEvent(el, eventName, eventHandler) {
	// get start time
	console.time('bindEvent');

	if (el.addEventListener){
		el.addEventListener(eventName, eventHandler, false);
	} else if (el.attachEvent){
		el.attachEvent('on'+eventName, eventHandler);
	}

	console.timeEnd('bindEvent');
	// add up time to get load time
};
*/

/**
 * Cross Browser helper to addEventListener.
 *
 * @param {HTMLElement} obj The Element to attach event to.
 * @param {string} evt The event that will trigger the binded function.
 * @param {function(event)} fnc The function to bind to the element.
 * @return {boolean} true if it was successfuly binded.
 * ref: https://gist.github.com/eduardocereto/955642
 */
function customAddEventListener(obj, evt, fnc) {

	// W3C model
	if (obj.addEventListener) {
		obj.addEventListener(evt, fnc, false);
		return true;
	}
	// Microsoft model
	else if (obj.attachEvent) {
		return obj.attachEvent('on' + evt, fnc);
	}
	// Browser don't support W3C or MSFT model, go on with traditional
	else {
		evt = 'on'+evt;
		if(typeof obj[evt] === 'function'){
			// Object already has a function on traditional
			// Let's wrap it with our own function inside another function
			fnc = (function(f1,f2){
				return function(){
					f1.apply(this,arguments);
					f2.apply(this,arguments);
				}
			})(obj[evt], fnc);
		}
		obj[evt] = fnc;
		return true;
	}
	return false;
};

/*if(window.attachEvent) {
	window.attachEvent('onresize', function() {
		console.log('attachEvent - resize');
	});
} else if(window.addEventListener) {
	window.addEventListener('resize', function() {
		console.log('addEventListener - resize');
	}, true);
} else {
	// The browser does not support Javascript event binding
}*/

/***********************/
// fork from: https://gist.github.com/bennadel/9758974
// alt fork: https://gist.github.com/zrrtcs/25551a573d293b37be32
// for: gateasiax.com/tripstore
// Create a jquery plugin that prints the given element.
// TRY alt (if needed): http://jquery-print.ssdtutorials.com/
/***********************/
;(function() {
	jQuery.fn.print = function() {

		// NOTE: We are trimming the jQuery collection down to the
		// first element in the collection.

		//multiple element print
		var toPrint = jQuery.map(jQuery(this), function(x){return x.outerHTML}).join("");

		if (!this.size()){
			return;
		}

		// ASSERT: At this point, we know that the current jQuery
		// collection (as defined by THIS), contains only one
		// printable element.

		// Create a random name for the print frame.
		var strFrameName = ("printer-" + (new Date()).getTime());

		// Create an iFrame with the new name.
		var jFrame = jQuery( "<iframe name='" + strFrameName + "'>" );

		// Hide the frame (sort of) and attach to the body.
		jFrame
			.css( "width", "1px" )
			.css( "height", "1px" )
			.css( "position", "absolute" )
			.css( "left", "-9999px" )
			.appendTo( jQuery( "body:first" ) )
		;

		// Get a FRAMES reference to the new frame.
		var objFrame = window.frames[ strFrameName ];

		// Get a reference to the DOM in the new frame.
		var objDoc = objFrame.document;

		// Grab all the style tags and copy to the new
		// document so that we capture look and feel of
		// the current document.

		// Create a temp document DIV to hold the style tags.
		// This is the only way I could find to get the style
		// tags into IE.
		var jStyleDiv = jQuery( "<div>" ).append(
			jQuery( "style" ).clone()
			);

		// Write the HTML for the document. In this, we will
		// write out the HTML of the current element.
		objDoc.open();
		//objDoc.write( "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">" );
		objDoc.write( '<!DOCTYPE html>' );
		objDoc.write( "<html>" );
		objDoc.write( "<body>" );
		objDoc.write( "<head>" );
		objDoc.write( "<title>" );
		objDoc.write( document.title );
		objDoc.write( "</title>" );
		objDoc.write( jStyleDiv.html() );
		objDoc.write( "</head>" );
		objDoc.write( toPrint );
		objDoc.write( "</body>" );
		objDoc.write( "</html>" );
		objDoc.close();
		// Print the document.
		objFrame.focus();
		objFrame.print();

		// Have the frame remove itself in about a minute so that
		// we don't build up too many of these frames.
		setTimeout(
			function(){
				jFrame.remove();
			},
			(60 * 1000)
		);
	};
})();

/***********************/
// jquery.columnlist.js
// @weblinc, @jsantell (c) 2012
// https://github.com/weblinc/jquery-columnlist
/***********************/
;(function() {
	jQuery.fn.columnlist = function ( options ) {

		options = jQuery.extend( {}, jQuery.fn.columnlist.defaults, options );
		return this.each(function () {
			var
				$list     = jQuery( this ).addClass('mega-menu'),
				size      = options.size || $list.data( 'columnList' ) || 1,
				$children = $list.children( 'li' ),
				perColumn = Math.ceil( $children.length / size ),
				$column;
			for (var i = 0; i < size; i++) {
				$column = jQuery('<ul />').appendTo( returnColumn( i ) );
				for ( var j = 0; j < perColumn; j++ ) {
					if ( $children.length > i * perColumn + j ) {
						$column.append( $children[ i * perColumn + j ]);
					}
				}
				$list.append( $column.parent() );
			}
		});
		function returnColumn ( inc ) {
			return jQuery('<li class="' + options.incrementClass + inc + ' ' + options[ 'class' ] + '"></li>');
		}
	};
	jQuery.fn.columnlist.defaults = {
		'class'        : 'column-list',
		incrementClass : 'column-list-'
	};
})();

/**
 * Protect window.console method calls, e.g. console is not defined on IE
 * unless dev tools are open, and IE doesn't define console.debug
*/
(function() {
	if (!window.console) {
		window.console = {};
	}
	// union of Chrome, FF, IE, and Safari console methods
	var m = ["log", "info", "warn", "error", "debug", "trace", "dir", "group", "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd", "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"];
	// define undefined methods as noops to prevent errors
	for (var i = 0; i < m.length; i++) {
		if (!window.console[m[i]]) {
			window.console[m[i]] = function() {};
		}
	}
})();

/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/
;(function( $ ){

	'use strict';

	$.fn.fitVids = function( options ) {
		var settings = {
			customSelector: null,
			ignore: null
		};

		if(!document.getElementById('fit-vids-style')) {
			// appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
			var head = document.head || document.getElementsByTagName('head')[0];
			var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
			var div = document.createElement("div");
			div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
			head.appendChild(div.childNodes[1]);
		}

		if ( options ) {
			$.extend( settings, options );
		}

		return this.each(function(){
			var selectors = [
				'iframe[src*="player.vimeo.com"]',
				'iframe[src*="youtube.com"]',
				'iframe[src*="youtube-nocookie.com"]',
				'iframe[src*="kickstarter.com"][src*="video.html"]',
				'object',
				'embed'
			];

			if (settings.customSelector) {
				selectors.push(settings.customSelector);
			}

			var ignoreList = '.fitvidsignore';

			if(settings.ignore) {
				ignoreList = ignoreList + ', ' + settings.ignore;
			}

			var $allVideos = $(this).find(selectors.join(','));
			$allVideos = $allVideos.not('object object'); // SwfObj conflict patch
			$allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

			$allVideos.each(function(){
				var $this = $(this);
				if($this.parents(ignoreList).length > 0) {
					return; // Disable FitVids on this video.
				}
				if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
				if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width'))))
				{
					$this.attr('height', 9);
					$this.attr('width', 16);
				}
				var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
					width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
					aspectRatio = height / width;
				if(!$this.attr('name')){
					var videoName = 'fitvid' + $.fn.fitVids._count;
					$this.attr('name', videoName);
					$.fn.fitVids._count++;
				}
				$this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+'%');
				$this.removeAttr('height').removeAttr('width');
			});
		});
	};

	// Internal counter for unique video names.
	$.fn.fitVids._count = 0;

// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );


/***************/
/** BEGIN OF DOC.READY FUNCTION **/
/***************/
var onDomReady = customAddEventListener(document, 'DOMContentLoaded', function() {

	// show version
	console.log('jQuery Version: ' + jQuery.fn.jquery);

	//initOnDomReadys();
	navHoverActions();
	headerHeight();
	// Iframe Resizer - https://github.com/davidjbradshaw/iframe-resizer
	jQuery('.responsive-iframe-height > iframe').iFrameResize();
	initFooterColumnization();
	collapseVideoBoxInitPosition();
	collapseVideoBox();
	repositionNavDropdowns();
	minorAdjustmentsToElements();
	minorAdjustmentsToElementsOnResize();
	initEmailFormEvents();
	initSearchFormEvents();

	//initMagnificPopup();
	initMagnificPopup('.video-popup', false);
	initMagnificPopup('.video-gallery-popup', true);
	initMagnificPopup('.virtual-tour-popup', true);
	initMagnificPopup('.floor-plan-popup', true);
	initMagnificPopup('.cd-timeline-block a', true);
	jQuery('.mfp-title:empty').closest('.mfp-top-bar').hide();

	initSiteMap();
	initMobileMenu();
	megaMenuGeneration();
	// Sub Nav
	initSubNav();

	fullCalendarAdjustments();
	//initMeetingPlannerEvents();
	initSeaIslandCalloutEvents();

	// apply click to print icons
	initPrintEvents();

	// init FitVids
	//console.log(jQuery("iframe").closest('div:not(.videoWrapper)').find('iframe').length);
	jQuery('div:not(.videoWrapper)').find('> iframe').parent().fitVids();

	// hash click event
	/*jQuery('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
		&& location.hostname == this.hostname) {
			var target = jQuery(this.hash);
			var header_height = jQuery('header').outerHeight();
			target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				jQuery('html,body').animate({
					scrollTop: target.offset().top - header_height //offsets for fixed header
				}, 1000);
				return false;
			}
		}
	});*/
	// smooth scrolling onclick
	jQuery('a[href*=#]:not([href=#], #nav-toggle, #subnav-toggle, .mm-list a.mm-subopen, .mm-list a.mm-subclose, .mm-prev, .mm-next)').click(function() {

		//console.log(jQuery(this.hash));
		//console.log(location.pathname.replace(/^\//,''));
		//console.log(this.pathname.replace(/^\//,''));
		//console.log(location.hostname);
		//console.log(this.hostname);

		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

			var target = jQuery(this.hash);
			target = target.length ? target : jQuery('[id=' + this.hash.slice(1) +']');
			if (target.length) {
				//console.log(target.offset().top);
				//console.log(jQuery('header').outerHeight());
				//console.log(parseInt(jQuery('.mainAreaContentWrapper').css('padding-top')));
				//console.log(parseInt(jQuery('.contentArea').css('padding-top')));
				//console.log('#################');
				//console.log(target.offset().top - (jQuery('header').outerHeight() + parseInt(jQuery('.mainAreaContentWrapper').css('padding-top')) + parseInt(jQuery('.contentArea').css('padding-top'))));
				jQuery('html,body').animate({
					//scrollTop: target.offset().top - offset
					//scrollTop: target.offset().top
					scrollTop: target.offset().top - (jQuery('header').outerHeight() + parseInt(jQuery('.mainAreaContentWrapper').css('padding-top')) + parseInt(jQuery('.contentArea').css('padding-top')))
				}, 1000, "easeInOutCirc");
				return false;
			}

		}
	});

	//
	var email = getQuery('em') !== null ? getQuery('em') : "";
	jQuery("#preview-frame_emailSignUp").each(function() {
		jQuery(this).attr("src", jQuery(this).attr("src") + "?em=" + email);
	});
	//console.log("getQuery(em)");
	//console.log(email);

	/*if(getQuery("mock")=="true"){
		// add color legend on data-table for golf cards
		var data_titles = jQuery('.data-table').find('[data-title="Hole"]').css('position','relative');
		data_titles.each(function(){
			//$this.wrapInner('<span class="' + text + '" style="display:inline-block;background:' + text + ';"></span>');
			var $this = jQuery(this);
			var text = jQuery.trim($this.text().toString().toLowerCase());
			var color;

			// set color legend
			if(text === 'black')
				color = '#000';
			else if(text === 'blue')
				color = '#1f3447';
			else if(text === 'white')
				color = '#fff';
			else if(text === 'gold')
				color = '#c39a3b';
			else if(text === 'red')
				color = '#ae2f36';
			else
				color = 'n/a';

			console.log(text);
			console.log(color);
			if(color !== 'n/a')
				$this.prepend('<span class="' + text + '" style="display:inline-block;margin-right:20px;width:40px;height:15px;background:' + color + ';border:1px solid #ccc;"></span>');
			//'<div id="holesMap" style="display: block;"><img src="/interactive-scorecards/_images/east/Hole-18.png" border="0" alt="" id="holeImg"><img src="/interactive-scorecards/_images/golfBall.png" border="0" alt="" id="golfBall" width="6" height="6" style="left: 288px; top: 76px; display: none;"><img src="/interactive-scorecards/_images/golfFlag.png" border="0" alt="" id="golfFlag" width="20" height="18" style="left: 281px; top: 64px; display: inline;"><img src="/interactive-scorecards/_images/golfer.png" border="0" alt="" id="golfSwing" width="15" height="40" style="left: 121px; top: 160px; display: none;"></div>';
		});
		jQuery('.data-tables').each(function(){
			var $this = jQuery(this);
			$this.append('<div id="holesMap"><img src="" border="0" alt="" id="holeImg" /></div><div id="scorecardMap"><img src="" border="0" alt="" /></div>');
		});
	}*/

	// content form datepicker
	/*jQuery('#main-content-area').find('.datepicker').datepicker({
	//jQuery('.siteWidth .datepicker').datepicker({
	//jQuery('.datepicker').datepicker({
		minDate: ('+0D'),
		onSelect: function() {
			jQuery(".hasDatepicker").datepicker("hide");
		}
	});*/
});

/***************/
/** BEGIN OF WINDOW.LOAD FUNCTION **/
/***************/
var onLoad = customAddEventListener(window, 'load', function() {

	//initOnLoadsAndOnResizes();
	equalHeight('#contentBoxes:not(.threePerColumn) > .contentBox');
	equalHeight('.simple-gallery.video > .video-gallery-item');
	toggleDescriptionText();
	initSwiperSliders();
	//navHoverActions();
	customLightBoxClickEvents();
	//initMobileMenu();

	// hash onload event
	//Executed on page load with URL containing an anchor tag.
	if(jQuery(location.href.split("#")[1])) {
		var target = jQuery('#'+location.href.split("#")[1]);
		var header_height = jQuery('header').outerHeight();
		if (target.length) {
			jQuery('html,body').animate({
				scrollTop: target.offset().top - header_height //offset height of header here too.
			}, 1000);
			return false;
		}
	}

	// add space within empty links (mmenu)
	jQuery('.mm-panel').find('a[href]').each(function(){
		var $this = jQuery(this);
		if($this.text() == "" && $this.children().length == 0) {
			//console.log($this.text());
			$this.html('<span class="hide">Explore ' + $this.next().text() + ' Section</span>');
		}
	});
});

/***************/
/** BEGIN OF WINDOW.SCROLL FUNCTION **/
/***************/
var onScroll = customAddEventListener(window, 'scroll', function() {

	//initOnScrolls();
	collapseVideoBox();
});
//window.onscroll = function() { };

/***************/
/** BEGIN OF WINDOW.LOAD AND WINDOW.RESIZE FUNCTION **/
/***************/
var resizeTimer;
var onResize = customAddEventListener(window, 'resize', function() {

	// add header height margin to wrapper
	headerHeight();
	// reset blocks height
	repositionNavDropdowns();
	// apply minor adjustment to elements on resize
	minorAdjustmentsToElementsOnResize();
	// apply .1 sec delay to re-adjust eqaulHeight functions
	/**
	 * it is best to avoid attaching to events that could
	 * potentially generate lots of triggering such as the
	 * window resize and body scroll, a better approach that
	 * flooding from those events is to use a timer and verify
	 * if the even has occurred, then execute the proper action
	 **/
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(function(){
		equalHeight('#contentBoxes:not(.threePerColumn) .contentBox');
		equalHeight('.simple-gallery.video > .video-gallery-item');
	}, 300);
});

//
jQuery(window).on('resize',function() {
	//console.log(parseInt(jQuery('.twoColImgWrapper.mock').closest('.twoColWrapper').width() / 2));
	if(jQuery('.twoColImgWrapper.mock').closest('.twoColWrapper').length){
		jQuery('.room-type-photos.wilderness-featured-slider').width(parseInt(jQuery('.twoColImgWrapper.mock').closest('.twoColWrapper').width() / 2) - 10);
	}
}).trigger('resize');


/*
https://www.google.com/webhp?q=sticky%20sidebar
http://webdesign.tutsplus.com/tutorials/sticky-positioning-with-nothing-but-css--cms-24042
http://codepen.io/tutsplus/full/pJRRKW/
https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/stickyfill.js
https://raw.githubusercontent.com/wilddeer/stickyfill/master/dist/stickyfill.js
https://www.google.com/webhp?q=stickyfill%20break%20without%20jquery
http://thenewcode.com/1052/position-sticky-scroll-to-top-then-fixed-in-pure-CSS
https://codepen.io/dudleystorey/pen/yNxPRy
https://github.com/wilddeer/stickyfill/issues/10
https://codepen.io/wilddeer/pen/GZVPMK
https://codepen.io/wilddeer/pen/GZVPMK
https://codepen.io/gwydionismyhero/pen/zGyyjq
https://codepen.io/conwaydev/pres/VevYvy

http://leafo.net/sticky-kit/
*/

/**
@license Sticky-kit v1.1.2 | WTFPL | Leaf Corcoran 2015 | http://leafo.net
 */

(function() {
	var $, win;
	$ = this.jQuery || window.jQuery;
	win = $(window);

	$.fn.stick_in_parent = function(opts) {
		var doc, elm, enable_bottoming, fn, i, inner_scrolling, len, manual_spacer, offset_top, parent_selector, recalc_every, sticky_class;
		if (opts == null) {
			opts = {};
		}
		sticky_class = opts.sticky_class, inner_scrolling = opts.inner_scrolling, recalc_every = opts.recalc_every, parent_selector = opts.parent, offset_top = opts.offset_top, manual_spacer = opts.spacer, enable_bottoming = opts.bottoming;
		if (offset_top == null) {
			offset_top = 0;
		}
		if (parent_selector == null) {
			parent_selector = void 0;
		}
		if (inner_scrolling == null) {
			inner_scrolling = true;
		}
		if (sticky_class == null) {
			sticky_class = "is_stuck";
		}
		doc = $(document);
		if (enable_bottoming == null) {
			enable_bottoming = true;
		}
		fn = function(elm, padding_bottom, parent_top, parent_height, top, height, el_float, detached) {
			var bottomed, detach, fixed, last_pos, last_scroll_height, offset, parent, recalc, recalc_and_tick, recalc_counter, spacer, tick;
			if (elm.data("sticky_kit")) {
				return;
			}
			elm.data("sticky_kit", true);
			last_scroll_height = doc.height();
			parent = elm.parent();
			if (parent_selector != null) {
				parent = parent.closest(parent_selector);
			}
			if (!parent.length) {
				throw "failed to find stick parent";
			}
			fixed = false;
			bottomed = false;
			spacer = manual_spacer != null ? manual_spacer && elm.closest(manual_spacer) : $("<div />");
			if (spacer) {
				spacer.css('position', elm.css('position'));
			}
			recalc = function() {
				var border_top, padding_top, restore;
				if (detached) {
					return;
				}
				last_scroll_height = doc.height();
				border_top = parseInt(parent.css("border-top-width"), 10);
				padding_top = parseInt(parent.css("padding-top"), 10);
				padding_bottom = parseInt(parent.css("padding-bottom"), 10);
				parent_top = parent.offset().top + border_top + padding_top;
				parent_height = parent.height();
				if (fixed) {
					fixed = false;
					bottomed = false;
					if (manual_spacer == null) {
						elm.insertAfter(spacer);
						spacer.detach();
					}
					elm.css({
						position: "",
						top: "",
						width: "",
						bottom: ""
					}).removeClass(sticky_class);
					restore = true;
				}
				top = elm.offset().top - (parseInt(elm.css("margin-top"), 10) || 0) - offset_top;
				height = elm.outerHeight(true);
				el_float = elm.css("float");
				if (spacer) {
					spacer.css({
						width: elm.outerWidth(true),
						height: height,
						display: elm.css("display"),
						"vertical-align": elm.css("vertical-align"),
						"float": el_float
					});
				}
				if (restore) {
					return tick();
				}
			};
			recalc();
			if (height === parent_height) {
				return;
			}
			last_pos = void 0;
			offset = offset_top;
			recalc_counter = recalc_every;
			tick = function() {
				var css, delta, recalced, scroll, will_bottom, win_height;
				if (detached) {
					return;
				}
				recalced = false;
				if (recalc_counter != null) {
					recalc_counter -= 1;
					if (recalc_counter <= 0) {
						recalc_counter = recalc_every;
						recalc();
						recalced = true;
					}
				}
				if (!recalced && doc.height() !== last_scroll_height) {
					recalc();
					recalced = true;
				}
				scroll = win.scrollTop();
				if (last_pos != null) {
					delta = scroll - last_pos;
				}
				last_pos = scroll;
				if (fixed) {
					if (enable_bottoming) {
						will_bottom = scroll + height + offset > parent_height + parent_top;
						if (bottomed && !will_bottom) {
							bottomed = false;
							elm.css({
								position: "fixed",
								bottom: "",
								top: offset
							}).trigger("sticky_kit:unbottom");
						}
					}
					if (scroll < top) {
						fixed = false;
						offset = offset_top;
						if (manual_spacer == null) {
							if (el_float === "left" || el_float === "right") {
								elm.insertAfter(spacer);
							}
							spacer.detach();
						}
						css = {
							position: "",
							width: "",
							top: ""
						};
						elm.css(css).removeClass(sticky_class).trigger("sticky_kit:unstick");
					}
					if (inner_scrolling) {
						win_height = win.height();
						if (height + offset_top > win_height) {
							if (!bottomed) {
								offset -= delta;
								offset = Math.max(win_height - height, offset);
								offset = Math.min(offset_top, offset);
								if (fixed) {
									elm.css({
										top: offset + "px"
									});
								}
							}
						}
					}
				} else {
					if (scroll > top) {
						fixed = true;
						css = {
							position: "fixed",
							top: offset
						};
						css.width = elm.css("box-sizing") === "border-box" ? elm.outerWidth() + "px" : elm.width() + "px";
						elm.css(css).addClass(sticky_class);
						if (manual_spacer == null) {
							elm.after(spacer);
							if (el_float === "left" || el_float === "right") {
								spacer.append(elm);
							}
						}
						elm.trigger("sticky_kit:stick");
					}
				}
				if (fixed && enable_bottoming) {
					if (will_bottom == null) {
						will_bottom = scroll + height + offset > parent_height + parent_top;
					}
					if (!bottomed && will_bottom) {
						bottomed = true;
						if (parent.css("position") === "static") {
							parent.css({
								position: "relative"
							});
						}
						return elm.css({
							position: "absolute",
							bottom: padding_bottom,
							top: "auto"
						}).trigger("sticky_kit:bottom");
					}
				}
			};
			recalc_and_tick = function() {
				recalc();
				return tick();
			};
			detach = function() {
				detached = true;
				win.off("touchmove", tick);
				win.off("scroll", tick);
				win.off("resize", recalc_and_tick);
				$(document.body).off("sticky_kit:recalc", recalc_and_tick);
				elm.off("sticky_kit:detach", detach);
				elm.removeData("sticky_kit");
				elm.css({
					position: "",
					bottom: "",
					top: "",
					width: ""
				});
				parent.position("position", "");
				if (fixed) {
					if (manual_spacer == null) {
						if (el_float === "left" || el_float === "right") {
							elm.insertAfter(spacer);
						}
						spacer.remove();
					}
					return elm.removeClass(sticky_class);
				}
			};
			win.on("touchmove", tick);
			win.on("scroll", tick);
			win.on("resize", recalc_and_tick);
			$(document.body).on("sticky_kit:recalc", recalc_and_tick);
			elm.on("sticky_kit:detach", detach);
			return setTimeout(tick, 0);
		};
		for (i = 0, len = this.length; i < len; i++) {
			elm = this[i];
			fn($(elm));
		}
		return this;
	};

}).call(this);

jQuery(function(){
	var header = jQuery('header');
	var parent = jQuery('.mainAreaContentWrapper').get(0);
	var sidebar = jQuery('#sidebar-area');
	sidebar.stick_in_parent({
		parent: parent,
		//offset_top: header.outerHeight() - parseInt(parent.css('padding-top')),
		offset_top: header.outerHeight() + 20,
		//bottoming: false,
	})
	.on("sticky_kit:bottom", function(e) {
		//console.log("has stuck!", e.target);
		jQuery(e.target).parent(':not([data-sticky_parent])').css('position','static');
	})
	.on("sticky_kit:unbottom", function(e) {
		//console.log("has stuck!", e.target);
		jQuery(e.target).parent(':not([data-sticky_parent])').css('position','relative');
	});
	// apply adjustment
	jQuery(window).on("resize", (function(_this) {
		//console.log(getViewport());
		if(getViewport() >= 750) {
			sidebar.trigger("sticky_kit:recalc");
		} else {
			sidebar.trigger("sticky_kit:detach");
		}
	})(this));
});


/* OK 03-26 Fix for iphone background footer)*/
jQuery(window).on('load',function(){
	jQuery('.testimonialsBg').css('background-image', 'url("/getmedia/6759d171-ac26-4d9e-a96b-ffedd0646cf5/testimonials-bg-full/?maxsidesize=' + jQuery(window).width() + '")');
});
/*(function() {
	var reset_scroll;

	jQuery(function() {
		return jQuery("[data-sticky_column]").stick_in_parent({
			parent: "[data-sticky_parent]",
			offset_top: jQuery('header').outerHeight(),
		});
	});

	reset_scroll = function() {
		var scroller;
		scroller = jQuery("body,html");
		scroller.stop(true);
		if (jQuery(window).scrollTop() !== 0) {
			scroller.animate({
				scrollTop: 0
			}, "fast");
		}
		return scroller;
	};

	window.scroll_it = function() {
		var max;
		max = jQuery(document).height() - jQuery(window).height();
		return reset_scroll().animate({
			scrollTop: max
		}, max * 3).delay(100).animate({
			scrollTop: 0
		}, max * 3);
	};

	window.scroll_it_wobble = function() {
		var max, third;
		max = jQuery(document).height() - jQuery(window).height();
		third = Math.floor(max / 3);
		return reset_scroll().animate({
			scrollTop: third * 2
		}, max * 3).delay(100).animate({
			scrollTop: third
		}, max * 3).delay(100).animate({
			scrollTop: max
		}, max * 3).delay(100).animate({
			scrollTop: 0
		}, max * 3);
	};

	jQuery(window).on("resize", (function(_this) {
		return function(e) {
			return jQuery(document.body).trigger("sticky_kit:recalc");
		};
	})(this));

}).call(this);*/

//Media Center Basic Sort Function START
jQuery('#selectFilterPress').change(function () {
	jQuery(".all").hide();
	jQuery("." + jQuery(this).find(":selected").attr("id")).show();
});

jQuery('#selectFilterNews').change(function () {
	jQuery(".all").hide();
	jQuery("." + jQuery(this).find(":selected").attr("id")).show();
});

//Media Center Basic Sort Function END
