
/*
@name			Denver Marriott Tech Center - custom.js
@version		1.0.0
@author-uri		http://cendynone.com
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
	header = header_wrapper.find('#header'),header_slider = jQuery('#header-slider'),
	footer = header_wrapper.find('#footer'),
	main_nav = header.find('#main-nav'),

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
	intro_bg_section = jQuery('#intro-bg'),
	intro_section = jQuery('#intro'),
	meetings_events_section = jQuery('#meetings-events'),
	rooms_suites_section = jQuery('#rooms-suites'),
	dining_section = jQuery('#dining'),
	local_scene_section = jQuery('#local-scene'),
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
	loading.delay(400).fadeOut('slow');
	sections.delay(400).css('visibility','visible');
};

// nicescroll
var initNiceScroll = function(elems) {
	// ----------------------------
	// Init Nicescroll after checking body tag contain smooth scroll action, then init nicescroll effect
	// ----------------------------
	nice = jQuery(elems).niceScroll({
		cursorcolor: '#822626',
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
			//var bookingUrl = 'http://www.marriott.com/dencd';
			//jQuery('#book-now-link').attr('href',bookingUrl);
		} else {
			e.preventDefault();
		};
		var el = jQuery(e.target),
			link = jQuery(this);

		if(link.hasClass('show-book-now')) {
			openBookingWidgetModal(link);
		} else {
			closeBookingWidgetModal(link);
		}
	});
	// outside click for booking mask
	/*booking_mask.outside('click', function(e) {
		var $this = jQuery(this),
			$target = jQuery('#wrapper').find(e.target),
			isMobileBtn = false;

		//console.log($target.is( '.mobile *' ) + '; ' + $target.is( '.mobile' ) + '; ' + $target.is( '#hotels-toggle' ) + '; ' + $target.closest( 'a' ).is( '#hotels-toggle' ));

		console.log($target);

		if(
		$target.is( '#ui-datepicker-div' ) ||
		$target.is( '#ui-datepicker-div *' )
		) {
			isMobileBtn = true;
		};

		//console.log('jQuery(ev.target).is(#hotels-toggle): ' + ev.target.nodeName);
		console.log('isMobileBtn: ' + isMobileBtn);
		//jQuery(this).parent().find('.od-nav-item').addClass('od-nav-item-active');
		//console.log('is mobile? '+isMobileBtn);
		//console.log(jQuery(ev.target).is( '#hotels-toggle' ));
		if( isMobileBtn === false ) {
			closeBookingWidgetModal(book_now_link);
		};
    });
	//
	booking_mask.clickoutside(function(e) {
		var $this = jQuery(this),
			$target = jQuery('#wrapper').find($this),
			isMobileBtn = false;

		if(
		$target.is( '#ui-datepicker-div' ) ||
		$target.is( '#ui-datepicker-div *' )
		) {
			isMobileBtn = true;
		};

		console.log('target HTML: ' + e);
		console.log('isTarget True: ' + $target.is( '#ui-datepicker-div' ));
		console.log('isMobileBtn: ' + isMobileBtn);

		if( isMobileBtn === false ) {
			closeBookingWidgetModal(book_now_link);
		};
	});*/

	//
	/*jQuery('#wrapper').find('*').click(function(e) {
		var $this = jQuery(this),
			$target = jQuery(e.target),
			isMobileBtn = false;

		console.log('sdvfdsisMobileBtn: ' + $target.html());
		console.log($target.is( '#book-now-link' ) );
		if( $target.is( '#book-now-link' ) ) {
			isMobileBtn = true;
		};

		//console.log('target HTML: ' + e);
		//console.log('isTarget True: ' + $target.is( '#ui-datepicker-div' ));
		console.log('isMobileBtn: ' + isMobileBtn);

		if( isMobileBtn === false ) {
			closeBookingWidgetModal(book_now_link);
		};
	});*/

};

