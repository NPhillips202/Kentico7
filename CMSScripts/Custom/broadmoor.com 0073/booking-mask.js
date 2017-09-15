// Define variables
	var reservationsButton = jQuery('#reservationsBtn > a'),
		widget = jQuery('#booking-mask-widget'),
		bg = jQuery('#booking-mask-bg'),
		bookingMask = jQuery('.booking-mask'),
		selectBoxes = jQuery('.booking-mask .selectbox, .FormPanel .selectbox, .search-tools select'),

		thisForm = bookingMask,
		checkIn = thisForm.find('input[name="check-in"]'),
		checkOut = thisForm.find('input[name="check-out"]'),
		adults = thisForm.find('.number-of-adults-select'),
		children = thisForm.find('.number-of-children-select'),
		bookingSubmitBtn = thisForm.find('a.submit'),
		bookingLink = bookingSubmitBtn.attr('href'), // Put the default booking link into the submit button href
		speed = 600;

//--Open/close booking mask
	function openBooking() {
		// Fade in bg
		/*bg.stop().fadeIn(speed);

		// Show widget and animate height
		widget.stop().animate({
			height: '478px'
		}, speed);*/

		bg.fadeIn().addClass('booking-mask-bg-open');
		widget.addClass('booking-mask-widget-open');
		reservationsButton.addClass('booking-mask-button-active');
	};

	function closeBooking() {
		// Fade in bg
		/*bg.stop().fadeOut(speed);

		// Show widget and animate height
		widget.stop().animate({
			height: '0px'
		}, speed);*/

		bg.fadeOut().removeClass('booking-mask-bg-open');
		widget.removeClass('booking-mask-widget-open');
		reservationsButton.removeClass('booking-mask-button-active');
	};

//--Function to switch month number to abbreviation
	function translateMonth(thisMonth) {
		switch(thisMonth) {
			case 1:
			    return 'JAN';
			    break;
			case 2:
			    return 'FEB';
			    break;
			case 3:
			    return 'MAR';
			    break;
			case 4:
			    return 'APR';
			    break;
			case 5:
			    return 'MAY';
			    break;
			case 6:
			    return 'JUN';
			    break;
			case 7:
			    return 'JUL';
			    break;
			case 8:
			    return 'AUG';
			    break;
			case 9:
			    return 'SEP';
			    break;
			case 10:
			    return 'OCT';
			    break;
			case 11:
			    return 'NOV';
			    break;
			case 12:
			    return 'DEC';
				break;
		}
	};

//--Functions to update the visual date in the booking mask with the actual value of the inputs
	function updateCheckInDate() {
		var thisDate = checkIn.datepicker('getDate'),
			thisYear = thisDate.getFullYear().toString(),
			thisMonth = (thisDate.getMonth() + 1),
			thisDay = thisDate.getDate().toString();

		if (thisDay.length == 1) {
			thisDay = '0' + thisDay;
		};

		thisMonth = translateMonth(thisMonth);

		checkIn.parent().find('.day').text(thisDay);
		checkIn.parent().find('.month').text(thisMonth);
		checkIn.parent().find('.year').text(thisYear);
		// remove clicked class from date display
		//jQuery('.date-display').removeClass('clicked');
	};
	function updateCheckOutDate() {
		var thisDate = checkOut.datepicker('getDate'),
			thisYear = thisDate.getFullYear().toString(),
			thisMonth = (thisDate.getMonth() + 1),
			thisDay = thisDate.getDate().toString();

		if (thisDay.length == 1) {
			thisDay = '0' + thisDay;
		};

		thisMonth = translateMonth(thisMonth);

		checkOut.parent().find('.day').text(thisDay);
		checkOut.parent().find('.month').text(thisMonth);
		checkOut.parent().find('.year').text(thisYear);
		// remove clicked class from date display
		jQuery('.date-display').removeClass('clicked');
	};

	//jQuery('#reservationsBtn > a, .mfp-broadmoor > a.button').click(function(e) {
	//reservationsButton.click(function(e) {
	jQuery('#reservationsBtn > a').click(function(e) {
		//console.log(widget.is('.booking-mask-widget-open'));
		e.preventDefault();
		if(!widget.is('.booking-mask-widget-open')){
		//if (widget.height() == 0) {
			/*if(jQuery(this).parent().is('.mfp-broadmoor')){
				jQuery.magnificPopup.close();
				setTimeout(function(){
					openBooking();
				}, 2000);
			} else {*/
				openBooking();
			/*}*/
		} else {
			closeBooking();
		};
	});

	bg.click(function(e) {
		e.preventDefault();
		closeBooking();
	});

