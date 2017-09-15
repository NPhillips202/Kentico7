jQuery(function() {
	// Define variables
	var thisForm = jQuery('.bookingForm');
	var checkIn = thisForm.find('input.checkIn');
	var checkOut = thisForm.find('input.checkOut');
	var bookingSubmitBtn = thisForm.find('.bookingSubmit');
	var bookingLink = bookingSubmitBtn.attr('href'); // Put the default booking link into the submit button href
    
    // Initialize Datepicker
    checkIn.datepicker({
        minDate: ('+0D'),
        dateFormat: 'm/d/yy',
		onSelect: function() {
			var checkOutDate = checkIn.datepicker('getDate');
			checkOutDate.setDate(checkOutDate.getDate() + 2);
			checkOut.datepicker("setDate",checkOutDate);
            jQuery(".hasDatepicker").datepicker("hide");
		}
	});
    //checkIn.prop("disabled", false);
    //checkIn.prop("readonly", true);
    checkIn.parent().children('.booking-click').click(function() {
        checkIn.datepicker('show');
    });
  
    checkOut.datepicker({
        minDate: ('+0D'),
        dateFormat: 'm/d/yy'
    });
    //checkOut.prop("disabled", false);
    //checkOut.prop("readonly", true);
    checkOut.parent().children('.booking-click').click(function() {
        checkOut.datepicker('show');
    });
	
    // Set default dates
    checkIn.datepicker("setDate", new Date());
    var defaultDepartureDate = checkIn.datepicker('getDate', '+2d');
    defaultDepartureDate.setDate(defaultDepartureDate.getDate() + 2);
    checkOut.datepicker("setDate", defaultDepartureDate);
    
    // Close Datepicker
    jQuery(document).click(function(e) { 
        var ele = jQuery(e.target);
        if (jQuery(ele).attr('class') !== undefined) {
            var eleClass = jQuery(ele).attr('class');
        } else {
            var eleClass = '';
        };
        if (!ele.hasClass("hasDatepicker") && !ele.hasClass("ui-datepicker") && !ele.hasClass("ui-icon") && !jQuery(ele).parent().parents(".ui-datepicker").length && (eleClass.indexOf('ui-datepicker') == -1)) {
            //console.log('Close datepicker');
            jQuery(".hasDatepicker").datepicker("hide");
        };
    });
/*code modified OK 02-03-17*/ 
    function formatDate(date){
    var yyyy = date.getFullYear();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    if(dd<10){
      dd='0'+ dd;
    }
    if(mm<10){
      mm='0'+mm;
    } 
    return (yyyy + '-' + mm + '-' + dd);
   
    }
	// Booking Mask Programming
	bookingSubmitBtn.click(function(e) {
		var checkInDate = thisForm.find('input.checkIn').val();
		var checkOutDate = thisForm.find('input.checkOut').val();
		var adults = thisForm.find('select.adults').val();
		var children = thisForm.find('select.children').val();
		var rooms = thisForm.find('select.rooms').val();
		console.log(checkInDate);
        
        // Validation
        if (checkInDate == '' || checkOutDate == '') {
            alert('Please enter Check In and Check Out dates.');
            return false;
        };
        checkInDate = thisForm.find('input.checkIn').datepicker('getDate');
        checkOutDate = thisForm.find('input.checkOut').datepicker('getDate');
        console.log(rooms);
		// Submit
      var linkerParam='';
      ga(function(tracker) {
        linkerParam=tracker.get('linkerParam');
      }); 
     // linkerParam
        var bookingUrl = 'https://www.myhotelreservation.net/b/hllw1903/' + '?f=' + formatDate(checkInDate) + '&t=' + formatDate(checkOutDate) + '&a=' + adults + '&c=' + children + '&rr=rooms&' +  linkerParam;
		bookingSubmitBtn.attr('href',bookingUrl);
	});
});

/*  Code modified above OK 02-03-17 
Booking Mask Programming
	bookingSubmitBtn.click(function(e) {
		var checkInDate = thisForm.find('input.checkIn').val();
		var checkOutDate = thisForm.find('input.checkOut').val();
		var adults = thisForm.find('select.adults').val();
		var children = thisForm.find('select.children').val();
		var rooms = thisForm.find('select.rooms').val();
        
        // Validation
        if (checkInDate == '' || checkOutDate == '') {
            alert('Please enter Check In and Check Out dates.');
            return false;
        };

        // Check In
        var checkInDate = thisForm.find('input.checkIn').datepicker('getDate'),
            checkInYear = checkInDate.getFullYear().toString(),
            checkInMonth = (checkInDate.getMonth() + 1).toString(),
            checkInDay = checkInDate.getDate().toString(),
            checkInDateFormatted = checkInYear + '-' + checkInMonth + '-' + checkInDay;

        // Check Out
        var checkOutDate = thisForm.find('input.checkOut').datepicker('getDate'),
            checkOutYear = checkOutDate.getFullYear().toString(),
            checkOutMonth = (checkOutDate.getMonth() + 1).toString(),
            checkOutDay = checkOutDate.getDate().toString(),
            checkOutDateFormatted = checkOutYear + '-' + checkOutMonth + '-' + checkOutDay;

		// Submit
        var bookingUrl = bookingLink + '&arrivalDate=' + checkInDateFormatted + '&departureDate=' + checkOutDateFormatted + '&adults=' + adults + '&children=' + children + '&rooms=' + rooms;
		bookingSubmitBtn.attr('href',bookingUrl);
	});
});