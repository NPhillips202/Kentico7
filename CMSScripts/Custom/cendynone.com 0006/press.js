// Old function for showing 3 listings and then displaying all
//jQuery(function() {
//    // Select all but first 3 listings
//    var listings = jQuery('.pressReleaseListing:gt(2)');
//    if (listings.length > 0) {
//        // Wrap in a div and add a 'more' button
//        listings.wrapAll('<div class="pressHidden"></div>');
//        jQuery('.content-sub').append('<div class="moreBtn"></div>');
//    } else {
//        return false;
//    };
//    // Show more releases
//    jQuery('.moreBtn').on('click', function(e) {
//        e.preventDefault();
//        jQuery('.pressHidden').slideDown(400);
//        jQuery(this).fadeOut(400);
//    });
//});

// New function for scrolling through 3 listings at a time
jQuery(function() {
    // Wrap each 3 in a div
    var listings = jQuery('.pressReleaseListing');
    for (var i=0; i < listings.length; i+=3) {
        listings.slice(i,i+3).wrapAll('<div class="pressReleaseListingWrapper"></div>');
    };
    
    if (listings.length > 3) {
        // If more than 3, append next/prev buttons and hide all but the first 3
        jQuery('.pressReleaseListingWrapper').not(':eq(0)').hide();
        jQuery('.content-sub').append('<div class="nextBtn"></div>');
        jQuery('.content-sub').append('<div class="prevBtn"></div>');
        showButtons();
    } else {
        // Else, end function
        return false;
    };
    
    // Show next 3
    function nextBtn() {
        jQuery('.nextBtn').unbind('click');
        var current = jQuery('.pressReleaseListingWrapper:visible');
        current.slideUp(600);
        current.next().slideDown(600, function (){
            showButtons();
            jQuery('.nextBtn').bind('click',nextBtn);
        });
    };
    jQuery('.nextBtn').on('click', function(e) {
        e.preventDefault();
        nextBtn();
    });
    
    // Show previous 3
    function prevBtn() {
        jQuery('.prevBtn').unbind('click');
        var current = jQuery('.pressReleaseListingWrapper:visible');
        current.slideUp(600);
        current.prev().slideDown(600, function() {
            showButtons();
            jQuery('.prevBtn').bind('click',prevBtn);
        });
    };
    jQuery('.prevBtn').on('click', function(e) {
        e.preventDefault();
        prevBtn();
    });
    
    // Show next/prev buttons appropriately
    function showButtons() {
        var current = jQuery('.pressReleaseListingWrapper:visible');
        if (current.index() == 0) {
            jQuery('.prevBtn').hide();
            jQuery('.nextBtn').show();
        } else if (current.index() == jQuery('.pressReleaseListingWrapper').length - 1) {
            jQuery('.prevBtn').show();
            jQuery('.nextBtn').hide();
        } else {
            jQuery('.prevBtn').show();
            jQuery('.nextBtn').show();
        };
    };
});