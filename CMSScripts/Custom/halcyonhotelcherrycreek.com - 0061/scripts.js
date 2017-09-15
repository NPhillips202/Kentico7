/*
====================================================================================================
@name			halcyonhotelcherrycreek.com - scripts.js
@version		1.0.0
====================================================================================================
*/

/***************/
/** Functions **/
/***************/
// Set Viewport
var viewport = function() {
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;	
    return x;
};

// Get CurrentScroll
var getCurrentScroll = function() {
	return window.pageYOffset || document.documentElement.scrollTop;
};

/***************/
/** BEGIN OF DOC.READY FUNCTION **/
/***************/
jQuery(function() {
	
	//
	var el = jQuery('input[type=text], textarea');
	el.focus(function(e) {
		if (e.target.value == e.target.defaultValue)
			e.target.value = '';
	});
	el.blur(function(e) {
		if (e.target.value == '')
			e.target.value = e.target.defaultValue;
	});
	
});
