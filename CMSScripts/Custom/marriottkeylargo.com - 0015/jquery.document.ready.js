jQuery(document).ready(function() {


    monthPickerWidget();

    //http://arshaw.com/fullcalendar/docs/
    if (jQuery('div#calendar').length > 0) {
        jQuery('div#calendar').fullCalendar(getCalOptions('month', 'calendar'));
        //add custom stuff to calendar header
        insertButtonAfterHeaderButton('today', 'today', 'Legend');
    }
    if (jQuery('div#calendar_week').length > 0) {
        jQuery('div#calendar_week').fullCalendar(getCalOptions('month', 'calendar_week'));
        //add custom stuff to calendar header
        insertInputAfterHeaderButton('today', 'Date:');
        insertButtonBeforeHeaderButton('month', 'Legend');
        insertSelectBeforeHeaderButton('legend', 'Filter');
        jQuery('.fc-header-center').width('15%');
        //jQuery('#Filter').selectbox({ debug: true });

        jQuery('#miniCalendar').datepicker({
            showOn: 'both',
            buttonText: '&nbsp;&nbsp;&nbsp;',
            buttonImageOnly: false,
            dateFormat: 'yy-m-d',
            onSelect: function(dateText, dp) {
                var date = dateText.split('-');

                jQuery('#calendar_week').fullCalendar('gotoDate', date[0], date[1] - 1, date[2]);
                jQuery('#calendar_week').fullCalendar('changeView', 'agendaDay');
            }
        });
	
 jQuery('.fc-button-today').click(function() {
            jQuery('#calendar_week').fullCalendar('changeView', 'agendaDay');
        }); 

        jQuery().ready(function() {
            jQuery.ajax({
                type: "POST",
                url: "/_ePresence/_eCalendar/ScheduledEventsJson.aspx/GetCategories",
                data: JSON.stringify({ pd_id: getPdId() }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(msg) {
                    jQuery("#Filter").append(msg.d);
                },
                error: function(msg) {
                    alert("Failed to load " + msg);
                }
            });
        });
    }
    //they may call from hidden menu

    especialsJquery();

    jQuery("a[rel='ColorBox']").colorbox({
        transition: "elastic"
    });

    jQuery('#pageCounter').ready(function() {
        //#Container .image-div --> #Container img
        jQuery("#Container .image-div").quickpaginate({
            perpage: parseInt(jQuery('#ImagesPerPage').val()),
            showcounter: true,
            pager: jQuery("#pageCounter")
        });
    });

    //css the dropdown open in site editing
    jQuery('.languageChanger  li ul').css('display', 'none').css('position', 'absolute');

    window.pushDateVal = 1;  //put in rel attribute of #startdate or .numbernights field
    if (jQuery('#startdate').attr('rel') > 0) {
        window.pushDateVal = parseInt(jQuery('#startdate').attr('rel'));
    }

    if (jQuery("#startdate").length > 0) {

        if (dateFormat == "") {
            var dateFormat = "mm/dd/yyyy";
        }

        jQuery.datepicker.setDefaults({
            minDate: 0,
            buttonText: '&nbsp;&nbsp;&nbsp;',
            defaultDate: +1,
            showOn: 'both',
            buttonImageOnly: false//,
            //dateFormat: dateFormat

        });
        //if GoBooking.js is on page use it
        if (jQuery('.Booking_Mask').length == 0) {
            jQuery('#startdate').datepicker({

                onClose: function() {
                    pushDate(window.pushDateVal);
                }


            });
            jQuery('#enddate').datepicker({
                beforeShow: minRange,
                defaultDate: +3
            });
        }
    }
    if (jQuery('.languageChanger').length > 0) {
        jQuery('.languageChanger').singleDropMenu();
    }

    jQuery('.iframe_modal').live('click', function(e) {

        e.preventDefault();

        var dWidth = 800;
        var dHeight = 500;

        var $this = $(this);
        if ($this.hasClass('small')) {
            dWidth = 200;
            dHeight = 200;
        }
        if ($this.hasClass('large')) {
            dWidth = 860;
            dHeight = 600;
        }
        if ($this.hasClass('xlarge')) {
            dWidth = 930;
            dHeight = 500;
        }

        var thisDialogClass = '';
        if ($this.hasClass('noTitle')) {
            thisDialogClass = 'noTitle';
        }

        var horizontalPadding = 12;
        var verticalPadding = 0;

        theDialog = jQuery('<iframe  id="externalSite" class="externalSite" frameborder="0" src="' + this.href + '" />');
        theDialog.dialog({
            dialogClass: thisDialogClass,
            title: ($this.attr('title')) ? $this.attr('title') : 'Info',
            autoOpen: true,
            closeText: 'Close',
            width: dWidth,
            height: dHeight,
            modal: true,
            beforeclose: function() {
                $this.removeClass('disabled');
            },
            open: function(event, ui) {
                jQuery('body').css('overflow', 'hidden');
                jQuery('.ui-widget-overlay').css('width', '100%');
            },
            close: function(event, ui) { $('body').css('overflow', 'auto'); },
            closeOnEscape: false
        }).width(dWidth - horizontalPadding).height(dHeight - verticalPadding);



    });
    jQuery('.ui-widget-overlay').live('click', function() {

        // theDialog.dialog('close');

    });



    //put additional functions here.
    
    //AR - Allows for dynamic resizing of eCalendar Category Dropdown in IE
    if (!jQuery.support.leadingWhitespace) { // if IE6/7/8
        jQuery('select.input2').addClass('expand');
    }
});                               //end ready

//use this to get the full size img url by removing the "tn-" prefix
function removeTn(str) {
    return str.replace(/tn-/gi, "");
}

//starts all especialsJquery's event those w/ autostart="false"
function especialsJqueryStart() {
    jQuery('.especials-jquery[autostart=false]').attr('autostart', 'true');
    especialsJquery();
}

//new .each version - only runs those with autostart=true
function especialsJquery() {

    jQuery('.especials-jquery-wrap').each(function (indexOfWrap) {

        especialsJqueryElement = jQuery(this).children('.especials-jquery');
        if (especialsJqueryElement.attr('autostart') == 'true') {

            //so it doesnt re-start on especialsJqueryStart()
            especialsJqueryElement.attr('autostart', 'already-started');

            thisId = 'wrap-number-' + indexOfWrap;
            jQuery(this).attr('id', thisId);

            var url = especialsJqueryElement.attr('url');
            var especialsCategory = especialsJqueryElement.attr('especialsCategory');

            url = url + "&EventCatId=" + especialsCategory
            jQuery.ajax({
                url: url,
                dataType: 'jsonp',
                //give callback indexed instead of random for easier url caching      
                jsonpCallback: "callbackNo" + indexOfWrap,
                invokedata: {
                    thisIdHash: '#' + thisId,
                    indexOfWrap: indexOfWrap,
                    fx: especialsJqueryElement.attr('fx'),
                    makeEntireDivClickable: especialsJqueryElement.attr('makeEntireDivClickable'),
                    secondsOfLoop: parseInt(especialsJqueryElement.attr('secondsOfLoop')) * 1000,
                    pagerHasNumbers: especialsJqueryElement.attr('pagerHasNumbers')
                },
                error: function () {
                    logMe('error occurred in ajax request:  ' + url);
                },
                complete: function () {

                    //the pager sometimes double-calls-fills
                    jQuery(this.invokedata.thisIdHash + ' .especials-pager').html(' ');

                    //logMe(this.invokedata.thisIdHash);
                    // logMe('amount of slides' + jQuery(this.invokedata.thisIdHash + ' .especials-jquery').length);
                    jQuery(this.invokedata.thisIdHash + ' .especials-jquery').cycle({
                        fx: this.invokedata.fx,
                        timeout: this.invokedata.secondsOfLoop,
                        delay: -1000,
                        pause: true,
                        allowPagerClickBubble: true,
                        pager: this.invokedata.thisIdHash + ' .especials-pager'

                    });

                    //workaround for IE giving background-color of container to the cycle-plugin elements
                    jQuery('.especials-template-clone').css('background-color', 'Transparent');

                    //needed to add option since couldn't css hide them
                    if (this.invokedata.pagerHasNumbers == 'false') {
                        jQuery(this.invokedata.thisIdHash + ' .especials-pager a').text('');
                    }

                    //make div clickable and cursor
                    if (this.invokedata.makeEntireDivClickable == 'true') {
                        logMe('makeEntireDivClickable: true');
                        jQuery(this.invokedata.thisIdHash + ' .especials-template-clone').css('cursor', 'pointer');
                        jQuery(this.invokedata.thisIdHash + ' .especials-template-clone').live('click', function () {
                            var ThisMoreDetailsLink = jQuery(this).attr('moredetailslink');
                            window.location = ThisMoreDetailsLink;
                        });
                    }

                    //clean up template - make sure there is at least 2!
                    jQuery(this.invokedata.thisIdHash + " .especials-template").hide();

                },
                success: function (data) {

                    var thisIdHashSuccess = this.invokedata.thisIdHash;
                    var indexOfWrapSuccess = this.invokedata.indexOfWrap;
                    var fxSuccess = this.invokedata.fx;
                    var secondsOfLoopSuccess = this.invokedata.secondsOfLoop;

                    jQuery.each(data, function (indexOfData, item) {

                        cloneId = "template-no-index-wrap-" + indexOfWrapSuccess + "-index-in-" + indexOfData

                        jQuery(thisIdHashSuccess).children(".especials-template").clone().attr("id", cloneId).appendTo(thisIdHashSuccess + ' .especials-jquery');

                        jQuery('#' + cloneId).removeClass('especials-template').addClass('especials-template-clone');
                        jQuery('#' + cloneId + ' .WidgetTitle').html(item.WidgetTitle);
                        jQuery('#' + cloneId + ' .WidgetText').html(item.WidgetText);
                        jQuery('#' + cloneId + ' .ThumbnailImage').attr('src', item.ThumbnailImage);

                        //large image if in template
                        jQuery('#' + cloneId + ' .LargeImage').attr('src', removeTn(item.ThumbnailImage));

                        //removes MoreDetailsLink if hasPackageLongDesc == false
                        if (!item.hasPackageLongDesc) {
                            jQuery('#' + cloneId + ' .MoreDetailsLink').css('display', 'none').addClass('hidden-bc-hasPackageLongDesc-false');
                        }
                        jQuery('#' + cloneId + ' .MoreDetailsLink').attr('href', item.MoreDetailsLink);

                        //BookNow aka LinkUrl1 in db
                        jQuery('#' + cloneId + ' .BookNow').attr('href', item.LinkURL1);

                        //put link url in divs attr in case there is no link and entiredivclickable
                        jQuery('#' + cloneId).attr('MoreDetailsLink', item.MoreDetailsLink);

                    });  //end each data


                }
            });
            //end success ajax


        }
    });           //end each wrap div

}

//pushes the endDate back to +2d of startdate
function pushDate(numberDaysAhead) {
    logMe('pushdate in ready called :( ' + numberDaysAhead);
    if (jQuery("#enddate").length > 0) {

        var startDate = jQuery("#startdate").datepicker("getDate");
        var endDate = jQuery("#enddate").datepicker("getDate");

        if (startDate > endDate) {
            startDate.setDate(startDate.getDate() + numberDaysAhead);
            jQuery('#enddate').datepicker('setDate', startDate);
            //alert('start gt end');
        } else {
            //alert('start lt end');
        }
    }
}

//customize mindate so that enddate cannot be b4 startdate
function minRange(input) {
    return {
        minDate: (jQuery("#startdate").datepicker("getDate") != null ? jQuery("#startdate").datepicker("getDate") : 2)
    };
}
//startdate cannot be after enddate
function maxRange(input) {
    return {
        maxDate: (jQuery("#enddate").datepicker("getDate") != null ? jQuery("#enddate").datepicker("getDate") : null)
    };
}

function getCalOptions(calDefaultView, calendar) {

    calOptions = {
        header: {
            left: 'prev,next today ',
            center: 'title',
            right: ' month,agendaDay'
        },
        showAgendaButton: true,
        theme: true,
        timeFormat: 'h(:mm)tt',
        allDaySlot: true,
        defaultView: calDefaultView,
		slotMinutes: 15,
        events: getEventsPage(calendar),
        eventClick: function (event) {
            // opens events in a popup window

            var dHeight = 350;
            var dWidth = 640;
            var horizontalPadding = 30;
            var verticalPadding = 30;

            cal_modal = jQuery('<iframe  id="externalSite" class="externalSite" frameborder="0" src="' + event.url + '" />');

            cal_modal.dialog({
                title: event.title,
                autoOpen: true,
                width: dWidth,
                height: dHeight,
                modal: true,
                closeOnEscape: false
            }).width(dWidth - horizontalPadding).height(dHeight - verticalPadding);

            return false;
        },
        loading: function (bool) {
            if (bool) {
                jQuery('#loading').show();
            } else {
                jQuery('#loading').hide();
            }
        }
    }

    return calOptions;
}

function getLegendUrl() {
    return '/_ePresence/_eCalendar/dynamicLegend.asp';
}

function insertInputAfterHeaderButton(name, insertedName) {

    nextTd = jQuery('.fc-button-' + name).parent();

    nextTd.addClass('nextTd').attr('align', 'right');

    insertedButton = jQuery('.fc-button-' + name).clone();
    miniInput = jQuery('<input type="text" id="miniCalendar" class="input" size = "20" value="' + new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate()) + '">');
    insertedButton.addClass('fc-button-' + insertedName.toLowerCase());
    insertedButton.removeClass('fc-button-' + name).removeClass('ui-state-disabled');
    insertedButton.children('.fc-button-inner').append(miniInput)

    insertedButton.children().children('.fc-button-content').text(insertedName.toLowerCase());
    insertedButton.hover(
        function() { $(this).addClass('ui-state-hover'); }
       , function() { $(this).removeClass('ui-state-hover'); });


    nextTd.append(insertedButton);
    jQuery('.nextTd .fc-header-space').remove();
}

