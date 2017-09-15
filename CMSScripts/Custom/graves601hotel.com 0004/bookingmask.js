jQuery(function() {
    // Datepicker
    jQuery('input[name="CheckInDate"]').datepicker();
    jQuery('input[name="CheckOutDate"]').datepicker();
    
    // Close Datepicker
    jQuery(document).click(function(e) { 
        var ele = jQuery(e.target);
        if (!ele.hasClass("hasDatepicker") && !ele.hasClass("ui-datepicker") && !ele.hasClass("ui-icon") && !jQuery(ele).parent().parents(".ui-datepicker").length)
            jQuery(".hasDatepicker").datepicker("hide"); 
    });
    
    // Booking Mask Programming
    jQuery('#SubmitBooking').click(function(e) {
        e.preventDefault();
        
        var thisForm = jQuery('#BookingDetails');
        var checkIn = thisForm.find('input[name="CheckInDate"]').val();
        var nights = thisForm.find('select[name="Nights"]').val();
        var adults = thisForm.find('select[name="Adults"]').val();
        var children = thisForm.find('select[name="Children"]').val();
        
        if (checkIn == "mm/dd/yyyy") {
            alert("Please enter a check-in date");
            return false;
        };
		
		var checkOut = thisForm.find('input[name="CheckInDate"]').datepicker('getDate');
		checkOut.setDate(checkOut.getDate() + parseInt(nights));
		thisForm.find('input[name="CheckOutDate"]').datepicker("setDate",checkOut);
		checkOut = thisForm.find('input[name="CheckOutDate"]').val();
		
        var bookingUrl = 'https://graves601hotel.reservetravelonline.com/eBOOKER/checkavailability.asp?CI=' + checkIn + '&CO=' + checkOut + '&RN=1&AN=' + adults + '&CN=' + children;
        window.open(bookingUrl);
    });
});