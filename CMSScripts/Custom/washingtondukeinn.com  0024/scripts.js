//menu mobile
jQuery(function(){
    jQuery(".datepicker").datepicker();
    //var mobileDisplayText = "+",
    //    lessText = "-",
    //    mobileDisplayButton = jQuery(".mobileShow");
    
    //mobileDisplayButton.click(function () {
    //    var jQuerythis = jQuery(this);
    //    jQuerythis.text(jQuerythis.text() == mobileDisplayText ? lessText : mobileDisplayText).next("nav #menuElem ul").slideToggle("fast");
    //});
});

//responsive tabs on dining page
jQuery(function() {
 // jQuery('#parentHorizontalTab').easyResponsiveTabs();
  
  jQuery('#diningTabs').tabs();
  
  
});

jQuery(function() {
  
  jQuery('.main-press-wrapper h2:first-child').removeClass('expand');
  jQuery('.main-press-wrapper h2:first-child').next().css('display','block');
  
  jQuery('.main-press-wrapper h2').click(function() {
      console.log(jQuery(this).next().html());
      jQuery(this).next().stop().slideToggle('slow');
  });
});

// Navigation dropdowns
jQuery(function() {
    if (jQuery(window).width() > 767) {
        var speed = 300;
        jQuery('#navigation > ul li').hover(function() {
            if (jQuery(this).children('ul').length > 0) {
                jQuery(this).children('ul').stop(true, false).hide().slideDown(speed, function() {
                    jQuery(this).css('overflow','visible');
                });
            }
        }, function() {
            if (jQuery(this).children('ul').length > 0) {
                jQuery(this).children('ul').stop(true, false).slideUp(speed);
            }
        });
    };
});

// Detect if iPad IOS7
jQuery(function() {
	if (navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i)) {
		jQuery('html').addClass('ipad ios7');
	};
});
jQuery(function() {
  jQuery'.bukatutup').click(function() {
      jQuery('#target').stop().toggle('slow');
  });
});


// Superslides
if(jQuery('#banner').hasClass('homeBanner')){
	jQuery('#slides').superslides({
		pagination: false,
        hashchange: false,
		animation: 'fade',
		animation_easing:'linear',
		play:5000
	});
} else {
	jQuery('#slides').superslides({
		nav: '.slides-navigation',
        hashchange: false,
		animation: 'fade',
		animation_easing:'linear',
		play:5000
	});
}

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

    jQuery('.trigger, .close').click(function(e){
        e.preventDefault();
        jQuery('.show').slideToggle();
    });
                         

    if (jQuery(document).width()  <= 767) {
      jQuery('#navigation > ul#menuElem').prepend('<li><a href="/gallery/" class="bookDrop">Photo Gallery</a></li>');
      jQuery('#navigation > ul#menuElem').prepend('<li><a href="/specials/" class="bookDrop">Specials</a></li>');
      jQuery('#navigation > ul#menuElem').prepend('<li><a href="https://m.ihotelier.com/11999/booking.html?hotelId=11999" target="_blank" class="bookDrop">Book Now</a></li>');
    };
});


// 0.2 preserve full with slide images on mobile
//if (jQuery(window).width() < 640) {
//	jQuery( ".slides-container img" ).addClass( "preserve" );
//} else {
//   jQuery( ".slides-container img" ).removeClass( "preserve" );
//
//};

// 0.3 reservation drop down item
//jQuery(function(){
	// Function for closing and opening dropdown
	//function toggleDropdown() {
		//var target = jQuery('div.show');
		//if (target.is(':visible')) {
		//	jQuery("div.show").slideUp();
		//} else {
		//	jQuery("div.show").slideDown();
		//};
	//};
	//jQuery(".trigger").click(function(e) {
	//	e.preventDefault();
		//e.stopPropagation();
		//toggleDropdown();
	//});
	//jQuery("a.close").click(function(e) {
     // 	e.preventDefault();
	//	toggleDropdown();
	//});
	
	// Close dropdown when clicking outside of it
	//jQuery("div.show").click(function(e) {
	//	e.preventDefault();
	//	e.stopPropagation();
//	});
//	jQuery(document).click(function(e) {
	//	jQuery("div.show").slideUp();
	//});
//});



// 0.4 home page hover tabs items
jQuery(function() {
	// Tab scripts
	var target = jQuery('.slide-out-div');
	var speed = 900;
	
	function openTab(currentTab) {
		var tabTarget = currentTab.children('.tab-content');
		tabTarget.stop(true,false);
		tabTarget.hide(); //Fix for slidedown
		tabTarget.slideDown(speed);
	};
	
	function closeTab(currentTab) {
		var tabTarget = currentTab.children('.tab-content');
		tabTarget.stop(true,false);
		tabTarget.slideUp(speed);
	};
	
	function closeAllTabs() {
		jQuery('.tab-content:visible').slideUp(speed);
	};
	
	if (Modernizr.touch) {
		// Show for tablet/mobile
		target.click(function(e) {
			//e.preventDefault();
			e.stopPropagation();
			var tabTarget = jQuery(this).children('.tab-content');
			if (tabTarget.is(':visible')) {
				//closeTab(jQuery(this));
			} else {
				closeAllTabs();
				openTab(jQuery(this));
                return false;
			};
		});
		
		jQuery(document).click(function(e) {
			//if (jQuery(e.target).is('.slide-out-div')) {
				//e.preventDefault();
				//e.stopPropagation();
			//} else {
				closeAllTabs();
			//};
		});
	} else {
		// Show for desktop
		target.hover(function(e) {
			openTab(jQuery(this));
		}, function(e) {
			closeTab(jQuery(this));
		});
	};
});


