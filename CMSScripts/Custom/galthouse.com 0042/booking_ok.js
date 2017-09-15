jQuery(function() {
// -- Set the Variables below to your specific check-in/check-out input fields, Anchor tag for submit btn
	var myHotelID = '6944',
		myCheckInField = jQuery('input[name="check-in"]'),
		myCheckOutField = jQuery('input[name="check-out"]'),
		myNightsCount = jQuery('.nights').find('select option:selected').text(),
		myGuestsCount = jQuery('.guests').find('select option:selected').text(),
		bookingSubmitBtn = jQuery('.reservation .submitBtn a'),

		// -- The Variables below load the date fields on pageload...no need to edit them
		now = new Date(),
		day = ("0" + now.getDate()).slice(-2),
		month = ("0" + (now.getMonth() + 1)).slice(-2),
		today = month + "/" + day + "/" + now.getFullYear();

		// -- on Pageload - set checkin date to today's date
		myCheckInField.attr('value', 'Check In');

// -- Set Datepickers
	myCheckInField.datepicker({
		minDate: ('+0D'),
		//dateFormat: 'yy-mm-dd',
		onSelect: function() {
			/*var checkOut = jQuery('input[name="check-out"]').datepicker('getDate');
			console.log(checkOut);
			checkOut.setDate(checkOut.getDate() + 2);
			jQuery('input[name="check-out"]').datepicker("setDate",checkOut);
			jQuery(".hasDatepicker").datepicker("hide");*/

			/*var checkIn = myCheckInField;
			var _checkIn = checkIn.datepicker('getDate');
			var checkOut = myCheckOutField;
			var _checkOut = checkIn.datepicker('getDate');
			var myNightsCount = jQuery('.nights').find('.selectBox-label').text();

			console.log('_checkIn:',_checkIn);
			console.log('_checkOut:',_checkOut);

			//var checkOut = jQuery('input[name="check-out"]').datepicker('getDate');
			console.log(checkOut);
			checkOut.setDate(checkOut.getDate() + parseInt(myNightsCount));
			checkOut.datepicker("setDate", checkOut);
			//check_out.datepicker({ dateFormat: 'yy-mm-dd' });
			console.log(myNightsCount);
			console.log(checkOut);
			console.log(jQuery('input[name="check-out"]').val());*/

			//var dateObject = myCheckInField.datepicker("getDate");
			//var dateString = jQuery.datepicker.formatDate("yy-mm-dd", dateObject);
		}
	});
	jQuery('input[name="check-out"]').datepicker({
		minDate: ('+0D'),
		dateFormat: 'yy-mm-dd'
	});
	//}).datepicker("setDate", "0");

	//myCheckOutField.attr('value', today);
	jQuery(".check-in").click(function(e) {
		//myCheckInField.attr('value', today);
		//myCheckInField.val(today);
	});
// -- Close Datepicker
	jQuery(document).click(function(e) {
		var ele = jQuery(e.target);
		if (jQuery(ele).attr('class') !== undefined) {
			var eleClass = jQuery(ele).attr('class');
		} else {
			var eleClass = '';
		}
		if (!ele.hasClass("hasDatepicker") && !ele.hasClass("ui-datepicker") && !ele.hasClass("ui-icon") && !jQuery(ele).parent().parents(".ui-datepicker").length && (eleClass.indexOf('ui-datepicker') == -1))
			jQuery(".hasDatepicker").datepicker("hide");
	});

// -- Submit button functionality
	bookingSubmitBtn.click(function(e) {
		var check_in = myCheckInField.val(), check_out = myCheckOutField.val(),
			arrival_date, departure_date,
			myNightsCount = jQuery('.nights').find('.selectBox-label').text(),
			myGuestsCount = jQuery('.guests').find('.selectBox-label').text();

		//eval("debugger;");

		//console.log('check_in:',check_in);
		//console.log('check_out:',check_out);

		if (check_in == "mm/dd/yyyy" || check_in == null || check_in == "Check In") {
			alert("Please enter a check-in date");
			return false;
		} else {
			//var departure_date = check_in.datepicker('getDate');
			//departure_date.setDate(departure_date.getDate() + myNightsCount);

			//departure_date = date2;
			//$('.dropoffDate').datepicker('setDate', date2);



			// booking mask
			//var booking_mask = jQuery('#booking-mask');
			//if(booking_mask.find(this).val() !== undefined) {
			//if(myNightsCount !== undefined) {
				var checkIn = myCheckInField;
				var _checkIn = checkIn.datepicker('getDate');
				var checkOut = myCheckOutField;
				var _checkOut = checkOut.datepicker('getDate');

				//console.log('_checkIn:',_checkIn);
				//console.log('_checkOut:',_checkOut);

				/*
				if(
					((check_in != 'mm/dd/yyyy' || check_in != '') &&
					(check_out == 'mm/dd/yyyy' || check_out == null || check_out == ''))||
					(_checkIn >= _checkOut)
				) {
					_checkIn.setDate(_checkIn.getDate() + 2);
					checkOut.datepicker("setDate", _checkIn);
				}*/

				/*var checkOut = jQuery('input[name="check-out"]').datepicker('getDate');
				console.log(checkOut);
				checkOut.setDate(checkOut.getDate() + parseInt(myNightsCount));
				jQuery('input[name="check-out"]').datepicker("setDate", checkOut);
				//check_out.datepicker({ dateFormat: 'yy-mm-dd' });
				console.log(myNightsCount);
				console.log(checkOut);
				console.log(jQuery('input[name="check-out"]').val());*/

				var checkOut = jQuery('input[name="check-in"]').datepicker('getDate');
				console.log(checkOut);
				checkOut.setDate(checkOut.getDate() + parseInt(myNightsCount));
				jQuery('input[name="check-out"]').datepicker("setDate", checkOut);
				//check_out.datepicker({ dateFormat: 'yy-mm-dd' });
				console.log(myNightsCount);
				console.log(checkOut);
				console.log(jQuery('input[name="check-out"]').val());
			//}


		}

		// change date format for NEW booking engine

		//arrival_date = myCheckInField.datepicker({ dateFormat: 'yy-mm-dd' }).val();
		var dateObject = myCheckInField.datepicker("getDate");
		arrival_date = jQuery.datepicker.formatDate("yy-mm-dd", dateObject);

		//arrival_date = jQuery.datepicker.formatDate('yy-mm-dd', myCheckInField);
		departure_date = jQuery('input[name="check-out"]').val();
		//departure_date = jQuery.datepicker.formatDate('yy-mm-dd', myCheckOutField);

		console.log('arrival_date:',arrival_date);
		console.log('departure_date:',departure_date);

// -- EDIT THIS BOOKING URL FOR DIFFERENT TYPES OF BOOKING MASKS
		/*
		var bookingUrl = 'https://bookings.ihotelier.com/istay/select_rooms.jsp' +
						'?hotelId=' + myHotelID +
						'&DateIn=' + check_in +
						'&nights=' + myNightsCount +
						'&adults=' + myGuestsCount;
		*/

		// get query string
		function getQuery(q) {
			return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
		}
		//console.log(getQuery('mock'));

		//var myHotelID = '6944';
		//console.log('myHotelID:',myHotelID);

		//if(getQuery('mock') == "true") {
			var bookingUrl = 'https://galthouse.reztrip.com' +
							'?hotelId=' + myHotelID +
							'&arrival_date=' + arrival_date +
							'&departure_date=' + departure_date +
							//'&nights=' + myNightsCount +
							'&adults[]=' + myGuestsCount;
			//console.log(bookingUrl);
			bookingSubmitBtn.attr('href', bookingUrl);
		//} else {
			//var bookingUrl = 'https://bookings.ihotelier.com/istay/select_rooms.jsp' +
			//				'?hotelId=' + myHotelID +
			//				'&DateIn=' + check_in +
			//				'&nights=' + myNightsCount +
			//				'&adults=' + myGuestsCount;
			//bookingSubmitBtn.attr('href', bookingUrl);
		//}
	});
});