function insertSelectBeforeHeaderButton(name, insertedName) {

    nextTd = jQuery('.fc-button-' + name).parent();

    nextTd.addClass('nextTd').attr('align', 'right');

    insertedButton = jQuery('.fc-button-' + name).clone();
    miniInput = jQuery('<select id="'+ insertedName +'" class="input2"><option value = "All" selected="selected">All</option>');
    insertedButton.addClass('fc-button-' + insertedName.toLowerCase()).addClass('fc-button');
    insertedButton.removeClass('fc-button-' + name).removeClass('ui-state-disabled');
    insertedButton.children('.fc-button-inner').append(miniInput)

    insertedButton.children().children('.fc-button-content').text(insertedName.toLowerCase()+':');
    insertedButton.hover(
        function() { $(this).addClass('ui-state-hover'); }
       , function() { $(this).removeClass('ui-state-hover'); });


    nextTd.children('.fc-button-' + name).before(insertedButton);
    jQuery('.nextTd .fc-header-space').remove();

    $('#' + insertedName).change(function() {
        $("select option:selected").each(function() {
            filterValue = $(this).val();
            if (filterValue === 'All') {
                $('#calendar_week').fullCalendar('removeEventSource', getEventsPage('calendar_week'));
                var event_source = {
                    url: getEventsPage('calendar_week')
                };
                $('#calendar_week').fullCalendar('addEventSource', event_source);
            }
            else {
                $('#calendar_week').fullCalendar('removeEventSource', getEventsPage('calendar_week'));
                var event_source = {
                    type: 'GET',
                    data: { cat_id: filterValue },
                    url: getEventsPage('calendar_week')
                };
                $('#calendar_week').fullCalendar('addEventSource', event_source);
            }
        });
    });
}

