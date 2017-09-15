jQuery(document).ready(function() {
    jQuery('#arriveDate, #departDate, #altDate, #ReceiveDate').datepicker({

        minDate: 1 ,
         buttonText: '',
                defaultDate: +1,
                showOn: 'both',
    });

    jQuery('#ArrivalDate,#DepartureDate').datepicker({

        minDate: 1,
        onClose: function() {
            pushDate(1);
        }

    });

    function pushDate(numberDaysAhead)
     {
       if (jQuery("#ArrivalDate").length > 0) 
        {

            var startDate = jQuery("#ArrivalDate").datepicker("getDate");
            var endDate = jQuery("#DepartureDate").datepicker("getDate");

            if (startDate > endDate)
             {
                startDate.setDate(startDate.getDate() + numberDaysAhead);
                jQuery('#DepartureDate').datepicker('setDate', startDate);
                //alert('start gt end');
              } 
          else 
            {
                //alert('start lt end');
            }
        }
    }
});
							