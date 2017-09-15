// Miraval custom.js 2017 Cendyn.com

// init sitemap
function initSiteMap() {
	//--Site Map Click Event
	jQuery('*').click(function(e) {
		//console.log("Button CLick");
		//jQuery('*').live('click', function(e) {
		var target = jQuery(e.target);
		//if (target.hasClass('sitemap-toggle')) {
		if (target.closest('li').hasClass('sitemap-toggle')) {
			e.preventDefault();
			e.stopPropagation();
			if (jQuery('.sitemap-float').is(':visible')) {
				jQuery(".sitemap-float").fadeOut(500);
			} else {
				jQuery(".sitemap-float").fadeIn(500);
			}
		} else {
			if (jQuery('.sitemap-float').is(':visible') && !target.hasClass('sitemap-float') && !jQuery('.sitemap-float').has(target).length > 0) {
				if (!target.hasClass('.sitemap-float')) {
					jQuery('.sitemap-float').fadeOut(500);
				}
			}
		}
	});
}

// Nav Highlighting for Shared Pages
function navHightlighting() {
	// get start time
	//console.time('navHightlighting');

	var main_nav = jQuery('nav .nav-bd-inner .nav-main');
	main_nav.each(function(){
		main_nav = jQuery(this);

		var thisUrl =  window.location.origin + window.location.pathname;
		var target = main_nav.find('a[href="' + thisUrl + '"]').parent('li');
		var parent_target = main_nav.find('li ul a[href="' + thisUrl + '"]').parent();
		if ( !target.hasClass('HighLighted') ) {
			target.addClass('HighLighted');
		}
		if ( !parent_target.hasClass('HighLighted') ) {
			parent_target.addClass('HighLighted');
		}
		parent_target.each(function(){
			if ( !jQuery(this).hasClass('HighLighted') ) {
				jQuery(this).addClass('HighLighted');
			};
		});

		//console.log(window.location.origin);
		//console.log(window.location.pathname);

		//console.log(target.length);
		//console.log(parent_target.length);
		//console.log(parent_target.hasClass('HighLighted'));
		//console.log(main_nav.find('a[href*="' + thisUrl + '"]').attr('href'));
		//console.log('thisUrl: ' + thisUrl);

		// specials highlighting
		var specials_target = main_nav.find('a[href*="bali-resort-packages"], a[href*="jakarta-resort-packages"]').parent();
		if ( (window.location.href.indexOf("special-offers") > -1) && (!specials_target.hasClass('HighLighted')) ) {
			specials_target.addClass('HighLighted');
		}
		if ( !parent_target.parent().prev().parent().hasClass('HighLighted') ) {
			parent_target.parent().prev().parent().addClass('HighLighted');
		}
		var sub_target = jQuery('#subnav ul a[href="' + thisUrl + '"]').parent();
		if ( !sub_target.hasClass('HighLighted') ) {
			sub_target.addClass('HighLighted');
			// {% QueryString["property"].ToLower() |(user)LFleurimond|(hash)dd9a640a1a10a9415c29f6d3e90df28af9f6a4574651c95e7243c5571a931f03%}
		}
	});

	//console.timeEnd('navHightlighting');
	// add up time to get load time
}

// Get Viewport
function getViewport() {

	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
	return x;
}

// http://codepen.io/micahgodbolt/pen/FgqLc
// https://github.com/liabru/jquery-match-height
function equalheight(container){
	var currentTallest = 0,
		currentRowStart = 0,
		rowDivs = new Array(),
		$el,
		topPosition = 0;
	jQuery(container).each(function() {
		$el = jQuery(this);
		jQuery($el).height('auto');
		topPostion = $el.position().top;
		if (currentRowStart != topPostion) {
			for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
				rowDivs[currentDiv].height(currentTallest);
			}
			rowDivs.length = 0; // empty the array
			currentRowStart = topPostion;
			//currentTallest = $el.height();
			currentTallest = $el.outerHeight();
			rowDivs.push($el);
		} else {
			rowDivs.push($el);
			//currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
			currentTallest = (currentTallest < $el.outerHeight()) ? ($el.outerHeight()) : (currentTallest);
		}
		for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
			rowDivs[currentDiv].height(currentTallest);
		}
	});
}

// get query string
function getQuery(q) {

	return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
}

