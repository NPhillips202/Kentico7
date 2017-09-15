jQuery(document).ready(function() { 

        if ((jQuery(document).width() <= 875) || (jQuery(window).width() <= 875)) {
           jQuery('#mainNav > ul').append('<li style="background:transparent;"><a href="https://www.marriott.com/reservation/availabilitySearch.mi?propertyCode=LAXAX" target="_blank">Reservations</a></li>');
        };
  
	// Navigation dropdowns   
    jQuery('#mainNav li').hover(
        function () {
            //show its submenu
            jQuery('ul', this).stop().slideToggle(600);
			jQuery(this).css("background", "#8fb3ca");

        }, 
        function () {
            //hide its submenu
            jQuery('ul', this).stop().slideToggle(650);
			jQuery(this).css("background", "transparent");
        }
    );
    // Navigation dropdown sizing
    jQuery(function() {
        jQuery('#mainNav > ul > li').each(function() {
            var dropdown = jQuery(this).children('ul');
            if (dropdown.length > 0) {
                var thisWidth = jQuery(this).width();
                var dropdownWidth = dropdown.width();
                //console.log(dropdownWidth + ' | ' + thisWidth);
                
                if (dropdownWidth < thisWidth) {
                    dropdown.width(thisWidth);
                };
            };
        });
    });
  
    //SEO Content//
    jQuery('.readMore, .closeIt').live('click', function(e) {
        e.preventDefault();
        jQuery('#seo').slideToggle();
    });
    
    if (jQuery('.homeContent').length > 0) {
        jQuery('.footerLeft #menuElem').append("<li><a href=\"#\" class=\"readMore\">Read More</a></li>");
    };
    jQuery('.footerLeft #menuElem').append("<li><a href=\"#\" class=\"sitemap-toggle\">Site Map</a></li>");
  
    // Email Form in Footer
    var emailForm = jQuery('#emailForm');
    var defaultValue = "Your email here";
    // Clear text in field when focused
    emailForm.find('.email').focus(function() {
        if (jQuery(this).val() == defaultValue) {
            jQuery(this).val('');
        };
    });
    emailForm.find('.email').blur(function() {
        if (jQuery(this).val() == '') {
            jQuery(this).val(defaultValue);
        };
    });
    // Submit functions
    function submitEmailForm() {
		var email = emailForm.find('.email').val();
		if (email == defaultValue || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
			alert("Please enter a valid email address.");
			return false;
		};
		document.location.href = ('/email-sign-up/?em=' + email + '#subHeader');
    };
    emailForm.find('.email').focus(function() {
        jQuery(document.body).delegate('input:text', 'keypress', function(e) {
            if (e.which === 13) {
                e.preventDefault();
                submitEmailForm();
            };
        });
    });
	emailForm.find('.submit').click(function(e) {
		e.preventDefault();
		submitEmailForm();
	});

	
	// Footer fade in on mobile
	jQuery(window).scroll(function() {
		if (jQuery(window).width() < 660) {
			var scrollTop = jQuery(window).scrollTop();
			var scrollDistance = jQuery(document).height() - jQuery(window).innerHeight() - 80;
			if(scrollTop >= scrollDistance){
				jQuery('.footerLeft').fadeIn('fast');
            }else{
				jQuery('.footerLeft').fadeOut('fast');
              
			}
		};
	});
 
    // Scroll to Div if hash tag is in URL
    /*jQuery('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = jQuery(this.hash);
            target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                console.log(target.offset().top + jQuery('.header').height());
                jQuery('html,body').animate({
                    scrollTop: target.offset().top + jQuery('.header').height()
                }, 1000);
                return false;
            }
        }
    });*/
    
	var hashString = window.location.hash;
        hashString = hashString.replace("#","");
    console.log(hashString);
	if (hashString.length > 0) {
		var element = jQuery('#' + hashString);
      
        console.log(element.offset().top - jQuery('.header .logo').height());
        
        jQuery('html,body').animate({
            scrollTop: element.offset().top - jQuery('.header .logo').height()
        }, 1000);
        return false;
    }
        /*if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = jQuery(this.hash);
            target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                console.log(target.offset().top + jQuery('.header').height());
                jQuery('html,body').animate({
                    scrollTop: target.offset().top + jQuery('.header').height()
                }, 1000);
                return false;
            }
        }*/
	
	// Mobile menu button
    jQuery(function() {
        jQuery('#mobileMenuBtn').click(function(e) {
            e.preventDefault(); 
		    if (jQuery('#mainNav ul').is(':visible')) {
        	    jQuery('#mainNav ul').slideUp(800);
		    } else {
        	    jQuery('#mainNav ul').slideDown(800);
		    };
        });
    });
	// Due to fixed nav, the logo needs to size down once the user has scrolled down the page
	function logoScroll() {
		if (jQuery(document).scrollTop() < 300) {
			jQuery('.logo img').attr('height', '167px');
		} else if (jQuery(document).scrollTop() > 300) {
			jQuery('.logo img').attr('height', jQuery('.header').height());
			if ((jQuery(document).width() < 875) || (jQuery(window).width() < 875))   {
				jQuery('.logo img').attr('height', '167px');
			};
		};
	};
  

	
	// Google web fonts
	WebFontConfig = {
		google: {
			families: ['Ek+Mukta:400,500,700:latin', 'Roboto+Condensed:300,700:latin']
		},
		active: function() {
			logoScroll();
			jQuery(window).scroll(function () {
				logoScroll();
			});
			jQuery(window).resize(function () {
				logoScroll();
			});
		}
	};
	(function() {
	var wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
	})();

  
});

jQuery(document).ready(function() {
    jQuery('.slideshow').cycle({
		fx: 'fade',
		pager: '#pager', 
    	speed: 2000,
		timeout: 4000
    });
});


//Site Map
	jQuery(function() {
		jQuery(".sitemap-toggle").click(function(e) {
			e.preventDefault();
			if (jQuery('.sitemap-float').is(':visible')) {
				jQuery(".sitemap-float").fadeOut(500);
			} else {
				jQuery(".sitemap-float").fadeIn(500);
			};
		});
	});
