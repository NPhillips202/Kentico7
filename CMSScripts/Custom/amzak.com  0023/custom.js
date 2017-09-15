
/*
====================================================================================================
@name			Amzak - custom.js
@version		1.0.0
@author			Les Fleurimond / Cendyn/ONE
@author-uri		http://cendynone.com
@copyright		2014 Les Fleurimond / Cendyn/ONE
====================================================================================================
*/
//console.log(jQuery('#nav .main-nav ul').height());
//main_nav = jQuery('#nav .main-nav').css('height', jQuery('#nav .main-nav ul').height()),


// set vars
var win = jQuery(window),
    wrapper = jQuery('#wrapper'),
	header = jQuery('#header'),
	header_wrapper = jQuery('<div />').attr('id','header-wrapper'),
	fixed_header_wrapper = header_wrapper.wrapInner(header).prependTo(wrapper),
	nav_placeholder = jQuery('#nav-placeholder').addClass('hide').css('width','100%'),
	nav_bar = jQuery('#nav-bar'),
	navs = jQuery('.nav ul'),
	first_lis = navs.find('> li:first').addClass('first'),
	last_lis = navs.find('> li:last').addClass('last'),
	main_nav = nav_bar.find('#main-nav'),
	main_nav_sub = main_nav.find('ul > li').has('ul').addClass('submenu'),
	main_nav_sub = main_nav.find('ul > li').has('ul').addClass('submenu').append('<i class="fa fa-caret-down hide" />'),
    
    mobile_nav_btn = jQuery('#mobile-nav-btn'),	
	utility_nav = nav_bar.find('#utility-nav'),
	language_nav_item = utility_nav.find('li:first').addClass('language'),
	family_foundation_nav_item = utility_nav.find('li:last').addClass('family-foundation'),
	//slideshow = jQuery('#slideshow'),
	sidebar = jQuery('#sidebar'),
	sidebar_box = sidebar.find('> .box:last').addClass('last');//,
	//footer = jQuery('#footer');

jQuery(function() {
//jQuery(window).bind("load", function() {
	
	// Apply anti-aliasing fix
	antiAliasingFix();
	
	// Clone Family Foundation list item
	family_foundation_nav_item.clone().appendTo(main_nav.find('> ul'));
	
	// Fixed header, mobile sub navigation and append language icons
	headerResizeEvents();
	//jQuery(document).load(jQuery(window).bind('resize', headerResizeEvents));
	jQuery(window).bind('ready resize', headerResizeEvents);
  
	
		// Main sub-nav click event
			main_nav_sub.find('> i').on('click', function() {
			//jQuery('.mobile > i').on('click', function() {
				if ( jQuery(this).hasClass('fa-caret-down') ) {
					jQuery(this).addClass('fa-caret-up');
					jQuery(this).removeClass('fa-caret-down');
				} else {
					jQuery(this).addClass('fa-caret-down');
					jQuery(this).removeClass('fa-caret-up');
				}
                
				var sub_item = jQuery(this).parent();
              
              //  console.log('Sub_item: ' + sub_item.find('> ul').closest('li'));
              
              
              
                sub_item.find('> ul').slideToggle(300);
				sub_item.toggleClass('target');
              
             // console.log(sub_item.attr('class'));

				return false;
			});
     
    /*win.resize(function() {
        headerResizeEvents();
    }).resize(); // trigger resize handlers*/
	
	// Header fixed and scroll event
	jQuery(window).scroll(headerFixAndScroll);
	//jQuery(window).bind('ready scroll', headerFixAndScroll);
	
	// Language changes to click event for mobile
	utility_nav.find('li.language').find('> a.mobile').click(function() {
		var sub_item = jQuery(this).closest('li');
		sub_item.find('ul').slideToggle(300);
		sub_item.toggleClass('target');
		
		//console.log(sub_item.attr('class'));
		return false;
	});
	
	// Mobile navigation toggle click event
	mobile_nav_btn.click(function(){
		//main_nav.slideToggle(300, 'linear', function() { 
			if ( header.hasClass('add-family-foundation') ) {
				header.removeClass('add-family-foundation');
				main_nav.fadeOut(300).css('overflow','hidden');
			} else {
				header.addClass('add-family-foundation');
				main_nav.fadeIn(300).css({'overflow':'auto','display':'block'});
			}
		//});
		return false;
	});	
	
	// Nav items Off-Screen detection and fix	
	/*function isFullyVisible (elem) {
		var off = elem.offset();
		var et = off.top;
		var el = off.left;
		var eh = elem.height();
		var ew = elem.width();
		var wh = window.innerHeight;
		var ww = window.innerWidth;
		var wx = window.pageXOffset;
		var wy = window.pageYOffset;
		return (et >= wy && el >= wx && et + eh <= wh + wy && el + ew <= ww + wx);  
	}
	navs.find('li').on('mouseenter mouseleave', function (e) {
		var elm = jQuery(this).find('ul');
		if(elm.length) {
			console.log(isFullyVisible(elm));
			//if(!isFullyVisible(elm))
				//elm.addClass('edge');
		}
	});*/
	
	// randomize slide in slideshow
	jQuery('.slideshow').randomize('div.slide');
	
	// init slideshow
	//slideshow.cycle({ 
	jQuery('.slideshow').cycle({ 
		fx: 'fade', 
		slideResize: false,
		speed: 900, 
		timeout: 6000,
		cleartype: true, // IE fix
		cleartypeNoBg: true,
		//pagerEvent: 'mouseover', 
		pauseOnPagerHover: true, 
		//pager: '#slide-nav' 
		next: '#next', 
		prev: '#prev' 
	});
  
  if (jQuery('.team-circles').length > 0) {
    jQuery('.sub').removeClass('sub');
  };
  
  if (jQuery('#sidebar').length > 0) {
    jQuery('#content').addClass('c7');
  };
  
  /*
  jQuery('#main-nav > ul > li > a').html('investment-groups').css({'background-color':'#fff','color':'#002b66'});
  */
});

