/*
@name			The Mulia - custom.js
@version		1.0.0
@author-uri		http://cendynone.com
*/

/***************/
/** SET VARS **/
/***************/
// get start time
//console.time('vars');

var win = jQuery(window),
	doc = jQuery(document),
	isMobile = window.matchMedia('only screen and (max-width: 739px)'),
	lang = navigator.language,
	ua = navigator.userAgent,
	event_type = (ua.match(/iPad/i) !== null || isMobile.matches) ? "touchstart" : "mouseover",

	htmlbody = jQuery('html, body'),
	html = jQuery('html'),
	body = jQuery('body'),

	selectbox = jQuery('select.selectbox'), //jQuery('select')

	wrapper = jQuery('#wrapper'),
	header = jQuery('header'),
	global_nav = jQuery('#global-nav'),
	//top = jQuery('#top'),
	utility_nav = jQuery('#utility-nav'),
	main_nav = jQuery('#main-nav'),
	content = jQuery('#content'),
	footer = jQuery('#footer'),
	footer_nav = jQuery('#footer-nav'),

	// add first and last classes to ul li items
	navs = jQuery('.nav ul'),
	first_lis = navs.find('> li:not(".Label"):first').addClass('first'),
	last_lis = navs.find('> li:not(".Label"):last').addClass('last'),

	subnavs = jQuery('#subnav.nav ul'),
	sub_first_lis = subnavs.find('> li:first').addClass('first'),
	sub_last_lis = subnavs.find('> li:last').addClass('last'),

	// set Select Box Holder var
	sbHolder = jQuery('.sbHolder'),
	first_booking_list_item = sbHolder.find('ul.sbOptions > li:first'),
	last_booking_list_item = sbHolder.find('ul.sbOptions > li:last'),

	// destination nav
	destinations_navs = jQuery('.our-destinations.nav'),

	first_destinations_cols = destinations_navs.find('ul > li .od-nav-dd').find('> .od-nav-dd-column:first').addClass('first'),
	last_destinations_cols = destinations_navs.find('ul > li .od-nav-dd').find('> .od-nav-dd-column:last').addClass('last'),

	// utility necessities
	utility_nav = global_nav.find('#utility-nav'),
	contact_us_nav_item = utility_nav.find('>ul>li:visible:first').addClass('contact-us'),
	//language_nav_item = utility_nav.find('>ul>li:visible:last').addClass('language'),

	// ######################################

	main_nav_toggle = jQuery( '#main-nav-toggle >button' ).addClass('main-menu-toggle'),
	nav_toggle = jQuery( '#nav-toggle > button' ).addClass('main-menu-toggle'),
	menu_toggle = jQuery( '.main-menu-toggle' ),

	// create mobile menu wrapper
	mp_menu = jQuery( '<nav id="menu" />' ),
	mp_main_menu = jQuery('#menu'),
	ul = jQuery( '<ul class="links"></ul>' ),

	// explore nav
	explore_nav = main_nav.find('.nav > ul' ),
	//explore_nav = jQuery( 'header #main-nav .nav > ul' ),
	// actual global nav
	global_nav = global_nav.find('.left-nav > ul' ),
	//global_nav = jQuery( 'header #global-nav .left-nav > ul' ),
	// sub nav
	//sub_nav = jQuery( '#content #subnav.nav > ul' ),

	// create mobile menu wrapper
	mp_menu_f = jQuery( '<nav />' ).attr( 'id', 'footer-menu' ),
	mp_footer_menu = jQuery('nav#footer-menu'),
	ul_f = jQuery( '<div class="footer-columns"></ul>' ),
	// actual footer nav
	footer_nav = footer_nav.find('.nav > .boxes' ),
	//footer_nav = jQuery( '#footer #footer-nav .nav > .boxes' ),

	// create mobile menu wrapper
	mp_menu_l = jQuery( '<nav />' ).attr( 'id', 'language-menu' ),
	mp_lang_menu = jQuery('nav#language-menu'),
	div_lang = jQuery( '<div class="language-columns"></ul>' ),
	// actual footer nav
	language_nav = jQuery( '.languageSelectionWithCultures' ),

	// ######################################

	// mobile btn necessities
	mobile_nav_border = main_nav.find('>a').not(':first').not(':last').addClass('border'),

	// booking engine
	booking_engine = jQuery('#booking-engine'),

	// masterslider
	masterslider_loader = jQuery("#masterslider > .loading"),

	// set time & weather vars
	currentTime = new Date(),
	clientTime = new Date(),
	clientHours = clientTime.getHours(),
	offset = clientTime.getTimezoneOffset()/60,

	// Bali - 8, Jakarta - 7
	localTimezoneOffset = property_timezone,

	time_and_weather = jQuery('#time-and-weather'),
	time_and_weather_time = time_and_weather.find('.time'),
	time_and_weather_item = time_and_weather.find('.weather'),

	// content
	first_content_container = content.find('> .container:visible:first').addClass('first'),
	last_content_container = content.find('> .container:visible:last').addClass('last'),

	// footer box columns
	first_footer_box_item = footer.find('.boxes>.box:visible:first, .social-nav>a:visible:first').addClass('first'),
	last_footer_box_item = footer.find('.boxes>.box:visible:last, .social-nav>a:visible:last').addClass('last'),

	// specials dependant vars
	specials = jQuery('#specials'),
	specials_show = specials.find('.show-me'),
	specials_show_wrapper = specials_show.find('.show-me-wrapper'),
	specials_hide = specials.find('.hide-me'),
	specials_collapse = specials.find('a.collapse'),
	specials_hide_me = specials.find('.hide-me'),
	properties = specials.find('.properties'),
	activated = false,

	/*
	-if userLanguage exists they're in IE, else firefox
	-get the first two letters in lowercase to guarantee
	an easily evaluated base language
	*/
	/*baseLang = null | function() {
		if (window.location.search) {
			return window.location.search.substring(6,8).toLowerCase();
		} else if (navigator.userLanguage) {
			return navigator.userLanguage.substring(0,2).toLowerCase();
		} else if (navigator.language) {
			return navigator.language.substring(0,2).toLowerCase();
		} else {
			return 'en';
		};
	},*/
	/**
	example in switch statement
	//check languages
	switch(baseLang)
	{
		case 'es':
			//Spanish
			moretext = 'Ver más <i class="fa fa-caret-right"></i>';
			lesstext = '<i class="fa fa-caret-left"></i> cerca';
			break;
		default:
			moretext = 'read more <i class="fa fa-caret-right"></i>';
			lesstext = '<i class="fa fa-caret-left"></i> close';
	}
	**/

	//
	first_booking_list_item_label = jQuery('select>option[value="0"]').html(),

	// init nice var as false
	nice = false;

//console.timeEnd('vars');
// add up time to get load time

/***************/
/** Functions **/
/***************/
// multi-level header mobile nav
function mmHeaderNav() {
	// get start time
	//console.time('mmHeaderNav');

	if((!explore_nav.length || !global_nav.length) && typeof mmenu === 'undefined') {
		return false;
	}

	// create clones for explore & global navs
	var explore_nav_clone = explore_nav.clone();
	var global_nav_clone = global_nav.clone();
	//var sub_nav_clone = sub_nav.clone();

	// create menu array
	explore_nav_clone.find('>li').each(function() {
		ul.append( jQuery(this).removeClass( 'first last' ) );
	});
	global_nav_clone.find('>li').each(function() {
		ul.append( jQuery(this).removeClass( 'first last' ) );
	});

	// now append ul
	mp_menu.append(ul);
	// wrap menu element
	mp_menu.prependTo(wrapper);

	//console.log(mp_menu.length);
	//console.log(mp_main_menu.length);
	//console.log(jQuery('nav#menu').length);

	// init mobile menu, ref: http://mmenu.frebsite.nl/documentation/options/
	//jQuery('nav#menu').mmenu({
	mp_menu.mmenu({
		classes: "mm-mulia",
		counters: true,
		labels: true,
	})
	// navicon animation
	.on( 'opening.mm', function() {
		console.log('open');
		//jQuery('#main-nav-toggle > button, #nav-toggle > button').addClass('close');
		menu_toggle.addClass('close');
	})
	// navicon animation
	.on( 'closing.mm', function() {
		console.log('close');
		//jQuery('#main-nav-toggle > button, #nav-toggle > button').removeClass('close');
		menu_toggle.removeClass('close');
	});
	/*
	*/

	//console.timeEnd('mmHeaderNav');
	// add up time to get load time

};

