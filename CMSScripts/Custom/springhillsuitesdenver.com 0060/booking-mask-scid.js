jQuery(function() {
  // -- Set the Variables below to your specific check-in/check-out input fields, Anchor tag for submit btn
  var myHotelID = 'densd',
    myCheckInField = jQuery('input[name="check-in"]'),
    myCheckOutField = jQuery('input[name="check-out"]'),
    booking = jQuery('#booking-engine'),
    //booking = jQuery('#main-nav').children('#booking-engine'),
    //bookingUrl = booking.find('> a').attr('href'),
    bookingSubmitBtn = booking.find('.submit'),
    defaultBookingUrl = booking.find('> a').attr('href'),
    _isMobile = window.matchMedia('only screen and (max-width: 765px)'),

    // -- The Variables below load the date fields on pageload...no need to edit them
    now = new Date(),
    day = ("0" + now.getDate()).slice(-2),
    month = ("0" + (now.getMonth() + 1)).slice(-2),
    today = month + "/" + day + "/" + now.getFullYear();
  
  // -- on Pageload - set checkin date to today's date
  myCheckInField.attr('value', today);

  var nowPlus2 = new Date();
    nowPlus2.setDate(nowPlus2.getDate() + 2);

  var dayPlus2 = ("0" + nowPlus2.getDate()).slice(-2),
    monthPlus2 = ("0" + (nowPlus2.getMonth() + 1)).slice(-2),
    todayPlus2 = monthPlus2 + "/" + dayPlus2 + "/" + nowPlus2.getFullYear();
  
  // -- on Pageload - set checkout date to (today's date + 2)
  myCheckOutField.attr('value', todayPlus2);
  
    // content
    //console.log(jQuery('#content').find('.datepicker').length);
    jQuery('#content').find('.datepicker').datepicker({
    buttonImage: "/getmedia/9a72571b-619a-499c-b222-9350c67882ac/cal-icon",
    buttonImageOnly: true,
        showOn: 'both',
        minDate: ('+0D'),
    onSelect: function() {
            jQuery('.hasDatepicker').datepicker("hide");
    }
    });
  
  // -- Set Datepickers
  myCheckInField.datepicker({
    buttonImage: "/getmedia/9a72571b-619a-499c-b222-9350c67882ac/cal-icon",
    buttonImageOnly: true,
        showOn: 'both',
    minDate: ('+0D'),
    onSelect: function() {
      var checkOut = myCheckInField.datepicker('getDate');
      checkOut.setDate(checkOut.getDate() + 2);
      myCheckOutField.datepicker("setDate",checkOut);
      jQuery(".hasDatepicker").datepicker("hide");
    },
  });
  myCheckOutField.datepicker({
    buttonImage: "/getmedia/9a72571b-619a-499c-b222-9350c67882ac/cal-icon",
    buttonImageOnly: true,
        showOn: 'both',
    minDate: ('+0D'),
  });
  
  // -- Mobile device adjustments for datepicker
  if (_isMobile.matches) {
    jQuery('.datepicker').each(function() {
      jQuery(this).get(0).type='date';
      jQuery('input[type="date"]').datepicker( "destroy" );
    });
  };
    
  // -- Close Datepicker
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
  
  // -- Submit button functionality
  bookingSubmitBtn.click(function(e) {
    var check_in = myCheckInField.val(),
            check_out = myCheckOutField.val(),
      rooms = jQuery('[name="rooms"]').val(),
      guests = jQuery('[name="guests"]').val();
    
    if (check_in == "mm/dd/yyyy" || check_in == null) {
      alert("Please enter a check-in date");
      return false;
    };
    if (check_out == "mm/dd/yyyy" || check_out == null) {
      alert("Please enter a check-out date");
      return false;
    };
      
    // -- Set temp vars specific to HILTON SECURE3 booking engine
    /*var tempDateIn = new Date(check_in);
    var inDay = tempDateIn.getDate();
    var inMonth = tempDateIn.getMonth();
    var inYear = tempDateIn.getFullYear();
      inMonth = ((inMonth.toString().length) == 1) ? "0" + inMonth : inMonth;

    var tempDateOut = new Date(check_out);
    var outDay = tempDateOut.getDate();
    var outMonth = tempDateOut.getMonth();
      outMonth = ((outMonth.toString().length) == 1) ? "0" + outMonth : outMonth;
    var outYear = tempDateOut.getFullYear();
    if ((outMonth == "0") && (outDay <= "31")) {
      outMonth = "12";
      outYear = inYear;
    };*/


    // -- EDIT THIS BOOKING URL FOR DIFFERENT TYPES OF BOOKING MASKS
    
    /*var bookingUrl = booking.find('> a').attr('href') + 
    '?ctyhocn=' + myHotelID + 
    '&arrivalDay=' + inDay + 
    '&arrivalMonth=' + inMonth +
    '&arrivalYear=' + inYear +
    '&departureDay=' + outDay +
    '&departureMonth=' + outMonth +
    '&departureYear=' + outYear;
    bookingSubmitBtn.attr('href',bookingUrl);*/
    
    var bookingParameters = '&fromDate=' + check_in + '&toDate=' + check_out + '&numberOfRooms=' + rooms + '&numberOfGuests=' + guests;
    //console.log(bookingSubmitBtn.html());
    //console.log(bookingUrl);
    
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
    
    bookingSubmitBtn.attr('href',bookingUrl).attr('target','_blank');
    //e.preventDefault();
  });
});
