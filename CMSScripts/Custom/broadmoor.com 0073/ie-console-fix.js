/**
 * Protect window.console method calls, e.g. console is not defined on IE
 * unless dev tools are open, and IE doesn't define console.debug
*/
(function() {
	if (!window.console) {
		window.console = {};
	}
	// union of Chrome, FF, IE, and Safari console methods
	var m = ["log", "info", "warn", "error", "debug", "trace", "dir", "group", "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd", "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"];
	// define undefined methods as noops to prevent errors
	for (var i = 0; i < m.length; i++) {
		if (!window.console[m[i]]) {
			window.console[m[i]] = function() {};
		}
	}
})();


/**
 * Implementation of console.time for IE8
 */
// console.time implementation for IE
if(window.console && typeof(window.console.time) == "undefined") {
	console.time = function(name, reset){
		if(!name) { return; }
		var time = new Date().getTime();
		if(!console.timeCounters) { console.timeCounters = {}; }
		var key = "KEY" + name.toString();
		if(!reset && console.timeCounters[key]) { return; }
			console.timeCounters[key] = time;
	};
	console.timeEnd = function(name){
		var time = new Date().getTime();
		if(!console.timeCounters) { return; }
		var key = "KEY" + name.toString();
		var timeCounter = console.timeCounters[key];
		var diff;
		if(timeCounter) {
			diff = time - timeCounter;
			var label = name + ": " + diff + "ms";
			console.info(label);
			delete console.timeCounters[key];
		}
		return diff;
	};
}