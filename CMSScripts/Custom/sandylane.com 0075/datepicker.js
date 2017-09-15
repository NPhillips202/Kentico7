// JavaScript Document

var $ = jQuery.noConflict();
jQuery(document).ready(function () {
	
    $(function () {
        $("#datepicker").datepicker({
			
			
			
        });
		
		$.datepicker.regional['en-US'] = {
  closeText: 'Done',
  prevText: 'Prev',
  nextText: 'Next',
  currentText: 'Today',
  monthNames: ['January','February','March','April','May','June',
  'July','August','September','October','November','December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],
  weekHeader: 'Wk',
  dateFormat: 'mm/dd/yy',
  firstDay: 1,
  isRTL: false,
  showMonthAfterYear: false,
  yearSuffix: ''};
 $.datepicker.setDefaults($.datepicker.regional['en-US']);
		
		
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

        //$(".hasDatepicker, .ui-datepicker, .ui-datepicker-trigger").click(function (event) {
        $(".ui-datepicker, .ui-datepicker-trigger").click(function (event) {
            event.stopPropagation();
        });

        $("body").on("click touchstart", function (e) {
			 if ($(window).width() > 767) {
                if ($(e.target).closest('div#ui-datepicker-div').length == 1) {} else {
					if ($(window).width() > 767) {
                        $('.datepicker').each(function () {
                            if (!$(this).hasClass('view')) {

                                //$('.datepicker').datepicker("hide");
                                //$('.datepicker').removeClass('view').blur();
                                //$('.selectbox').parent().focus();
                            }

                        });
                    }
                }
            }
        });
    });
  	
 });





