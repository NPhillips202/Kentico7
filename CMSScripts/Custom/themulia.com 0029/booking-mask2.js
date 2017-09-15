
// Define booking mask functions and events dependencies
document.addEventListener('DOMContentLoaded', function () {

	// set vars and functions
	var booking_mask_nav = jQuery('#bookingmask-nav'),
		booking_mask_bg = jQuery('#booking-engine-bg'),
		booking_mask_div = jQuery('#booking-engine_widget'),
		booking_mask_div_content = jQuery('#booking-engine_content'),
		booking_mask_button = booking_mask_nav.find('> .button'),
		booking_mask_button_close = booking_mask_nav.find('.close-me'),

		// date picker range vars
		check_in_out_dates = jQuery('.check-in-out-dates'),
		check_in_out_dates__nav = jQuery('#check-in-out-dates1'),
		check_in_out_dates__content = jQuery('#check-in-out-dates2'),
		number_inputs = jQuery('input[etype="number"]'),

		check_in_date = jQuery('.check-in-date'),
		check_in_date1 = booking_mask_div.find('.check-in-date'),
		check_in_date2 = booking_mask_div_content.find('.check-in-date'),
		check_out_date = jQuery('.check-out-date'),
		check_out_date1 = booking_mask_div.find('.check-out-date'),
		check_out_date2 = booking_mask_div_content.find('.check-out-date'),

		clear_dates = jQuery('.clear-dates'),

		nowValue = new Date(),
		defaultValue = 'MM/DD/YYYY',
		fillInValue = '__/__/____';

	// booking open/close event functions
	function bookingMaskOpenEvent(bg, div, target, close){
		bg.fadeIn().addClass('booking-engine-bg-open');
		div.addClass('booking-engine-open');
		target.addClass('booking-mask-open');
		close.fadeIn().addClass('booking-engine-open');
	};
	function bookingMaskCloseEvent(bg, div, target, close){
		bg.fadeOut().removeClass('booking-engine-bg-open');
		div.removeClass('booking-engine-open');
		target.removeClass('booking-mask-open');
		close.fadeOut().removeClass('booking-engine-open');
	};

	// datepicker_first_date_selected
	function datepicker_first_date_selected(obj, curr_check_in_out_dates) {
		var check_in_date_val = moment(obj.date1).format(defaultValue),
			check_out_date_val = moment(obj.date2).format(defaultValue),
			is_out_same_as_in = (moment(check_out_date_val).isSame(check_in_date_val)) ? 1 : 0,
			is_out_before_in = (moment(check_out_date_val).isBefore(check_in_date_val)) ? 1 : 0,
			curr_check_in_date = curr_check_in_out_dates.find('.check-in-date'),
			curr_check_out_date = curr_check_in_out_dates.find('.check-out-date');

		// set check-in date first
		curr_check_in_date.val(check_in_date_val);
		// set check-out date last
		if(is_out_before_in || is_out_same_as_in) {
			curr_check_out_date.val(fillInValue);
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
	function datepicker_change(obj, curr_check_in_out_dates) {
		// set check-out date last
		var check_out_date_val = moment(obj.date2).format(defaultValue),
			curr_check_out_date = curr_check_in_out_dates.find('.check-out-date');

		// set check-out date first
		curr_check_out_date.val(check_out_date_val);
		// remove error border
		//check_out_date.removeClass('error');
		// flash INPUT
		curr_check_out_date.animateHighlight('yellow', 1000);
		//check_out_date.animateHighlight("rgb(255,230,132)", 1000);
	};

	/*
	define a new language named "custom"
	*/
	/*jQuery.dateRangePickerLanguages['cn'] = {
	    'selected': '已选:'
	    //'to': '至',
	};*/
	jQuery.dateRangePickerLanguages['jp'] = {
	    'selected': '選択された日程:',
	    'days': '日間'
		//'to':'から',
	};
	jQuery.dateRangePickerLanguages['kr'] = {
	    'selected': '선택기간:'
		//'to':'부터',
	};
	/*jQuery.dateRangePickerLanguages['ru'] = {
	    'selected': 'Период:'
		//'to':'по',
	};*/
	/*jQuery.dateRangePickerLanguages['custom'] = {
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
	    'default-default': 'This is costom language'
	};*/

	// init date range picker
	if(check_in_out_dates.length) {

		var _separator = function(lang){
			lang = lang.toString().toLowerCase();
			if(lang == 'zh-cn'){
				separator = ' 至 ';
			} else if(lang == 'ja-jp') {
				separator = ' から ';
			} else if(lang == 'ko-kr') {
				separator = ' 부터 ';
			} else if(lang == 'ru-ru') {
				separator = ' по ';
			} else {
				separator = ' to ';
			}
			return separator;
		};
		var _drpLang = function(lang){
			lang = lang.toString().toLowerCase();
			if(lang == 'zh-cn'){
				lang = 'cn';
			} else if(lang == 'ja-jp') {
				lang = 'jp';
			} else if(lang == 'ko-kr') {
				lang = 'kr';
			} else if(lang == 'ru-ru') {
				lang = 'ru';
			} else {
				lang = 'en';
			}
			return lang;
		};
		// en, ru, cn,
		// need kr, jp
		/*
		console.log(lang);
		//console.log(_lang);
		//console.log(_lang.split('-').pop());
		console.log('_separator: ' + _separator(lang));
		console.log('drpLang: ' + _drpLang(lang));
		*/
		console.log('nowValue: ' + nowValue);
		console.log('nowValue.toString(): ' + nowValue.toString());

		var separator = _separator(lang);
		var drpLang = _drpLang(lang);
		var configObject = function(container, check_in, check_out) {
			//console.log(drpLang);
			//console.log(drpLang.toString());
			//console.log(nowValue);
			//console.log(nowValue.toString());
			return defaultOptions = {
				format: defaultValue,

				separator: separator,
				language: drpLang.toString(),

				stickyMonths: true,

				inline: true,
				container: container,
				//container: '#hotel-booking-date-range-container1, #hotel-booking-date-range-container2',
				//container: '.hotel-booking-date-range-container',
				alwaysOpen: true,

				startDate: nowValue,
				//startDate: nowValue.toString(),
				selectForward: true,
				hoveringTooltip: function(days) {
					var D = ['','<span style="white-space:nowrap;">Please select another date</span>','Two', 'Three','Four','Five'];
					return D[days] ? D[days] : days+' days';
				},
				setValue: function(s,s1,s2) {
					check_in.val(s1);
					check_out.val(s2);
				},
			};
		};

		// mobile device adjustments for datepicker

		// refs: https://github.com/moment/moment/issues/1407
		// http://stackoverflow.com/questions/3505693/difference-between-datedatestring-and-new-datedatestring

		//console.log(isMobile.matches);
		//console.log(Modernizr.touch);
		//console.log(!Modernizr.touch);
		//if (getViewport() < 740 || !Modernizr.touch || !Modernizr.inputtypes.date) {
		if (check_in_out_dates.length && isMobile.matches && 0) {
			check_in_out_dates.find('input').each(function() {
				jQuery(this).get(0).type = 'date';
				//alert(jQuery(this).get(0).type);

				//jQuery(this).get(0).value = 'mm/dd/yy';
				//if(jQuery(this).closest('.check-in-out-dates').is('#check-in-out-dates1'))
				//	check_in_out_dates__nav.data('dateRangePicker').destroy();
				//if(jQuery(this).closest('.check-in-out-dates').is('#check-in-out-dates2'))
				//	check_in_out_dates__content.data('dateRangePicker').destroy();

				//check_in_out_dates__content.data('dateRangePicker').setDateRange(moment().format(defaultValue), moment().add(1, 'days').format(defaultValue), true);
			});
		}

		if(check_in_out_dates__nav.length) {
			// booking mask widget section
			check_in_out_dates__nav.dateRangePicker(configObject('#hotel-booking-date-range-container1', check_in_date1, check_out_date1))
			.bind('datepicker-first-date-selected', function(event, obj){
				/* This event will be triggered when first date is selected */
				// obj will be something like this:
				// {
				// 		date1: (Date object of the earlier date)
				// }
				//console.log('first-date-selected', obj);
				datepicker_first_date_selected(obj, check_in_out_dates__nav);
			})
			.bind('datepicker-change', function(event, obj){
				/* This event will be triggered when second date is selected */
				// obj will be something like this:
				// {
				// 		date1: (Date object of the earlier date),
				// 		date2: (Date object of the later date),
				//		value: "2013-06-05 to 2013-06-07"
				// }
				//console.log('change', obj);
				datepicker_change(obj, check_in_out_dates__nav);
			});

			// onload events
			check_in_out_dates__nav.data('dateRangePicker').setDateRange(moment().format(defaultValue), moment().add(1, 'days').format(defaultValue), true);
		}

		if(check_in_out_dates__content.length) {
			// specials details booking mask widget section
			check_in_out_dates__content.dateRangePicker(configObject('#hotel-booking-date-range-container2', check_in_date2, check_out_date2))
			.bind('datepicker-first-date-selected', function(event, obj){
				/* This event will be triggered when first date is selected */
				// obj will be something like this:
				// {
				// 		date1: (Date object of the earlier date)
				// }
				//console.log('first-date-selected', obj);
				datepicker_first_date_selected(obj, check_in_out_dates__content);
			})
			.bind('datepicker-change', function(event, obj){
				/* This event will be triggered when second date is selected */
				// obj will be something like this:
				// {
				// 		date1: (Date object of the earlier date),
				// 		date2: (Date object of the later date),
				//		value: "2013-06-05 to 2013-06-07"
				// }
				//console.log('change', obj);
				datepicker_change(obj, check_in_out_dates__content);
			});

			// onload events
			check_in_out_dates__content.data('dateRangePicker').setDateRange(moment().format(defaultValue), moment().add(1, 'days').format(defaultValue), true);
		}

		// onload events
		//check_in_out_dates.data('dateRangePicker').setDateRange(moment().format(defaultValue), moment().add(1, 'days').format(defaultValue), true);
		//check_in_out_dates__nav.data('dateRangePicker').setDateRange(moment().format(defaultValue), moment().add(1, 'days').format(defaultValue), true);
		//check_in_out_dates__content.data('dateRangePicker').setDateRange(moment().format(defaultValue), moment().add(1, 'days').format(defaultValue), true);

		// onclick & onchange event for check-in
		check_in_date.on('click change', function(){
			var input = jQuery(this),
				val = input.val(),
				date = moment().format(defaultValue),
				start_date = jQuery('.start-day').text(),
				end_date = jQuery('.end-day').text(),
				start_same_as_end = (moment(start_date).isSame(end_date)) ? 1 : 0,
				val_same_as_start = (moment(val).isSame(start_date)) ? 1 : 0,
				val_less_than_today = (moment(val).isBefore(moment().format(defaultValue))) ? 1 : 0,
				//no_slash_start_date = start_date.replace(/-|\//g, ""),

				datepickerranger = jQuery(input.closest('.check-in-out-dates').data('dateRangePicker').getDatePicker()),
				//datepickerranger = jQuery(check_in_out_dates.data('dateRangePicker').getDatePicker()),
				datepickerranger_first_table = datepickerranger.find('.first-date-selected.toMonth').closest('table');

			/*
			//console.log('val: ' + val);
			//console.log('start_date: ' + start_date);
			//console.log('end_date: ' + end_date);
			//console.log(datepickerranger.length);
			//console.log(datepickerranger_first_table.length);

			var check_in_out_dates_elem = jQuery(check_in_out_dates.data('dateRangePicker').getDatePicker());
			var check_in_out_dates_first = check_in_out_dates_elem.find('.first-date-selected');
			var check_in_out_dates_last = check_in_out_dates_elem.find('.last-date-selected');
			//console.log(check_in_out_dates.data('dateRangePicker'));
			//console.log(check_in_out_dates.data('getDatePicker'));
			console.log(check_in_out_dates_first.attr('time'));
			console.log('momented: ');
				console.log(moment("/Date(" + check_in_out_dates_first.attr('time') + ")/").format(defaultValue));
			console.log(check_in_out_dates_last.attr('time'));
			console.log('momented: ');
				console.log(moment("/Date(" + check_in_out_dates_last.attr('time') + ")/").format(defaultValue));
			*/

			//input.removeClass('error');
			/*console.log('----------');
			console.log('start date');
			console.log('----------');
			console.log('val: ' + val);
			console.log('start_same_as_end: ' + start_same_as_end);
			console.log('val_same_as_start: ' + val_same_as_start);
			console.log('val_less_than_today: ' + val_less_than_today);
			console.log('********************************************');*/

			if (val == '' || val == defaultValue || val == fillInValue || val_less_than_today) {
				//if(val == fillInValue) {
					//input.val('').removeClass('error');
				//}
				if(val == '' || val == fillInValue || val == defaultValue) {
					input.val('').attr('autofocus', true);
				} else {
					//console.log('not changed!');
					//input.val(fillInValue).addClass('error').attr('autofocus', true);
					input.val(fillInValue).attr('autofocus', true);
				}
				return false;
			} else {
				if(datepickerranger_first_table.length == 1) {
					datepickerranger_first_table.animateHighlight('rgb(255,230,132)', 1000);
				}
				//console.log('end_date: ' + end_date);
				if(end_date == '...') {
					check_out_date.val(fillInValue).attr('autofocus', true);
					//check_in_out_dates.data('dateRangePicker').setDateRange(val, undefined, true);
				} else {
					if(val != '' && !val_same_as_start && !val_less_than_today) {
						//console.log('date1:' + val);
						//console.log('date2:' + end_date);
						input.closest('.check-in-out-dates').data('dateRangePicker').setDateRange(val, end_date, true);
						//check_in_out_dates.data('dateRangePicker').setDateRange(val, end_date, true);
					}
				}
			}
			/*if(val != '' && !val_same_as_start && !val_less_than_today) {
				//console.log('changed me!');
				//input.removeClass('error');
				check_in_out_dates.data('dateRangePicker').setDateRange(val, end_date, true);
			}*/
		});

		// onclick & onchange event for check-out
		check_out_date.on('click change', function(){
			var input = jQuery(this),
				val = input.val(),
				date = moment().format(defaultValue),
				start_date = jQuery('.start-day').text(),
				end_date = jQuery('.end-day').text(),
				end_same_as_start = (moment(end_date).isSame(start_date)) ? 1 : 0,
				val_same_as_end = (moment(val).isSame(end_date)) ? 1 : 0,
				val_less_than_today = (moment(val).isBefore(moment().format(defaultValue))) ? 1 : 0,
				//no_slash_start_date = start_date.replace(/-|\//g, ""),

				datepickerranger = jQuery(input.closest('.check-in-out-dates').data('dateRangePicker').getDatePicker()),
				//datepickerranger = jQuery(check_in_out_dates.data('dateRangePicker').getDatePicker()),
				datepickerranger_last_table = datepickerranger.find('.last-date-selected.toMonth').closest('table');

			//input.removeClass('error');
			/*console.log('----------');
			console.log('end date');
			console.log('----------');
			console.log('val: ' + val);
			console.log('end_same_as_start: ' + end_same_as_start);
			console.log('val_same_as_end: ' + val_same_as_end);
			console.log('val_less_than_today: ' + val_less_than_today);
			console.log('********************************************');*/

			if (val == '' || val == defaultValue || val == fillInValue || val_less_than_today) {
				//if(val == fillInValue) {
					//input.val('').removeClass('error');
				//}
				if(val == '' || val == fillInValue || val == defaultValue) {
					input.val('').attr('autofocus', true);
				} else {
					//console.log('not changed!');
					//input.val(fillInValue).addClass('error').attr('autofocus', true);
					input.val(fillInValue).attr('autofocus', true);
				}
				return false;
			} else {
				if(datepickerranger_last_table.length == 1) {
					datepickerranger_last_table.animateHighlight('rgb(255,230,132)', 1000);
				}
				if(val != '' && !val_same_as_end && !val_less_than_today) {
					//console.log('date1:' + start_date);
					//console.log('date2:' + val);
					input.closest('.check-in-out-dates').data('dateRangePicker').setDateRange(start_date, val, true);
					//check_in_out_dates.data('dateRangePicker').setDateRange(start_date, val, true);
				}
			}
			/*if(val != '' && !val_same_as_end && !val_less_than_today) {
				//console.log('changed me!');
				//input.removeClass('error');
				check_in_out_dates.data('dateRangePicker').setDateRange(start_date, val, true);
			}*/
		});

		// clear calendar
		clear_dates.click(function(e) {
			e.stopPropagation();
			var clear_date = jQuery(this),
				clear_date_parent = clear_date.closest('.booking-engine').find('.check-in-out-dates');
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

}, false);

// Start booking mask functionality
jQuery(function() {
	// Define Variables
	var dateFormat = 'm/d/yy'; // date format
	var altDateFormat = 'DD, MM dd, yy'; // spelled out Day and date # format
	//var altDateFormat = 'dd, mm dd, yy'; // numbers
	var thisForm = jQuery('.booking-engine');
	var datePicker = jQuery('.datepicker');
	var datePickerContent = jQuery('#content').find('.datepicker');
	var hasDatePicker = jQuery('.hasDatepicker');
	var checkIn = thisForm.find('input[name="arrivalDate"].mulia');
	var checkOut = thisForm.find('input[name="departDate"].mulia');
	var bookingSubmitBtn = thisForm.find('.bookingSubmit');
	var eleClass;

	// Datepicker
	datePickerContent.datepicker({
		minDate: ('+0D'),
		onSelect: function() {
			hasDatePicker.datepicker("hide");
		}
	}).datepicker('widget').wrap('<div class="ll-skin-mulia"/>');
	/*
	//datePicker.datepicker({
	checkIn.datepicker({
		//altField: 'input[name="altArrivalDate"]',
		//altFormat: altDateFormat,
		dateFormat: dateFormat, //leading zeros breaks selectbox plugin integration -should handle that at b4 sending to selectbox -- resnet needs leading zeros
		inline: true,
		showOtherMonths: true,
		minDate: ('+0D'),
		onSelect: function() {
			var checkOutDate = checkIn.datepicker('getDate');
			checkOutDate.setDate(checkOutDate.getDate() + 1);
			//if(checkOut.length) console.log(checkOut.val() + ' - ' + checkOutDate);
			checkOut.datepicker("setDate",checkOutDate);
			hasDatePicker.datepicker("hide");
		}
	}).datepicker('widget');
	//}).datepicker('widget').wrap('<div class="ll-skin-mulia"/>');
	checkOut.datepicker({
		minDate: ('+0D')
	}).datepicker('widget');
	//}).datepicker('widget').wrap('<div class="ll-skin-mulia"/>');
	*/

	//
	jQuery('.ui-datepicker').addClass('ll-skin-mulia');

	// mobile device adjustments for datepicker
	if (isMobile.matches) {
		jQuery('.datepicker').each(function() {
			jQuery(this).get(0).type='date';
			jQuery('input[type="date"]').datepicker( "destroy" );
		});
	}

	// Close Datepicker
	jQuery(document).click(function(e) {
		var ele = jQuery(e.target);
		if (jQuery(ele).attr('class') !== undefined) {
			eleClass = jQuery(ele).attr('class');
		} else {
			eleClass = '';
		}
		if (!ele.hasClass("hasDatepicker") && !ele.hasClass("ui-datepicker") && !ele.hasClass("ui-icon") && !jQuery(ele).parent().parents(".ui-datepicker").length && (eleClass.indexOf('ui-datepicker') == -1))
			jQuery(".hasDatepicker").datepicker("hide");
	});

    // show animation
    bookingSubmitBtn.on('click', function(){
        jQuery(this).addClass('m-progress');
        setTimeout(function(){ bookingSubmitBtn.removeClass('m-progress'); }, 3000);
        //return false;
        //e.preventDefault();
    });

	// Booking Mask Programming
	bookingSubmitBtn.click(function(e) {
		var no_hotel = '';
		var thisForm = jQuery(this).closest('.booking-engine');
		var hotel = thisForm.find('select[name="destination"]').val();
		var chain = thisForm.find('input[name="chain"]').val();
		//var shell = thisForm.find('input[name="shell"]').val();
		var arrive = thisForm.find('input[name="arrivalDate"]').val();
		var depart = thisForm.find('input[name="departDate"]').val();
		var nights = thisForm.find('select[name="nights"]').val();
		var rooms = thisForm.find('select[name="numberOfRooms"]').val();
		var adult = thisForm.find('select[name="numberOfAdults"]').val();
		var children = thisForm.find('select[name="numberOfChildren"]').val();
		var rate = thisForm.find('input[name="code"]').val();
		var start = '&start=availresults';
		var locale = thisForm.find('input[name="locale"]').val();
		var dest = thisForm.find('input[name="dest"]').val();

		//console.log(hotel);
		if (parseInt(hotel) === 0) {
			//alert("Please select a destination");
			//alert("Please select a property");
			//return false;
              //no_hotel = '&shell=GCF&template=GCF';
			no_hotel = '';
		} else if (arrive === "mm/dd/yy" || arrive === null) {
			alert("Please enter a check-in date");
			return false;
		} else if (depart === "mm/dd/yy" || depart === null) {
			alert("Please enter a check-out date");
			return false;
		}
		if (rate === "Enter Promo Code" || rate === "ENTER PROMO CODE") {
			rate = '';
		} else {
			rate = '&Promo=' + rate;
		}
        if(!hotel) {hotel="";}
		var bookingUrl = 'http://gc.synxis.com/rez.aspx?Hotel=' + hotel + '&Chain=' + chain + '&rooms=' + rooms + '&arrive=' + arrive + '&depart=' + depart + '&adult=' + adult + '&child=' + children + rate + start + '&locale=' + locale + '&Dest=' + dest + no_hotel + '&template=RBE&shell=RBE';
		//var bookingUrl = 'http://gc.synxis.com/rez.aspx?Hotel=' + hotel + '&Chain=' + chain + '&rooms=' + rooms + '&arrive=' + arrive + '&depart=' + depart + '&adult=' + adult + '&child=' + children + rate + start + '&locale=' + locale + '&Dest=' + dest + no_hotel;
		//var bookingUrl = 'http://gc.synxis.com/rez.aspx?Hotel=' + hotel + '&Chain=' + chain + '&rooms=' + rooms + '&arrive=' + arrive + '&depart=' + depart + '&adult=' + adult + '&child=' + children + start;
		console.log(bookingUrl);
		bookingSubmitBtn.attr('href', bookingUrl);
	});
});
