jQuery(function() {
  // Define variables
  //var checkInDesktop = jQuery('.bookingFormDesktop').find('input.checkIn');
  //var checkOutDesktop = jQuery('.bookingFormDesktop').find('input.checkOut');
  var checkInDesktop_full = jQuery('.bookingFormDesktopFull').find('input.checkIn');
  var checkOutDesktop_full = jQuery('.bookingFormDesktopFull').find('input.checkOut');
  var checkInMobile = jQuery('.bookingFormMobile').find('input.checkIn');
  var checkOutMobile = jQuery('.bookingFormMobile').find('input.checkOut');
  var bookingSubmitBtn = jQuery('.bookingSubmitMobile, .bookingSubmitDesktop, .bookingSubmitDesktopFull');
  var bookingLink = bookingSubmitBtn.attr('href'); // Put the default booking link into the submit button href
      
  function formatDate(date){
    var yyyy = date.getFullYear();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    //console.log("This is dd" + dd);
    if(dd<10){
      dd='0'+ dd;
    }
    if(mm<10){
      mm='0'+mm;
    } 
    return ( mm + '/' + dd + '/' + yyyy);
   
  }



    // Initialize Datepicker
 
  checkInDesktop_full.datepicker({
    minDate: ('+0D'),
    //maxDate:(365),
    //minDate:('8/8/2016'), // ('8/4/2016')('7/15/2016'),
    onSelect: function() {
      var checkOutDate = checkInDesktop_full.datepicker('getDate');
      checkOutDate.setDate(checkOutDate.getDate() + 1);//checkOutDate.setDate(checkOutDate.getDate() + 2);
      checkOutDesktop_full.datepicker("setDate",checkOutDate);            
      jQuery(".hasDatepicker").datepicker("hide");
    }
  });
 checkOutDesktop_full.datepicker({
      minDate: ('+0D'),
       // maxDate:(365) 
  });
  
  
  checkInMobile.datepicker({
      minDate: ('+0D'),
        //maxDate:(365),
    onSelect: function() {
      var checkOutDate = checkInMobile.datepicker('getDate');
      checkOutDate.setDate(checkOutDate.getDate() + 1);//checkOutDate.setDate(checkOutDate.getDate() + 2);
      checkOutMobile.datepicker("setDate",checkOutDate);
      jQuery(".hasDatepicker").datepicker("hide");
    }
  });
  checkOutMobile.datepicker({
    minDate: ('+0D'),
    //maxDate:(365)
  });
  
  // Set default dates
  
  checkInDesktop_full.datepicker("setDate", new Date());
  var defaultDepartureDate = checkInDesktop_full.datepicker('getDate', '+2d');
  defaultDepartureDate.setDate(defaultDepartureDate.getDate() + 1);//  defaultDepartureDate.setDate(defaultDepartureDate.getDate() + 2);
  checkOutDesktop_full.datepicker("setDate", defaultDepartureDate);

  checkInMobile.datepicker("setDate", new Date());
  var defaultDepartureDate = checkInMobile.datepicker('getDate', '+2d');
  defaultDepartureDate.setDate(defaultDepartureDate.getDate() + 1);// defaultDepartureDate.setDate(defaultDepartureDate.getDate() + 2);
  checkOutMobile.datepicker("setDate", defaultDepartureDate);
  
  
  
   // Mobile device adjustments for datepicker
  var isMobile = window.matchMedia('only screen and (max-width: 660px)');
  //console.log(isMobile);
  if (isMobile.matches) {
    jQuery('.datepicker').each(function() {
      //jQuery(this).get(0).type='date';
      //jQuery('input[type="date"]').datepicker("destroy");
      //jQuery('input[type="text"]').attr("val","mm/dd/yyyy");
           /* jQuery(this).get(0).type='date';
      jQuery('input[type="date"]').datepicker("destroy");
      jQuery('input[type="date"]').attr("val","mm/dd/yyyy");*/
      //jQuery('.datepicker-format-container').removeClass("hide");
      //jQuery('.datepicker-icon-container').addClass("pointer-events");
    });
    //Set default dates
        var now = new Date();
        var today = formatDate(now);
        var temp = now.valueOf();
        var nextDay = new Date(temp + (3600*24*1000));
        nextDay = formatDate(nextDay);
        var tomorrow = nextDay;
        var checkOut = jQuery('.bookingFormDesktop').find('input.checkOut');
        var checkIn = jQuery('.bookingFormDesktop').find('input.checkIn');
        jQuery('.bookingFormDesktop').find('input.checkIn').val(today);
        jQuery('.bookingFormDesktop').find('input.checkOut').val(nextDay);
     
    
        var desktopInDate = jQuery('.bookingFormDesktop').find('input.checkIn');
        desktopInDate.on('change', function(){
          //var pickedDate = jQuery('.bookingFormDesktop').find('input.checkIn').val();
          var pickedInDate = jQuery(this).val(); 
          temp = Date.parse(pickedInDate.replace(/-/g,"/"));
          nextDay = new Date(temp + (3600*24*1000));
          //console.log(nextDay);
          //console.log(new Date(dateValue));
          //console.log(pickedDateObject.getDate() + 2);
          if(Date.parse(pickedInDate.replace(/-/g,"/")) < now.valueOf()) {
             
            checkIn.val(today);
            
          } else if(temp != now.valueOf() &&  Date.parse((checkOut.val()).replace(/-/g,"/")) <= nextDay){
            console.log(jQuery('.bookingFormDesktop').find('input.checkOut').val());
            console.log(nextDay);
            //console.log("We are here");
            nextDay = formatDate(new Date(Date.parse(pickedInDate.replace(/-/g,"/")) + (3600*24*1000)));
            jQuery('.bookingFormDesktop').find('input.checkOut').val(nextDay);
          }
          else{
            console.log(jQuery('.bookingFormDesktop').find('input.checkOut').val());
            console.log(nextDay);
            console.log(temp);
            console.log(now.valueOf());
          }
        });
        var desktopOutDate = jQuery('.bookingFormDesktop').find('input.checkOut');
        desktopOutDate.on('change', function(){
          var pickedOutDate = jQuery(this).val();

          var lastDay= Date.parse(pickedOutDate.replace(/-/g,"/"));
          var prevDay = new Date(lastDay - (3600*24*1000))
          if(Date.parse(pickedOutDate.replace(/-/g,"/")) < now.valueOf()) {
            checkOut.val(tomorrow);
            checkIn.val(today);
            
          } else if(lastDay <= Date.parse((checkIn.val()).replace(/-/g,"/"))) {
            console.log(lastDay);
            console.log(formatDate(prevDay));

            checkIn.val(formatDate(prevDay));
          }
        });
    } else {
      jQuery('.datepicker-format-container').addClass("hide");
      //jQuery('.datepicker-icon-container').removeClass("pointer-events");
    };

  
  
  //Set default dates For Full Booking Mask - Desktop
  
        var now2 = new Date();
        console.log("This is now" + now2);
        var today2 = formatDate(now2);
        var temp2 = now2.valueOf();
        var nextDay2 = new Date(temp2 + (3600*24*1000));
        nextDay2 = formatDate(nextDay2);
        var tomorrow2 = nextDay2;
     
    
        var checkOut2 = jQuery('.bookingFormDesktopFull').find('input.checkOut2');
        var checkIn2 = jQuery('.bookingFormDesktopFull').find('input.checkIn2');
   
        jQuery('.bookingFormDesktopFull').find('input.checkIn2').val(today2);
        jQuery('.bookingFormDesktopFull').find('input.checkOut2').val(nextDay2);
         
  
  
  
  
  
    var desktopInDate2 = jQuery('.bookingFormDesktopFull').find('input.checkIn2');
        desktopInDate2.on('change', function(){
          //var pickedDate = jQuery('.bookingFormDesktop').find('input.checkIn').val();
          var pickedInDate2 = jQuery(this).val(); 
          temp2 = Date.parse(pickedInDate2.replace(/-/g,"/"));
          nextDay2 = new Date(temp2 + (3600*24*1000));
          //console.log(nextDay2);
          //console.log(new Date(dateValue));
          //console.log(pickedDateObject.getDate() + 2);
          if(Date.parse(pickedInDate2.replace(/-/g,"/")) < now.valueOf()) {
             
            checkIn2.val(today2);
            
          } else if(temp2 != now.valueOf() &&  Date.parse((checkOut2.val()).replace(/-/g,"/")) <= nextDay2){
            //console.log(jQuery('.bookingFormDesktopFull').find('input.checkOut2').val());
            //console.log(nextDay2);
            //console.log("We are here");
            nextDay2 = formatDate(new Date(Date.parse(pickedInDate2.replace(/-/g,"/")) + (3600*24*1000)));
            jQuery('.bookingFormDesktopFull').find('input.checkOut2').val(nextDay2);
          }
          else{
            //console.log(jQuery('.bookingFormDesktopFull').find('input.checkOut2').val());
            //console.log(nextDay2);
            //console.log(temp2);
            //console.log(now2.valueOf());
          }
        });
        var desktopOutDate2 = jQuery('.bookingFormDesktopFull').find('input.checkOut2');
        desktopOutDate2.on('change', function(){
          var pickedOutDate2 = jQuery(this).val();

          var lastDay2= Date.parse(pickedOutDate2.replace(/-/g,"/"));
          var prevDay2 = new Date(lastDay - (3600*24*1000))
          if(Date.parse(pickedOutDate2.replace(/-/g,"/")) < now2.valueOf()) {
            checkOut2.val(tomorrow2);
            checkIn2.val(today2);
            
          } else if(lastDay2 <= Date.parse((checkIn2.val()).replace(/-/g,"/"))) {
            console.log(lastDay2);
            console.log(formatDate(prevDay2));

            checkIn.val(formatDate(prevDay2));
          }else {
      jQuery('.datepicker-format-container').addClass("hide");
      //jQuery('.datepicker-icon-container').removeClass("pointer-events");
      }      
    });
  
  
  
 
   
  //jQuery('input[type="date"]').live('click', function(){
  //jQuery('.input-main').click(function(){
  jQuery('input[type="text"],input[type="date"]').on('click', function(){
    //console.log('im clicked....');
    jQuery(this).prev('.datepicker-format-container').addClass("hide");
  });
  
  
  /*jQuery('input[type="date"]').on('click', function(){
    console.log('im clicked....');
    jQuery(this).prev('.datepicker-format-container').addClass("hide");
  
  });*/
  
    
    
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
      console.log("Mobile Desktop click");
    } else if (jQuery(this).hasClass('bookingSubmitDesktopFull')) {
      console.log("Full Desktop clikc");
      thisForm = jQuery('.bookingFormDesktopFull');
    }else if (jQuery(this).hasClass('bookingSubmitMobile')) {
      thisForm = jQuery('.bookingFormMobile');
    } else {
      console.log('No form found.');
      return false;
    }

    var checkInDate = thisForm.find('input.checkIn').val(); // 2016-07-15
        //console.log("This is checkin date" + checkInDate);
    var checkOutDate = thisForm.find('input.checkOut').val();
        //console.log("This is checkout date" + checkOutDate);
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
        console.log("Finally" + checkInDate);

      var tempDateOut = new Date(checkOutDate);
      var outDay = tempDateOut.getDate();
      var outMonth = tempDateOut.getMonth() + 1;
      var outYear = tempDateOut.getFullYear();
      var checkOutDate = outYear + '-' + outMonth + '-' + outDay;
         console.log("Finally" + checkOutDate);
    
    // Validate
    if (adults == 'ADULTS') {
      alert('Please select a value for Adults.');
      return false;
    }

    
      //updated booking mask 8/31/16..sd
        var bookingUrl = bookingLink + "&start=availresults&arrive=" + checkInDate + "&depart=" + checkOutDate + "&adult=" + adults + "&guest=0" + "&rooms=1" + promoCode;
      console.log(bookingUrl);
      bookingSubmitBtn.attr('href',bookingUrl);
  });
});