function insertButtonAfterHeaderButton(name, clonedName, insertedName) {

    nextTd = jQuery('.fc-button-' + name).parent();

    nextTd.addClass('nextTd').attr('align', 'right');

    legendButton = jQuery('.fc-button-' + clonedName).clone();
    legendButton.addClass('fc-button-'+insertedName.toLowerCase());
    legendButton.removeClass('fc-button-' + name).removeClass('ui-state-disabled')

    legendButton.children().children('.fc-button-content').text(insertedName.toLowerCase());
    legendButton.hover(
        function() { $(this).addClass('ui-state-hover'); }
       , function() { $(this).removeClass('ui-state-hover'); });  

         
    nextTd.append(legendButton);
    jQuery('.nextTd .fc-header-space').remove();

    if (insertedName = 'Legend') {
        jQuery('.fc-button-' + insertedName.toLowerCase()).live('click', function() {
            modal(getLegendUrl(), insertedName, 600, 400);
        });
    }
}

function insertButtonBeforeHeaderButton(name, insertedName) {

    buttonToPutBefore = jQuery('.fc-button-' + name);
    nextTd = buttonToPutBefore.parent();

    nextTd.addClass('nextTd').attr('align', 'left');

    legendButton = buttonToPutBefore.clone();
    legendButton.addClass('fc-button-' + insertedName.toLowerCase()).addClass('fc-no-right').addClass('ui-no-right');
    legendButton.removeClass('fc-button-' + name).removeClass('fc-state-disabled').removeClass('ui-state-disabled')

    legendButton.children().children('.fc-button-content').text(insertedName.toLowerCase());
    legendButton.hover(
        function() { $(this).addClass('ui-state-hover'); }
       , function() { $(this).removeClass('ui-state-hover'); });  

    nextTd.children('.fc-button-' + name).before(legendButton);
    jQuery('.nextTd .fc-header-space').remove();
    if (insertedName = 'Legend') {
        jQuery('.fc-button-' + insertedName.toLowerCase()).live('click', function() {
            modal(getLegendUrl(), insertedName, 600, 400);
        });
    }
}

