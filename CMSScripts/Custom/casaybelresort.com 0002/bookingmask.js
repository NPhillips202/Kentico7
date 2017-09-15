jQuery(function() {
    // Datepicker
    jQuery('.bookingDate[name="checkin"]').datepicker({
        minDate: ('+0D'),
		onSelect: function() {
			var checkOut = jQuery('.bookingDate[name="checkin"]').datepicker('getDate');
			checkOut.setDate(checkOut.getDate() + 2);
			jQuery('.bookingDate[name="checkout"]').datepicker("setDate",checkOut);
            jQuery(".hasDatepicker").datepicker("hide");
		}
	});
    jQuery('.bookingDate[name="checkout"]').datepicker({
        minDate: ('+0D')
    });
    
    // Close Datepicker
    jQuery(document).click(function(e) { 
        var ele = jQuery(e.target);
        if (!ele.hasClass("hasDatepicker") && !ele.hasClass("ui-datepicker") && !ele.hasClass("ui-icon") && !jQuery(ele).parent().parents(".ui-datepicker").length)
            jQuery(".hasDatepicker").datepicker("hide"); 
    });
    
    // Booking Mask Programming
    jQuery('#bookingMaskBtn').click(function(e) {
        e.preventDefault();
        
        var thisForm = jQuery('#bookingMaskForm > table');
        var arrive = thisForm.find('input[name="checkin"]').val();
        var depart = thisForm.find('input[name="checkout"]').val();
        var adults = thisForm.find('select[name="adults"]').val();
        var children = thisForm.find('select[name="children"]').val();
        
        if (arrive == "Check-in") {
            alert("Please enter a check-in date");
            return false;
		} else if (depart == "Check-out") {
            alert("Please enter a check-out date");
            return false;
        };
        
        var bookingUrl = 'https://casaybel.reservetravelonline.com/eBOOKER/checkavailability.asp?CI=' + arrive + '&CO=' + depart + '&RN=1&AN=' + adults + '&CN=' + children;
            bookingUrl = getLinkerUrl(bookingUrl);
        window.open(bookingUrl,'','resizable,scrollbars,width=800,height=600,top=100,left=500');
    });
});




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