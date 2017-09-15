// ref: http://jsfiddle.net/nomatteus/dVGN2/3/
// ref: http://codepen.io/gracecarey/pen/ZQZRZN

// set some vars
var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();

var options;
var calendar;
var loading = jQuery("#loading");
var calendar_div = jQuery("#Jquerycalendar");
var calendar_div_mobile = jQuery("#calendarMobile");
var mini_calendar_datepicker = jQuery('#miniCalendar');
//var mini_calendar_datepicker = jQuery('.minicalendar');
var dialog = jQuery("#popUpDialog");
var dialog_content = dialog.find("#content");
var legend_dialog = jQuery("#LegendDialog");
/// global variable to save the displayed days dates
var dateArr = [];

// set var JSON file URL
var eventsURL = "//" + document.domain + "/CMSWebParts/JqueryCustomCalendar/JqueryCustomCalendar_files/JsonResponse.ashx";

// set var JSON file
var _allEvents = eventsURL + "?DomainName=" + document.domain;
var allEvents = _allEvents;

// set var JSON file LEGEND
var eventsLegend = eventsURL;

var currentUpdateEvent;
var addStartDate;
var addEndDate;
var globalAllDay;

// reset selectEvent() function
function selectEvent() { return 1; }
// redifine selectEvent() function
function selectEvent(event, element, date) {
	var title, description, timeStart, timeEnd, url, currentUpdateEvent = event;
	var dateStartFormatted = jQuery.datepicker.formatDate("M d, yy", new Date(String(event.start)));
	var timeStartFormatted = event.timestart;
	var dateEndFormatted = jQuery.datepicker.formatDate("M d, yy", new Date(String(event.end)));
	var timeEndFormatted = event.timestart;
	//var additionalArguments = '' +
	//	'?EventName=' + event.title +
	//	'&EventDate=' + dateStartFormatted +
	//	" at " + timeStartFormatted + '&EventEndDate=' + dateEndFormatted + " at " + timeEndFormatted;
	var template_html = '' +
	'<div id="content" class="contentv2">' +
		'<div class="eventDetails">' +
			//'<h2><span id="dialog-title"></span></h2>' +
			'<table>' +
				'<tr>' +
					'<td colspan="5">' +
						'<div class="eventDetailsDescription">' +
							'<strong>Event Location</strong>' +
							'<div class="__CalendarContent" id="eventLocation"></div>' +
						'</div>' +
					'</td>' +
				'</tr>' +
				'<tr>' +
					'<td colspan="5">' +
						'<div class="eventDetailsDescription">' +
							'<strong>Event Details</strong>' +
							'<div class="__CalendarContent" id="description"></div>' +
						'</div>' +
					'</td>' +
				'</tr>' +
				'<tr>' +
					'<td colspan="5">' +
						'<div class="eventDetailsDescription">' +
							'<strong>Location</strong>' +
							'<div class="__CalendarContent" id="location"></div>' +
						'</div>' +
					'</td>' +
				'</tr>' +
				'<tr>' +
					'<td colspan="5">' +
						'<div class="eventDetailsDescription">' +
							'<strong>URL</strong>' +
							'<div class="__CalendarContent" id="eventUrl"></div>' +
						'</div>' +
					'</td>' +
				'</tr>' +
				/*'<tr>' +
					'<td colspan="5">' +
						'<div class="eventDetailsDates">' +
							'<span class="date-start">' +
								'<strong>Start Date:</strong> <span class="__CalendarContent" id="eventDate"></span> <span class="__CalendarContent" id="timeStart"></span> to ' +
							'</span>' +
							'<span class="date-end">' +
								'<strong>End Date:</strong> <span class="__CalendarContent" id="eventEndDate"></span> <span class="__CalendarContent" id="timeEnd"></span>' +
							'</span>' +
						'</div>' +
					'</td>' +
				'</tr>' +*/
				'<tr>' +
					'<td colspan="5">' +
						'<div class="eventDetailsDates">' +
							'<span class="date-start">' +
								'<strong>Start Date:</strong> <span class="__CalendarContent" id="eventDate"></span>' +
							'</span>' +
							'<span class="date-end"> to ' +
								'<strong>End Date:</strong> <span class="__CalendarContent" id="eventEndDate"></span>' +
							'</span>' +
						'</div>' +
						'<div class="eventDetailsDates eventDetailsTime">' +
							'<span class="date-start">' +
								'<strong>Time:</strong> <span class="__CalendarContent" id="eventTime"></span> <span class="__CalendarContent" id="timeStart"></span> to <span class="__CalendarContent" id="timeEnd"></span></span>' +
							'</span>' +
						'</div>' +
					'</td>' +
				'</tr>' +
			'</table>' +
		'</div>' +
	'</div>';

	//console.log(event);

	// open dialog
	dialog.removeClass("hide").dialog("open");
	// ref: https://codepen.io/agence-web-coheractio/pen/pEnoA
	//dialog.dialog("option", "clickOutside", true); // clicking outside the dialog will close it
	//dialog.dialog("option", "clickOutsideTrigger", "#" + event.id); // Element (id or class) that triggers the dialog opening

	dialog.empty();
	dialog.append(template_html);

	title = jQuery("<div/>").html(event.title).text();
	dialog.dialog("option", "title", title);
	//jQuery("#ui-dialog-title-popUpDialog").hide();
	dialog.val(title);
	//jQuery("#dialog-title").html(title);

	_description = event.description.replace('.jpg', '.jpg?maxsidesize=500');
	description = jQuery("<div/>").html(_description).text();
	//description = description.replace('href="~', 'href="');
	jQuery("#description").html(description);
	jQuery("#eventId").html(event.id);

	jQuery("#eventDate").html("" + jQuery.datepicker.formatDate("M d, yy", new Date(String(event.start))));
	if(event.end !== null) {
		jQuery("#eventEndDate").html("" + jQuery.datepicker.formatDate("M d, yy", new Date(String(event.end))));
	} else {
		jQuery('.date-end').addClass('hide');
	}
	// dateFormat(getDate(), "dd mmm yyyy hh:MMtt");
	//console.log(new Date(String(event.start)));
	//console.log(jQuery.datepicker.formatDate("M d, yy", new Date(String(event.start))));
	//console.log(Date.parse(jQuery.datepicker.formatDate("M d, yy", new Date(String(event.start)))));

	jQuery("#timeStart").html("" + event.timestart);
	jQuery("#timeEnd").html("" + event.timeend);

	timeStart = jQuery("#timeStart").html().split(":");
	timeStart[0] == "00" && jQuery("#timeStart").html("12:" + timeStart[1]);

	timeEnd = jQuery("#timeEnd").html().split(":");
	timeEnd[0] == "00" && jQuery("#timeEnd").html("12:" + timeEnd[1]);

	// Event URL
	url = "";
	if(event.eventUrl.length > 0) {
		if(jQuery("<div/>").html(event.eventUrl).text().toLowerCase().indexOf("https://") >= 0 || jQuery("<div/>").html(event.eventUrl).text().toLowerCase().indexOf("http://") >= 0)
			url = "<a href='" + event.eventUrl + "' target='_blank' class='CalendarLink'>" + jQuery("<div/>").html(event.eventUrl).text() + "</a>";
		else if(event.eventUrl != "")
			url = "<a href='http://" + event.eventUrl + "' target='_blank' class='CalendarLink'>http://" + jQuery("<div/>").html(event.eventUrl).text() + "</a>";
		jQuery("#eventUrl").html("" + url);
	} else {
		jQuery("#eventUrl").closest("tr").remove();
		//jQuery("#eventUrl").parent("tr").remove();
	}

	// Location
	if(event.location.length > 0) {
		jQuery("#eventLocation").html(jQuery("<div/>").html(event.location).text());
		jQuery("#location").closest("tr").remove();
	} else {
		jQuery("#eventLocation").closest("tr").remove();
		//jQuery("#location").parent("tr").remove();
	}

	// force anchor link to work on modal popup window
	//console.log(jQuery(".eventDetails").find('a'));
	//console.log(jQuery(".eventDetails").find('a').length);
	jQuery(".eventDetails").find('a').bind('click', function() {
		if(jQuery(this).attr('target') == '_blank'){
			window.open(jQuery(this).attr('href'));
		} else {
			window.location = jQuery(this).attr('href');
		}
		return true;
	});
}