// footer mobile nav
function mmFooterNav() {
	// get start time
	//console.time('mmFooterNav');

	if(!footer_nav.length && typeof mmenu === 'undefined') {
		return false;
	}

	// create clone for footer nav
	var footer_nav_clone = footer_nav.clone();

	footer_nav_clone.find('div > div').each(function() {
		ul_f.append( jQuery(this).removeClass( 'first last' ) );
	});

	// now append ul
	mp_menu_f.append(ul_f);
	// wrap menu element
	mp_menu_f.prependTo(wrapper);

	// init mobile footer menu
	// ref: http://mmenu.frebsite.nl/documentation/options/
	jQuery('nav#footer-menu').mmenu({
		classes: "mm-mulia mm-fullscreen",
		slidingSubmenus: false,
		labels: true,
		header: {
			"title": "Close",//"Footer Navigation",
			"add": true,
			"update": true
		},
		offCanvas: {
			position  : "bottom",
			zposition : "front"
		},
	}, {
		// configuration object
		//pageNodetype: "form",
		//pageSelector: "body > form",
		pageSelector: "form",
		//menuWrapperSelector: "",
	})
	// navicon animation
	.on( 'opening.mm', function() {
		jQuery( '#footer-nav-toggle>button' ).addClass('close');
	})
	// navicon animation
	.on( 'closing.mm', function() {//.on( 'closed.mm', function() {
		jQuery( '#footer-nav-toggle>button' ).removeClass('close');
	});

	jQuery( '#footer-menu' ).find( '.mm-header, a.mm-next' ).click(function() {
		jQuery( 'nav#footer-menu' ).trigger( 'close.mm' );
	});

	// get rid of hash tag in url
	jQuery( '.mobile-btn:not(#reservations-toggle)' ).click(function(event) {
		event.preventDefault();
	});

	//console.timeEnd('mmFooterNav');
	// add up time to get load time

};

// languge mobile nav
function mmLanguageNav() {
	// get start time
	//console.time('mmLanguageNav');

	if(!language_nav.length && typeof mmenu === 'undefined') {
		return false;
	}

	// create clones for language nav
	var language_nav_clone = language_nav.clone();

	language_nav_clone.find('img, a, span, br').each(function() {
		//div_lang.append( jQuery('<div />').wrapAll(jQuery(this)) );
		div_lang.append( jQuery(this) );
	});
	mp_menu_l.append(div_lang);
	// wrap menu element
	mp_menu_l.prependTo(wrapper);

	// init mobile footer menu
	// ref: http://mmenu.frebsite.nl/documentation/options/
	jQuery('nav#language-menu').mmenu({
		classes: "mm-mulia",
		slidingSubmenus: false,
		autoHeight: true,
		//labels: true,
		header: {
			"title": "Select Language",//"Footer Navigation",
			"add": true,
			"update": true
		},
		offCanvas: {
			position  : "bottom",
			zposition : "front"
		},
	}, {
		// configuration object
		pageSelector: "form",
	});

	/*jQuery( '#language-menu' ).find( '.mm-header, a.mm-next' ).click(function() {
		jQuery( 'nav#language-menu' ).trigger( 'close.mm' );
	});*/

	//console.timeEnd('mmLanguageNav');
	// add up time to get load time

};

// destinations navigation
function destinationsNav() {
	// get start time
	//console.time('destinationsNav');

	var $mainNav = header.find('.our-destinations ul'),
		navWidth = $mainNav.width();
		// $mainNav.width() - 6;

	// add mobile class
	win.resize(function(){
		// add .mobile class to #utility-nav
		if(getViewport() < 740) {
			destinations_navs.addClass('mobile');
		} else {
			destinations_navs.removeClass('mobile');
		}
		//adjustSections
	}).resize();

	// apply hover event to each column
	$mainNav.children('.od-nav-dd-column').hover(function(ev) {
		// add hovered state
		jQuery(this).addClass('hovered');
	}, function(ev) {
		// remove hovered state
		jQuery(this).removeClass('hovered');
	});

	//$mainNav.find('.od-nav-item').click(function(ev) {
	//$mainNav.children('.od-nav-item').on(event_type, function(ev) {
	$mainNav.children('.od-nav-item').hover(function(ev) {
		var $this = jQuery(this),
			$dd = $this.find('.od-nav-dd'),
			isMobileBtn = false;

		// get the left position of this tab
		var leftPos = $this.find('.od-nav-tab').position().left;

		// get the width of the dropdown
		var ddWidth = $dd.width(),
		leftMax = navWidth - ddWidth;

		// position the dropdown
		//$dd.css('left', Math.min(leftPos, leftMax) );
		//console.log(jQuery(ev.target).is( '.od-nav-tab' ) + ': yo');

		// show the dropdown
		$mainNav.find('.od-nav-item').removeClass('od-nav-item-active');
		$mainNav.find('.od-nav-item').find('i.fa-caret-up').addClass('hide');
		$mainNav.find('.od-nav-item').find('i.fa-caret-down').removeClass('hide');

		//$this.addClass('od-nav-item-active');
		$this.find('i.fa-caret-up').removeClass('hide');
		$this.find('i.fa-caret-down').addClass('hide');
		$this.addClass('od-nav-item-active');
	}, function(ev) {
		// hide the dropdown
		//jQuery(this).removeClass('od-nav-item-active');

		var $this = jQuery(this),
			$dd = $this.find('.od-nav-dd'),
			isMobileBtn = false;

		// get the left position of this tab
		var leftPos = $this.find('.od-nav-tab').position().left;

		// get the width of the dropdown
		var ddWidth = $dd.width(),
		leftMax = navWidth - ddWidth;

		//$this.removeClass('od-nav-item-active');
		$this.find('i.fa-caret-up').addClass('hide');
		$this.find('i.fa-caret-down').removeClass('hide');
		$this.removeClass('od-nav-item-active');
	});

	// HOVER EVENT to show destinations - OPTIONAL
	/*$mainNav.children('.od-nav-item').hover(function(ev) {
		//console.log(jQuery(ev.target).is( '.od-nav-tab' ) + ': yo');
	}, function(ev) {
		// hide the dropdown
		jQuery(this).removeClass('od-nav-item-active');
	});*/

	// Click event manipulation for mobile devices
	$mainNav.find('.od-nav-item > a').click(function(ev) {
		// for touch event ONLY
		var target = jQuery(ev.target);
		if (isMobile.matches) {
			if(target.closest('.od-nav-item').is('.od-nav-item-active')){ //if tap is not set, set up single tap
				return false;
			} else { //tapped within 300ms of last tap. double tap
				return true;
			}
			ev.preventDefault();
		}
	});

	// Our destinations - mobile
	jQuery( '#hotels-toggle' ).click(function(ev){
		ev.preventDefault();
		destinations_navs.fadeIn();
		body.css('overflow','hidden');
		//body.find('#wrapper *').not('#header, #header *').addClass('hide');
		$mainNav.find('.od-nav-item.first').addClass('od-nav-item-active');
	});
	jQuery( '#close-destinations' ).click(function(ev){
		ev.preventDefault();
		destinations_navs.fadeOut();
		body.css('overflow','auto');
		//body.find('#wrapper *').not('#header, #header *').removeClass('hide');
		$mainNav.find('.od-nav-item').removeClass('od-nav-item-active');
	});

	// hide the destinations dropdown
	$mainNav.find('.od-nav-item').outside('click', function(ev) {

		var $this = jQuery(this),
			$target = jQuery(ev.target),
			isMobileBtn = false;

		if(
		//$target.is( '.mobile *' ) ||
		$target.is( '.our-destinations.mobile' ) ||
		$target.is( '.our-destinations.mobile *' ) ||
		//$target.is( '.our-destinations.mobile .od-nav-tab' ) ||
		//$target.is( '.our-destinations.mobile .od-nav-tab *' ) ||
		$target.is( '#utility-nav' ) ||
		$target.is( '#utility-nav *' ) ||
		$target.is( '#hotels-toggle' ) ||
		$target.closest( 'a' ).is( '#hotels-toggle' )
		) {
			isMobileBtn = true;
		}

		if( isMobileBtn === false ) {
			$this.removeClass('od-nav-item-active');
			$this.find('i.fa-caret-up').addClass('hide');
			$this.find('i.fa-caret-down').removeClass('hide');
		}
	});

	//console.timeEnd('destinationsNav');
	// add up time to get load time
};

