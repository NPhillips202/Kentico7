/*
====================================================================================================
@name			Aloft South Beach - custom.js
@version		2.0.0
@author			Les Fleurimond / Cendyn/ONE
@author-uri		http://cendynone.com
@copyright		2014 Les Fleurimond / Cendyn/ONE
====================================================================================================
*/

/***************/
/** SET VARS **/
/***************/
var win = jQuery(window),
	doc = jQuery(document),
	isMobile = window.matchMedia('only screen and (max-width: 765px)'),

    htmlbody = jQuery('html, body'),
    html = jQuery('html'),
    body = jQuery('body'),
	
	selectbox = jQuery('select.selectbox'), //jQuery('select')
	
	loading = jQuery('#loading'),
	status = jQuery('#status'),
	
	wrapper = jQuery('#wrapper'),
	header_wrapper = wrapper.find('#header-wrapper'),
	header = header_wrapper.find('#header'),
	main_nav = header.find('#main-nav'),
	header_slider = jQuery('#header-slider'),
	footer = header_wrapper.find('#footer'),
	
	main_nav_smooth_scroll_links = header.find('a[href*=#]:not([href=#])'),	
	
    header_links = header.find('a').addClass('smooth-nav'),
    //footer_links = footer.find('a').addClass('smooth-nav'),
    
	//links = jQuery('a.smooth-nav'),
	links = wrapper.find('a[href*=#]:not([href=#])'),
	
	//mobile_nav_btn = jQuery('#mobile-nav-btn'),
	
	navs = jQuery('.nav ul'),
	first_lis = navs.find('> li:first').addClass('first'),
	last_lis = navs.find('> li:last').addClass('last'),
	
	// $sections incleudes all of the container divs that relate to menu items.
	sections = jQuery('.section'),
	intro_section = jQuery('#intro'),
	rooms_section = jQuery('#rooms'),
	features_section = jQuery('#features'),
	meetings_section = jQuery('#meetings'),
	local_area_section = jQuery('#local_area'),
	contact_section = jQuery('#contact'),
	footer_section = jQuery('#footer'),
	
	// booking engine
	datepicker = jQuery('.datepicker'),
	booking_mask = jQuery('#booking-mask'),
	book_now_link = jQuery('#book-now-link'),
	book_now_wrapper = jQuery('#book-now-wrapper'),
	book_now_top = book_now_wrapper.find('#book-now-top'),
	book_now = book_now_wrapper.find('#book-now'),
	book_now_bottom = book_now_wrapper.find('#book-now-bottom'),
	
	// Get window size
	winW = win.width(),
	winH = win.height(),

	// Define width of carousel
	jcarousel = jQuery('.jcarousel'),
	
	//var width = jcarousel.innerWidth(),
	jcarousel1, jcarousel2, jcarousel3, width1, width2, width3;
	
	jcarousel_wrapper = jQuery('.jcarousel-wrapper'),
	
	// init skrollr var as false
	s = false,
	// init nice var as false
	nice = false;


/***************/
/** Functions **/
/***************/
// page loader
var pageLoader = function() {
	jQuery('#status').fadeOut();
	loading.delay(200).fadeOut('slow');
	sections.css('visibility','visible');
};

// nicescroll
var initNiceScroll = function(elems) {
	// ----------------------------
	// Init Nicescroll after checking body tag contain smooth scroll action, then init nicescroll effect
	// ----------------------------
	nice = jQuery(elems).niceScroll({
		cursorcolor: '#b81f71', 
		cursorwidth: 10, 
		cursorborder: 0, 
		cursorborderradius: 0, 
		zindex: 99999, 
		mousescrollstep: 35, 
		background: 'transparent',//'#fff',//'#242424' 
		bouncescroll: true, 
		horizrailenabled: false,
		autohidemode: false,
		//smoothscroll: false, // Smooth Script is installed
		//smoothscroll: true, // Smooth Script is installed
		//grabcursorenabled: 'grab',
	});
};

