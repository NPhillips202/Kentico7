jQuery(function() {
    var a = new Date,
        b = a.getMonth() + 1,
        c = a.getDate();
    b + "/" + c + "/" + a.getFullYear();
    jQuery('input[name="checkindate"]').datepicker({
        minDate: "+0D",
        onSelect: function() {
            var a = jQuery('input[name="checkindate"]').datepicker("getDate");
            a.setDate(a.getDate() + 2), jQuery('input[name="checkoutdate"]').datepicker("setDate", a), jQuery(".hasDatepicker").datepicker("hide")
        }
    }), jQuery('input[name="checkoutdate"]').datepicker({
        minDate: "+0D"
    }), jQuery(document).click(function(a) {
        var b = jQuery(a.target);
        if (void 0 !== jQuery(b).attr("class")) var c = jQuery(b).attr("class");
        else var c = "";
        b.hasClass("hasDatepicker") || b.hasClass("ui-datepicker") || b.hasClass("ui-icon") || jQuery(b).parent().parents(".ui-datepicker").length || c.indexOf("ui-datepicker") != -1 || jQuery(".hasDatepicker").datepicker("hide")
    });
    var e = jQuery("#bookingMask #booknow a");
  
   
  
    e.click(function(a) {
        var b = jQuery(".forma-area #bookingMask"),
            c = b.find('input[name="checkindate"]').val(),
            d = b.find('input[name="checkoutdate"]').val(),
            f = b.find('select[name="rooms"]').val(),
            g = b.find('select[name="adults"]').val(),
           // h = b.find('select[name="children"]').val(),
            i = "99502222",
            j = new Date(c),
            k = j.getDate(),
            l = j.getMonth(),
            m = j.getFullYear();
        l = 1 == l.toString().length ? "0" + l : l;
        var n = new Date(d),
            o = n.getDate(),
            p = n.getMonth(),
            q = n.getFullYear();
        p = 1 == p.toString().length ? "0" + p : p, "0" == p && o <= "31" && (p = "12", q = m);
        var r = "http://www.ichotelsgroup.com/redirect?brandCode=hi&path=rates&hotelCode=nycvc&checkInDate=" + k + "&checkInMonthYear=" + l + m + "&checkOutDate=" + o + "&checkOutMonthYear=" + p + q + "&numberOfAdults=" + g + "&numberOfRooms=" + f + "&iata=" + i;
        e.attr("href", r), e.trigger()
    })
      
       // Set default dates
      jQuery("#check-in #datepicker1").datepicker('setDate', new Date());
      var date3 = jQuery('#datepicker1').datepicker('getDate', '+2d');
      date3.setDate(date3.getDate()+2);
      jQuery('#check-out #datepicker2').datepicker('setDate', date3);
  
       
});