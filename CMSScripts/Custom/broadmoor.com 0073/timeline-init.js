
(function() {
	var BM = {},
		win = jQuery(window),
        mobile_width = 750,
        mobile_width2 = 1155;
    
    // init ALL OnDomReady functions
    BM.initOnDomReady = function() {
        //var timeline_json = make_the_json(); // you write this part
        var timeline_json = timlineJSON; // you write this part
        // two arguments: the id of the Timeline container (no '#')
        // and the JSON object or an instance of TL.TimelineConfig created from
        var options = {
            //hash_bookmark: false,
            initial_zoom: 2,
            //height: function(){
                //this._el.container.offsetHeight
                //console.log(this);
            //},
            //height: 5,
            //start_at_end: true,
            //default_bg_color: "",
            //is_embed: true,
            //is_full_embed: true,
            //scale_factor: 4,
            //marker_padding: 700,
            //timenav_height: 150,
            //timenav_height_percentage: 10,
            //timenav_mobile_height_percentage: 100,
            //optimal_tick_width: 5,
            //font: 'Default',//'Arvo-PTSans',
            slide_default_fade: '20%',
        }
        // a suitable JSON object
        window.timeline = new TL.Timeline('timeline-embed', timeline_json, options);
      
        // quick adjustments
        //BM.quickAdjustments(); 
    };

    // Quick Adjustments
    BM.quickAdjustments = function() {
        var tlSliderHeight = jQuery('.tl-storyslider').css('height');
        var tlNavHeight = jQuery('.tl-timenav').height() - jQuery('.tl-timeaxis-background').height();
      
        if (viewport() > mobile_width2) jQuery('.tl-timenav').addClass('transparent-light-bg');
        else jQuery('.tl-timenav').removeClass('transparent-light-bg');
      
        var min_height = (viewport() > mobile_width2) ? jQuery('.tl-storyslider').parent().height() + 'px' : 'initial';
        //var min_height = (viewport() > mobile_width2) ? parseInt(tlSliderHeight + tlNavHeight) + 'px' : 'initial';
        jQuery('.tl-storyslider').css('min-height', min_height);
      
        var margin_top = (viewport() > mobile_width2) ? (-parseInt(tlNavHeight) + 'px') : 0;
        jQuery('.tl-slide-content').css('margin-top', margin_top); 
        /*
        console.log(tlSliderHeight, tlNavHeight);
        console.log('viewport(): ' + viewport());
        console.log('min_height: ' + min_height);
        console.log('margin_top: ' + margin_top);
        */
    };
    
    
    // init ALL OnLoad & OnResize functions
    BM.initOnLoadAndOnResize = function() {
        //
        var win_width = win.width(),
            win_height = win.height(),
            top_height = jQuery('header').length ? jQuery('header').outerHeight() : 0,
            height = win_height - top_height,
            timeline_embed = jQuery('#timeline-embed'),
            timeline_embed_height = (viewport() > mobile_width2) ? height : timeline_embed.height();
        timeline_embed.css('height', timeline_embed_height + 'px');
        /*
        console.log(location.pathname);
        console.log(top.length);
        console.log(nav_placeholder.length);
        console.log(win_height);
        console.log(top_height);

        console.log(height);
        */
        console.log('timeline_embed_height: ' + timeline_embed_height);
    };
    
    /***************/
    /** BEGIN OF DOC.READY FUNCTION **/
    /***************/
    document.addEventListener('DOMContentLoaded', function(){
        //BM.initOnDomReady();
        BM.initOnLoadAndOnResize();
    }, false);
    
    /***************/
    /** BEGIN OF WINDOW.LOAD FUNCTION **/
    /***************/
    window.addEventListener('load', function(){
        //BM.initOnLoad();
        //BM.initOnLoadAndOnResize();
        BM.initOnDomReady();
        BM.quickAdjustments();
    }, false);
    
    /***************/
    /** BEGIN OF WINDOW.RESIZE FUNCTION **/
    /***************/
    var resizeTimer;
    window.addEventListener('resize', function(){
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function(){
            BM.quickAdjustments();
            BM.initOnLoadAndOnResize();
        }, 300);
    }, false);

})(jQuery);
