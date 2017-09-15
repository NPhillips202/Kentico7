jQuery(function() {
	// Define variables
	var thisForm = jQuery('.book-now-main'),
		property = thisForm.find('select.propertySelect'),
		checkIn = thisForm.find('input.arrival'),
		checkOut = thisForm.find('input.depart'),
		nights = thisForm.find('select.nights'),
		adults = thisForm.find('select.adults'),
		children = thisForm.find('select.children'),
		guests = thisForm.find('select.guests'),
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
        propertyVal = property.val(),
		checkInDate = checkIn.val(),
		checkOutDate = checkOut.val(),
		nightsVal = nights.val(),
		adultsVal = adults.val(),
		childrenVal = children.val(),
		guestsVal = guests.val(),
		promoTypeVal = promoType.val(),
        promoVal = promo.val(),
        promoQuery = '';
        
        // Assigning values only if fields exist, because one booking file is used for both corp and invididual booking masks
        if (property.length > 0) { 
            if (propertyVal !== "") { var propertyQuery = "?hotelCode=" + propertyVal; } else { alert("Please select a property."); return false; } 
        } else {
            var propertyQuery = '';
        };
        if (checkInDate !== undefined) { 
            if (propertyVal !== undefined) { sym = "&"; } else { sym = "?"; } // Checkin isn't first if property field exists
            var checkInDateQuery = sym + "startDate=" + checkInDate;
        } else { 
            var checkInDateQuery = '';
        }
        if (checkOutDate !== undefined) { var checkOutDateQuery = "&endDate=" + checkOutDate; } else { var checkOutDateQuery = ''; }
        if (nightsVal !== undefined) { 
            // Turn nights into check-out date
            var date = checkIn.datepicker("getDate")
            date.setDate(date.getDate() + parseInt(nightsVal));
            date = jQuery.datepicker.formatDate("mm/dd/yy", date);
            var nightsValQuery = "&endDate=" + date; 
        } else { 
            var nightsValQuery = '';
        }
        if (adultsVal !== undefined) { var adultsValQuery = "&adults=" + adultsVal; } else { var adultsValQuery = ''; }
        if (childrenVal !== undefined) { var childrenValQuery = "&children=" + childrenVal; } else { var childrenValQuery = ''; }
        if (guestsVal !== undefined) { var guestsValQuery = "&adults=" + guestsVal; } else { var guestsValQuery = ''; }
        if (promoTypeVal !== '' && promoVal !== 'Promo Code') { promoQuery = "&requestType=" + promoTypeVal + "&code=" + promoVal; };
		
        var bookingUrl = bookingLink + propertyQuery + checkInDateQuery + checkOutDateQuery + nightsValQuery + adultsValQuery + childrenValQuery + guestsValQuery + promoQuery;
		bookingSubmitBtn.attr('href',bookingUrl);
	});
});