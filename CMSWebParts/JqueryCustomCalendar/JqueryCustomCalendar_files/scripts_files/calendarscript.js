var currentUpdateEvent;
var addStartDate;
var addEndDate;
var globalAllDay;

function selectEvent(event, element, date) {
   
    //   var date2 = new Date(date.getYears(), date.getMonths(), date.getDate()+1);
    //   var todaysEvents = jQuery('#calendar').fullCalendar('clientEvents', function (event) {
    //       alert(event.start >= date && event.start < date2);
    //       return event.start >= date && event.start < date2;
    //   });
    //if (jQuery(this).data("qtip")) jQuery(this).qtip("destroy");
    
    currentUpdateEvent = event;
    jQuery('#popUpDialog').dialog('open');
    jQuery('#popUpDialog').dialog("option", "title", jQuery("<div/>").html(event.title).text());
    jQuery("#popUpDialog").val(jQuery("<div/>").html(event.title).text());
    jQuery("#popUpDialog").empty()
    jQuery("#popUpDialog").append('<table width="100%" border="0" cellspacing="4" cellpadding="2"><tbody><tr><td class="Label">Time Start:</td><td class="CalendarContent" id="timeStart"></td><td class="Label">Time End:</td><td class="CalendarContent" id="timeEnd"></td></tr><tr><td class="Label">Description:</td><td class="CalendarContent" colspan="3" id="description"></td></tr><tr><td class="Label">Location:</td><td class="CalendarContent" colspan="3" id="location"></td></tr><tr><td class="Label">URL:</td><td class="CalendarContent" colspan="3" id="eventUrl"></td></tr></tbody></table>');
    //jQuery("#description").html(event.description);
	var description = jQuery("<div/>").html(event.description).text();
		description = description.replace('href="~','href="');
    jQuery("#description").html(description);
    jQuery("#eventId").html(event.id);
    jQuery("#timeStart").html("" + event.timestart);
    jQuery("#timeEnd").html("" + event.timeend);
	
    var timeStart = jQuery("#timeStart").html().split(":");
    if (timeStart[0] == '00') jQuery("#timeStart").html("" + '12:' + timeStart[1]);
	
    var timeEnd = jQuery("#timeEnd").html().split(":");
    if (timeEnd[0] == '00') jQuery("#timeEnd").html("" + '12:' + timeEnd[1]);
	
    var url = "";
	
    // Event URL
	if (event.eventUrl.length > 0) {
		if (jQuery("<div/>").html(event.eventUrl).text().toLowerCase().indexOf("https://") >= 0 || jQuery("<div/>").html(event.eventUrl).text().toLowerCase().indexOf("http://") >= 0) {
			url = "<a href='" + event.eventUrl + "' target='_blank' class='CalendarLink'>" + jQuery("<div/>").html(event.eventUrl).text() + "</a>";
		} else if (event.eventUrl != '') {
			url = "<a href='http://" + event.eventUrl + "' target='_blank' class='CalendarLink'>http://" + jQuery("<div/>").html(event.eventUrl).text() + "</a>";
		}
		jQuery("#eventUrl").html("" + url);
	} else {
		jQuery('#eventUrl').parent('tr').remove();
	}
	
	//if (event.end === null) {
    //    jQuery("#timeEnd").html("");
    //}
    //else {
        // jQuery("#eventEnd").text("" + event.end.toLocaleString());
    //}
	
	// Location
	if (event.location.length > 0) {
    	jQuery("#location").html(jQuery("<div/>").html(event.location).text());
	} else {
		jQuery('#location').parent('tr').remove();
	}
}

function UpdateTimeSuccess(updateResult) {
}

function selectDate(start, end, allDay) {
   
    jQuery('#popUpDialog').dialog('open');
    jQuery("#popUpDialog").val(event.title);
    jQuery("#description").val(event.description);
    jQuery("#eventId").val(event.id);
    jQuery("#timeStart").text("" + event.timestart);

    if (event.end === null) {
        jQuery("#timeEnd").text("");
    }
    else {
        // jQuery("#eventEnd").text("" + event.end.toLocaleString());
    }
    jQuery("#location").html(event.url);

    addStartDate = start;
    addEndDate = end;
    globalAllDay = allDay;
}

function updateEventOnDropResize(event, allDay) {
   
    var eventToUpdate = {
        id: event.id,
        start: event.start
    };

    if (allDay) {
        eventToUpdate.start.setHours(0, 0, 0);
    }

    if (event.end === null) {
        eventToUpdate.end = eventToUpdate.start;
    }
    else {
        eventToUpdate.end = event.end;
        if (allDay) {
            eventToUpdate.end.setHours(0, 0, 0);
        }
    }

    eventToUpdate.start = eventToUpdate.start.format("dd-MM-yyyy hh:mm:ss tt");
    eventToUpdate.end = eventToUpdate.end.format("dd-MM-yyyy hh:mm:ss tt");
    PageMethods.UpdateEventTime(eventToUpdate, UpdateTimeSuccess);
}

function eventDropped(event, dayDelta, minuteDelta, allDay, revertFunc) {
    if (jQuery(this).data("qtip")) jQuery(this).qtip("destroy");
    updateEventOnDropResize(event, allDay);
}

