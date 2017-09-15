jQuery(function() {
    var defaultBookingUrl = jQuery('#booking-mask > a').attr('href');
    
    // Datepicker
    jQuery('.datepicker').datepicker({
		showOn: "both",
		buttonImage: "/getmedia/c47cedf9-eccc-4e53-b6be-7a994f1b8311/book-mask-cal-icon",
		buttonImageOnly: true,
		
        minDate: ('+0D'),
		onSelect: function() {
			
			// booking mask
			var booking_mask = jQuery('#booking-mask');
			if(booking_mask.find(this).val() !== undefined) {
				var checkIn = booking_mask.find('input[name="check-in"]');
				var _checkIn = checkIn.datepicker('getDate');
				var checkOut = booking_mask.find('input[name="check-out"]');
				var _checkOut = checkOut.datepicker('getDate');
				if(
					((checkIn.val() != 'mm/dd/yyyy' || checkIn.val() != '')&&
					(checkOut.val() == 'mm/dd/yyyy' || checkOut.val() == null || checkOut.val() == ''))||
					(_checkIn >= _checkOut)
				) {
					_checkIn.setDate(_checkIn.getDate() + 2);
					checkOut.datepicker("setDate",_checkIn);
				};
			};
			// forms
			var form = jQuery('.FormPanel');
			if(form.find(this).val() !== undefined) {
				var arrvDate = form.find('input[id*="arrivalDate"]');
				var _arrvDate = arrvDate.datepicker('getDate');
				var deptDate = form.find('input[id*="departDate"]');
				var _deptDate = deptDate.datepicker('getDate');
				if(
					((arrvDate.val() != '')&&(deptDate.val() == null || deptDate.val() == ''))||
					(_arrvDate >= _deptDate)
				) {
					_arrvDate.setDate(_arrvDate.getDate() + 2);
					deptDate.datepicker("setDate",_arrvDate);
				};
			};
		}
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