// sub nav
function subNav() {
	// get start time
	//console.time('subNav');

	win.resize(function(){
		var containerHasSubNav = jQuery('#content').find('.container:first:has(.nav)');
		// give room to subnav - check styles.css;
		if(getViewport() < 740) {
			containerHasSubNav.addClass('has-subnav');
		} else {
			containerHasSubNav.removeClass('has-subnav');
		}
	}).resize();
	// Sub nav Click
	jQuery('#subnav-toggle').click(function(e) {
		e.preventDefault();
		jQuery(this).find('> .lines-button').toggleClass('close');
		jQuery('#subnav>ul:visible').stop().slideUp().fadeOut(400, function() {
			jQuery(this).css('display','none');
		});
		jQuery('#subnav>ul').not(":visible").stop().slideDown().fadeIn(400, function() {
			jQuery(this).css('display','inline-block');
		});
	});

	//console.timeEnd('subNav');
	// add up time to get load time

};

// parametersAdjusment
function parametersAdjusment() {
	// get start time
	//console.time('parametersAdjusment');

	// add dest parameter to contact us link
	//var contact_us_link = jQuery('.contact-us').find('>a');
	//contact_us_link.attr( 'href', contact_us_link.attr('href') + ( property_location_label != '' ? '?dest=' + dest : '' ) );

	/*
	// add dest parameter to global menu
	var global_menu_links = jQuery('#global-nav ul li').find('a').each(function(){
		var curLink = jQuery(this),
			curLinkRef = curLink.attr('href');
		curLink.attr( 'href', curLinkRef + ( ( (property_location_label !== '') && (curLinkRef.indexOf("#") === -1) && (this.host === location.host) && (curLinkRef.indexOf('dest=' + dest) < -1) ) ? ((curLinkRef.indexOf("?") === -1) ? '?' : '&') + 'dest=' + dest : '' ) );
	});

	// add dest parameter to main menu
	var main_menu_links = jQuery('#main-nav ul li').find('a').each(function(){
		var curLink = jQuery(this),
			curLinkRef = curLink.attr('href');
		curLink.attr( 'href', curLinkRef + ( ( (property_location_label !== '') && (curLinkRef.indexOf("#") === -1) && (this.host === location.host) && (curLinkRef.indexOf('dest=' + dest) < -1) ) ? ((curLinkRef.indexOf("?") === -1) ? '?' : '&') + 'dest=' + dest : '' ) );
	});

	// add dest parameter to footer menu (.mulia-group-col, .policies-col)
	var footer_menu_links = jQuery('.add-dest-param').find('>a').each(function(){
		var curLink = jQuery(this),
			curLinkRef = curLink.attr('href');
		curLink.attr( 'href', curLinkRef + ( ( (property_location_label !== '') && (curLinkRef.indexOf("#") === -1) && (this.host === location.host) && (curLinkRef.indexOf('dest=' + dest) < -1) ) ? ((curLinkRef.indexOf("?") === -1) ? '?' : '&') + 'dest=' + dest : '' ) );
	});
	*/

	//console.log(jQuery('#global-nav ul li, #main-nav ul li, .add-dest-param').find('a').length);

	// add dest parameter to global menu, main menu and footer menu (.mulia-group-col, .policies-col)
	var menu_links = jQuery('#global-nav ul li a, #main-nav ul li a, #subnav ul li a, .add-dest-param > a').not('.language a').each(function(){
		var curLink = jQuery(this),
			curLinkRef = curLink.attr('href');

		//console.log(curLinkRef);
		//console.log(curLinkRef.indexOf("#"));
		//console.log(curLinkRef.indexOf('dest=' + dest));

		curLink.attr( 'href', curLinkRef + ( ( (property_location_label !== '') && (curLinkRef.indexOf("#") === -1) && (this.host === location.host) || (curLinkRef.indexOf('dest=' + dest) < -1) ) ? ((curLinkRef.indexOf("?") === -1) ? '?' : '&') + 'dest=' + dest : '' ) );
	});

	// add dest parameter to contact us link
	var dining_titles = jQuery('.overview').find('.four').each(function(){
		var restaurant_title = jQuery(this).find('h3').text(),
			restaurant_title_arg = ( property_location_label === 'Bali' ? '&restBali=' : '&restJakarta=' ) + escape(restaurant_title),
			reserve_link = jQuery(this).find('a.reserve-now-link');
	});

	//console.timeEnd('parametersAdjusment');
	// add up time to get load time

};

// Nav Highlighting for Shared Pages
function navHightlighting() {
	// get start time
	//console.time('navHightlighting');

	var main_nav = jQuery('#main-nav .nav');
	var thisUrl = window.location.pathname + window.location.search;
	var target = main_nav.find('a[href="' + thisUrl + '"]').parent('li');
	var parent_target = main_nav.find('li ul a[href="' + thisUrl + '"]').parent();
	if ( !target.hasClass('HighLighted') ) {
		target.addClass('HighLighted');
	};
	if ( !parent_target.hasClass('HighLighted') ) {
		parent_target.addClass('HighLighted');
	};
	parent_target.each(function(){
		if ( !jQuery(this).hasClass('HighLighted') ) {
			jQuery(this).addClass('HighLighted');
		};
	});

	//console.log(window.location.search);
	//console.log(window.location.pathname);

	//console.log(target.length);
	//console.log(parent_target.length);
	//console.log(parent_target.hasClass('HighLighted'));
	//console.log(main_nav.find('a[href*="' + thisUrl + '"]').attr('href'));
	//console.log('thisUrl: ' + thisUrl);

	// specials highlighting
	var specials_target = main_nav.find('a[href*="bali-resort-packages"], a[href*="jakarta-resort-packages"]').parent();
	if ( (window.location.href.indexOf("special-offers") > -1) && (!specials_target.hasClass('HighLighted')) ) {
		specials_target.addClass('HighLighted');
	};
	if ( !parent_target.parent().prev().parent().hasClass('HighLighted') ) {
		parent_target.parent().prev().parent().addClass('HighLighted');
	};
	var sub_target = jQuery('#subnav ul a[href="' + thisUrl + '"]').parent();
	if ( !sub_target.hasClass('HighLighted') ) {
		sub_target.addClass('HighLighted');
		// {% QueryString["property"].ToLower() |(user)LFleurimond|(hash)dd9a640a1a10a9415c29f6d3e90df28af9f6a4574651c95e7243c5571a931f03%}
	};

	//console.timeEnd('navHightlighting');
	// add up time to get load time

};

// Scrollable Table
function scrollableTable() {
	// get start time
	//console.time('scrollableTable');

	// Run on window load in case images or other scripts affect element widths
	// Check all tables. You may need to be more restrictive.
	jQuery('table#room-capacity-chart').each(function() {
		var element = jQuery(this);
		// Create the wrapper element
		var scrollWrapper = jQuery('<div />', {
			'class': 'scrollable',
			'html': '<div />' // The inner div is needed for styling
		}).insertBefore(element);
		// Store a reference to the wrapper element
		element.data('scrollWrapper', scrollWrapper);
		// Move the scrollable element inside the wrapper element
		element.appendTo(scrollWrapper.find('div'));
	});
	tableResizeEvents();
	jQuery(document).load(jQuery(window).bind('resize orientationchange', tableResizeEvents));

	//console.timeEnd('scrollableTable');
	// add up time to get load time

};

