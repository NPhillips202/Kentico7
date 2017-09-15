jQuery(function() {
	// Define variables
	var thisForm = jQuery('#bookingMaskForm'),
		checkIn = thisForm.children('input[name="arrive"]'),
		nights = thisForm.children('select[name="nights"]'),
		adult = thisForm.children('select[name="adult"]'),
		bookingSubmitBtn = thisForm.find('#bookingMaskBtn'),
		bookingLink = bookingSubmitBtn.attr('href'); // Put the default booking link into the submit button href
	
    // Initialize Datepicker
    checkIn.datepicker({
        minDate: ('+0D')
	});
    checkIn.prop("readonly", true);
	
    // Set default dates
    checkIn.datepicker("setDate", new Date());
	
	// Mobile device adjustments for datepicker
	var isMobile = window.matchMedia('only screen and (max-width: 615px)');
    if (isMobile.matches) {
		jQuery('.datepicker').each(function() {
			jQuery(this).get(0).type='date';
			jQuery('input[type="date"]').datepicker("destroy");
            jQuery(this).prop("readonly", false);
		});
	};
    
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
        var nightsVal = nights.val(),
            adultVal = adult.val();
    	
		// Validation
        if (nightsVal == "#Nights") {
            alert("Please enter number of nights");
            return false;
        } else if (adultVal == "#Guest") {
            alert("Please enter number of guests");
            return false;
        };
        
        // Calculate and format dates
        var checkInVal = checkIn.datepicker('getDate'),
        	checkInYear = checkInVal.getFullYear().toString(),
        	checkInMonth = (checkInVal.getMonth() + 1).toString(),
            checkInDay = checkInVal.getDate().toString();
        if (checkInMonth.length == 1) { checkInMonth = '0' + checkInMonth; };
        if (checkInDay.length == 1) { checkInDay = '0' + checkInDay; };
        var checkInFormatted = checkInYear + checkInMonth + checkInDay;

		var checkOutVal = checkIn.datepicker('getDate');
            checkOutVal.setDate(checkOutVal.getDate() + parseInt(nightsVal);

        var checkOutYear = checkOutVal.getFullYear().toString(),
        	checkOutMonth = (checkOutVal.getMonth() + 1).toString(),
            checkOutDay = checkOutVal.getDate().toString();
        if (checkOutMonth.length == 1) { checkOutMonth = '0' + checkOutMonth; };
        if (checkOutDay.length == 1) { checkOutDay = '0' + checkOutDay; };
        var checkOutFormatted = checkOutYear + checkOutMonth + checkOutDay;

        console.log('Arrival - ' + checkInFormatted + ' | Departure - ' + checkOutFormatted);
		
		var bookingUrl = bookingLink + '&arrival=' + checkInFormatted + '&departure=' + checkOutFormatted + '&numAdults=' + adultVal;
		bookingSubmitBtn.attr('href',bookingUrl);
	});
});