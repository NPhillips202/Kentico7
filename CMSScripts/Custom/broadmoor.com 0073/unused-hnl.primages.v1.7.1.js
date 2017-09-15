/*!
 * prImages - Progressive-Responsive Images - v1.7.1 - 19/5/2016
 * http://code.hnldesign.nl/demo/hnl.prImages.html
 *
 * Copyright (c) 2014-2016 HN Leussink
 * Dual licensed under the MIT and GPL licenses.
 *
 * Example: http://code.hnldesign.nl/demo/hnl.prImages.html
 *
 * todo: move debugger out of prototype?
 */

/*global  jQuery*/
/*global  console*/
/*jslint bitwise: true */

if (!window.console) {
  var console = {log: function () {
    'use strict';
  }};
}

var Pr = {
  Version : '1.1',
  Options : {
    Debug :           window.location.search.indexOf('prdebug') !== -1,
    HighQuality :     90,
    UrlType :         'uri',
    WatchResize :     true,
    WatchScroll :     true,
    WatchLoad :       true,
    OnlyVisible :     true,
    SearchSiblings :  true,
    AutoRun :         true,
    ResBrPts :        [80, 160, 320, 480, 768, 1024, 1224, 1824, 1920],
    DpiMultiplier :   (window.devicePixelRatio >= 1.5) ? 2 : 1,
    LoadTimeout :     10000,
    retryCount:       2,
    QueryVars : {
      filename: 'src',
      crop:     'zc',
      filters : 'fltr[]',
      quality : 'q',
      width:    'w',
      height:   'h'
    }
  },
  BrowserInfo : {
    supportsEvtLstnr :  typeof window.addEventListener === 'function',
    supportsElsByCln :  document.getElementsByClassName !== undefined,
    isCrap :            document.querySelectorAll === undefined
  },
  Nodes: [],
  //Make room for an optional callback
  Callback: null,
  //set a counter for process-state
  Processed : 0,

  PrElement: function (node) {
    'use strict';
    var th = this;
    this.status = '';
    //define a mule for this image element, to handle preloading
    this.imgMule = new Image();
    //hook into the image loaded and error event for the mule
    if (Pr.BrowserInfo.supportsEvtLstnr) {
      this.imgMule.addEventListener('load', function () {
        node.prototype.imgLoaded(node);
      }, false);
      this.imgMule.addEventListener('error', function (e) {
        node.prototype.imgLoadError(node, e);
      }, false);
    } else {
      this.imgMule.attachEvent('onload', function () {
        node.prototype.imgLoaded(node);
      });
      this.imgMule.attachEvent('onerror', function (e) {
        node.prototype.imgLoadError(node, e);
      });
    }
    //setup/get required image attributes from the physical image element
    this.ImgData = {
      path:     function () { return node.getAttribute('data-path').substring(0, node.getAttribute('data-path').lastIndexOf('/') + 1); },
      filename: function () { return node.getAttribute('data-path').substring(node.getAttribute('data-path').lastIndexOf('/') + 1); },
      procPath: function () { return node.getAttribute('data-imgprocessor'); },
      crop:     function () { return parseInt(node.getAttribute('data-crop'), 10) || 0; },
      filters:  function () { return node.getAttribute('data-filters'); },
      srcWidth: function () { return node.getAttribute('data-srcwidth') || 0; },
      ratio:    function () { return node.getAttribute('data-ratio'); },
      quality:  function () { return parseInt(node.getAttribute('data-quality'), 10) || Pr.Options.HighQuality; },
      width:    0,
      height:   0,
      urlCache: {}
    };

    this.isVisible = function () {
      // Am I visible?
      // Height and Width are not explicitly necessary in visibility detection, the bottom, right, top and left are the
      // essential checks. If an image is 0x0, it is technically not visible, so it should not be marked as such.
      // That is why either width or height have to be > 0.
      if (this.getDisplayState() === 'none') { return false; }
      var rect = node.getBoundingClientRect();
      return (
        (rect.height > 0 || rect.width > 0) &&
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    this.imgLoaded = function (node) {
      //defines what should be done when the mule has loaded its image
      if (th.loadTimer !== undefined) { clearTimeout(th.loadTimer); th.loadTimer = null; }
      var image = node.prototype.imgMule.src;
      Pr.Logger(node, 'Mule loaded for node ' + node.id + ' (took ' + (this.errorState.retry + 1) + ' attempt(s))');
      th.errorState.retry = 0;
      //image has loaded, set it as source for the image we inserted earlier
      if (node.tagName === 'DIV') {
        node.style.backgroundImage = 'url(\'' + image + '\')';
      } else {
        node.src = image;
      }
      if (Pr.Processed === Pr.Nodes.length) {
        if (typeof Pr.Callback === 'function') { Pr.Callback(); }
      }
      if (Pr.Options.Debug) { th.DebugInfo.show(); }
      //dispatch event to inform that loading is complete.
      Pr.eventNotice(node, 'prImgLoaded');
    };

    this.imgLoadError = function (node, event) {
      //defines what should be done when the mule has an error loading its image
      th.errorState.status = th.errorState.status || event.type;
      th.errorState.src = th.errorState.src || node.prototype.imgMule.src;
      if (th.loadTimer !== undefined) { clearTimeout(th.loadTimer); th.loadTimer = null; }
      if (Pr.Options.Debug) {
        th.DebugInfo.show('Image load ' + th.errorState.status + '!', 'error');
      }
      th.errorState.retry = th.errorState.retry + 1;
      if (th.errorState.retry < Pr.Options.retryCount) {
        Pr.Logger(node, th.errorState.status + ' loading image: ' + th.errorState.src + '. Retrying.', 'error');
        this.loadResponsiveImg(true, true); //hard forcing a reload
      } else {
        Pr.Logger(node, th.errorState.status + ' loading image: ' + th.errorState.src + '. Tried ' + th.errorState.retry + ' time(s), not replacing.', 'error');
      }
    };

    this.getDimensions = function (fallback) {
      //gets dimensions of node. If width is zero, falls back (if Options.SearchSiblings is true) to searching for siblings for width
      var displayNone = this.getDisplayState() === 'none';
      //check if element is invisible (display:none). If it is:hide it (visibility:hidden), display it as block, measure it and restore its display state
      //this is still experimental: hidden elements will take up space, so for a - minute - moment, layout can be messed up. This should really not be noticeable though.
      if (displayNone) {
        node.style.visibility = 'hidden';
        node.style.display = 'block';
      }
      node.dims = [node.offsetWidth, node.offsetHeight];
      if (displayNone) {
        node.style.display = '';
        node.style.visibility = '';
      }
      if (node.dims[0] === 0 && fallback) {
        //if no width for the current node is found, look into all its siblings if a similar node is found *with* width and use that
        var sbl = node.parentNode.firstElementChild;
        while (sbl && sbl.nodeType === 1 && sbl !== this) {
          if (sbl.offsetWidth > 0) {
            node.dims = [sbl.offsetWidth, sbl.offsetHeight];
            break;
          }
          sbl = sbl.nextElementSibling || sbl.nextSibling;
        }
        if (node.dims[0] === 0) {
          //No sibling dimensions found. Does the image have primage siblings at all? Fallback to parent's parent parent
          //parent, etc (c determines how many times, e.g. how many 'levels up')
          var c = 3;
          var parNode = node.parentNode;
          while (node.dims[0] === 0 && c > 0) {
            node.dims = [parNode.offsetWidth, parNode.offsetHeight];
            parNode = parNode.parentNode;
            c -= 1;
          }
        }
      }
      return node.dims;
    };

    this.normalizedDimensions = function () {
      var th = this, x, y;
      //only extend the base breakpoints with the image's original width if it is not zero (i.e. not available or supplied)
      var breakPoints = (this.ImgData.srcWidth() !== 0) ? Pr.Options.ResBrPts.concat([this.ImgData.srcWidth()]) : Pr.Options.ResBrPts;
      //match passed value to defined responsive breakpoints. Returns array with width, height and quality
      var dims = th.getDimensions(Pr.Options.SearchSiblings);
      var ratio = parseFloat(th.ImgData.ratio()) || Math.round(dims[1] / dims[0] * 100) / 100;
      var quality = th.ImgData.quality();
      for (x = 0; x < breakPoints.length - 1; x += 1) {
        if ((dims[0] * Pr.Options.DpiMultiplier <= breakPoints[x]) && (breakPoints[x] * ratio >= dims[1])) {
          break;
        }
      }
      var normalized = {
        width   : breakPoints[x],
        height  : (!!th.ImgData.crop()) ? Math.round(breakPoints[x] * ratio) : 0,
        quality : function () { return quality; },
        ratio   : function () { return ratio; }
      };
      if (Pr.Options.Debug) {
        th.DebugInfo.scaledUp  = th.ImgData.width < normalized.width;
        th.DebugInfo.isMax  = x === breakPoints.length - 1;
      }
      //merge ImgData into normalized, while keeping normalized data, so a virtual, modified ImgData object is returned for use
      for (y in th.ImgData) { if (th.ImgData.hasOwnProperty(y) && !normalized.hasOwnProperty(y)) { normalized[y] = th.ImgData[y]; } }
      return normalized;
    };

    this.buildUrl = function (imgData) {
      var th = this;
      var ReturnUrl = '';
      var uid = Math.abs((imgData.path() + imgData.filename() + imgData.width).split('').reduce(function (a, b) {a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0));
      //first, check if url was already generated
      if (th.ImgData.urlCache[uid]) {
        Pr.Logger(node, 'Url cached');
        ReturnUrl = th.ImgData.urlCache[uid];
      } else {
        //see if we need to multiply
        if (!Pr.Options.UrlType || Pr.Options.UrlType === 'uri') {
          ReturnUrl =  imgData.path() +
            'resized/' +
            imgData.width +
            '/' +
            imgData.height +
            '/' +
            imgData.quality() +
            '/' +
            imgData.crop() +
            '/' +
            imgData.filters() +
            '/' +
            imgData.filename();
        } else if (Pr.Options.UrlType === 'query') {
          ReturnUrl =  imgData.procPath() +
            '?' + Pr.Options.QueryVars.filename + '=' +
            imgData.path() + imgData.filename() +
            '&' + Pr.Options.QueryVars.width + '=' +
            imgData.width +
            '&' + Pr.Options.QueryVars.height + '=' +
            imgData.height +
            '&' + Pr.Options.QueryVars.quality + '=' +
            imgData.quality() +
            '&' + Pr.Options.QueryVars.crop + '=' +
            imgData.crop();
          var filters = imgData.filters().split('+');
          var i;
          for (i = 0; i < filters.length; i += 1) {
            ReturnUrl += '&' + Pr.Options.QueryVars.filters + '=' +
              filters[i];
          }
        }
        th.ImgData.urlCache[uid] = ReturnUrl;
      }
      return ReturnUrl;
    };

    this.loadResponsiveImg = function (forcedLoad, forcedRecalculation) {
      var th = this;
      var override = (node.getAttribute('data-alwaysprocess') !== null) ? node.getAttribute('data-alwaysprocess') !== 'false' : false;
      Pr.Processed += 1; //set this one as processed
      var goTime =  ((Pr.Options.OnlyVisible && !override) ? th.isVisible() : true);
      if (goTime || forcedLoad) {
        Pr.Logger(node, 'Proceeding; node ' + node.id + ' visible' + (forcedLoad ? ' (forced)' : ''));
        //element is visible (if check is set, else this block always executes.) Override supersedes all.
        //get normalized dimensions for element
        var normalized = th.normalizedDimensions();
        //compare normalized dimensions to what is stored for the element
        if (th.ImgData.width !== normalized.width || forcedRecalculation) {
          //(re)set status for node
          th.errorState = {
            status : null,
            src : null,
            retry : (th.errorState !== undefined) ?  th.errorState.retry : 0
          };
          //element is at a width that requires other image, construct url for that image,
          //preload the new image. Event handler for load should handle the rest of the logic from here.
          th.imgMule.src = th.buildUrl(normalized);
          //start a load-timeout timer
          th.loadTimer = setTimeout(function () {
            th.errorState.src = th.imgMule.src; //store url that timed out
            th.imgMule.src = ''; //this will abort the loading process and trigger the error event in most modern browsers
            th.errorState.status = 'timeout'; //status will be read by onerror/error event
          }, Pr.Options.LoadTimeout);
          Pr.Logger(node, 'Preloading node ' + node.id + ', attempt ' + (this.errorState.retry + 1), 'warn');
          Pr.eventNotice(node, 'prPreLoading');
          //store the new, normalized image data for reference on reprocessing
          th.ImgData = normalized;
          if (Pr.Options.Debug) { th.DebugInfo.show('Preloading new image...', 'preloading'); }
        }
      } else {
        Pr.Logger(node, (Pr.Options.AutoRun) ? 'Not proceeding; node ' + node.id + ' not visible' : 'Not running on node ' + node.id + ', autorun disabled', 'warn');
      }
    };

    this.getDisplayState = function () {
      return node.currentStyle ? node.currentStyle.display : getComputedStyle(node, null).display;
    };

    this.DebugInfo = {
      forNode : this,
      scaledUp : false,
      isMax: false,
      show : function (message, classname) {
        //Debugging/demo
        var th = this.forNode;
        if (!node.getAttribute('data-nodebug')) {
          if (node.nextSibling && (node.nextSibling.className === 'infodiv preloading' || node.nextSibling.className === 'infodiv' || node.nextSibling.className === 'infodiv error')) {
            node.nextSibling.parentNode.removeChild(node.nextSibling);
          }
          if (node.querySelectorAll('.infodiv')[0]) {
            node.removeChild(node.querySelectorAll('.infodiv')[0]);
          }
          var info = document.createElement('DIV');
          if (message) {
            info.innerHTML = message;
            info.className = classname !== undefined ? 'infodiv ' + classname : 'infodiv';
          } else {
            info.innerHTML = 'Elem: ' + node.dims[0] + 'x' + node.dims[1] +
              ', Img: ' + th.ImgData.width + 'x' + th.ImgData.height +
              (Pr.Options.DpiMultiplier > 1 ?
               ' (Retina)' : '');
            if (!!th.ImgData.crop()) {
              info.innerHTML += ' (cropped)';
            }
            if (this.isMax) {
              info.innerHTML += ' (max dimensions)';
            }
            var updateinfo = document.createElement('SPAN');
            var upordown = this.scaledUp ? ' up' : ' down';
            updateinfo.innerHTML = 'Image adjusted' + upordown;
            updateinfo.className = 'updated';
            info.appendChild(updateinfo);
            setTimeout(function fadeAndRemove() {
              updateinfo.parentNode.removeChild(updateinfo);
            }, 2000);
            info.className = 'infodiv';
          }
          if (node.tagName !== 'DIV') {
            if (node.nextSibling) {
              node.parentNode.insertBefore(info, node.nextSibling);
            } else {
              node.parentNode.appendChild(info);
            }
          } else {
            node.appendChild(info);
          }
        }
        //*/
      }
    };

    //finally, process the image upon instantiation
    if (!Pr.Options.AutoRun) {
      Pr.Logger(node, 'Not running on initialization, autorun disabled', 'warn');
      return;
    }
    this.loadResponsiveImg(false);
  },

  //custom logger
  Logger : function (node, msg, type) {
    'use strict';
    if (type === undefined) { type = 'log'; }
    if (Pr.Options.Debug) { console[type]('Pr: ' + msg); }
    Pr.eventNotice(node, ('pr' + (type.substr(0, 1).toUpperCase() + type.substr(1))), msg);
  },

  eventNotice : function (node, event, eventData) {
    'use strict';
    var evt;
    //Pr.Logger(this, 'Event \'' + event + '\' fired for Pr node ' + Pr.Nodes.indexOf(node));
    if (document.createEventObject) {
      // dispatch for IE
      evt = document.createEventObject();
      evt.details = eventData;
      return node.fireEvent(event, evt);
    } else {
      // dispatch for firefox + others
      evt = document.createEvent('HTMLEvents');
      evt.initEvent(event, true, true); // event type,bubbling,cancelable
      evt.details = eventData;
      return !node.dispatchEvent(evt);
    }
  },

  Reprocess: function (callback) {
    'use strict';
    //assign the callback
    Pr.Callback = callback;
    //reset counter
    Pr.Processed = 0;
    var i;
    for (i = 0; i < Pr.Nodes.length; i += 1) {
      Pr.Nodes[i].prototype.loadResponsiveImg();
    }
  },

  ProcessImages: function (ClassName, callback) {
    'use strict';
    if (!Pr.BrowserInfo.isCrap) {
      //it's go time!
      //assign the callback
      Pr.Callback = callback;
      var elements = Pr.BrowserInfo.supportsElsByCln ?
                     document.getElementsByClassName(ClassName) :
                     document.querySelectorAll('.' + ClassName);
      var i, validImg;
      for (i = 0; i < elements.length; i += 1) {
        validImg = elements[i].getAttribute('data-path') && elements[i].getAttribute('data-imgprocessor');
        if (validImg) {
          elements[i].prototype = new Pr.PrElement(elements[i]);
          Pr.Nodes.push(elements[i]); //store
        } else {
          Pr.Logger(document, 'Missing data attributes for:' + (elements[i].id || '(no id available)') + '. Skipping...', 'warn');
        }
      }
    } else {
      //redirect crappy browsers (IE7 and <)
      if (window.location.search !== '?forcenojs') {
        window.location = '?forcenojs';
      }
    }
  }
};

//debounce prototype
Pr.Reprocess.deBounce = function (threshold, execAsap, caller) {
  'use strict';
  var func = this;
  var timeout;
  return function debounced() {
    var obj = this;

    function delayed() {
      if (!execAsap) {
        func.apply(obj, [caller]);
      }
      timeout = null;
    }

    if (timeout) {
      clearTimeout(timeout);
    } else if (execAsap) {
      func.apply(obj, [caller]);
    }
    timeout = setTimeout(delayed, threshold || 100);
  };
};

//determine to listen for either a resize (pc) or an orientation change (device) event
var support = (typeof window.hasOwnProperty === 'function') ?
              window.hasOwnProperty('onorientationchange') :
              false;
var  orientationEvent = support ?
                        'orientationchange' :
                        'resize';

//bind events to window when the document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading
if (Pr.BrowserInfo.supportsEvtLstnr) {
  document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    if (Pr.Options.WatchResize) { window.addEventListener(orientationEvent,   Pr.Reprocess.deBounce(100,  false, 'resizeEvent'), false); }
    if (Pr.Options.WatchScroll) { window.addEventListener('scroll',           Pr.Reprocess.deBounce(50,   false, 'scrollEvent'), false); }
    //this is a surrogate for the issue with Safari mobile jumping back: http://stackoverflow.com/questions/25775840/mobile-safari-js-event-for-jump-to-last-scroll-position-on-refresh
    if (Pr.Options.WatchLoad) {   window.addEventListener('load',             Pr.ProcessImages('primage'), false); }
  }, false);
} else {
  document.attachEvent('onreadystatechange', function () {
    'use strict';
    if (Pr.Options.WatchResize) { window.attachEvent('on' + orientationEvent, Pr.Reprocess.deBounce(100,  false, 'resizeEvent')); }
    if (Pr.Options.WatchScroll) { window.attachEvent('onscroll',              Pr.Reprocess.deBounce(50,   false, 'scrollEvent')); }
    if (Pr.Options.WatchScroll) { window.attachEvent('onload',                Pr.ProcessImages('primage')); }
  });
}

//register reprocessing as a jQuery function if jQuery is defined
if (window.jQuery && typeof jQuery === 'function') {
  jQuery.fn.reprocessPrImg = function (callback) {
    'use strict';
    //assign the callback
    Pr.Callback = callback;
    return this.each(function () {
      if (this.prototype !== undefined) {
        //reset counter for each reprocessed img
        Pr.Processed -= 1;
        this.prototype.loadResponsiveImg(true);
      }
    });
  };
}