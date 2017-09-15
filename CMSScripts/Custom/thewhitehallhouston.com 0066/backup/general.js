// JavaScript Document
var jQuery = jQuery.noConflict();
jQuery(document).ready(function(jQuery){
	jQuery(".selectbox").selectbox({
        hide_duplicate_option: true
    });	
	jQuery('.meeting-content').on('click', 'li', function(){
        jQuery('.meeting-content ul li').removeClass('active');
        jQuery(this).addClass('active');
    });
    jQuery(".book-btn").click(function() {
        jQuery(".select-option").slideToggle();
        //alert('click');
        jQuery(".select-option").css('overflow','');
        jQuery('header').toggleClass('header-active');
      // jQuery("header").css("z-index","987");
        //jQuery("header").css("z-index","9987");
       // jQuery("nav-bg").css("top","137px");
        //jQuery("header-right").css("padding-top","0px");
    }); 

    // add classes to main menu on page load
    jQuery("#menuElem").addClass("main-nav enumenu_ul menu");
    // call responsive menu
    jQuery('#menuElem').responsiveMenu({
    //jQuery('.enumenu_ul').responsiveMenu({
        menuIcon_text: 'Menu',
        menuslide_overlap: true,
        menuslide_direction: 'left',
        //onMenuopen: function() {},
        //canvas: jQuery('#form'),
        //activeClass: 'HighLighted',
        //trigger: jQuery('#menu-toggle'),
    });

    jQuery('.img-box .img-bg').each(function () {
        jQuery(this).find('img').addClass('bannerimage');
        var imgSrc = jQuery(this).find('.bannerimage').attr('src');
        imgSrc = "url(" + imgSrc + ")";
        jQuery(this).css("background-image", imgSrc);
    });
    jQuery('.bxslider li').each(function () {
        jQuery(this).find('img').addClass('bannerimage');
        var imgSrc = jQuery(this).find('.bannerimage').attr('src');
        imgSrc = "url(" + imgSrc + ")";
        jQuery(this).css("background-image", imgSrc);
    });
});

jQuery(window).load(function() {
     jQuery("body").css('opacity','1');
});
 
jQuery(document).ready(function(){
    var getImageSrc = jQuery('.imageDiv img').attr('src');
    jQuery('.ftr-top').css('background-image', 'url(' + getImageSrc + ')');
    jQuery('.imageDiv').remove();
    
    var getImageSrc = jQuery('.imageDiv1 img').attr('src');
    jQuery('.ftr-top1').css('background-image', 'url(' + getImageSrc + ')');
    jQuery('.imageDiv1').remove();
    
    var getImageSrc = jQuery('.event-img img').attr('src');
    jQuery('.event-right').css('background-image', 'url(' + getImageSrc + ')');
    
    var getImageSrc = jQuery('.box-bg1 img').attr('src');
    jQuery('.box-img1').css('background-image', 'url(' + getImageSrc + ')');
    jQuery('.box-bg1 img.hide-bg').remove();
    
    var getImageSrc = jQuery('.box-bg2 img').attr('src');
    jQuery('.box-img2').css('background-image', 'url(' + getImageSrc + ')');
    jQuery('.box-bg2 img.hide-bg').remove();
    
    var getImageSrc = jQuery('.box-bg3 img').attr('src');
    jQuery('.box-img3').css('background-image', 'url(' + getImageSrc + ')');
    jQuery('.box-bg3 img.hide-bg').remove();
    
    var getImageSrc = jQuery('.box-bg4 img').attr('src');
    jQuery('.box-img4').css('background-image', 'url(' + getImageSrc + ')');
    jQuery('.box-bg4 img.hide-bg').remove();
});

jQuery(document).ready(function(jQuery){
	var main_slider = jQuery('.banner1').find('.bxslider').bxSlider({
        slideMargin:0,
        auto: true,
        pause: 3000,
        mode:"fade",
        touchEnabled: true,
        tickerHover: true,
    });
	jQuery('#main-next').click(function(){
		main_slider.goToNextSlide();
		return false;
	});
	jQuery('#main-prev').click(function(){
		main_slider.goToPrevSlide();
		return false;
	});
    jQuery('.banner2').find('.bxslider').bxSlider({
        slideMargin:0,
        auto: true,
        pause: 3000,
        mode:"fade",
        touchEnabled: true,
    });
    jQuery('.slider-area').find('.bxslider').bxSlider({
        slideMargin:0,
        auto: true,
        pause: 3000,
        mode:"fade",
        touchEnabled: true,
    });
    //jQuery('.bx-controls-direction > a').attr('href', '#');
});
jQuery(window).resize(function() {
	//jQuery('.banner .bxslider').find('>li').height(jQuery('.banner').outerHeight());
});