function getEventsPage(calendar) {
    window.eventsPage = jQuery(this).data("title");
    if (window.eventsPage != null) {
        jQuery('#' + calendar).attr('title', '');
        return window.eventsPage
    }
    else {
        window.eventsPage = jQuery('#' + calendar).attr('title');
        titleData = jQuery('#' + calendar).attr("title");
        jQuery(this).data("title", titleData);
        
        //remove title so it doesnt show in tooltips
        jQuery('#' + calendar).attr('title', '');
    }
    return window.eventsPage
}

function getPdId() {
    pdid = jQuery('#pd_id').attr('title');
    return pdid;
}

function modal(url, dTitle, dWidth, dHeight) {

    iframeDialog = jQuery('<iframe  id="externalSite" class="externalSite" frameborder="0" name="eg" src="' + url + '" />');

    var horizontalPadding = 30;
    var verticalPadding = 30;

    iframeDialog.dialog({
        title: dTitle,
        autoOpen: true,
        width: dWidth,
        height: dHeight,
        modal: true,
        closeOnEscape: false
    }).width(dWidth - horizontalPadding).height(dHeight - verticalPadding);

}


//this shows in firebug or ies console if active
function logMe(str) {
    if (window.console && window.console.log) {
        window.console.log(str);
    }
}