// booking widget modal
var bookingWidgetModal = function() {
	// initiate datepicker
	//datepicker.datepicker();
	
	// Book Modal Modal	(Hidden to Visible) 
	book_now_link.click(function(e){
		if ( viewport() <= 765 ) {
		  var bookingUrl = 'http://m.starwoodhotels.com/alofthotels/property/overview/index.html?propertyID=3875';
			jQuery('#book-now-link').attr('href',bookingUrl);
		} else { 
			e.preventDefault();
		};
		var el = jQuery(e.target),
			link = jQuery(this);

		if(link.hasClass('show-book-now')) {
			openBookingWidgetModal(link);
		} else {
			closeBookingWidgetModal(link);
		};
	});
	// outside click for booking mask
	/*booking_mask.outside('click', function(e) {
		var $this = jQuery(this),
			$target = jQuery(e.target),
			isMobileBtn = false;
		
		//console.log($target.is( '.mobile *' ) + '; ' + $target.is( '.mobile' ) + '; ' + $target.is( '#hotels-toggle' ) + '; ' + $target.closest( 'a' ).is( '#hotels-toggle' ));
		
		if( 
		$target.is( '#ui-datepicker-div' ) || 
		$target.is( '#ui-datepicker-div *' )  
		) {
			isMobileBtn = true;
		};
		
		//console.log('jQuery(ev.target).is(#hotels-toggle): ' + ev.target.nodeName);
		//console.log('isMobileBtn: ' + isMobileBtn);
		//jQuery(this).parent().find('.od-nav-item').addClass('od-nav-item-active');
		//console.log('is mobile? '+isMobileBtn);
		//console.log(jQuery(ev.target).is( '#hotels-toggle' ));
		if( isMobileBtn === false ) {
			closeBookingWidgetModal(book_now_link);
		};
    });*/
};

// booking widget modal - NEW FROM NYC
var _bookingWidgetModal = function() {
	// initiate datepicker
	datepicker.datepicker();
	
	// Book Modal Modal	(Hidden to Visible) 
	book_now_link.click(function(e){  
		e.preventDefault(); 
		var el = jQuery(e.target),
			link = jQuery(this);
		
		if(link.hasClass('show-book-now')) {
			openBookingWidgetModal(link);
		} else {
			closeBookingWidgetModal(link);
		}
	});
	// outside click for booking mask
	booking_mask.outside('click', function(e) {
		var $this = jQuery(this),
			$target = jQuery(ev.target),
			isMobileBtn = false;
		
		//console.log($target.is( '.mobile *' ) + '; ' + $target.is( '.mobile' ) + '; ' + $target.is( '#hotels-toggle' ) + '; ' + $target.closest( 'a' ).is( '#hotels-toggle' ));
		
		if( 
		$target.is( '#ui-datepicker-div' ) || 
		$target.is( '#ui-datepicker-div *' )  
		) {
			isMobileBtn = true;
		};
		
		//console.log('jQuery(ev.target).is(#hotels-toggle): ' + ev.target.nodeName);
		//console.log('isMobileBtn: ' + isMobileBtn);
		//jQuery(this).parent().find('.od-nav-item').addClass('od-nav-item-active');
		//console.log('is mobile? '+isMobileBtn);
		//console.log(jQuery(ev.target).is( '#hotels-toggle' ));
		if( isMobileBtn === false ) {
			closeBookingWidgetModal(book_now_link);
		};
    });
};

// open booking modal 
var openBookingWidgetModal = function(link) {
	link.removeClass('show-book-now open');
	link.addClass('hide-book-now open');	
	book_now_wrapper.fadeIn().addClass('open');	
	setTimeout(function() {
		book_now_top.addClass('animate');
	}, 100);
	setTimeout(function() {
		book_now.addClass('animate');
	}, 250);
	setTimeout(function() {
		book_now_bottom.addClass('animate');
	}, 375);
	/*book_now_top.delay(1500).addClass('animate');
	book_now.delay(2000).addClass('animate');
	book_now_bottom.delay(2500).addClass('animate');*/
};

// close booking modal 
var closeBookingWidgetModal = function(link) {
	link.addClass('show-book-now open');
	link.removeClass('hide-book-now open');
	setTimeout(function() {
		book_now_bottom.removeClass('animate');
	}, 100);
	setTimeout(function() {
		book_now.removeClass('animate');
	}, 250);
	setTimeout(function() {
		book_now_top.removeClass('animate');
	}, 375);
	setTimeout(function() {
		book_now_wrapper.removeClass('open');
	}, 500);
	/*book_now_bottom.delay(500).removeClass('animate');
	book_now.delay(1000).removeClass('animate');
	book_now_top.delay(1500).removeClass('animate');
	book_now_wrapper.fadeOut().delay(2000).removeClass('open');*/
};

