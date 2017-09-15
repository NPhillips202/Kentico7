jQuery(function() {
	// Define variables
	var thisForm = jQuery('.book-now-main'),
		property = thisForm.find('select.property'),
		checkIn = thisForm.find('input.arrival'),
		checkOut = thisForm.find('input.departure'),
		guests = thisForm.find('select.guests'),
		bookingSubmitBtn = thisForm.find('a.btn-check'),
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
    checkIn.prop("readonly", true);
    checkOut.datepicker({
        minDate: ('+0D')
    });
    checkOut.prop("readonly", true);
	
    // Set default dates
    checkIn.datepicker("setDate", new Date());
    var defaultDepartureDate = checkIn.datepicker('getDate', '+2d');
    defaultDepartureDate.setDate(defaultDepartureDate.getDate() + 2);
    checkOut.datepicker("setDate", defaultDepartureDate);
	
	// Mobile device adjustments for datepicker
	var isMobile = window.matchMedia('only screen and (max-width: 767px)');
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

	// Promo Code FLyout
	jQuery('.promo-trigger').click(function(e) {
		e.preventDefault();
		var promo_wrapper = jQuery('.promo-wrapper');
		if(promo_wrapper.is(":visible") == true)
			promo_wrapper.fadeOut('fast');
		else
			promo_wrapper.fadeIn('fast');
	});

	jQuery('.promo-close').click(function(e) {
		e.preventDefault();
		jQuery('.promo-wrapper').fadeOut('fast');
	});
  
	// Booking Mask Programming
	bookingSubmitBtn.click(function(e) {
		var propertyVal = property.val(),
			checkInDate = checkIn.val(),
			checkOutDate = checkOut.val(),
			guestsVal = guests.val();

		// promo fields
		var group = (thisForm.find('input[name="group"]').val() === '' || thisForm.find('input[name="group"]').val() === undefined) ? '' : thisForm.find('input[name="group"]').val();
		var promo = (thisForm.find('input[name="promo"]').val() === '' || thisForm.find('input[name="promo"]').val() === undefined) ? '' : thisForm.find('input[name="promo"]').val();
		var iata = (thisForm.find('input[name="iata"]').val() === '' || thisForm.find('input[name="iata"]').val() === undefined) ? '' : thisForm.find('input[name="iata"]').val();
		
		var bookingUrl = bookingLink + "&hotel=" + propertyVal + "&arrive=" + checkInDate + "&depart=" + checkOutDate + "&adult=" + guestsVal + "&start=availresults" + (group != '' ? '&group=' + group : '') + (promo != '' ? '&promo=' + promo : '') + (iata != '' ? '&iata=' + iata : '');
		bookingSubmitBtn.attr('href',bookingUrl);
	});
});