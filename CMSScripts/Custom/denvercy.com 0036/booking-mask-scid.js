jQuery(function() {
    var defaultBookingUrl = jQuery('#booking-mask > a').attr('href');
    
    // Datepicker
    jQuery('#book-now input[name="check-in"]').datepicker({
		buttonImage: "/getmedia/702c4d37-f7c9-47e8-9ed6-b781d22b70ee/book-mask-cal-icon/",
		buttonImageOnly: true,
        showOn: 'both',
        minDate: ('+0D'),
		onSelect: function() {
			var checkOut = jQuery('#book-now input[name="check-in"]').datepicker('getDate');
			checkOut.setDate(checkOut.getDate() + 2);
			jQuery('#book-now input[name="check-out"]').datepicker("setDate",checkOut);
            jQuery(".hasDatepicker").datepicker("hide");
		}
	});
    jQuery('#book-now input[name="check-out"]').datepicker({
		buttonImage: "/getmedia/702c4d37-f7c9-47e8-9ed6-b781d22b70ee/book-mask-cal-icon/",
		buttonImageOnly: true,
        showOn: 'both',
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
	
	// mobile device adjustments for datepicker
    if (isMobile.matches) {
		jQuery('.datepicker').each(function() {
			jQuery(this).get(0).type = 'date';
			jQuery('input[type="date"]').datepicker( "destroy" );			
		
			//jQuery(this).datepicker( "destroy" );
			//jQuery('input[name*="arrivalDate"]').datepicker( "destroy" );
			
			//jQuery(this).get(0).type = 'date';
			//var dP = document.getElementById('#ui-datepicker-div');
			//dP.className = dP.className + ' hide';
			
			/*alert(checkDateInput());
			if(checkDateInput()){
				//jQuery('input[type="date"]').datepicker( "destroy" );
				jQuery('#ui-datepicker-div').addClass( 'hide' );
			} else {
				jQuery('#ui-datepicker-div').removeClass( 'hide' );
			};*/
			//console.log(jQuery('input[type="date"]').length);
			//jQuery('input[type="date"]').datepicker( "destroy" );
		});
	};
  
	// Booking Mask Programming
	var bookingSubmitBtn = jQuery('.submit-wrapper .submit');
	bookingSubmitBtn.click(function(e) {
		var thisForm = jQuery('#booking-mask');
		var check_in = thisForm.find('input[name="check-in"]').val();
		var check_out = thisForm.find('input[name="check-out"]').val();
    
		if (check_in == "mm/dd/yyyy" || check_in == null) {
			alert("Please enter a check-in date");
			return false;
		};
		if (check_out == "mm/dd/yyyy" || check_out == null) {
			alert("Please enter a check-out date");
			return false;
		};
		
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