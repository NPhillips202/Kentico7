var $ = jQuery.noConflict();

// get query string
var getQuery = function(q) {
	return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
};

jQuery(document).ready(function($){
    //console.log("testing");
    
    if(getQuery('mock') == 'true' ) {
        //console.log("this is the mock");
        jQuery('#main-nav a, #sub-nav-side a ').each(function(index,value){
            //console.log($(this).attr('href',jQuery(this).attr('href') + '?mock=true'));
        });
    }
    
    
    // TEMP - rmeove
    //jQuery('a[href="/nashville-weddings2/"]').closest('li').remove();

});