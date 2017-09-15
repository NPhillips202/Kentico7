

//update datepickers date so it is sent correctly
function selectBoxChanged(args) {
    logMe('selectBoxChanged event fired yo!');
    //printObject(args)
    //   console.debug(args);
    // jQuery('span.change').append(args.selectedVal);

    refreshDatepickers()

}


//IE friendly print object could use console.debug(); or obj.ToSource() in real browser
function printObject(o) {
    var out = '';
    for (var p in o) {
        out += p + ': ' + o[p] + '\n';
    }
    logMe(out);
}



function getPushdate() {

    pushDateVal = 1;  //put in rel attribute of #startdate or .numbernights field

    var rel = parseInt(jQuery('#startdate').attr('rel'));
    //if stardate has rel set it to that
    if (rel > 0) {
        pushDateVal = rel;
    }

    // if there is .numbernights dropdown set it to that
    if (jQuery('.numbernights').length > 0) {
        pushDateVal = parseInt(jQuery('.numbernights').val());  //!parseInt important
    }

    return pushDateVal;

}

//replace "'" or %27 w/ %92 so that some booking engines / resnet dont throw error..
//happens when utmctr / search term has a quote, TODO (may have to break down vars)
function replaceQuote(a) {
    a = a.replace(/\'/, '%92');
    a = a.replace(/%27/gi, '%92');
    return a;
}


//goes in order from:  startdate dropdowns -> #startdate -> #enddate -> enddate dropdowns
function refreshDatepickers() {

    if (jQuery(".startmonth").length > 0) {

        //only needed on dropdowns and not for text or hidden
        if (jQuery(".selectboxplugin .startmonth").attr("type") != 'hidden' && jQuery(".selectboxplugin .startmonth").attr("type") != 'text') {

            var startmonth = jQuery(".startmonth").val();
            var startday = jQuery(".startday").val();
            var startyear = jQuery(".startyear").val();

            //todo: change format if multi lang

            //push value into startdate
            var startDateDropdowns = startmonth + "/" + startday + "/" + startyear;
            jQuery('#startdate').val(startDateDropdowns);


            //need conditional here comparing dates
            //pushes #startdate -> #enddate if needed


            //push value into enddate if pushdate didn't do it
            //pushes #enddate into enddate dropdowns !push date has this w/ comparisons

            //be careful of val() having incremented value!!!!!
            var endmonth = jQuery(".endmonth").val();
            var endday = jQuery(".endday").val(); //issue w/ #enddate here
            var endyear = jQuery(".endyear").val();
            var endDateDropdowns = endmonth + "/" + endday + "/" + endyear;
            //alert(endDateDropdowns);
            jQuery('#enddate').val(endDateDropdowns);


        }
        pushDateSeparate(getPushdate());
    }
}

//pushes into separate date fields (deprecate this??
function pushDateSeparate(numberDaysAhead) {
    if (jQuery("#enddate").length > 0) {

        var startDate = jQuery("#startdate").datepicker("getDate");
        var endDate = jQuery("#enddate").datepicker("getDate");
        var startDatePlus = jQuery("#startdate").datepicker("getDate"); //need to compare startdate plus num nights    
        startDatePlus.setDate(startDatePlus.getDate() + numberDaysAhead);

        //stardate was updated and is greater
        if (startDatePlus > endDate) {
            jQuery('#enddate').datepicker('setDate', startDatePlus);
            fillEndDateDropdowns(jQuery('#enddate').val())
        }
        //enddate updated

        //exact because if nights are changed enddate should always be exactly startdate + nights
        //if number nights set via select box plugin.
        if (jQuery('#numbernights_input').val() > 0) {
            //alert(jQuery('#numbernights_input').val() + "pushDateSeparate");
            jQuery('#enddate').datepicker('setDate', startDatePlus);
            fillEndDateDropdowns(jQuery('#enddate').val())
        }
    }
}

//pushes the endDate back to +numberDaysAhead days of startdate
function pushDate(numberDaysAhead) {
    if (jQuery("#enddate").length > 0) {

        var startDate = jQuery("#startdate").datepicker("getDate");

        if (startDate) {
            var endDate = jQuery("#enddate").datepicker("getDate");
            var startDatePlus = jQuery("#startdate").datepicker("getDate"); //need to compare startdate plus num nights    
            startDatePlus.setDate(startDatePlus.getDate() + numberDaysAhead);

            //stardate was updated and is greater
            if (startDatePlus > endDate) {
                jQuery('#enddate').datepicker('setDate', startDatePlus);
                fillEndDateDropdowns(jQuery('#enddate').val())
            }
            //enddate updated

            //exact because if nights are changed enddate should always be exactly startdate + nights
            //if number nights set via select box plugin.
            if (jQuery('.numbernights').val() > 0) {
                jQuery('#enddate').datepicker('setDate', startDatePlus);
            }
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

//TODO: dateformat on multilang site.
function fillStartDateDropdowns(date_m_d_yy) {
    logMe('fillStartDateDropdowns call w val ' + date_m_d_yy);

    //fills in selectbox plugin dropdowns or hidden fields containing the dates split
    // assumes classes of .startmonth, .startday, .startyear
    var strFilled;
    strFilled = date_m_d_yy.split("/");
    
    for (i = 0; i < 2; i++)// added for the ridges booking
    {
        var aux = parseInt(strFilled[i], 10); // added for the ridges booking
        strFilled[i] = (aux < 10) ? '0' + aux : aux.toString(); // added for the ridges booking
    }
    
    var month_id = '#' + jQuery(".startmonth").attr('id');
    //some booking engines only take zeroBased month
    if (jQuery(".startmonth").hasClass("zeroBasedMonth")) {
        strFilled[0]--;
    }
    jQuery(".startmonth").val(strFilled[0]);  //put values

    var day_id = '#' + jQuery(".startday").attr('id');
    jQuery(".startday").val(strFilled[1]);

    var year_id = '#' + jQuery(".startyear").attr('id');
    //TODO: make it so they can stack classes in any format w/ delimiters !think
    if (jQuery(".startyear").hasClass('startmonth')) {
        jQuery(".startyear").val(strFilled[0] + strFilled[2]);
    } else {
        jQuery(".startyear").val(strFilled[2]);
    }

    //if selectbox plugin
    if (jQuery(".selectboxplugin .startmonth").length > 0) {
        if (jQuery(".selectboxplugin .startmonth").attr("type") != 'hidden' && jQuery(".selectboxplugin .startmonth").attr("type") != 'text') {

            logMe('why am i reloading the selectboxes (need to reload the options)');

            //refresh dropdowns if they exist should make fn.
            jQuery(month_id + '_input').remove();
            jQuery(month_id + '_container').remove();
            logMe('loaded .selectboxplugin ' + month_id)
            jQuery('.selectboxplugin ' + month_id).selectbox();

            jQuery(day_id + '_input').remove();
            jQuery(day_id + '_container').remove();
            jQuery('.selectboxplugin ' + day_id).selectbox();

            jQuery(year_id + '_input').remove();
            jQuery(year_id + '_container').remove();
            jQuery('.selectboxplugin ' + year_id).selectbox();

            jQuery(".selectbox-wrapper").bind("click", function(e) {
                refreshDatepickers();
            });
        }
    }
}



function fillEndDateDropdowns(date_m_d_yy) {


    //fills in selectbox plugin dropdowns or hidden fields containing the dates split
    //  assumes classes of .endmonth, .endday, .endyear
    var strFilled;
    strFilled = date_m_d_yy.split("/");
    
    //strFilled[1]--;  //day too low?
   
    for (i = 0; i < 2; i++)// added for the ridges booking
    {
        var aux2 = parseInt(strFilled[i]); // added for the ridges booking
        strFilled[i] = (aux2 < 10) ? '0' + aux2 : aux2.toString(); // added for the ridges booking
    }
    
    var month_id = '#' + jQuery(".endmonth").attr('id');
    //some booking engines only take zeroBased month
    if (jQuery(".endmonth").hasClass("zeroBasedMonth")) {
        strFilled[0]--;
    }
    jQuery(".endmonth").val(strFilled[0]);  //if hidden field or separate text


    var day_id = '#' + jQuery(".endday").attr('id');


    jQuery(".endday").val(strFilled[1]);  //if hidden field or separate text

    //TODO: make it so they can stack classes in any format w/ delimiters !think

    if (jQuery(".endyear").hasClass('endmonth')) {
        jQuery(".endyear").val(strFilled[0] + strFilled[2]);
    } else {
        jQuery(".endyear").val(strFilled[2]);
    }


    //check if end month is select!!!
    if (jQuery(".selectboxplugin .endmonth").length > 0) {
        if (jQuery(".selectboxplugin .endmonth").attr("type") != 'hidden' && jQuery(".selectboxplugin .endmonth").attr("type") != 'text') {  //needs hidden too!


            //refresh dropdowns here fi they exist    
            jQuery(month_id + '_input').remove();
            jQuery(month_id + '_container').remove();
            jQuery('.selectboxplugin ' + month_id).selectbox();

            jQuery(day_id + '_input').remove();
            jQuery(day_id + '_container').remove();
            jQuery('.selectboxplugin ' + day_id).selectbox();


            jQuery(year_id + '_input').remove();
            jQuery(year_id + '_container').remove();
            jQuery('.selectboxplugin ' + year_id).selectbox();

            jQuery(".selectbox-wrapper").bind("click", function(e) {
                refreshDatepickers();
            });
        }
    }
}


//remove http:// & https://
function stripProtocol(inStrip) {

    inStrip = inStrip.replace(/http:\/\//gi, '');
    inStrip = inStrip.replace(/https:\/\//gi, '');
    return inStrip;
}

//add leading zeros if needed 9 -> 09
function leadZero(num) {
    if (num < 10) {
        num = '0' + num;
    }
    return num;
}

//convert long year to short year 2010 -> 10
function yyToy(year) {
    if (year.length > 2) {
        year = year.substring(2, 4);
    }
    return year;
}


//resnet does not support key-value pairs in its url... only semi-colon delimited ...  usually iFramed on same site
//also its a cgi-bin app so booking domain is same.

//cgi-bin/lansaweb in form action,  res.domain

function GoBooking_Resnet(action) {

    //build w/ SaharaV1 as model - updated janugget removed frame -added default attr

    fillStartDateDropdowns(jQuery("#startdate").val());

    //resnet url format                                       (action)      ratecode;mmddy;nights;adults;children; -- question mark terminates !important

    //https://res.saharavegas.com/cgi-bin/lansaweb?procfun+rn+resnet+sh1+funcparms+UP%28A2560%29:;Luv;050510;03;02;01;?#

    var resnet = [];



    startmonth = leadZero(jQuery('.startmonth').val());

    startday = leadZero(jQuery('.startday').val());

    startyear = yyToy(jQuery('.startyear').val());

    dateCombined = startmonth + '' + startday + '' + startyear;



    //in order by resnet !important 

    //using everything before the ":"  in the .booking_link

    resnet.push(action);

    ratecode = jQuery('.ratecode').val()


    if (ratecode.length < 2) ratecode = jQuery('.ratecode').attr('default');

    // alert(ratecode);



    resnet.push(ratecode);

    resnet.push(dateCombined);



    resnet.push(jQuery('.nights').val());

    resnet.push(jQuery('.adults').val());

    resnet.push(jQuery('.children').val());



    //other fields at end case 62673

    jQuery('.extras').each(function() {

        // alert(jQuery(this).val());

        resnet.push(jQuery(this).val());

    });


    resnet.push('?'); //must end in ?



    var url = resnet.join(';');  //adds ';' between all vars



    //mh added replaceQuote case 47446

    var linkerUrl = replaceQuote(pageTracker._getLinkerUrl(url));



    if (jQuery('.Booking_Mask').hasClass("popup")) {

        var popup_params = 'resizable,scrollbars,width=825,height=640,top=800,left=800';



        //pull popup parameters from forms' rel attribute

        if (jQuery('.Booking_Mask').attr('rel') != undefined) {

            popup_params = jQuery(this).attr('rel');

        }

        window.open(linkerUrl, '', popup_params);

        return false;

    } else {

        //regular 

        window.open(linkerUrl, jQuery('.Booking_Mask').attr('target'), '');

    }


}

//debug function for creating form from booking engine url string
function alertForm(url) {
    //var url = prompt("Enter Url to create form.");
    var form_string = "";

    url_arr = url.split('?');

    if (url_arr.length > 1) {
        form_string = "<form class=\"Booking_Mask\" method=\"get\" action=\"" + url_arr[0] + "\" > \n";
    } else {
        form_string = "<form class=\"Booking_Mask\" method=\"get\" action=\"put url here\" > \n";
    }

    //split params
    hidden_arr = url_arr[1].split('&');

    var num_of_params = hidden_arr.length;

    for (i = 0; i < num_of_params; i++) {

        //split key/values
        var key_value = hidden_arr[i];

        key_value_arr = key_value.split('=');
        var this_key = key_value_arr[0];
        var this_val = key_value_arr[1];

        form_string = form_string + this_key + ": \n ";
        form_string = form_string + "   <input type=\"text\" name=\"" + this_key + "\" value=\"" + this_val + "\" />\n";

    }
    form_string = form_string + "   <input type=\"submit\" value=\"submit\" />\n";
    form_string = form_string + "</form>\n";

    alert(form_string);
    return false;
}


function Booking_Mask(startmonth, startday, startyear, endmonth, endday, endyear, adults, children, rooms, nights, ratecode, propertyIndex) {

    alert(" startmonth: " + startmonth + "\n startday: " + startday + "\n startyear: " + startyear + "\n endmonth: " + endmonth + "\n endday: " + endday + "\n endyear: " + endyear + "\n adults: " + adults + "\n children: " + children + "\n rooms: " + rooms + "\n nights: " + nights + "\n ratecode: " + ratecode + "\n propertyIndex: " + propertyIndex);

    //flash team having issues w/ flash datepicker sending null, just use current year if null
    if (startyear == 'null') {
        //alert("startyear  ==> " + startyear);
        var d = new Date();
        startyear = d.getFullYear();
    }


    //do funstuff to build url here;
    //pagetracker(url) etc
    // window.open( url etc)
    jQuery(".startmonth").val(startmonth);
    jQuery(".startday").val(startday);
    jQuery(".startyear").val(startyear);

    jQuery(".endmonth").val(endmonth);
    jQuery(".endday").val(endday);
    jQuery(".endyear").val(endyear);
    //it will push if less than but need flash team to send null of the user didn't fill enddate

    jQuery("#startdate").val(startmonth + '/' + startday + '/' + startyear);
    fillStartDateDropdowns(startmonth + '/' + startday + '/' + startyear);

    //pushdate if enddate empty or less than startdate.
    if (endmonth == 'null' || endmonth < startmonth) {
        //   alert('enddate pushed');
        refreshDatepickers();
        //fill hidden form
    }



    //submit form of html booking mask

    if (jQuery('.Booking_Mask').length > 0) {
        jQuery('.Booking_Mask').submit();
    } else {
        // alert('need to add hidden booking mask form for selected booking engine to page for flash booking to work');
    }

}

//replace "'" or %27 w/ %92 so that some booking engines / resnet dont throw error..
//happens when utmctr / search term has a quote, TODO (may have to break down vars)
function replaceQuote(a) {
    a = a.replace(/\'/, '%92');
    a = a.replace(/%27/gi, '%92');
    return a;
}






//end my functions & begin plugins & libraries



/*
* jQuery selectbox plugin
*
* Copyright (c) 2007 Sadri Sahraoui (brainfault.com) 
//mh removed $ to jQuery because of prototype conflict
*/
jQuery.fn.extend({
    selectbox: function(options) {
        return this.each(function() {
            new jQuery.SelectBox(this, options);
        });
    }
});


/* pawel maziarz: work around for ie logging */
if (!window.console) {
    var console = {
        log: function(msg) {
        }
    }
}
/* */

jQuery.SelectBox = function(selectobj, options) {

    var opt = options || {};
    opt.inputClass = opt.inputClass || "selectbox";
    opt.containerClass = opt.containerClass || "selectbox-wrapper";
    opt.hoverClass = opt.hoverClass || "current";
    opt.currentClass = opt.selectedClass || "selected"
    opt.debug = opt.debug || false;

    var elm_id = selectobj.id;
    var active = -1;
    var inFocus = false;
    var hasfocus = 0;
    //jquery object for select element
    var $select = jQuery(selectobj);
    // jquery container object
    var $container = setupContainer(opt);
    //jquery input object 
    var $input = setupInput(opt);
    // hide select and append newly created elements
    $select.hide().before($input).before($container);


    init();

    $input
	.click(function() {
	    if (!inFocus) {
	        $container.toggle();
	    }
	})
	.focus(function() {
	    if ($container.not(':visible')) {
	        inFocus = true;
	        $container.show();
	    }
	})
	.keydown(function(event) {
	    switch (event.keyCode) {
	        case 38: // up
	            event.preventDefault();
	            moveSelect(-1);
	            break;
	        case 40: // down
	            event.preventDefault();
	            moveSelect(1);
	            break;
	        //case 9:  // tab                                                            
	        case 13: // return
	            event.preventDefault(); // seems not working in mac !
	            jQuery('li.' + opt.hoverClass).trigger('click');
	            break;
	        case 27: //escape
	            hideMe();
	            break;
	    }
	})
	.blur(function() {
	    if ($container.is(':visible') && hasfocus > 0) {
	        if (opt.debug) console.log('container visible and has focus')
	    } else {
	        hideMe();
	    }
	});



    function hideMe() {
        hasfocus = 0;
        $container.hide();
    }

    function init() {
        $container.append(getSelectOptions($input.attr('id'))).hide();
        var width = $input.css('width');
        $container.width(width);
    }

    function setupContainer(options) {
        var container = document.createElement("div");
        $container = jQuery(container);
        $container.attr('id', elm_id + '_container');
        $container.addClass(options.containerClass);

        return $container;
    }

    function setupInput(options) {
        var input = document.createElement("input");
        var $input = jQuery(input);
        $input.attr("id", elm_id + "_input");
        $input.attr("type", "text");
        $input.addClass(options.inputClass);
        $input.attr("autocomplete", "off");
        $input.attr("readonly", "readonly");
        $input.attr("tabIndex", $select.attr("tabindex")); // "I" capital is important for ie

        return $input;
    }

    function moveSelect(step) {
        var lis = jQuery("li", $container);
        if (!lis) return;

        active += step;

        if (active < 0) {
            active = 0;
        } else if (active >= lis.size()) {
            active = lis.size() - 1;
        }

        lis.removeClass(opt.hoverClass);

        jQuery(lis[active]).addClass(opt.hoverClass);
    }

    function setCurrent() {
        var li = jQuery("li." + opt.currentClass, $container).get(0);
        var ar = ('' + li.id).split('_');
        var el = ar[ar.length - 1];
        $select.val(el);
        $input.val(jQuery(li).html());
        return true;
    }

    // select value
    function getCurrentSelected() {
        return $select.val();
    }

    // input value
    function getCurrentValue() {
        return $input.val();
    }

    function getSelectOptions(parentid) {
        var select_options = new Array();
        var ul = document.createElement('ul');
        $select.children('option').each(function() {
            var li = document.createElement('li');
            li.setAttribute('id', parentid + '_' + jQuery(this).val());
            li.innerHTML = jQuery(this).html();
            if (jQuery(this).is(':selected')) {
                $input.val(jQuery(this).html());
                jQuery(li).addClass(opt.currentClass);
            }
            ul.appendChild(li);
            jQuery(li)
			.mouseover(function(event) {
			    hasfocus = 1;
			    if (opt.debug) console.log('over on : ' + this.id);
			    jQuery(event.target, $container).addClass(opt.hoverClass);
			})
			.mouseout(function(event) {
			    hasfocus = -1;
			    if (opt.debug) console.log('out on : ' + this.id);
			    jQuery(event.target, $container).removeClass(opt.hoverClass);
			})
			.click(function(event) {
			    var fl = jQuery('li.' + opt.hoverClass, $container).get(0);
			    if (opt.debug) console.log('click on :' + this.id);
			    jQuery('li.' + opt.currentClass).removeClass(opt.currentClass);
			    jQuery(this).addClass(opt.currentClass);
			    setCurrent();
			    hideMe();
			});
        });
        return ul;
    }

};
//end selectbox plugin

///v4 already has jQuery ui  //end jquery ui plugins