//--Select Box
	selectBoxes.selectbox({
		effect: 'slide',
		speed: 400,
		onChange: function (val, inst) {
			var selected_val = jQuery(this).val();
			jQuery(this).find('option').attr('selected', false);
			jQuery(this).find('option[value="'+ selected_val +'"]').attr('selected', true).change();
		}
	});
	// add text to empty anchor tag (ADA purposes)
	jQuery('a.sbToggle[href]').each(function(){
		var $this = jQuery(this);
		if($this.text() == "" && $this.children().length == 0) {
			//console.log($this.text());
			$this.html('<span class="hide">Select ' + String($this.closest('.sbHolder').prev('select').attr('name')).replace('-',' ') + '</span>');
		}
	});

//--Property Selection Boxes
	//jQuery('.property-selection li a').click(function(e) {
	jQuery('#reservationsBtn').find('.property-selection li a').click(function(e) {
		e.preventDefault();
		jQuery(this).parent().parent().find('li').removeClass('active');
		jQuery(this).parent().addClass('active');

		// Hide children field when anything but Broadmoor is selected
		var thisProperty = jQuery(this).attr('href').substring(1);
		if (thisProperty == "RES") {
			jQuery('.number-of-children-select').parent().parent().show();
			jQuery('.labels-and-inputs').eq(2).removeClass('no-border');
		} else {
			jQuery('.number-of-children-select').parent().parent().hide();
			jQuery('.labels-and-inputs').eq(2).addClass('no-border');
		};
	});

//--Clear Fields button
	jQuery('.clear-fields').click(function(e) {
		e.preventDefault();
		// Reset checkin
		checkIn.datepicker("setDate", new Date());
		updateCheckInDate();
		// Reset checkout to +2
		var defaultdeparture_date = checkIn.datepicker('getDate', '+2d');
		defaultdeparture_date.setDate(defaultdeparture_date.getDate() + 2);
		checkOut.datepicker("setDate", defaultdeparture_date);
		updateCheckOutDate();
		// Reset adults
		jQuery('.number-of-adults-select option').attr('selected', false);
		jQuery('.number-of-adults-select option').first().attr('selected', true).change();
		jQuery('.number-of-adults-select').parent().parent().find('.sbSelector').text('01');
		// Reset children
		jQuery('.number-of-children-select option').attr('selected', false);
		jQuery('.number-of-children-select option').first().attr('selected', true).change();
		jQuery('.number-of-children-select').parent().parent().find('.sbSelector').text('00');
		// Add children field back in if hidden, add border back, etc.
		jQuery('.property-selection li').removeClass('active');
		jQuery('.property-selection li').first().addClass('active');
		jQuery('.number-of-children-select').parent().parent().show();
		jQuery('.labels-and-inputs').eq(2).removeClass('no-border');
	});

//--Mobile Reservations
	jQuery(function() {
		//jQuery('.mm-menu #reservationsBtnMobile > a').click(function(e) {
		jQuery('body').on('click', '#reservationsBtnMobile > a', function(e) { // Not sure if works on All Browsers
			//console.log(jQuery('.mm-menu #reservationsBtnMobile .property-selection > ul').length);
			e.preventDefault();
			jQuery('.mm-menu #reservationsBtnMobile .property-selection > ul').slideToggle();
		});

		// MOCK
		jQuery('body').on('click', '#reservationsBtnMobile.under-logo > a', function(e) { // Not sure if works on All Browsers
			//console.log(jQuery('.mm-menu #reservationsBtnMobile .property-selection > ul').length);
			e.preventDefault();
			jQuery('#topNavInner #reservationsBtnMobile.under-logo .property-selection > ul').slideToggle();
		});
	});