// init Accordion
function initAccordion(default_elem, mobile_only) {
	// get start time
	//console.time('initAccordion');

	// ref: http://inspirationalpixels.com/tutorials/creating-an-accordion-with-html-css-jquery
	/*!
	 * Vallenato 1.0
	 * A Simple JQuery Accordion
	 *
	 * Designed by Switchroyale
	 *
	 * Use Vallenato for whatever you want, enjoy!
	 */
	// Default Element
	//var default_elem = typeof a !== 'undefined' ? default_elem : jQuery('.policies');
	var default_elem = default_elem || jQuery('.policies');
	var mobile_only = mobile_only || false;
	var do_effect = true;

	//Add Inactive Class To All Accordion Headers
	default_elem.find('.accordion-header').toggleClass('inactive-header');

	//Set The Accordion Content Width
	var contentwidth = default_elem.find('.accordion-header').width();
	default_elem.find('.accordion-content').css({'width' : contentwidth });

	//Open The First Accordion Section When Page Loads
	//default_elem.find('.accordion-header').first().toggleClass('active-header').toggleClass('inactive-header');
	//default_elem.find('.accordion-content').first().slideDown().toggleClass('open-content');

	// Mobile ONLY
	if(mobile_only == true) {
		win.on('resize', function() {
			if (getViewport() < 479) {
				do_effect = true;
			} else {
				do_effect = false;
				default_elem.find('.accordion-header').toggleClass('inactive-header');
			}
			//console.log(mobile_only, do_effect);
		});
	}

	// The Accordion Effect
	if(do_effect == true) {
		default_elem.find('.accordion-header').click(function (e) {
			var curr_header = jQuery(this),
				active_header = jQuery('.active-header'),
				curr_content = curr_header.next();
			if(curr_header.is('.inactive-header')) {
				active_header.toggleClass('active-header').toggleClass('inactive-header').next().slideToggle().toggleClass('open-content');
				curr_header.toggleClass('active-header').toggleClass('inactive-header');
				curr_content.slideToggle('fast', function() {
					curr_content.css('overflow','visible');
				}).toggleClass('open-content');
			} else {
				curr_header.toggleClass('active-header').toggleClass('inactive-header');
				curr_content.slideToggle('fast', function() {
					curr_content.css('overflow','hidden');
				}).toggleClass('open-content');
			}
			e.preventDefault();
		});
	}

	return false;

	//console.timeEnd('initAccordion');
	// add up time to get load time

};

// selectbox init
function selectBoxInit() {
	// get start time
	//console.time('selectBoxInit');

	// add mobile class
	win.resize(function(){
		// add .mobile class to #utility-nav
		if(getViewport() < 740) {
			utility_nav.addClass('mobile');
		} else {
			utility_nav.removeClass('mobile');
		}
	}).resize();

	if(!selectbox.length && typeof selectbox === 'undefined') {
		return false;
	}

	selectbox.selectbox({
		effect: (utility_nav.is('.mobile')) ? 'fade' : 'slide',
		onOpen: function (inst) {
			var sbOptions = jQuery('ul#sbOptions_' + inst.uid + '.sbOptions').addClass(inst.id + ' fixed-top-value');

			//sbOptions.closest('#utility-nav.mobile').find('.sbOptions').each(function() {
			sbOptions.closest('.mobile').find('.sbOptions').each(function() {
				var height = jQuery(this).css('height', 'auto').height(),
					top_old = jQuery(this).css('top'),
					top_new = -(parseInt(height, 10)) + 6 + 'px',
					top = jQuery(this).css('top', top_new);

				jQuery(this).removeClass('fixed-top-value');
			});
		},
		onClose: function (inst) {
			var sbHolder = jQuery('#sbHolder_' + inst.uid);
			sbHolder.each(function() {
				jQuery(this).find('.sbInner').removeClass('sbClicked');
			});
		},
		onChange: function (val, inst) {
			var selected_val = jQuery(this).val();
			jQuery(this).find('option').attr('selected', false);
			jQuery(this).find('option[value="'+ selected_val +'"]').attr('selected', true).change();
		},
	});

	// force overflow-x on selectbox in case text exceed width of parent box
	// wrap .sbToggle and .sbSelector with .sbWrapper
	sbHolder.each(function() {
		jQuery(this).addClass(jQuery(this).prev('select.selectbox').attr('id'));
		jQuery(this).find('> .sbToggle').addClass('sbInner');
		jQuery(this).find('> .sbSelector').addClass('sbInner');
		jQuery(this).find('> .sbInner').wrapAll('<span class="sbWrapper"></span>'); // css specified in styles.css
	});

	// add click event to .sbToggle to add .sbClicked class to target element
	sbHolder.click(function(){
		if(jQuery(this).find('.sbToggle').hasClass('sbToggleOpen')) {
			jQuery(this).find('.sbInner').addClass('sbClicked');
		}
	});

	// booking engine list items
	first_booking_list_item.each(function() {
		var _first_booking_list_item = ( jQuery(this).text() === first_booking_list_item_label || jQuery(this).text() === '' ) ? jQuery(this).addClass('first') : '';
	});
	last_booking_list_item.addClass('last');

	//console.timeEnd('selectBoxInit');
	// add up time to get load time

};

// Special Offers init
function initSpecialsOffersWidget() {
	// get start time
	//console.time('initSpecialsOffersWidget');

	// init specials slider
	if(!specials_show_wrapper && typeof cycle === 'undefined') {
		return false;
	}

	specials_show_wrapper.cycle({
		containerResize: 1,
		slideResize: 1,
		speed: 1500,//1250,
		timeout: 7500,
		next: '#specials-next',
		prev: '#specials-prev',
		pause: 1, // true to enable "pause on hover"
		pauseOnPagerHover: 1, // true to pause when hovering over pager link

		/*fx: 'uncover',//'scrollLeft',
		direction: 'right', // one of up|down|left|right  default=left
		cssBefore: {
			opacity: 1,
		},
		animOut: {
			opacity: 0
		},
		sync: 0,
		//delay: -2000,
		*/

		before: function(currSlideElement, nextSlideElement, options, forwardFlag) {
			properties.children('a').removeClass('active');
			//if('bali' === jQuery(currSlideElement).attr('class')) {
			if('bali' === jQuery(nextSlideElement).attr('class')) {
				//properties.find('a.jakarta').removeClass('active');
				properties.children('a.bali').addClass('active');
			}
			//if('jakarta' === jQuery(currSlideElement).attr('class')) {
			if('jakarta' === jQuery(nextSlideElement).attr('class')) {
				properties.children('a.jakarta').addClass('active');
				//properties.find('a.bali').removeClass('active');
			}
		},
	});
	// pause after init
	specials_show_wrapper.cycle('pause');

	// add event to HIDE ME box
	specials_hide_me.click(function() {
		specials_collapse.children('i.fa-plus').addClass('hide');
		specials_collapse.children('i.fa-minus').removeClass('hide');
		specials.addClass('unveil');
		specials_show.addClass('unveil').removeClass('veil');
		specials_hide.removeClass('unveil').addClass('veil');
		specials_show_wrapper.cycle('resume');
		activated = true;
		//return false;
	});
	// specials pull-out/pull-in click event
	specials_collapse.click(function() {
		if(jQuery(this).children('i.fa-minus').hasClass('hide')) {
			jQuery(this).children('i.fa-plus').addClass('hide');
			jQuery(this).children('i.fa-minus').removeClass('hide');
			specials.addClass('unveil');
			specials_show.addClass('unveil').removeClass('veil');
			specials_hide.removeClass('unveil').addClass('veil');
			specials_show_wrapper.cycle('resume');
		} else {
			jQuery(this).children('i.fa-minus').addClass('hide');
			//jQuery(this).children('i.fa-plus').removeClass('hide');
			jQuery(this).children('i.fa-plus').closest('a').addClass('hide');

			specials.removeClass('unveil');
			specials_show.addClass('veil').removeClass('unveil');
			//specials_hide.removeClass('veil').addClass('unveil');
			specials_hide.addClass('unveil');
			window.setTimeout( function(){
				jQuery('i.fa-plus').removeClass('hide');
				jQuery('i.fa-plus').closest('a').removeClass('hide');
				specials_hide.removeClass('veil');
			}, 750 ); // .75 seconds
			specials_show_wrapper.cycle('pause');
		}
		activated = true;
		return false;
	});

	//console.timeEnd('initSpecialsOffersWidget');
	// add up time to get load time

};

