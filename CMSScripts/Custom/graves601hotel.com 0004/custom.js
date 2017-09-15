jQuery(function() {
    if (jQuery('#slideshow').length > 0) {
        var offerBtn = '<li><a href="/offers/">offers</a></li>';
    } else {
        var offerBtn = '<li><a href="#offers" class="open-offers">offers</a></li>';
    };
    jQuery("#bottom-menu ul").prepend(offerBtn);
});

// Responsive menu
jQuery(function() {
	var menuBtn = jQuery('#mobileMenuBtn');
	var menu = jQuery('#nav');
	menuBtn.click(function(e) {
		e.preventDefault();
		if (menu.is(':visible')) {
			menu.slideUp(300);
		} else {
			//menu.slideDown(600);
			menu.slideDown(200);
		};
	});
	
	var menuSubBtn = jQuery('#mobileSubMenuBtn');
	var menuSub = jQuery('#subnav');
	menuSubBtn.click(function(e) {
		e.preventDefault();
		jQuery(this).find('.sign').toggle();
		if (menuSub.is(':visible')) {
			menuSub.slideUp(300);
			menuSub.css('margin-bottom',30);
		} else {
			menuSub.slideDown(200);
			menuSub.css('margin-bottom',0);
		};
	});
});

// Footer




jQuery(function() {
	function openAndClose(hash) {
		var speed = 400;
		var element = jQuery(hash + '-popup');
        var boxHeight = jQuery(hash + '-popup .owl-wrapper').height();
		if (element.hasClass('open')) {
			element.animate({height:'0px'},speed, function() {
				element.css('overflow','hidden');
			}).removeClass('open');
		} else {
			element.animate({height:boxHeight + 'px'}, speed, function() {
				element.css('overflow','visible');
			}).addClass('open');
		}
	}
	jQuery('a.open-offers').click(function(e) {
		e.preventDefault();
		openAndClose(this.hash);
	});
});



//Full Box Sliding (Hidden to Visible) 
jQuery(function() {
	jQuery('.more-info').click(function(){ 
		jQuery("#more-info-pane").slideToggle({ direction: "up" }, 300);
		jQuery(this).toggleClass('close-pane'); 
	});
});

//Full Box Sliding (Hidden to Visible) Responsive only
jQuery(function() {
	jQuery('.bottom-menu-link').click(function(){ 
		jQuery("#footer-top #footer-top-inner").slideToggle({ direction: "up" }, 300);
		jQuery(this).find('.text').toggle();
		jQuery(this).find('.sign').toggle();
	});
});

// Selectbox IE fix
jQuery(document).ready(function() {
    var sbHolder = jQuery('.sbHolder');
    //console.log(sbHolder.length);
    sbHolder.each(function() {
        jQuery(this).addClass('ie-fix');
        //jQuery('css3-container').css('z-index','-1');
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