//--Booking Mask Programming
	if(thisForm.length) {
		// Initialize Datepicker
		checkIn.datepicker({
			minDate: ('+0D'),
			onSelect: function() {
				// Update check out date to +2 days
				var checkOutDate = checkIn.datepicker('getDate');
				checkOutDate.setDate(checkOutDate.getDate() + 2);
				checkOut.datepicker("setDate", checkOutDate);
				jQuery(".hasDatepicker").datepicker("hide");

				updateCheckInDate();
				updateCheckOutDate();
			}
		});
		checkIn.next('.date-display').click(function() {
			jQuery(this).addClass('clicked');
			checkOut.next('.date-display').removeClass('clicked');
			checkIn.datepicker('show');
		});

		checkOut.datepicker({
			minDate: ('+0D'),
			onSelect: function() {
				updateCheckOutDate();
			}
		});
		checkOut.next('.date-display').click(function() {
			jQuery(this).addClass('clicked');
			checkIn.next('.date-display').removeClass('clicked');
			checkOut.datepicker('show');
		});

		// Set default dates
		checkIn.datepicker("setDate", new Date()); // Defaults to current day
		updateCheckInDate();

		var defaultdeparture_date = checkIn.datepicker('getDate', '+2d');
		defaultdeparture_date.setDate(defaultdeparture_date.getDate() + 2);
		checkOut.datepicker("setDate", defaultdeparture_date);
		updateCheckOutDate();
	}

// Mobile device adjustments for datepicker
	//var isMobile = window.matchMedia('only screen and (max-width: 750px)');
	//if (isMobile.matches) {
	//	jQuery('.datepicker').each(function() {
	//		jQuery(this).get(0).type='date';
	//		jQuery('input[type="date"]').datepicker("destroy");
	//	});
	//}

// Close Datepicker
	jQuery(document).click(function(e) {
		var ele = jQuery(e.target);
		if (jQuery(ele).attr('class') !== undefined) {
			var eleClass = jQuery(ele).attr('class');
		} else {
			var eleClass = '';
		};
		if (!ele.hasClass("hasDatepicker") && !ele.hasClass("ui-datepicker") && !ele.hasClass("ui-icon") && !jQuery(ele).parent().parents(".ui-datepicker").length && (eleClass.indexOf('ui-datepicker') == -1) && (!ele.hasClass("date-display")) && (!ele.hasClass("month")) && (!ele.hasClass("year")) && (!ele.hasClass("day"))) {
				jQuery(".hasDatepicker").datepicker("hide");
		}
		// remove clicked class from date display
		/*if(jQuery('.date-display').is('.clicked')) {
			console.log('i was clicked!');
			jQuery('.date-display').removeClass('clicked');
		}*/
	});

// Booking Mask Programming
	bookingSubmitBtn.click(function(e) {
		// Check In
		var checkInDate = checkIn.datepicker('getDate'),
			checkInYear = checkInDate.getFullYear().toString().substring(2),
			checkInMonth = (checkInDate.getMonth() + 1).toString(),
			checkInDay = checkInDate.getDate().toString();

		if (checkInMonth.length == 1) {
			checkInMonth = '0' + checkInMonth;
		};
		if (checkInDay.length == 1) {
			checkInDay = '0' + checkInDay;
		};

		var checkInDateFormatted = checkInMonth + checkInDay + checkInYear;

		// Calculate nights
		var checkOutDate = checkOut.datepicker('getDate'),
			nights = (checkOutDate - checkInDate)/1000/60/60/24;

		// Other
		var adultsVal = adults.val(),
			childrenVal = children.val(),
			property = thisForm.find('.property-selection li.active a').attr('href').substring(1),
			promoCode = ''; // Placeholder

		// Ignore children var if not Broadmoor main property
		if (property == "EVR" || property == "CC" || property == "FC") {
			childrenVal = "";
		};

		// Change booking URL based on property selected
		if (property == "CC") {
			var property = "EVR", // Because Cloud Camp needs to pass the Emerald Valley variable and pass cloud-camp as a promo code
				promoCode = "cloud-camp";
		} else if (property == "FC") {
			var property = "EVR", // Because Fishing Camp needs to pass the Emerald Valley variable and pass fish as a promo code
				promoCode = "fish";
		};

		if (property == "EVR" || property == "CC" || property == "FC") { // These all use resv2
			var bookingLink = "https://resv2.broadmoor.com/cgi-bin/lansaweb?procfun+rn+resnet+" + property + "+funcparms+UP%28A2560%29:";
		} else {
			var bookingLink = "https://resv.broadmoor.com/cgi-bin/lansaweb?procfun+rn+resnet+" + property + "+funcparms+UP%28A2560%29:";
		};

		// Booking URL
		var bookingUrl = bookingLink + ';' + promoCode + ';' + checkInDateFormatted + ';' + nights + ';' + adultsVal + ';' + childrenVal + ';?';
		bookingSubmitBtn.attr('href', bookingUrl);
	});