/***************/
/** Functions **/
/***************/




// Header Fixed and Scroll Event
function headerFixAndScroll() {
	var shrinkHeader = 200,
		//navOffset = header[0].offsetTop,
		//docScroll = jQuery(window).scrollTop(),
		win_scroll = getCurrentScroll();
	if ( win_scroll >= shrinkHeader ) {
	//if(docScroll > navOffset) {
		header.addClass('fixed animated fadeInDownBig');
		nav_placeholder.removeClass('hide');
	} else {
		header.removeClass('fixed fadeInDownBig');
		nav_placeholder.addClass('hide');
	}
}

// Sub Menu and Utility Nav and create Lang Icons
function headerResizeEvents() {
	if (viewport() < 681) {	
		var header_height = header.height() + 2;
		header_wrapper.css('height',header_height);
		nav_placeholder.css('height',header_height);
		
		// sub nav
		main_nav_sub.addClass('mobile');
		main_nav_sub.find('i').removeClass('hide');
		
		// lang icons
		utility_nav.find('li.language').find('> a').addClass('mobile');		
		language_nav_item.find('> a').html('<i class="fa fa-globe"></i>');
	} else {
		// fixed header
		var header_height = 'auto';
		header_wrapper.css('height',header_height);
		nav_placeholder.css('height',header_height);
		
		// sub nav
		main_nav_sub.removeClass('mobile');
		main_nav_sub.find('i').addClass('hide');
		
		// lang icons
		if ( utility_nav.find('li.language').find('> a').hasClass('mobile') ) {
			utility_nav.find('li.language').find('> a').removeClass('mobile');	
		}
		if ( language_nav_item.find('> a i.fa-globe').length == 1 ) {
			language_nav_item.find('> a').html('Language <i class="fa fa-caret-down"></i>');
		}
		if ( 
		language_nav_item.find('> a i:not(.fa-caret-down)').length == 1 ||
		language_nav_item.find('> a i').length == 0 
		) {
			language_nav_item.find('> a').append(' <i class="fa fa-caret-down"></i>');
		}
	}
	
}

// Set Viewport
function viewport() {
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;	
    return x;
}

// Get CurrentScroll
function getCurrentScroll() {
	return window.pageYOffset || document.documentElement.scrollTop;
}

// 
function antiAliasingFix() {
	// ref: https://gist.github.com/dalethedeveloper/1846552
	var shadowify = function (e) {
		var color = jQuery(e).css('color'),
			size  = jQuery(e).css('font-size');
	
		// Got Hex color?  Modify with: http://stackoverflow.com/questions/1740700/get-hex-value-rather-than-rgb-value-using-jquery
		if ( color.search('rgb') == -1 )
			return;
	
		var rgba = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
		jQuery(e).css('text-shadow', '0 0 1px rgba('+rgba[1]+','+rgba[2]+','+rgba[3]+',1)');
	
	// To use calculated shadow of say, 1/15th of the font height 
	//var fsize = size.match(/(\d+)px/);
	//jQuery(e).css('text-shadow', '0 0 '+(fsize[1]/15)+'px rgba('+rgba[1]+','+rgba[2]+','+rgba[3]+',0.3)')
	}	
	
	if(navigator.platform.indexOf('Win') != -1)
		jQuery('.menu a,#header_right a,.event_title a, h1 a, h2 a').each(function(){shadowify(this)});
		//^ Your appropriately targeted list of elements here ^	
}

// user-click outside event
(function($){
	$.fn.outside = function(ename, cb){
      	return this.each(function(){
        	var $this = $(this),
            	self = this;
			$(document).bind(ename, function tempo(e){
              	if(e.target !== self && !$.contains(self, e.target)){
                	cb.apply(self, [e]);
                  	if(!self.parentNode) $(document.body).unbind(ename, tempo);
              	}
          	});
      	});
  	};
}(jQuery));

(function($) {
	$.fn.randomize = function(childElem) {
		return this.each(function() {
			var $this = $(this);
			var elems = $this.children(childElem);
			elems.sort(function() { return (Math.round(Math.random())-0.5); });  
			$this.detach(childElem);
			for(var i=0; i < elems.length; i++)
				$this.append(elems[i]);      
		});    
	}
})(jQuery);


//Site Map
jQuery(function() {
    jQuery(".sitemap-toggle").live('click',function(e) {
        e.preventDefault();
        if (jQuery('.sitemap-float').is(':visible')) {
            jQuery(".sitemap-float").fadeOut(500);
        } else {
            jQuery(".sitemap-float").fadeIn(500);
        };
    });
});