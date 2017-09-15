/*!
 * hnl.mobileConsole - javascript mobile console - v0.4.3 - 18/5/2016
 * Adds html console to webpage. Especially useful for debugging JS on mobile devices.
 * Supports .log, .warn, .error and .trace
 * Based on code by jakub fiala (https://gist.github.com/jakubfiala/8fe3461ab6508f46003d)
 * Licensed under the MIT license
 *
 * Original author: @hnldesign
 * Further changes, comments: @hnldesign
 * Copyright (c) 2014-2016 HN Leussink
 * Dual licensed under the MIT and GPL licenses.
 *
 * Demo: http://code.hnldesign.nl/demo/hnl.MobileConsole.html
 */


//check if the browser has a console. If not (older Firefox without Firebug): stop.
if (window.console !== 'undefined') {
  var console = window.console;
  /**
   * DocReady - Replacement for jQuery's $(document).ready() event
   */
  if (typeof 'docReady' !== 'function') {
    (function (funcName, baseObj) {
      // The public function name defaults to window.docReady
      // but you can pass in your own object and own function name and those will be used
      // if you want to put them in a different namespace
      funcName = funcName || 'docReady';
      baseObj = baseObj || window;
      var readyList = [];
      var readyFired = false;
      var readyEventHandlersInstalled = false;

      // call this when the document is ready
      // this function protects itself against being called more than once
      function ready() {
        if (!readyFired) {
          // this must be set to true before we start calling callbacks
          readyFired = true;
          for (var i = 0; i < readyList.length; i++) {
            // if a callback here happens to add new ready handlers,
            // the docReady() function will see that it already fired
            // and will schedule the callback to run right after
            // this event loop finishes so all handlers will still execute
            // in order and no new ones will be added to the readyList
            // while we are processing the list
            readyList[i].fn.call(window, readyList[i].ctx);
          }
          // allow any closures held by these functions to free
          readyList = [];
        }
      }

      function readyStateChange() {
        if (document.readyState === 'complete') {
          ready();
        }
      }

      // This is the one public interface
      // docReady(fn, context);
      // the context argument is optional - if present, it will be passed
      // as an argument to the callback
      baseObj[funcName] = function (callback, context) {
        // if ready has already fired, then just schedule the callback
        // to fire asynchronously, but right away
        if (readyFired) {
          setTimeout(function () {callback(context);}, 1);
          return;
        } else {
          // add the function and context to the list
          readyList.push({fn: callback, ctx: context});
        }
        // if document already ready to go, schedule the ready function to run
        if (document.readyState === 'complete') {
          setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
          // otherwise if we don't have event handlers installed, install them
          if (document.addEventListener) {
            // first choice is DOMContentLoaded event
            document.addEventListener('DOMContentLoaded', ready, false);
            // backup is window load event
            window.addEventListener('load', ready, false);
          } else {
            // must be IE
            document.attachEvent('onreadystatechange', readyStateChange);
            window.attachEvent('onload', ready);
          }
          readyEventHandlersInstalled = true;
        }
      };
    })('docReady', window);
  }

  var MobileConsole = {
    Version: '0.4',
    consoleDiv: undefined,
    console_old : {
      log :   console.log.bind(console),
      warn :  console.warn.bind(console),
      error : console.error.bind(console),
      trace : console.trace.bind(console)
    },
    Options: {
      AutoRun:    window.location.search.indexOf('debug') !== -1,
      Position:   'bottom', //or 'top' NOT IMPLMENTED
      Type:       'docked', //or 'window' NOT IMPLMENTED,
      AnimParams: 'all 200ms ease',
      Style:      'white' //or 'black'
    },
    BrowserInfo: {
      browserChrome: /chrome/.test(navigator.userAgent.toLowerCase()),
      ffox: /firefox/.test(navigator.userAgent.toLowerCase()) && !/chrome/.test(navigator.userAgent.toLowerCase()),
      safari: /safari/.test(navigator.userAgent.toLowerCase()) && !/chrome/.test(navigator.userAgent.toLowerCase()),
      trident: /trident/.test(navigator.userAgent.toLowerCase()),
      evtLstn: typeof window.addEventListener === 'function',
      supportsElsByCln: document.getElementsByClassName !== undefined,
      isCrap: document.querySelectorAll === undefined
    },
    elems: {},

    //constructor
    MobileConsole: function () {
      'use strict';
      var th = this;
      var mc = MobileConsole;

      /**
       * Toggles the console height
       * @returns {toggle}
       */
      this.toggle = function () {
        var elem = mc.elems.consoleDiv;
        mc.setCSS(elem, {
          height: (elem.toggled) ? '102px' : '262px',
          opacity: (elem.toggled) ? '0.8' : 1
        });
        this.innerHTML = (elem.toggled) ? '&plus;' : '&minus;';
        elem.toggled = !elem.toggled;
        return elem;
      };

      /**
       * Scrolls the console to the bottom
       * @returns {toggleScroll}
       */
      this.toggleScroll = function (e) {
        var elem = mc.elems.scrollContainer;
        elem.scrollTop = elem.scrollHeight;
        return elem;
      };

      /**
       * Clear the console
       * @returns {toggleScroll}
       */
      this.empty = function (e) {
        console.clear();
        mc.elems.consoleBodyTable.innerHTML = '';
        var methods = ['log', 'warn', 'error', 'trace'];
        for (var i = 0; i < methods.length; i++) {
          mc.elems.lines[methods[i]] = [];
        }
      };

      this.toggleLogtype = function (method, button) {
        button.toggled = !button.toggled;
        mc.setCSS(button, {
          opacity: (button.toggled) ? '0.5' : ''
        });
        var elems = mc.elems.lines[method];
        var key, x = 0;
        for (key in elems) {
          if (elems.hasOwnProperty(key)) {
            mc.setCSS(elems[x], { display: (button.toggled) ? 'none' : '' });
          }
          x++;
        }
        mc.elems.scrollContainer.scrollTop = mc.elems.scrollContainer.scrollHeight;
        return button;
      };

      /**
       * theConsole - The beating heart. This is the 'new console' that takes and renders everything thrown at it.
       * @param method
       * @param message
       * @param stackTrace
       * @param stackTraceOrig
       */
      this.theConsole = function (method, message, stackTrace, stackTraceOrig) {
        if (message !== '' && message !== undefined) {
          var color = (method === 'error') ? ((mc.Options.Style === 'white') ? '#FF0000' : '#ff4848') : ((method === 'warn') ? '#CE8724' : ((mc.Options.Style === 'white') ? '#000000' : '#EEEEEE'));
          if (this.prevMsg !== message || method === 'trace') {
            //message is not a repeat of the previous
            var cleanUrl, url;
            if(stackTrace !== undefined) {
              if (stackTrace.url !== undefined || stackTrace.line !== undefined || stackTrace.column !== undefined) {
                //this is window.onerror
                url = stackTrace.url + ':' + stackTrace.line + ':' + stackTrace.column;
                cleanUrl = stackTrace.url;
              } else if (stackTrace.objTrace !== undefined) {
                var origin = (stackTrace.objTrace[1] === 'global') ? stackTrace.objTrace[0] : stackTrace.objTrace[1];
                if (mc.BrowserInfo.safari || mc.BrowserInfo.ffox) {
                  if (/@/i.test(origin)) {
                    url = origin.split('@')[1];
                  } else {
                    url = origin;
                  }
                } else {
                  url = origin.substring(origin.indexOf('(') + 1, origin.indexOf(')'));
                }
                cleanUrl = url.split(':')[0] + ':' + url.split(':')[1];
              }
            }

            //construct link to caller
            var linkContainer = mc.elems.tdRight.cloneNode(false);
            if (url !== 'anonymous function' && url !== undefined && url !== '' && /http/i.test(cleanUrl)) {
              var newLink = mc.elems.link.cloneNode(false);
              newLink.innerHTML = url;
              newLink.href = cleanUrl;
              newLink.setAttribute('target', '_blank');
              //put link in container
              linkContainer.appendChild(newLink);
            } else {
              linkContainer.innerHTML = (String(url) === '' ? '(Undefined)' : String(url));
            }
            //construct message
            var messageContainer = mc.elems.tdLeft.cloneNode(false);
            if (method === 'trace' && stackTrace !== undefined) {
              messageContainer.innerHTML = stackTrace.htmlTrace;
            } else {
              messageContainer.innerHTML = message;
            }
            mc.setCSS(messageContainer, {color: color});

            //put message in container
            var lineContainer = mc.elems.tr.cloneNode(false);
            if (mc.Options.Style === 'white') { mc.setCSS(lineContainer, {backgroundColor: (method ==='warn') ? '#FFF6E0' : (method === 'error' ? '#ffe5e5' : '')}); }
            lineContainer.appendChild(messageContainer);
            lineContainer.appendChild(linkContainer);

            //store the lines in the object corresponding to the method used
            mc.elems.lines[method].push(lineContainer);
            //add it to the constructed console
            mc.setCSS(lineContainer, {
              display: (mc.elems.buttons[method].toggled ? 'none' : '')
            });
            mc.elems.consoleBodyTable.appendChild(lineContainer);
            mc.consoleDiv.prototype.toggleScroll();

            this.prevMsg = message;
            this.prevMethod = method;
            this.c = 1;

          } else if (this.prevMethod === method) {
            //message is a repeat of the previous, AND the method is the same. Add a count-dot / update the count-dot
            this.c = this.c + 1;
            if (mc.elems.consoleBodyTable.lastChild.countDot === undefined) {
              var countDot = mc.setCSS(mc.elems.dot.cloneNode(false), {
                backgroundColor: color
              });
              var span = document.createElement('span');
              span.innerHTML = this.prevMsg;
              mc.elems.consoleBodyTable.lastChild.firstChild.innerHTML = '';
              mc.elems.consoleBodyTable.lastChild.firstChild.appendChild(countDot);
              mc.elems.consoleBodyTable.lastChild.firstChild.appendChild(span);
              mc.elems.consoleBodyTable.lastChild.countDot = countDot;
            }
            mc.elems.consoleBodyTable.lastChild.countDot.innerHTML = this.c.toString();
          } else {
            console.error('not logging. Why?');
          }
        }
      };

      //setup binds
      if (mc.BrowserInfo.evtLstn) {
        mc.elems.consoleDiv.addEventListener('transitionend', th.toggleScroll, false);
        mc.elems.consoleDiv.addEventListener('webkitTransitionEnd', th.toggleScroll, false);
        mc.elems.consoleDiv.addEventListener('oTransitionEnd', th.toggleScroll, false);
        mc.elems.consoleDiv.addEventListener('MSTransitionEnd', th.toggleScroll, false);
      } else {
        mc.elems.consoleDiv.attachEvent('transitionend', th.toggleScroll);
        mc.elems.consoleDiv.attachEvent('webkitTransitionEnd', th.toggleScroll);
        mc.elems.consoleDiv.attachEvent('oTransitionEnd', th.toggleScroll);
        mc.elems.consoleDiv.attachEvent('MSTransitionEnd', th.toggleScroll);
      }
      //button binds
      if (mc.BrowserInfo.evtLstn) {
        mc.elems.buttons.toggler.addEventListener('click', th.toggle, false);
        mc.elems.buttons.log.addEventListener('click', function () { th.toggleLogtype('log', this); this.blur(); }, false);
        mc.elems.buttons.warn.addEventListener('click', function () { th.toggleLogtype('warn', this); this.blur(); }, false);
        mc.elems.buttons.error.addEventListener('click', function () { th.toggleLogtype('error', this); this.blur(); }, false);
        mc.elems.buttons.trace.addEventListener('click', function () { th.toggleLogtype('trace', this); this.blur(); }, false);
        mc.elems.buttons.clear.addEventListener('click', th.empty, false);
      } else {
        mc.elems.buttons.toggler.attachEvent('onclick', th.toggle);
        mc.elems.buttons.log.attachEvent('onclick', function () { th.toggleLogtype('log', this); this.blur(); });
        mc.elems.buttons.warn.attachEvent('onclick', function () { th.toggleLogtype('warn', this); this.blur(); });
        mc.elems.buttons.error.attachEvent('onclick', function () { th.toggleLogtype('error', this); this.blur(); });
        mc.elems.buttons.trace.attachEvent('onclick', function () { th.toggleLogtype('trace', this); this.blur(); });
        mc.elems.buttons.clear.attachEvent('onclick', th.empty);
      }

      //logic starts here
      //bind to window.onerror and make it trigger a console.error
      window.onerror = function(message, url, lineNumber, column) {
        //save error and send to server for example.
        var stackTrace = {
          url : url,
          line : lineNumber,
          column : column
        };
        console.error(message, stackTrace);
      };
      //Intercept all original console methods including trace. Register the event type as a line type.
      var methods = ['log', 'warn', 'error', 'trace'];
      for (var i = 0; i < methods.length; i++) {
        mc.elems.lines[methods[i]] = [];
        mc.interceptConsole(methods[i]);
      }
    },

    /**
     * set CSS for passed element
     * @param el
     * @param css
     * @returns {*}
     */
    setCSS: function (el, css) {
      'use strict';
      var i;
      for (i in css) {
        el.style[i] = css[i];
      }
      return el;
    },

    /**
     * Linkify passed string content
     * @returns {XML|string}
     */
    linkify : function (str) {
      'use strict';
      // http://, https://, ftp://
      var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
      // www. sans http:// or https://
      var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
      // Email addresses
      var emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;
      return str
        .replace(urlPattern, '<span class="link" data-href="$&">$&</span>')
        .replace(pseudoUrlPattern, '$1<span class="link" data-href="http://$2">$2</span>')
        .replace(emailAddressPattern, '<span class="link" data-href="mailto:$&">$&</span>');
    },

    /**
     * strSplice - a JS-version of PHP's string_splice
     * taken from http://stackoverflow.com/a/21350614
     * @param str
     * @param index
     * @param endIndex
     * @returns {*}
     */
    strSplice : function(str, index, endIndex) {
      'use strict';
      return str.slice(0, index) + str.slice(endIndex);
    },

    /**
     * Element builder. Returns element of type, with className and css applied
     * @param type
     * @param className
     * @param css
     * @returns {HTMLElement}
     */
    createElem: function (type, className, css) {
      'use strict';
      var th = this;
      var element = document.createElement(type);
      th.setCSS(element, css);
      element.className = className;
      return element;
    },

    //Console constructor
    buildConsole: function () {
      'use strict';
      var th = this;
      var white = (th.Options.Style === 'white'), top = (th.Options.Position === 'top'), window = (th.Options.Type === 'window');
      th.elems.consoleDiv = th.createElem('DIV', 'hnlMobileConsole', {
        position: 'fixed',
        resize: 'none',
        fontSize: '12px',
        lineHeight: '12px',
        bottom: top ? 'auto' : 0,
        top: top ? (window ? '32px' : 0) : 'auto',
        right: window ? '70px' : 0,
        backgroundColor: white ? '#ffffff' : '#333333',
        width: window ? '70%' : '100%',
        height: '102px',
        zIndex: 10000,
        padding: 0,
        margin: 0,
        opacity: '0.8',
        borderTop: '1px solid #808080',
        '-webkit-transition': th.Options.AnimParams,
        '-moz-transition': th.Options.AnimParams,
        '-o-transition': th.Options.AnimParams,
        'transition': th.Options.AnimParams
      });
      th.elems.consoleBodyTable = th.createElem('DIV', 'hnlMobileConsole_table', {
        fontFamily: 'monospace',
        maxWidth: '100%',
        display: 'table',
        tableLayout: 'fixed',
        width: '100%'
      });
      th.elems.tr = th.createElem('TR', 'hnlMobileConsole_table_row', {});
      th.elems.tdLeft = th.createElem('TD', 'hnlMobileConsole_table_row_data', {
        textAlign: 'left',
        padding: '2px 4px',
        borderBottom: '1px solid ' + (white ? '#EEEEEE' : '#777777')
      });
      th.elems.tdRight = th.createElem('TD', 'hnlMobileConsole_table_row_data', {
        textAlign: 'left',
        padding: '2px 4px',
        borderBottom: '1px solid ' + (white ? '#EEEEEE' : '#777777'),
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        direction: 'rtl'
      });
      th.elems.link = th.createElem('A', 'hnlMobileConsole_link', {
        color: (white ? '#0000EE' : '#AAC1D2')
      });
      th.elems.dot = th.createElem('DIV', 'hnlMobileConsole_table_row_data_dot', {
        display: 'inline-block',
        borderRadius: '5px',
        color: white ? '#ffffff' : '#333333',
        fontWeight: white ? '' : 'bold',
        minWidth: '12px',
        padding: '0 1px',
        textAlign: 'center',
        marginRight: '5px'
      });
      th.elems.topBar = th.createElem('DIV', 'hnlMobileConsole_topbar', {
        position: 'absolute',
        left: 0,
        right: 0,
        display: 'block',
        padding: '0 2px',
        overflow: 'hidden',
        color: white ? '#333333' : '#FFFFFF',
        backgroundColor: white ? '#DDDDDD' : '#222222',
        borderBottom: '1px solid ' + (white ? '#AAA' : '#111111'),
        webkitOverflowScrolling: 'touch'
      });
      th.elems.scrollContainer = th.createElem('DIV', 'hnlMobileConsole_scrolltcontainer', {
        position: 'relative',
        display: 'block',
        height: '100%',
        overflow: 'hidden',
        overflowY: 'scroll',
        webkitOverflowScrolling: 'touch'
      });
      th.elems.button = th.createElem('BUTTON', 'hnlMobileConsole_button', {
        display: 'inline-block',
        fontSize: '14px',
        padding: '6px 8px',
        textAlign: 'center',
        marginRight: '5px',
        border: '0 none',
        backgroundColor: white ? '#DDDDDD' : '#111111'
      });

      //set up lines object
      th.elems.lines = [];
      //set up buttons object
      th.elems.buttons = [];

      th.elems.buttons.toggler = th.elems.button.cloneNode(false);
      th.elems.buttons.toggler.innerHTML = '&plus;';
      th.elems.topBar.appendChild(th.elems.buttons.toggler);

      th.elems.buttons.log = th.elems.button.cloneNode(false);
      th.elems.buttons.log.innerHTML = 'Log';
      th.elems.topBar.appendChild(th.elems.buttons.log);

      th.elems.buttons.warn = th.elems.button.cloneNode(false);
      th.elems.buttons.warn.innerHTML = 'Warn';
      th.elems.topBar.appendChild(th.elems.buttons.warn);

      th.elems.buttons.error = th.elems.button.cloneNode(false);
      th.elems.buttons.error.innerHTML = 'Error';
      th.elems.topBar.appendChild(th.elems.buttons.error);

      th.elems.buttons.trace = th.elems.button.cloneNode(false);
      th.elems.buttons.trace.innerHTML = 'Trace';
      th.elems.topBar.appendChild(th.elems.buttons.trace);

      th.elems.buttons.clear = th.elems.button.cloneNode(false);
      th.elems.buttons.clear.innerHTML = 'Clear';
      th.elems.topBar.appendChild(th.elems.buttons.clear);

      //construct elements
      th.elems.consoleDiv.appendChild(th.elems.topBar);
      th.elems.scrollContainer.appendChild(th.elems.consoleBodyTable);
      th.elems.consoleDiv.appendChild(th.elems.scrollContainer);


      return th.elems.consoleDiv;
    },

    /**
     * Attaches console to the document body
     */
    attachConsole: function () {
      'use strict';
      document.body.appendChild(MobileConsole.elems.consoleDiv);
      MobileConsole.setCSS(MobileConsole.elems.topBar, {
        top: -Math.abs(MobileConsole.elems.topBar.offsetHeight) + 'px'
      });
      var existingPadding = isNaN(parseInt(document.body.style.paddingBottom, 10)) ? 0 : parseInt(document.body.style.paddingBottom, 10);
      MobileConsole.setCSS(document.body, {
        paddingBottom: existingPadding + Math.abs(MobileConsole.elems.consoleDiv.offsetHeight + MobileConsole.elems.topBar.offsetHeight) + 'px'
      });
      MobileConsole.elems.scrollContainer.scrollTop = MobileConsole.elems.scrollContainer.scrollHeight;
    },

    /**
     * Formats a stacktrace to human readable HTML
     * @param stackTrace
     * @returns {{}}
     */
    stackTraceFormat: function (stackTrace) {
      'use strict';
      var th = this;
      var returnObj = {};
      if (th.BrowserInfo.browserChrome || th.BrowserInfo.trident) {
        //we first format the string a bit
        stackTrace = stackTrace.replace("Error", "")
          .replace(/\r?\n|\r/g, '')
          .replace('    ', '')
          .replace(/</gm, '&lt;')
          .replace(/>/gm, '&gt;');
        //then look for the first part of the trace (which is this method, we don't want that)
        for (var i = 0; i < stackTrace.length; i++) {
          if (stackTrace[i] == 'a' && stackTrace[i + 1] == 't' && stackTrace[i + 2] == ' ') {
            var startIndex = i;
            for (var j = startIndex + 1; j < stackTrace.length; j++) {
              if (stackTrace[j] == 'a' && stackTrace[j + 1] == 't' && stackTrace[j + 2] == ' ') {
                var endIndex = j;
                //found beginning and end of this part, remove it
                stackTrace = th.strSplice(stackTrace, i, j);
                break;
              }
            }
            break;
          }
        }

        //then replace all 'at's with list elements, and convert to link spans
        returnObj.objTrace = stackTrace.split(/at /gm);
        stackTrace = th.linkify(stackTrace.replace(/at /gm, '</span><span>'));
      }
      else if (th.BrowserInfo.safari || th.BrowserInfo.ffox) {
        //this seems to kind of work for both
        //turn spaces into list elmt boundaries, linkify, and replace at signs with html entities, just for the lulz
        returnObj.objTrace = stackTrace.split(/\s/gm);
        stackTrace = th.linkify('<li>' + stackTrace.replace(/\s/gm, '</li><li>')).replace(/\@/gm, '&commat;');

        //again, look for the first part of the trace (which is this method, we don't want that)
        for (var i = 0; i < stackTrace.length; i++) {
          if (stackTrace[i] == '<' && stackTrace[i + 1] == '/' && stackTrace[i + 2] == 'l') {
            var index = i;
            //found end of this part, remove it
            stackTrace = th.strSplice(stackTrace, 0, index);

            break;
          }
        }
      }

      returnObj.htmlTrace = stackTrace;
      return returnObj;
    },

    //this is where everything happens
    interceptConsole: function (method) {
      var original = console[method];
      console[method] = function (message, stackTrace) {
        // alt: var message = Array.prototype.slice.apply(arguments).join(' ');
        //create an Error and get its stack trace and format it
        var stackTraceOrig;
        try { throw new Error(); } catch(e) { stackTraceOrig = e.stack; }
        if (stackTrace === undefined && stackTraceOrig) {
          //if no stacktrace defined (window.onerror defines one), use the generated one
          stackTrace = MobileConsole.stackTraceFormat(stackTraceOrig);
        }
        //Handle the new console logging
        MobileConsole.consoleDiv.prototype.theConsole(method, message, stackTrace, stackTraceOrig);
        //==========================================================
        //make sure we still call the original method
        original.call(console, message);
      };
    },

    init: function (autorun) {
      'use strict';
      var th = this;
      //don't go when we have already built it
      if (th.consoleDiv !== undefined) { return; }
      //build the console DIV
      th.consoleDiv = th.buildConsole();
      //attach prototype to the console (and take over console events)
      th.consoleDiv.prototype = new th.MobileConsole();
      //wait for load if autorun is enabled and attach console to body
      if (autorun && typeof docReady === 'function') {
        docReady(th.attachConsole);
      } else {
        //if no autorun: attach the built console
        th.attachConsole();
      }
      console.log('MobileConsole initialized. v' + MobileConsole.Version);
      console.log('Running on ' + navigator.userAgent.toLowerCase());

      //return the built console
      return th.consoleDiv;
    }
  };

  if (MobileConsole.Options.AutoRun) {
    MobileConsole.init(true);
  } else {
    console.warn('MobileConsole loaded but not displaying, AutoRun disabled. To initialize, run MobileConsole.init();');
  }
} else {
  //there is no console. Throw error.
  throw Error('No window.console available, MobileConsole can not run on this ' + ((document.querySelectorAll === undefined) ? '(old)' : '') + ' browser (' + navigator.userAgent.toLowerCase() + ').');
}