// Create Cookie
function createCookie(name,value) {
  var date = new Date();
  date.setTime(date.getTime()+(1*24*60*60*1000)); //1 day
  var expires = "; expires="+date.toGMTString();
  //document.cookie = name+"="+value+expires+"; path=/";
  document.cookie = name+"="+value+"; path=/"; // Expires on session end
}

// Call Cookie
//var CookieValue = readCookie();
function readCookie(name) {
  var nameEQ = name+"=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

// Get Querystring
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Generate cookie if querystrings exist in URL
if (getParameterByName('scid') !== null) { createCookie('scid',getParameterByName('scid')); }

// If cookie exists at any point, rewrite booking URLs
jQuery(function() {
  var scid = readCookie('scid'),
      reservationsUrlMatch = 'marriott.com/reservation', // If this is contained in the URL, rewrite it
      reservationsUrlMatch2 = 'marriott.com/meeting-event-hotels/group-corporate-travel/groupCorp.mi', // Secondary parameter for alternate booking links
      marriottTrackingURL = 'http://www.marriott.com/setSCtracking.mi';

  if (scid != null && scid.length > 0) {
    // Replace anchor and area tags
    jQuery('a, area').each(function() {
      var thisURL = jQuery(this).attr('href');

      if (thisURL.length > 0 && thisURL != null) { // Initial check so indexOf doesn't fail
        if (thisURL.indexOf(reservationsUrlMatch) > -1 || thisURL.indexOf(reservationsUrlMatch2) > -1) {
          var newURL = marriottTrackingURL + "?scid=" + scid + "&mid=" + encodeURIComponent(thisURL);
          jQuery(this).attr('href',newURL);
        };
      };
    });

    // Replace form tags
    jQuery('form').each(function() {
      var thisURL = jQuery(this).attr('action');

      if (thisURL.length > 0 && thisURL != null) { // Initial check so indexOf doesn't fail
        if (thisURL.indexOf(reservationsUrlMatch) > -1 || thisURL.indexOf(reservationsUrlMatch2) > -1) {
          var newURL = marriottTrackingURL + "?scid=" + scid + "&mid=" + encodeURIComponent(thisURL);
          jQuery(this).attr('href',newURL);
        };
      };
    });
  };
});