// mobile nav
var mobileNav = function() {

	// set vars
	var navigationContainer = jQuery('#nav'),
		mainNavigation = navigationContainer.find('#main-nav'),
		mainNavigationLink = mainNavigation.find('a'),
		mobileNav = jQuery('#mobile-nav a'),
		nicescrolldiv = jQuery('div[id^="ascrail"]'),
		toggle = jQuery('.toggle');
	
	//open or close the menu clicking on the bottom "menu" link
	mobileNav.on('click', function(e) {
	//jQuery('#mobile-nav a').on('click', function() {
		e.preventDefault();
		htmlbody.toggleClass('no-overflow');
		
		nicescrolldiv.toggleClass('hide');
		//html.getNiceScroll().remove();
		
		jQuery(this).toggleClass('menu-is-open');
		
		//we need to remove the transitionEnd event handler (we add it when scolling up with the menu open)
		mainNavigation.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend').toggleClass('is-visible');
	});
	mainNavigationLink.on('click', function() {
		mobileNav.removeClass('menu-is-open');
		mainNavigation.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend').removeClass('is-visible');
	});
	
	//check if the menu is open when scrolling up - for browser that supports transition
	if( mainNavigation.hasClass('is-visible') && !jQuery('html').hasClass('no-csstransitions') ) {
		//close the menu 
		//wait for the transition to end 
		//remove the .is-fixed class from the #cd-nav and the .has-transitions class from main navigation
	} 

	//check if the menu is open when scrolling up - fallback if transitions are not supported
	else if( mainNavigation.hasClass('is-visible')  && jQuery('html').hasClass('no-csstransitions') ) {
		//no need to wait for the end of transition - close the menu and remove the .is-fixed class from the #cd-nav
	} 

	//scrolling up with menu closed
	else {
		//remove the .is-fixed class from the #cd-nav and the .has-transitions class from main navigation
	}
	
};

