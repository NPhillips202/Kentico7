// ref: http://jsfiddle.net/nomatteus/dVGN2/3/
// ref: http://codepen.io/gracecarey/pen/ZQZRZN

// set some vars
var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();

var options;
var calendar;
var lastView;
var count = 0;
var loading = jQuery("#loading");
var calendar_div = jQuery("#Jquerycalendar");
var calendar_div_mobile = jQuery("#calendarMobile");
//var mini_calendar_datepicker = jQuery('#miniCalendar');
var mini_calendar_datepicker = jQuery(".minicalendar");
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
	var _trade_show_form_iframe = jQuery('.responsive-iframe-height-wrapper').find('iframe');

	var hideEvent = event.hideEvent;
	var hideEventMessage = event.hideEventMessage;

	// add class to dialog
	//if(hideEvent === "True" && hideEvent != "") { dialog.closest(".ui-dialog").addClass("event-not-available"); }
	var hideEventClass = (hideEvent === "True" && hideEvent != "") ? dialog.closest(".ui-dialog").addClass("event-not-available") : dialog.closest(".ui-dialog").removeClass("event-not-available")
	//console.log(hideEventClass);

	//console.log(hideEvent);

	var dateStartFormatted = jQuery.datepicker.formatDate("M d, yy", new Date(String(event.start)));
	var timeStartFormatted = event.timestart;
	var dateEndFormatted = jQuery.datepicker.formatDate("M d, yy", new Date(String(event.end)));
	var timeEndFormatted = event.timestart;
	var additionalArguments = '' +
		'?EventName=' + event.title +
		'&EventDate=' + dateStartFormatted +
		" at " + timeStartFormatted + '&EventEndDate=' + dateEndFormatted + " at " + timeEndFormatted;
	var _trade_show_form_iframe_src = _trade_show_form_iframe.attr('src', _trade_show_form_iframe.attr('src') + additionalArguments.toString().replace(/&#58;/g,'%3A').replace(/,/g,'%2C').replace(/ /g,'%20'));
	//var _trade_show_form_iframe.attr('src') + '?EventName=' + event.title + '&EventDate=' + event.timestart + '&EventEndDate=' + event.timeend);

	//var template_html = jQuery('.event-calendar-popup-template-HTML').html();
	//var trade_show_form = jQuery('.responsive-iframe-height-wrapper').html();
	var trade_show_form = jQuery('.responsive-iframe-height-wrapper').html();
	var template_html = '' +
	'<div id="content" class="contentv2">' +
		'<div class="eventDetails">' +

			(
				(hideEvent === "True" && hideEvent != "") ?
				'<h2>Signups for "<span id="dialog-title"></span>" have been closed.</h2><p id="dialog-message">' + hideEventMessage + '</p>' :
				'<h2>Step 1: "<span id="dialog-title"></span>" event has been selected. <i class="fa fa-check" style="color: green;"></i></h2>' +
				'<table>' +
					'<tr>' +
						'<td><b>Market Focus</b></td>' +
						'<td><b>Location</b></td>' +
						'<td><b>Sales Director</b></td>' +
						'<td><b>Min # Part</b></td>' +
						'<td><b>L.E. Fee in USD</b></td>' +
					'</tr>' +
					'<tr>' +
						'<td><div id="marketFocus"></div></td>' +
						'<td><div id="eventLocation"></div></td>' +
						'<td><div id="eventSalesDirector"></div></td>' +
						'<td><div id="minNumberPart"></div></td>' +
						'<td><div id="LEFeeUSD"></div></td>' +
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
					'<tr>' +
						'<td colspan="5">' +
							/*'<div class="eventDetailsDates">' +
								'<span class="date-start">' +
									'<strong>Start Date:</strong> <span class="__CalendarContent" id="eventDate"></span> <span class="__CalendarContent" id="timeStart"></span> to ' +
								'</span>' +
								'<span class="date-end">' +
									'<strong>End Date:</strong> <span class="__CalendarContent" id="eventEndDate"></span> <span class="__CalendarContent" id="timeEnd"></span>' +
								'</span>' +
							'</div>' +*/
							'<div class="eventDetailsDates">' +
								'<span class="date-start">' +
									'<strong>Start Date:</strong> <span class="__CalendarContent" id="eventDate"></span>' +
								'</span>' +
								'<span class="date-end"> to ' +
									'<strong>End Date:</strong> <span class="__CalendarContent" id="eventEndDate"></span>' +
								'</span>' +
							'</div>' +
							'<div class="eventDetailsDates eventDetailsTime">' +
								'<span class="date-start" style="display:none;">' +
									'<strong>Time:</strong> <span class="__CalendarContent" id="eventTime"></span> <span class="__CalendarContent" id="timeStart"></span> to <span class="__CalendarContent" id="timeEnd"></span></span>' +
								'</span>' +
							'</div>' +
						'</td>' +
					'</tr>' +
				'</table>' +

				'<hr>' +
				'<div class="iframe-wrapper">' +
					trade_show_form +
					'<div id="loading-iframe" class="spinner"></div>' +
				'</div>' +
				'<hr>' +

				//'<p><small><em><b>***</b> <i>LeRez hotel members will be charged 20% increase over the fees below</i></small></p>' +
				//'<p><small><em><b>**</b> <i>please refer to point "b" in the general terms & conditions.</i></small></p>' +
				'<p><small><em><b>*</b> <i>LE Hotels maintains the option to organize a hotel room block for specific sales missions. Member hotel is required to notify LE Hotels if they will be utilizing said room block or if they are booking their own accommodations. Once a member hotel commits to said room block, a penalty may apply for cancellation or modification subject to that hotel\'s specific terms and conditions.</i></small></p>' +
				'<h4>Terms and Conditions</h4>' +
				'<ol>' +
					'<li>General' +
						'<ul class="letter">' +
							'<li>All costs are USD, per person</li>' +
							'<li>For any Member that is representing multiple hotels at a Sales Mission, a premium of 25% will be billed for each additional hotel.</li>' +
							'<li>Participation is limited based on each Mission / Tradeshow, based on availability at time of request.</li>' +
							'<li>Invoices for Sales Missions will be sent 90 days in advance and due 60 days prior to the events.</li>' +
							'<li>Invoices for Tradeshows will be sent at time of sign up (minimum of 90 days prior) and due upon receipt.</li>' +
							'<li>LE Hotels reserves the right to change dates, locations and cancel events at any time.</li>' +
							'<li>All sign-ups must be done through Passport</li>' +
							'<li>Any unpaid invoice, over 30 days, will result in cancellation of that event.</li>' +
							'<li>All cancellations for Sales Missions, prior to 60 days, will not be charged a fee. Any cancellation within 60 days, LE Hotels will retain the fee as a cancellation. If the fee has not been received at time of cancellation, the Member Hotels will be billed accordingly.</li>' +
						'</ul>' +
					'</li>' +
					'<li>Fee Structure' +
						'<ul class="letter">' +
							'<li>Participation Fee includes "in market" transportation to/from the appointments as planned by the LE Representative. Any airport transportation or other private transfers will be at the sole responsibility of the Member Hotels.</li>' +
							'<li>All planned client entertainment, group meal functions and client gifts during the Sales Mission or Tradeshow will be billed back to the Member Hotels.</li>' +
							'<li>Member Hotels are responsible for shipping of any brochures, signage or other collateral to/from the Sales Mission or Tradeshow.</li>' +
							'<li>A minimum of (2) Member Hotels will be required for each Sales Mission and (2-4) Member Hotels for each Tradeshow. If the minimum is not met, a representative from LE Hotels will contact you at 60 days prior (for Sales Missions) and 90 days prior (for Tradeshows) with any alternative options.</li>' +
							'<li>In the event you want to travel to a City/Region that is not offered on our schedule, please contact your Regional Office at LE Hotels for consideration.</li>' +
						'</ul>' +
					'</li>' +
				'</ol>'
			) +

		'</div>' +
	'</div>';

	// open dialog
	dialog.removeClass("hide").dialog("open");
	// ref: https://codepen.io/agence-web-coheractio/pen/pEnoA
	//dialog.dialog("option", "clickOutside", true); // clicking outside the dialog will close it
	//dialog.dialog("option", "clickOutsideTrigger", "#" + event.id); // Element (id or class) that triggers the dialog opening

	dialog.empty();
	dialog.append(template_html);

	title = jQuery("<div/>").html(event.title).text();
	dialog.dialog("option", "title", title);
	jQuery("#ui-dialog-title-popUpDialog").hide();
	dialog.val(title);
	jQuery("#dialog-title").html(title);

	//console.log("hideEvent.toLowerCase():",hideEvent);
	if(hideEvent == "False" || hideEvent == "") {
		description = jQuery("<div/>").html(event.description).text();
		description = description.replace('href="~', 'href="');
		jQuery("#description").html(description);
		jQuery("#eventId").html(event.id);

		jQuery("#eventDate").html("" + jQuery.datepicker.formatDate("M d, yy", new Date(String(event.start))));
		jQuery("#eventEndDate").html("" + jQuery.datepicker.formatDate("M d, yy", new Date(String(event.end))));
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
		jQuery("#eventLocation").html(jQuery("<div/>").html(event.location).text());
		jQuery("#location").closest("tr").remove();
		/*
		if(event.location.length > 0)
			jQuery("#location").html(jQuery("<div/>").html(event.location).text());
		else
			jQuery("#location").closest("tr").remove();
			//jQuery("#location").parent("tr").remove();
		*/

		// custom
		var marketFocus, eventSalesDirector, minNumberPart, LEFeeUSD;
		jQuery("#marketFocus").html(jQuery("<div/>").html(event.MarketFocus).text());
		jQuery("#eventSalesDirector").html(jQuery("<div/>").html(event.EventSalesDirector).text());
		jQuery("#minNumberPart").html(jQuery("<div/>").html(event.MinNumberPart).text());
		jQuery("#LEFeeUSD").html(jQuery("<div/>").html(event.LEFeeUSD).text());

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
	dialog.dialog('open');
	dialog.val(event.title);
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

//
function eventRendered(event, element, view) {
	// set some vars
	var tileLen = 20;
	//var cell_date = jQuery.fullCalendar.formatDate(event.start, 'yyyy-MM-dd');
	var cell_date = moment(event.start).format('YYYY-MM-DD');
	var event_date_start = moment(event.start).format('YYYY-MM-DD');
	var event_date_end = moment(event.end).format('YYYY-MM-DD');

	// set bg color and add ID & date event attribute per event
	element.attr('id', event.id);
	element.attr('data-date-event', event_date_start);
	//element.attr('href', 'javascript:void(0);');
	element.css('background-color', event.LegendGroupColorCode);
	element.addClass(event.LegendGroupName.replace('&#40;','').replace('&#41;','').replace(' ','-').toLowerCase());
	if(event.LegendGroupName.toLowerCase().indexOf("sales mission") >= 0 && event.LegendGroupColorCode == "#38D9FE") {
		element.css('color', '#111');
		element.css('text-shadow', '0px 0px 0px');
	}

	// add ellipsis to title ONLY in month view
	/*if (event.title.length > tileLen && view.name === "month") {
		element.find(".fc-event-title").text(event.title.substr(0, tileLen) + "...").parent().parent()
		//.attr("data-tooltip", event.title).addClass("tooltip-top");
		.attr("title", event.title);
	}*/

	// this will only be triggered in initialization or when view is changed to list view to hide events that are empty
	// OTHER ref: https://gist.github.com/jboesch/983335
	/*
	if(view.name === "weekList" || view.name === "list" && 0) {
		//calendar_div.fullCalendar( 'clientEvents');

		var year_start = event.start.getFullYear();
		var year_end = event.end.getFullYear();
		// Get appropriate date formats
		var cellDate = jQuery.fullCalendar.formatDate( event.start, 'yyyy-MM-dd'); // this one will be used to find cell
		var linkDate = jQuery.fullCalendar.formatDate( event.start, 'yyyy/MM/dd'); // this one will be used to create link

		// Find a day cell for current event
		if(view.name === "weekList")
			var day = calendar_div.find('.fc-view-' + view.name).find("[data-date='" + cellDate + "']").find('.fc-inner-day-header');
		if(view.name === "list")
			var day = calendar_div.find('.fc-view-' + view.name).find("[data-date='" + cellDate + "']").find('.fc-day-number');

		calendar_div.find('.fc-view-' + view.name).find("[data-date]").addClass('fc-cell-has-no-event');

		// Construct the link
		if (! day.find('a').length) { // if there is no link to events page, add it
			//jQuery(day).html(function( index, oldHtml ) {
			//	return '<a style="background-color:red" href="/news/' + linkDate + '/">' + oldHtml + '</a>'
			//});
			jQuery(day).closest('.ui-widget-content').addClass('fc-cell-has-event').removeClass('fc-cell-has-no-event');
		}
	}
	*/

	//
	if(view.name === "listYear") {
		/*var cellDate = moment(event.start).format('YYYY-MM-DD'); // this one will be used to find cell
		console.log(cellDate);
		console.log(calendar_div.find('.fc-' + view.name + '-view').find('[data-date="' + cellDate + '"]').length);*/
		//console.log(element.html());
		element.find('.fc-event-dot').css('background-color', event.LegendGroupColorCode);
	}

	//
	/*if(event.allDay && event.end){
		event.end.add(1, 'days');
		console.log(event.end);
	}*/
}

//
function viewRendered(view, element) { // v1, v2 & 3
	//console.log('##################');
	//console.log('lastView:',lastView);
	//console.log('view.name:',view.name);
	/*if (lastView === "" || lastView !== view.name) { // view has been changed, tweak settings
		if (view.name === "list") {
			console.log('is list');
		}
		if (view.name !== "list" && lastView == 'list') {
			console.log('is not list');
		} else {
			//calendar_div.fullCalendar('changeView', 'list');
		}
	}
	lastView = view.name;*/
	//if (lastView == undefined) { lastView = 'list'; }

	console.log('##################');
	console.log(count);
	console.log('lastView:', lastView);
	console.log('view.name:', view.name);

	//if (view.name === "list") { lastView = 'list'; }
	var firstView = (view.name !== 'list' && count == 0) ? 'list' : view.name;
	//calendar_div.fullCalendar('changeView', firstView);
	console.log('firstView:', firstView);
	if(lastView !== view.name) {
		console.log('not equal');
	}
	if(lastView === undefined) {
		console.log('is undefined!');
		count += 1;
		if(count == 0) {
			calendar_div.fullCalendar('changeView', firstView);
			console.log('changed!!!!');
		}
		//eval("debugger;");
		//if (view.name !== 'listYear' && lastView == undefined) {

		/*
		if (view.name !== 'list' && lastView === undefined) {
			console.log('is not list');
			//calendar_div.fullCalendar('gotoDate', date);
			calendar_div.fullCalendar('changeView', 'list');
			return false;
		} else {
			console.log('is list');
			//calendar_div.fullCalendar('changeView', view.name);
			return false;
		}
		//calendar_div.fullCalendar('changeView', 'list');
		if (view.name !== 'list') {
			return false;
		}*/
		lastView = view.name;
	}

	/*

	console.log('##################');
	console.log('####viewRender####');
	console.log('##################');
	console.log(view.name);
	//
	if(view.name === "listYear") {
		var cellDate = moment(view.start).format('YYYY-MM-DD'); // this one will be used to find cell
		console.log(cellDate);
		console.log(calendar_div.find('.fc-' + view.name + '-view').find('[data-date="' + cellDate + '"]').length);
	}

	*/
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
	if (calendar_div_mobile.is(':visible')) {
		//calendar_div.fullCalendar('changeView', 'basicDay');
		//calendar_div.fullCalendar('changeView', 'weekList');
		calendar_div.fullCalendar('changeView', 'list');
	} else {
		calendar_div.fullCalendar('changeView', 'month');
	}
}

// reset calendarMobileNoEventsText() function
function calendarMobileNoEventsText() { return 1; }
// Mobile 'No Scheduled Events' text
function calendarMobileNoEventsText() {
	//console.log(calendar_div_mobile.is(':hidden'));
	//console.log(jQuery('.fc-event').length);
	if (calendar_div_mobile.is(':hidden')) {
		jQuery('.fc-day-content > div').html('');
		jQuery('.fc-day-content > div').removeClass('noEvents');
	} else {
		if (jQuery('.fc-event').length < 1) {
			jQuery('.fc-day-content > div').html('No Scheduled Events');
			jQuery('.fc-day-content > div').addClass('noEvents');
		} else {
			jQuery('.fc-day-content > div').html('');
			jQuery('.fc-day-content > div').removeClass('noEvents');
		}
	}
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
	});/**/
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

// Add Custom JSOn Evenmts to existing JSON object
function addCustomJSONEventItems(items, customItems) {
	// get start time
	//console.time('addCustomJSONEventItems');

	//console.log('Original Items:',items);
	//console.log(customItems);
	if(customItems.length) {
		//console.log('customItems:',customItems);
		var i = 0;
		// insert custom event items in original source
		items.forEach(function(item) {

			//console.log(customItems.length);

			if(typeof customItems[i] !== "undefined"){
				jQuery.grep(customItems, function(value, index) {
					//return (item.id == value.id) ? console.log('in') : console.log('out');
					if(item.id == value.id){
						// Delete element 5 on first iteration
						//console.log(value);

						item["hideEvent"] = value["hideEvent"];
						item["hideEventMessage"] = value["hideEventMessage"];

						//console.log(item["hideEvent"])

						item["MarketFocus"] = value["MarketFocus"];
						item["EventSalesDirector"] = value["EventSalesDirector"];
						item["MinNumberPart"] = value["MinNumberPart"];
						item["LEFeeUSD"] = value["LEFeeUSD"];
						item["end"] = moment.unix(item["end"]).format("YYYY-MM-DD");
						//console.log(item);
					}
				});

				/*
				customItems.find(function(value, index) {
					if(item.id == value.id){
						// Delete element 5 on first iteration
						//console.log(value);
						item["MarketFocus"] = value["MarketFocus"];
						item["EventSalesDirector"] = value["EventSalesDirector"];
						item["MinNumberPart"] = value["MinNumberPart"];
						item["LEFeeUSD"] = value["LEFeeUSD"];
						item["end"] = moment.unix(item["end"]).format("YYYY-MM-DD");
						//console.log(item);
					}
				});
				*/

				/*
				//item["ActualStartDate"] = new Date(customItems[i]["start"]);
				item["MarketFocus"] = customItems[i]["MarketFocus"];
				item["EventSalesDirector"] = customItems[i]["EventSalesDirector"];
				item["MinNumberPart"] = customItems[i]["MinNumberPart"];
				item["LEFeeUSD"] = customItems[i]["LEFeeUSD"];

				// add custom sorter
				//item["sorter"] = 'start';

				//item["start"] = moment(item["start"], 'MMMM Do YYYY');
				//item["start"] = moment.unix(item["start"]).format("YYYY-MM-DD");
				item["end"] = moment.unix(item["end"]).format("YYYY-MM-DD");
				*/
			}
			//item["source"]["events"] = _allEvents;
			i++;
		});
	}

	//console.timeEnd('addCustomJSONEventItems');
	// add up time to get load time
}

// search events
function searchEvents(items) {
	// get start time
	//console.time('searchEvents');

	//var updatedJSONItems = new Array();
	var updatedItems = [];

	jQuery("#submit-calendar-search").click(function(e) {
		// get start time
		console.time('searchEventsClicked');
		e.preventDefault();
		var keys = jQuery("#input-calendar-search-title").val();
		if(keys !== "") {
			updatedItems = (updatedItems.length) ? [] : updatedItems;
			//console.log('date: ' + date);
			//console.log('month: ' + (m + 1));
			//console.log(items);
			items.forEach(function(item) {
				//console.log(item["title"].toLowerCase());
				//console.log(keys.toString().toLowerCase());
				//console.log(item["title"].toLowerCase().indexOf(keys.toString().toLowerCase()));
				if (item["title"].toLowerCase().indexOf(keys.toString().toLowerCase()) >= 0) {
					updatedItems.push(item);
				}
			});
			//console.log('updatedItems: '+updatedItems);
			// go to nearest future date
			if(updatedItems != "") {
			//if(updatedItems !== "") {
				//console.log(updatedItems[0]["start"].getMonth() + 1);
				//if((updatedItems[0]["start"].getMonth() + 1) < (m + 1)) {
				//if(item["start"] <= date) {
					calendar_div.fullCalendar('gotoDate', updatedItems[0]["start"]);
					//console.log(moment(updatedItems[0]["start"]));
					//calendar_div.fullCalendar('gotoDate', moment(updatedItems[0]["start"]));
				//}
			}

			//remove the old eventSources
			calendar_div.fullCalendar("removeEvents");
			//calendar_div.fullCalendar("removeEventSource", items);
			calendar_div.fullCalendar("refetchEvents");

			//attach the new eventSources
			calendar_div.fullCalendar("addEventSource", updatedItems);
			calendar_div.fullCalendar("refetchEvents");
			//items = updatedItems;
		} else {
			// be sure all events has loaded 1st
			calendar_div.fullCalendar("addEventSource", items);
		}

		// change view if mobile
		if (calendar_div_mobile.is(':visible')) {
			calendar_div.fullCalendar('changeView', 'list');
		} else {
			calendar_div.fullCalendar('changeView', 'month');
		}

		console.timeEnd('searchEventsClicked');
		// add up time to get load time
	});

	//console.timeEnd('searchEvents');
	// add up time to get load time
}

// search events
function filterEvents(items) {
	// get start time
	//console.time('eventCalendarFiltered');

	//var updatedJSONItems = new Array();
	var updatedItems = [];

	jQuery("#event-calendar-filter").change(function(e) {
		// get start time
		console.time('eventCalendarFiltered');
		e.preventDefault();
		var keys = jQuery(this).find('option').val();

		console.log('keys: ', keys);

		if(keys !== "") {
			updatedItems = (updatedItems.length) ? [] : updatedItems;
			//console.log('date: ' + date);
			//console.log('month: ' + (m + 1));
			//console.log(items);
			items.forEach(function(item) {

				console.log('item["LegendGroupName"].toLowerCase(): ', item["LegendGroupName"].toLowerCase(),
					'\nkeys.toString().toLowerCase()', keys.toString().toLowerCase(),
					'\nitem["LegendGroupName"].toLowerCase().indexOf(keys.toString().toLowerCase())', item["LegendGroupName"].toLowerCase().indexOf(keys.toString().toLowerCase()),
					'\n\n');

				if (item["LegendGroupName"].toLowerCase().indexOf(keys.toString().toLowerCase()) >= 0) {
					updatedItems.push(item);
				}
			});
			console.log('updatedItems: ' + updatedItems);

			/*

			// go to nearest future date
			if(updatedItems != "") {
				calendar_div.fullCalendar('gotoDate', updatedItems[0]["start"]);
			}

			//remove the old eventSources
			calendar_div.fullCalendar("removeEvents");
			//calendar_div.fullCalendar("removeEventSource", items);
			calendar_div.fullCalendar("refetchEvents");

			//attach the new eventSources
			calendar_div.fullCalendar("addEventSource", updatedItems);
			calendar_div.fullCalendar("refetchEvents");
			//items = updatedItems;

			*/
		} else {
			// be sure all events has loaded 1st
			calendar_div.fullCalendar("addEventSource", items);
		}

		// change view if mobile
		/*if (calendar_div_mobile.is(':visible')) {
			calendar_div.fullCalendar('changeView', 'list');
		} else {
			calendar_div.fullCalendar('changeView', 'month');
		}*/

		console.timeEnd('eventCalendarFiltered');
		// add up time to get load time
	});

	//console.timeEnd('eventCalendarFiltered');
	// add up time to get load time
}

// progress bar
function progress(data) {
	// get start time
	console.time('progress');

	if (data.lengthComputable) {
		jQuery("progress").attr({
			value : data.loaded,
			max : data.total
		});
	}

	console.timeEnd('progress');
	// add up time to get load time
}

// define loadFullCalendar
function loadFullCalendar(allEvents) {
	// get start time
	//console.time('loadFullCalendar');

	// need to be inside function because IE doesn't like it outside - TEMP FIX
	var loading = jQuery("#loading");
	var calendar_div = jQuery("#Jquerycalendar");

	// redefine fullcalendar options
	options = {
		loading: function( isLoading, view ) {
			//console.log(isLoading);
			if (isLoading) {
				jQuery("#loading").show();
				progress(isLoading);
			} else {
				jQuery("#loading").hide();
				calendarMobileNoEventsText();
			}
		},

		theme: true,
		themeButtonIcons: {
			prev: 'circle-triangle-w',
			next: 'circle-triangle-e',
			prevYear: 'seek-prev',
			nextYear: 'seek-next'
		},
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'list,month' //'list,agendaList,month'//'listYear,month' //'list,weekList,month' // 'agendaOne,weekList,month' // 'list,month,basicWeek,basicDay,agendaWeek,agendaDay'
		},
		//defaultView: 'list',//'listYear',//'month',
		//aspectRatio: 1.5,
		/*views: {
			weekList: {
				type: 'weekList',
				duration: {
					weeks: 4
				},
				buttonText: '4 Weeks',
				fixedWeekCount : false
			}
			basicWeek: {
			    type: 'basic',
			    duration: {weeks: 2},
			    rows: 2
			}
		},*/
		lazyFetching: false,

		//ignoreTimezone: false,
		//timeFormat: 'h:mm tt',
		timezone: 'UTC', // 'America/Los_Angeles',
		//forceEventDuration:true,

		slotMinutes: 10,
		disableResizing: true,
		disableDragging: true,
		handleWindowResize: false,

		windowResize: calendarMobileLayout,
		//windowResize: function() {
		//	calendarMobileLayout();
		//},
		//windowResize: function (view) { },

		selectable: true,
		selectHelper: true,
		//select: selectDate,

		editable: true,
		nowIndicator: true,

		//eventOrder: '-title',

		/*eventSources: [
			allEvents,
			allEventsCustomItems
		],*/
		eventSources: [allEvents],
		/*events: function(){
			var view = calendar_div.fullCalendar('getView');
			console.log(view.name);
			return allEvents;
		},*/
		//events: allEvents,

		//eventLimit: 2,//true, // allow "more" link when too many events

		eventClick: selectEvent,

		eventDrop: eventDropped,
		eventResize: eventResized,

		eventRender: eventRendered,

		/*eventAfterAllRender: function (view) {
			//console.log('all events are rendered'); // remove your loading

			// add classto HTML tag after view option clicked
			//jQuery('.fc-header-right > span.fc-button').click(function(){});

			/ *

			console.log('##################');
			console.log('eventAfterAllRender');
			console.log('##################');
			// change view to "list" view
			console.log(calendar_div.fullCalendar('clientEvents').length);
			console.log('before:',view.name);
			if (lastView == undefined) {
				//if(view.name !== "listYear") {
					//calendar_div.fullCalendar('changeView', 'listYear');
				if(view.name !== "list") {
					calendar_div.fullCalendar('changeView', 'list');
					return false;
				} else {
					//calendar_div.fullCalendar('changeView', view.name);
				}
				lastView = view.name;
			}
			//console.log('eventAfterAllRender');
			console.log('after:',view.name);

			* /
		},*/
		//viewDisplay: function(view) { // v1
		//viewRender: viewRendered,
		/*
		minDate: date,
		//maxDate: maxDate,
		eventConstraint: {
			start: date,
			//end: maxDate
		}
		*/
	};

	// destroy existing calendar
	calendar_div.fullCalendar( 'destroy' );
	// reINIT main fullcalendar calendar
	calendar_div.fullCalendar(options);

	/* ####################################################### */
	// do calendar animation
	/*
	// OLD WAY
	calendar_div.addClass("calendar-loaded");
	loading.addClass("calendar-loaded");
	setTimeout(function(){ loading.remove(); }, 3000);
	*/
	// NEW WAY
	var loading = document.getElementById("loading");
	//loading.classList ? loading.classList.add('calendar-loaded') : loading.className += ' calendar-loaded';
	loading.className += ' calendar-loaded';
	var calendar_div = document.getElementById("Jquerycalendar");
	//calendar_div.classList ? calendar_div.classList.add('calendar-loaded') : calendar_div.className += ' calendar-loaded';
	calendar_div.className += ' calendar-loaded';
	setTimeout(function(){ loading.parentNode.removeChild(loading); }, 3000);
	/* ####################################################### */

	jQuery("#popUpDialog").find('.responsive-iframe-height > iframe').ready(function () {
		jQuery("#loading-iframe").addClass("iframe-loaded");
		setTimeout(function(){ jQuery("#loading-iframe").remove(); }, 3000);
	});

	// Add Legend Button
	jQuery('.fc-header-left, .fc-left').append('<button type="button" class="legend fc-button ui-button ui-state-default ui-corner-left ui-corner-right">legend</button>');
	//jQuery('.fc-header-left).append('<span class="legend fc-button ui-state-default ui-corner-left ui-corner-right"><a><span>legend</span></a></span>');
	jQuery(".legend").click(function () {
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

	// change 'month' label to 'calendar'
	jQuery('.fc-button-month, .fc-month-button').text('calendar');

	// Mobile Layout
	calendarMobileLayout();
	// Mobile 'No Scheduled Events' text
	jQuery('.fc-button-prev, .fc-button-next').click(function() {
		calendarMobileNoEventsText();
	});

	// Date field
	miniCalendarDatepicker();

	// switch calendar view to list mode
	//calendar_div.fullCalendar('changeView', 'list');
	//var view = calendar_div.fullCalendar('getView');
	var view = jQuery("#Jquerycalendar").fullCalendar('getView');
	//console.log("The` view's title is " + view.name);

	//console.log(allEvents);

	var viewListDiv = jQuery('.fc-view-' + view.name).closest(calendar_div);
	/*viewListDiv.find('.fc-header .fc-button-prev').addClass('hide');
	viewListDiv.find('.fc-header .fc-button-next').addClass('hide');
	viewListDiv.closest(calendar_div).find('.fc-header .fc-header-space').addClass('hide');
	viewListDiv.find('.fc-header .fc-button-today').addClass('hide');
	viewListDiv.find('.fc-header .legend').css('margin-left',0);*/
	viewListDiv.addClass('fc-view-' + view.name + '-wrapper');
	jQuery('.fc-button-list').click(function(){
		viewListDiv.addClass('fc-view-' + view.name + '-wrapper');
	});
	jQuery('.fc-button-month').click(function(){
		viewListDiv.removeClass('fc-view-' + view.name + '-wrapper');
	});

	//console.timeEnd('loadFullCalendar');
	// add up time to get load time
}

// create and load JS or CSS File
function loadjscssfile(filename, filetype){
	if (filetype=="js"){ //if filename is a external JavaScript file
		var fileref=document.createElement('script')
		fileref.setAttribute("type","text/javascript")
		fileref.setAttribute("src", filename)
	}
	else if (filetype=="css"){ //if filename is an external CSS file
		var fileref=document.createElement("link")
		fileref.setAttribute("rel", "stylesheet")
		fileref.setAttribute("type", "text/css")
		fileref.setAttribute("href", filename)
	}
	if (typeof fileref!="undefined")
		document.getElementsByTagName("head")[0].appendChild(fileref)
}

// craete listener to bind custom scroll to dynamic elements
function listenForScrollEvent(el){
	el.on("scroll", function(){
		el.trigger("custom-scroll");
	});
}

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
			//console.log(dialog.closest(".ui-dialog").length);
			jQuery('html').css('overflow-y', 'hidden').addClass('dialog-is-open');
			// add shadow efx
			dialog.closest(".ui-dialog").addClass("shadow-blur-bottom");
			dialog.closest(".ui-dialog").removeClass("shadow-blur-top");
			listenForScrollEvent(dialog);
		},
		close: function() {
			jQuery('html').css('overflow-y', 'auto').removeClass('dialog-is-open');
		}
	});

	/**************************************************************/
	/*
	// special effect from codyhouse.co - https://codyhouse.co/demo/schedule-template/index.html
	var transitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
	var transitionsSupported = ( jQuery('.csstransitions').length > 0 );
	//if browser does not support transitions - use a different event to trigger them
	if( !transitionsSupported ) transitionEnd = 'noTransition';

	// do click event
	//jQuery('#content .Calendarv2 .fc-event').click(function(){
	jQuery('.fc-event').click(function(){
		var self = this;
		console.log(self);
		//if( !self.animating )
			self.openModal(jQuery(this));
	});
	*/

	//close modal window
	/*this.modal.on('click', '.close', function(event){
		event.preventDefault();
		if( !self.animating ) self.closeModal(self.events.find('.selected-event'));
	});
	this.element.on('click', '.cover-layer', function(event){
		if( !self.animating && self.element.hasClass('modal-is-open') ) self.closeModal(self.events.find('.selected-event'));
	});*/
	/**************************************************************/


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

	// force iframe parent to scroll to top onsubmit
	window.onIframeFormSubmit = function(){
		jQuery('#popUpDialog').animate({
			scrollTop: 0
		});
	};

	// add custom events
	//loadFullCalendar(allEvents);
	//searchEvents(allEvents);
	//console.log('allEvents:',allEvents);
	//console.log('allEventsCustomItems:',allEventsCustomItems);
	jQuery.getJSON(allEvents, function(data){
		JSONItems = data;
		//console.log('JSONItems:',JSONItems);
		// check for custom event items via allEventsCustomItems
		//eval("debugger");
		addCustomJSONEventItems(JSONItems, allEventsCustomItems);
		// load full calendar
		loadFullCalendar(JSONItems);
		// search event
		searchEvents(JSONItems);
		// filter events
		filterEvents(JSONItems);
	});
});