// Awards & Accolades Slider init
function initContentSliderWidget() {
	// get start time
	//console.time('initContentSliderWidget');

	var content_slider = jQuery('.content-slider > ul');

	if(!content_slider.length && typeof cycle === 'undefined') {
		return false;
	}

	// init specials slider
	content_slider.cycle({
		containerResize: 1,
		slideResize: 1,
		speed: 500,//1250,
		timeout: 7500,//0,
		next: '#content-slider-next',
		prev: '#content-slider-prev',
		pager: '#content-slider-nav',
		pause: 1, // true to enable "pause on hover"
		pauseOnPagerHover: 1, // true to pause when hovering over pager link
		fx: 'scrollHorz',//'uncover',//'scrollLeft',
	});

	//console.timeEnd('initContentSliderWidget');
	// add up time to get load time

};

// special offers filter
function specialsOffersFilter() {
	// get start time
	//console.time('specialsOffersFilter');

	var $btns = jQuery('#special-category-filter > select').change(function() {
		var value = jQuery(this).val();
		//console.log(value);
		if (value === 'all') {
			//jQuery('.specials.details:not(.empty) ul.overview > .list__item').fadeIn(450);
			jQuery('.specials.details').not('.empty').find('ul.overview > .list__item').fadeIn(450);
		} else {
			var $el = jQuery('.' + value).fadeIn(450);
			jQuery('.specials.details:not(.empty) ul.overview > .list__item').not($el).hide();
		}

		// reset blocks height
		equalHeight('#content div:not(.empty) .list-blocks .list__item__inner');

		//console.log(jQuery('.specials.details:not(.empty) ul.list-blocks').length);

		jQuery('.specials.details:not(.empty) ul.list-blocks').each(function() {

			var details_block_id = jQuery(this).closest('.specials.details').attr('id'),
				not_visible_len = jQuery(this).find('> .list__item').not(':visible').length,
				visible_len = jQuery(this).find('> .list__item').length,
				empty = jQuery(this).closest('.specials.details').not('.empty').prev('.specials.empty');

			//console.log(details_block_id);

			if (not_visible_len === visible_len) {
				empty.css('display','block');
			} else {
				empty.css('display','none');
			}
		});
	});

	//
	jQuery('.specials.empty').each(function() {
		var not_empty = jQuery(this).next('.specials.details');
			not_empty_id = not_empty.attr('id');
		// if undefined
		if(not_empty_id === undefined) {
			jQuery(this).css('display','block');
		} else {
			jQuery(this).css('display','none');
		}
	});

	//console.timeEnd('specialsOffersFilter');
	// add up time to get load time

};

// live update clock
function updateClock() {
	// get start time
	//console.time('updateClock');

	currentTime.setHours(clientHours + offset + localTimezoneOffset);

	jQuery('#time-and-weather').find('.time').html(currentTime.toLocaleTimeString(lang, {hour: '2-digit', minute:'2-digit'}));
	//time_and_weather_time.html(currentTime.toLocaleTimeString(lang, {hour: '2-digit', minute:'2-digit'}));

	//console.timeEnd('updateClock');
	// add up time to get load time

};

// init time and weather widget
function initTimeAndWeather() {
	// get start time
	//console.time('initTimeAndWeather');

	//if(property_weather_location === '') {
	//if( time_and_weather.length > 0 && time_and_weather.is('visible') ) {
	if( !time_and_weather.length && !time_and_weather.is('visible') && typeof simpleWeather === 'undefined' ) {
		return false;
	}

	// show time widget if property_weather_location is not empty
	if( property_weather_location !== "" ) {
		time_and_weather.css('display', 'inline-block');
	}

	//console.log(property_weather_location);

	// ref: http://simpleweatherjs.com/
	jQuery.simpleWeather({
		location: property_weather_location,
		//woeid: property_woeid,
		unit: 'c',
		success: function(weather) {
			window.onload = function(){ updateClock(); };
			setInterval(function(){ updateClock(); }, 1000);
			html = '';
			html += '<span class="location">' + property_weather_location_label + '</span> ';
			html += '<span class="time"></span>';
			html += '<span class="separator">|</span>';
			html += '<span class="icon"><i class="weather-icon-' + weather.code + '"></i> ';
			html += '<span class="temp-c">' + weather.temp + '&deg;' + weather.units.temp + '</span>';
			html += '<span>/</span>';
			html += '<span class="temp-f">' + weather.alt.temp + '&deg;F</span> ';
			time_and_weather_item.html(html);
		},
		error: function(n) {
			//time_and_weather_item.html('<p>' + n + '</p>');
			time_and_weather_item.html('');
		}
	});
	//getWeather(); //Get the initial weather.
	//setInterval(getWeather, 600000); //Update the weather every 10 minutes.

	//console.timeEnd('initTimeAndWeather');
	// add up time to get load time

};

// adjust Chars
function wrapSpecificChars() {
	// get start time
	//console.time('wrapSpecificChars');

	// create steps boxes, set the elements to vars in which the boxes should appear
	var div_the = jQuery(".page-title:contains('The')"),
		h1_the = jQuery("h1:contains('The')"),
		h2_the = jQuery("h2:contains('The')"),
		h3_the = jQuery("h3:contains('The')"),

		div_ampersand = jQuery(".page-title:contains(&)"),
		h1_ampersand = jQuery("h1:contains(&)"),
		h2_ampersand = jQuery("h2:contains(&)"),
		h3_ampersand = jQuery("h3:contains(&)"),

		div_and = jQuery(".page-title:contains('and')"),
		h1_and = jQuery("h1:contains('and')"),
		h2_and = jQuery("h2:contains('and')"),
		h3_and = jQuery("h3:contains('and')"),

		div_why = jQuery(".page-title:contains('Why')"),
		h1_why = jQuery("h1:contains('Why')"),
		h2_why = jQuery("h2:contains('Why')"),
		h3_why = jQuery("h3:contains('Why')"),

		headingsThe_arr = jQuery.makeArray([div_the, h1_the, h2_the, h3_the]),
		headingsAmpersand_arr = jQuery.makeArray([ div_ampersand, h1_ampersand, h2_ampersand, h3_ampersand]),
		headingsAnd_arr = jQuery.makeArray([ div_and, h1_and, h2_and, h3_and]),
		headingsWhy_arr = jQuery.makeArray([div_why, h1_why, h2_why, h3_why]);

	jQuery.each(headingsThe_arr, function() {
		// #content
		var targetElem = jQuery( '#content, #masterslider, #top .our-destinations ul .od-nav-dd' ).find(this);
		// Find "The"
		/*targetElem.html(function( _, html ) {
			return html.replace( /([Tt][Hh][Ee])/, '<span class="">$1</span>' );
		});*/

		// new
		targetElem.wrapInTag({
			tag: 'span',
			//attr: 'style="padding-top:12px;"',
			words: ['The']
		});
	});

	jQuery.each(headingsAnd_arr, function() {
		var targetElem = jQuery( '#masterslider' ).find(this);

		// Find "and"
		targetElem.html(function( _, html ) {
			return html.replace( /\s+([Aa][Nn][Dd])\s*/, ' <span class="" style="text-transform: none;">$1</span> ' );
		});
	});

	jQuery.each(headingsAmpersand_arr, function() {
		// http://jsfiddle.net/qr3pe/3/
		var html = jQuery( '#masterslider, #top .our-destinations ul .od-nav-dd' ).find(this).html(),
			regexp = /&amp;(.)/, // regexp (.html() returns &amp; even
			// if the source is &). `()` to capture.
			match = regexp.exec(html); // get the captured character

		if(!match) return; // no match; abort

		var replaced = html.replace(regexp,
		"<span>&amp;</span> ");

		jQuery(this).html(replaced); // replace the html
	});/**/

	jQuery.each(headingsWhy_arr, function() {
		// #content
		var targetElem = jQuery( '#content, #masterslider, #top .our-destinations ul .od-nav-dd' ).find(this);

		// Find "Why"
		targetElem.html(function( _, html ) {
			return html.replace( /([Ww][Hh][Yy])/, '<span class="">Why</span>' );
		});

	});

	//console.timeEnd('wrapSpecificChars');
	// add up time to get load time

};

