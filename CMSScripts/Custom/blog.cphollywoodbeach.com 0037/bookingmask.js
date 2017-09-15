jQuery(function() {
    // Default value on Check in date input
    var d = new Date();
    var month = d.getMonth()+1;
    var day = d.getDate();
    var output = month + '/' + day + '/' + d.getFullYear();
    //jQuery('input[name="checkindate"]').val(output);
  
    // Datepicker
    jQuery('input[name="checkindate"]').datepicker({
        minDate: ('+0D'),
        onSelect: function() {
          var checkOut = jQuery('input[name="checkindate"]').datepicker('getDate');
          checkOut.setDate(checkOut.getDate() + 2);
          jQuery('input[name="checkoutdate"]').datepicker('setDate',checkOut);
          jQuery('.hasDatepicker').datepicker('hide');
        }

	});
    jQuery('input[name="checkoutdate"]').datepicker({
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
        if (!ele.hasClass("hasDatepicker") && !ele.hasClass("ui-datepicker") && !ele.hasClass("ui-icon") && !jQuery(ele).parent().parents(".ui-datepicker").length && (eleClass.indexOf('ui-datepicker') == -1)) { 
          jQuery(".hasDatepicker").datepicker("hide");
        };
    });
  
  // Booking Mask Programming
  var bookingSubmitBtn = jQuery('#bookingMask #booknow a');
  bookingSubmitBtn.click(function(e) {
    
    var thisForm = jQuery('#bookingMask');
    var checkindate = thisForm.find('input[name="checkindate"]').val();
    var checkoutdate = thisForm.find('input[name="checkoutdate"]').val();
    var rooms = thisForm.find('select[name="rooms"]').val();
    var adults = thisForm.find('select[name="adults"]').val();
    var children = thisForm.find('select[name="children"]').val();
    
    var tempDateIn = new Date(checkindate);
    var inDay = tempDateIn.getDate();
    var inMonth = tempDateIn.getMonth();
    var inYear = tempDateIn.getFullYear();
    
    inMonth = ((inMonth.toString().length) == 1) ? "0" + inMonth : inMonth;
    
    var tempDateOut = new Date(checkoutdate);
    var outDay = tempDateOut.getDate();
    var outMonth = tempDateOut.getMonth();
    var outYear = tempDateOut.getFullYear();
    
    outMonth = ((outMonth.toString().length) == 1) ? "0" + outMonth : outMonth;
    if ((outMonth == "0") && (outDay <= "31")) {
          outMonth = "12"
          outYear = inYear
      }
    
    var bookingUrl = "http://www.ichotelsgroup.com/redirect?brandCode=cp&path=rates&hotelCode=FLLSO&checkInDate=" + inDay + "&checkInMonthYear=" + inMonth + inYear + "&checkOutDate=" + outDay + "&checkOutMonthYear=" + outMonth + outYear + "&numberOfAdults=" + adults + "&numberOfChildren=" + children + "&numberOfRooms=" + rooms;
    bookingSubmitBtn.attr('href',bookingUrl);
    bookingSubmitBtn.trigger();
  });
});