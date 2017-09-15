//--Header Height
    function headerHeight() {
        var height = jQuery('header').outerHeight()
        jQuery('#wrapper').css('marginTop',height+'px');
    }
    jQuery(function() { headerHeight(); });
    jQuery(window).ready(function() { // Late font loading workaround
        setTimeout(function(){
            headerHeight();
        }, 200);
    });
    jQuery(window).resize(function() { headerHeight(); });

//--Mobile navigation slideout menu
    jQuery(function() {
        jQuery('#mainNav').mmenu({
            navbar: {
                title: ''
            },
            extensions: [
                "bocatrans", 
                "border-full",
                "effect-slide-menu",
                "pageshadow"
            ],
            offCanvas: {
                position: "right",
            },
            counters: true,
            labels: true
        }, {
            // Configuration
            clone: true,
            offCanvas {
                pageSelector: "#wrapper"
            }
        }).on('init', function(){
            var menu = jQuery('.mm-panel').first(),
                footerNav = jQuery('#footerNav ul li').not(':last');
            
            footerNav.clone().appendTo(menu.children('ul'));
        }).trigger( "init" );
    });

//--Site Map
    jQuery(function() {
        jQuery(".site-map a, .sitemap-close").click(function(e) {
            e.preventDefault();
            if (jQuery('.sitemap-float').is(':visible')) {
                jQuery(".sitemap-float").fadeOut(500);
            } else {
                jQuery(".sitemap-float").fadeIn(500);
            };
        });
    });