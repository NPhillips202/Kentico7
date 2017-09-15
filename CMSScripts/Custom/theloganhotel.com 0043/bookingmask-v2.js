if(jQuery('.booking').length >0 ){   

jQuery(function() {
	// Define variables
	var thisForm = jQuery('.booking'),
		checkIn = thisForm.find('input[name="check-in"]'),
		checkOut = thisForm.find('input[name="check-out"]'),
		rooms = thisForm.find('.rooms-wrapper select'),
		guests = thisForm.find('.guests-wrapper select'),
		bookingSubmitBtn = thisForm.find('.reserve a'),
		bookingLink = bookingSubmitBtn.attr('href'); // Put the default booking link into the submit button href
	
    // Initialize Datepicker
    checkIn.datepicker({
        //minDate: ('+0D'), // Sets min day to current day
        minDate: new Date(2015, 12 - 1, 16), // Sets min day to 12/16/15
		onSelect: function() {
			var checkOutDate = checkIn.datepicker('getDate');
			checkOutDate.setDate(checkOutDate.getDate() + 1);
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
    
    var defaultDepartureDate = checkIn.datepicker('getDate', '+1d');
    defaultDepartureDate.setDate(defaultDepartureDate.getDate() + 1);
    checkOut.datepicker("setDate", defaultDepartureDate);
	
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
		var roomsVal = rooms.val(),
			guestsVal = guests.val();
		
		// Booking URL
		var bookingUrl = bookingLink + "&arrivaldate=" + checkInDateFormatted + "&departuredate=" + checkOutDateFormatted + "&numRooms=" + roomsVal + "&numAdults=" + guestsVal + "&inputModule=HOTEL_SEARCH";
		bookingSubmitBtn.attr('href',bookingUrl);
	});
});


}