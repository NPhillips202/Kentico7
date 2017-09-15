

// global
var firstLoad = true;
var itemEvents;
itemEvents = new Object();

function showEventsPerMonth(mo, yr, d) {

	mo = mo - 1;
	var selDate = new Date(yr, mo, d);

	mo = selDate.getMonth()+1;
	yr = selDate.getFullYear();
	d  = selDate.getDate();

	if (!itemEvents.hasOwnProperty(yr)) {
		itemEvents[yr] = new Object();
	}

	if (!itemEvents[yr].hasOwnProperty(mo) || firstLoad) {
		$.ajax({
			type	: 'POST',
			url		: baseurl + "json/calendar.json",
			data	: firstLoad ? null: { month:mo, year:yr },
			cache	: false,
			async	: true,
			dataType: 'json',
			success	: function(data) {
				loadEvents(data, yr);
				showEvents(yr,mo,d);
				firstLoad = false;
			}
		});

	} else {
		var countEvents = showEvents(yr,mo,d);

		var preLoad = false;

		var now = new Date(yr, mo-1, d);

		var next = new Date(now.getFullYear(), now.getMonth()+1, 1);
		var nextYear  = next.getFullYear();
		var nextMonth = next.getMonth()+1;

		var prev = new Date(now.getFullYear(), now.getMonth()-1, 1);
		var prevYear  = prev.getFullYear();
		var prevMonth = prev.getMonth()+1;

		// prev
		if (!itemEvents.hasOwnProperty(prevYear)) {
			itemEvents[prevYear] = new Object();
			yr = prevYear;
		}
		if (!itemEvents[prevYear].hasOwnProperty(prevMonth)) {
			mo = prevMonth;
			preLoad = true;
		}

		// next
		if (!itemEvents.hasOwnProperty(nextYear)) {
			itemEvents[nextYear] = new Object();
			yr = nextYear;
		}
		if (!itemEvents[nextYear].hasOwnProperty(nextMonth)) {
			mo = nextMonth;
			preLoad = true;
		}

		if (preLoad) {
			$.ajax({
				type	: 'POST',
				url		: baseurl + "json/calendar.json",
				data	: { month:mo, year:yr },
				cache	: false,
				async	: true,
				dataType: 'json',
				success	: function(data) {
					loadEvents(data, yr);

					if (countEvents < MAX_EVENTS) {
						showEvents(yr,mo-1, 1);
					}
				}
			});
		}
	}

}


function loadEvents(data, yr) {
	if (data.status) {
		$.each(data.calendar, function(key, val) {
			$.each(val, function(keyM, valVal) {
				itemEvents[yr][keyM] = new Object();

				$.each(valVal, function(keyDay, eventsIds) {
					if (typeof(eventsIds)=='object') {
						if (!itemEvents[yr][keyM].hasOwnProperty(keyDay)) {
							itemEvents[yr][keyM][keyDay] = new Object();
						}

						$.each(eventsIds, function(kk, eventId) {
							if (data.events[eventId]) {
								if (!itemEvents[yr][keyM][keyDay][eventId]) {
									itemEvents[yr][keyM][keyDay][eventId] = data.events[eventId];
								}
							}
						});
					}
				});
			});
		});
	}
}

var MAX_EVENTS = 3;

function showEvents(inputYear, inputMonth, inputDay) {

	$("#tinyevents").empty();

	var eventCounter = 0;
	var dayCounter   = 0;

	while(eventCounter < MAX_EVENTS && dayCounter < 100) {
		var selDate = new Date(inputYear, inputMonth-1, inputDay);
		d = selDate.getDate();
		m = selDate.getMonth()+1;
		y = selDate.getFullYear();

		if (itemEvents[y] && itemEvents[y][m] && itemEvents[y][m][d]) {
			var html = '';
			var className = '';
			$.each(itemEvents[y][m][d], function(eventId, row) {
				eventCounter++;

				if (eventCounter > MAX_EVENTS) return;

				className = '';
				if (row.starred) {
					className = 'starred';
				}

				html = '<dl id="tc_event_'+eventCounter+'" class="'+className+'">'
						+ '<dt><a href="'+row.event_link+'">' + lzero(m) + '/'+lzero(d)+'/'+y+'</a></dt>'
						+ '<dd>'
							+ '<h4><a href="'+row.event_link+'">'+row.title+'</a></h4>'
							+ '<p class="descr">'
								+ row.introtext
								+ ' <a class="more" href="'+row.event_link+'">Read more.</a>'
							+ '</p>'
						+ '</dd>'
					+ '</dl>';

				$("#tinyevents").append(html);

			});
		}

		// goto next day
		inputDay = inputDay + 1;
		dayCounter++;
	}

	return eventCounter;
}



