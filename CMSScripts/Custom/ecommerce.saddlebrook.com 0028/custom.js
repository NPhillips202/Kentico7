/*
====================================================================================================
@name			Saddlebrook Custom Javascript
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
	doc = jQuery(document),
	main_nav = jQuery('#nav'),
	main_nav_lis = jQuery('#nav .main-nav ul, #nav .main-nav ul li ul'),
	sub_nav_lis = jQuery('#sidebar .side-nav-wrapper ul'),
    sub_third_nav_lis = jQuery('#content .thirdLevelNav ul'),
	sub_nav_main_ul = jQuery('#sidebar .side-nav-wrapper .side-nav-main-wrapper ul'),
	utility_nav_li = main_nav.find('div.utility-nav > ul > li'),
	utility_nav_li_col = main_nav.find('div.utility-nav').find('div.column'),
	special_offers = '.special-offers',
	footer = jQuery('#footer'),
	footer_modal_link = footer.find('.modal-link'),
	plus_icon = footer_modal_link.find('i.icon span.plus'),
	minus_icon = footer_modal_link.find('i.icon span.minus'),
	footer_modal = footer.find('.modal'),
	footer_div_col = footer_modal.find('div.column'),
	
	// booking
	booking = jQuery('.booking'),
	book_btn = jQuery('#book-btn'),
	close_booknow_tooltip = jQuery('.close-booknow-tooltip');

jQuery(function() {
	
	// Color box
	//jQuery('a.youtube').colorbox({rel:'video',iframe:true, innerWidth:452, innerHeight:360, width:458, height:387, fixed:true});
	jQuery('a.youtube').colorbox({
		rel:'video',
		iframe:true, 
		//innerWidth:452, 
		//innerHeight:270, 
		width:453,//458, 
		height:290, 
		fixed:true,
		opacity:.8,
		onOpen: function() {
			jQuery('#cboxClose').html('<i class="fa fa-times-circle"></i>');
		},
	});

	// Navigation
	jQuery('#mobileMenuBtn').click(function(e) {
		e.preventDefault(); 
		jQuery('.main-nav:visible').stop().fadeOut(100);
		jQuery('.main-nav').not(":visible").stop().fadeIn(100);
		/*jQuery('.main-nav:visible').stop().slideUp(400);
		jQuery('.main-nav').not(":visible").stop().slideDown(400);*/
		//jQuery(this.hash).slideToggle({ direction: "down" }, 400);
	});
	
	//Sub Nav
	jQuery('#mobileExploreBtn').click(function(e) {
		e.preventDefault(); 
		jQuery('.side-nav-wrapper:visible').stop().fadeOut(400);
		jQuery('.side-nav-wrapper').not(":visible").stop().fadeIn(400);
	});
	
	// Nav
	main_nav_lis.each(function() {
		jQuery(this).find('li:first').addClass('first');
		jQuery(this).find('li:last').addClass('last');
	});
	// Sub Nav - 2nd
	sub_nav_lis.each(function() {
		jQuery(this).find('li:first').addClass('first');
		jQuery(this).find('li:last').addClass('last');
	});
	//
	/*jQuery('#sidebar .side-nav-main-wrapper > ul > li').each(function() {
		var li = jQuery(this),
			li_ul = li.find('> ul');
		if(li.has('ul').length) {
			li.addClass('nested');
			li.append('<i class="icon"><span class="plus">+</span><span class="minus hide">–</span></i>');
			//li.html(li.html() + '<i class="icon"><span class="plus">+</span><span class="minus hide">–</span></i>');
			//li_ul.addClass('hide');
		}
	});
	// Sub Nav - 2nd Nested
	jQuery('.nested i.icon').bind('click',function() {
	//jQuery('.nested i.icon').click(function() {
		console.log(jQuery(this).html());
		var nested_ul = jQuery(this).closest('li').find('> ul');
		if(nested_ul.is(':visible')) {
			nested_ul.slideUp();
		} else {
			nested_ul.slideDown();
		}
	});*/
	// Sub Nav - 3rd
	sub_third_nav_lis.each(function() {
		jQuery(this).find('li:first').addClass('first');
		jQuery(this).find('li:last').addClass('last');
	});
	
	if(jQuery('.side-nav-featured-wrapper').length == 0) {
		sub_nav_main_ul.css('border',0);
	}
	
	// Utlity Nav
	utility_nav_li.has('ul').addClass('sub-menu');
		
	// Booking Widget Selectbox Column
	//utility_nav_li_col.first().addClass('first');
	//utility_nav_li_col.last().addClass('last');
	
	// 
	footer_div_col.last().addClass('last');
	
	// Booking mask functions
	// Close booking mask
	function openBooking() {
		/*console.log(win.height());
		console.log(booking.height());
		
		//win.scroll(function(){ });
		
		//var pos_panel = pos_checked - pos_first + 5 - $firstChecked.parent('label').height();
		
		//win.delay(1000).animate({
			//scrollTop:pos_panel
		//},'slow');
		
		var pos_container = doc.scrollTop(),
			pos_container_off = win.top,
			//pos_container_off = win.offset().top,
			pos_scrollto_off = booking.offset().top,
			pos_panel = pos_scrollto_off - pos_container_off + pos_container - 10;
		
		// if $(this) is checked scroll to checked box
		//if(checkbox_checked) {
			//container.scrollTop( pos_panel );
			// Or you can animate the scrolling:
			
			//win.delay(1000).animate({ 
			//	scrollTop: pos_panel 
			//}, 'slow');
		
		//}
		console.log(pos_container);
		console.log(pos_container_off);
		console.log(pos_scrollto_off);
		console.log(pos_panel);
		console.log(pos_container_off);*/
	
		booking.addClass('efx');
		book_btn.closest('li').addClass('sub-menu');
	};
	function closeBooking() {
		booking.removeClass('efx');
		book_btn.closest('li').removeClass('sub-menu');
	};
	book_btn.click(function(e){ 
		e.preventDefault(); 
		if (booking.hasClass('efx')) {
			closeBooking();
		} else {
			openBooking();
		};
	});
	close_booknow_tooltip.click(function(e){ 
		e.preventDefault();
		closeBooking();
	});
	
	// eSpecials
	/*var specialsSwiper = new Swiper(special_offers, {
		loop:true,
		autoplay:5000,
		speed:750,
		calculateHeight:true,
        grabCursor: true,
	});*/
  
    // Email Form in Footer //
    var emailForm = jQuery('.email-form');
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
	
	// Sitemap
	jQuery(".sitemap-toggle").live('click',function(e) {
        e.preventDefault();
        if (jQuery('.sitemap-float').is(':visible')) {
            jQuery(".sitemap-float").fadeOut(500);
        } else {
            jQuery(".sitemap-float").fadeIn(500);
        };
    });
	
	// Footer Modal	(Hidden to Visible) 
	footer_modal_link.click(function(e){ 
		e.preventDefault(); 
		var el = jQuery(e.target),
			z_index = parseInt(footer.css('z-index'));
		if(minus_icon.hasClass('hide')) {
			footer.css('z-index',z_index+2);
			footer_modal.fadeIn().css('display','table');
			minus_icon.removeClass('hide');
			plus_icon.addClass('hide');
		} else {
			footer_modal.fadeOut();
			setTimeout(function() {
				footer.css('z-index',z_index-2);
			},500);
			minus_icon.addClass('hide');
			plus_icon.removeClass('hide');
		}
	});
	footer.outside('click', function(e) {
        footer_modal.fadeOut();
		minus_icon.addClass('hide');
		plus_icon.removeClass('hide');
    });	
	
	// Footer Modal (Hidden to Visible) 
	/*footer_modal_link.click(function(e){ 
		//var el = jQuery(e.target);
		var el = jQuery(this);
		console.log(el.attr('class') + ' - ' + el.find('span.minus').hasClass('hide'));
		e.preventDefault(); 
		if(el.find('span.minus').hasClass('hide')) {
			footer_modal.fadeIn().css('display', 'table');
			el.find('span.minus').removeClass('hide');
			el.find('span.plus').addClass('hide');
		} else {
			footer_modal.fadeOut();
			el.find('span.minus').addClass('hide');
			el.find('span.plus').removeClass('hide');
		}
	});
	footer.outside('click', function(e) {
        footer_modal.fadeOut();
		footer_modal_link.find('span.minus').addClass('hide');
		footer_modal_link.find('span.plus').removeClass('hide');
    });*/
  
  
    // eSpecials Details
    // 
    /*var rotating_offer_id = jQuery('#content .specialsListItem').each(function() {
        var offer_title = jQuery(this).find('h4').text(),
            offer_id = offer_title.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;''<>,.\/? ])+/g, '-').replace(/^(-)+|(-)+$/g,'');
        jQuery(this).attr('id', offer_id.toLowerCase());
    });
      
    var rotating_offer_link = jQuery('#nav div.special-offers .swiper-slide').each(function() {
        var offer_title = jQuery(this).find('h3').text(),
            offer_id = offer_title.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;''<>,.\/? ])+/g, '-').replace(/^(-)+|(-)+$/g,''),
            offer_link = jQuery(this).find('a').addClass('hashed').attr('href', jQuery(this).find('a').attr('href') + '#' + offer_id.toLowerCase());
    });
  
    //check if hash tag exists in the URL
    if(window.location.hash) {
        //set the value as a variable, and remove the #
        var hash_value = window.location.hash.replace('#', '');
        //show the value with an alert pop-up
        //alert(hash_value);
		
		var hash = window.location.hash;
        var item = jQuery('#' + hash);
        var minus = item.find('.signal.minus');
        var plus = item.find('.signal.plus');
      
        if(minus.hasClass('hide')){
            minus.removeClass('hide');
            plus.addClass('hide');
        } else{
            plus.removeClass('hide');
            minus.addClass('hide');
        }
        item.find('.toggle-section').slideToggle(300);
        specialToggle(item)      
    } else {
        var hash_value = '';
    }
  
    jQuery('.hased').click(function() {
		var hash = jQuery(this).attr('href');
        var item = jQuery(hash);
		specialToggle(item);
    });*/
  
    jQuery('.specialsListItem').click(function() { 	
		/*
		if(jQuery(this).find().hasClass('fa-minus')){
            jQuery(this).removeClass('fa-minus').addClass('fa-plus');
        } else{
            jQuery(this).removeClass('fa-plus').addClass('fa-minus');
        }
		*/
        var item = jQuery(this);
        specialToggle(item);
    });
	
});

