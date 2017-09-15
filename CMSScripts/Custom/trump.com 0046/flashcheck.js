<!--
// initialize a variable to test for JavaScript 1.1.
// which is necessary for the window.location.replace method
var javascriptVersion1_1 = false;
// -->


<!--
javascriptVersion1_1 = true;
// -->


<!--

// initialize global variables
var detectableWithVB = false;
var pluginFound = false;


function goURL(daURL) {
    // if the browser can do it, use replace to preserve back button
    if(javascriptVersion1_1) {
	window.location.replace(daURL);
    } else {
	window.location = daURL;
    }
    return;
}

function redirectCheck(pluginFound, redirectURL, redirectIfFound) {
    // check for redirection
    if( redirectURL && ((pluginFound && redirectIfFound) || 
	(!pluginFound && !redirectIfFound)) ) {
	// go away
	goURL(redirectURL);
	return pluginFound;
    } else {
	// stay here and return result of plugin detection
	return pluginFound;
    }	
}

function canDetectPlugins() {
    if( detectableWithVB || (navigator.plugins && navigator.plugins.length > 0) ) {
	return true;
    } else {
	return false;
    }
}

function detectFlash(redirectURL, redirectIfFound) {
    pluginFound = detectPlugin('Shockwave','Flash'); 
    // if not found, try to detect with VisualBasic
    if(!pluginFound && detectableWithVB) {
	pluginFound = detectActiveXControl('ShockwaveFlash.ShockwaveFlash.7');
    }
    // check for redirection
    return redirectCheck(pluginFound, redirectURL, redirectIfFound);
}

function detectDirector(redirectURL, redirectIfFound) { 
    pluginFound = detectPlugin('Shockwave','Director'); 
    // if not found, try to detect with VisualBasic
    if(!pluginFound && detectableWithVB) {
	pluginFound = detectActiveXControl('SWCtl.SWCtl.1');
    }
    // check for redirection
    return redirectCheck(pluginFound, redirectURL, redirectIfFound);
}

function detectQuickTime(redirectURL, redirectIfFound) {
    pluginFound = detectPlugin('QuickTime');
    // if not found, try to detect with VisualBasic
    if(!pluginFound && detectableWithVB) {
	pluginFound = detectQuickTimeActiveXControl();
    }
    return redirectCheck(pluginFound, redirectURL, redirectIfFound);
}

function detectReal(redirectURL, redirectIfFound) {
    pluginFound = detectPlugin('RealPlayer');
    // if not found, try to detect with VisualBasic
    if(!pluginFound && detectableWithVB) {
	pluginFound = (detectActiveXControl('rmocx.RealPlayer G2 Control') ||
		       detectActiveXControl('RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)') ||
		       detectActiveXControl('RealVideo.RealVideo(tm) ActiveX Control (32-bit)'));
    }	
    return redirectCheck(pluginFound, redirectURL, redirectIfFound);
}

function detectWindowsMedia(redirectURL, redirectIfFound) {
    pluginFound = detectPlugin('Windows Media');
    // if not found, try to detect with VisualBasic
    if(!pluginFound && detectableWithVB) {
	pluginFound = detectActiveXControl('MediaPlayer.MediaPlayer.1');
    }
    return redirectCheck(pluginFound, redirectURL, redirectIfFound);
}

function detectPlugin() {
    // allow for multiple checks in a single pass
    var daPlugins = detectPlugin.arguments;
    // consider pluginFound to be false until proven true
    var pluginFound = false;
    // if plugins array is there and not fake
    if (navigator.plugins && navigator.plugins.length > 0) {
	var pluginsArrayLength = navigator.plugins.length;
	// for each plugin...
	for (pluginsArrayCounter=0; pluginsArrayCounter < pluginsArrayLength; pluginsArrayCounter++ ) {
	    // loop through all desired names and check each against the current plugin name
	    var numFound = 0;
	    for(namesCounter=0; namesCounter < daPlugins.length; namesCounter++) {
		// if desired plugin name is found in either plugin name or description
		if( (navigator.plugins[pluginsArrayCounter].name.indexOf(daPlugins[namesCounter]) >= 0) || 
		    (navigator.plugins[pluginsArrayCounter].description.indexOf(daPlugins[namesCounter]) >= 0) ) {
		    // this name was found
		    numFound++;
		}   
	    }
	    // now that we have checked all the required names against this one plugin,
	    // if the number we found matches the total number provided then we were successful
	    if(numFound == daPlugins.length) {
		pluginFound = true;
		// if we've found the plugin, we can stop looking through at the rest of the plugins
		break;
	    }
	}
    }
    return pluginFound;
} // detectPlugin

// Here we write out the VBScript block for MSIE Windows
if ((navigator.userAgent.indexOf('MSIE') != -1) && (navigator.userAgent.indexOf('Win') != -1)) {
	document.write('<SCR' + 'IPT LANGUAGE=VBScript\> \n');

    document.write('\'do a one-time test for a version of VBScript that can handle this code \n');
    document.write('detectableWithVB = False \n');
    document.write('If ScriptEngineMajorVersion >= 2 then \n');
    document.write('  detectableWithVB = True \n');
    document.write('End If \n');

    document.write('\'this next function will detect most plugins \n');
    document.write('Function detectActiveXControl(activeXControlName) \n');
    document.write('  on error resume next \n');
    document.write('  detectActiveXControl = False \n');
    document.write('  If detectableWithVB Then \n');
    document.write('     detectActiveXControl = IsObject(CreateObject(activeXControlName)) \n');
    document.write('  End If \n');
    document.write('End Function \n');

    document.write('\'and the following function handles QuickTime \n');
    document.write('Function detectQuickTimeActiveXControl() \n');
    document.write('  on error resume next \n');
    document.write('  detectQuickTimeActiveXControl = False \n');
    document.write('  If detectableWithVB Then \n');
    document.write('    detectQuickTimeActiveXControl = False \n');
    document.write('    hasQuickTimeChecker = false \n');
    document.write('    Set hasQuickTimeChecker = CreateObject("QuickTimeCheckObject.QuickTimeCheck.1") \n');
    document.write('    If IsObject(hasQuickTimeChecker) Then \n');
    document.write('      If hasQuickTimeChecker.IsQuickTimeAvailable(0) Then \n');
    document.write('        detectQuickTimeActiveXControl = True \n');
    document.write('      End If \n');
    document.write('    End If \n');
    document.write('  End If \n');
    document.write('End Function \n');

    document.write('</scr' + 'ipt> \n');
}
// -->

//document.write('<br><b>Can Detect Plugins:</b> ' + canDetectPlugins() + '<br><br>');

if(canDetectPlugins()) {
	if(!detectFlash()){
		window.location = 'default_.asp';
	}
	
}
