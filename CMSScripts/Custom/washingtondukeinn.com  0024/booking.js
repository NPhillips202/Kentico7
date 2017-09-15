jQuery(function() {    
    // Datepicker
    jQuery('input[name="check-in"]').datepicker({
        minDate: ('+0D'),
		onSelect: function() {
			var checkOut = jQuery('.booking').find('input[name="check-in"]').datepicker('getDate');
			checkOut.setDate(checkOut.getDate() + 1);
			jQuery('.booking').find('input[name="check-out"]').datepicker("setDate",checkOut);
            jQuery(".hasDatepicker").datepicker("hide");
		}
	});
    jQuery('input[name="check-out"]').datepicker({
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
  var bookingSubmitBtn = jQuery('.booking .button');
  bookingSubmitBtn.click(function(e) {
	  	// Define variables
		var thisForm = jQuery('.booking');
		var check_in = thisForm.find('input[name="check-in"]').val();
		var check_out = thisForm.find('input[name="check-out"]').val();
		//var promo_code = thisForm.find('input[name="promo-code"]').val();
		
		// Validation
		if (check_in == "Check-in Date" || check_in == null) {
		  alert("Please enter a check-in date");
		  return false;
		};
		if (check_out == "Check-out Date" || check_out == null) {
		  alert("Please enter a check-out date");
		  return false;
		};
		
		//if (promo_code != "") {
		//	promo_code = '&identifier=' + promo_code;
		//} else {
			promo_code = '';
		//}
		
		// Submit
		// bookingUrl = 'https://bookings.ihotelier.com/istay/select_rooms.jsp?hotelId=11999&DateIn=' + check_in + '&DateOut=' + check_out + promo_code;
        var bookingUrl = 'https://bookings.ihotelier.com/bookings.jsp?hotelId=11999&DateIn=' + check_in + '&DateOut=' + check_out + promo_code;
		//var bookingUrl = 'https://booking.ihotelier.com/istay/istay.jsp?hotelId=11999&DateIn=' + check_in + '&DateOut=' + check_out + promo_code;
  //  console.log("This is washington Duke Booking " + bookingUrl);
		bookingSubmitBtn.attr('href',bookingUrl);
  });
});