// Add query parameter
function addQueryParam( key, val ){
	/*
	var regexp = new RegExp("(\\?|\\&)" + param + "\\=([^\\&]*)(\\&|$)");
	if (regexp.test(document.location.search))
		return (document.location.search.toString().replace(regexp, function(a, b, c, d) {
			return (b + param + "=" + value + d);
		}));
	else
		return document.location.search + param + "=" + value;
	*/
	return document.location.search
	.replace(new RegExp("([?&]" + key + "(?=[=&#]|$)[^#&]*|(?=#|$))"), "&" + key + "=" + encodeURIComponent(val))
	.replace(/^([^?&]+)&/, "$1?");
}

// Get Query Params
function getQueryParams(name, url) {
	if (!url) {
		url = window.location.href;
	}
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//
function getAllUrlParams(url) {
	// get query string from url (optional) or window
	var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

	// we'll store the parameters here
	var obj = {};

	// if query string exists
	if (queryString) {
		// stuff after # is not part of query string, so get rid of it
		queryString = queryString.split('#')[0];

		// split our query string into its component parts
		var arr = queryString.split('&');

		for (var i=0; i<arr.length; i++) {
			// separate the keys and the values
			var a = arr[i].split('=');

			// in case params look like: list[]=thing1&list[]=thing2
			var paramNum = undefined;
			var paramName = a[0].replace(/\[\d*\]/, function(v) {
				paramNum = v.slice(1,-1);
				return '';
			});

			// set parameter value (use 'true' if empty)
			var paramValue = typeof(a[1])==='undefined' ? true : a[1];

			// (optional) keep case consistent
			paramName = paramName.toLowerCase();
			paramValue = paramValue.toLowerCase();

			// if parameter name already exists
			if (obj[paramName]) {
				// convert value to array (if still string)
				if (typeof obj[paramName] === 'string') {
					obj[paramName] = [obj[paramName]];
				}
				// if no array index number specified...
				if (typeof paramNum === 'undefined') {
					// put the value on the end of the array
					obj[paramName].push(paramValue);
				}
				// if array index number specified...
				else {
					// put the value at that index number
					obj[paramName][paramNum] = paramValue;
				}
			}
			// if param name doesn't exist yet, set it
			else {
				obj[paramName] = paramValue;
			}
		}
	}
	return obj;
}

//
function getUrlParams() {
	var result = {};
	var params = (window.location.search.split('?')[1] || '').split('&');
	for(var param in params) {
		if (params.hasOwnProperty(param)) {
			paramParts = params[param].split('=');
			result[paramParts[0]] = decodeURIComponent(paramParts[1] || "");
		}
	}
	return result;
}

/*
// remove
function addToRecord(checkbox, array) {
	var addCategory = checkbox.val();
	console.log('addCategory: ' + addCategory);
	array.push(addCategory);
	for (i = 0; i < array.length; i++) {
		var newCategory = array[i];
		console.log('newCategory: ' + newCategory);
	}
	return newCategory;
}
// add
function removeFromRecord(checkboxID, array) {
	array.splice(checkboxID, 1);
	var newCategory = "";
	// re-display the records from foodList the same way we did it in addToFood()
	for (var i = 0; i < array.length; i++) {
		newCategory += array[i];
		console.log('newCategory: ' + newCategory);
	}
	return newCategory;
}
*/

// local storage load, save & clear
function generateUrl(url){
	url = url + '?category=';
	//url = url + '?mock=true&category=';
	var counter = 0;
	jQuery('fieldset input[type="checkbox"].checkbox-input').each(function(index){
		var checkbox = jQuery(this);
		if(localStorage.getItem(checkbox.attr('id')) == "true"){
			//console.log(checkbox.attr('id'));
			if(counter === 0){
				url += checkbox.attr('id');
			} else {
				url += ',' + checkbox.attr('id');
			}
			counter++;
		}
	}
	return url;
}
function load(checkbox){
	var categories = getQuery('category');
	var checkboxID = checkbox.attr('id');
	var isCheckboxInCategory = getQuery('category') !== null ? getQuery('category').indexOf(checkbox.val()) : -1;
	var checked = localStorage.getItem(checkboxID) !== null ? localStorage.getItem(checkboxID) : 'false';
	var actualChecked = checkbox.attr('checked') !== undefined ? true : false;

	//console.log('Curr Val: ' + checkbox.val() + ' | Parent Curr Val: ' + checkbox.closest('label').attr('for') +
	'\nIs checked? ' + checked + ' | Actual checked: ' + actualChecked +
	'\nOnLoad - getQuery(category): ' + getQuery('category') +
	'\nOnLoad - checkbox.val(): ' + checkbox.val() +
	'\n#########################################' +
	'\n                                         ' +
	'\n' + checkboxID + ' - ' + checked + ' ---- ' + checkbox.is(':checked') +
	'\n' + isCheckboxInCategory +
	'\n                                         ');
	/*
	*/

	if ( checked === "true" || actualChecked === true || isCheckboxInCategory !== -1) {
		checkbox.prop('checked', true);
		localStorage.setItem(checkboxID, true);
	} else {
		checkbox.prop('checked', false);
		localStorage.setItem(checkboxID, false);
	}
}
function save(checkbox, url){
	var categories = getQuery('category') || '';
	var checkboxID = checkbox.attr('id');
	var isCheckboxInCategory = getQuery('category') !== null ? getQuery('category').indexOf(checkbox.val()) : -1;
	var checked = localStorage.getItem(checkboxID) !== null ? localStorage.getItem(checkboxID) : 'false';
	var actualChecked = checkbox.attr('checked') !== undefined ? true : false;

	/*console.log('Curr Val: ' + checkbox.val() + ' | Parent Curr Val: ' + checkbox.closest('label').attr('for') +
	'\nIs checked? ' + checked + ' | Actual checked: ' + actualChecked +
	'\ncategories: ' + categories +
	'\nOnLoad - getQuery(category): ' + getQuery('category') +
	'\ntypeof getQuery(\'category\'): ' + typeof getQuery('category') +
	'\n#########################################' +
	'\n                                         ' +
	'\ncheckbox.is(\':checked\'): ' + checkbox.is(':checked') +
	'\n' + isCheckboxInCategory +
	'\n                                         ');*/
	//
	var separators = [',%20', ', ', ','];
	//console.log("cat:" + categories);
	var categoriesArray = categories.split(new RegExp(separators.join('|'), 'g'));
	var localStorageValue;
	var orderByParam = getQuery('orderby') != null ? "&orderby=" + getQuery('orderby') : '';

	if(checkbox.is(':checked') && categories !== null) {
		localStorageValue = localStorage.setItem(checkboxID, true);
		//console.log(categoriesArray);
	} else {
		localStorageValue = localStorage.setItem(checkboxID, false);
	}

	if(checkbox.is(':checked')) {
		checkbox.prop('checked', true);
		localStorage.setItem(checkboxID, true);
		url = generateUrl(url) + orderByParam;
		//url = url + '?category=' + ( (getQuery('category') !== "" && getQuery('category') !== null) ? getQuery('category') + ", " : "" ) + checkbox.val();
	} else {
		checkbox.prop('checked', false);
		localStorage.setItem(checkboxID, false);
		url = generateUrl(url) + orderByParam;
	}

	//window.location.href = url + '';
	if(getQuery('mock') == "true") console.log(url);
	//if(getQuery('mock') == "true") window.location.href = url + '';
	//window.location.href = url + '&mock=true';
	if(getQuery('mock') != "true") window.location.href = url;
}
function clear(){
	//location.reload();
	localStorage.clear();
}

jQuery(function(){
	// add required classes to <A> tags to accommodate CSS styling for links within content
	jQuery('main a').each(function(){
		if( (jQuery(this).attr('class') === "" || jQuery(this).attr('class') === undefined) &&
			!jQuery(this).parent().is('h1, h2, h3, li, .scheduleDaily-table-cell')) {
			jQuery(this).addClass('txt txt_link');
		} else {
			if(jQuery(this).closest('#wrapper').is('.cms-blogpost') && jQuery(this).parent().is('.list-item')) {
				jQuery(this).addClass('txt txt_tiny m-txt_uppercase');
			}
		}
	});
	// <P> tags
	jQuery('.sub-page-template:not(.sub-page-template_classes-treatment-event-details) > p').each(function(){
		//console.log(jQuery(this).attr('class'));
		if(jQuery(this).attr('class') === "" || jQuery(this).attr('class') === undefined) {
			if( ( jQuery(this).closest('#wrapper').is('.cms-blogpost') && !jQuery(this).closest('div').is('.bottom-part-of-blog-post') ) ||
				( jQuery(this).closest('#wrapper').is('.miravalspamonarchbeachcom0109-specialpackagescategorypage') && !jQuery(this).closest('div').is('.card-bd') ) ||
				jQuery(this).closest('#wrapper').is('.miravalspamonarchbeachcom0109-gallerypage') ||
				jQuery(this).closest('#wrapper').is('.miravalspamonarchbeachcom0109-specialpackagesdetails') ||
				jQuery(this).closest('div').is('.u-alignCenter') ) {
				//console.log(jQuery(this).closest('article').is('.specialist-block'))
				if( jQuery(this).closest('article').is('.specialist-block') ){
					jQuery(this).addClass('txt u-vr4x');
				} else {
					jQuery(this).addClass('txt');
				}
			} else {
				jQuery(this).addClass('txt u-vr6x');
			}
		}
	});
	// <H2> tags
	jQuery('.sub-page-template > h2').each(function(){
		if(jQuery(this).attr('class') === "" || jQuery(this).attr('class') === undefined) {
			jQuery(this).addClass('txt txt_h2 m-txt_colorTertiary u-vr4x');
		}
	});
	// <TABLE> tags
	jQuery('.sub-page-template > table').each(function(){
		if(jQuery(this).attr('class') === "" || jQuery(this).attr('class') === undefined) {
			jQuery(this).addClass('table table_secondaryBordered');
		}
		if(jQuery(this).find('td').attr('class') === "" || jQuery(this).find('td').attr('class') === undefined) {
			jQuery(this).find('td').addClass('txt txt_small m-txt_uppercase');
		}
		if(jQuery(this).find('td').first().attr('class') === "" || jQuery(this).find('td').first().attr('class') === undefined) {
			jQuery(this).find('td').first().addClass('m-txt_colorTertiary');
		}
	});
	// classes, treatments & special events (H3 & P)
	jQuery('.sub-page-template.sub-page-template_classes-treatment-event-details').find('> h3, > p').each(function(){
		var nodeName = jQuery(this).get(0).nodeName;
		if(nodeName == "H3"){
			jQuery(this).addClass('txt txt_h3 m-txt_colorTertiary m-txt_bold');
		}
		if(nodeName == "P"){
			jQuery(this).addClass('txt');
			jQuery(this).parent().find('> p:eq(0)').addClass('u-vr4x');
		}
	});

	// make blocks clickable
	jQuery('.schedule-list, .class-list-item, .featured-items').find('.grid-col > .split').each(function(){
		var actualLink = jQuery(this).find('.split-item > a');
        var flag = true;
        if (actualLink.hasClass("call-link"){flag = false};
        //console.log(flag);
		//console.log(actualLink);
		//actualLink.click(function(){ });
		jQuery(this).click(function(){
            if(flag)
			  window.open(actualLink.attr("href"), '_blank');
            else
              window.open(actualLink.attr("href"), '_self');
			return false;
		});
	}).css('cursor', 'pointer');

	// force sitemap close button to close when click
	jQuery(".sitemap-toggle").click(function(){
		jQuery(".sitemap-float").css("display","none");
	});
	// init sitemap
	initSiteMap();

	// nav highlight
	navHightlighting();

	// full path
	var currentFullPathURL = window.location.protocol + "//" + window.location.host + window.location.pathname;
	//var currentFullPathURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname;

	/* START - FILTERS on Class List page */

	/********************************/

	//console.log('getQuery(category):', getQuery('category'));
	if(getQuery('category') === "" || getQuery('category') == null){
		clear();
	}

	/*if(getQuery('mock') == "true") {
		jQuery('.ContentCheckBoxList > label').each(function(){
			var $this = jQuery(this);
			var spanCheckboxBTN = jQuery('<span />').addClass('checkbox-btn').attr('aria-hidden', 'true');
			var spanCheckboxLabel = jQuery('<span />').addClass('checkbox-label').html($this.text());
			//$this.prev(':checkbox').addClass('checkbox-input').attr('_disabled', '').attr('id', $this.text().replace(' ', '-').toLowerCase());
			var actualCheckbox = $this.prev(':checkbox').addClass('checkbox-input').attr('_disabled', '');
			$this.text('').addClass('checkbox').append(spanCheckboxBTN).append(spanCheckboxLabel).prepend(actualCheckbox);
		});
	}*/

	jQuery('fieldset input[type="checkbox"].checkbox-input').each(function(index){
		var checkbox = jQuery(this);
		//console.log('-----------------------------\n' + checkbox.attr('id') + ' - ' + localStorage.getItem(checkbox.attr('id')) + '\n-----------------------------');
		load(checkbox);
	});
	jQuery('.miravalspamonarchbeachcom0109-classlistpage fieldset input[type="checkbox"].checkbox-input').change(function(){
		var checkbox = jQuery(this);
		//console.log('Saved! ', currentFullPathURL);
		save(checkbox, currentFullPathURL);
	});

	/* END - CHECKBOX FILTERS on Class List page */

	// Start SORT FILTER
	// loop thru all options
	jQuery('.facets-facet > select > option').each(function(){
		if (getQuery('orderby') == this.value) {
			jQuery(this).attr('selected', true);
		}
	});
	// class list dropdown
	jQuery('.facets-facet > select').change(function(){
		if (this.value) {
			var url = currentFullPathURL + '?orderby=' + this.value + (getQuery('category') != null ? "&category=" + getQuery('category') : '');
			//var url = currentFullPathURL + '?orderby=' + this.value + getAllUrlParams(currentFullPathURL);
			//console.log(getUrlParams());
			//console.log(getAllUrlParams());
			//console.log(currentFullPathURL);
			//if(getQuery('mock-sort') == "true") {
			//	console.log(url);
			//}
			window.location.href = url;
			//window.location.href = url;
		}
	});
	// End SORTER
});

//
jQuery(window).on('load',function() {
	// even out column heights on gift card page, etc.
	equalheight('.grid .grid-col > .card > .card-bd');
	equalheight('.bg_sand .grid .grid-col > .u-alignCenter > p');
});

//
jQuery(window).on('resize',function() {
	// even out column heights on gift card page, etc.
	equalheight('.grid .grid-col > .card > .card-bd');
	equalheight('.bg_sand .grid .grid-col > .u-alignCenter > p');
}).trigger('resize');

// Main Calendar Functionality
var convertDate = function(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};
jQuery(function(){
	// Main Calendar FUNCTIONS
	function populateNumbersInTopBar(d){
		var currentDate = (new Date(d)).getDate();
		var day = (new Date(d)).getDay();
		//var day = (new Date(d)).getUTCDay();
		d = d - (new Date(d)).getDay()*60*60*24*1000;
		//d = d - (new Date(d)).getUTCDay()*60*60*24*1000;
		for(i=0; i < jQuery(".schedule.u-vr6x .schedule-weekNav a").length; i++){
			var tempVal = jQuery('.schedule.u-vr6x .schedule-weekNav a abbr')[i];
			var newDate = new Date(d + i*60*60*24*1000);
			dateOfTheRange = newDate.getDate();
            console.log(dateOfTheRange);
			if (i == 0){ dateRange = transforFromObjectDate(newDate); firstDate = newDate }
			if (i == 6){ dateRange = dateRange + " to " + transforFromObjectDate(newDate); lastDate = newDate }
			var textnode = document.createTextNode(' ' + dateOfTheRange);
			jQuery('.schedule-weekNav-item').removeClass('u-isActive');
			jQuery('.schedule.u-vr6x .schedule-weekNav a')[i].text = "";
			jQuery('.schedule.u-vr6x .schedule-weekNav a')[i].appendChild(tempVal);
			jQuery('.schedule.u-vr6x .schedule-weekNav a')[i].appendChild(textnode);
			jQuery(jQuery('.schedule.u-vr6x .schedule-weekNav a')[day]).parent().addClass('u-isActive');
		}
	}
	function displayEvents(currentDate) { // currentDate as number
        var dateForClasses = convertDate(currentDate)
		//console.log("Current Day: " + dateForClasses);
        jQuery('.schedule-list-item').each(function() {
			var startDate = transforToObjectDate(jQuery(this).attr('data-start-date'));
			var endDate = transforToObjectDate(jQuery(this).attr('data-end-date'));
			var arrayOfDays = jQuery(this).attr('data-days-of-week').split(' ');
			var frequency = jQuery(this).attr('data-frequency');

			if (checkIfWithinRange(currentDate, startDate, endDate, frequency, arrayOfDays)) {
				jQuery(this).css('display', 'flex');
                jQuery(this).attr('data-date-for-classes', dateForClasses);
                //console.log(jQuery(this).find('a'));
			} else {
				jQuery(this).css('display', 'none');
			}
		});
	}
	function checkIfWithinRange(currentDate, startDate, endDate, frequency, arrayOfDays) {
		//console.log(transforFromObjectDate(new Date(currentDate)));
		if (currentDate >= startDate) {
			if (currentDate <= endDate) {
				if((frequency == "none") && (startDate <= currentDate) && (startDate + 60*60*24*1000) > currentDate) {
					//console.log('startDate ' + startDate);
					//console.log('today ' + Date.parse(new Date()));
					return true;
				} else if (frequency == "daily") {
					return true;
				} else if (frequency == "weekly") {
					var dayOfTheWeek = (new Date(currentDate)).getDay().toString();
					if (jQuery.inArray(dayOfTheWeek , arrayOfDays) != -1) {
						return true;
					}
				}
			}
		}
		return false;
	}
	function transforToObjectDate(d) { // date in yyyy-mm-dd format
		d = Date.parse(d.replace(/-/g, "/"));
		return d;
	}
	function transforFromObjectDate(d) { // date as Object
		var day = d.getDate();
		day = day < 10 ? "0" + day : "" + day;
		var month = d.getMonth() + 1;
		month = month < 10 ? "0" + month : "" + month;
		var finalDay =  d.getFullYear() + "-" + month + "-" + day;
		return finalDay;
	}
	// ########################
	/*function getSunday(d) {
		var day = d.getDay() || 7;
		if( day !== 1 )
			d.setHours(-24 * (day - 1));
		return d;
	}
	console.log(getSunday(new Date())); // Mon Nov 08 2010
	function getSaturday(d) {
		d = new Date(d);
		var day = d.getDay(),
		diff = d.getDate() + day + (day == 0 ? -7 : 1); // adjust when day is sunday
		return new Date(d.setDate(diff));
	}
	console.log(getSaturday(new Date())); // Mon Nov 08 2010*/
	// ########################

	/* main calendar page JS */
	if(jQuery('#list-wrapper').length) {
		window.date = Date.parse(new Date());
		//console.log(window.date);
		window.firstDate = flatPickrOK.selectedDates[0];
		window.lastDate  = flatPickrOK.selectedDates[1];
		var dateRange = transforFromObjectDate(firstDate) + " to " + transforFromObjectDate(lastDate);
		displayEvents(window.date);
		populateNumbersInTopBar(window.date);

		flatPickrOK.set("onChange", [function(d) {
			//console.log(d);
			//flatPickrOK.setDate(dateRange);
			var currentDate = window.date;
			if(jQuery.isEmptyObject(d)){
				f = window.firstDate;
				l = window.lastDate;
				//console.log('empty ' + d);
				//console.log("currentDate - " + currentDate);
				//console.log("firstDate - " + f);
				//console.log("lastDate - " + l);
			} else {
				//console.log('not empty ' + d);
				for(i = 0 ; i < d.length; i++){
					if (currentDate != firstDate) {
						if(Date.parse(d[i]) != Date.parse(f) && Date.parse(d[i]) != Date.parse(l)){
							currentDate = d[i]; //console.log("Got it"); console.log("currentDate - " + currentDate); console.log("firstDate - " + f); console.log("lastDate - " + l);
						}
					}
					//console.log(i + " iteration");
					//console.log("currentDate - " + currentDate);
					//console.log("firstDate - " + f);
					//console.log("lastDate - " + l);
				}
				dateRange = transforFromObjectDate(f) + " to " + transforFromObjectDate(l);
				window.firstDate = f;
				window.lastDate = l;
				window.date = currentDate;
				populateNumbersInTopBar(Date.parse(currentDate));
				flatPickrOK.setDate(dateRange);
			}
			populateNumbersInTopBar(Date.parse(currentDate));
            
			//console.log("1 - " + currentDate); console.log("2 - " + f); console.log("3 - " + l);
			//populateNumbersInTopBar(Date.parse(currentDate);

			displayEvents(Date.parse(currentDate));
			dateRange = transforFromObjectDate(f) + " to " + transforFromObjectDate(l);
			//console.log(dateRange);
		}]);
        
		jQuery('.container').on('click', '.schedule.u-vr6x .schedule-weekNav a', function(e) {
			e.preventDefault();
			jQuery('.schedule-weekNav-item').removeClass('u-isActive');
			jQuery(this).parent().addClass('u-isActive');

			var year = (new Date(window.date)).getFullYear();
			var month = (new Date(window.date)).getMonth() + 1;
			var day = jQuery(this).text().split(' ')[1];

			date = year + '-' + (month < 10 ? "0" + month : month) + '-' + (day = day < 10 ? "0" + day : day);
			//console.log(date);
			displayEvents(transforToObjectDate(date));
		});
	}
});

/*
https://www.google.com/webhp?q=sticky%20sidebar
http://webdesign.tutsplus.com/tutorials/sticky-positioning-with-nothing-but-css--cms-24042
http://codepen.io/tutsplus/full/pJRRKW/
https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/stickyfill.js
https://raw.githubusercontent.com/wilddeer/stickyfill/master/dist/stickyfill.js
https://www.google.com/webhp?q=stickyfill%20break%20without%20jquery
http://thenewcode.com/1052/position-sticky-scroll-to-top-then-fixed-in-pure-CSS
https://codepen.io/dudleystorey/pen/yNxPRy
https://github.com/wilddeer/stickyfill/issues/10
https://codepen.io/wilddeer/pen/GZVPMK
https://codepen.io/gwydionismyhero/pen/zGyyjq
https://codepen.io/conwaydev/pres/VevYvy

http://leafo.net/sticky-kit/
*/

/**
@license Sticky-kit v1.1.3 | MIT | Leaf Corcoran 2015 | http://leafo.net
 */

(function() {
	var $, win;
	$ = window.jQuery;
	win = $(window);

	$.fn.stick_in_parent = function(opts) {
		var doc, elm, enable_bottoming, fn, i, inner_scrolling, len, manual_spacer, offset_top, outer_width, parent_selector, recalc_every, sticky_class;
		if (opts == null) {
			opts = {};
		}
		sticky_class = opts.sticky_class, inner_scrolling = opts.inner_scrolling, recalc_every = opts.recalc_every, parent_selector = opts.parent, offset_top = opts.offset_top, manual_spacer = opts.spacer, enable_bottoming = opts.bottoming;
		if (offset_top == null) {
			offset_top = 0;
		}
		if (parent_selector == null) {
			parent_selector = void 0;
		}
		if (inner_scrolling == null) {
			inner_scrolling = true;
		}
		if (sticky_class == null) {
			sticky_class = "is_stuck";
		}
		doc = $(document);
		if (enable_bottoming == null) {
			enable_bottoming = true;
		}
		outer_width = function(el) {
			var _el, computed, w;
			if (window.getComputedStyle) {
				_el = el[0];
				computed = window.getComputedStyle(el[0]);
				w = parseFloat(computed.getPropertyValue("width")) + parseFloat(computed.getPropertyValue("margin-left")) + parseFloat(computed.getPropertyValue("margin-right"));
				if (computed.getPropertyValue("box-sizing") !== "border-box") {
					w += parseFloat(computed.getPropertyValue("border-left-width")) + parseFloat(computed.getPropertyValue("border-right-width")) + parseFloat(computed.getPropertyValue("padding-left")) + parseFloat(computed.getPropertyValue("padding-right"));
				}
				return w;
			} else {
				return el.outerWidth(true);
			}
		};
		fn = function(elm, padding_bottom, parent_top, parent_height, top, height, el_float, detached) {
			var bottomed, detach, fixed, last_pos, last_scroll_height, offset, parent, recalc, recalc_and_tick, recalc_counter, spacer, tick;
			if (elm.data("sticky_kit")) {
				return;
			}
			elm.data("sticky_kit", true);
			last_scroll_height = doc.height();
			parent = elm.parent();
			if (parent_selector != null) {
				parent = parent.closest(parent_selector);
			}
			if (!parent.length) {
				throw "failed to find stick parent";
			}
			fixed = false;
			bottomed = false;
			spacer = manual_spacer != null ? manual_spacer && elm.closest(manual_spacer) : $("<div />");
			if (spacer) {
				spacer.css('position', elm.css('position'));
			}
			recalc = function() {
				var border_top, padding_top, restore;
				if (detached) {
					return;
				}
				last_scroll_height = doc.height();
				border_top = parseInt(parent.css("border-top-width"), 10);
				padding_top = parseInt(parent.css("padding-top"), 10);
				padding_bottom = parseInt(parent.css("padding-bottom"), 10);
				parent_top = parent.offset().top + border_top + padding_top;
				parent_height = parent.height();
				if (fixed) {
					fixed = false;
					bottomed = false;
					if (manual_spacer == null) {
						elm.insertAfter(spacer);
						spacer.detach();
					}
					elm.css({
						position: "",
						top: "",
						width: "",
						bottom: ""
					}).removeClass(sticky_class);
					restore = true;
				}
				top = elm.offset().top - (parseInt(elm.css("margin-top"), 10) || 0) - offset_top;
				height = elm.outerHeight(true);
				el_float = elm.css("float");
				if (spacer) {
					spacer.css({
						width: outer_width(elm),
						height: height,
						display: elm.css("display"),
						"vertical-align": elm.css("vertical-align"),
						"float": el_float
					});
				}
				if (restore) {
					return tick();
				}
			};
			recalc();
			if (height === parent_height) {
				return;
			}
			last_pos = void 0;
			offset = offset_top;
			recalc_counter = recalc_every;
			tick = function() {
				var css, delta, recalced, scroll, will_bottom, win_height;
				if (detached) {
					return;
				}
				recalced = false;
				if (recalc_counter != null) {
					recalc_counter -= 1;
					if (recalc_counter <= 0) {
						recalc_counter = recalc_every;
						recalc();
						recalced = true;
					}
				}
				if (!recalced && doc.height() !== last_scroll_height) {
					recalc();
					recalced = true;
				}
				scroll = win.scrollTop();
				if (last_pos != null) {
					delta = scroll - last_pos;
				}
				last_pos = scroll;
				if (fixed) {
					if (enable_bottoming) {
						will_bottom = scroll + height + offset > parent_height + parent_top;
						if (bottomed && !will_bottom) {
							bottomed = false;
							elm.css({
								position: "fixed",
								bottom: "",
								top: offset
							}).trigger("sticky_kit:unbottom");
						}
					}
					if (scroll < top) {
						fixed = false;
						offset = offset_top;
						if (manual_spacer == null) {
							if (el_float === "left" || el_float === "right") {
								elm.insertAfter(spacer);
							}
							spacer.detach();
						}
						css = {
							position: "",
							width: "",
							top: ""
						};
						elm.css(css).removeClass(sticky_class).trigger("sticky_kit:unstick");
					}
					if (inner_scrolling) {
						win_height = win.height();
						if (height + offset_top > win_height) {
							if (!bottomed) {
								offset -= delta;
								offset = Math.max(win_height - height, offset);
								offset = Math.min(offset_top, offset);
								if (fixed) {
									elm.css({
										top: offset + "px"
									});
								}
							}
						}
					}
				} else {
					if (scroll > top) {
						fixed = true;
						css = {
							position: "fixed",
							top: offset
						};
						css.width = elm.css("box-sizing") === "border-box" ? elm.outerWidth() + "px" : elm.width() + "px";
						elm.css(css).addClass(sticky_class);
						if (manual_spacer == null) {
							elm.after(spacer);
							if (el_float === "left" || el_float === "right") {
								spacer.append(elm);
							}
						}
						elm.trigger("sticky_kit:stick");
					}
				}
				if (fixed && enable_bottoming) {
					if (will_bottom == null) {
						will_bottom = scroll + height + offset > parent_height + parent_top;
					}
					if (!bottomed && will_bottom) {
						bottomed = true;
						if (parent.css("position") === "static") {
							parent.css({
								position: "relative"
							});
						}
						return elm.css({
							position: "absolute",
							bottom: padding_bottom,
							top: "auto"
						}).trigger("sticky_kit:bottom");
					}
				}
			};
			recalc_and_tick = function() {
				recalc();
				return tick();
			};
			detach = function() {
				detached = true;
				win.off("touchmove", tick);
				win.off("scroll", tick);
				win.off("resize", recalc_and_tick);
				$(document.body).off("sticky_kit:recalc", recalc_and_tick);
				elm.off("sticky_kit:detach", detach);
				elm.removeData("sticky_kit");
				elm.css({
					position: "",
					bottom: "",
					top: "",
					width: ""
				});
				parent.position("position", "");
				if (fixed) {
					if (manual_spacer == null) {
						if (el_float === "left" || el_float === "right") {
							elm.insertAfter(spacer);
						}
						spacer.remove();
					}
					return elm.removeClass(sticky_class);
				}
			};
			win.on("touchmove", tick);
			win.on("scroll", tick);
			win.on("resize", recalc_and_tick);
			$(document.body).on("sticky_kit:recalc", recalc_and_tick);
			elm.on("sticky_kit:detach", detach);
			return setTimeout(tick, 0);
		};
		for (i = 0, len = this.length; i < len; i++) {
			elm = this[i];
			fn($(elm));
		}
		return this;
	};

}).call(this);

jQuery(window).on('load',function() {
	//jQuery(function(){
	var header = jQuery('header');
	var parent = '#list-wrapper';
	//var parent = jQuery('#list-wrapper').get(0);
	var sidebar = jQuery('#list-wrapper .calendar-sidebar');
	//var sidebar = jQuery('#list-wrapper > .grid-col.calendar-sidebar');
	//console.log(sidebar.html());
	//sidebar.stick_in_parent();

	if(sidebar.length){
		//console.log(sidebar[0].getBoundingClientRect().width);

		sidebar.stick_in_parent({
			parent: parent,
			offset_top: header.outerHeight() + 20, // header.outerHeight() - parseInt(parent.css('padding-top')),
			//bottoming: false,
		})
		.on("sticky_kit:bottom", function(e) {
			//console.log("has stuck!", e.target);
			jQuery(e.target).parent(':not([data-sticky_parent])').css('position','static');
		})
		.on("sticky_kit:unbottom", function(e) {
			//console.log("has stuck!", e.target);
			jQuery(e.target).parent(':not([data-sticky_parent])').css('position','relative');
		});
		// apply adjustment
		jQuery(window).on("resize", (function(_this) {
			//console.log(getViewport());
			if(getViewport() >= 1025) {
				sidebar.trigger("sticky_kit:recalc");
			} else {
				sidebar.trigger("sticky_kit:detach");
			}
		})(this));

	}
});
