// scripts.js (Springhill Suites Denver)
/**
 * Set default vars - We cache the Window object
 **/
var win = jQuery(window),
  doc = jQuery(document),
  ua = navigator.userAgent,
  _isMobile = window.matchMedia('only screen and (max-width: 767px)'),
  //isMobileDevice = (ua.match(/iPad/i) !== null || _isMobile.matches) ? true : false,
  //isMobileDevice = (ua.match(/iPad/i) || _isMobile.matches) ? true : false,

  htmlbody = jQuery('html, body'),
  html = jQuery('html'),
  body = jQuery('body'),
  wrapper = jQuery('#wrapper'),
  
  header = jQuery('#header'),
  header_top = jQuery('#header').find('.top'),
  header_spacer = jQuery('#header-spacer'),
  
  selectbox = jQuery('select.selectbox'),
  
  // add first and last classes to ul li items
  navs = jQuery('.navbar ul'),
  first_lis = navs.find('> li:not(".Label,.mobile"):first').addClass('first'),
  last_lis = navs.find('> li:not(".Label,.mobile,#booking-engine"):last').addClass('last'),
  
  // add first and last classes to .FormPanel table items
  form_panel = jQuery('.FormPanel'),
  first_tables = form_panel.find('> .EditingFormTable.half:first').addClass('first'),
  last_tables = form_panel.find('> .EditingFormTable.half:last').addClass('last'),
  
  minorAdjustments = function() {
    var vp = viewport();
    // console.log(header_top.css('margin-bottom'));
    // console.log(parseInt(header_top.outerHeight()));
    var addtnl_padding = (vp <= 991 && vp >= 767) ? header_top.outerHeight() + parseInt(header_top.css('margin-bottom')) : 0;
    //var addtnl_padding = _isMobile.matches ? header_top.height() : 0;
    header_spacer.css('height', header.height());
    //header_spacer.css('padding-top', header.height() + addtnl_padding);
    header.css('padding-bottom', addtnl_padding);
    //header_spacer.css( 'height', ( header.height() + header.css('padding-bottom') ) );
    //wrapper.css('margin-top',jQuery('#header').height());
    //wrapper.css('background-position-y',jQuery('#header').height());
    
    // mobile bottom margin
    var mm_email_signup = jQuery('.mm-menu .mm-navbar > .email-sign-up');
    if(mm_email_signup.length) {
      //console.log(mm_email_signup.outerHeight());
      //console.log(parseInt(mm_email_signup.css('padding-top')));
      //console.log(parseInt(mm_email_signup.css('padding-bottom')));
      var bottom_val = mm_email_signup.outerHeight() + parseInt(mm_email_signup.css('padding-top')) + parseInt(mm_email_signup.css('padding-bottom')) + 26;
      jQuery('.mm-hasnavbar-bottom-1 .mm-panel').css('bottom', bottom_val);
    };
    
    // Mainnav click event manipulation for mobile devices
    // more info: http://www.hnldesign.nl/work/code/mouseover-hover-on-touch-devices-using-jquery/
    if(isMobile.tablet){
      //jQuery('#main-nav').find('.navbar > ul > li').find('a').on("touchstart", function (e) {
      jQuery('#main-nav').find('.navbar > ul > li').children('a').on("click", function (e) {
        //'use strict'; //satisfy code inspectors
        var link = jQuery(this); //preselect the link
        if (link.hasClass('hover')) {
          return true;
        } else {
          link.addClass('hover');
          jQuery('#main-nav').find('.navbar > ul > li').children('a').not(this).removeClass('hover');
          e.preventDefault();
          return false; //extra, and to make sure the function has consistent return points
        };
      });
    };
  },
  
  minorAdditions = function() {   
    //
    //jQuery('#menu').children('ul').prepend('<li id="booking-engine" class="booking-engine"><a href="http://www.marriott.com/reservation/availability.mi?propertyCode=pitbr" target="_blank">Book Now</a></li>');
    //
    jQuery('#footer div.navbar:first-child ul').append('<li><a href="#" class="sitemap-toggle">Site Map</a></li>');
  },

  stickyMenu = function() {
    
    /**
    ref: http://www.sutanaryan.com/wpcp/Tutorials/fixed-menu-when-scrolling-page-with-CSS-and-jQuery/
    ref: http://www.sutanaryan.com/how-to-create-fixed-menu-when-scrolling-page-with-css-and-jquery/
    **/
    var _rys = jQuery.noConflict();
    //var orgElement = jQuery('#header .bottom');
    var orgElement = jQuery('#header');
    var orgElementPos = orgElement.offset();
    //var orgElementTop = orgElementPos.top + orgElement.height();
    var orgElementTop = orgElement.height();
    win.scroll(function () {
      //console.log(jQuery(this).scrollTop());
      //console.log(orgElementTop);
      //if (_rys(this).scrollTop() > 136) {
      if (jQuery(this).scrollTop() >= orgElementTop) {
        //orgElement.addClass("fixed-nav");
        body.addClass("fixed-nav");
        //console.log('added.');
      } else {
        //orgElement.removeClass("fixed-nav");
        body.removeClass("fixed-nav");
        //console.log('removed.');
      }
    }).scroll();
  
  },
  
  mmHeaderNav = function() {    
    // init mobile menu, ref: http://mmenu.frebsite.nl/documentation/options
    jQuery('#main-nav .navbar').mmenu({
      extensions: [
        "sage", 
        "border-full",
        "effect-slide-menu",
        "pageshadow"
      ],
      //classes: "mm-sage",
      //counters: true,
      //slidingSubmenus: false,
      labels: true,
      offCanvas: {
        position: "right",
      },
      "navbar": {
        "title": "Main Navigation"
            },
      "navbars": [
        {
          "position": "bottom",
          "content": [            
            jQuery('#header #top-nav .email-sign-up').clone().wrapInner('<div class="email-sign-up" />').html() + jQuery('#footer .social-nav').clone().wrapInner('<div class="social-nav" />').html(),
            /*"<a class='fa fa-envelope' href='#/'></a>",
            "<a class='fa fa-twitter' href='#/'></a>",
            "<a class='fa fa-facebook' href='#/'></a>"*/
          ],
          height: 2
        }
      ],
    }, {
      // configuration
      clone: true
    });
        
        // apply some adjustments for Kentico server
    jQuery('#ui-datepicker-div').closest('div').removeClass('mm-page mm-slideout');
    jQuery('#form').addClass('mm-page mm-slideout');
  },
  
  megaMenuAdjustment = function() {
  
    jQuery('#menu ul ul').each(function(index) {
      var ul = jQuery(this).addClass('mega-menu');
      //var ul = jQuery(this);
      var li = jQuery(this).find('>li');
      var li_len = li.length;
      
      //console.log(li.parent().parent().parent().find('>li>a').text());
      //console.log(li.closest('#menu>ul').find('>li>a').text());
      
      //if(li_len > 5 ) {
      if(li_len >= 4 ) {
        var ul2 = jQuery( '<ul class="mega-item mega-item1"></ul>' );
        var ul3 = jQuery( '<ul class="mega-item mega-item2"></ul>' );
        var ul_clone = ul.clone();
        ul_clone.find('>li').each(function(index) {
          
          //console.log(jQuery(this).html());
          //console.log(li.closest('#menu>ul>li>a').text());
          if(index >= 3) {
          //if(index >= 5 || li.parent().find('li>a').text() == 'Weddings & Events' && index >= 3 && li_len <= 7) {
          //if(index >= 5 && li_len > 9 || index >= 4 && li_len <= 7 || index >= 3 && li_len <= 5) {
          //if(index >= 3 && index < 7) {
          //if((index >= 4 && li_len%2 == 0) || (index >= 5 && li_len%2 == 1)) {
          //if( (li_len%2 == 1 && index >= 5) || (li_len >= 7 && index >= 4) ) {
            //console.log(jQuery(this).text());
            ul3.append( jQuery(this) );
            //return false;
          } else {
            ul2.append( jQuery(this) );
          }
        });
        var mega_item_wrap = jQuery('<div />').addClass('mega-menu col-2');
        mega_item_wrap.append(ul2);
        mega_item_wrap.append(ul3);
        ul.closest('li').append(mega_item_wrap);
        
        // Get rid of everything
        //ul.width(380).addClass('col-2 hide');
        //ul.addClass('hide');
        ul.remove();
        
        //jQuery(this).width(380).addClass('col-2');
        //jQuery(this).width(400);
      } else {
        jQuery(this).addClass('col-1');
        //jQuery(this).addClass('col-1');
        //jQuery(this).width(200);
      }
    }); 
    win.resize(function(){
      // http://jsfiddle.net/G7qfq/5/
      //jQuery('#menu ul li').on('mouseover', function (e) {
      jQuery('#menu ul li').on('mouseenter mouseleave', function (e) {
        //var dd_item = jQuery('ul:first, div:first').addClass('dd-item');
        //var elm = jQuery('div:first', this);
        //var dd_item = jQuery('ul:first, div:first').addClass('dd-item');
        var elm = jQuery('> ul, > div', this);
        
        //console.log(dd_item.find
        
        var off = elm.offset();
        if(off === null) return false;
        var l = off.left;
        var w = elm.width();
        
        //var docW = jQuery('#header .bottom').width();
        var docW = jQuery('#header .bottom .container .row').width();
        //var docW = jQuery('#main-nav').width();
        //var docW = jQuery('#menu').width();
        //var docW = jQuery('#menu > ul').width();
        
        //var docH = jQuery('#header .bottom').height();
        var docH = jQuery('#header .bottom .container .row').height();
        //var docH = jQuery('#main-nav').height();
        //var docH = jQuery('#menu').height();
        //var docH = jQuery('#menu > ul').height();

        var isEntirelyVisible = (l + w <= docW);
        
        if ( !isEntirelyVisible ) {
          //console.log('i\'m found...');
          jQuery(this).addClass('edge');
        } else {
          jQuery(this).removeClass('edge');
        }
      });
    }).resize();
  
  },
  
  subNav = function() {
    // Sub nav Click
    jQuery('#subnav-toggle').click(function(e) {
      e.preventDefault(); 
      jQuery('#subnav>.navbar:visible').stop().fadeOut(400, function() {
        jQuery(this).css('display','none');
        jQuery('#subnav-toggle').removeClass('close');
      });
      jQuery('#subnav>.navbar').not(":visible").stop().fadeIn(400, function() {
        jQuery(this).css('display','inline-block');
        jQuery('#subnav-toggle').addClass('close');
      });
    });
  },

  labelToPlaceholder = function() {
  
    //var selectors = '.nm_mc_form,.comment-form';
    //jQuery(selectors).find(":input[type='text'],textarea").each(function(index, elem) {
    jQuery(":input[type='text'],textarea").each(function(index, elem) {
        var eId = jQuery(elem).attr("id");
        var label = null;
        if (eId && (label = jQuery(elem).parents("form").find("label[for="+eId+"]")).length === 1) {
            jQuery(elem).attr("placeholder", jQuery(label).html());
            jQuery(label).remove();
        }
    });
  },
  
  initEvents = function() {
    //--Events
    var counter = 0;
    jQuery('.events .single-event').each(function() {
      counter++;
      if (counter >= 12) {
        jQuery(this).css('display','none');
      };
    });
    jQuery('.view-more-events').click(function(e) {
      e.preventDefault();
      var counter2 = 0;
      jQuery('.events .single-event').each(function() {
        if (jQuery(this).css('display') == 'none') {
          jQuery(this).fadeIn('slow');
        } else {
          counter2++;
          if (counter2 >= 12) {
            jQuery(this).css('display','none');
          } else {
            jQuery(this).css('display','block');
          };
        };
      });
    });
  },
  
  initSiteMap = function() {
    //--Site Map
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
  },
  
  slickSlider = function() {
    // Header Image Carousel
    var header_slides = jQuery('.slick-data'),
      header_slide_item = header_slides.find('div.image');
    //console.log(header_slides.length);
    //console.log(header_slide_item.length);
    if(header_slide_item.length) {
      // randomize slide items order
      header_slides.randomize('div.image');// .randomize('div.slick-slide');
      // init slider
      header_slides.slick({
        "slide": ">.slide",
        "lazyLoad": "progressive", 
        //"lazyLoad": "ondemand", 
        //"lazyLoad": false, 
        "infinite": true,
        "cssEase": "linear",
        "slidesToShow": 1, 
        "slidesToScroll": 1, 
        "fade": true, 
        "autoplay": true, 
        "autoplaySpeed": 7500, 
        "speed": 2500, 
        "mobileFirst": true, 
        "prevArrow": "<a href=# class=slick-prev>Prv</a>",
        "nextArrow": "<a href=# class=slick-next>Next</a>",
      });
    };    
    // Photo Gallery Carousel
    win.resize(function(){
      //jQuery('.simple-gallery').slick();
      var gallery = jQuery('.simple-gallery');
      var vp = viewport();
        //alert(vp);
      if(vp < 479) {
        // destroy slick slider then reInit
        /*if(gallery.hasClass('slick-initialized')) {
          gallery.slick('unslick');
        };*/
        
         if(simple-gallery.hasClass('slick-initialized')) {
          simple-gallery.slick('unslick');
        };
        // reInit slick slider
        gallery.slick({
          "slide": ">figure",
          "lazyLoad": "ondemand", 
          "slidesToShow": 1, 
          "slidesToScroll": 1, 
          //"fade": true, 
          "autoplay": false, 
          //"autoplaySpeed": 1500, 
          //"speed": 2500, 
          "mobileFirst": true,
          "centerMode": true,
          "centerPadding": '25px',
          "prevArrow": "<a href=# class='slick-prev fa fa-angle-left'>&nbsp</a>",
          "nextArrow": "<a href=# class='slick-next fa fa-angle-right'>&nbsp</a>",
        });
      } else {
        // destroy slick slider
        if(gallery.hasClass('slick-initialized')) {
          gallery.slick('unslick');
        };
      };
    }).resize();
  },
    
  bookingEngineToggle = function() {
    //jQuery('#booking-engine h3').on('click', function(){
    jQuery('#booking-engine > a').on('click', function(e){
      var vp = viewport();
      //console.log(_isMobile.matches);
      //if(_isMobile.matches){
      //console.log(viewport());
      if(vp > 740) {
        var form = jQuery('#booking-engine .form');
        if(form.is(':visible')) {
          jQuery('#booking-engine .form').css('display','none');
        } else {
          jQuery('#booking-engine .form').css('display','inline-block');
        };
        return false;
      } else {
        return true;        
      };
      return false;
      //e.preventDefault();
    });
    jQuery('#booking-engine .submit').on('click', function(){
      jQuery(this).addClass('m-progress');
      setTimeout(function(){ jQuery('#booking-engine .submit').removeClass('m-progress'); }, 3000);
      //return false;
      //e.preventDefault();
    });
  },
    
  selectBox = function() {

    // add mobile class
    win.resize(function(){
      var vp = viewport();
      // add .mobile class to #utility-nav
      //if(viewport() < 675) {
      if(vp < 740) {
        jQuery('#utility-nav').addClass('mobile');
      } else {
        jQuery('#utility-nav').removeClass('mobile');
      }
      //adjustSections
    }).resize();
    
    selectbox.selectbox({
      //effect: (jQuery('#utility-nav').is('.mobile')) ? 'fade' : 'slide',
      /*onOpen: function (inst) {       
        var sbOptions = jQuery('ul#sbOptions_' + inst.uid + '.sbOptions').addClass(inst.id + ' fixed-top-value');
        
        sbOptions.closest('#utility-nav.mobile').find('.sbOptions').each(function() {
          var height = jQuery(this).css('height', 'auto').height(),
            top_old = jQuery(this).css('top'),
            top_new = -(parseInt(height, 10)) + 6 + 'px',
            top = jQuery(this).css('top', top_new);
          
          jQuery(this).removeClass('fixed-top-value');
        });
      },
      onClose: function (inst) {
        var sbHolder = jQuery('#sbHolder_' + inst.uid);
        sbHolder.each(function() {
          jQuery(this).find('.sbInner').removeClass('sbClicked');
        });
      },*/
      onChange: function (val, inst) {
        var selected_val = jQuery(this).val();
        jQuery(this).find('option').attr('selected', false);
        jQuery(this).find('option[value="'+ selected_val +'"]').attr('selected', true).change();
      },
    });
    
    // set Select Box Holder var
    var sbHolder = jQuery('.sbHolder');
    
    // force overflow-x on selectbox in case text exceed width of parent box
    // wrap .sbToggle and .sbSelector with .sbWrapper
    /*sbHolder.each(function() {
      jQuery(this).addClass(jQuery(this).prev('select.selectbox').attr('id'));
      jQuery(this).find('>.sbToggle').addClass('sbInner');
      
      jQuery(this).find('>.sbSelector').addClass('sbInner');
      jQuery(this).find('>.sbInner').wrapAll('<span class="sbWrapper"></span>'); // css specified in styles.css
    });*/
    
    // add click event to .sbToggle to add .sbClicked class to target element
    sbHolder.click(function(){
      if(jQuery(this).find('.sbToggle').hasClass('sbToggleOpen')) {
        jQuery(this).find('.sbInner').addClass('sbClicked');
      }
    });
    
    // mobile device adjustments for selectbox
    if (_isMobile.matches) {
      //alert('mobile');
      selectbox.css('display','inline-block');
      jQuery('.sbHolder').addClass('hide');
    };
    
  },
  
  viewport = function() {
    var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight; 
    return x;
  },
  
  // Email Signup Submit functions
  submitEmailForm = function(input, value) {
    var email = input.val();
    //alert(email);
    if (email == value || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
      alert("Please enter a valid email address.");
      input.css( "border", "1px solid red" ).focus();
      return false;
    };
    document.location.href = ('/email-sign/?em=' + email);
  },
  
  // Create Google webfont script tag
  createWebfontScript = function(){
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  };