// Set Viewport
function getViewport() {
	// get start time
	//console.time('getViewport');

	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
	return x;

	console.timeEnd('getViewport');
	// add up time to get load time
};

// Get CurrentScroll
function getCurrentScroll() {
	// get start time
	//console.time('getCurrentScroll');

	return window.pageYOffset || document.documentElement.scrollTop;

	//console.timeEnd('getCurrentScroll');
	// add up time to get load time
};

// init sitemap
function initSiteMap() {
	// get start time
	//console.time('initSiteMap');

	jQuery(".sitemap-toggle").live('click',function(e) {
		e.preventDefault();
		if (jQuery('.sitemap-float').is(':visible')) {
			jQuery(".sitemap-float").fadeOut(500);
		} else {
			jQuery(".sitemap-float").fadeIn(500);
		}
	});
	/*jQuery('.sitemap-content').find('li').each(function() {
		jQuery(this).find( "a:contains('Bali'), a:contains('Jakarta')" ).closest('li').addClass( 'sitemap-label' );
	});*/
	jQuery( '.sitemap-content' ).find( '> ul > li' ).find( "a:contains('Bali'), a:contains('Jakarta')" ).closest( 'li' ).addClass( 'sitemap-label' );

	//console.timeEnd('initSiteMap');
	// add up time to get load time
};

// if image exists
/*function imageExists(image_url) {
	var http = new XMLHttpRequest();
	http.open('HEAD', image_url, false);
	http.send();
	return http.status != 404;
};*/

// Submit functions
function submitEmailForm(input, value) {
	// get start time
	//console.time('submitEmailForm');

	var email = input.val();
	if (email == value || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
		alert("Please enter a valid email address.");
		//form.find('.emailSignUp').focus();
		input.css( "border", "1px solid red" ).focus();
		return false;
	}
	document.location.href = ('/email-signup/?em=' + email + '&include=true&dest=' + dest);

	//console.timeEnd('submitEmailForm');
	// add up time to get load time
};

// init email form events
function initEmailFormEvents() {
	// get start time
	//console.time('initEmailFormEvents');

	var emailForm = jQuery('.email-form'),
		emailInput = emailForm.children('.emailSignUp'),
		emailSubmit = emailForm.children('.submit'),
		defaultValue = emailForm.children('input.emailSignUp').val();
		//defaultValue = 'ENTER EMAIL ADDRESS';
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
	emailForm.find('.emailSignUp').on('focus blur', function(e){
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

	//console.timeEnd('initEmailFormEvents');
	// add up time to get load time
};

// Create scrollable table events
function tableResizeEvents() {
	// get start time
	//console.time('tableResizeEvents');

	jQuery('table#room-capacity-chart').each(function() {
		var element = jQuery(this),
			parent = element.parent(),
			parent_w,
			element_w = element.width(),
			content_w = element.closest('#content .container').width();

		//
		parent_w = content_w;

		if(element_w > parent_w) {
			parent.css('width', parent_w);
			element.data('scrollWrapper').addClass('has-scroll');
		} else {
			parent.css('width', '100%;');
			element.data('scrollWrapper').removeClass('has-scroll');
		}
	});

	//console.timeEnd('tableResizeEvents');
	// add up time to get load time

};

// Create Cookie
function createCookie(name, value, days) {
	// get start time
	//console.time('createCookie');

	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days*24*60*60*1000)); //30 days
		var expires = "; expires=" + date.toGMTString();
	} else {
		var expires = "";
	}
	document.cookie = name + "Cookie=" + value + expires + "; path=/";

	//console.timeEnd('createCookie');
	// add up time to get load time
};
// Call Cookie
function readCookie(name) {
	// get start time
	//console.time('readCookie');

	var nameEQ = name + "Cookie=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;

	//console.timeEnd('readCookie');
	// add up time to get load time
};
// Erase Cookie
function eraseCookie(name) {
	// get start time
	//console.time('eraseCookie');

	createCookie(name, false, -1);

	//console.timeEnd('eraseCookie');
	// add up time to get load time
};

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
function equalHeight(container) {
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
/** OLD
function equalHeight3(container) {
	var currentTallest = 0,
		currentRowStart = 0,
		//rowDivs = new Array(),
		rowDivs = [],
		$el,
		topPosition = 0;
	jQuery(container).each(function() {
		$el = jQuery(this);
		jQuery($el).height('auto');
		//topPostion = ($el.position().top == 0) ? $el.parent().position().top : $el.position().top;
		topPostion = ($el.offset().top === 0) ? $el.parent().offset().top : $el.offset().top;

		//console.log('rowDivs: '+rowDivs.length);
		//console.log('currentRowStart: '+currentRowStart);
		//console.log('OLE topPostion: '+$el.offset().top);
		//console.log('topPostion: '+topPostion);
		if (currentRowStart !== topPostion) {
			for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
				//console.log('currentDiv: '+currentDiv);
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
			//console.log('currentDiv: '+currentDiv);
			rowDivs[currentDiv].height(currentTallest);
		}
	});
};

// http://codepen.io/micahgodbolt/pen/FgqLc
// https://github.com/liabru/jquery-match-height
function equalHeight_NEW(container) {
	// get start time
	console.time('equalHeight');

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

	console.timeEnd('equalHeight');
	// add up time to get load time
};
**/

/***********************/
/** INIT MASTERSLIDER **/
/***********************/
function initMasterSlider() { // load on DOM ready
	// get start time
	console.time('initMasterSlider');

	// init MasterSlider object
	var masterslider = new MasterSlider();

	// slider controls
	masterslider.control('bullets', {
		autohide:true,//false,
		overVideo:true,
		dir:'h',
		align:'bottom',
		space:5 ,
		margin:14
	});
	// slider setup
	masterslider.setup('masterslider', {
		width           : 1280,
		height          : 514,
		swipe           : true,
		layout          : 'fullwidth',
		autoplay        : true,
		instantStartLayers:true,
		loop            : true,

		//autoHeight      : true,
		heightLimit		: 514,
		smoothHeight    : false,

		overPause       : true,
		speed           : 20,
		view            : 'fade',//'parallaxMask',

		startOnAppear	: true,
	});
	masterslider.api.addEventListener(MSSliderEvent.INIT , function() {
		// set some vars
		var ms_wrap = jQuery('#masterslider'),
			ms_slide_count = masterslider.api.count(),
			ms_slides = ms_wrap.find('.ms-slide'),
			ms_slide_bullets = ms_wrap.find('.ms-bullets');

		// add filter
		ms_slides.each(function(){
			var $this = jQuery(this),
			var ms_slide_captions = $this.find('.ms-caption');

			//console.log(ms_slide_captions.length);
			ms_slide_captions.length ? $this.find('.ms-slide-bgcont, .ms-slide-layers').prepend('<div class="ms-layer filter" />') : '';
		});

		// dispatches when the slider's current slide change starts.
		// hide master slider bullets if only one slide item shows
		if(ms_slide_count <= 1) {
			ms_slide_bullets.addClass('hide');
		}

		// show .ms-container now
		//console.log(ms_wrap.find('.ms-container').length);
		ms_wrap.find('.ms-container').addClass('ms-container-loaded');
	});
	// apply parallax to slides
	MSScrollParallax.setup( masterslider, 70, 90, false );

	console.timeEnd('initMasterSlider');
	// add up time to get load time
};
//  Tried this alternative, but too slow
//( function ($) {
	//"use strict";

	// ...

	//window.masterslider_instances = window.masterslider_instances || {};
	//window.masterslider_instances["11_8682"] = masterslider;

	//window.masterslider_instances = window.masterslider_instances || [];
	//window.masterslider_instances.push( masterslider );
//})( jQuery );

// init all functions On DOM Ready
function initOnDomReadys() {
	// get start time
	//console.time('initOnDomReadys');

	// remove loader animation on masterslider after page load
	//jQuery("#masterslider > .loading").delay(2000).fadeOut(500).addClass('hide');

	// adjust headet masterslider
	win.resize(function() {
		var masterslider = jQuery('#masterslider');
		jQuery('#slider-wrapper').height(masterslider.find('.ms-view').outerHeight());
	}).resize();

	// load master slider
	//initMasterSlider();

	/*****************************************/

	// Multi-level header nav
	mmHeaderNav();
	// Footer nav
	mmFooterNav();

	// Language nav
	mmLanguageNav();
	// language onclick
	win.resize(function(){
		/*if(getViewport() < 740) {
			mmLanguageNav();
		} else {
			jQuery('nav#language-menu').mmenu.remove();
		};*/
		jQuery('.language').children('a').click(function() {
			if(getViewport() < 740) {
				jQuery('nav#language-menu').data( 'mmenu' ).open();
				return false;
			} else {
				return true;
			}
		});
	}).resize();

	// apply some adjustments for Kentico server
	jQuery('.ll-skin-mulia').removeClass('mm-page mm-slideout');
	jQuery('#form').addClass('mm-page mm-slideout');

	// Our Destination Nav
	destinationsNav();
	// Sub Nav
	subNav();

	/** ###################################### **/
	parametersAdjusment();
	/** ###################################### **/
	navHightlighting();

	/*****************************************/

	// selectbox
	selectBoxInit();
	// Accordion
	initAccordion();
	initAccordion(jQuery('.specials .list__item.accordion .list__item__inner'), true);
	// init Specials Offers
	//initSpecialsOffersWidget();
	// Specials Offers Filter (Special Offers page only)
	specialsOffersFilter();

	// init content slider (Awards & Accolades)
	initContentSliderWidget();

	//
	//jQuery('.reserve > a.all-bali, .reserve > a.all-jakarta').attr('href','#').click(function(){
	jQuery('.reserve > a[href*=#]').click(function(){
		return false;
	});

	// wrap chars, definitive articles, etc.
	wrapSpecificChars();
	// Time and Weather widget
	initTimeAndWeather();

	// adjust .button margining (jQuery FALLBACK)
	jQuery('a.button').each(function() {
		jQuery(this).next('a.button').addClass('margined-button');
	});

	// smooth scrolling onclick
	jQuery('a[href*=#]:not([href=#], #nav-toggle, #footer-nav-toggle, #language-nav-toggle, .mm-list a.mm-subopen, .mm-list a.mm-subclose)').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

			var target = jQuery(this.hash);
			target = target.length ? target : jQuery('[id=' + this.hash.slice(1) +']');
			if (target.length) {
				//console.log(target.offset().top);
				jQuery('html,body').animate({
					//scrollTop: target.offset().top - offset
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}

		}
	});

	// Sitemap
	initSiteMap();

	// mobile device adjustments for selectbox
	if (isMobile.matches) {
		selectbox.css('display','inline-block');
		jQuery('.sbHolder').addClass('hide');
	}

	// Scrollable Table
	scrollableTable();
	// Email Form in Footer
	initEmailFormEvents();

	// quick adjustment to curalte social gallery
	//console.log(jQuery('#curalate-content').height());
	//console.log(jQuery('#curalate-content .curalate-viewport').height());
	//console.log(jQuery('#curalate-content .curalate-viewport .curalate-thumbs').height());
	//jQuery('#curalate-fan-reel').height(jQuery('#curalate-content').height());

	// share icons popup
	jQuery('.social-btn').click(function(){
		jQuery('.share-btns-wrapper').addClass('hide');
		jQuery(this).closest('.social-sharing-btns').find('.share-btns-wrapper').toggleClass('hide');
		jQuery('body').toggleClass('share-btns-opened');
		return false;
	});
	jQuery('.close-share-btn').click(function(){
		jQuery('.share-btns-wrapper').addClass('hide');
		jQuery('body').removeClass('share-btns-opened');
		return false;
	});

	//console.timeEnd('initOnDomReadys');
	// add up time to get load time
};

