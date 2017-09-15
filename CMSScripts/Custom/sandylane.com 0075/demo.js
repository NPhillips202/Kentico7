jQuery(function()
{

	if (!window['console'])
	{
		window.console = {};
		window.console.log = function(){};
	}
		
	/*
	define a new language named "custom"
	*/

	jQuery.dateRangePickerLanguages['custom'] = 
	{
		'selected': 'Choosed:',
		'days': 'Days',
		'apply': 'Close',
		'week-1' : 'Mon',
		'week-2' : 'Tue',
		'week-3' : 'Wed',
		'week-4' : 'Thu',
		'week-5' : 'Fri',
		'week-6' : 'Sat',
		'week-7' : 'Sun',
		'month-name': ['January','February','March','April','May','June','July','August','September','October','November','December'],
		'shortcuts' : 'Shortcuts',
		'past': 'Past',
		'7days' : '7days',
		'14days' : '14days',
		'30days' : '30days',
		'previous' : 'Previous',
		'prev-week' : 'Week',
		'prev-month' : 'Month',
		'prev-quarter' : 'Quarter',
		'prev-year' : 'Year',
		'less-than' : 'Date range should longer than %d days',
		'more-than' : 'Date range should less than %d days',
		'default-more' : 'Please select a date range longer than %d days',
		'default-less' : 'Please select a date range less than %d days',
		'default-range' : 'Please select a date range between %d and %d days',
		'default-default': 'This is custom language'
	};

    jQuery('#date-range12').dateRangePicker(
        {
            inline:true,
            container: '#date-range12-container', 
            alwaysOpen:true,
            format: 'M/D/YYYY',
            //defaultTime: moment().endOf('day').toDate(),
            //defaultEndTime: moment().endOf('day').add(2,'day').toDate(),
            startDate: moment().startOf('day').toDate(),
            //getValue: function()
            //{
            //    if ($('#date-range200').val() && $('#date-range201').val() )
            //        return $('#date-range200').val() + ' to ' + $('#date-range201').val();
            //    else
            //        return '';
            //},
            setValue: function(s,s1,s2)
            {
                jQuery('.bookingForm .checkIn').val(s1);
                jQuery('.bookingForm .checkOut').val(s2);
            }
        });
    
    jQuery('#date-range12-clear').click(function(evt)
    {
        evt.preventDefault();
        evt.stopPropagation();
        jQuery('#date-range12').data('dateRangePicker').clear();
    });	
    jQuery('#date-range12-close').click(function(evt)
    {
        evt.preventDefault();
        evt.stopPropagation();
        jQuery('.make_a_reservation').slideToggle("slow");
    });
	
    // Flash calendar when inputs are clicked on
    jQuery('#booking-date-inputs').bind('click', function() {
        jQuery('.month-wrapper').animate({
            backgroundColor: '#a69d96'
        }, 300, function() {
            jQuery('.month-wrapper').animate({
                backgroundColor: 'transparent'
            }, 300);
        );
    });
});