// Navigation //
jQuery(document).ready(function() {
	jQuery('#mobileMenuBtn').click(function(e) {
		e.preventDefault(); 
		jQuery('#menuElem:visible').stop().fadeOut(800);
		jQuery('#menuElem').not(":visible").stop().fadeIn(800);
	});
});

jQuery(document).ready(function() {
  jQuery(document).scroll(function () {
    var y = jQuery(this).scrollTop();
    if (y > 300) {
      jQuery('.booknowbtn').slideDown();
      jQuery('.booknowbtn').css({display:"block"});
    } else {
      jQuery('.booknowbtn').slideUp();
    }
  });
});

//Sub Nav//
jQuery(document).ready(function() {
	jQuery('.mobileNavSub').click(function(e) {
		e.preventDefault(); 
		jQuery('.subNav:visible').stop().fadeOut(800);
		jQuery('.subNav').not(":visible").stop().fadeIn(800);
	});
});

//Weather Widget//
jQuery(document).ready(function() {
  jQuery.simpleWeather({
    location: 'Montauk, NY',
    woeid: '',
    unit: 'c',
    success: function(weather) {
      html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
        html += '<li>/</li>';
       html += '<li>'+weather.alt.temp+'&deg;F</li></ul>';
      jQuery("#weather").html(html);
    },
    error: function(error) { jQuery("#weather").html('<p><!--' + error + '--></p>');
    }
  });
});

//SEO Content//
jQuery(document).ready(function() {
    jQuery('.readMore, .closeIt').live('click', function(e) {
        e.preventDefault();
        jQuery('#seo').slideToggle();
    });
});

// Email Form in Footer //
jQuery(function() {
    var emailForm = jQuery('.email');
    var defaultValue = "your email here";
    // Clear text in field when focused
    emailForm.find('.emailSignUp').focus(function() {
        if (jQuery(this).val() == defaultValue) {
            jQuery(this).val('');
        };
    });
    emailForm.find('.emailSignUp').blur(function() {
        if (jQuery(this).val() == '') {
            jQuery(this).val(defaultValue);
        };
    });
    // Submit functions
    function submitEmailForm() {
		var email = emailForm.find('.emailSignUp').val();
		if (email == defaultValue || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
			alert("Please enter a valid email address.");
			return false;
		};
		document.location.href = ('/email-sign-up/?em=' + email);
    };
    emailForm.find('.emailSignUp').focus(function() {
        jQuery(document.body).delegate('input:text', 'keypress', function(e) {
            if (e.which === 13) {
                e.preventDefault();
                submitEmailForm();
            };
        });
    });
	emailForm.find('button').click(function(e) {
		e.preventDefault();
		submitEmailForm();
	});
});

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

//Bottom Nav split cells//
jQuery(function(jQuery) {
    var num_cols = 4,
    container = jQuery('.bottomNavs #menuElem'),
    listItem = 'li',
    listClass = 'sub-list';
    container.append("<li><a href=\"#\" class=\"sitemap-toggle\">Site Map</a></li>");
    
    if (jQuery('.circleImgBg').length > 0) {
        container.append("<li><a href=\"#\" class=\"readMore\">Read More</a></li>");
    };
    
    container.each(function() {
        var items_per_col = new Array(),
        items = jQuery(this).find(listItem),
        min_items_per_col = Math.floor(items.length / num_cols),
        difference = items.length - (min_items_per_col * num_cols);
        for (var i = 0; i < num_cols; i++) {
            if (i < difference) {
                items_per_col[i] = min_items_per_col + 1;
            } else {
                items_per_col[i] = min_items_per_col;
            }
        }
        for (var i = 0; i < num_cols; i++) {
            jQuery(this).append(jQuery('<ul ></ul>').addClass(listClass));
            for (var j = 0; j < items_per_col[i]; j++) {
                var pointer = 0;
                for (var k = 0; k < i; k++) {
                    pointer += items_per_col[k];
                }
               jQuery(this).find('.' + listClass).last().append(items[j + pointer]);
            }
        }
    });
});

//Remove Class//
jQuery(function() {
	if (jQuery('.wtFade').length > 0) {
		jQuery('.home').removeClass('home');
	};
});

// Remove Last Border in Nav //
jQuery(function() {
	jQuery('.nav ul li').last().addClass('last');
	jQuery('.subNav ul li').last().addClass('last');
});

//Select Boxes//
jQuery(function() {
    jQuery('.selectbox').selectbox();
});
	


// Footer Height //
function footerHeight() {
    var heightDifference = jQuery(window).height() - jQuery('#wrapper').height();
    //console.log(jQuery('#wrapper').height() + " | " + heightDifference);
    if ((heightDifference > 0) && (jQuery('.wtFade').length < 1)) {
        var newHeight = jQuery('.fade').height() + heightDifference;
        jQuery('.fade').height(newHeight);
    } else {
        jQuery('.fade').height('inherit');
    };
};
jQuery(function() {
    footerHeight();
	jQuery(window).resize(function() {
        footerHeight();
    });
});

// Sticky footer on home //
jQuery(function() {
    if (jQuery(window).width() < 768) {
        if (jQuery('.wtFade').length < 1) {
            jQuery('#footer').css('position','fixed');
        };
    };
});