// random child elem
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

/**
 * isMobile.js v0.3.9 - https://github.com/kaimallea/isMobile
 *
 * A simple library to detect Apple phones and tablets,
 * Android phones and tablets, other mobile devices (like blackberry, mini-opera and windows phone),
 * and any kind of seven inch device, via user agent sniffing.
 *
 * @author: Kai Mallea (kmallea@gmail.com)
 *
 * @license: http://creativecommons.org/publicdomain/zero/1.0/
 */
(function (global) {

    var apple_phone         = /iPhone/i,
        apple_ipod          = /iPod/i,
        apple_tablet        = /iPad/i,
        android_phone       = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, // Match 'Android' AND 'Mobile'
        android_tablet      = /Android/i,
        amazon_phone        = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
        amazon_tablet       = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
        windows_phone       = /IEMobile/i,
        windows_tablet      = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, // Match 'Windows' AND 'ARM'
        other_blackberry    = /BlackBerry/i,
        other_blackberry_10 = /BB10/i,
        other_opera         = /Opera Mini/i,
        other_chrome        = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
        other_firefox       = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, // Match 'Firefox' AND 'Mobile'
        seven_inch = new RegExp(
            '(?:' +         // Non-capturing group

            'Nexus 7' +     // Nexus 7

            '|' +           // OR

            'BNTV250' +     // B&N Nook Tablet 7 inch

            '|' +           // OR

            'Kindle Fire' + // Kindle Fire

            '|' +           // OR

            'Silk' +        // Kindle Fire, Silk Accelerated

            '|' +           // OR

            'GT-P1000' +    // Galaxy Tab 7 inch

            ')',            // End non-capturing group

            'i');           // Case-insensitive matching

    var match = function(regex, userAgent) {
        return regex.test(userAgent);
    };

    var IsMobileClass = function(userAgent) {
        var ua = userAgent || navigator.userAgent;
        // Facebook mobile app's integrated browser adds a bunch of strings that
        // match everything. Strip it out if it exists.
        var tmp = ua.split('[FBAN');
        if (typeof tmp[1] !== 'undefined') {
            ua = tmp[0];
        }

        this.apple = {
            phone:  match(apple_phone, ua),
            ipod:   match(apple_ipod, ua),
            tablet: !match(apple_phone, ua) && match(apple_tablet, ua),
            device: match(apple_phone, ua) || match(apple_ipod, ua) || match(apple_tablet, ua)
        };
        this.amazon = {
            phone:  match(amazon_phone, ua),
            tablet: !match(amazon_phone, ua) && match(amazon_tablet, ua),
            device: match(amazon_phone, ua) || match(amazon_tablet, ua)
        };
        this.android = {
            phone:  match(amazon_phone, ua) || match(android_phone, ua),
            tablet: !match(amazon_phone, ua) && !match(android_phone, ua) && (match(amazon_tablet, ua) || match(android_tablet, ua)),
            device: match(amazon_phone, ua) || match(amazon_tablet, ua) || match(android_phone, ua) || match(android_tablet, ua)
        };
        this.windows = {
            phone:  match(windows_phone, ua),
            tablet: match(windows_tablet, ua),
            device: match(windows_phone, ua) || match(windows_tablet, ua)
        };
        this.other = {
            blackberry:   match(other_blackberry, ua),
            blackberry10: match(other_blackberry_10, ua),
            opera:        match(other_opera, ua),
            firefox:      match(other_firefox, ua),
            chrome:       match(other_chrome, ua),
            device:       match(other_blackberry, ua) || match(other_blackberry_10, ua) || match(other_opera, ua) || match(other_firefox, ua) || match(other_chrome, ua)
        };
        this.seven_inch = match(seven_inch, ua);
        this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch;
        // excludes 'other' devices and ipods, targeting touchscreen phones
        this.phone = this.apple.phone || this.android.phone || this.windows.phone;
        // excludes 7 inch devices, classifying as phone or tablet is left to the user
        this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet;

        if (typeof window === 'undefined') {
            return this;
        }
    };

    var instantiate = function() {
        var IM = new IsMobileClass();
        IM.Class = IsMobileClass;
        return IM;
    };

    if (typeof module != 'undefined' && module.exports && typeof window === 'undefined') {
        //node
        module.exports = IsMobileClass;
    } else if (typeof module != 'undefined' && module.exports && typeof window !== 'undefined') {
        //browserify
        module.exports = instantiate();
    } else if (typeof define === 'function' && define.amd) {
        //AMD
        define('isMobile', [], global.isMobile = instantiate());
    } else {
        global.isMobile = instantiate();
    }

})(this);

