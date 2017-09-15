// FUNCTIONS

// calc header height
function headerHeight() {
	var header_height = jQuery('.header-wrapper').outerHeight();
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
	curr_check_in_date.val(check_in_date_val);
	// set check-out date last
	if(is_out_before_in || is_out_same_as_in) {
		curr_check_out_date.val(fValue);
	} else {
		curr_check_out_date.val(check_out_date_val);
	}
	// remove error border
	//check_in_date.removeClass('error');
	// flash INPUT
	curr_check_in_date.animateHighlight('yellow', 1000);
	//check_in_date.animateHighlight("rgb(255,230,132)", 1000);
};
// datepicker_change
function datepicker_change(obj, curr_check_in_out_dates, value) {
	// set check-out date last
	var check_out_date_val = moment(obj.date2).format(value),
		curr_check_out_date = curr_check_in_out_dates.find('.check-out-date');

	// set check-out date first
	curr_check_out_date.val(check_out_date_val);
	// remove error border
	//check_out_date.removeClass('error');
	// flash INPUT
	curr_check_out_date.animateHighlight('yellow', 1000);
	//check_out_date.animateHighlight("rgb(255,230,132)", 1000);
};
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
			datepicker_first_date_selected(obj, check_in_out_dates, defaultValue, fillInValue);
		})
		.bind('datepicker-change', function(event, obj){
			// This event will be triggered when second date is selected
			datepicker_change(obj, check_in_out_dates, defaultValue);
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
	headerHeight();
	initDateRangePicker();
});
/*document.addEventListener('DOMContentLoaded', function () {
	headerHeight();
	initDateRangePicker();
});*/

/*jQuery(window).bind('resize', function () { headerHeight(); }).trigger('resize');*/
jQuery(window).resize(function() { headerHeight(); });


jQuery(function() {
	// TypeHead
	var substringMatcher = function(strs) {
		return function findMatches(q, cb) {
			var matches, substringRegex;

			// an array that will be populated with substring matches
			matches = [];

			// regex used to determine if a string contains the substring `q`
			substrRegex = new RegExp(q, 'i');

			// iterate through the pool of strings and for any string that
			// contains the substring `q`, add it to the `matches` array
			jQuery.each(strs, function(i, str) {
				if (substrRegex.test(str)) {
					matches.push(str);
				}
			});

			cb(matches);
		};
	};

	/*var states = [
		'Alabama',
		'Alaska',
		'Arizona',
		'Arkansas',
		'California',
		'Colorado',
		'Connecticut',
		'Delaware',
		'Florida',
		'Georgia',
		'Hawaii',
		'Idaho',
		'Illinois',
		'Indiana',
		'Iowa',
		'Kansas',
		'Kentucky',
		'Louisiana',
		'Maine',
		'Maryland',
		'Massachusetts',
		'Michigan',
		'Minnesota',
		'Mississippi',
		'Missouri',
		'Montana',
		'Nebraska',
		'Nevada',
		'New Hampshire',
		'New Jersey',
		'New Mexico',
		'New York',
		'North Carolina',
		'North Dakota',
		'Ohio',
		'Oklahoma',
		'Oregon',
		'Pennsylvania',
		'Rhode Island',
		'South Carolina',
		'South Dakota',
		'Tennessee',
		'Texas',
		'Utah',
		'Vermont',
		'Virginia',
		'Washington',
		'West Virginia',
		'Wisconsin',
		'Wyoming'
	];*/

	var florida = [
		'Hotel 1, - Miami, FL',
		'Hotel 2, - Miami, FL',
		'Hotel 3, - Miami, FL',
		'Hotel 4, - Miami, FL',
		'Hotel 5, - Miami, FL',
		'Hotel 6, - Miami, FL',
		'Hotel 7, - Boca Raton, FL',
		'Hotel 8, - Fort Lauderdale, FL',
		'Hotel 9, - Tallahassee, FL',
		'Hotel 10, - Miami, FL',
	];

	jQuery('.destination-and-hotel > .text').typeahead({
		hint: true,
		highlight: true,
		minLength: 1
	},
	{
		name: 'destination',
		source: substringMatcher(states),
		templates: {
			header: '<div class="tt-name">California, USA</div>',
			footer: '<div style="padding:5px;"></div>',
		}
	},
	{
		name: 'destination',
		source: substringMatcher(florida),
		templates: {
			header: '<div class="tt-name">Florida, USA</div>',
			footer: '<div style="padding:5px;"></div>',
		}
	});

});