win.on('hashchange load', function(){
    //var id = parseInt(window.location.hash.replace('#', ''));
    var id = window.location.hash;
    //console.log(id);  
});
	
// eSpecials
window.onload = function() {
    //jQuery(special_offers).find('ul').fadeTo('fast', 1, function(){
	
    //jQuery(special_offers).find('ul>.swiper-slide').css('opacity',1);
    //jQuery(special_offers).find('ul').fadeIn();
    jQuery(special_offers).find('ul>.swiper-slide').css('opacity',1);
    var specialsSwiper = new Swiper(special_offers, {
        loop:true,
        progress:true,
        autoplay:4150,
        speed:750,
        calculateHeight:true,
        grabCursor: true,
    });
	
	//});
}
  
// Scrollable Table
// Run on window load in case images or other scripts affect element widths
//jQuery(window).on('load', function() {
/*
jQuery(function() {
    // Check all tables. You may need to be more restrictive.
    jQuery('div').not('.FormPanel').each(function() { // Do not make these tables scrollable
        //console.log('right b4 Rtables...');
        jQuery(this).find('> table').each(function() {
            var element = jQuery(this);
            //console.log(element.html());
            // Create the wrapper element
            var scrollWrapper = jQuery('<div />', {
                'class': 'scrollable',
                'html': '<div />' // The inner div is needed for styling
            }).insertBefore(element);
            // Store a reference to the wrapper element
            element.data('scrollWrapper', scrollWrapper);
            // Move the scrollable element inside the wrapper element
            element.appendTo(scrollWrapper.find('div'));
        });
    });
    tableResizeEvents();
    jQuery(document).load(jQuery(window).bind('resize orientationchange', tableResizeEvents));
    //jQuery(document).load(jQuery(window).bind('resize orientationchange', tableResizeEvents));
    //jQuery(window).on('resize orientationchange', function() {
    //  tableResizeEvents();
    //});
});
*/

