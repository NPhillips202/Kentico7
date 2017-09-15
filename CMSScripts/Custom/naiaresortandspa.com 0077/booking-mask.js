//--Booking Mask Programming
	// Define variables
	var thisForm = jQuery('.booking-mask'),
		checkIn = thisForm.find('input[name="check-in"]'),
		checkOut = thisForm.find('input[name="check-out"]'),
		nights = thisForm.find('.nights-select'),
		guests = thisForm.find('.guests-select'),
		//adults = thisForm.find('.number-of-adults-select'),
		//children = thisForm.find('.number-of-children-select'),
		bookingSubmitBtn = thisForm.find('a.submit'),
		bookingLink = bookingSubmitBtn.attr('href'); // Put the default booking link into the submit button href

	// Initialize Datepicker
	checkIn.datepicker({
		minDate: ('+0D'),
		onSelect: function() {
			// Update check out date to +2 days
			var checkOutDate = checkIn.datepicker('getDate');
			checkOutDate.setDate(checkOutDate.getDate() + 2);
			checkOut.datepicker("setDate",checkOutDate);
			jQuery(".hasDatepicker").datepicker("hide");

			//updateCheckInDate();
			//updateCheckOutDate();
		}
	});
	checkIn.next('.date-display').click(function(){
		checkIn.datepicker('show');
	});

	checkOut.datepicker({
		minDate: ('+0D'),
		onSelect: function() {
			updateCheckOutDate();
		}
	});
	checkOut.next('.date-display').click(function(){
		checkOut.datepicker('show');
	});

	// Set default dates
	checkIn.datepicker("setDate", new Date()); // Defaults to current day
	//updateCheckInDate();

	var defaultdeparture_date = checkIn.datepicker('getDate', '+2d');
	defaultdeparture_date.setDate(defaultdeparture_date.getDate() + 2);
	checkOut.datepicker("setDate", defaultdeparture_date);
	//updateCheckOutDate();

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
	    if (!ele.hasClass("hasDatepicker") && !ele.hasClass("ui-datepicker") && !ele.hasClass("ui-icon") && !jQuery(ele).parent().parents(".ui-datepicker").length && (eleClass.indexOf('ui-datepicker') == -1) && (!ele.hasClass("date-display")) && (!ele.hasClass("month")) && (!ele.hasClass("year")) && (!ele.hasClass("day")))
	        jQuery(".hasDatepicker").datepicker("hide");
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
