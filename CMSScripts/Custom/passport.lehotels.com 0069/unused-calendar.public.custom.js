!function(factory) {
  if ("function" == typeof define && define.amd) {
    define(["jquery", "moment"], factory);
  } else {
    if ("object" == typeof exports) {
      factory(require("jquery"), require("moment"), require("google.maps.Geocoder"));
    } else {
      if ("undefined" == typeof google.maps.Geocoder) {
        throw "CIFullCalendar requires Gmaps to be loaded first";
      }
      if ("undefined" == typeof jQuery) {
        throw "CIFullCalendar requires jQuery to be loaded first";
      }
      if ("undefined" == typeof moment) {
        throw "CIFullCalendar requires Moment.js to be loaded first";
      }
      factory(jQuery, moment);
    }
  }
}(function($, moment) {
  /**
   * @return {undefined}
   */
  function flush() {
    var i;
    moment.locale(lang);
    moment.tz(d).format(html);
    /** @type {number} */
    i = 0;
    for (;i < codeSegments.length;i++) {
      codeSegments[i].render();
    }
  }
  /**
   * @return {undefined}
   */
  function fn() {
    var doc = moment.tz(d);
    /** @type {number} */
    var r = 6 * doc.format(v);
    /** @type {number} */
    var o = 6 * doc.format(title) + r / 60;
    /** @type {number} */
    var l = doc.format(i) % 12 / 12 * 360 + 90 + o / 12;
    flush();
    var m = doc.format(html);
    var camelKey = doc.format(key);
    var buf = doc.format(_);
    $("#hour").css("transform", "rotate(" + l + "deg)");
    $("#minute").css("transform", "rotate(" + o + "deg)");
    $("#second").css("transform", "rotate(" + r + "deg)");
    $("#ampm").text(camelKey);
    $("#date").text(m);
    $("#timezone").text(d);
    $("#digiclock").text(buf);
  }
  /**
   * @return {undefined}
   */
  function after() {
    $("#calendar").fullCalendar("refetchEvents");
    setTimeout(after, 6E4);
  }
  /**
   * @return {undefined}
   */
  function run() {
    fn();
    setTimeout(run, 1E3);
  }
  /**
   * @param {?} object
   * @return {?}
   */
  function each(object) {
    /** @type {string} */
    var type = typeof object;
    return "undefined" === type || ("object" === type ? null === object || 0 === Object.keys(object).length : [false, 0, "", "0"].indexOf(object) >= 0);
  }
  /**
   * @param {string} node
   * @param {string} y
   * @param {?} keys
   * @return {undefined}
   */
  function init(node, y, keys) {
    var position = new google.maps.LatLng(node, y);
    if (each(keys)) {
      $("#gmapsCanvas").attr("class", "mapHidden");
      $("#markers_ulat").attr("class", "mapHidden");
      $("#markers_ulng").attr("class", "mapHidden");
    } else {
      $("#gmapsCanvas").attr("class", "map");
      $("#markers_ulat").attr("class", "map");
      $("#markers_ulng").attr("class", "map");
      var mapOptions = {
        center : position,
        zoomControl : true,
        zoom : 19,
        mapTypeId : google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("gmapsCanvas"), mapOptions);
      var marker = (new google.maps.InfoWindow, new google.maps.Marker({
        position : position,
        map : map,
        draggable : false
      }));
      google.maps.event.addListener(map, "idle", function() {
        google.maps.event.trigger(map, "resize");
        map.setZoom(map.getZoom() - 1);
        map.setZoom(map.getZoom() + 1);
      });
      google.maps.event.addListenerOnce(map, "center_changed", function() {
        window.setTimeout(function() {
          map.panTo(marker.getPosition());
        }, 500);
      });
    }
  }
  /**
   * @param {Object} data
   * @return {undefined}
   */
  function callback(data) {
    if (data.lengthComputable) {
      $("progress").attr({
        value : data.loaded,
        max : data.total
      });
    }
  }
  /**
   * @param {string} url
   * @param {Function} callback
   * @return {?}
   */
  function send(url, callback) {
    /**
     * @return {undefined}
     */
    function process() {
      success();
    }
    /**
     * @return {undefined}
     */
    function success() {
      if (4 === req.readyState) {
        $("#loading").show();
        callback(4 === req.readyState);
        if (200 === req.status || (304 === req.status || 1223 === req.status)) {
          $("#calendar").fullCalendar("refetchEvents");
        }
      } else {
        $("#loading").hide();
      }
    }
    /**
     * @return {?}
     */
    function send() {
      var result = void 0;
      if (req.response ? result = req.response : "text" !== req.responseType && req.responseType || (result = req.responseText || req.responseXML), w) {
        try {
          /** @type {*} */
          result = JSON.parse(result);
        } catch (t) {
        }
      }
      return result;
    }
    /**
     * @param {Error} err
     * @return {undefined}
     */
    function done(err) {
      clearTimeout(tref);
      if (!(err instanceof Error)) {
        /** @type {Error} */
        err = new Error("" + (err || "Unknown Error"));
      }
      /** @type {number} */
      err.statusCode = 0;
      callback(err, options);
    }
    /**
     * @param {string} query
     * @return {?}
     */
    function fetch(query) {
      var headers = req.headers;
      if (!query) {
        return headers;
      }
      var codeSegments = query.split("\r\n");
      /** @type {number} */
      var i = 0;
      for (;i < codeSegments.length;i++) {
        var data = codeSegments[i];
        var nextStart = data.indexOf(": ");
        if (nextStart > 0) {
          var headerName = data.substring(0, nextStart);
          data.substring(nextStart, 2);
          if (!req.setRequestHeader) {
            throw new Error("Headers cannot be set on object");
          }
          for (headerName in headers) {
            if (headers.hasOwnProperty(headerName)) {
              req.setRequestHeader(headerName, headers[headerName]);
            }
          }
        }
      }
      return headers;
    }
    /**
     * @return {undefined}
     */
    function next() {
      if (!f) {
        var statusCode;
        clearTimeout(tref);
        statusCode = void 0 === req.status ? 200 : 1223 === req.status ? 204 : req.status;
        var data = options;
        /** @type {null} */
        var err = null;
        if (0 !== statusCode) {
          data = {
            body : send(),
            statusCode : statusCode,
            method : method,
            headers : {},
            url : url,
            rawRequest : req
          };
          if (req.getAllResponseHeaders) {
            data.headers = fetch(req.getAllResponseHeaders());
          }
        } else {
          /** @type {Error} */
          err = new Error("Internal Error");
        }
        callback(err, data.body);
      }
    }
    var req;
    if ("undefined" == typeof callback) {
      try {
        /** @type {XMLHttpRequest} */
        req = new XMLHttpRequest;
      } catch (c) {
        throw new Error("argument missing");
      }
    }
    if (window.XMLHttpRequest || (window.document || window.ActiveXObject)) {
      /** @type {XMLHttpRequest} */
      req = new XMLHttpRequest;
    }
    var f;
    var tref;
    var options = {
      body : void 0,
      headers : {},
      statusCode : 0,
      method : method,
      url : url,
      rawRequest : req
    };
    /** @type {string} */
    var method = req.method = "GET";
    var file = send();
    var headers = req.headers;
    /** @type {boolean} */
    var w = true;
    /** @type {number} */
    var backoff = 0;
    return w && ("GET" !== method && ("HEAD" !== method && (headers["content-type"] || (headers["Content-Type"] || ((headers["Content-Type"] = "application/json") || ((headers["Access-Control-Allow-Methods"] = "GET") || (headers["Access-Control-Allow-Origin"] = "*")))), file = JSON.stringify()))), req.onreadystatechange = process, req.onload = next, req.onerror = done, req.onprogress = success, req.ontimeout =
    done, req.open(method, url, true), backoff > 0 && (tref = setTimeout(function() {
      /** @type {boolean} */
      f = true;
      req.abort("timeout");
      /** @type {Error} */
      var err = new Error("timeout");
      /** @type {string} */
      err.code = "ETIMEDOUT";
      done(err);
    }, backoff)), req.send(file), req;
  }
  $.cifullCalendar = {
    version : "3.1.7.1"
  };
  /** @type {function (Object): undefined} */
  var Panel = $.cifullCalendar = function(options) {
    /** @type {Object} */
    $.options = options;
    $.getRequest();
    $.init();
  };
  Panel.DEFAULTS = {
    locale : void 0
  };
  /** @type {Array} */
  Panel.LOCALES = [];
  /**
   * @return {undefined}
   */
  Panel.prototype.init = function() {
    $.businessDOW();
    $.timedUpdate();
  };
  /**
   * @param {string} arg
   * @return {?}
   */
  $.fn.cifullCalendar = function(arg) {
    var exports;
    /** @type {Array.<?>} */
    var args = Array.prototype.slice.call(arguments, 1);
    return this.each(function() {
      var self = $(this);
      var item = self.data("calendar");
      $.extend({}, Panel.DEFAULTS, self.data(), "object" == typeof arg && arg);
      if ("string" == typeof arg) {
        if ($.inArray(arg) < 0) {
          throw new Error("Unknown method: " + arg);
        }
        if (!item) {
          return;
        }
        exports = item[arg].apply(item, args);
        if ("destroy" === arg) {
          self.removeData("calendar");
        }
      }
    }), "undefined" == typeof exports ? this : exports;
  };
  $.fn.cifullCalendar.defaults = Panel.DEFAULTS;
  /** @type {Array} */
  $.fn.cifullCalendar.locales = Panel.LOCALES;
  var c = (new google.maps.Geocoder, new google.maps.InfoWindow, new google.maps.LatLngBounds, $.extend(Panel.DEFAULTS, Panel.LOCALES.en));
  /** @type {Date} */
  var date = new Date;
  /** @type {Array} */
  var codeSegments = (date.getDate(), date.getSeconds(), date.getMinutes(), date.getHours(), date.getDay(), date.getMonth(), date.getFullYear(), []);
  /** @type {string} */
  var value = "YYYY-MM-DD HH:mm:ss";
  /** @type {string} */
  var query = "YYYYMMDD[T]HHmmss";
  /** @type {string} */
  var $match = "dddd, MMMM Do, h:mm:ss a";
  /** @type {string} */
  var normalized = "YYYY-MM-DD";
  /** @type {string} */
  var html = "MMM DD";
  /** @type {string} */
  var args = "HH:mm:ss";
  /** @type {string} */
  var gregorianCalendar = "h:mm:ss a";
  /** @type {string} */
  var axisFormat = "hh:mm a";
  /** @type {string} */
  var _ = "h:mm:ss";
  /** @type {string} */
  var i = "h";
  /** @type {string} */
  var title = "mm";
  /** @type {string} */
  var v = "ss";
  /** @type {string} */
  var key = "a";
  /** @type {RegExp} */
  var rclass = new RegExp("(.+)");
  /** @type {string} */
  var sep = window.location.pathname.replace(rclass, "./index.php/home/");
  /** @type {string} */
  var world = window.location.pathname.replace("index.php", "") + "assets/attachments/";
  /** @type {Array} */
  var user = new Array;
  /** @type {Array} */
  var walkers = new Array;
  /** @type {string} */
  user[0] = sep + "json";
  after();
  /** @type {number} */
  var className = 1.35;
  /** @type {string} */
  var error = "";
  /** @type {string} */
  var lang = "";
  /** @type {string} */
  var timezone = "";
  /** @type {string} */
  var d = "";
  /** @type {string} */
  var swap = "start";
  /** @type {string} */
  var temp = "end";
  /** @type {string} */
  var fragment = "";
  /** @type {string} */
  var EMPTY_STRING = "";
  /** @type {string} */
  var result = "";
  /** @type {string} */
  var text = "";
  /** @type {string} */
  var version = "";
  /** @type {string} */
  var conf = "";
  /** @type {string} */
  var buffer = "";
  /** @type {string} */
  var rep = "";
  /** @type {string} */
  var r2 = "";
  /** @type {string} */
  var r1 = "";
  /** @type {string} */
  var f = "";
  /** @type {string} */
  var lastTime = "";
  /** @type {string} */
  var obj = "";
  /** @type {string} */
  var options = "";
  /** @type {string} */
  var code = "";
  /** @type {string} */
  var choice = "";
  /** @type {string} */
  var stop = "";
  /** @type {string} */
  var command = "";
  /** @type {string} */
  var optsData = "";
  /** @type {string} */
  var ms = "";
  /** @type {string} */
  var line = "";
  /** @type {string} */
  var t = "";
  /** @type {string} */
  var msg = "00:30:00";
  /** @type {boolean} */
  var slotLabel = false;
  /** @type {number} */
  var $timeout = 0;
  /** @type {boolean} */
  var weekends = true;
  /** @type {boolean} */
  var fixedWeekCount = false;
  /** @type {boolean} */
  var editable = false;
  /** @type {boolean} */
  var weekNumbers = false;
  /** @type {boolean} */
  var eventLimit = true;
  /** @type {boolean} */
  var allDaySlot = true;
  /** @type {boolean} */
  var isRTL = false;
  /** @type {boolean} */
  var nowIndicator = true;
  /** @type {boolean} */
  var splittheme = false;
  /** @type {string} */
  var Ce = "Export to ICS";
  return send(sep + "get_timezone", function(deepDataAndEvents, dataAndEvents) {
    /** @type {(Object|number|string)} */
    timezone = dataAndEvents;
  }), send(sep + "get_timezone2", function(dataAndEvents, _d) {
    /** @type {(Object|number|string)} */
    d = _d;
    fragment = moment.tz(d).format(args);
  }), send(sep + "get_defaultview", function(dataAndEvents, err) {
    /** @type {string} */
    error = err;
  }), send(sep + "get_header_left", function(deepDataAndEvents, dataAndEvents) {
    /** @type {string} */
    EMPTY_STRING = dataAndEvents;
  }), send(sep + "get_header_center", function(dataAndEvents, subKey) {
    /** @type {(Object|number|string)} */
    result = subKey;
  }), send(sep + "get_header_right", function(dataAndEvents, textAlt) {
    /** @type {string} */
    text = textAlt;
  }), send(sep + "get_firstday", function(dataAndEvents, _$timeout_) {
    /** @type {number} */
    $timeout = _$timeout_;
  }), send(sep + "get_slotduration", function(dataAndEvents, type) {
    if (!each(type)) {
      /** @type {string} */
      msg = type;
    }
  }), send(sep + "get_slotlabeling", function(dataAndEvents, elems) {
    if (!each(elems)) {
      /** @type {boolean} */
      slotLabel = "true" == elems ? true : false;
    }
  }), send(sep + "get_aspectratio", function(dataAndEvents, c) {
    if (!each(c)) {
      className = c != className ? c : className;
    }
  }), send(sep + "get_hiddendays", function(dataAndEvents, elems) {
    if (!each(elems)) {
      version = elems.split(",");
      /** @type {number} */
      conf = Number(version[0]);
      /** @type {number} */
      buffer = Number(version[1]);
      /** @type {number} */
      rep = Number(version[2]);
      /** @type {number} */
      r2 = Number(version[3]);
      /** @type {number} */
      r1 = Number(version[4]);
      /** @type {number} */
      f = Number(version[5]);
      /** @type {number} */
      lastTime = Number(version[6]);
    }
  }), send(sep + "get_businessstart", function(dataAndEvents, keys) {
    if (!each(keys)) {
      /** @type {string} */
      obj = keys;
    }
  }), send(sep + "get_businessend", function(dataAndEvents, properties) {
    if (!each(properties)) {
      /** @type {(Object|number|string)} */
      options = properties;
    }
  }), send(sep + "get_businessdays", function(dataAndEvents, elems) {
    if (!each(elems)) {
      code = elems.split(",");
      /** @type {number} */
      choice = Number(code[0]);
      /** @type {number} */
      stop = Number(code[1]);
      /** @type {number} */
      command = Number(code[2]);
      /** @type {number} */
      optsData = Number(code[3]);
      /** @type {number} */
      ms = Number(code[4]);
      /** @type {number} */
      line = Number(code[5]);
      /** @type {number} */
      t = Number(code[6]);
    }
  }), send(sep + "get_weeknumbers", function(dataAndEvents, sValue) {
    /** @type {boolean} */
    weekNumbers = "true" == sValue ? true : false;
  }), send(sep + "get_eventlimit", function(dataAndEvents, sValue) {
    /** @type {boolean} */
    eventLimit = "true" == sValue ? true : false;
  }), send(sep + "get_alldayslot", function(dataAndEvents, sValue) {
    /** @type {boolean} */
    allDaySlot = "true" == sValue ? true : false;
  }), send(sep + "get_isrtl", function(dataAndEvents, sValue) {
    /** @type {boolean} */
    isRTL = "true" == sValue ? true : false;
  }), send(sep + "get_lang", function(dataAndEvents, language) {
    /** @type {string} */
    lang = language;
    moment.locale(lang);
    c = $.extend(Panel.DEFAULTS, Panel.LOCALES[lang]);
    run();
    $("#calendar").fullCalendar({
      defaultView : error,
      lang : lang,
      aspectRatio : className,
      defaultDate : date,
      timezone : timezone,
      now : timezone,
      weekNumberCalculation : timezone,
      scrollTime : fragment,
      nowIndicator : nowIndicator,
      header : {
        left : EMPTY_STRING,
        center : result,
        right : text
      },
      buttonIcons : {
        prev : "left-single-arrow",
        next : "right-single-arrow",
        prevYear : "left-double-arrow",
        nextYear : "right-double-arrow"
      },
      axisFormat : axisFormat,
      slotLabel : slotLabel,
      isRTL : isRTL,
      theme : splittheme,
      allDaySlot : allDaySlot,
      fixedWeekCount : fixedWeekCount,
      firstDay : $timeout,
      weekends : weekends,
      weekNumbers : weekNumbers,
      hiddenDays : [conf, buffer, rep, r2, r1, f, lastTime],
      businessHours : {
        start : obj,
        end : options,
        dow : [choice, stop, command, optsData, ms, line, t]
      },
      editable : editable,
      eventStartEditable : editable,
      eventDurationEditable : editable,
      selectable : editable,
      selectHelper : editable,
      eventLimit : eventLimit,
      startParam : swap,
      endParam : temp,
      eventSources : [user[0]],
      /**
       * @param {Element} post
       * @param {Object} $event
       * @param {?} calEvent
       * @return {undefined}
       */
      eventRender : function(post, $event, calEvent) {
        /** @type {number} */
        var msgLen = 14;
        if (post.title.length > msgLen) {
          $event.find(".fc-title").text(post.title.substr(0, msgLen) + "...").parent().attr("title", post.title);
        }
      },
      views : {
        basic : {
          slotDuration : msg
        },
        agenda : {
          slotDuration : msg
        },
        week : {
          slotDuration : msg
        },
        day : {
          slotDuration : msg
        }
      },
      /**
       * @param {Object} options
       * @param {?} calEvent
       * @param {?} event
       * @return {undefined}
       */
      eventClick : function(options, calEvent, event) {
        var userLastSeenDate = options.start ? $.fullCalendar.moment(options.start).format(value) : $.fullCalendar.moment(date).format(value);
        var moment = options.end ? $.fullCalendar.moment(options.end).format(value) : $.fullCalendar.moment(options.start).format(value);
        var hmac = $.fullCalendar.moment(userLastSeenDate).format(normalized);
        var bookmark = $.fullCalendar.moment(moment).format(normalized);
        var millis = bookmark > hmac ? $.fullCalendar.moment(moment).format($match) : $.fullCalendar.moment(moment).format(gregorianCalendar);
        var newMillis = $.fullCalendar.moment(userLastSeenDate).format($match) + " - " + millis;
        var tag = options.end ? $.fullCalendar.moment(options.end).format(query) : $.fullCalendar.moment(options.start).format(query);
        /** @type {number} */
        var m = (moment - userLastSeenDate) / 60 / 1E3;
        /** @type {string} */
        var selector = (m / 60 + m % 60).toString();
        /** @type {string} */
        var doc = parseFloat(options.latitude).toFixed(14);
        /** @type {string} */
        var data = parseFloat(options.longitude).toFixed(14);
        init(doc, data, options.location);
        $("#viewEventModal #gexport").html('<a href="//www.google.com/calendar/event?action=TEMPLATE&amp;text=' + options.title + "&amp;dates=" + $.fullCalendar.moment(userLastSeenDate).format(query) + "/" + tag + "&amp;details=" + options.description + "&amp;location=" + options.location + '&amp;sprop=website:" title="Google" target="_blank" ><i class="fa fa-google"></i></a>');
        $("#viewEventModal #yexport").html("<a href='//calendar.yahoo.com/?v=60&DUR=" + selector.substr(0, 2) + "&TITLE=" + options.title + "&ST=" + $.fullCalendar.moment(userLastSeenDate).format(query) + "&in_loc=" + options.location + "&DESC=" + options.description + "&URL=" + options.url + "' title='Yahoo' target='_blank' ><i class='fa fa-yahoo'></i></a>");
        $("#viewEventModal #lexport").html("<a href='//calendar.live.com/calendar/calendar.aspx?rru=addevent&dtstart=" + userLastSeenDate + "&dtend=" + moment + "&summary=" + options.title + "&description=" + options.description + "&location=" + options.location + "' title='Microsoft' target='_blank' ><i class='fa fa-windows'></i></a>");
        $("#viewEventModal #Iexport").html("<a href='" + sep + "export/" + options.id + "' title='" + Ce + "' ><i class='fa fa-calendar-o'></i></a>");
        $("#viewEventModal #ic_event_title").text(options.title);
        $("#viewEventModal #ic_event_desc").text(options.description);
        $("#viewEventModal #ic_event_urllink").text(options.url);
        $("#viewEventModal #ic_event_location").text(options.location);
        $("#viewEventModal #markers_ulng").text(data);
        $("#viewEventModal #markers_ulat").text(doc);
        $("#viewEventModal #ic_event_allday").text(options.allDay);
        $("#viewEventModal #filename").html('<a href="' + world + options.filename + '" title="' + options.filename + '" target="_blank"><b>' + options.filename + "</b></a>");
        $("#viewEventModal #when").text(newMillis);
        $("#viewEventModal").modal("show");
      },
      /**
       * @param {?} jsEvent
       * @param {?} calEvent
       * @param {?} $event
       * @return {undefined}
       */
      eventMouseover : function(jsEvent, calEvent, $event) {
        $(".fc-content").popover({
          trigger : "hover",
          html : true,
          /**
           * @return {?}
           */
          title : function() {
            return $(this).parent().find(".fc-title").html();
          },
          /**
           * @return {?}
           */
          content : function() {
            return $(this).parent().find(".fc-description").html();
          },
          container : "body",
          placement : "top"
        });
      },
      /**
       * @param {Object} display
       * @return {undefined}
       */
      loading : function(display) {
        if (display) {
          $("#loading").show();
          callback(display);
        } else {
          $("#loading").hide();
        }
      }
    });
  }),
	$("#cifcv").text($.cifullCalendar.version),
	$("#fcv").text($.fullCalendar.version),
	$("#loadEvents").on("click", function(types) {
		types.preventDefault();
		/** @type {string} */
		walkers[0] = sep + "json";
		$("#calendar").fullCalendar("removeEventSource", user[0]);
		$("#calendar").fullCalendar("refetchEvents");
		$("#calendar").fullCalendar("addEventSource", walkers[0]);
		$("#calendar").fullCalendar("refetchEvents");
		user[0] = walkers[0];
	}),
	$("#title").off("keyup drop").on("keyup drop", function(types) {
		/** @type {number} */
		var tref = 0;
		clearTimeout(tref);
		/** @type {number} */
		tref = setTimeout(function() {
			types.preventDefault();
			var keys = $("#title").val();
			if (each(keys)) {
				/** @type {string} */
				walkers[0] = sep + "json";
				$("#calendar").fullCalendar("removeEventSource", user[0]);
				$("#calendar").fullCalendar("refetchEvents");
				$("#calendar").fullCalendar("addEventSource", walkers[0]);
				$("#calendar").fullCalendar("refetchEvents");
				user[0] = walkers[0];
			} else {
				/** @type {string} */
				walkers[0] = sep + "search?title=" + keys;
				$("#calendar").fullCalendar("removeEventSource", user[0]);
				$("#calendar").fullCalendar("refetchEvents");
				$("#calendar").fullCalendar("addEventSource", walkers[0]);
				$("#calendar").fullCalendar("refetchEvents");
				user[0] = walkers[0];
			}
		}, true);
	}),
	$("#submitsearch").on("click", function(types) {
		types.preventDefault();
		var keys = $("#title").val();
		if (each(keys)) {
			/** @type {string} */
			walkers[0] = sep + "json";
			$("#calendar").fullCalendar("removeEventSource", user[0]);
			$("#calendar").fullCalendar("refetchEvents");
			$("#calendar").fullCalendar("addEventSource", walkers[0]);
			$("#calendar").fullCalendar("refetchEvents");
			user[0] = walkers[0];
		} else {
			/** @type {string} */
			walkers[0] = sep + "search?title=" + keys;
			$("#calendar").fullCalendar("removeEventSource", user[0]);
			$("#calendar").fullCalendar("refetchEvents");
			$("#calendar").fullCalendar("addEventSource", walkers[0]);
			$("#calendar").fullCalendar("refetchEvents");
			user[0] = walkers[0];
		}
	}), Panel;
});