var tweetheight = jQuery("header").height();  
jQuery(document).ready(function(){
    jQuery('a.top-arrow[href^="#"]').on('click',function (e) {
        e.preventDefault();
        var target = this.hash;
        var jQuerytarget = jQuery(target);
        jQuery('html, body').stop().animate({
            'scrollTop': jQuerytarget.offset().top - tweetheight
        }, 900, 'swing');
    });
});   
jQuery(window).resize(function() {
    var tweetheight = jQuery("header").height();  
    jQuery('a.top-arrow[href^="#"]').on('click',function (e) {
        e.preventDefault();
        var target = this.hash;
        var jQuerytarget = jQuery(target);
        jQuery('html, body').stop().animate({
            'scrollTop': jQuerytarget.offset().top - tweetheight
        }, 900, 'swing');
    });
});

// Custom JS
jQuery(function(){
    //jQuery('.meeting-content > ul').removeAttr('id','menuElem');
    jQuery('.meeting-content > ul').attr('id','menu');
});

/*window.addEventListener('load', function() {
    // add classes to main menu on page load
    jQuery("#menuElem").addClass("main-nav enumenu_ul menu");
}, false);*/

jQuery(function(){
    /*
    jQuery("#menuElem").addClass("main-nav enumenu_ul menu desk");
    jQuery(".enumenu_container > .main-nav > a").addClass("firstLevel menubelow");
    jQuery(".menu-icon").click(function() {
        jQuery("body").addClass("menuOverlap slidemenuLeft mob menu-open");
        if (jQuery(this).hasClass("active")) {
            jQuery(this).removeClass("active")
            jQuery("body").removeClass("menu-open");
        } else {
            jQuery(this).addClass("active")
            jQuery("body").addClass("menu-open");
        }
    });
    */
});

 //-- Site Map
jQuery(function() {
    jQuery('*').click(function(e) {
        var target = jQuery(e.target);
        if (target.hasClass('sitemap-toggle')) {
            e.preventDefault();
            e.stopPropagation();
            if (jQuery('.sitemap-float').is(':visible')) {
                jQuery(".sitemap-float").fadeOut(500);
            } else {
                jQuery(".sitemap-float").fadeIn(500);
            };
        } else {
            if (jQuery('.sitemap-float').is(':visible') && !target.hasClass('sitemap-float') && !jQuery('.sitemap-float').has(target).length > 0) {
                if (!target.hasClass('.sitemap-float')) {
                    jQuery('.sitemap-float').fadeOut(500);
                };
            };
        };
    });
});  
//-- Site Map Position
jQuery('footer .copy-right .main .right ul').append('<li><a href="#" class="sitemap-toggle">Site Map</a></li>');
//  Sitemap ENDS 

jQuery(function(){
    jQuery(window).resize();
    
    var widthnow = jQuery(window).innerWidth();
    //alert("This is the width" + widthnow");
    // jQuery(window).resize();
    if(widthnow < 1040){
        jQuery(".menu-box").click(function(){
            jQuery("#menuElem").addClass("mob");
            // alert("added");
            jQuery("#menuElem").removeClass("desk");
            // alert("remove");
            
            jQuery("#menuElem > li > a").addClass("firstLevel menubelow");
            //next add menubelow
            jQuery("menuElem + ul").addClass("sb-menu");
            //var widthnow = jQuery(window).innerWidth();
            //console.log("This is the width" + widthnow");
            //  if(widthnow < 1040){
            //  $("#menuElem").removeClass("desk");
            // $("#menuElem").addClass("mob");
            // console.log("ROmve class");
        });
    }
});




