// JavaScript Document
var $ = jQuery.noConflict();
jQuery(document).ready(function () {
    $(function () {
        $("#datepicker").datepicker({
        });
        $("#datepicker").focus(function () {
            $(this).addClass('view');
            setTimeout(function () {
                $("#datepicker").datepicker("show")
            }, 10)
        });
		$("#datepicker1").datepicker({
        });
        $("#datepicker1").focus(function () {
            $("#datepicker1").datepicker("show").addClass('view');;
        });

        $(".hasDatepicker, .ui-datepicker, .ui-datepicker-trigger").click(function (event) {
            event.stopPropagation();
        });

        $("body").on("click touchstart", function (e) {
			 if ($(window).width() > 767) {
                if ($(e.target).closest('div#ui-datepicker-div').length == 1) {} else {
					if ($(window).width() > 767) {
                        $('.datepicker').each(function () {
                            if (!$(this).hasClass('view')) {

                                $('.datepicker').datepicker("hide");
                                $('.datepicker').removeClass('view').blur();
                                //$('.selectbox').parent().focus();
                            }

                        });
                    }
                }
            }
        });
    });
  	
 });





