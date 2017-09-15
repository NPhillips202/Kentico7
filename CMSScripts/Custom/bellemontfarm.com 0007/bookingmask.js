jQuery(function() {
    // Datepicker
    jQuery('input#startdate').datepicker({
        minDate: ('+0D'),
		onSelect: function() {
			var checkOut = jQuery('#booking').find('input#startdate').datepicker('getDate');
			checkOut.setDate(checkOut.getDate() + 2);
			jQuery('#booking').find('input#enddate').datepicker("setDate",checkOut);
            jQuery(".hasDatepicker").datepicker("hide");
		}
	});
    jQuery('input#enddate').datepicker({
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
    jQuery('#booking #CheckReservations').click(function(e) {
        e.preventDefault();
        
        var thisForm = jQuery('#booking');
		var checkIn = thisForm.find('input#startdate').val();
		var checkOut = thisForm.find('input#enddate').val();
		var venue = 'Belle Mont Farm';
        
        if (checkIn == '') {
            alert("Please enter a check-in date");
            return false;
        };
        
        if (checkOut == '') {
            alert("Please enter a check-out date");
            return false;
        };
        
		checkIn = thisForm.find('input#startdate').datepicker('getDate');
		var checkInYear = checkIn.getFullYear();
		var checkInMonth = (checkIn.getMonth() + 1).toString();
		if (checkInMonth.length < 2) {checkInMonth = '0' + checkInMonth;};
		var checkInDay = checkIn.getDate().toString();
		if (checkInDay.length < 2) {checkInDay = '0' + checkInDay;};
		checkIn = checkInYear + '-' + checkInMonth + '-' + checkInDay;
		
		checkOut = thisForm.find('input#enddate').datepicker('getDate');
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