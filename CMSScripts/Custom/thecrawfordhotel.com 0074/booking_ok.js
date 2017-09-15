jQuery(function() {
 
                                    
	// Define variables
	var thisForm = jQuery('header'),
		checkIn = thisForm.find('input[name="check-in"]'),
		checkOut = thisForm.find('input[name="check-out"]'),
        promoCode = thisForm.find('input[name="promo"]'),
		rooms = thisForm.find('.roomW select'),
		guests = thisForm.find('.guestW select'),
		bookingSubmitBtn = thisForm.find('.reserve a'),
		bookingLink = bookingSubmitBtn.attr('href'); // Put the default booking link into the submit button href
    function formatDate(date){
      var yyyy = date.getFullYear();
      var mm = date.getMonth() + 1;
      var dd = date.getDate();
      if(dd<10){
        dd='0'+ dd;
      }
      if(mm<10){
        mm='0'+ mm;
      } 
       return (mm + '/'+ dd + '/' + yyyy);
       //return (yyyy + '-' + mm + '-' + dd);
     
    } 
    var now = new Date();
    var today = formatDate(now);
    checkIn.val(today);
    guests.val('1');
    rooms.val('1');
    var temp = now.valueOf();
    var nextDay = new Date(temp + (3600*24*1000));
    nextDay = formatDate(nextDay);
    checkOut.val(nextDay);
    
    //desktopInDate.on('change', function(){
      //var pickedDate = jQuery('.bookingFormDesktop').find('input.checkIn').val();
     // var pickedInDate = jQuery(this).val(); 
     // temp = Date.parse(pickedInDate.replace(/-/g,"/"));
     // nextDay = new Date(temp + (3600*24*1000));
    //});
    checkIn.on('change', function(){
    //var pickedDate = jQuery('.bookingFormDesktop').find('input.checkIn').val();
    var pickedInDate = jQuery(this).val(); 
    temp = Date.parse(pickedInDate);
    nextDay = new Date(temp + (3600*24*1000));
    var tomorrow = formatDate(nextDay);
    checkOut.val(tomorrow);  
    //console.log(new Date(dateValue));
    //console.log(pickedDateObject.getDate() + 2);
    /*if(Date.parse(pickedInDate.replace(/-/g,"/")) < now.valueOf()) {
       
      checkIn.val(today);
      
    } else if(temp != now.valueOf() &&  Date.parse(checkOut.val()) <= nextDay){
      console.log(jQuery('.bookingFormDesktopFull').find('input.checkOut').val());
      console.log(nextDay);
      //console.log("We are here");
      nextDay = formatDate(new Date(Date.parse(pickedInDate.replace(/-/g,"/")) + (3600*24*1000)));
      jQuery('.bookingFormDesktopFull').find('input.checkOut').val(nextDay);
    }
    else{
      console.log(jQuery('.bookingFormDesktopFull').find('input.checkOut2').val());
      console.log(nextDay);
      console.log(temp);
      console.log(now.valueOf());
    }*/
  });
   checkIn.datepicker({
    minDate: ('+0D'),
    //minDate:('8/8/2016'), // ('8/4/2016')('7/15/2016'),
    onSelect: function() {
      var checkOutDate = checkIn.datepicker('getDate');
      checkOutDate.setDate(checkOutDate.getDate() + 1);//checkOutDate.setDate(checkOutDate.getDate() + 2);
      checkOut.datepicker("setDate",checkOutDate);            
      jQuery(".hasDatepicker").datepicker("hide");
    }
  });      
	// Booking Mask Programming
	bookingSubmitBtn.click(function(e) {
		// Check In      
		var checkInDate = checkIn.datepicker('getDate');
        //console.log(checkInDate);
	    var checkInYear = checkInDate.getFullYear().toString()
        //console.log(checkInYear);
		var checkInMonth = (checkInDate.getMonth() + 1).toString();
		//console.log(checkInMonth);
        var checkInDay = checkInDate.getDate().toString();
		//console.log(checkInDay);
		if (checkInMonth.length == 1) {
			checkInMonth = '0' + checkInMonth;
		};
		if (checkInDay.length == 1) {
			checkInDay = '0' + checkInDay;
		};
		
		var checkInDateFormatted = checkInMonth + '/' + checkInDay + '/' +checkInYear;
              

		
		// Check Out
		var checkOutDate = checkOut.datepicker('getDate'),
			checkOutYear = checkOutDate.getFullYear().toString(),
			checkOutMonth = (checkOutDate.getMonth() + 1).toString(),
			checkOutDay = checkOutDate.getDate().toString();
		
		if (checkOutMonth.length == 1) {
			checkOutMonth = '0' + checkOutMonth;
		};
		if (checkOutDay.length == 1) {
			checkOutDay = '0' + checkOutDay;
		};
		
 		var checkOutDateFormatted = checkOutMonth + '/' + checkOutDay + '/' + checkOutYear;
                  
		
		// Other
		var roomsVal = rooms.val(),
			guestsVal = guests.val();
      
      
      // Promo   
       var promoCodeVal = promoCode.val();
 
		
		// Booking URL
		var bookingUrl = bookingLink + "&start=availresults&arrive=" + checkInDateFormatted + "&depart=" + checkOutDateFormatted + "&adult=" + guestsVal + "&rooms=" + roomsVal + "&promo=" + promoCodeVal;
		bookingSubmitBtn.attr('href',bookingUrl);
	});
});