function specialToggle(item) {
	//var item = jQuery(this);
	var minus = item.find('.signal.minus');
	var plus = item.find('.signal.plus');
  
	if(minus.hasClass('hide')){
		minus.removeClass('hide');
		plus.addClass('hide');
	} else{
		plus.removeClass('hide');
		minus.addClass('hide');
	}
	item.find('.toggle-section').slideToggle(300);
}

// Open offer details automatically if hashtag is specified
jQuery(function() {
	var hashString = window.location.hash;
        hashString = hashString.replace("#","");
	if (hashString.length > 0) {
		var element = jQuery('body').find('a[name=' + hashString + ']').parent('.specialsListItem');
		//console.log(element);
        if (element.length > 0) {
            specialToggle(element);
        };
	};
});
  
// Create scrollabel table events
function tableResizeEvents() {  
    jQuery('div').not('.FormPanel').each(function() { // Do not make these tables scrollable
        jQuery(this).find('table').each(function() {
            var element = jQuery(this),
                parent = element.parent(),
                parent_w,
                element_w = element.width(),
                element_w_vp = element.width(),
                content_w = element.closest('#content').width(),
                sidebar_w = element.closest('#sidebar').width();    
            
            //if (viewport() < 769) {
            if(viewport() > 850) {
                parent_w = viewport() - (element.closest('#content').prev('#sidebar').parent().parent().prev('#nav').width() + element.closest('#content').prev('#sidebar').width() + 68 + 70);
            } else if (viewport() > 769) {
                parent_w = viewport() - (element.closest('#content').prev('#sidebar').parent().parent().prev('#nav').width() + 68);
            } else {
                parent_w = viewport() - 68; // window width and document padding
                //parent_w = element.closest('#content').width() - (element.width() + 50);
                //parent_w = 'auto';
            }
            
            /*console.log('resize viewport(): ' + viewport());
            console.log('content: '+element.closest('#content').width() + '; sidebar: ' + element.closest('#content').prev('#sidebar').width());     
            console.log('actual element: '+element.width()+'; actual parent: '+parent.width()); 
            console.log('new parent_w: '+parent_w);
            console.log('-----------------------');*/
            
            if(element_w > parent_w) {
                parent.css('width', parent_w);
                element.data('scrollWrapper').addClass('has-scroll');
            } else {
                parent.css('width', '100%;');
                element.data('scrollWrapper').removeClass('has-scroll');
            }
        });
    });
}      

