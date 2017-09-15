jQuery(function() {
    // Datepicker
    jQuery('.booking').find('input[name="arrive"]').datepicker({
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
    
    // Booking Mask Programming
    var bookingSubmitBtn = jQuery('.booking .bookingSubmit');
    bookingSubmitBtn.click(function(e) {
        var thisForm = jQuery('.booking');
        var hotel = thisForm.find('input[name="hotel"]').val();
        var chain = thisForm.find('input[name="chain"]').val();
        var template = thisForm.find('input[name="template"]').val();
        var shell = thisForm.find('input[name="shell"]').val();
        var arrive = thisForm.find('input[name="arrive"]').val();
        var nights = thisForm.find('select[name="nights"]').val();
        var adult = thisForm.find('select[name="adult"]').val();
        var children = thisForm.find('select[name="children"]').val();
        
        if (arrive == "Check in" || arrive == null) {
            alert("Please enter a check-in date");
            return false;
        };
        
        var bookingUrl = 'https://gc.synxis.com/rez.aspx?Hotel=' + hotel + '&Chain=' + chain + '&arrive=' + arrive + '&nights=' + nights + '&adult=' + adult + '&child=' + children;
        bookingSubmitBtn.attr('href',bookingUrl);
    });
});