// initiate onload funcrtions
function initOnLoads() {
	// get start time
	//console.time('initOnLoads');

	// masterslider
	//var masterslider = jQuery('#masterslider');
		//ms_slide_bgcont = masterslider.find('.ms-slide-bgcont, .ms-slide-layers').prepend('<div class="ms-layer filter" />');
	//jQuery('#slider-wrapper').height(masterslider.find('.ms-view').height());

	// load master slider
	if(jQuery('#masterslider').length)
		initMasterSlider();

	// Scroll To Position on load
	var hashString = window.location.hash;
		hashString = hashString.replace("#", "");
	//console.log('hashString.length: ' + hashString.length);
	//console.log('jQuery([id=' + hashString + ']).length: ' + jQuery('[id=' + hashString + ']').length);
	if (hashString.length > 0) {
		var target = jQuery('[id=' + hashString + ']');
		if (target.length > 0) {
			htmlbody.animate({
				scrollTop: target.offset().top
			}, 1000);
			return false;
		}
	}

	//console.timeEnd('initOnLoads');
	// add up time to get load time
};

// initiate on resize functions
/*var initOnResizes = function() {};*/

// initiate on load and on resize functions
function initOnLoadsAndOnResizes() {
	// get start time
	//console.time('initOnLoadsAndOnResizes');

	// set even height to all ul li div.od-nav-dd-column
	equalHeight('#content.landing .our-destinations ul .od-nav-dd-column');
	// set even height to all ul.list-blocks li.list__item__inner
	equalHeight('#content div:not(.empty) .list-blocks .list__item__inner');

	//console.log(specials_show_wrapper.length);
	// specials automated animation
	if(specials_show_wrapper.length) {
		setTimeout(function() {
			if(activated === false) {
				if(getViewport() > 960 || getViewport() < 740 ) {
					specials_collapse.find('>i.fa-plus').addClass('hide');
					specials_collapse.find('>i.fa-minus').removeClass('hide');
					specials.addClass('unveil');
					specials_show.addClass('unveil').removeClass('veil');
					specials_hide.removeClass('unveil').addClass('veil');
					specials_show_wrapper.cycle('resume');
				} else {
					specials.removeClass('unveil');
					specials_show.addClass('veil').removeClass('unveil');
					//specials_hide.removeClass('veil').addClass('unveil');
					specials_hide.addClass('unveil');
					window.setTimeout( function(){
						specials_hide.removeClass('veil');
					}, 750 ); // .75 seconds
				}
			}
		}, 5000);
	}

	//console.timeEnd('initOnLoadsAndOnResizes');
	// add up time to get load time
};

