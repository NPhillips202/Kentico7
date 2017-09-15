jQuery(function() {
	// Define variables
	var thisForm = jQuery('.book-now-main-2'),
		checkIn = thisForm.find('input[name="check-in"]'),
		checkOut = thisForm.find('input[name="check-out"]'),
        //promoCode = thisForm.find('input[name="promo"]'),
		rooms = thisForm.find('.roomW select'),
		guests = thisForm.find('.guestW select'),
		bookingSubmitBtn = thisForm.find('.reserve a'),
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
    checkOut.datepicker({
		//buttonImage: "calendar.gif",
		//buttonImageOnly: true,
        //showOn: 'both',
        minDate: ('+0D')
    });

    // Set default dates
    checkIn.datepicker("setDate", new Date()); // Defaults to current day
    //checkIn.datepicker("setDate", new Date(2016, 1 - 1, 15)); // Defaults to 01/15/16

    var defaultDepart = checkIn.datepicker('getDate', '+2d');
    defaultDepart.setDate(defaultDepart.getDate() + 2);
    checkOut.datepicker("setDate", defaultDepart);

	// Mobile device adjustments for datepicker
	var isMobile = window.matchMedia('only screen and (max-width: 660px)');
	if (isMobile.matches) {
		jQuery('.datepicker').each(function() {
			jQuery(this).get(0).type='date';
			jQuery('input[type="date"]').datepicker("destroy");
			jQuery('input[type="date"]').attr("val","mm/dd/yyyy");
			jQuery('.datepicker-format-container').removeClass("hide");
			//jQuery('.datepicker-icon-container').addClass("pointer-events");
		});
	} else {
		jQuery('.datepicker-format-container').addClass("hide");
		//jQuery('.datepicker-icon-container').removeClass("pointer-events");
	};
	//jQuery('input[type="date"]').live('click', function(){
	//jQuery('.input-main').click(function(){
	jQuery('input[type="date"]').on('click', function(){
		//console.log('im clicked....');
		jQuery(this).prev('.datepicker-format-container').addClass("hide");
	});

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

		var checkInDateFormatted = checkInMonth + '/' + checkInDay + '/' +checkInYear;

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

 	   var checkOutDateFormatted = checkOutMonth + '/' + checkOutDay + '/' + checkOutYear;

		// Other
		var roomsVal = rooms.val(),
			guestsVal = guests.val();

        // Validation
        if (guestsVal == "Guests") {
            alert('Please enter number of guests.');
            return false;
        };
        if (roomsVal == "rooms") {
            alert('Please enter number of rooms.');
            return false;
        };

		// Booking URL
        var bookingUrl = bookingLink + "&arrivalDate=" + checkInDateFormatted + "&departureDate=" + checkOutDateFormatted + "&numberOfAdults=" + guestsVal + "&numberOfRooms=" + roomsVal;
		//var bookingUrl = bookingLink + "&start=availresults&arrive=" + checkInDateFormatted + "&depart=" + checkOutDateFormatted + "&adult=" + guestsVal + "&rooms=" + roomsVal;
		bookingSubmitBtn.attr('href',bookingUrl);
	});
});
