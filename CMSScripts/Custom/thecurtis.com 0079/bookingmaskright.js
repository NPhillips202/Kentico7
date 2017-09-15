jQuery(function() {    
    // Define variables
	var thisForm = jQuery('.bookingMaskRight');
	var checkIn2 = thisForm.find('input#checkIn2');
	var checkOut2 = thisForm.find('input#checkOut2');
    
  
  // Initialize Datepicker
    checkIn2.datepicker({
		//buttonImage: "calendar.gif",
		//buttonImageOnly: true,
        //showOn: 'both',
        minDate: ('+0D'),
		onSelect: function() {
			var checkOutDate = checkIn2.datepicker('getDate');
			checkOutDate.setDate(checkOutDate.getDate() + 2);
			checkOut2.datepicker("setDate",checkOutDate);
            jQuery(".hasDatepicker").datepicker("hide");
		}
	});
    checkOut2.datepicker({
		//buttonImage: "calendar.gif",
		//buttonImageOnly: true,
        //showOn: 'both',
        minDate: ('+0D')
    });
   
  
  // Set default dates
    checkIn2.datepicker("setDate", new Date());
    var defaultDepartureDate = checkIn2.datepicker('getDate', '+2d');
    defaultDepartureDate.setDate(defaultDepartureDate.getDate() + 2);
    checkOut2.datepicker("setDate", defaultDepartureDate);
  
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
    jQuery('.bookingMaskRight button').click(function(e) {
        e.preventDefault();
        
        var thisForm = jQuery('.bookingMaskRight');
		var checkIn2 = thisForm.find('input#checkIn2').val();
        var checkOut2 = thisForm.find('input#checkOut2').val();
        var adults = thisForm.find('select#adults').val();
        var rooms = thisForm.find('select#rooms').val();
        
        
        if (checkIn2 == "") {
            alert("Please enter a check-in date");
            return false;
        };
        
		checkIn2 = thisForm.find('input#checkIn2').datepicker('getDate');
        var arrivalDay = checkIn2.getDate();
        var arrivalMonth = checkIn2.getMonth() + 1;
        var arrivalYear = checkIn2.getFullYear();
		
		checkOut2 = thisForm.find('input#checkOut2').datepicker('getDate');      
        var departureDay = checkOut2.getDate();
        var departureMonth = checkOut2.getMonth() + 1;
        var departureYear = checkOut2.getFullYear();
		
        var bookingUrl = 'https://secure3.hilton.com/en_US/hi/reservation/book.htm?ctyhocn=DENCHDT&arrivalDay=' + arrivalDay + '&arrivalMonth=' + arrivalMonth + '&arrivalYear=' + arrivalYear + '&departureDay=' + departureDay + '&departureMonth=' + departureMonth + '&departureYear=' + departureYear + '&numAdults=' + adults + '&numRooms=' + rooms;
		window.open(bookingUrl);
    });
});