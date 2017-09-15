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
		
		
		
				$("#datepicker2").datepicker({
        });
        $("#datepicker2").focus(function () {
            $("#datepicker2").datepicker("show").addClass('view');;
        });
	
		
				$("#datepicker3").datepicker({
        });
        $("#datepicker3").focus(function () {
            $("#datepicker3").datepicker("show").addClass('view');;
        });
		
		
		
						$("#datepicker4").datepicker({
        });
        $("#datepicker4").focus(function () {
            $("#datepicker4").datepicker("show").addClass('view');;
        });
		
		
		
		
								$("#datepicker5").datepicker({
        });
        $("#datepicker5").focus(function () {
            $("#datepicker5").datepicker("show").addClass('view');;
        });
		
		
		
								$("#datepicker6").datepicker({
        });
        $("#datepicker6").focus(function () {
            $("#datepicker6").datepicker("show").addClass('view');;
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