// 0.5 placeholder
//jQuery('input, textarea').placeholder();


// 0.6 sitemap
// via http://return-true.com/2010/03/creating-a-slide-up-footer-using-jquery
jQuery(function() {
	var slide = false;
	var height = jQuery('#footer_content').height() - jQuery('#footer').height();
	jQuery('#footer_button').click(function(e) {
		e.preventDefault();
		var position = jQuery('#footer').offset();
			position = position.top;
		var speed = 1000;
			
		jQuery('#footer_content').animate({ height: "toggle"}, speed);
		jQuery('html,body').animate({
			scrollTop:position+'px'
		},speed);
	});
});

// 0.7 swiper
var mySwiper = new Swiper('.swiper-container', {
	//pagination: '.pagination',
	autoplay: 5000,
	loop:true,
	grabCursor: true,
	autoplayDisableOnInteraction: false,
	calculateHeight: true,
	roundLengths: true,
	
	paginationClickable: true
})
    var mySwiper = new Swiper('.swiper-container2', {
	//pagination: '.pagination',
	autoplay: 5000,
	loop:true,
	grabCursor: true,
	autoplayDisableOnInteraction: false,
	calculateHeight: true,
	roundLengths: true,
	
	paginationClickable: true
})
var mySwiper = new Swiper('.swiper-container-right',{
	//pagination: '.pagination',
	autoplay: 5000,
	loop:true,
	grabCursor: true,
	autoplayDisableOnInteraction: false
})
jQuery('.arrow-left').on('click', function(e){
	e.preventDefault()
	mySwiper.swipePrev()
})
jQuery('.arrow-right').on('click', function(e){
	e.preventDefault()
	mySwiper.swipeNext()
})

  //accorion set for career/job application
jQuery(document).ready(function() {
    jQuery('#section1').next().css('display','block');
        
  // If error is found on form submission, highlight the heading in red
    jQuery('.FormPanel .container').each(function(){
        if (jQuery(this).find('.EditingFormErrorLabel').length) {
            jQuery(this).prevUntil('.container').css('color','red');
        };
    });
    
    var formSpeed = 500;
    jQuery('.openThisSection').click(function(){
       jQuery('div .container').hide();
       jQuery(this).next().slideDown(formSpeed);
       jQuery('html, body').animate({scrollTop:jQuery(this).offset().top}, formSpeed);
       
    });
      
    jQuery('.toNextSection').click(function(){
       jQuery(this).closest('.container').slideUp(formSpeed);
       jQuery(this).parent().parent().parent().parent().parent().parent().next().next().slideDown(formSpeed);
       jQuery('html, body').animate({scrollTop:jQuery(this).parent().parent().parent().parent().parent().parent().offset().top}, formSpeed);
     });
});

     

// Read More mobile
    jQuery('.show-mobile').click(function(e) {
        jQuery(this).next('div').slideToggle();
		e.preventDefault();
		preferencesOverlay();
    });

//ECommerce functions
//Hide Tax Summary table on checkout
jQuery(function() {
  jQuery('table[id*="TaxSummary"]').hide();
  
  jQuery('.CartContentTable tbody tr').each(function() {
    jQuery(this).children('td:eq(5)').children('span:eq(0)').remove();
    jQuery(this).children('td:eq(5)').children('span:eq(0)').css('padding-right','32px');
  });
    
  jQuery('.TabControlTable tbody tr').each(function() {
    jQuery(this).children('#TabItem_5').remove();
  });

  //Hide long description textarea and label (within TR element)
  jQuery('table[id*="SKUDescription"]').each(function() {
    jQuery(this).remove();
  });
});


//load pop up window

function myFunction() {
     var myWindow = window.open("http://demo.cendyn.com/virtual-room-tour/Double%20Guestroom.html", "Virtual Tour 360", "width=800,height=500");
}

function presidentVirtual() {
     var myWindow = window.open("http://demo.cendyn.com/virtual-room-tour/Presidential%20Suite.html", "Virtual Tour 360", "width=800,height=500");
}

function kingVirtual() {
     var myWindow = window.open("http://demo.cendyn.com/virtual-room-tour/King%20Guestroom.html", "Virtual Tour 360", "width=800,height=500");
}

function homesteadVirtual() {
     var myWindow = window.open("http://demo.cendyn.com/virtual-room-tour/Homestead%20Suite.html", "Virtual Tour 360", "width=800,height=500");
}

function ambassadorSuiteVirtual() {
     var myWindow = window.open("http://demo.cendyn.com/virtual-room-tour/AmbassadorSuite.html", "Virtual Tour 360", "width=800,height=500");
}

/*
jQuery(document).ready(function() {
	jQuery('.popup-youtube, .popup-vimeo, .virtual-tour').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});
})*/


//add target attribute to career link
  jQuery(function(){
  jQuery("a[href='/careers/']").attr("target","_blank");
    });
