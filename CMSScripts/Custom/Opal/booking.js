jQuery(function() {
	// Define variables
	var thisForm = jQuery('.book-now-main'),
		checkIn = thisForm.find('input.arrival'),
		checkOut = thisForm.find('input.depart'),
		adults = thisForm.find('select.adults'),
		children = thisForm.find('select.children'),
		promoType = thisForm.find('select.promoType'),
		promo = thisForm.find('input.promo'),
		bookingSubmitBtn = thisForm.find('.check-now a'),
		bookingLink = bookingSubmitBtn.attr('href'); // Put the default booking link into the submit button href
	
    // Initialize Datepicker
    checkIn.datepicker({
        minDate: ('+0D'),
		onSelect: function() {
			var checkOutDate = checkIn.datepicker('getDate');
			checkOutDate.setDate(checkOutDate.getDate() + 2);
			checkOut.datepicker("setDate",checkOutDate);
            jQuery(".hasDatepicker").datepicker("hide");
		}
	});
    checkOut.datepicker({
        minDate: ('+0D')
    });
	
    // Set default dates
    checkIn.datepicker("setDate", new Date());
    var defaultDepartureDate = checkIn.datepicker('getDate', '+2d');
    defaultDepartureDate.setDate(defaultDepartureDate.getDate() + 2);
    checkOut.datepicker("setDate", defaultDepartureDate);
	
	// Mobile device adjustments for datepicker
    //if (isMobile.matches) {
	//	jQuery('.datepicker').each(function() {
	//		jQuery(this).get(0).type='date';
	//		jQuery('input[type="date"]').datepicker("destroy");
	//	});
	//};
    
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
	bookingSubmitBtn.click(function(e) {
			checkInDate = checkIn.val(),
			checkOutDate = checkOut.val(),
			adultsVal = adults.val(),
			childrenVal = children.val(),
			promoTypeVal = promoType.val(),
			promoVal = promo.val(),
            promoQuery = '';
        
        if (promoTypeVal !== '' && promoVal !== 'Promo Code') {
            promoQuery = '&' + promoTypeVal + '=' + promoVal;
        };
		
		//var bookingUrl = bookingLink + "?startDate=" + checkInDate + "&endDate=" + checkOutDate + "&adults=" + adultsVal + "&children=" + childrenVal + promoQuery;
		 var bookingUrl = bookingLink + "?startDate=" + checkInDate + "&endDate=" + checkOutDate + "&adults=" + adultsVal + "&children=" + childrenVal + "&requestType=" + promoTypeVal + "&code=" + promoVal;
          bookingSubmitBtn.attr('href',bookingUrl);
     
	});
});