jQuery(document).ready(function() {  
// Initialize Mobile Menu
  jQuery('nav #menuElem').slicknav({
      label: 'MENU',
      prependTo: '.headerWrapper'
  });
  jQuery('.topNavigation ul li').each(function() {
    jQuery('.slicknav_nav').append(jQuery(this).clone());
  });
// Initialize Subnavigation Mobile Menu
  jQuery('.subNavigation #menuElem').slicknav({
      label: 'Explore Section',
      prependTo: '.content',
      showChildren: true,
      openedSymbol: '>',
      closedSymbol: 'V',
      init: function() {
        jQuery('.subNavigation #menuElem').slicknav('open');
      }
  });
  jQuery('.content .slicknav_menutxt').html('Explore ' + jQuery('.subNavigation > a').text() + ' Section >');
  
  // Gallery height
  function resizeGallery() {
      if (jQuery(document).width() < 600) {
        jQuery('.gallery-wrap').css('height','100%');
        jQuery('.gallery-wrap').css('padding-bottom','67px');
        jQuery('.gallery-wrap').css('padding-top','67px');
        jQuery('.slide-nav-wrapper').css('margin-bottom','-67px');
        if (jQuery('.gallery-wrap').length > 0) {
          jQuery('footer').css('bottom','-67px');
        };
      } else {
        jQuery('.gallery-wrap').height(jQuery(window).height());
        jQuery('.gallery-wrap').css('padding-bottom','0px');
        jQuery('.gallery-wrap').css('padding-top','0px');
        jQuery('.slide-nav-wrapper').css('margin-bottom','0px');
        if (jQuery('.gallery-wrap').length > 0) {
          jQuery('footer').css('bottom','0px');
        };
      };
  };
  
  resizeGallery();
  jQuery(window).resize(function() {
      resizeGallery();
  });
  
  //Site Map
  jQuery(".sitemap-toggle").live('click',function(e) {
      e.preventDefault();
      if (jQuery('.sitemap-float').is(':visible')) {
          jQuery(".sitemap-float").fadeOut(500);
      } else {
          jQuery(".sitemap-float").fadeIn(500);
      };
  });
  
  //Height Resize Home Images//
   function resizeSlideshow() {
      var height = jQuery(document).height() - jQuery('header').height() - jQuery('footer').height();
      console.log(height);
      jQuery('#slides').height(height);
   };
   //resizeSlideshow();
   //jQuery(window).resize(resizeSlideshow);
  
   // active state li
    var full_path = location.href.split("#")[0];
    jQuery(".press-navigation ul li a").each(function() {
        var jQuerythis = jQuery(this);
        if (jQuerythis.prop("href").split("#")[0] == full_path) {
            jQuery(this).addClass("active");
        }
    });

   jQuery( ".contactForm .label:contains('Are you interested in Retail and commercial space opportunities?')" ).css( "max-width", "280px" );
   jQuery('.contactForm .label').text(function (index, text) { 
    return text.replace(':', '');
  });
    jQuery('.btn').click(function(e) {
        e.preventDefault();
        if (jQuery('.press-wrapper, .content').is(":visible")) {
            jQuery('.btn').text('open info');
            jQuery('.press-wrapper, .content').fadeOut(400);
        } else {
            jQuery('.btn').text('close');
            jQuery('.press-wrapper, .content').fadeIn(400);
        }
    });
  var slider = new MasterSlider(); 
    slider.setup('masterslider', {
        width : 655,
        height : 360,
        space : 4,
        shuffle : false,
        loop : true,
        view : 'basic'
    });
     
    slider.control('arrows');
    slider.control('thumblist', {autohide : false,  dir : 'h'});
  jQuery('.cycle-slideshow').cycle({
     fx: 'fade',
     timeout: 4000,
     slides:"> a"
   });
    jQuery(".copy").mCustomScrollbar({
        axis: "y", // horizontal scrollbar
        theme: "dark-2"
    });
    jQuery(".news").mCustomScrollbar({
        axis: "y", // horizontal scrollbar
        theme: "dark-2"
    });
   
   if (jQuery('.slides-container li').length > 1) {
     jQuery('#slides').superslides({
        hashchange: false,
        animation: 'fade',
        animation_easing: 'linear',
        play: 4000              
     });
   } else {
     jQuery('#slides').superslides({
        hashchange: false,
        animation: 'fade',
        animation_easing: 'linear',
        play: 0              
     });
   };
  //console.log('Slide Length: ' + jQuery('.slides-container li').length);
    jQuery('.slides-pagination').each(function() {
        if (jQuery(this).find('a').length == 0) {
            jQuery(this).addClass('hide');
        };
    });
    jQuery('.HighLighted').find('> ul').slideToggle('slow');
    jQuery('.gallery-item').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true,
            removalDelay: 8000,

            // Class that is added to popup wrapper and background
            // make it unique to apply your CSS animations just to this exact popup
            mainClass: 'mfp-fade'
        }
    });
    jQuery('.master-plan').magnificPopup({
        items: {
            src: '/getmedia/5d8f57ee-ed39-410e-a12a-809f2fb0add1/masterplan'
        },
        type: 'image' // this is default type
    });
    jQuery('.vids').magnificPopup({
        items: [

            {
                src: "https://www.youtube.com/watch?v=EfmMNvFj-XE",
                type: 'iframe' // this overrides default type
            }, {
                src: 'https://www.youtube.com/watch?v=8sN9Z2K3jVM',
                type: 'iframe' // this overrides default type
            }, {
                src: 'https://www.youtube.com/watch?v=KzsJ0mvWs1s',
                type: 'iframe' // this overrides default type
            }
        ],
        gallery: {
            enabled: true
        },
        type: 'image' // this is default type
    });
  
});