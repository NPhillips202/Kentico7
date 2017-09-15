/*!
 * classie v1.0.0
 * class helper functions
 * from bonzo https://github.com/ded/bonzo
 * MIT license
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */
(function(n){"use strict";function f(n){return new RegExp("(^|\\s+)"+n+"(\\s+|$)")}function e(n,u){var f=t(n,u)?i:r;f(n,u)}var t,r,i,u;"classList"in document.documentElement?(t=function(n,t){return n.classList.contains(t)},r=function(n,t){n.classList.add(t)},i=function(n,t){n.classList.remove(t)}):(t=function(n,t){return f(t).test(n.className)},r=function(n,i){t(n,i)||(n.className=n.className+" "+i)},i=function(n,t){n.className=n.className.replace(f(t)," ")}),u={hasClass:t,addClass:r,removeClass:i,toggleClass:e,has:t,add:r,remove:i,toggle:e},typeof define=="function"&&define.amd?define(u):n.classie=u})(window)