function getMillisecondsToDisplayMsg() {

    var secondsToDisplayMessage;
    secondsToDisplayMessage = parseInt(jQuery('#noEventsDialog').attr('secondsToDisplayMessage'));

    if (isNaN(secondsToDisplayMessage)) {
        secondsToDisplayMessage = parseInt(jQuery('#noEventsDiv').attr('secondsToDisplayMessage'));
    }

    //just default it here incase its still NaN
    if (isNaN(secondsToDisplayMessage)) {
        secondsToDisplayMessage = 3;
    }

    return secondsToDisplayMessage * 1000;
}

function areDatesEqual(date1, date2) {
    return date1.getFullYear() == date2.getFullYear()
            && date1.getMonth() == date2.getMonth()
            && date1.getDate() == date2.getDate();
}

function monthPickerWidget() {
    if (jQuery('.wrap-months').length) {
        var mm = parseInt(jQuery('.wrap-months').attr('mm'));
        var yyyy = parseInt(jQuery('.wrap-months').attr('yyyy'));
        var $allEventDivs = jQuery('.ecalendar-event');

        //remove month text in lieu of datepicker
        jQuery('.current-month a').first().remove();

        var d = new Date();
        var mmNow = d.getMonth() + 1;
        // alert(mm + " --now " + mmNow);
        var defaultDateZeroIfCurrentMonth;
        if (mm === mmNow) {
            //sets current day if the month is current month          
            defaultDateZeroIfCurrentMonth = '0';
        } else {
            //if not set it to the 1st of the month i guess.
            defaultDateZeroIfCurrentMonth = mm + '/01/' + yyyy;
        }

        //if they re-click current month show all events
        jQuery('.ui-datepicker-title')
            .css('cursor', 'pointer')
            .live("click", function (e) {
                $allEventDivs.show();
            });

        jQuery('div.current-month').datepicker({

            defaultDate: defaultDateZeroIfCurrentMonth,
            onSelect: function (dateText, inst) {

                var dateClickedObj = new Date(dateText);
                logMe(dateClickedObj);
                var dayClicked = dateClickedObj.getDate();

                jQuery('.day-to-show').removeClass('day-to-show');
                //todo add day end and show days in between
                //loop thru all divs and marking them as day-to-show
                $allEventDivs.each(function () {
                    var $thisDiv = jQuery(this);
                    var thisDivsStartDate = new Date($thisDiv.attr('startdate'));
                    var thisDivsEndDate = new Date($thisDiv.attr('enddate'));

                    //if dateClicked IS startdate (may have to round date to minute)
                    //if (dateClickedObj == thisDivsStartDate) {
                    if(areDatesEqual(dateClickedObj, thisDivsStartDate)) {
                        $thisDiv.addClass('day-to-show');
                    }

                    //if dateClicked is between start and end dat
                    if (dateClickedObj > thisDivsStartDate && dateClickedObj < thisDivsEndDate) {
                        $thisDiv.addClass('day-to-show');
                    }

                    //if dateClicked IS enddate (may have to round date to minute)
                    if (areDatesEqual(dateClickedObj, thisDivsEndDate)) {
                        $thisDiv.addClass('day-to-show');
                    }
                });

                //get count
                $dayDivsInPage = jQuery('.day-to-show');
                //var $dayDivsInPage = jQuery('.day-' + dayClicked);

                if ($dayDivsInPage.length > 0) {
                    $allEventDivs.hide();
                    $dayDivsInPage.show();
                } else {
                    if (jQuery('#noEventsDialog').length === 0) {

                        $noMsgEventsDiv = jQuery('#noEventsDiv')
                        if ($noMsgEventsDiv.length) {
                            var noEventsMsg = $noMsgEventsDiv.html();

                        } else {
                            var noEventsMsg = 'There are no calendar events for the date you have chosen. Showing all events.';
                        }

                        if ($noMsgEventsDiv.hasClass('dialog')) {
                            var noEventsDialog = jQuery('<div />').attr('id', 'noEventsDialog').html(noEventsMsg).dialog();
                            $allEventDivs.show();
                            var timeCloseDialog = setTimeout(function () {
                                noEventsDialog.remove();
                            }, getMillisecondsToDisplayMsg());
                        } else {
                            //show div in page.
                            $noMsgEventsDiv.show();

                            var timeCloseDialog = setTimeout(function () {
                                $noMsgEventsDiv.hide();
                            }, getMillisecondsToDisplayMsg());
                        }


                    }
                }
            }
        });

    }
}