// reset UpdateTimeSuccess() function
function UpdateTimeSuccess() { return 1; }
// redifine UpdateTimeSuccess() function
function UpdateTimeSuccess(updateResult) {
}

// reset selectDate() function
function selectDate() { return 1; }
// redifine selectEvent() function
function selectDate(start, end, allDay) {
	jQuery('#popUpDialog').dialog('open');
	jQuery("#popUpDialog").val(event.title);
	jQuery("#description").val(event.description);
	jQuery("#eventId").val(event.id);
	jQuery("#timeStart").text("" + event.timestart);

	if (event.end === null) {
		jQuery("#timeEnd").text("");
	} else {
		// jQuery("#eventEnd").text("" + event.end.toLocaleString());
	}
	jQuery("#location").html(event.url);

	addStartDate = start;
	addEndDate = end;
	globalAllDay = allDay;
}

// reset updateEventOnDropResize() function
function updateEventOnDropResize() { return 1; }
// redifine updateEventOnDropResize() function
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
	} else {
		eventToUpdate.end = event.end;
		if (allDay) {
			eventToUpdate.end.setHours(0, 0, 0);
		}
	}
	eventToUpdate.start = eventToUpdate.start.format("dd-MM-yyyy hh:mm:ss tt");
	eventToUpdate.end = eventToUpdate.end.format("dd-MM-yyyy hh:mm:ss tt");
	PageMethods.UpdateEventTime(eventToUpdate, UpdateTimeSuccess);
}