/***************/
/** BEGIN OF WINDOW.LOAD FUNCTION **/
/***************/
win.bind('load', function() {
  //stickyMenu();
  //minorAdjustments();
});
  
/***************/
/** BEGIN OF DOC.READY FUNCTION **/
/***************/
jQuery(function() {
  // adjust elements first
  minorAdditions();
  megaMenuAdjustment();
  slickSlider();  
  subNav();
  mmHeaderNav();
  
  stickyMenu();
  minorAdjustments();
  win.resize(function(){
    minorAdjustments();
  });
  //minorAdditions();
  
  //labelToPlaceholder();
  selectBox();
  bookingEngineToggle();  
  initSiteMap();
  //initEvents();
  
  // Email Form in Footer
    var emailForm = jQuery('.form-group');
    var emailInput = emailForm.find('.email');
    var emailSubmit = emailForm.find('.submit');
    var defaultValue = "your email here";
    /*
  // Clear text in field when focused
    emailInput.focus(function() {
        if (jQuery(this).val() == defaultValue) {
            jQuery(this).val('');
        };
    });
    emailInput.blur(function() {
        if (jQuery(this).val() == '') {
            jQuery(this).val(defaultValue);
        };
    });
    emailInput.focus(function() {
        jQuery(document.body).delegate('input:text', 'keypress', function(e) {
            if (e.which === 13) {
                e.preventDefault();
        submitEmailForm(emailInput, defaultValue);
                //submitEmailForm();
            };
        });
    });
  */

  // Clear text in field when focused
  emailForm.find('.email').on('focus blur', function(e){
    if (e.type == 'focus'){
      //alert(e.type);
      if (jQuery(this).val() == defaultValue) {
        jQuery(this).val('');
      };
      jQuery(document.body).delegate('input:text', 'keypress', function(e) {
        if (e.which === 13) {
          e.preventDefault();
          emailInput = jQuery(this);
          submitEmailForm(emailInput, defaultValue);
          //submitEmailForm();
        };
      });
    } else if (e.type == 'blur'){
      //alert(e.type);
      if (jQuery(this).val() == '') {
        jQuery(this).val(defaultValue);
      };
    }
  }); 
    /*
  emailForm.find('.email').on({
    focus: function(e) {
      if (jQuery(this).val() == defaultValue) {
        jQuery(this).val('');
      };
      jQuery(document.body).delegate('input:text', 'keypress', function(e) {
        if (e.which === 13) {
          e.preventDefault();
          submitEmailForm(emailForm, defaultValue);
          //submitEmailForm();
        };
      });
    },
    blur: function(e) {
      if (jQuery(this).val() == '') {
        jQuery(this).val(defaultValue);
      };
    },
  });
  */
  
    // Disable scroll zooming and bind back the click event
  var onMapMouseleaveHandler = function (event) {
    var that = jQuery(this);

    that.on('click', onMapClickHandler);
    that.off('mouseleave', onMapMouseleaveHandler);
    that.find('iframe').css("pointer-events", "none");
  }

  var onMapClickHandler = function (event) {
    var that = jQuery(this);

    // Disable the click handler until the user leaves the map area
    that.off('click', onMapClickHandler);

    // Enable scrolling zoom
    that.find('iframe').css("pointer-events", "auto");

    // Handle the mouse leave event
    that.on('mouseleave', onMapMouseleaveHandler);
  }

  // Enable map zooming with mouse scroll when the user clicks the map
  jQuery('.maps.embed-container').on('click', onMapClickHandler);
  
  
  emailSubmit.on('click', function(e) {
    e.preventDefault();
    emailInput = jQuery(this).prev();
    submitEmailForm(emailInput, defaultValue);
    //submitEmailForm();
  });
  
  // ...then load font and other jQuery functions
    WebFontConfig = {
        google: {
            families: ['Source+Sans+Pro:300,400,600','Playfair+Display:700italic','Oswald:400,700','Open+Sans:300,400,600,300italic,400italic,600italic']
        },
        /*loading: function() {
      minorAdjustments();
      win.resize(function(){
        minorAdjustments();
      });
        },
        active: function() {
            init(); 
        },*/
    };
});

// init creation of webfont
createWebfontScript();