function openModal(event) {
	var self = this;
	var mq = self.mq();
	this.animating = true;

	//update event name and time
	//this.modalHeader.find('.event-name').text(event.find('.event-name').text());
	//this.modalHeader.find('.event-date').text(event.find('.event-date').text());
	//this.modal.attr('data-event', event.parent().attr('data-event'));

	//update event content
	/*this.modalBody.find('.event-info').load(event.parent().attr('data-content')+'.html .event-info > *', function(data){
		//once the event content has been loaded
		self.element.addClass('content-loaded');
	});*/

	//this.element.addClass('dialog-is-open');
	jQuery('html').addClass('dialog-is-open');
	console.log(mq);

	setTimeout(function(){
		//fixes a flash when an event is selected - desktop version only
		jQuery(self).addClass('selected-event');
	}, 10);

	if( mq == 'mobile' ) {
		/*modalDialog.one(transitionEnd, function(){
			modalDialog.off(transitionEnd);
			self.animating = false;
		});*/
	} else {
		var eventTop = event.offset().top - jQuery(window).scrollTop(),
			eventLeft = event.offset().left,
			eventHeight = event.innerHeight(),
			eventWidth = event.innerWidth();

		var windowWidth = jQuery(window).width(),
			windowHeight = jQuery(window).height();

		var modalWidth = ( windowWidth*.8 > modalDialogMaxWidth ) ? modalDialogMaxWidth : windowWidth*.8,
			modalHeight = ( windowHeight*.8 > modalDialogMaxHeight ) ? modalDialogMaxHeight : windowHeight*.8;

		var modalTranslateX = parseInt((windowWidth - modalWidth)/2 - eventLeft),
			modalTranslateY = parseInt((windowHeight - modalHeight)/2 - eventTop);

		var DetailsBgScaleY = modalHeight/eventHeight,
			MoreBgScaleX = (modalWidth - eventWidth);

		console.log('eventTop', eventTop, 'eventLeft', eventLeft, 'eventHeight', eventHeight, 'eventWidth', eventWidth);
		console.log('windowWidth', windowWidth, 'windowHeight', windowHeight);
		console.log('modalWidth', modalWidth, 'modalHeight', modalHeight);
		console.log('modalTranslateX', modalTranslateX, 'modalTranslateY', modalTranslateY);
		console.log('DetailsBgScaleY', DetailsBgScaleY, 'MoreBgScaleX', MoreBgScaleX);

		//
		var modalDialog = jQuery('div[aria-labelledby="ui-dialog-title-popUpDialog"]');
		//change modal height/width and translate it
		modalDialog.css({
			top: eventTop+'px',
			left: eventLeft+'px',
			height: modalHeight+'px',
			width: modalWidth+'px',
		});
		transformElement(modalDialog, 'translateY('+modalTranslateY+'px) translateX('+modalTranslateX+'px)');

		/*
		//set modalHeader width
		modalDialogHeader.css({
			width: eventWidth+'px',
		});
		//set modalBody left margin
		modalDialogBody.css({
			marginLeft: eventWidth+'px',
		});

		//change modalBodyBg height/width ans scale it
		modalDialogBodyBg.css({
			height: eventHeight+'px',
			width: '1px',
		});
		transformElement(modalDialogBodyBg, 'scaleY('+DetailsBgScaleY+') scaleX('+MoreBgScaleX+')');

		//change modal modalHeaderBg height/width and scale it
		modalDialogHeaderBg.css({
			height: eventHeight+'px',
			width: eventWidth+'px',
		});
		transformElement(modalDialogHeaderBg, 'scaleY('+DetailsBgScaleY+')');

		modalDialogHeaderBg.one(transitionEnd, function(){
			//wait for the  end of the modalHeaderBg transformation and show the modal content
			modalDialogHeaderBg.off(transitionEnd);
			self.animating = false;
			self.element.addClass('animation-completed');
		});
		*/
	}

	//if browser do not support transitions -> no need to wait for the end of it
	if( !transitionsSupported ) modalDialog.add(modalDialogHeaderBg).trigger(transitionEnd);
}
function closeModal(event) {
	var self = this;
	var mq = self.mq();

	this.animating = true;

	if( mq == 'mobile' ) {
		this.element.removeClass('modal-is-open');
		this.modal.one(transitionEnd, function(){
			modalDialog.off(transitionEnd);
			self.animating = false;
			self.element.removeClass('content-loaded');
			event.removeClass('selected-event');
		});
	} else {
		var eventTop = event.offset().top - $(window).scrollTop(),
			eventLeft = event.offset().left,
			eventHeight = event.innerHeight(),
			eventWidth = event.innerWidth();

		var modalTop = Number(modalDialog.css('top').replace('px', '')),
			modalLeft = Number(modalDialog.css('left').replace('px', ''));

		var modalTranslateX = eventLeft - modalLeft,
			modalTranslateY = eventTop - modalTop;

		//
		var modalDialog = jQuery('div[aria-labelledby="ui-dialog-title-popUpDialog"]');

		self.element.removeClass('animation-completed modal-is-open');

		//change modal width/height and translate it
		this.modal.css({
			width: eventWidth+'px',
			height: eventHeight+'px'
		});
		transformElement(modalDialog, 'translateX('+modalTranslateX+'px) translateY('+modalTranslateY+'px)');

		/*
		//scale down modalBodyBg element
		transformElement(modalDialogBodyBg, 'scaleX(0) scaleY(1)');
		//scale down modalHeaderBg element
		transformElement(modalDialogHeaderBg, 'scaleY(1)');

		this.modalHeaderBg.one(transitionEnd, function(){
			//wait for the  end of the modalHeaderBg transformation and reset modal style
			modalDialogHeaderBg.off(transitionEnd);
			modalDialog.addClass('no-transition');
			setTimeout(function(){
				modalDialog.add(modalDialogHeader).add(modalDialogBody).add(modalDialogHeaderBg).add(modalDialogBodyBg).attr('style', '');
			}, 10);
			setTimeout(function(){
				modalDialog.removeClass('no-transition');
			}, 20);

			self.animating = false;
			self.element.removeClass('content-loaded');
			event.removeClass('selected-event');
		});
		*/
	}

	//browser do not support transitions -> no need to wait for the end of it
	if( !transitionsSupported ) modalDialog.add(modalDialogHeaderBg).trigger(transitionEnd);
}
function mq(){
	//get MQ value ('desktop' or 'mobile')
	var self = this;
	return window.getComputedStyle(this.element.get(0), '::before').getPropertyValue('content').replace(/["']/g, '');
};
function transformElement(element, value) {
	element.css({
		'-moz-transform': value,
		'-webkit-transform': value,
		'-ms-transform': value,
		'-o-transform': value,
		'transform': value
	});
}
