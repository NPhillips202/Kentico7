// FUNCTIONS

// calc header height
function headerHeight() {
	var header_height = jQuery('.header-wrapper').outerHeight();
   console.log(header_height);
	jQuery('#wrapper').css('marginTop', header_height + 'px');
}
// booking open event functions
function bookingMaskOpenEvent(bg, div, target, close){
	//bg.fadeIn().addClass('booking-engine-bg-open');
	div.addClass('booking-engine-open');
	target.addClass('booking-mask-open');
	close.fadeIn().addClass('booking-engine-open');
}
// booking close event functions
function bookingMaskCloseEvent(bg, div, target, close){
	//bg.fadeOut().removeClass('booking-engine-bg-open');
	div.removeClass('booking-engine-open');
	target.removeClass('booking-mask-open');
	close.fadeOut().removeClass('booking-engine-open');
}
// datepicker_first_date_selected
function datepicker_first_date_selected(obj, curr_check_in_out_dates, value, fValue) {
	var check_in_date_val = moment(obj.date1).format(value),
		check_out_date_val = moment(obj.date2).format(value),
		is_out_same_as_in = (moment(check_out_date_val).isSame(check_in_date_val)) ? 1 : 0,
		is_out_before_in = (moment(check_out_date_val).isBefore(check_in_date_val)) ? 1 : 0,
		curr_check_in_date = curr_check_in_out_dates.find('.check-in-date'),
		curr_check_out_date = curr_check_in_out_dates.find('.check-out-date');

	// set check-in date first
	curr_check_in_date.attr('value',check_in_date_val);
	//curr_check_in_date.val(check_in_date_val);


	//console.log(curr_check_in_out_dates.length);
	//console.log(curr_check_in_date.length);
	//console.log(is_out_before_in);
	//console.log(is_out_same_as_in);

	//alert('before:'+check_in_date_val);


	// set check-out date last
	if(is_out_before_in || is_out_same_as_in) {
		curr_check_out_date.attr('value',fValue);
		//curr_check_out_date.val(fValue);
	} else {
		curr_check_out_date.attr('value',check_out_date_val);
		//curr_check_out_date.val(check_out_date_val);
	}


	//alert('after:'+check_in_date_val);



	// remove error border
	//check_in_date.removeClass('error');
	// flash INPUT
	curr_check_in_date.animateHighlight('yellow', 1000);
	//check_in_date.animateHighlight("rgb(255,230,132)", 1000);
}
// datepicker_change
function datepicker_change(obj, curr_check_in_out_dates, value) {
	// set check-out date last
	var check_out_date_val = moment(obj.date2).format(value),
		curr_check_out_date = curr_check_in_out_dates.find('.check-out-date');


	//console.log(curr_check_out_date.parent().html());


	// set check-out date first
	curr_check_out_date.attr('value',check_out_date_val);
	//curr_check_out_date.val(check_out_date_val);


	//console.log(curr_check_out_date.parent().html());



	// remove error border
	//check_out_date.removeClass('error');
	// flash INPUT
	curr_check_out_date.animateHighlight('yellow', 1000);
	//check_out_date.animateHighlight("rgb(255,230,132)", 1000);
}
// initDateRangePicker
function initDateRangePicker() {

	// set vars and functions
	var booking_mask_nav = jQuery('#booking-mask-wrapper'),
		booking_mask_bg = jQuery('#booking-engine-bg'),
		booking_mask_div = jQuery('#booking-engine_widget'),
		booking_mask_fields = jQuery('#booking-mask-fields'),
		booking_mask_button = booking_mask_nav.find('> a'),
		booking_mask_button_close = booking_mask_nav.find('.close-me'),

		// date picker range vars
		//fields = jQuery('.fields'),
		check_in_out_dates_wrapper = jQuery('.check-in-out-dates-wrapper'),
		check_in_out_dates = booking_mask_fields.find('.check-in-out-dates'),
		//check_in_out_dates = jQuery('.check-in-out-dates'),

		number_inputs = jQuery('input[etype="number"]'),

		check_in_date = jQuery('.check-in-date'),
		check_out_date = jQuery('.check-out-date'),

		clear_dates = jQuery('.clear-dates'),

		nowValue = new Date(),
		defaultValue = 'MM/DD/YYYY',
		fillInValue = '__/__/____';

	// init date range picker
	if(check_in_out_dates.length) {
		// set some constants
		jQuery.dateRangePickerLanguages['en'] = {
			'selected': 'Choosed:',
			'days': 'Days',
			'apply': 'Close',
			'week-1' : 'Mon',
			'week-2' : 'Tue',
			'week-3' : 'Wed',
			'week-4' : 'Thu',
			'week-5' : 'Fri',
			'week-6' : 'Sat',
			'week-7' : 'Sun',
			'month-name': ['January','February','March','April','May','June','July','August','September','October','November','December'],
			'shortcuts' : 'Shortcuts',
			'past': 'Past',
			'7days' : '7days',
			'14days' : '14days',
			'30days' : '30days',
			'previous' : 'Previous',
			'prev-week' : 'Week',
			'prev-month' : 'Month',
			'prev-quarter' : 'Quarter',
			'prev-year' : 'Year',
			'less-than' : 'Date range should longer than %d days',
			'more-than' : 'Date range should less than %d days',
			'default-more' : 'Please select a date range longer than %d days',
			'default-less' : 'Please select a date range less than %d days',
			'default-range' : 'Please select a date range between %d and %d days',
			//'default-default': 'This is costom language'
		};

		// config object
		function configObject(container, check_in, check_out) {
			return defaultOptions = {
				format: defaultValue,
				container: container,
				separator : ' to ',
				language: 'en',

				stickyMonths: true,
				startDate: nowValue,
				selectForward: true,

				//showTopbar: false,

				hoveringTooltip: function(days) {
					var D = ['','<span style="white-space:nowrap;">Please select another date</span>','Two', 'Three','Four','Five'];
					return D[days] ? D[days] : days+' days';
				},
				getValue: function() {
					if (check_in.val() && check_out.val() )
						return check_in.val() + ' to ' + check_out.val();
					else
						return '';
				},
				setValue: function(s,s1,s2) {
					check_in.val(s1);
					check_out.val(s2);
				},
			};
		};

		// specials details booking mask widget section
		check_in_out_dates_wrapper.dateRangePicker(configObject('#hotel-booking-date-range-container', check_in_date, check_out_date))
		.bind('datepicker-first-date-selected', function(event, obj){
			// This event will be triggered when first date is selected
			datepicker_first_date_selected(obj, check_in_out_dates_wrapper, defaultValue, fillInValue);
		})
		.bind('datepicker-change', function(event, obj){
			// This event will be triggered when second date is selected
			datepicker_change(obj, check_in_out_dates_wrapper, defaultValue);
		})
		.bind('datepicker-closed', function(){
			/* This event will be triggered after date range picker close animation */
			//console.log('after close');
			jQuery('.booking-key').addClass('hide');
		})
		.bind('datepicker-open', function(){
			/* This event will be triggered before date range picker open animation */
			//console.log('before open');
		})
		.bind('datepicker-opened', function(){
			/* This event will be triggered after date range picker open animation */
			//console.log('after open');
			jQuery('.booking-key').removeClass('hide');
		});

		// onload events
		//booking_mask_fields.data('dateRangePicker').setDateRange(moment().format(defaultValue), moment().add(1, 'days').format(defaultValue), true);

		// clear calendar
		clear_dates.click(function(e) {
			e.stopPropagation();
			var clear_date = jQuery(this),
				clear_date_parent = clear_date.closest('.booking-engine').find('.check-in-out-dates-wrapper');
			clear_date_parent.data('dateRangePicker').clear();
			clear_date_parent.find('input').val(defaultValue);
			//check_in_out_dates.data('dateRangePicker').clear();
			//check_in_out_dates.find('input').val(defaultValue);
			return false;
		});
	}

	// animated highlight
	var notLocked = true;
	jQuery.fn.animateHighlight = function(highlightColor, duration) {
		var highlightBg = highlightColor || "initial";
		var animateMs = duration || 1500;
		var originalBg = this.css("backgroundColor");

		if (notLocked) {
			notLocked = false;
			this.stop().css("background-color", highlightBg)
				.animate({backgroundColor: originalBg}, animateMs);
				//.animate({'background-color': 'transparent'}, animateMs);
			setTimeout( function() { notLocked = true; }, animateMs);
		}
	};

	// Allow only Numbers in text box
	number_inputs.keypress(function (e) {
		//if the letter is not digit then display error and don't type anything
		if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
			//display error message
			//jQuery("#errmsg").html("Digits Only").show().fadeOut("slow");
			return false;
		}
	});
	// add slashes while typing
	number_inputs.keyup(function (e) {
		var textSoFar = jQuery(this).val();
		if (e.keyCode != 191) {
			if (e.keyCode != 8) {
				if (textSoFar.length == 2 || textSoFar.length == 5) {
					jQuery(this).val(textSoFar + "/");
				}
				//to handle copy & paste of 8 digit
				else if (e.keyCode == 86 && textSoFar.length == 8) {
					jQuery(this).val(textSoFar.substr(0, 2) + "/" + textSoFar.substr(2, 2) + "/" + textSoFar.substr(4, 4));
				}
			} else {
				//backspace would skip the slashes and just remove the numbers
				if (textSoFar.length == 5) {
					jQuery(this).val(textSoFar.substring(0, 4));
				}
				else if (textSoFar.length == 2) {
					jQuery(this).val(textSoFar.substring(0, 1));
				}
			}
		} else {
			//remove slashes to avoid 12//01/2014
			jQuery(this).val(textSoFar.substring(0, textSoFar.length - 1));
		}
	});

	// booking mask toggle (NAV ONLY)
	booking_mask_button.click(function(){
		var target = jQuery(this);
		if(target.is('.booking-mask-open')){
			bookingMaskCloseEvent(booking_mask_bg, booking_mask_div, target, booking_mask_button_close);
			target.removeClass('booking-mask-open');
		} else {
			bookingMaskOpenEvent(booking_mask_bg, booking_mask_div, target, booking_mask_button_close);
			target.addClass('booking-mask-open');
		}
		return false;
	});
	booking_mask_button_close.click(function() {
		if(booking_mask_button.is('.booking-mask-open')){
			//bookingMaskCloseEvent(booking_mask_bg, booking_mask_div, booking_mask_button, jQuery(this));
			bookingMaskCloseEvent(booking_mask_bg, booking_mask_div, booking_mask_button, booking_mask_button_close);
		}
		return false;
	});
	booking_mask_div.outside('click', function(ev) {
		if(booking_mask_button.is('.booking-mask-open')){
			bookingMaskCloseEvent(booking_mask_bg, booking_mask_div, booking_mask_button, booking_mask_button_close);
		}
	});
	jQuery(document).keyup(function(e) {
		if (booking_mask_button.is('.booking-mask-open') && e.keyCode === 27) {
			bookingMaskCloseEvent(booking_mask_bg, booking_mask_div, booking_mask_button, booking_mask_button_close);
		}
	});
}