// open booking modal
var openBookingWidgetModal = function(link) {
	link.removeClass('show-book-now open');
	link.addClass('hide-book-now open');
	//book_now_wrapper.fadeIn().addClass('open');
	book_now_wrapper.addClass('open');
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
	//jQuery('#mobile-nav a').on('click', function() {
	mobileNav.on('click', function(e) {
		e.preventDefault();
		htmlbody.toggleClass('no-overflow');
		//jQuery('#skrollr-body').toggleClass('no-overflow');
		//jQuery('#main').toggleClass('hide');

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
	} else {//scrolling up with menu closed
		//remove the .is-fixed class from the #cd-nav and the .has-transitions class from main navigation
	}

	/*document.addEventListener("touchstart", function(){}, true);
	mobileNav.bind('click mousedown mouseup touchstart touchmove', function(e) {
        e.preventDefault();
        jQuery(this).toggleClass('hover');
    });*/

};

// sub nav
var subNav = function() {

	/*win.resize(function(){
		var containerHasSubNav = jQuery('#main').find('.container:first:has(.nav)');
		// give room to subnav - check styles.css;
		//if(viewport() < 675) {
		if(viewport() < 740) {
			containerHasSubNav.addClass('has-subnav');
		} else {
			containerHasSubNav.removeClass('has-subnav');
		}
	}).resize();*/
	// Sub nav Click
	jQuery('#mobile-sub-nav a.toggle').click(function(e) {
		e.preventDefault();
		jQuery('#sub-nav-side>ul:visible').stop().fadeOut(400, function() {
			jQuery(this).css('display','none');
		});
		jQuery('#sub-nav-side>ul').not(":visible").stop().fadeIn(400, function() {
			jQuery(this).css('display','block');
		});
		//console.log(jQuery('#sub-nav-side>ul:visible').length);

		if(jQuery('#mobile-sub-nav a.toggle').hasClass('toggle-on')){
			jQuery('#mobile-sub-nav a.toggle').removeClass('toggle-on');
		} else {
			jQuery('#mobile-sub-nav a.toggle').addClass('toggle-on');
		}
	});

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

	// meetings section
	intro_bg_section.find('.slick').slick({
		speed: 300,
		slidesToShow: 1,
		slidesToScroll: 1,
		lazyLoad: 'ondemand',
	});

	// history section
	meetings_events_section.find('.slick').slick({
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

	// stay_with_us section - nav
	rooms_suites_section.find('.slick.slick-nav').slick({
		//rtl: false,
		//dots: true,
		//infinite: false,
		lazyLoad: 'ondemand',
		speed: 300,
		slidesToShow: 3,
		slidesToScroll:1,

		//centerMode: ((rooms_suites_section.find('.slick-wrapper slick-slide').length <= 1 ) ? true : false),

		asNavFor: '.slick-for',
		focusOnSelect: true,
		appendArrows: rooms_suites_section.find('.slick-wrapper'),
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
			var slick_wrapper = rooms_suites_section.find('.slick-wrapper'),
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
			var slick_wrapper = rooms_suites_section.find('.slick-wrapper'),
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

	// stay_with_us section - hi-res
	rooms_suites_section.find('.slick.slick-for').slick({
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
	dining_section.find('.slick').slick({
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
		if(intro_bg_section.length) {
			intro_bg_section.height(winH);
			intro_bg_section.find('.slick-hires-img-loader .slick .slick-slide').height(winH);
		};
		// #intro
		if(jQuery(this).is('#intro')) {
			//console.log(winH);
			// TEMP!!! //jQuery('#intro').height(winH);
			jQuery('#intro').height(winH);
		};/**/
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
		};
		// #meetings-events
		if(jQuery(this).is('#meetings-events')) {
			var lt = jQuery('#meetings-events').find('.top'),
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
		// #rooms-and-suites
		if(jQuery(this).is('#rooms-suites')) {
			var f = jQuery('#rooms-suites'),
				tl = f.find('.top-left'),
				tr = f.find('.top-right'),
				bl = f.find('.bottom-left'),
				br = f.find('.bottom-right'),

				fc = f.find('.content'),
				//fc_h = fc.height(),
				fc_h = (fc.height() > fc.css('max-height')) ? fc.height() : fc.css('max-height'),

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

			//console.log(fc_h);

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
		// #dining
		if(jQuery(this).is('#dining')) {
			var m =  jQuery('#dining'),
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
		// #local-scene
		if(jQuery(this).is('#local-scene')) {
			var la =  jQuery('#local-scene'),
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
				//lb = c.find('.left-bottom'),
				ci = c.find('.info'),
				cmw = c.find('.map-wrapper'),
				cm = c.find('.map'),
				lt_h = lt.height(),
				lt_t = lt.css('top'),
				//lb_h = lb.height(),
				//lb_t = lb.css('top'),
				ci_h = ci.height();
				cm_h = cm.height();

			// init
			/*console.log(lt_h);
			console.log(lt_t);
			console.log(lb_h);
			console.log(lb_t);
			console.log(ci_h);
			console.log(cm_h);*/

			//console.log(lt_h);
			lt.height(lt_h);
			lt.css('top',-lt_h);
			//lb.height(lb_h);
			//lb.css('bottom',-lb_h);

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
			}
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
				mai2 = m.find('.main-content-bg'),
				lt_h = lt.height(),
				ma_h = ma.height(),
				map_h = map.height(),
				map_mb = map.css('margin-bottom'),
				mai_h = mai.height(),
				mai2_h = mai2.height(),
				mai_t = mai.css('top'),
				lt_t = lt.css('top');

			//lt.css('top',-lt_h);

			if(viewport() <= 765){
				mt.height('auto');
			} else  {
				//mt.height(ma_h + 10);
				mt.height(mai2_h - 100);
			}

			//
			var f = jQuery('#footer'),
				//tl = f.find('.top-left'),
				tl = f.find('.copyright'),
				//tl_h = tl.height(),
				tl_h = tl.css('padding-top'),
				//mt_h_n = tl_h-173;
				mt_h_n = tl_h;

			//console.log(tl_h);

			//mt.css('padding-bottom',tl_h-133);
			ma.css('padding-bottom',mt_h_n);

		};

		// #footer
		if(jQuery(this).is('#footer')) {
			var f = jQuery('#footer'),
				tl = f.find('.top-left'),
				tr = f.find('.top-right'),
				//pbg = f.find('.pattern-bg'),
				f_h = f.height(),
				tl_h = tl.height(),
				tr_h = tr.height();
			//tl.css('bottom',f_h);
			//tl.css('top',-tl_h);

			//tr.css('bottom',f_h);
			//tr.css('bottom',tl_h);

			//pbg.css('min-height',f_h + tl_h);
			//pbg.height(f_h + tl_h);

			if(viewport() <= 480) {
				//tl.css('bottom',f_h);
				//tl.css('top',-tl_h);
				//tl.css('bottom',f_h-17);
			}

			if(viewport() <= 480 || viewport() >= 769){
			} else {
			}
		};
	});

};

// skrollr function
var skrollrInit = function() {

	// Init Skrollr for 768 and up
    if(viewport() >= 765) { //if( winW >= 768) {

		// Init Skrollr
		s = skrollr.init({
			//smoothScrolling: false,//true,
			//smoothScrollingDuration: 200,
			forceHeight: false,
			//forceHeight: true,
			edgeStrategy: 'set',//'ease',//'reset',
			easing: {
				// ref: https://github.com/Prinzhorn/skrollr#easing
				SUPER: Math.random,
				inverted: function(p) {
					return 1-p;
				},
				vibrate: function(p) {
					return Math.sin(p * 10 * Math.PI);
				},
				sin: function(p) {
					return (Math.sin(p * Math.PI * 2 - Math.PI/2) + 1) / 2;
				},
				cos: function(p) {
					return (Math.cos(p * Math.PI * 2 - Math.PI/2) + 1) / 2;
				},
			},
			render: function(data) {
				// Debugging - Log the current scroll position.
				//document.querySelector('.data').innerHTML = data.curTop;
				//console.log(data.curTop);
			},
			mobileDeceleration: 0.004,
			mobileCheck: function() {
                //hack - forces mobile version to be off
				//return (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera);
                return false;
			},
		});

		// Refresh Skrollr after resizing our sections
		s.refresh(sections);

	} else {

		// Init Skrollr
		s = skrollr.init()
		s.destroy();

	}

    // Check for touch
    if(Modernizr.touch) {

        // Init Skrollr
        var s = skrollr.init();
        s.destroy();

    }

	// disable skrollr if using handheld device
    /*if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        skrollr.init().destroy();
    }*/

	//s.refresh(sections);

};

// one pager scroller - onscroll and onclick positioning
var onePagerScroller = function() {

	var duration = 2000,
		easing = 'easeInOutQuint',
		header_wrapper_height = header_wrapper.height();

    /**
     * This part causes smooth scrolling using scrollto.js
     * We target all a tags inside the nav, and apply the scrollto.js to it.
     */
    links.click(function(e){
        e.preventDefault();
		var dataSection = jQuery(this).attr('data-section'),
			customLink = jQuery('a[data-section="' + dataSection + '"]'),
			customSection = jQuery('.section[data-section="' + dataSection + '"]'),
			customSectionOffset = customSection.offset().top - (header_wrapper_height - 2);
		htmlbody.stop().animate({
			scrollTop: customSectionOffset,
		}, duration, easing);
    });

    /**
     * This part handles the highlighting functionality.
     * We use the scroll functionality again, some array creation and
     * manipulation, class adding and class removing, and conditional testing
     */
    var aChildren = main_nav.find('li').children(); // find the a children of the list items
    var aArray = []; // create the empty aArray
    for (var i=0; i < aChildren.length; i++) {
        var aChild = aChildren[i],
			aHref = jQuery(aChild).attr('href');
		if (aHref !== undefined)
			aArray.push(aHref);
    } // this for loop fills the aArray with attribute href values

    win.scroll(function(){
        var windowPos = win.scrollTop(), // get the offset of the window from the top of page
			windowHeight = win.height(), // get the height of the window
			docHeight = doc.height();

		//console.log(aArray.length);

        for(var i=0; i < aArray.length; i++) {
			// ref: http://tecfa.unige.ch/guides/js/ex-intro/angus_strings.html
			// ref: http://eloquentjavascript.net/09_regexp.html
			//console.log(aArray[i]);
			//console.log(aArray[i].replace(/\//g, ""));
			//console.log(/\//g.test(aArray[i]));
			if(/\//g.test(aArray[i])){
				return false;
			};
            var theID = aArray[i],
				// divs
				div = jQuery(theID),
				divPrev = jQuery(theID).prev(),
				divNext = jQuery(theID).next(),

				// get the offset of the div from the top of page
				divPos = div.offset().top - (header_wrapper_height + 20),
				//divPos = div.offset().top - (header_wrapper_height + 1),
				//divPos = div.offset().top - (header_wrapper_height - 2),

				// get the height of the div in question
				divHeight = div.height() - 100;

            if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                jQuery('a[href="' + theID + '"]').addClass('active');

				if(0) {
					htmlbody.delay(1000).animate({
						scrollTop: divPos,
					}, duration, easing);
				} else {

				};
            } else {
                jQuery('a[href="' + theID + '"]').removeClass('active');
            };
        };

        if(windowPos + windowHeight == docHeight) {
            if (!main_nav.find('>ul>li:last-child a').hasClass('active')) {
                var navActiveCurrent = jQuery('.active').attr('href');
                jQuery('a[href="' + navActiveCurrent + '"]').removeClass('active');
                main_nav.find('>ul>li:last-child a').addClass('active');
			};
        };
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
}

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

// Submit functions
var submitEmailForm = function(emailForm, defaultValue) {
	var email = emailForm.find('#email').val();
	if (email == defaultValue || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
		alert("Please enter a valid email address.");
		return false;
	};
	document.location.href = ('/email-signup/?em=' + email);
};


/***************/
/** BEGIN OF WINDOW.LOAD FUNCTION **/
/***************/
//window.onload = function(){
win.bind('load', function() {

	// fade out page loader and fade in page
	//pageLoader();

	// call slickSlider for rooms, features and meetings sections
	if (jQuery('#header-slider').length > 0) {
		win.resize(slickSlider).resize();
	} else {
		slickSlider();
	}

	// adjust sections
	adjustSections();
	win.resize(adjustSections);
	//win.resize(adjustSections).resize();
	//win.smartresize(adjustSections).resize();

});
//};


/***************/
/** BEGIN OF DOC.READY FUNCTION **/
/***************/
jQuery(function() {

	// adjust sections
    //adjustSections();
	//win.resize(adjustSections).resize();

	// selectbox
	selectBoxInit();

	// initiate nicescroll
	initNiceScroll(html);

	if(jQuery('#intro').length > 0) {
		// Init navigation
		onePagerScroller();
	}/**/

	// mobile nav
	mobileNav();

	// sub nav
	subNav();

	// start event for booking widget
	bookingWidgetModal();

	// call slickSlider for rooms, features and meetings sections
	/*if (jQuery('#header-slider').length > 0) {
		win.resize(slickSlider).resize();
	} else {
		slickSlider();
	}*/

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
	jQuery('#nav').find('.nav ul').append('<li class="mobile"><a href="#" class="sitemap-toggle">Site Map</a></li>');
	jQuery('#footer').find('.nav ul').append('<li><a href="#" class="sitemap-toggle">Site Map</a></li>');

	// mobile device adjustments for selectbox
    if (isMobile.matches) {
		//alert('mobile');
		selectbox.css('display','inline-block');
		jQuery('.sbHolder').addClass('hide');
	};

    // Email Form in Footer //
    var emailForm = jQuery('.email-sign-up');
    var defaultValue = "your email here";
    // Clear text in field when focused
    emailForm.find('#email').focus(function() {
        if (jQuery(this).val() == defaultValue) {
            jQuery(this).val('');
        };
    });
    emailForm.find('#email').blur(function() {
        if (jQuery(this).val() == '') {
            jQuery(this).val(defaultValue);
        };
    });
    emailForm.find('#email').focus(function() {
        jQuery(document.body).delegate('input:text', 'keypress', function(e) {
            if (e.which === 13) {
                e.preventDefault();
                submitEmailForm(emailForm, defaultValue);
            };
        });
    });
	emailForm.find('.submit').click(function(e) {
		e.preventDefault();
		submitEmailForm(emailForm, defaultValue);
	});

	// Text and textarea stuff
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


/*if(jQuery('#intro').length > 0) {
	// init skrollr function
	skrollrInit();
}*/


/***************/
/** DO RESIZE EVENT FUNCTION **/
/***************/
// adjust sections
//win.bind('load resize', adjustSections);
//win.bind('resize', adjustSections);

//win.on('load', adjustSections);
//win.smartresize(adjustSections);

//win.on('resize', function(){

	//adjustSections();

    /*$('.inner').each(function(){

        var box = $(this);
        var width = box.width();
        var height = box.height();

        box.attr('data-size', width+'x'+height+' (r: '+(width/height).toFixed(2)+')');

    });*/
//}).trigger('resize');

//win.on('resize', adjustSections).trigger('resize');
