jQuery(function() {
	// Define variables
	var checkInDesktop = jQuery('.bookingFormDesktop').find('input.checkIn');
	var checkOutDesktop = jQuery('.bookingFormDesktop').find('input.checkOut');
	var checkInMobile = jQuery('.bookingFormMobile').find('input.checkIn');
	var checkOutMobile = jQuery('.bookingFormMobile').find('input.checkOut');
	var bookingSubmitBtn = jQuery('.bookingSubmitMobile, .bookingSubmitDesktop');
	var bookingLink = bookingSubmitBtn.attr('href'); // Put the default booking link into the submit button href
	
    // Initialize Datepicker
    checkInDesktop.datepicker({
        //minDate: ('+0D'),
        minDate:('8/8/2016'), // ('8/4/2016')('7/15/2016'),
		onSelect: function() {
			var checkOutDate = checkInDesktop.datepicker('getDate');
			checkOutDate.setDate(checkOutDate.getDate() + 1);//checkOutDate.setDate(checkOutDate.getDate() + 2);
			checkOutDesktop.datepicker("setDate",checkOutDate);
            jQuery(".hasDatepicker").datepicker("hide");
		}
	});
    checkOutDesktop.datepicker({
        minDate: ('+0D')
    });

   checkInMobile.datepicker({
        minDate: ('+0D'),
		onSelect: function() {
			var checkOutDate = checkInMobile.datepicker('getDate');
			checkOutDate.setDate(checkOutDate.getDate() + 1);//checkOutDate.setDate(checkOutDate.getDate() + 2);
			checkOutMobile.datepicker("setDate",checkOutDate);
            jQuery(".hasDatepicker").datepicker("hide");
		}
	});
    checkOutMobile.datepicker({
        minDate: ('+0D')
    });
  
  
  
    // Set default dates
    checkInDesktop.datepicker("setDate", new Date());
    var defaultDepartureDate = checkInDesktop.datepicker('getDate', '+2d');
    defaultDepartureDate.setDate(defaultDepartureDate.getDate() + 1);//  defaultDepartureDate.setDate(defaultDepartureDate.getDate() + 2);
    checkOutDesktop.datepicker("setDate", defaultDepartureDate);

   checkInMobile.datepicker("setDate", new Date());
    var defaultDepartureDate = checkInMobile.datepicker('getDate', '+2d');
    defaultDepartureDate.setDate(defaultDepartureDate.getDate() + 1);// defaultDepartureDate.setDate(defaultDepartureDate.getDate() + 2);
    checkOutMobile.datepicker("setDate", defaultDepartureDate);
    
    
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
		if (jQuery(this).hasClass('bookingSubmitDesktop')) {
			thisForm = jQuery('.bookingFormDesktop');
		} else if (jQuery(this).hasClass('bookingSubmitMobile')) {
			thisForm = jQuery('.bookingFormMobile');
		} else {
			console.log('No form found.');
			return false;
		}

		var checkInDate = thisForm.find('input.checkIn').val(); // 2016-07-15
        console.log(checkInDate);
		var checkOutDate = thisForm.find('input.checkOut').val();
        console.log(checkOutDate);
		var adults = thisForm.find('select.adults').val();
		//var children = thisForm.find('select.children').val();
		var promoCode = thisForm.find('input.promoCode').val();
		if (promoCode.length > 0) {
			promoCode = '&promo=' + promoCode;
		}

		// Convert date format
	    var tempDateIn = new Date(checkInDate);
	    var inDay = tempDateIn.getDate();
	    var inMonth = tempDateIn.getMonth() + 1;
	    var inYear = tempDateIn.getFullYear();
	    var checkInDate = inYear + '-' + inMonth + '-' + inDay;
        console.log(checkInDate);
	    var tempDateOut = new Date(checkOutDate);
	    var outDay = tempDateOut.getDate();
	    var outMonth = tempDateOut.getMonth() + 1;
	    var outYear = tempDateOut.getFullYear();
	    var checkOutDate = outYear + '-' + outMonth + '-' + outDay;
      console.log(checkOutDate);
		
		// Validate
		if (adults == 'ADULTS') {
			alert('Please select a value for Adults.');
			return false;
		}
		
		//if (children == 'CHILDREN') {
		//	alert('Please select a value for Children.');
		//	return false;
		//}

		// Submit
		//var bookingUrl = bookingLink + 'search/?arrival_date=' + checkInDate + '&departure_date=' + checkOutDate + '&adults[]=' + adults + '&children[]=' + children + '&rooms=1' + promoCode;
        var bookingUrl = bookingLink + 'search/?arrival_date=' + checkInDate + '&departure_date=' + checkOutDate + '&adults[]=' + adults + '&rooms=1' + promoCode;
		bookingSubmitBtn.attr('href',bookingUrl);
	});
});