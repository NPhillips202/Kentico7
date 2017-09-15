jQuery(function() {
    // Datepicker
    jQuery(".bookingDate").datepicker();
    
    // Close Datepicker
    jQuery(document).click(function(e) { 
        var ele = jQuery(e.target);
        if (!ele.hasClass("hasDatepicker") && !ele.hasClass("ui-datepicker") && !ele.hasClass("ui-icon") && !jQuery(ele).parent().parents(".ui-datepicker").length)
            jQuery(".hasDatepicker").datepicker("hide"); 
    });
    
    // Booking Mask Programming
    jQuery('#bookingMaskBtn').click(function(e) {
        e.preventDefault();
        
        var thisForm = jQuery('#bookingMaskForm');
        var hotel = thisForm.children('input[name="hotel"]').val();
        var chain = thisForm.children('input[name="chain"]').val();
        var shell = thisForm.children('input[name="shell"]').val();
        var arrive = thisForm.children('input[name="arrive"]').val();
        var nights = thisForm.children('select[name="nights"]').val();
        var adult = thisForm.children('select[name="adult"]').val();
        
        if (arrive == "Check-in date") {
            alert("Please enter a check-in date");
            return false;
        } else if (nights == "#Nights") {
            alert("Please enter number of nights");
            return false;
        } else if (adult == "#Guest") {
            alert("Please enter number of guests");
            return false;
        };
        
        var bookingUrl = 'https://gc.synxis.com/rez.aspx?Hotel=' + hotel + '&Chain=' + chain + '&shell=' + shell + '&arrive=' + arrive + '&nights=' + nights + '&adult=' + adult;
            //bookingUrl = getLinkerUrl(bookingUrl);
        window.open(bookingUrl);
    });
});