// reset eventDropped() function
function eventDropped() { return 1; }
// redifine eventDropped() function
function eventDropped(event, dayDelta, minuteDelta, allDay, revertFunc) {
	if (jQuery(this).data("qtip")) jQuery(this).qtip("destroy");
	updateEventOnDropResize(event, allDay);
}

// reset eventResized() function
function eventResized() { return 1; }
// redifine eventResized() function
function eventResized(event, dayDelta, minuteDelta, revertFunc) {
	if (jQuery(this).data("qtip")) jQuery(this).qtip("destroy");
	updateEventOnDropResize(event);
}

// reset checkForSpecialChars() function
function checkForSpecialChars() { return 1; }
// redifine checkForSpecialChars() function
function checkForSpecialChars(stringToCheck) {
	var pattern = /[^A-Za-z0-9 ]/;
	return pattern.test(stringToCheck);
}

// reset calendarMobileLayout() function
function calendarMobileLayout() { return 1; }
// Mobile Layout
function calendarMobileLayout() {
	if (jQuery('#calendarMobile').is(':visible')) {
		jQuery('#Jquerycalendar').fullCalendar('changeView', 'basicDay');
	} else {
		jQuery('#Jquerycalendar').fullCalendar('changeView', 'month');
	};
}

// reset calendarMobileNoEventsText() function
function calendarMobileNoEventsText() { return 1; }
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
}

// datepicker functionality
function miniCalendarDatepicker() {
	mini_calendar_datepicker.datepicker({
		dateFormat: 'yy-m-d',
		onSelect: function(dateText, dp) {
			var date = dateText.split('-');
			calendar_div.fullCalendar('gotoDate', date[0], date[1] - 1, date[2]);
			calendarMobileNoEventsText();
		}
	});
	// Mobile device adjustments for datepicker - destroy datepicker on mobile
	if (!calendar_div_mobile.is(':hidden')) {
		//mini_calendar_datepicker.get(0).type='date';
		//jQuery('input[type="date"]').datepicker("destroy");

		//jQuery('input[type="date"]').attr("val","yyyy-MM-dd");
		//jQuery('.datepicker-format-container').removeClass("hide");

		// destroy datepicker on mobile
		mini_calendar_datepicker.get(0).type='date';
		jQuery('input[type="date"]').datepicker("destroy");
		// apply change event
		jQuery('input[type="date"]').change(function(){
			var dateText = jQuery(this).val();
			var date = dateText.split('-');
			//console.log(date[0], date[1] - 1, date[2]);
			calendar_div.fullCalendar('gotoDate', date[0], date[1] - 1, date[2]);
			calendarMobileNoEventsText();
		});
	} else {
		//jQuery('.datepicker-format-container').addClass("hide");
	}
}

