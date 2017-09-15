var flashvars = {};
	flashvars.skip = '';
var params = {};
	params.bgcolor = '000000';
	params.wmode = 'transparent';
	params.allowScriptAccess = 'always';

// Trump Books
var params_books = {};
	params_books.bgcolor = '000000';
	params_books.allowScriptAccess = 'always';
var attributes = {};
	attributes.id = 'TDC'
swfobject.embedSWF("_flash/TrumpMagazineStack3d.swf", "booksflashDiv", "595", "350", "9.0.0", "/swfobject/expressInstall.swf", flashvars, params_books, attributes);
// Hotel Collection Map
var flashvarsHCMap = {};
var paramsHCMap = {
	bgcolor: "000000",
	allowscriptaccess: "always"
};
var attributesHCMap = {
	id:"RealEstateMap",
	name: "interactiveMap",
	title: "TrumpMap"
};
swfobject.embedSWF("_flash/trumpHotels_interactiveMap.swf", "mapDivTrumpHCMap", "893", "492", "9.0.0", "/swfobject/expressInstall.swf",flashvarsHCMap,paramsHCMap,attributesHCMap);
// Trump Regular Map
var flashvarsMapTrumpMap = {};
var paramsTrumpMap = {
	bgcolor: "000000",
	allowscriptaccess: "always"
};
var attributesTrumpMap = {
	id:"TrumpMap",
	name: "TrumpMap",
	title: "TrumpMap"
};
swfobject.embedSWF("_flash/interactiveMap.swf", "mapDivTrumpMap", "893", "492", "9.0.0", "/swfobject/expressInstall.swf",flashvarsMapTrumpMap,paramsTrumpMap,attributesTrumpMap);

//Function called from home page flash booking mask.
	function popup(url,swfId) 
	{
	 var winName = Math.round(9999*Math.random()) + new Date().getTime();
	 var width  = screen.width;
	 var height = screen.height;
	 var left   = (screen.width  - width)/2;
	 var top    = (screen.height - height)/2;
	 
	 var params = 'width='+width+', height='+height;
	 params += ', top='+top+', left='+left;
	 params += ', directories=no';
	 params += ', location=yes';
	 params += ', menubar=yes';
	 params += ', resizable=yes';
	 params += ', scrollbars=yes';
	 params += ', status=no';
	 params += ', toolbar=no';
	 
        var winNew = window.open(url,winName, params);

        if(!winNew) {
            getSwf(swfId).openWindowFromSwf(url);
        }
        else {
            winNew.focus();
        }
	}
	//Function used by flash booking mask links
	function getSwf(id) {
		
        if (navigator.appName.indexOf("Microsoft") != -1) {
            return window[id];
        } 
        else {
            return document[id];
        }
    }
	//Function used when you close an ajax window
	function flashPlay() {
		getSwf('TDC').setDefaultPerformance();
	}