// Set Viewport
function viewport() {
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;	
    return x;
}

/*jQuery.fn.fadeIn = function() {
    this.show();
}

jQuery.fn.fadeOut = function() {
    this.hide();
}*/

// user-click outside event
(function(jQuery){
  jQuery.fn.outside = function(ename, cb){
      return this.each(function(){
          var jQuerythis = jQuery(this),
              self = this;

          jQuery(document).bind(ename, function tempo(e){
              if(e.target !== self && !jQuery.contains(self, e.target)){
                  cb.apply(self, [e]);
                  if(!self.parentNode) jQuery(document.body).unbind(ename, tempo);
              }
          });
      });
  };
}(jQuery));


// Form On Focus //
var el = jQuery('input[type=text], textarea');
el.focus(function(e) {
    if (e.target.value == e.target.defaultValue)
        e.target.value = '';
});
el.blur(function(e) {
    if (e.target.value == '')
        e.target.value = e.target.defaultValue;
});

//Shopping Cart table adjustment
jQuery(function() {
	jQuery('.CartContentTable .OddRow').each(function() {
      
        jQuery(this).children('td:eq(4)').children('span:first-child').remove();
      
		// Unit price
		var price = jQuery(this).children('td:eq(3)').text();
		var target = jQuery(this).prev('.EvenRow').children('td:eq(3)').children('span');
		target.text(price);
		
		// Subtotal
		var priceT = jQuery(this).children('td:eq(5)').text();
		var targetT = jQuery(this).prev('.EvenRow').children('td:eq(5)').children('span:eq(1)');
		targetT.text(priceT);
      
        //Removing unneccessary icon
        jQuery(this).prev('.EvenRow').children('td:eq(5)').children('span:eq(0)').remove();
      
        jQuery(this).prev('.EvenRow').children('td:eq(5)').children('span:eq(0)').css('padding-right','32px');
		
		// Remove row
		jQuery(this).remove();
	});
  
    //Remove the a tag from the main gift card image
    jQuery('.productMainImage a img').each(function(){
		var image = jQuery(this).unwrap();
	});
    
    //Get the order ID from the shopping-cart page so it can be passed to the order-completed page
    //jQuery('span[id*="OrderIdValue"]').each(function(){
    //    var orderID = jQuery(this).text();
    //    console.log(orderID);
    //});
    
});
