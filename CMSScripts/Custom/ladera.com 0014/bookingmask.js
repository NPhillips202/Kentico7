jQuery(function() {
    // Default value on Check in date input
    var d = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var month = d.getMonth()+1;
    var day = d.getDate();
    
    var output = ((''+month).length<2 ? '0' : '') + month + '/' +
        ((''+day).length<2 ? '0' : '') + day + '/' + d.getFullYear();
    //var output = month + '/' + day + '/' + d.getFullYear();
    //jQuery('input[name="checkindate"]').val(output);
    jQuery('input[name="checkindate"]').attr('value',output);
  
    // Datepicker
    jQuery('input[name="checkindate"]').datepicker({
        minDate: ('+0D'),
		onSelect: function() {
			//var checkOut = jQuery('.booking').find('input[name="check-in"]').datepicker('getDate');
			//checkOut.setDate(checkOut.getDate() + 2);
			//jQuery('.booking').find('input[name="check-out"]').datepicker("setDate",checkOut);
            jQuery(".hasDatepicker").datepicker("hide");
		}
	});
    //jQuery('input[name="check-out"]').datepicker({
    //    minDate: ('+0D')
    //});
    
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
  var bookingSubmitBtn = jQuery('#booking .book-submit');
  bookingSubmitBtn.click(function(e) {
    
    //alert('in...');
    
    var thisForm = jQuery('#booking');
    var checkindate = thisForm.find('input[name="checkindate"]').val();
    //var checkoutdate = thisForm.find('input[name="check-out"]').val();
    var nights = thisForm.find('select[name="nights"]').val();
    var adults = thisForm.find('select[name="adults"]').val();
    //var children = thisForm.find('select[name="children"]').val();
    
    if (checkindate == null) {
      alert("Please enter a Check In date");
      return false;
    };
    //if (check_out == "Check-out Date" || check_out == null) {
    //  alert("Please enter a check-out date");
    //  return false;
    //};
    
    //var length = (jQuery('input[name="check-in"]').datepicker("getDate") - jQuery('input[name="check-out"]').datepicker("getDate")) / 1000 / 60 / 60 / 24;
    
    var bookingUrl = 'https://reservations.travelclick.com/102179?languageid=1&culture=1&rooms=1&DateIn=' + checkindate + '&adults=' + adults + '&nights=' + nights;
    //var bookingUrl = 'https://booking.ihotelier.com/istay/istay.jsp?HotelID=13241&DateIn=' + check_in + '&DateOut=' + check_out + '&Adults=' + adult + '&Children=' + children;
    bookingSubmitBtn.attr('href',bookingUrl);
  });
});