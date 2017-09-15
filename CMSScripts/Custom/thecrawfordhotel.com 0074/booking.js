jQuery(function() {
 
                                    
	// Define variables
	var thisForm = jQuery('header'),
		checkIn = thisForm.find('input[name="check-in"]'),
		checkOut = thisForm.find('input[name="check-out"]'),
        promoCode = thisForm.find('input[name="promo"]'),
		rooms = thisForm.find('.roomW select'),
		guests = thisForm.find('.guestW select'),
		bookingSubmitBtn = thisForm.find('.reserve a'),
		bookingLink = bookingSubmitBtn.attr('href'); // Put the default booking link into the submit button href
	    
  
    
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
      
      
      // Promo   
       var promoCodeVal = promoCode.val();
 
		
		// Booking URL
		var bookingUrl = bookingLink + "&start=availresults&arrive=" + checkInDateFormatted + "&depart=" + checkOutDateFormatted + "&adult=" + guestsVal + "&rooms=" + roomsVal + "&promo=" + promoCodeVal;
		bookingSubmitBtn.attr('href',bookingUrl);
	});
});