// define loadFullCalendar
function loadFullCalendar(allEvents) {

	// redefine fullcalendar options
	options = {
		theme: true,
		themeButtonIcons: {
			prev: 'circle-triangle-w',
			next: 'circle-triangle-e',
			prevYear: 'seek-prev',
			nextYear: 'seek-next'
		},
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
		/*eventClick: function(event, element, date) {
			calendar_div.find('.fc-event').click(function () {
				selectEvent(event, element, date);
				return false;
			});
		},*/
		eventClick: selectEvent,
		//dayClick: selectEvent,
		selectable: true,
		selectHelper: true,
		//select: selectDate,
		editable: true,
		disableResizing: true,
		disableDragging: true,
		handleWindowResize: false,

		timeFormat: 'h:mm tt',
		eventDrop: eventDropped,
		eventResize: eventResized,

		//eventOrder: 'event_date_start,event_time_start,event_name',
		eventOrder: 'events_start_time,event_name',

		//events: "//" + document.domain + "/CMSWebParts/JqueryCustomCalendar/JqueryCustomCalendar_files/JsonResponse.ashx?DomainName=" + document.domain,
		eventSources: [allEvents],
		//events: allEvents,

		eventRender: function (event, element) {
			//jQuery('.fc-event a').attr('id', event.id);
			element.css('background-color', event.LegendGroupColorCode);
			/*element.qtip({
				content: jQuery("<div/>").html(event.description).text(),
				position: {
					adjust: { screen: true },
					corner: { tooltip: 'bottomLeft', target: 'topRight'}
				},
				style: {
					border: {
						width: 1,
						radius: 2,
						color: '#999'
					},
					fontFamily: 'Arial, Helvetica, sans-serif',
					color: '#000',
					lineHeight: '16px',
					fontSize: '13px',
					padding: 10,
					textAlign: 'left',
					tip: true
				}
			});*/
		},
		//windowResize: function (view) { },
		windowResize: function() {
			calendarMobileLayout();
		}
	};

	// destroy existing calendar
	calendar_div.fullCalendar( 'destroy' );

	// reINIT main fullcalendar calendar
	calendar_div.fullCalendar(options);

	// do calendar animation
	calendar_div.addClass("calendar-loaded");
	loading.addClass("calendar-loaded");

	// Add Legend Button
	jQuery('.fc-header-left').append('<span class="legend fc-button ui-state-default ui-corner-left ui-corner-right"><a><span>legend</span></a></span>');
	jQuery(".legend a").click(function () {
		jQuery.ajax({
			type: "POST",
			url: eventsLegend,
			success: function successFull(result) {
				//console.log(result[0]["LegendGroupColorCode"]);
				var html = "";
				for (var i = 0; i < result.length; i++) {
					html += "<li><span class='hex-wrap'><span style='background-color: " + result[i]["LegendGroupColorCode"] + "'; class='hex status-category-236'>&nbsp;&nbsp;&nbsp;</span>" +
						"</span><span class='description'>" + result[i]["LegendGroupName"] + "</span></li>"
				}
				jQuery(".legend-list").empty();
				jQuery(".legend-list").append(html);
				//jQuery(".status-category-236").css('background-color', result[0]["LegendGroupColorCode"]);
				legend_dialog.removeClass("hide").dialog("open");
				legend_dialog.dialog("option", "title", "Legend");
				legend_dialog.val("Legend");
				jQuery("#description").html("");
				jQuery("#eventId").html(1);
			},
			dataType: 'json',
			data: { 'Type': 'Legend' }
		});
	});

	// Mobile Layout
	calendarMobileLayout();
	// Mobile 'No Scheduled Events' text
	jQuery('.fc-button-prev, .fc-button-next').click(function() {
		calendarMobileNoEventsText();
	});

	// Date field
	miniCalendarDatepicker();
}

// craete listener to bind custom scroll to dynamic elements
function listenForScrollEvent(el){
	el.on("scroll", function(){
		el.trigger("custom-scroll");
	});
}

// reset compareSegs() function
function compareSegs() { return 1; }
// redifine and adjust compareSegs() function
/*function compareSegs(seg1, seg2) {
	return seg1.eventStartMS - seg2.eventStartMS || // earlier events go first
		seg2.eventDurationMS - seg1.eventDurationMS || // tie? longer events go first
		seg2.event.allDay - seg1.event.allDay || // tie? put all-day events first (booleans cast to 0/1)
		seg2.event.sorter - seg1.event.sorter || // My Sorter
		(seg1.event.title || '').localeCompare(seg2.event.title); // tie? alphabetically by title
}*/

// reset compareSlotSegs() function
function compareSlotSegs() { return 1; }
// redifine and adjust compareSlotSegs() function
/*function compareSlotSegs(seg1, seg2) {
	if (seg1.event.sorter != null && seg2.event.sorter != null)
		return seg1.event.sorter - seg2.event.sorter;
	else
		return seg1.start - seg2.start || // earlier start time goes first
			(seg1.event.title || '').localeCompare(seg2.event.title); // tie? alphabetically by title
	}
}*/