// init Accordion
// ref: http://inspirationalpixels.com/tutorials/creating-an-accordion-with-html-css-jquery
/*!
 * Vallenato 1.0
 * A Simple JQuery Accordion
 *
 * Designed by Switchroyale
 *
 * Use Vallenato for whatever you want, enjoy!
 */
function initAccordion(default_elem, mobile_only) {
	// get start time
	//console.time('initAccordion');

	// Default Element
	//var default_elem = typeof a !== 'undefined' ? default_elem : jQuery('.policies');
	var default_elem = default_elem || jQuery('.accordion');
	var mobile_only = mobile_only || false;
	var do_effect = true;

	//Add Inactive Class To All Accordion Headers
	default_elem.find('.accordion-header').toggleClass('inactive-header');

	//Set The Accordion Content Width
	var contentwidth = default_elem.find('.accordion-header').width();
	default_elem.find('.accordion-content').css({'width' : contentwidth });

	//console.log('default_elem headers',default_elem.find('.accordion-header').length);
	default_elem.find('.accordion-header').each(function(){
		//console.log('HTML',jQuery(this).html());
			//console.log('radios & checkboxes',jQuery(this).next().find(':radio, :checkbox').length);
			//console.log('checked radios & checkboxes',jQuery(this).next().find(':radio:checked:not([value=":"]), :checkbox:checked').length);
		//console.log(default_elem.find('.accordion-header').next().find(':radio, :checkbox').val());

		if(jQuery(this).next().find(':radio:checked:not([value=":"])').length) {
			// Open The First Accordion Section When Page Loads

				//console.log(jQuery(this).next().find(':radio:checked:not([value=":"])').closest('.accordion-content').prev('.accordion-header').html());

			jQuery(this).next().find(':radio:checked:not([value=":"])').closest('.accordion-content').prev('.accordion-header').toggleClass('active-header').toggleClass('inactive-header');
			jQuery(this).next().find(':radio:checked:not([value=":"])').closest('.accordion-content').slideDown().toggleClass('open-content');
		}
	});
	// Open The First Accordion Section When Page Loads
	//default_elem.find('.accordion-header').first().toggleClass('active-header').toggleClass('inactive-header');
	//default_elem.find('.accordion-content').first().slideDown().toggleClass('open-content');

	// Mobile ONLY
	/*if(mobile_only == true) {
		win.on('resize', function() {
			if (getViewport() < 479) {
				do_effect = true;
			} else {
				do_effect = false;
				default_elem.find('.accordion-header').toggleClass('inactive-header');
			}
			//console.log(mobile_only, do_effect);
		});
	}*/

	// The Accordion Effect
	if(do_effect == true) {
		default_elem.find('.accordion-header').click(function (e) {
			var curr_header = jQuery(this),
				active_header = jQuery('.active-header'),
				curr_content = curr_header.next();


			//console.log(active_header.toggleClass('active-header').toggleClass('inactive-header').next().find(':radio, :checkbox').length);
			//console.log(active_header.toggleClass('active-header').toggleClass('inactive-header').next().find(':radio, :checkbox').val());

			console.log(curr_header.is('.inactive-header'));

			if(curr_header.is('.inactive-header')) {
				//active_header.toggleClass('active-header').toggleClass('inactive-header').next().slideToggle().toggleClass('open-content');
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
}


//--Mobile navigation slideout menu
function initMobileMenu() {
	jQuery('#main-menu').mmenu({
		// Options
		navbar: {
			title: 'Passport LE Hotels'
		},
		extensions: [
			"lehotels",
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
		offCanvas: {
			//menuWrapperSelector: "#wrapper",
			//pageNodetype: "form",
			pageSelector: "#wrapper"
		}
	}).on('init', function(){
		var menu = jQuery('.mm-panel').first(),
			topMenu = jQuery('#top-menu > ul').clone(),
			topMenuLIs = topMenu.find('> li'),
			//footerMenu = jQuery('#footer-menu > ul').clone(),
			//footerMenuLIs = footerMenu.find('> li'),
			//findAhotel = jQuery('#header .extras'),
			socialBar = jQuery('#top-menu > .socials').clone();//,
			//bookingMaskWrapper = jQuery('#booking-mask-wrapper').clone().attr('id','booking-mask-wrapper_mm');

		//console.log(topMenu);
		//console.log(topMenuLIs.length);

		// insert items
		//topMenu.clone().appendTo(menu.children('ul'));
		for (var i = topMenuLIs.length - 1; i >= 0; i--) {
			// reverse list order of the Top Menu
			jQuery(topMenuLIs[i]).appendTo(menu.children('ul'));
		}
		/*for (var i = footerMenuLIs.length - 1; i >= 0; i--) {
			// reverse list order of the Top Menu
			jQuery(footerMenuLIs[i]).appendTo(menu.children('ul'));
		}*/
		//findAhotel.prependTo(menu);
		socialBar.appendTo(menu);
		//bookingMaskWrapper.prependTo(menu);
	}).trigger( "init" );
}


//-- Specials Sorter
function specialsSorter() {
	jQuery('.special-packages-sorter').change(function(){
		var urlToCheck = location.protocol + "//" + window.location.hostname + "?orderby=" + jQuery(this).val();
		window.location.assign(window.location.pathname + "?orderby=" + jQuery(this).val().replace(/[&]+/g,"%26") + '&mock=true');
	});
}


// Set Viewport
function getViewport() {
	// get start time
	//console.time('getViewport');

	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
	return x;

	console.timeEnd('getViewport');
	// add up time to get load time
}


// get query string
function getQuery(q) {
	return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
}


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

jQuery(function() {

	// TEMP!!!!!
	/*if(getQuery('mock') == 'true' && getQuery('no-mock') != 'true') {
		//jQuery('#wrapper a:not(.arrow-wrap), footer a, .sitemap-float a').each(function() {
		jQuery('#wrapper header .wrapper a, #wrapper header #main-menu > ul a, #wrapper #photo, #content-area #photo, #regions-map a, #content-area a, footer a, .sitemap-float a').not('.arrow-wrap').each(function() {
			//if(jQuery(this).closest('.Calendar > table > td[colspan="7"]').length == 0) {
			if(jQuery(this).closest('td[colspan="7"]').length == 0) {
				//console.log(jQuery(this).attr('href').split('?')[1] ? '&':'?');
				var _url = jQuery(this).attr('href') + (jQuery(this).attr('href').split('?')[1] ? '&':'?') + 'mock=true';
				jQuery(this).attr('href', _url);
				//jQuery(this).attr('href', jQuery(this).attr('href') + '?mock=true');
			}
			//console.log(window.location.pathname);
		});
	}*/

	headerHeight();
	if(getViewport() > 940) {
		initDateRangePicker();
	}
	initAccordion();
	initMobileMenu();
	//initAccordion(jQuery('.specials .list__item.accordion .list__item__inner'), true);

	specialsSorter();

	//
	//jQuery('select[name="property"]').find('option:empty').addClass('hide');
	//jQuery('.stylish-select .newList li').find('a:empty').addClass('hide');

	// Double tap functionality
	// ref: http://stackoverflow.com/questions/24058241/touch-device-single-and-double-tap-events-handler-jquery-javascript
	var tapped = false;
	jQuery("#main-menu > ul > li > a").on("touchstart",function(e){
		jQuery('#main-menu > ul > li').removeClass('touchstart');
		if(!tapped){
			tapped = setTimeout(function(){
				//single_tap()
				tapped = null;
				console.log('single');
				jQuery(this).closest('li').addClass('touchstart');
			}, 300); // wait 300ms
		} else {
			clearTimeout(tapped);
			tapped = null;
			//double_tap()
			console.log('double');
			return true;
		}
		e.preventDefault()
	});

	// responsive sidebar menu
	//var menu = jQuery('#left-sidebar nav ul.submenu');
	var menu = jQuery('nav > ul.submenu');
	//console.log('hello...');
	//jQuery('#openup').live('click', function(e) {
	jQuery('#openup').on('click', function(e) {
		e.preventDefault();
		menu.slideToggle();
	});
	jQuery(window).resize(function() {
		var w = jQuery(this).width();
		if(w > 650 && menu.is(':hidden')) {
			menu.removeAttr('style');
		}
	});
	jQuery('nav > ul.submenu li').on('click', function(e) {
		var w = jQuery(window).width();
		if(w < 650 ) {
			menu.slideToggle();
		}
	});
	jQuery('.open-menu').height(jQuery(window).height());
});

/*document.addEventListener('DOMContentLoaded', function () {
	headerHeight();
	initDateRangePicker();
});*/

/*jQuery(window).bind('resize', function () { headerHeight(); }).trigger('resize');*/
jQuery(window).resize(function() { headerHeight(); });


/*jQuery(function() {
	// TypeHead
	var substringMatcher = function(strs, index) {
		return function findMatches(q, cb) {
			var matches, substringRegex;

			// an array that will be populated with substring matches
			matches = [];

			// regex used to determine if a string contains the substring `q`
			substrRegex = new RegExp(q, 'i');

			// iterate through the pool of strings and for any string that
			// contains the substring `q`, add it to the `matches` array
			jQuery.each(strs, function(i, str) {
				if (substrRegex.test(str[index])) {
					matches.push(str[index]);
				}
			});

			cb(matches);
		};
	};

	jQuery('.destination-and-hotel > .text').typeahead({
		hint: true,
		highlight: true,
		minLength: 1
	},
	{
		name: 'destination',
		source: substringMatcher(states, 0),
		templates: {
			header: '<div class="tt-name">Location</div>',
			footer: '<div style="padding:5px;"></div>',
			suggestion: function (display) {
				return jQuery("<a>").text(display).attr('href','#');
			}
		}
	});
});*/
