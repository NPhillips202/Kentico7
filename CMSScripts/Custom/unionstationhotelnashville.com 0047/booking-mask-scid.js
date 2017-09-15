jQuery(function() {
	// Define Variables
	var dateFormat = 'm/d/yy'; // date format
	var altDateFormat = 'DD, MM dd, yy'; // spelled out Day and date # format
	//var altDateFormat = 'dd, mm dd, yy'; // numbers
    //var thisForm = jQuery('#booking-engine');
	var datePicker = jQuery('.datepicker');
	var hasDatePicker = jQuery('.hasDatepicker');
	var checkIn = jQuery('input[name="check-in"]');
	var checkOut = jQuery('input[name="check-out"]');
	var bookingSubmitBtn = jQuery('.bookingSubmit');
    var defaultBookingUrl = jQuery('#book-now-link').attr('href');
	var isMobile = window.matchMedia('only screen and (max-width: 765px)');

    // Datepicker
    jQuery('#main').find('.datepicker').datepicker({
        minDate: ('+0D'),
		onSelect: function() {
            hasDatePicker.datepicker("hide");
		}
    });
    //datePicker.datepicker({
    checkIn.datepicker({
		showOn: "both",
		buttonImage: "/getmedia/82f45294-41be-4642-84e0-23cb728a63aa/book-mask-cal-icon/",
		buttonImageOnly: true,
		
        minDate: ('+0D'),
		onSelect: function() {
			var checkOutDate = checkIn.datepicker('getDate');
			checkOutDate.setDate(checkOutDate.getDate() + 1);
			checkOut.datepicker("setDate",checkOutDate);
            hasDatePicker.datepicker("hide");
		}
	});
    checkOut.datepicker({
		showOn: "both",
		buttonImage: "/getmedia/82f45294-41be-4642-84e0-23cb728a63aa/book-mask-cal-icon/",
		buttonImageOnly: true,
        minDate: ('+0D')
    });
	
	// mobile device adjustments for datepicker
    if (isMobile.matches) {
		jQuery('.datepicker').each(function() {
			jQuery(this).get(0).type='date';
			jQuery('input[type="date"]').datepicker( "destroy" );
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
	var bookingSubmitBtn = jQuery('.submit-wrapper .submit');
	bookingSubmitBtn.click(function(e) {
		var thisForm = jQuery('#booking-mask');
		var check_in = thisForm.find('input[name="check-in"]').val();
		var check_out = thisForm.find('input[name="check-out"]').val();
		//var adult = thisForm.find('select[name="adult"]').val();
		//var children = thisForm.find('select[name="children"]').val();
    
		if (check_in == "mm/dd/yyyy" || check_in == null) {
			alert("Please enter a check-in date");
			return false;
		};
		if (check_out == "mm/dd/yyyy" || check_out == null) {
			alert("Please enter a check-out date");
			return false;
		};
		
		//var length = (jQuery('input[name="check-in"]').datepicker("getDate") - jQuery('input[name="check-out"]').datepicker("getDate")) / 1000 / 60 / 60 / 24;
		
		//var bookingUrl = 'http://www.starwoodhotels.com/alofthotels/rates/room.html?propertyId=3875&arrivalDate=' + check_in + '&departureDate=' + check_out;
		//var bookingUrl = 'http://www.starwoodhotels.com/alofthotels/rates/room.html?propertyId=3875&arrivalDate=' + check_in + '&departureDate=' + check_out + '&EM=LPS_AL_3875_UNMANAGED_SSB';
		//var bookingUrl = 'http://www.marriott.com/dencd?fromDate=' + check_in + '&toDate=' + check_out;
		var bookingParameters = '&fromDate=' + check_in + '&toDate=' + check_out;
      
    function readCookie(name) {
      var nameEQ = name+"=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
    }
    
    // Encode URL if SCID is saved in cookies
    var scid = readCookie('scid')
    if (scid != null && scid.length > 0) {
        bookingUrl = defaultBookingUrl + encodeURIComponent(bookingParameters);
    } else {
        bookingUrl = defaultBookingUrl + bookingParameters;
    };
      
		bookingSubmitBtn.attr('href',bookingUrl);
	});
});