//--Overlay for Marketo Forms
    // Function for disabling main page scrolling
    function disablePageScroll() {
        if (!jQuery('html').hasClass('noscroll')) {
            if (jQuery(document).height() > jQuery(window).height()) {
               var scrollTop = (jQuery('html').scrollTop()) ? jQuery('html').scrollTop() : jQuery('body').scrollTop();
               jQuery('html').addClass('noscroll').css('top',-scrollTop);
            };
        };
    };

    // get query string
    function getQuery(q) {
	    return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
	};

    // Function for enabling main page scrolling
    function enablePageScroll() {
        var scrollTop = parseInt(jQuery('html').css('top'));
        jQuery('html').removeClass('noscroll');
        jQuery('html,body').scrollTop(-scrollTop);
    };

	// Function for auto-centering the overlay vertically
	function centerVertically() {
		jQuery('.formOverlay').css({
			'top' : '50%',
			'margin-top' : -jQuery('.formOverlay').height()/2
		});
	};

	// Open overlay - Iframe; e.g. Calendar forms, etc.
	jQuery('a.openOverlay, li.openOverlay > a').live('click',function(e) {
		var overlay = jQuery('<div class="formOverlayWrapper"><div class="formOverlay"><div class="formOverlayClose"><i class="fa fa-times"></i></div><div class="formOverlayContent" /></div></div>'),
			href = jQuery(this).attr('href'),
			iframe = "<iframe src='" + href + "' allowtransparency='yes' frameborder='0' scrolling='yes' width='100%'></iframe>";
		e.preventDefault();
		disablePageScroll();
		// Create overlay div and fill with iframe content, then fade in
		jQuery('body').append(overlay);
		overlay.find('.formOverlayContent').html(iframe);
		overlay.fadeIn(500);
		centerVertically();
		jQuery(window).bind('resize',centerVertically);
		// Bind click event for closing overlay
		jQuery(document).bind('click',closeOverlayOnOutsideClick);
	});

	// Open overlay - Modal popup message - denied access via ?no-access=true
    //var no_access = /\?no-access\=|&no-access\=/i.test(location.href));
    if(getQuery('no-access') == 'true'){
        jQuery(function() {
            var overlay = jQuery('<div class="formOverlayWrapper variableHeight"><div class="formOverlay"><div class="formOverlayClose"><i class="fa fa-times"></i></div><div class="formOverlayContent" /></div></div>'),
                div = "<div id='content'><h2 class='denied'>You currently do not have access to this area. Please contact the system administrator.</h2></div>";
            //e.preventDefault();
            disablePageScroll();
            // Create overlay div and fill with iframe content, then fade in
            jQuery('body').append(overlay);
            overlay.find('.formOverlayContent').html(div);
            overlay.fadeIn(500);
            centerVertically();
            jQuery(window).bind('resize',centerVertically);
            // Bind click event for closing overlay
            jQuery(document).bind('click',closeOverlayOnOutsideClick);
        });
    }

	// Close function
	function closeOverlay() {
		enablePageScroll();
		jQuery('.formOverlayWrapper').fadeOut(500, function()
		{
			jQuery('.formOverlayWrapper').remove();
			jQuery(window).unbind('resize',centerVertically);
		});
		// Unbind click event for closing overlay
		jQuery(document).unbind('click',closeOverlayOnOutsideClick);
	};

	// Close on click
	jQuery('.formOverlayWrapper .close').live('click',function(e) {
		e.preventDefault();
		closeOverlay();
	});

	// Close on click outside of box
	function closeOverlayOnOutsideClick(e) {
		if (jQuery('.formOverlayWrapper').is(':visible')) {
			var ele = jQuery(e.target);
			if (!ele.hasClass("formOverlay"))
			{
				closeOverlay();
			};
		};
	};



//add blog to the footer nav
jQuery(function(){
  //alert("adding blog to footerr");
    jQuery(".footer-menu #menuElem").append("<li><a href='/blog/'>Blog</a></li>");
  });


//load video when click 
jQuery(function(){
	jQuery(".video2").click(function(){
		  //alert("test");
		var videolink = '<div class="video-container"><iframe width="100%" height="351" src="https://www.youtube.com/embed/Lrfm7CiyKyc?rel=0&showinfo=0&autoplay=1" frameborder="0" allowfullscreen></iframe>';
		jQuery(".video2").hide();
		jQuery(".tube").html(videolink);
	});
});


//add class to fixed footer nav
jQuery(function(){
     jQuery(".fixed-ftr-wrapper > #menuElem").addClass("fixed-ftr");
  
      });
});


 




