
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


// call on dom ready (same as jQuery(function() { ... });
document.addEventListener('DOMContentLoaded', function () {

	// set vars and functions
	var booking_mask_nav = jQuery('#topNav'),
		booking_mask_bg = jQuery('#booking-mask-bg'),
		booking_mask_div = jQuery('#booking-mask-widget'),
		//booking_mask_div_content = jQuery('#booking-mask_content'),
		//booking_mask_button = booking_mask_nav.find('> .button'),
		booking_mask_res_button = jQuery('#reservationsBtn'),
		//booking_mask_button = booking_mask_res_button.find('> a'),
		booking_mask_button = jQuery('#reservationsBtn > a'),
		booking_mask_button_close = booking_mask_res_button.find('.close-me'),

		// date picker range vars
		/*check_in_out_dates = jQuery('.check-in-out-dates'),
		check_in_out_dates__nav = jQuery('#check-in-out-dates1'),
		check_in_out_dates__content = jQuery('#check-in-out-dates2'),
		number_inputs = jQuery('input[etype="number"]'),

		check_in_date = jQuery('.check-in-date'),
		check_in_date1 = booking_mask_div.find('.check-in-date'),
		check_in_date2 = booking_mask_div_content.find('.check-in-date'),
		check_out_date = jQuery('.check-out-date'),
		check_out_date1 = booking_mask_div.find('.check-out-date'),
		check_out_date2 = booking_mask_div_content.find('.check-out-date'),*/

		clear_dates = jQuery('.clear-dates'),

		//nowValue = new Date(),
		defaultValue = 'MM/DD/YYYY',
		fillInValue = '__/__/____',

		// booking open/close event functions
		bookingMaskOpenEvent = function(bg, div, target){
			bg.fadeIn().addClass('booking-mask-bg-open');
			div.addClass('booking-mask-widget-open');
			console.log(div.attr('class'));
			target.addClass('booking-mask-btn-open');
		},
		bookingMaskCloseEvent = function(bg, div, target){
			bg.fadeOut().removeClass('booking-mask-bg-open');
			div.removeClass('booking-mask-widget-open');
			target.removeClass('booking-mask-btn-open');
		};

	// booking mask toggle (NAV ONLY)
	booking_mask_button.click(function(){
		var target = jQuery(this);
		if(target.is('.booking-mask-btn-open')){
			bookingMaskCloseEvent(booking_mask_bg, booking_mask_div, target);
			target.removeClass('booking-mask-btn-open');
		} else {
			bookingMaskOpenEvent(booking_mask_bg, booking_mask_div, target);
			target.addClass('booking-mask-btn-open');
		}
		return false;
	});
	/*booking_mask_button_close.click(function() {
	    if(booking_mask_button.is('.booking-mask-btn-open')){
	        bookingMaskCloseEvent(booking_mask_bg, booking_mask_div, booking_mask_button);
	    }
	    return false;
	});
	booking_mask_div.outside('click', function(ev) {
	    if(booking_mask_button.is('.booking-mask-btn-open')){
	        bookingMaskCloseEvent(booking_mask_bg, booking_mask_div, booking_mask_button);
	    }
	});
	jQuery(document).keyup(function(e) {
	    if (booking_mask_button.is('.booking-mask-btn-open') && e.keyCode === 27) {
	        bookingMaskCloseEvent(booking_mask_bg, booking_mask_div, booking_mask_button);
	    }
	});*/



	// Define variables
	var thisForm = jQuery('.booking-mask'),
		//rooms = thisForm.find('.rooms-wrapper select'),
		checkIn = thisForm.find('input[name="check-in"]'),
		checkOut = thisForm.find('input[name="check-out"]'),
		adults = thisForm.find('.number-of-adults-select'),
		children = thisForm.find('.number-of-adults-select'),
		bookingSubmitBtn = thisForm.find('a.submit'),
		bookingLink = bookingSubmitBtn.attr('href'); // Put the default booking link into the submit button href

	// Initialize Datepicker
	checkIn.datepicker({
		minDate: ('+0D'), // Sets min day to current day
		//minDate: new Date(2016, 1 - 1, 15), // Sets min day to 01/15/16
		onSelect: function() {
			var checkOutDate = checkIn.datepicker('getDate');
			checkOutDate.setDate(checkOutDate.getDate() + 2);
			checkOut.datepicker("setDate",checkOutDate);
			jQuery(".hasDatepicker").datepicker("hide");
		}
	});
	checkIn.next('.date-display').click(function(){
	});
	checkOut.datepicker({
		//buttonImage: "calendar.gif",
		//buttonImageOnly: true,
	    //showOn: 'both',
	    minDate: ('+0D')
	});

	// Set default dates
	//checkIn.datepicker("setDate", new Date()); // Defaults to current day
	//checkIn.datepicker("setDate", new Date(2016, 1 - 1, 15)); // Defaults to 01/15/16

	//var defaultdeparture_date = checkIn.datepicker('getDate', '+2d');
	//defaultdeparture_date.setDate(defaultdeparture_date.getDate() + 2);
	//checkOut.datepicker("setDate", defaultdeparture_date);

	// Mobile device adjustments for datepicker
	//if (isMobile.matches) {
	//	jQuery('.datepicker').each(function() {
	//		jQuery(this).get(0).type='date';
	//		jQuery('input[type="date"]').datepicker("destroy");
	//	});
	//};

	// Close Datepicker
	jQuery(document).click(function(e) {
	    var ele = jQuery(e.target);
	    if (jQuery(ele).attr('class') !== undefined) {
	        var eleClass = jQuery(ele).attr('class');
	    } else {
	        var eleClass = '';
	    };
	    if (!ele.hasClass("hasDatepicker") && !ele.hasClass("ui-datepicker") && !ele.hasClass("ui-icon") && !jQuery(ele).parent().parents(".ui-datepicker").length && (eleClass.indexOf('ui-datepicker') == -1))
	        jQuery(".hasDatepicker").datepicker("hide");
	});

	// Booking Mask Programming
	bookingSubmitBtn.click(function(e) {
		// Check In
		var checkInDate = checkIn.datepicker('getDate'),
			checkInYear = checkInDate.getFullYear().toString(),
			checkInMonth = (checkInDate.getMonth() + 1).toString(),
			checkInDay = checkInDate.getDate().toString();

		if (checkInMonth.length == 1) {
			checkInMonth = '0' + checkInMonth;
		};
		if (checkInDay.length == 1) {
			checkInDay = '0' + checkInDay;
		};

		var checkInDateFormatted = checkInYear + checkInMonth + checkInDay;

		// Check Out
		var checkOutDate = checkOut.datepicker('getDate'),
			checkOutYear = checkOutDate.getFullYear().toString(),
			checkOutMonth = (checkOutDate.getMonth() + 1).toString(),
			checkOutDay = checkOutDate.getDate().toString();

		if (checkOutMonth.length == 1) {
			checkOutMonth = '0' + checkOutMonth;
		};
		if (checkOutDay.length == 1) {
			checkOutDay = '0' + checkOutDay;
		};

		var checkOutDateFormatted = checkOutYear + checkOutMonth + checkOutDay;

		// Other
		//var roomsVal = rooms.val(),
		var	guestsVal = adults.val();

		// Booking URL
		var bookingUrl = bookingLink + "?rooms=" +  roomsVal + "&arrival_date=" + checkInDateFormatted + "&departure_date=" + checkOutDateFormatted +  "&adults=" + guestsVal;
		bookingSubmitBtn.attr('href',bookingUrl);
	});

	// init Select Box
	jQuery('.selectbox').selectbox({
		onOpen: function (inst) {
			//console.log("open", inst);
		},
		onClose: function (inst) {
			//console.log("close", inst);
		},
		onChange: function (val, inst) {
			/*jQuery.ajax({
				type: "GET",
				data: {country_id: val},
				url: "ajax.php",
				success: function (data) {
					$("#boxCity").html(data);
					$("#city_id").selectbox();
				}
			});*/
		},
		effect: 'slide',
		speed: 400
	});

}, false);