// reset compareDaySegments() function
function compareDaySegments() { return 1; }
// redifine and adjust compareDaySegments() function
/*function compareDaySegments(a, b) {
	if (a.event.sorter != null && b.event.sorter != null)
		return (b.rightCol - b.leftCol) - (a.rightCol - a.leftCol) || // put wider events first
		b.event.allDay - a.event.allDay || // if tie, put all-day events first (booleans cast to 0/1)
		a.event.sorter - b.event.sorter;	//now take the sorter
	else
	return (b.rightCol - b.leftCol) - (a.rightCol - a.leftCol) || // put wider events first
		b.event.allDay - a.event.allDay || // if tie, put all-day events first (booleans cast to 0/1)
		a.event.start - b.event.start || // if a tie, sort by event start date
		(a.event.title || '').localeCompare(b.event.title); // if a tie, sort by event title
}*/

jQuery(document).ready(function() {
	// http://jsfiddle.net/Artistan/jWUGZ/
	// http://jsfiddle.net/william/RELxP/
	// https://codepen.io/agence-web-coheractio/pen/pEnoA
	// http://stackoverflow.com/questions/2554779/jquery-ui-close-dialog-when-clicked-outside
	// http://zurb.com/forrst/posts/3_methods_to_close_Jquery_UI_dialog_when_clickin-ra4
	jQuery(document.body).on("click", ".ui-widget-overlay", function() {
		jQuery.each(jQuery(".ui-dialog"), function() {
			var $dialog;
			$dialog = jQuery(this).children(".ui-dialog-content");
			if($dialog.dialog("option", "modal")) {
				$dialog.dialog("close");
			}
		});
	});

	// init dialog for calendar events
	dialog.dialog({
		autoOpen: false,
		modal: true,
		show: {
			effect: "fade",
			duration: 50
		},
		hide: {
			effect: "fade",
			duration: 50
		},
		open: function() {
			/*jQuery('.ui-widget-overlay').bind('click',function() {
				dialog.dialog('close');
			})*/
			jQuery('html').css('overflow-y','hidden');
			//console.log(dialog.closest(".ui-dialog").length);
			dialog.closest(".ui-dialog").addClass("shadow-blur-bottom");
			dialog.closest(".ui-dialog").removeClass("shadow-blur-top");
			listenForScrollEvent(dialog);
		},
		close: function() {
			jQuery('html').css('overflow-y','auto');
		}
	});
	// init dialog for calendar legend
	legend_dialog.dialog({
		autoOpen: false,
		//modal: true,
		show: {
			effect: "fade",
			duration: 50
		},
		hide: {
			effect: "fade",
			duration: 50
		},
		/*open: function(){
			jQuery('.ui-widget-overlay').bind('click',function(){
				legend_dialog.dialog('close');
			})
		}*/
	});

	// custom scroll - http://stackoverflow.com/questions/16505182/bind-scroll-event-to-dynamic-div
	//listenForScrollEvent(dialog);
	//jQuery(window).scroll(function() {
	jQuery("body").on("custom-scroll", dialog, function() {
		var dialog_top = dialog.offset().top;
		var dialog_content_top = dialog.find("#content").offset().top;

		/*
		console.log('****************************');
		console.log(dialog_top, dialog_content_top);

		console.log(dialog.height());
		console.log(dialog.outerHeight());
		//console.log(dialog.get(0).innerHeight);
		//console.log(dialog.get(0).scrollHeight);

		console.log(dialog.find("#content").height());
		console.log(dialog.find("#content").outerHeight());
		//console.log(dialog.find("#content").get(0).innerHeight);
		//console.log(dialog.find("#content").get(0).scrollHeight);

		console.log(window.innerHeight);
		console.log('****************************');

		//console.log(dialog.offset().top)
		//console.log(dialog.height())
		//console.log(dialog[0].scrollHeight)
		//if(dialog.offset().top + dialog.height() >= dialog[0].scrollHeight) {
		//	console.log('end reached');
		//}
		*/

		if (dialog_top !== dialog_content_top) {
			dialog.closest(".ui-dialog").addClass("shadow-blur-top");
			dialog.closest(".ui-dialog").addClass("shadow-blur-bottom");
		} else {
			dialog.closest(".ui-dialog").addClass("shadow-blur-bottom");
			dialog.closest(".ui-dialog").removeClass("shadow-blur-top");
		}
	});

	// load full calendar
	loadFullCalendar(allEvents);
	// custom events
	/*jQuery.getJSON(allEvents, function(data){
		JSONItems = data;
		// load full calendar
		loadFullCalendar(JSONItems);
	});*/
});