function eventResized(event, dayDelta, minuteDelta, revertFunc) {
    if (jQuery(this).data("qtip")) jQuery(this).qtip("destroy");
    updateEventOnDropResize(event);
}

function checkForSpecialChars(stringToCheck) {
    var pattern = /[^A-Za-z0-9 ]/;
    return pattern.test(stringToCheck);
}

jQuery(document).ready(function () {

    jQuery('#popUpDialog').dialog({
        autoOpen: false,
        width: 600
    });

    jQuery('#LegendDialog').dialog({
        autoOpen: false,
        width: 600
    });

    //    var arr = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')
    //    var hash = arr[0].split('=');

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    var calendar = jQuery('#Jquerycalendar').fullCalendar({
        theme: true,
        slotMinutes: 10,
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,basicWeek,basicDay'
        },
		loading: function(bool) {
		  if (!bool) {
			calendarMobileNoEventsText();
		  }
	   },
        eventClick: selectEvent,
        //dayClick: selectEvent,
        selectable: true,
        selectHelper: true,
        //select: selectDate,
        editable: true,
        disableResizing: true,
        disableDragging: true,
        handleWindowResize: false,
        windowResize: function (view) {
        },
        events: "//" + document.domain + "/CMSWebParts/JqueryCustomCalendar/JqueryCustomCalendar_files/JsonResponse.ashx?DomainName=" + document.domain,
		timeFormat: 'h:mm tt',
        eventDrop: eventDropped,
        eventResize: eventResized,
        eventRender: function (event, element) {
            //jQuery('.fc-event a').attr('id', event.id);
            element.css('background-color', event.LegendGroupColorCode);
            //element.qtip({
            //    content: jQuery("<div/>").html(event.description).text(),
            //    position: { 
			//		adjust: { screen: true },
			//		corner: { tooltip: 'bottomLeft', target: 'topRight'} 
			//	},
            //    style: {
            //        border: {
            //            width: 1,
            //            radius: 2,
            //            color: '#999'
            //        },
			//		fontFamily: 'Arial, Helvetica, sans-serif',
			//		color: '#000',
			//		lineHeight: '16px',
			//		fontSize: '13px',
            //        padding: 10,
            //        textAlign: 'center',
            //        tip: true
            //    }
            //});
        },
		windowResize: function() {
			calendarMobileLayout();
		}
    });


    jQuery('.fc-header-left').append('<span class="legend fc-button ui-state-default ui-corner-left ui-corner-right"><a><span>legend</span></a></span>');

    jQuery(".legend a").click(function () {
       
        jQuery.ajax({
            type: "POST",
            url: "//" + document.domain + "/CMSWebParts/JqueryCustomCalendar/JqueryCustomCalendar_files/JsonResponse.ashx",
            //url: "JqueryCustomCalendar_files/JsonResponse.ashx",
            success: function successFull(result) {

                //alert(result[0]["LegendGroupColorCode"]);
                var html = "";
                for (var i = 0; i < result.length; i++) {
                    html += "<li><span class='hex-wrap'><span style='background-color: " + result[i]["LegendGroupColorCode"] + "'; class='hex status-category-236'>&nbsp;&nbsp;&nbsp;</span>" +
                             "</span><span class='description'>" + result[i]["LegendGroupName"] + "</span></li>"
                }
                jQuery(".legend-list").empty();
                jQuery(".legend-list").append(html);
                //jQuery(".status-category-236").css('background-color', result[0]["LegendGroupColorCode"]);
                jQuery('#LegendDialog').dialog('open');
                jQuery('#LegendDialog').dialog("option", "title", "Legend");
                jQuery("#LegendDialog").val("Legend");
                jQuery("#description").html("");
                jQuery("#eventId").html(1);

            },
            dataType: 'json',

            data: { 'Type': 'Legend' }
        });
    });
	
	// Mobile Layout
	function calendarMobileLayout() {
		if (jQuery('#calendarMobile').is(':visible')) {
			jQuery('#Jquerycalendar').fullCalendar('changeView', 'basicDay');
		} else {
			jQuery('#Jquerycalendar').fullCalendar('changeView', 'month');
		};
	};
	calendarMobileLayout();
	
	// Mobile 'No Scheduled Events' text
	function calendarMobileNoEventsText() {
		if (jQuery('#calendarMobile').is(':hidden')) {
			jQuery('.fc-day-content > div').html('');
			jQuery('.fc-day-content > div').removeClass('noEvents');
		} else {
			if (jQuery('.fc-event').length < 1) {
				jQuery('.fc-day-content > div').html('No Scheduled Events');
				jQuery('.fc-day-content > div').addClass('noEvents');
			} else {
				jQuery('.fc-day-content > div').html('');
				jQuery('.fc-day-content > div').removeClass('noEvents');
			};
		};
	};
	jQuery('.fc-button-prev, .fc-button-next').click(function() {
		calendarMobileNoEventsText();
	});
	
	// Date field
	jQuery('#miniCalendar').datepicker({
		dateFormat: 'yy-m-d',
		onSelect: function(dateText, dp) {
			var date = dateText.split('-');
			jQuery('#Jquerycalendar').fullCalendar('gotoDate', date[0], date[1] - 1, date[2]);
			calendarMobileNoEventsText();
		}
	});
});