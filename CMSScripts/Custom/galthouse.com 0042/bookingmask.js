jQuery(function() {
// -- Set the Variables below to your specific check-in/check-out input fields, Anchor tag for submit btn
  var myHotelID = '6944',
      myCheckInField = jQuery('input[name="check-in"]'),
      myNightsCount = jQuery('.nights').find('select option:selected').text(),
      myGuestsCount = jQuery('.guests').find('select option:selected').text(),
      bookingSubmitBtn = jQuery('.reservations .submitBtn a'),
      
// -- The Variables below load the date fields on pageload...no need to edit them
      now = new Date(),
      day = ("0" + now.getDate()).slice(-2),
      month = ("0" + (now.getMonth() + 1)).slice(-2),
      today = month + "/" + day + "/" + now.getFullYear();
  
// -- on Pageload - set checkin date to today's date
      myCheckInField.attr('value', today);
  
// -- Set Datepickers
  myCheckInField.datepicker({
        minDate: ('+0D')
  });
    
// -- Close Datepicker
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
  
// -- Submit button functionality
	bookingSubmitBtn.click(function(e) {
		var check_in = myCheckInField.val();
      
        myNightsCount = jQuery('.nights').find('.selectBox-label').text();
        myGuestsCount = jQuery('.guests').find('.selectBox-label').text();
    
		if (check_in == "mm/dd/yyyy" || check_in == null) {
			alert("Please enter a check-in date");
			return false;
		};
      
// -- EDIT THIS BOOKING URL FOR DIFFERENT TYPES OF BOOKING MASKS		
		var bookingUrl = 'https://bookings.ihotelier.com/istay/select_rooms.jsp' + 
                         '?hotelId=' + myHotelID + 
                         '&DateIn=' + check_in +
                         '&nights=' + myNightsCount +
                         '&adults=' + myGuestsCount;
		bookingSubmitBtn.attr('href',bookingUrl);
	});
});