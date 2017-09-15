jQuery(function() {
	// Define variables
	var thisForm = jQuery('.book-now-main'),
		property = thisForm.find('select.property'),
		checkIn = thisForm.find('input.arrival'),
		nights = thisForm.find('select.nights'),
		guests = thisForm.find('select.guests'),
		bookingSubmitBtn = thisForm.find('a.btn-check'),
		bookingLink = bookingSubmitBtn.attr('href'); // Put the default booking link into the submit button href
	
    // Initialize Datepicker
    checkIn.datepicker({
        minDate: ('+0D'),
		onSelect: function() {
            jQuery(".hasDatepicker").datepicker("hide");
		}
	});
	
    // Set default dates
    checkIn.datepicker("setDate", new Date());
	
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
		var propertyVal = property.val(),
			checkInDate = checkIn.val(),
			nightsVal = nights.val(),
			guestsVal = guests.val();
		
		var bookingUrl = bookingLink + "&hotel=" + propertyVal + "&arrive=" + checkInDate + "&nights=" + nightsVal + "&adult=" + guestsVal + "&start=availresults";
		bookingSubmitBtn.attr('href',bookingUrl);
	});
});