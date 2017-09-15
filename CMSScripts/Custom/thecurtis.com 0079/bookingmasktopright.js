jQuery(function() {    
    // Define variables
	var thisForm = jQuery('.bookingMaskTopRight');
	var checkIn3 = thisForm.find('input#checkIn3');
	var checkOut3 = thisForm.find('input#checkOut3');
    
  
  // Initialize Datepicker
    checkIn3.datepicker({
		//buttonImage: "calendar.gif",
		//buttonImageOnly: true,
        //showOn: 'both',
        minDate: ('+0D'),
		onSelect: function() {
			var checkOutDate = checkIn3.datepicker('getDate');
			checkOutDate.setDate(checkOutDate.getDate() + 2);
			checkOut3.datepicker("setDate",checkOutDate);
            jQuery(".hasDatepicker").datepicker("hide");
		}
	});
    checkOut3.datepicker({
		//buttonImage: "calendar.gif",
		//buttonImageOnly: true,
        //showOn: 'both',
        minDate: ('+0D')
    });
   
  
  // Set default dates
    checkIn3.datepicker("setDate", new Date());
    var defaultDepartureDate = checkIn3.datepicker('getDate', '+2d');
    defaultDepartureDate.setDate(defaultDepartureDate.getDate() + 2);
    checkOut3.datepicker("setDate", defaultDepartureDate);
  
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
    jQuery('.bookingMaskTopRight button').click(function(e) {
        e.preventDefault();
        
        var thisForm = jQuery('.bookingMaskTopRight');
		var checkIn3 = thisForm.find('input#checkIn3').val();
        var checkOut3 = thisForm.find('input#checkOut3').val();
        var adults = thisForm.find('select#adults').val();
        var rooms = thisForm.find('select#rooms').val();
        
        
        if (checkIn3 == "") {
            alert("Please enter a check-in date");
            return false;
        };
        
		checkIn3 = thisForm.find('input#checkIn3').datepicker('getDate');
        var arrivalDay = checkIn3.getDate();
        var arrivalMonth = checkIn3.getMonth() + 1;
        var arrivalYear = checkIn3.getFullYear();
		
		checkOut3 = thisForm.find('input#checkOut3').datepicker('getDate');      
        var departureDay = checkOut3.getDate();
        var departureMonth = checkOut3.getMonth() + 1;
        var departureYear = checkOut3.getFullYear();
		
        var bookingUrl = 'https://secure3.hilton.com/en_US/hi/reservation/book.htm?ctyhocn=DENCHDT&arrivalDay=' + arrivalDay + '&arrivalMonth=' + arrivalMonth + '&arrivalYear=' + arrivalYear + '&departureDay=' + departureDay + '&departureMonth=' + departureMonth + '&departureYear=' + departureYear + '&numAdults=' + adults + '&numRooms=' + rooms;
		window.open(bookingUrl);
    });
});