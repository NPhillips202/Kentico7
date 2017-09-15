jQuery(function() {
    // Datepicker
    jQuery('input#checkIn').datepicker();
    
    // Close Datepicker
    jQuery(document).click(function(e) { 
        var ele = jQuery(e.target);
        if (!ele.hasClass("hasDatepicker") && !ele.hasClass("ui-datepicker") && !ele.hasClass("ui-icon") && !jQuery(ele).parent().parents(".ui-datepicker").length)
            jQuery(".hasDatepicker").datepicker("hide"); 
    });
    
    // Booking Mask Programming
    jQuery('.bookingMask button').click(function(e) {
        e.preventDefault();
        
        var thisForm = jQuery('.bookingMask');
		var checkIn = thisForm.find('input#checkIn').val();
        var nights = thisForm.find('select#nights').val();
        var promo = thisForm.find('input#promo').val();
        var group = thisForm.find('input#group').val();
        var corp = thisForm.find('input#corp').val();
        
        if (checkIn == "") {
            alert("Please enter a check-in date");
            return false;
        };
        
		checkIn = thisForm.find('input#checkIn').datepicker('getDate');
        var arrivalDay = checkIn.getDate();
        var arrivalMonth = checkIn.getMonth() + 1;
        var arrivalYear = checkIn.getFullYear();
		
		var checkOut = thisForm.find('input#checkIn').datepicker('getDate');
		checkOut.setDate(checkOut.getDate() + parseInt(nights));
        var departureDay = checkOut.getDate();
        var departureMonth = checkOut.getMonth() + 1;
        var departureYear = checkOut.getFullYear();
		
        var bookingUrl = 'https://secure3.hilton.com/en_US/hi/reservation/book.htm?ctyhocn=LAXABES&arrivalDay=' + arrivalDay + '&arrivalMonth=' + arrivalMonth + '&arrivalYear=' + arrivalYear + '&departureDay=' + departureDay + '&departureMonth=' + departureMonth + '&departureYear=' + departureYear + '&NumOfNight=' + nights + '&spec_plan=' + promo + '&groupCode=' + group + '&corporateCode=' + corp;
		window.open(bookingUrl);
    });
});