// selectbox init
var selectBoxInit = function() {

	// add mobile class
	win.resize(function(){
		// add .mobile class to #utility-nav
		//if(viewport() < 675) {
		if(viewport() < 740) {
			jQuery('#utility-nav').addClass('mobile');
		} else {
			jQuery('#utility-nav').removeClass('mobile');
		}
		//adjustSections
	}).resize();
	
	//selectbox.find('option').eachfunction()
	// isProperty bali, jakarta
	
	selectbox.selectbox({
		//effect: (jQuery('#utility-nav').hasClass('mobile'))?'fade':'slide',
		effect: (jQuery('#utility-nav').is('.mobile')) ? 'fade' : 'slide',
		onOpen: function (inst) { 			
			var sbOptions = jQuery('ul#sbOptions_' + inst.uid + '.sbOptions').addClass(inst.id + ' fixed-top-value');
			//var sbOptions = jQuery('ul#sbOptions_' + inst.uid + '.sbOptions').addClass(inst.id);
			
			sbOptions.closest('#utility-nav.mobile').find('.sbOptions').each(function() {
				//var height = jQuery(this).css('max-height');
				var height = jQuery(this).css('height', 'auto').height(),
					top_old = jQuery(this).css('top'),
					//top_new = -(parseInt(height, 10) + 10) + 'px',
					//top_new = -(parseInt(height, 10)) + 1 + 'px',
					top_new = -(parseInt(height, 10)) + 6 + 'px',
					top = jQuery(this).css('top', top_new);
				
				jQuery(this).removeClass('fixed-top-value');
				//console.log('height: ' + height + ', ' + parseInt(height, 10) + ',\n top_old: ' + top_old + ',\n top_new: ' + top_new);
			});
		},
		onClose: function (inst) { 
			var sbHolder = jQuery('#sbHolder_' + inst.uid).addClass(inst.id);
			sbHolder.each(function() {
				//jQuery(this).find('.sbSelector').removeClass('sbClicked');
				jQuery(this).find('.sbInner').removeClass('sbClicked');
			});
		},
		onChange: function (val, inst) {			
			var selected_val = jQuery(this).val();
			
			//selectbox.closest('.FormPanel').find('option').attr('selected', false);
			//jQuery(this).prev('select').find('option').attr('selected', false);
			jQuery(this).find('option').attr('selected', false);
			
			//selectbox.closest('.FormPanel').find('option[value="'+ selected_val +'"]').attr('selected', true).change();
			//console.log(jQuery(this).val());
			jQuery(this).find('option[value="'+ selected_val +'"]').attr('selected', true).change();
			//jQuery(this).prev('select').find('option[value="'+ selected_val +'"]').attr('selected', true).change();
		},
	});
	
	// set Select Box Holder var
	var sbHolder = jQuery('.sbHolder');
	
	// force overflow-x on selectbox in case text exceed width of parent box
	// wrap .sbToggle and .sbSelector with .sbWrapper
	sbHolder.each(function() {
		jQuery(this).find('>.sbToggle').addClass('sbInner');
		/*if(jQuery(this).closest('#utility-nav').length) {
			jQuery(this).find('>.sbToggle').append('<i class="fa fa-globe"></i>');
		};*/
		jQuery(this).find('>.sbSelector').addClass('sbInner');
		jQuery(this).find('>.sbInner').wrapAll('<span class="sbWrapper"></span>'); // css specified in styles.css
	});	
	
	// force overflow-x on selectbox in case text exceed width of parent box
	/*win.resize(function(){
		// wrap .sbToggle and .sbSelector with .sbWrapper
		sbHolder.each(function() {
			jQuery(this).find('>.sbToggle').addClass('sbInner');
			jQuery(this).find('>.sbSelector').addClass('sbInner');
			jQuery(this).find('>.sbInner').wrapAll('<span class="sbWrapper"></span>'); // css specified in styles.css
			//jQuery(this).find('>.sbInner').wrapAll('<span class="sbWrapper" style="max-width:'+jQuery(this).width()+'px"></span>'); // css specified in styles.css
		});	
	}).resize();*/
	
	// add click event to .sbToggle to add .sbClicked class to target element
	sbHolder.click(function(){
		if(jQuery(this).find('.sbToggle').hasClass('sbToggleOpen')) {
			//jQuery(this).find('.sbSelector').addClass('sbClicked');
			jQuery(this).find('.sbInner').addClass('sbClicked');
		}
	});
	
	// booking engine list items
	var first_booking_list_item = sbHolder.find('ul.sbOptions > li:first').each(function(){
			var _first_booking_list_item = ( jQuery(this).text() == 'Select One' || jQuery(this).text() == '' ) ? jQuery(this).addClass('first') : '';
		}),
		last_booking_list_item = sbHolder.find('ul.sbOptions > li:last').addClass('last');
	
	// booking engine list items
	/*var booking_engine = jQuery('#booking-engine'),
	first_booking_list_item = booking_engine.find('ul.sbOptions > li:first').addClass('first'),
	last_booking_list_item = booking_engine.find('ul.sbOptions > li:last').addClass('last');*/
	
	//_booking_engine = booking_engine.find('ul').each(function(){ console.log(jQuery(this).html()); });	
};