function shEvent(id) {
	$("#tc_event_"+id).toggleClass('show');

	$("#tc_event_"+id+' .descr').slideToggle('fast');

	return false;
}



$(function() {
	Date.format = 'mm/dd/yyyy';
	Date.firstDayOfWeek = 0;

	//Init datePicker handler for Tiny Calendar
/*
	$('#jqCalendar').datePicker({
		inline:true,
		showYearNavigation:false,
		renderCallback:function($td, thisDate, month, year) {
			if(typeof(ajaxevents)!='undefined') {
				var now = new Date();
				if(ajaxevents[thisDate.asString()]) {
					if($td.hasClass('current-month')) {
						$td.addClass('hasevents');
						$td.attr('title', 'Show events on '+thisDate.asString());
					}
				}
			}
		}
	})
	.bind('dpMonthChanged', function(e, month, year) {
		var mo = (month+1);
		if((mo+'').length == 1) mo='0'+mo;
		var yr = year+'';

		var d = 1;
		var now = new Date();

		if (now.getMonth() == month) {
			d = now.getDate();
		}

		showEventsPerMonth(mo, yr, d);

        // @TODO:
		//updateICalLink(month+1, year);
	})
	.bind('dateSelected', function(e, selectedDate, $td) {
		var selDate = selectedDate.asString();
		var selMonth = selectedDate.getMonth()+1;
		var selYear = selectedDate.getFullYear();
		var selCity = $('#current_city').val();
		document.location.href=baseurl+'?m='+selMonth+'&y='+selYear+'&city=' + selCity + '#cal';
	}).dpClose().dpDisplay();
*/
	var date = new Date();
	var month = date.getMonth()+1;
	month = (month > 9 ? month : "0"+month);
	year = date.getFullYear();

	// first start
	if ($("#tinyevents").length != 0) {
		showEventsPerMonth(month, year, date.getDate());
	}

    if ($('#calendar-year .y2').length) {
        /* if two years */
        var currentMonth = $('#calendar-month a.border_line'),
            l1 = currentMonth.offset().left - $('#calendar-month').offset().left ,
            l2 = $('#calendar-year').width()-l1;
        $('#calendar-year .y1').width(l1).next().width(l2);
    } else {
        /* if only one year */
        var l1 =$('#calendar-month').width();
        $('#calendar-year .y1').width(l1);
    }

    $('#calendar_days dl').each(function () {
        // options

        var time = 300;
        var hideDelay = 400;

        var hideDelayTimer = null;

        // tracker
        var beingShown = false;
        var shown = false;
        var trigger = $('dt a', this);
        var popup = $('dd', this);
        var delta = trigger.offset().left+popup.outerWidth()/2;

        trigger.mousemove(function(event) {
            popup.css({
                left: event.pageX-trigger.offset().left-popup.outerWidth()/2
            });
        });

        $(this).hover(function() {
            $('.evid'+$(this).data('eventid')).addClass('hover');
        },function() {
            $('.evid'+$(this).data('eventid')).removeClass('hover');
        });

        // set the mouseover and mouseout on both element
        $([trigger.get(0), popup.get(0)]).mouseover(function () {
            // stops the hide event if we move from the trigger to the popup element
            if (hideDelayTimer) clearTimeout(hideDelayTimer);

            // don't trigger the animation again if we're being shown, or already visible
            if (beingShown || shown) {
                return;
            } else {
                beingShown = true;

                $('#calendar_days dd').hide();

                // reset position of popup box
                popup.css({
                    bottom: 25,
                    display: 'block'
                })

                // (we're using chaining on the popup) now animate it's opacity and position
                //  .animate({
                //       bottom: 25,
                //      opacity: 1
                //   }, time, 'swing', function() {
                // once the animation is complete, set the tracker variables
                beingShown = false;
                shown = true;
                //   });
            }
        }).mouseout(function () {
            // reset the timer if we get fired again - avoids double animations
            if (hideDelayTimer) clearTimeout(hideDelayTimer);

            // store the timer so that it can be cleared in the mouseover if required
            hideDelayTimer = setTimeout(function () {
                hideDelayTimer = null;
                // popup.animate({
                //     bottom: 60,
                //    opacity: 0
                // }, time/2, 'swing', function () {
                // once the animate is complete, set the tracker variables
                shown = false;
                // hide the popup entirely after the effect (opacity alone doesn't do the job)
                popup.hide();
                // });
            }, hideDelay);
        });
    });

});// /on page load

function lzero(w) {
	w = w + '';
	return w.length == 1 ? '0'+''+w : w;
}

function printCalendar() {
	window.print();
}