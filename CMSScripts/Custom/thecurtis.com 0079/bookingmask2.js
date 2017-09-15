jQuery(function() {    
    // Define variables
	var thisForm = jQuery('.bookingMask');
	var checkIn = thisForm.find('input#checkIn');
	var checkOut = thisForm.find('input#checkOut');
    
  
  // Initialize Datepicker
    checkIn.datepicker({
		//buttonImage: "calendar.gif",
		//buttonImageOnly: true,
        //showOn: 'both',
        minDate: ('+0D'),
		onSelect: function() {
			var checkOutDate = checkIn.datepicker('getDate');
			checkOutDate.setDate(checkOutDate.getDate() + 2);
			checkOut.datepicker("setDate",checkOutDate);
            jQuery(".hasDatepicker").datepicker("hide");
		}
	});
    checkOut.datepicker({
		//buttonImage: "calendar.gif",
		//buttonImageOnly: true,
        //showOn: 'both',
        minDate: ('+0D')
    });
   
  
  // Set default dates
    checkIn.datepicker("setDate", new Date());
    var defaultDepartureDate = checkIn.datepicker('getDate', '+2d');
    defaultDepartureDate.setDate(defaultDepartureDate.getDate() + 2);
    checkOut.datepicker("setDate", defaultDepartureDate);
  
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
    jQuery('.bookingMask button').click(function(e) {
        e.preventDefault();
        
        var thisForm = jQuery('.bookingMask');
		var checkIn = thisForm.find('input#checkIn').val();
        var checkOut = thisForm.find('input#checkOut').val();
        var adults = thisForm.find('select#adults').val();
        var rooms = thisForm.find('select#rooms').val();
        
        
        if (checkIn == "") {
            alert("Please enter a check-in date");
            return false;
        };
        
		checkIn = thisForm.find('input#checkIn').datepicker('getDate');
        var arrivalDay = checkIn.getDate();
        var arrivalMonth = checkIn.getMonth() + 1;
        var arrivalYear = checkIn.getFullYear();
		
		checkOut = thisForm.find('input#checkOut').datepicker('getDate');      
        var departureDay = checkOut.getDate();
        var departureMonth = checkOut.getMonth() + 1;
        var departureYear = checkOut.getFullYear();
		
        var bookingUrl = 'https://secure3.hilton.com/en_US/hi/reservation/book.htm?ctyhocn=DENCHDT&arrivalDay=' + arrivalDay + '&arrivalMonth=' + arrivalMonth + '&arrivalYear=' + arrivalYear + '&departureDay=' + departureDay + '&departureMonth=' + departureMonth + '&departureYear=' + departureYear + '&numAdults=' + adults + '&numRooms=' + rooms;
		window.open(bookingUrl);
    });
});