/** Overview Boxes: ref: http://osvaldas.info/examples/responsive-equal-height-blocks/ **/
;( function( jQuery, window, document, undefined ) {
	'use strict';
	// get start time
	//console.time('vars > loadImages (Overview Boxes)');

	var $list		= jQuery( '#content' ).find('div:not(.empty)').find( '.list-blocks' ),
		$items		= $list.find( '.list__item__inner' );

	console.timeEnd('vars > loadImages (Overview Boxes)');
	// add up time to get load time

	var loadImages = function() {
		// get start time
		console.time('vars > loadImages (Overview Boxes)');

		$items.filter( '.js-load-images:first' ).each( function() {
			var $this		= jQuery( this ),
				$imgs		= $this.find( 'noscript.list__item__image' ),
				imgTotal	= $imgs.length,
				imgLoaded	= 0;

			$this.addClass( 'is-loading' );
			$imgs.each( function(index) {
				var $noscript	= jQuery( this ),
					$img		= jQuery( $noscript.text() );

				$img.load( function() {
					$noscript.replaceWith( $img );
					imgLoaded++;
					if( imgLoaded >= imgTotal )
					{
						$this.css( 'opacity', 1 ).removeClass( 'js-load-images' ).removeClass( 'is-loading' );
						loadImages();
					}
				});
			});
		});

		console.timeEnd('vars > loadImages (Overview Boxes)');
		// add up time to get load time
	};

	$items.addClass( 'js-load-images' );
	loadImages();
})( jQuery, window, document );

// user-click outside event
( function($) {
	$.fn.outside = function(ename, cb){
		return this.each(function(){
			var $this = $(this),
				self = this;
			$(document).bind(ename, function tempo(e){
				if(e.target !== self && !$.contains(self, e.target)){
					cb.apply(self, [e]);
					if(!self.parentNode) $(document.body).unbind(ename, tempo);
				}
			});
		});
	};
}( jQuery ) );

/***************/
/** Get element -moz-transform:rotate value in jQuery **/
/***************/
( function ($) {
	// Monkey patch jQuery 1.3.1+ css() method to support CSS 'transform'
	// property uniformly across Safari/Chrome/Webkit, Firefox 3.5+, IE 9+, and Opera 11+.
	// 2009-2011 Zachary Johnson www.zachstronaut.com
	// Updated 2011.05.04 (May the fourth be with you!)
	function getTransformProperty(element)
	{
		// Try transform first for forward compatibility
		// In some versions of IE9, it is critical for msTransform to be in
		// this list before MozTranform.
		var properties = ['transform', 'WebkitTransform', 'msTransform', 'MozTransform', 'OTransform'];
		var p;
		while (p === properties.shift())
		{
			if (typeof element.style[p] !== 'undefined')
			{
				return p;
			}
		}

		// Default to transform also
		return 'transform';
	}

	var _propsObj = null;

	var proxied = $.fn.css;
	$.fn.css = function (arg, val)
	{
		// Temporary solution for current 1.6.x incompatibility, while
		// preserving 1.3.x compatibility, until I can rewrite using CSS Hooks
		if (_propsObj === null)
		{
			if (typeof $.cssProps !== 'undefined')
			{
				_propsObj = $.cssProps;
			}
			else if (typeof $.props !== 'undefined')
			{
				_propsObj = $.props;
			}
			else
			{
				_propsObj = {};
			}
		}

		// Find the correct browser specific property and setup the mapping using
		// $.props which is used internally by jQuery.attr() when setting CSS
		// properties via either the css(name, value) or css(properties) method.
		// The problem with doing this once outside of css() method is that you
		// need a DOM node to find the right CSS property, and there is some risk
		// that somebody would call the css() method before body has loaded or any
		// DOM-is-ready events have fired.
		if
		(
			//typeof _propsObj['transform'] === 'undefined' &&
			typeof _propsObj.transform === 'undefined' &&
			(
				arg == 'transform' ||
				(
					//typeof arg === 'object' && typeof arg['transform'] !== 'undefined'
					typeof arg === 'object' && typeof arg.transform !== 'undefined'
				)
			)
		)
		{
			//_propsObj['transform'] = getTransformProperty(this.get(0));
			_propsObj.transform = getTransformProperty(this.get(0));
		}

		// We force the property mapping here because jQuery.attr() does
		// property mapping with jQuery.props when setting a CSS property,
		// but curCSS() does *not* do property mapping when *getting* a
		// CSS property.  (It probably should since it manually does it
		// for 'float' now anyway... but that'd require more testing.)
		//
		// But, only do the forced mapping if the correct CSS property
		// is not 'transform' and is something else.
		if (_propsObj.transform !== 'transform')
		//if (_propsObj['transform'] !== 'transform')
		{
			// Call in form of css('transform' ...)
			if (arg === 'transform')
			{
				//arg = _propsObj['transform'];
				arg = _propsObj.transform;

				// User wants to GET the transform CSS, and in jQuery 1.4.3
				// calls to css() for transforms return a matrix rather than
				// the actual string specified by the user... avoid that
				// behavior and return the string by calling jQuery.style()
				// directly
				if (typeof val === 'undefined' && jQuery.style)
				{
					return jQuery.style(this.get(0), arg);
				}
			}

			// Call in form of css({'transform': ...})
			else if
			(
				//typeof arg === 'object' && typeof arg['transform'] !== 'undefined'
				typeof arg === 'object' && typeof arg.transform !== 'undefined'
			)
			{
				//arg[_propsObj['transform']] = arg['transform'];
				arg[_propsObj.transform] = arg.transform;
				//delete arg['transform'];
				delete arg.transform;
			}
		}

		return proxied.apply(this, arguments);
	};
})( jQuery );

/*
 * Wrap in Tag plugin
 * ref: http://stackoverflow.com/a/9795091
 * http://jsbin.com/hawog/1/edit?html,css,js,output
 */
jQuery.fn.wrapInTag = function (opts) {
	// http://stackoverflow.com/a/1646618
	function getText(obj) {
		return obj.textContent ? obj.textContent : obj.innerText;
	}

	var tag = opts.tag || 'strong',
		attr = opts.attr || '',
		words = opts.words || [],
		regex = RegExp(words.join('|'), 'gi'),
		replacement = '<' + tag + ' ' + attr + '>$&</' + tag + '>';

	// http://stackoverflow.com/a/298758
	jQuery(this).contents().each(function () {
		if (this.nodeType === 3) //Node.TEXT_NODE
		{
			// http://stackoverflow.com/a/7698745
			jQuery(this).replaceWith(getText(this).replace(regex, replacement));
		}
		else if (!opts.ignoreChildNodes) {
			jQuery(this).wrapInTag(opts);
		}
	});
};

// No-jQuery version based on Ben Clayton's solution.
// "touchmove" event.
/*( function( $ ) {
	$.fn.noClickDelay = function() {
		var $wrapper = this;
		var $target = this;
		var moved = false;
		$wrapper.bind('touchstart mousedown',function(e) {
			e.preventDefault();
			moved = false;
			$target = $(e.target);
			if($target.nodeType == 3) {
				$target = $($target.parent());
			}
			$target.addClass('pressed');
			$wrapper.bind('touchmove mousemove',function(e) {
				moved = true;
				$target.removeClass('pressed');
			});
			$wrapper.bind('touchend mouseup',function(e) {
				$wrapper.unbind('mousemove touchmove');
				$wrapper.unbind('mouseup touchend');
				if(!moved && $target.length) {
					$target.removeClass('pressed');
					$target.trigger('click');
					$target.focus();
				}
			});
		});
	};
})( jQuery );*/

/***************/
/** BEGIN OF DOC.READY FUNCTION **/
/***************/
//jQuery(function(){});
document.addEventListener('DOMContentLoaded', initOnDomReadys, false);

/***************/
/** BEGIN OF WINDOW.LOAD AND WINDOW.RESIZE FUNCTION **/
/***************/
initOnLoads();
//initOnLoadsAndOnResizes();
/*var prefix = window.addEventListener ? "" : "on";
var eventName = window.addEventListener ? "addEventListener" : "attachEvent";
console.log(prefix);
console.log(eventName);*/
//document.body[eventName](prefix + "load", initOnLoadsAndOnResizes, false);
//window.onload = initOnLoadsAndOnResizes;
window.addEventListener('load', initOnLoadsAndOnResizes, false);

// remove loader animation on masterslider after page load
win.load(function() {
	setTimeout(function() {
		masterslider_loader.show('fadeOut', {}, 500).addClass('hide');
	}, 2000);
});

var resizeTimer;
//window.addEventListener('resize', initOnLoadsAndOnResizes);
window.addEventListener('resize', function(e) {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(initOnLoadsAndOnResizes, 300);
}, false);
