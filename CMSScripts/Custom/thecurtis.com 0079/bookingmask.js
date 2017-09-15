jQuery(function() {
    // Datepicker
    jQuery('input#datepicker').datepicker();
    
    // Close Datepicker
    jQuery(document).click(function(e) { 
        var ele = jQuery(e.target);
        if (!ele.hasClass("hasDatepicker") && !ele.hasClass("ui-datepicker") && !ele.hasClass("ui-icon") && !jQuery(ele).parent().parents(".ui-datepicker").length)
            jQuery(".hasDatepicker").datepicker("hide"); 
    });
    
    // Booking Mask Programming
    jQuery('.bookingMask button').click(function(e) {
     // alert('checking rates');
        e.preventDefault();
        
        var thisForm = jQuery('.bookingMask');
		var checkIn = thisForm.find('input#datepicker').val();
        var checkOut = thisForm.find('input#datepicker1').val();
        var rooms = thisForm.find('select#rooms').val();
         var guests = thisForm.find('select#guests').val();
        /*var promo = thisForm.find('input#promo').val();
        var group = thisForm.find('input#group').val();
        var corp = thisForm.find('input#corp').val();*/
        
        if (checkIn == "") {
            alert("Please enter a check-in date");
            return false;
        };
      
       if (checkOut == "") {
            alert("Please enter a check-out date");
            return false;
        };
        
		checkIn = thisForm.find('input#datepicker').datepicker('getDate');
        var arrivalDay = checkIn.getDate();
        var arrivalMonth = checkIn.getMonth() + 1;
        var arrivalYear = checkIn.getFullYear();
      alert("arrivalDay+arrivalMonth+arrivalYear");
		
		var checkOut = thisForm.find('input#datepicker1').datepicker('getDate');
		checkOut.setDate(checkOut.getDate() + parseInt(nights));
        var departureDay = checkOut.getDate();
        var departureMonth = checkOut.getMonth() + 1;
        var departureYear = checkOut.getFullYear();
		
        
		var bookingUrl = 'https://secure3.hilton.com/en_US/dt/reservation/book.htm?execution=e2s1?ctyhocn=DENCHDT&arrivalDay=' + arrivalDay + '&arrivalMonth=' + arrivalMonth + '&arrivalYear=' + arrivalYear + '&departureDay=' + departureDay + '&departureMonth=' + departureMonth + '&departureYear=' + departureYear + '&NumOfNight=' + nights;
		//alert(bookingUrl);
      window.open(bookingUrl);
    });
});