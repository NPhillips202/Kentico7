// JavaScript Document
var jQuery = jQuery.noConflict();
jQuery(document).ready(function () {
    jQuery(function () {
        jQuery("#datepicker").datepicker({
        });
        jQuery("#datepicker").focus(function () {
            jQuery(this).addClass('view');
            setTimeout(function () {
                jQuery("#datepicker").datepicker("show")
            }, 10)
        });
		jQuery("#datepicker1").datepicker({
        });
        jQuery("#datepicker1").focus(function () {
            jQuery("#datepicker1").datepicker("show").addClass('view');;
        });

        jQuery(".hasDatepicker, .ui-datepicker, .ui-datepicker-trigger").click(function (event) {
            event.stopPropagation();
        });

        jQuery("body").on("click touchstart", function (e) {
			 if (jQuery(window).width() > 767) {
                if (jQuery(e.target).closest('div#ui-datepicker-div').length == 1) {} else {
					if (jQuery(window).width() > 767) {
                        jQuery('.datepicker').each(function () {
                            if (!jQuery(this).hasClass('view')) {

                                jQuery('.datepicker').datepicker("hide");
                                jQuery('.datepicker').removeClass('view').blur();
                                //jQuery('.selectbox').parent().focus();
                            }

                        });
                    }
                }
            }
        });
    });
  	
 });