// slick carousel
var slickSlider = function() {
	
	// rooms section
	var rooms_section_slick = rooms_section.find('.slick');
	rooms_section_slick.unslick();
	rooms_section_slick.slick({
		//rtl: false,
		//dots: true,
		//infinite: false,
		speed: 300,
		slidesToShow: 2,
		slidesToScroll: 1,
		responsive: [
			{
			breakpoint: 1024,
		  		settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					//infinite: true,
					//dots: true
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});	
	
	// features section - nav
	var features_section_slick = features_section.find('.slick.slick-nav');
	features_section_slick.unslick();
	features_section_slick.slick({
		//rtl: false,
		//dots: true,
		//infinite: false,
		lazyLoad: 'ondemand',
		speed: 300,
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: '.slick-for',
		focusOnSelect: true,
		appendArrows: features_section.find('.slick-wrapper'),
		responsive: [
			{
				breakpoint: 1000,
				settings: {
					slidesToShow: 2,
					//slidesToScroll: 1
				}
			},
			{
				breakpoint: 850,
				settings: {
					slidesToShow: 1,
					//slidesToScroll: 1
				}
			},
		],
		onInit: function(slick) {
			// set vars
			var slick_wrapper = features_section.find('.slick-wrapper'),
				slick_slide = slick_wrapper.find('.slick-slide');
				
			//var cat = (jQuery('.slick').slickCurrentSlide()) + 1;
			//console.log(slick.currentSlide);
			//console.log(slick.currentSlide+1);
			//console.log(cat);
			
			slick_slide.removeClass('slick-current');
			slick_wrapper.find('.slick-slide[index="'+slick.currentSlide+'"]').addClass('slick-current');
		},
		onAfterChange: function(slick, index) {
			// set vars
			var slick_wrapper = features_section.find('.slick-wrapper'),
				slick_slide = slick_wrapper.find('.slick-slide'),
				slick_slide_length = slick_slide.length; // 5 - old val
				
			//console.log(index);
			if(index==slick_slide_length) {
				index = 0;
				//console.log('changed: '+index);
			};
			slick_slide.removeClass('slick-current');
			slick_wrapper.find('.slick-slide[index="'+(index)+'"]').addClass('slick-current');
		},
	});	
	
	// features section - hi-res
	var features_section_slick_for = features_section.find('.slick.slick-for');
	features_section_slick_for.unslick();
	features_section_slick_for.slick({
		//rtl: false,
		//dots: true,
		//infinite: false,
		speed: 300,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.slick-nav',
		draggable: false,
		//responsive: true,
		//variableWidth: true,
	});	
	
	// meetings section
	var meetings_section_slick = meetings_section.find('.slick');
	meetings_section_slick.unslick();
	meetings_section_slick.slick({
		speed: 300,
		slidesToShow: 1,
		slidesToScroll: 1,
		lazyLoad: 'ondemand',
	});	
	
	// header section
	var slider = header_slider.find('.slick');
	
	//if (win.width() < 828) {
	//if(viewport() < 828){
	
	if(viewport() <= 765){
	//if (window.matchMedia("(max-width: 765px)").matches) {
		if(slider.hasClass('slick-initialized')) {
			slider.unslick();
		}		
		slider.slick({
			//rtl: false,
			//dots: true,
			infinite: true,
			lazyLoad: 'ondemand',
			speed: 300,
			slidesToShow: 1,//2,
			slidesToScroll: 1,
			//variableWidth: true,
			//adaptiveHeight: true,
			slide: 'div.slick-slider-img',//'img',
			//infinite: true,
			/*responsive: [
				{
				breakpoint: 828,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						//infinite: true,
						//dots: true
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]*/
		});
	} else {
		if(slider.hasClass('slick-initialized')) {
			slider.unslick();
		}
    }
	
};

// adjust sections function
var adjustSections = function() {
	
	// Keep minimum height 550
	if(winH <= 480) {
		winH = 480;//789
	}
	
	// Resize sections
	sections.each(function(){
		// #intro-bg
		if(jQuery('#intro-bg').length) {
			jQuery('#intro-bg').height(winH);
		}
		// #intro
		if(jQuery(this).is('#intro')) {
			//console.log(winH);
			// TEMP!!! //jQuery('#intro').height(winH);
			jQuery('#intro').height(winH);
		}
		// #overview
		if(jQuery(this).is('#overview')) {
			var o = jQuery('#overview'),
				lt = o.find('.left-top'),
				ot = o.find('.title'),
				oa = o.find('.article'),
				
				oap = oa.find('> p'),
				oai = oa.find('.hotel-bldg'),
				
				lt_h = lt.height(),
				oa_h = oa.height(),
				
				oap_h = oap.height(),
				oap_mb = oap.css('margin-bottom'),
				
				oai_h = oai.height(),
				oai_t = oai.css('top'),
				
				lt_t = lt.css('top');
				
			lt.css('top',-lt_h);
			
			if(viewport() <= 765){
				// TEMP!!! //ot.height('auto');
			} else  {
				//var val = parseInt(oai_t) || 0;
				//oa_h = (val) ? oa_h + parseInt(oai_t) : oa_h;
				
				//console.log(oap_mb);
				//var val = parseInt(oap_mb) || 0;
				//oa_h = (val) ? oa_h + parseInt(oap_mb) : oa_h;
				//console.log(oap_mb + oa_h);
				
				// TEMP!!! //ot.height(oa_h + 10);
				//ot.height(oap_h + oai_h);
			}
			//ot.height(oa_h - 75);
		}
		// #rooms
		if(jQuery(this).is('#rooms')) {
			var lt = jQuery('#rooms').find('.top'),
				lt_h = lt.height(),
				lt_mh = lt.css('max-height'),
				lt_t = lt.css('top');
				
			if(viewport() <= 765){
				if(lt_h >= 120.5) {	
				//if(lt_h >= 60.5 || lt_h == 120.5) {					
					lt.height(lt_h/2);
					lt.css('top',-(lt_h/2)*(.85));
				} else {
					lt.height(lt_h);
					lt.css('top',-lt_h*(.85));
				}
			} else {
				lt.height(241);
				lt.css('top',-141);
			}
		}
		// #features
		if(jQuery(this).is('#features')) {
			var f = jQuery('#features'),
				tl = f.find('.top-left'),
				tr = f.find('.top-right'),
				bl = f.find('.bottom-left'),
				br = f.find('.bottom-right'),
				
				fc = f.find('.content'),
				fc_h = fc.height(),
				
				ft = f.find('.title'),
				fa = f.find('.article'),
				ft_h = ft.height(),
				fa_h = fa.height(),
				
				ft_fa_h = ft_h + fa_h,
				
				tl_h = tl.height(),
				tl_mh = tl.css('max-height'),
				tr_h = tr.height(),
				tr_mh = tr.css('max-height'),
				bl_h = bl.height(),
				bl_mh = bl.css('max-height'),
				br_h = br.height();
				br_mh = br.css('max-height');
			
			tl.css('bottom',fc_h);
			tr.css('bottom',fc_h);
			bl.css('top',fc_h);
			br.css('top',fc_h);
			
			if(viewport() <= 480){
				tl.css('bottom',fc_h - 1);
				tr.css('bottom',fc_h - 1);
			}
			
			//if(viewport() <= 480 || viewport() >= 769){
			if(viewport() <= 480 || viewport() >= 766){
				f.height('auto');
				//f.find('.jcarousel-hires-img-loader').css('top','auto');
				f.find('.slick-hires-img-loader').css('top','auto');
			} else {
				/*f.height(f.find('.content').height() + (f.find('.jcarousel-bgimg').height() / 3) );
				f.find('.jcarousel-hires-img-loader').css('top',f.find('.article').height());*/
				f.height(f.find('.content').height() + (f.find('.slick-hires-img-loader .slick-for div>img').height() / 3) );
				f.find('.slick-hires-img-loader').css('top',f.find('.article').height());
			}
		}
		// #meetings
		if(jQuery(this).is('#meetings')) {
			var m =  jQuery('#meetings'),
				lt = m.find('.left-top'),
				mt = m.find('.title'),
				ma = m.find('.article'),
				//mj = m.find('.jcarousel-wrapper'),
				mj = m.find('.slick-wrapper'),
				mj_div = mj.find('.slick>div'),
				
				lt_h = lt.height(),
				lt_t = lt.css('top'),
				ma_h = ma.height(),
				mj_h = mj.height(),
				mj_div_h = mj_div.height(),
				
				mt_w = mt.width(),
				mc = m.find('.content'),
				mc_w = mc.width();
				
			// NOT NEEDED --- mj_div_h = mj_div_h; // re-cache this var, needed in order to populate height
			
			// set width on slider
			//mj_div.width(mj_div.parent().width());
			
			lt.css('top',-lt_h);
			
			if(viewport() <= 765){
				// set width on slider
				mj_div.width('auto');
				// TEMP!!! //m.find('.title').height('auto');
			} else {
				// set width on slider
				mj_div.width(mc_w - mt_w);
				//m.find('.title').height(ma_h + mj_h + 10);
				// TEMP!!! //m.find('.title').height(ma_h + mj_div_h + 10);
			}
		}
		// #local-area
		if(jQuery(this).is('#local-area')) {
			var la =  jQuery('#local-area'),
				t = la.find('.top'),
				t_h = t.height(),
				t_t = t.css('top');
			//if(viewport() <= 768){
			if(viewport() <= 765){
				//t.css('top',-t_h/2);
				//t.css('height',t_h/2);
				if(t_h >= 210) {
					//t.css('height',t_h/3);
					t.height(t_h/3);
					t.css('top',-t_h/3);
				} else {
					t.css('top',-t_h);
				}
			} else {
				//t.css('height','210px');
				
				t.height('210px');
				t.css('top','-210px');
				//t.height(t_h);
				//t.css('top',-t_h);
			}
		}
		// #contact
		if(jQuery(this).is('#contact')) {
			var c =  jQuery('#contact'),
				lt = c.find('.left-top'),
				lb = c.find('.left-bottom'),
				ci = c.find('.info'),
				cmw = c.find('.map-wrapper'),
				cm = c.find('.map'),
				lt_h = lt.height(),
				lt_t = lt.css('top'),
				lb_h = lb.height(),
				lb_t = lb.css('top'),
				ci_h = ci.height();
				cm_h = cm.height();
				
			// init
			/*console.log(lt_h);
			console.log(lt_t);
			console.log(lb_h);
			console.log(lb_t);
			console.log(ci_h);
			console.log(cm_h);*/
			
			lt.height(lt_h);
			lt.css('top',-lt_h);
			lb.height(lb_h);
			lb.css('bottom',-lb_h);
			
			var f_h = jQuery('#footer').find('.top-left').height();
			
			//if(viewport() <= 768){
			if(viewport() <= 765){
				// set #contact margin-bottom
				c.css('margin-bottom', 'auto');
				// set .info margin-bottom
				//ci.css('margin-bottom',-ci_h);
				// set .map-wrapper min-height
				cmw.css('min-height','100%');
				
				ci.height('auto');
			} else {
				//ci.css('margin-bottom','auto');
				//var ci_h = c.find('.map').height() - (lt_h + lb_h + 50);
				
				//var ci_h = cm_h - lb_h;
				var ci_h = cm_h - f_h;
				
				// set #contact min-height			
				//c.css('min-height',cm_h - 20);
				//c.css('min-height',cm_h + 10);
				c.css('min-height',cm_h);
				
				//c.css('margin-bottom', f_h);
				//c.height(f_h + ci_h);
				
				// set .info height
				ci.height(ci_h + 15);
				//ci.height(ci_h + 10);			
				//ci.height(ci_h);			
				
				//ci.css('margin-bottom',-(cm_h - (lt_h + lb_h)));
				
				// set .map-wrapper min-height
				//cmw.css('min-height',cm_h - 10);
			}
		}
		
		// #header-slider
		if(jQuery(this).is('#header-slider')) {
			var hs = jQuery('#header-slider'),
				s = hs.find('.slick > .slick-slider-img'),
				ls = hs.find('.slick > .first'),
				rs = hs.find('.slick > .second'),
				s_nh = ((hs.width()*388)/1280) + 'px';

			//if(viewport() > 828){
			if(viewport() >= 766){
				ls.height(s_nh);
				rs.height(s_nh);
			} else {
				ls.height('auto');
				rs.height('auto');
			};
		};	
		// #main
		if(jQuery(this).is('#main')) {		
			var m = jQuery('#main'),
				lt = m.find('.left-top'),
				mt = m.find('.title'),
				ma = m.find('.article'),				
				mt_h = mt.height(),
				mt_h = mt.css('padding-bottom'),
				map = ma.find('> p'),
				mai = ma.find('.hotel-bldg'),
				lt_h = lt.height(),
				ma_h = ma.height(),				
				map_h = map.height(),
				map_mb = map.css('margin-bottom'),
				mai_h = mai.height(),
				mai_t = mai.css('top'),				
				lt_t = lt.css('top');
				
			//lt.css('top',-lt_h);
			
			if(viewport() <= 765){
				mt.height('auto');
			} else  {				
				mt.height(ma_h + 10);
				//mt.height(ma_h - 100);
			}
			
			// 
			var f = jQuery('#footer'),
				tl = f.find('.top-left'),
				tl_h = tl.height(),				
				mt_h_n = tl_h-173;
				
			//mt.css('padding-bottom',tl_h-133);
			//mt.css('padding-bottom',mt_h_n);
		
		};
		
		// #footer
		if(jQuery(this).is('#footer')) {
			var f = jQuery('#footer'),
				tl = f.find('.top-left'),
				tr = f.find('.top-right'),
				pbg = f.find('.pattern-bg'),
				f_h = f.height(),
				tl_h = tl.height(),
				tr_h = tr.height();
			tl.css('bottom',f_h);
			//tl.css('top',-tl_h);
			tr.css('bottom',f_h);
			//pbg.css('min-height',f_h + tl_h);
			pbg.height(f_h + tl_h);
			
			if(viewport() <= 480) {
				tl.css('bottom',f_h);
				//tl.css('top',-tl_h);
				//tl.css('bottom',f_h-17);
			}
			
			if(viewport() <= 480 || viewport() >= 769){
			} else {
			}
		}
	});
	
};

// Set Viewport
var viewport = function() {
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;	
    return x;
};

// Get CurrentScroll
var getCurrentScroll = function() {
	return window.pageYOffset || document.documentElement.scrollTop;
};

// user-click outside event
(function($) {
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
(function(jQuery) {
	jQuery.fn.clickoutside = function(callback) {
		var outside = 1, self = $('#wrapper').find(this);
		self.cb = callback;
		this.click(function() { 
			outside = 0; 
		});
		$(document).click(function() { 
			outside && self.cb();
			outside = 1;
		});
		return $(this);
	}
})(jQuery);

// Define "Smart Resize" function
(function($,sr) {
	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	// http://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/
	// http://www.paulirish.com/demo/resize
	var debounce = function (func, threshold, execAsap) {
		var timeout;
		return function debounced () {
			var obj = this, args = arguments;
			function delayed () {
				if (!execAsap) {
					func.apply(obj, args);
				};
				timeout = null;
			};

			if (timeout) {
				clearTimeout(timeout);
			} else if (execAsap) {
				func.apply(obj, args);
			};
			timeout = setTimeout(delayed, threshold || 100);
		};
	}
	// smartresize 
	jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
})(jQuery,'smartresize');


/***************/
/** BEGIN OF WINDOW.LOAD FUNCTION **/
/***************/
win.bind('load', function() {
	
	// fade out page loader and fade in page
	//pageLoader();
	
	// call slickSlider for rooms, features and meetings sections
	if (jQuery('#header-slider').length > 0) {
		win.resize(slickSlider).resize();
	} else {
		slickSlider();
	};
	
	// adjust sections
	win.resize(adjustSections).resize();
	//win.smartresize(adjustSections).resize();
	
});


/***************/
/** BEGIN OF DOC.READY FUNCTION **/
/***************/
jQuery(function() {
	
	// adjust sections
	//win.resize(adjustSections).resize();
    //adjustSections();
	
	// selectbox
	selectBoxInit();
	
	// initiate nicescroll
	initNiceScroll(html);
	
	// mobile nav
	mobileNav();
	
	// start event for booking widget
	bookingWidgetModal();

	// Sitemap
	jQuery(".sitemap-toggle").live('click',function(e) {
		e.preventDefault();
		if (jQuery('.sitemap-float').is(':visible')) {
			jQuery(".sitemap-float").fadeOut(500);
		} else {
			jQuery(".sitemap-float").fadeIn(500);
		};
	});
	// Add Link to footer
	jQuery('#footer').find('.nav ul').append('<li><a href="#" class="sitemap-toggle">Site Map</a></li>');
	
	// mobile device adjustments for selectbox
    if (isMobile.matches) {
		//alert('mobile');
		selectbox.css('display','inline-block');
		jQuery('.sbHolder').addClass('hide');
	};
	
	//
	var el = jQuery('input[type=text], textarea');
	el.focus(function(e) {
		if (e.target.value == e.target.defaultValue)
			e.target.value = '';
	});
	el.blur(function(e) {
		if (e.target.value == '')
			e.target.value = e.target.defaultValue;
	});
	
});


/***************/
/** DO RESIZE EVENT FUNCTION **/
/***************/
// adjust sections
//win.bind('load resize', adjustSections);
//win.bind('resize', adjustSections);

//win.on('load', adjustSections);
//win.smartresize(adjustSections);

win.on('resize', function(){

    /*$('.inner').each(function(){

        var box = $(this);        
        var width = box.width();
        var height = box.height();        
        
        box.attr('data-size', width+'x'+height+' (r: '+(width/height).toFixed(2)+')');

    });*/
}).trigger('resize');

//win.on('resize', adjustSections).trigger('resize');
