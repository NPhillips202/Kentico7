jQuery(document).ready(function () {

//checkin
jQuery( "#date_start" ).datepicker({

   minDate: 0,
   dateFormat: "yy-mm-dd",

   onSelect: function(selected) {
         jQuery("#date_end").datepicker("option","minDate", selected); //  mindate on the End datepicker cannot be less than start date already selected.
         var date = jQuery(this).datepicker('getDate');
         var tempStartDate = new Date(date);
         var default_end = new Date(tempStartDate.getFullYear(), tempStartDate.getMonth(), tempStartDate.getDate()+2); //this parses date to overcome new year date weirdness
         jQuery('#date_end').datepicker('setDate', default_end); // Set as default                           
   }

 });
 
 jQuery("#date_start").datepicker("setDate", new Date(2016,06,15));

//checkout
 jQuery( "#date_end" ).datepicker({

   minDate: 0,
   dateFormat: "yy-mm-dd",

   onSelect: function(selected) {
     jQuery("#date_start").datepicker("option","maxDate", selected); //  maxdate on the Start datepicker cannot be more than end date selected.

  }

});

var date3 = jQuery('#date_start').datepicker('getDate', '+2d');
date3.setDate(date3.getDate()+2);
jQuery('#date_end').datepicker('setDate', date3);

// Booking Mask Programming
  var bookingSubmitBtn = jQuery('#booking #submitWrap a');
  bookingSubmitBtn.click(function(e) {
    
    var thisForm = jQuery('#booking');
    var arrival_date = thisForm.find('input[name="arrival_date"]').val();
    var departure_date = thisForm.find('input[name="departure_date"]').val();
    var rooms = thisForm.find('select[name="rooms"]').val();
    var adults = thisForm.find('select[name="adults"]').val();
    var children = thisForm.find('select[name="children"]').val();
    
    var temparrival_date = new Date(arrival_date);
    var inYear = temparrival_date.getFullYear()
    var inMonth = temparrival_date.getMonth();    
    var inDay = temparrival_date.getDate();
    
     
    
    inMonth = ((inMonth.toString().rooms) == 1) ? "0" + inMonth : inMonth;
    
    var tempDateOut = new Date(departure_date);
    var outDay = tempDateOut.getDate();
    var outMonth = tempDateOut.getMonth();
    var outYear = tempDateOut.getFullYear();
    
    outMonth = ((outMonth.toString().rooms) == 1) ? "0" + outMonth : outMonth;
    if ((outMonth == "0") && (outDay <= "31")) {
          outMonth = "12"
          outYear = inYear
      }
    
    var bookingUrl = "https://halcyonhotelcherrycreek.reztrip.com/search?" + "rooms=" + rooms  + "&arrival_date=" + arrival_date + "&departure_date=" + departure_date + "&adults=" + adults + "&children=" + children
    bookingSubmitBtn.attr('href',bookingUrl);
    bookingSubmitBtn.trigger();
  });


});