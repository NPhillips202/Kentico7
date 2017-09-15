jQuery(function() {
    // Datepicker
    jQuery('input[name="check-in"]').datepicker({
        minDate: ('+0D'),
		onSelect: function() {
			var checkOut = jQuery('.booking').find('input[name="check-in"]').datepicker('getDate');
			checkOut.setDate(checkOut.getDate() + 2);
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
  var bookingSubmitBtn = jQuery('.booking .bookingSubmit');
  bookingSubmitBtn.click(function(e) {
    var thisForm = jQuery('.booking');
    var check_in = thisForm.find('input[name="check-in"]').val();
    var check_out = thisForm.find('input[name="check-out"]').val();
    var adult = thisForm.find('select[name="adult"]').val();
    var children = thisForm.find('select[name="children"]').val();
    
    if (check_in == "Check-in Date" || check_in == null) {
      alert("Please enter a check-in date");
      return false;
    };
    if (check_out == "Check-out Date" || check_out == null) {
      alert("Please enter a check-out date");
      return false;
    };
    
    //var length = (jQuery('input[name="check-in"]').datepicker("getDate") - jQuery('input[name="check-out"]').datepicker("getDate")) / 1000 / 60 / 60 / 24;
    
    var bookingUrl = 'https://bookings.ihotelier.com/istay/istay.jsp?HotelID=13241&DateIn=' + check_in + '&DateOut=' + check_out + '&Adults=' + adult + '&Children=' + children;
    bookingSubmitBtn.attr('href',bookingUrl);
  });
});