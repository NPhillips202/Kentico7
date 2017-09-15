jQuery(document).ready(function() {
  
  // -- Set the Variables below to your specific check-in/check-out input fields, Anchor tag for submit btn
  var myCheckInField = jQuery('.reserve-wrapper .check-in'),
      bookingSubmitBtn = jQuery('.reserve-wrapper .open .submit a'),
      myNumOfNights = jQuery('.nights'),
      myNumOfGuests = jQuery('.guests'),
      
      // -- The Variables below load the date fields on pageload...no need to edit them
      now = new Date(),
      day = ("0" + now.getDate()).slice(-2),
      month = ("0" + (now.getMonth() + 1)).slice(-2),
      today = month + "/" + day + "/" + now.getFullYear();
  
  myCheckInField.attr('value', today);
  
  // -- Set Datepickers
  myCheckInField.datepicker({
    minDate: ('+0D'),
	onSelect: function() {
        jQuery(".hasDatepicker").datepicker("hide");
	}
  });
  
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
  
  function leadZero(num) {
        if (num < 10) {
            num = '0' + num;
        }
        return num;
   };
  
  // -- Submit button functionality
  bookingSubmitBtn.click(function(e) {
	var ArrivalDate = myCheckInField.val(),
         NumOfNight = myNumOfNights.val(),
             Adults = myNumOfGuests.val();
          
    
	if (ArrivalDate == "" || ArrivalDate == null) {
		alert("Please enter a check-in date");
		return false;
	};
    if (NumOfNight == "" || NumOfNight == null) {
        NumOfNight = 2;
    };
    if (Adults == "" || Adults == null) {
        Adults = 1;
    };
    
    var tempDateIn = new Date(ArrivalDate),
        CheckInDay = tempDateIn.getDate(),
      CheckInMonth = tempDateIn.getMonth() + 1,
       CheckInYear = tempDateIn.getFullYear(),
       tempDateOut = tempDateIn;
  
    tempDateOut.setDate(tempDateIn.getDate() + parseInt(NumOfNight));
  
    var CheckOutDay = tempDateOut.getDate(),
      CheckOutMonth = tempDateOut.getMonth() + 1,
       CheckOutYear = tempDateOut.getFullYear();
  
    if ((CheckOutMonth == "0") && (CheckOutDay <= "31")) {
      CheckOutMonth = "12";
      CheckOutYear = CheckOutYear;
    };
  
    var bookingUrl = "https://reservations.thelodgeatwoodloch.com/#/roomsBooking/rate/" +
               CheckInYear + "-" + leadZero(CheckInMonth) + "-" + leadZero(CheckInDay) + "000000/" + 
               CheckOutYear + "-" + leadZero(CheckOutMonth) + "-" + leadZero(CheckOutDay) + "000000/" + 
               Adults + "///////The Lodge at Woodloch";
    
    //var tracker = _gaq._getAsyncTracker();
    //       // strLink = tracker._getLinkerUrl(strLink);
    //        _gaq.push(['_linkByPost', strLink]);
    //        _gaq.push(['_trackPageview', '/outgoing/checkavailability-bookingMask/']);
    //        window.open(strLink, '', '');
    //        return false;

	bookingSubmitBtn.attr('href',bookingUrl);
	});
});//end ready
