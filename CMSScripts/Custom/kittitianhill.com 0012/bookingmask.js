jQuery(function() {
    // Datepicker
    jQuery('input.checkIn').datepicker({
        minDate: ('+0D'),
		onSelect: function() {
			var checkOut = jQuery('#bookingMask').find('input.checkIn').datepicker('getDate');
			checkOut.setDate(checkOut.getDate() + 2);
			jQuery('#bookingMask').find('input.checkOut').datepicker("setDate",checkOut);
            jQuery(".hasDatepicker").datepicker("hide");
		}
	});
    jQuery('input.checkOut').datepicker({
        minDate: ('+0D')
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
    jQuery('#bookingMask .submit').click(function(e) {
        e.preventDefault();
        
        var thisForm = jQuery('#bookingMask');
		var checkIn = thisForm.find('input.checkIn').val();
		var checkOut = thisForm.find('input.checkOut').val();
		var venue = '';
        
        if (checkIn == '') {
            alert("Please enter a check-in date");
            return false;
        };
        
        if (checkOut == '') {
            alert("Please enter a check-out date");
            return false;
        };
        
		checkIn = thisForm.find('input.checkIn').datepicker('getDate');
		var checkInYear = checkIn.getFullYear();
		var checkInMonth = (checkIn.getMonth() + 1).toString();
		if (checkInMonth.length < 2) {checkInMonth = '0' + checkInMonth;};
		var checkInDay = checkIn.getDate().toString();
		if (checkInDay.length < 2) {checkInDay = '0' + checkInDay;};
		checkIn = checkInYear + '-' + checkInMonth + '-' + checkInDay;
		
		checkOut = thisForm.find('input.checkOut').datepicker('getDate');
		var checkOutYear = checkOut.getFullYear().toString();
		var checkOutMonth = (checkOut.getMonth() + 1).toString();
		if (checkOutMonth.length < 2) {checkOutMonth = '0' + checkOutMonth;};
		var checkOutDay = checkOut.getDate().toString();
		if (checkOutDay.length < 2) {checkOutDay = '0' + checkOutDay;};
		checkOut = checkOutYear + '-' + checkOutMonth + '-' + checkOutDay;
		
        var bookingUrl = 'http://reservations.kittitianhill.com//#/roomsBooking/rate/' + checkIn + '000000/' + checkOut + '000000/1///////' + venue;
		window.open(bookingUrl);
    });
});