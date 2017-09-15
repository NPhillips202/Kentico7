jQuery(function() {
    // Datepicker
    jQuery('input#checkIn').datepicker({
        minDate: ('+0D'),
		onSelect: function() {
			var checkOut = jQuery('.bookingMask').find('input#checkIn').datepicker('getDate');
			checkOut.setDate(checkOut.getDate() + 2);
			jQuery('.bookingMask').find('input#checkOut').datepicker("setDate",checkOut);
            jQuery(".hasDatepicker").datepicker("hide");
		}
	});
    jQuery('input#checkOut').datepicker({
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
    jQuery('.bookingMask .bookingSubmit').click(function(e) {
        var thisForm = jQuery('.bookingMask');
		var propertyCode = 'LAXAX';
		var checkIn = thisForm.find('input#checkIn').val();
		var checkOut = thisForm.find('input#checkOut').val();
		var rooms = thisForm.find('select[name="rooms"]').val();
		var corp = thisForm.find('input[name="corp"]').val();
		var group = thisForm.find('input[name="group"]').val();
        
        if (checkIn == '') {
            alert("Please enter a check-in date");
            return false;
        };
        
        if (checkOut == '') {
            alert("Please enter a check-out date");
            return false;
        };
      
        //console.log(rooms);
		
		if (corp != '') {
			var corp = '&corporateCode=' + corp;
		} else {
			var corp = '';
		}
		
		if (group != '') {
			var group = '&groupCode=' + group;
		} else {
			var group = '';
		}

        var bookingUrl = 'https://www.marriott.com/reservation/availabilitySearch.mi?propertyCode=' + propertyCode + '&fromDate=' + checkIn + '&toDate=' + checkOut + '&numberOfRooms=' + rooms + corp + group;
		//console.log(bookingUrl);
        //return false;
        jQuery(this).attr('href', bookingUrl);
        //e.preventDefault();
    });
});