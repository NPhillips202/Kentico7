//page display after page load start here
jQuery(window).load(function() {
 jQuery("body").css('opacity','1');
});
//page display after page load end here

//menu start here
jQuery(document).ready(function (jQuery) {
    // Modify the menu before intializing it
    jQuery('nav > ul').addClass('main-nav enumenu_ul menu');
    // Append the menu items together
    jQuery('nav > ul > li').each(function(i) {
        //console.log(i);
        var thisEle = jQuery(this).find('ul');
        thisEle.wrapAll('<ul><li><div class="sub-menu-items"><div class="sub-menu-list"></div></div></li></ul>');
        thisEle.addClass('s-menu');
        var thumb = jQuery('.nav-images li').eq(i).attr('src');
        thisEle.parent().parent().prepend('<div class="sub-menu-img"><img src="' + thumb + '" /></div>');
    });

    jQuery('.enumenu_ul').responsiveMenu({
        'menuIcon_text': 'Menu',
        menuslide_overlap: true,
        menuslide_direction: 'left',
        onMenuopen: function () {}
    });
});
//menu end here
//bxslider start here
jQuery(document).ready(function (jQuery) {
    var slider = jQuery('.bxslider').bxSlider({
        slideMargin: 0,
        auto: false,
        pause: 3000,
        touchEnabled: false,
        onSlideAfter : function(jQueryslideElement, oldIndex, newIndex){
            console.log(newIndex)
            jQuery(".bmt-list > li").removeClass("active")
            jQuery(".bmt-list > li").eq(newIndex).addClass("active")
        }
    });

    jQuery(".bmt-list > li").click(function(){
        var indx = jQuery(this).index()
        slider.goToSlide(indx);
    })
});
//bxslider end here

//images to bg start here
jQuery(document).ready(function (jQuery) {

    jQuery('.bxslider li').each(function () {
        jQuery(this).find('img').addClass('bannerimage');
        var imgSrc = jQuery(this).find('.bannerimage').attr('src');
        imgSrc = "url(" + imgSrc + ")";
        jQuery(this).css("background-image", imgSrc);
    });

var getImageSrc1 = jQuery('.article-img-1 .imageDiv img').attr('src');
jQuery('.article-img-1').css('background-image', 'url(' + getImageSrc1 + ')');
jQuery('.imageDiv').remove();

var getImageSrc2 = jQuery('.article-img-2 .imageDiv2 img').attr('src');
jQuery('.article-img-2').css('background-image', 'url(' + getImageSrc2 + ')');
jQuery('.imageDiv2').remove();

var getImageSrc3 = jQuery('.news-image .imageDiv3 img').attr('src');
jQuery('.news-image').css('background-image', 'url(' + getImageSrc3 + ')');
jQuery('.imageDiv3').remove();

var getImageSrc4 = jQuery('.issue-image .imageDiv4 img').attr('src');
jQuery('.issue-image').css('background-image', 'url(' + getImageSrc4 + ')');
jQuery('.imageDiv4').remove();

jQuery('.news-himage-1').each(function() {
  var src = jQuery(this).find('img').attr('src');
  jQuery(this).css('background-image', 'url(' + src + ')');
  jQuery(this).find('.imageDiv5').remove();
});

jQuery('.article-image-cover').css('background-image', 'url(' + jQuery('.article-image-cover img').attr('src') + ')');
jQuery('.article-image-cover img').addClass('hide');

jQuery('.techspot-image1').each(function() {
  var src = jQuery(this).find('img').attr('src');
  jQuery(this).css('background-image', 'url(' + src + ')');
  jQuery(this).find('.imageDiv9').remove();
});

//var getImageSrc11 = jQuery('.ihotspot-img1 .imageDiv11 img').attr('src');
//jQuery('.ihotspot-img1').css('background-image', 'url(' + getImageSrc11 + ')');
//jQuery('.imageDiv11').remove();

var imgCEO = jQuery('.tech-profile .profile-picture img');
var getImageSrcCEO = imgCEO.attr('src');
imgCEO.parent().append("<div class='ceo-img'></div>");
jQuery('.ceo-img').css('background-image', 'url(' + getImageSrcCEO + ')');
imgCEO.remove();
  
});

//images to bg end here

//equal height start here
equalheight = function(container){
	var currentTallest = 0,
     currentRowStart = 0,
     rowDivs = new Array(),
     jQueryel,
     topPosition = 0;
	jQuery(container).each(function() {

		jQueryel = jQuery(this);
		jQuery(jQueryel).height('auto')
		topPostion = jQueryel.position().top;

		if (currentRowStart != topPostion) {
			for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
				rowDivs[currentDiv].height(currentTallest);
			}
			rowDivs.length = 0; // empty the array
			currentRowStart = topPostion;
			currentTallest = jQueryel.outerHeight();
			rowDivs.push(jQueryel);
		} else {
			rowDivs.push(jQueryel);
			currentTallest = (currentTallest < jQueryel.outerHeight()) ? (jQueryel.outerHeight()) : (currentTallest);
		}
		for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
			rowDivs[currentDiv].height(currentTallest);
		}
	});
}

jQuery(window).load(function() {
	equalheight('.footerheight');
	equalheight('.s2-news-right .s1-left-info .hotellistinfo');
	equalheight('.s2-news-right .s1-left-info .hotellistinfo-t');
});

jQuery(window).resize(function(){
	equalheight('.footerheight');
	equalheight('.s2-news-right .s1-left-info .hotellistinfo');
	equalheight('.s2-news-right .s1-left-info .hotellistinfo-t');
});
//equal height end here

// subpage: convert <img> as background img
jQuery(document).ready(function(){
	var getImageSrc = jQuery('.midd-container .col-left .article-content .top-content div.image-area img').attr('src');
	jQuery('.midd-container .col-left .article-content .top-content div.image-area').css('background-image', 'url(' + getImageSrc + ')');
	jQuery('.midd-container .col-left .article-content .top-content div.image-area img').remove();
});

//-- Site Map
jQuery(function(){
	jQuery(".site-map a, .sitemap-close").click(function(e) {
		e.preventDefault();
		if (jQuery('.sitemap-float').is(':visible')) {
			jQuery(".sitemap-float").fadeOut(500);
		} else {
			jQuery(".sitemap-float").fadeIn(500);
		}
	});
});

//-- Accordion
jQuery(".accordion-toggle, .accordion-toggle *").click(function(e) {
    e.stopPropagation();
    var thisEle = jQuery(this), 
        thisAccordionDiv = jQuery(this).closest('.accordion-toggle');
    
    if (!thisEle.is('a')) {
        if (thisAccordionDiv.next("div").is(":visible")) {
            jQuery(".accordion-toggle").find('.floor-minus').removeClass('active');
            jQuery(".accordion-toggle").find('.floor-plus').addClass('active');
            thisAccordionDiv.next("div").slideUp("slow", function() {
                jQuery('html, body').animate({ scrollTop: (thisAccordionDiv.offset().top - jQuery('header').outerHeight()) - 0 });
            });
        } else {
            jQuery(".accordion-toggle").next("div").slideUp("slow");
            jQuery(".accordion-toggle").find('.floor-minus').removeClass('active');
            jQuery(".accordion-toggle").find('.floor-plus').addClass('active');
            thisAccordionDiv.find('.floor-plus').removeClass('active');
            thisAccordionDiv.find('.floor-minus').addClass('active');
            thisAccordionDiv.next("div").slideDown("slow", function() {
                jQuery('html, body').animate({ scrollTop: (thisAccordionDiv.offset().top - jQuery('header').outerHeight()) - 0 });
            });
        }
    }
});

//-- + - Switch{
// jQuery('.news-btn').click(function(e) {
//     jQuery('.news-btn').not(this).find('.floor-minus').removeClass('active');
//     jQuery('.news-btn').not(this).find('.floor-plus').addClass('active');
//     jQuery(this).find('.floor-minus').toggleClass('active');
//     jQuery(this).find('.floor-plus').toggleClass('active');
// });



jQuery(function() {
    jQuery('.mobile-nav-trigger').click(function() {
        if (jQuery(this).next().css('display') == 'block') {
            jQuery(this).next().slideUp();
        } else {
            jQuery(this).next().slideDown();
        }
        return false;
    });
});
jQuery(function() {
	jQuery('.selectbox').selectbox();
});


//-- YouTube Popup

jQuery('.popup-youtube').magnificPopup({
	/*items: {
		src: 'http://www.youtube.com/'
	},*/
	type: 'iframe',
	iframe: {
		markup: '<div class="mfp-iframe-scaler">' +
				'<div class="mfp-close"></div>' +
				'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                '<div class="mfp-title"></div>'+
				'</div>',
		patterns: {
			youtube: {
				index: 'youtube.com/',
				id: 'v=',

				//src: '//www.youtube.com/embed/WVvHWOKQOLU?rel=0&autoplay=1',
				//src: '//www.youtube.com/embed/%id%?autoplay=1',
				src: '//www.youtube-nocookie.com/embed/%id%?wmode=opaque&vq=hd720&autoplay=1&rel=0&feature=oembed&autoplay=1&autohide=1&modestbranding=1&showinfo=0&theme=dark&enablejsapi=1&color=white&iv_load_policy=3&cc_load_policy=0&format=xml', // URL that will be set as a source for iframe.
			},
			vimeo: {
				index: 'vimeo.com/',
				//id: '/',
				id: function(src){
					if (src.indexOf('external') > -1) {
						return 'external/' + src.substr(src.lastIndexOf('/') + 1, src.length);
					//} else if (src.indexOf('postinteractive') > -1) {
					//	return 'postinteractive/review/' + src.substr(src.lastIndexOf('/') + 1, src.length);
					} else {
						//return 'video/' + src.substr(src.lastIndexOf('/') + 1, src.length);
						return src.substr(src.lastIndexOf('/') + 1, src.length);
					}
				},
				src: '//player.vimeo.com/video/%id%?autoplay=1',
			},
			dailymotion: {
				index: 'dailymotion.com',
				id: function(url) {
					var m = url.match(/^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/);
					if (m !== null) {
						if(m[4] !== undefined) {
							return m[4];
						}
						return m[2];
					}
					return null;
				},
				src: 'http://www.dailymotion.com/embed/video/%id%'
			},
		},
		srcAction: 'iframe_src',
	},
  
   callbacks: {
    markupParse: function(template, values, item) {
     values.title = item.el.attr('title');
    }
  },
  
});

//-- Gallery Slider
jQuery(function() {
    jQuery(".center-slick").slick({
        initialSlide:0,
        dots: true,
        infinite: true,//if only one slide, set to false
        centerMode: true,
        slidesToShow: 1,
       // centerPadding: '150px',
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [{
            breakpoint: 1230,
            settings: {
                initialSlide: 1,
                slidesToShow: 1,
                centerMode: false
            }
        }, {
            breakpoint: 1024,
            settings: {
              initialSlide: 1,
              slidesToShow: 1,
                centerMode: false,
                arrows: false
            }
        }, {

            breakpoint: 767,
            settings: {
                initialSlide: 1,
                dots: false,
                slidesToShow: 1,
                centerMode: false,
                arrows: false
            }
        }]



    });

});

// Popup Window

    jQuery('.popup-trigger').click(function(e) {
        e.stopPropagation();


        jQuery('.popup, .new-over').hide();
        //jQuery('body').addClass('new-over');
        jQuery('.popup, .new-over').fadeIn(300);


    });

    jQuery('html').click(function() {
        jQuery('.popup, .new-over').hide();
        //jQuery('body').removeClass('new-over');
    });

    jQuery('.popup-btn-close').click(function(e) {
        jQuery(this).parent().hide();
        //jQuery('body').removeClass('new-over');

    });

    jQuery('.popup').click(function(e) {
        e.stopPropagation();
    });

// -- END Added JS


// placeholder script
jQuery(document).ready(function() {
	jQuery('input,textarea').placeholder();
});
//date function start
jQuery(document).ready(function() {
  var dayName = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday");
     var monName = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
     var now = new Date();
     var dtString = dayName[now.getDay()] + ", " + monName[now.getMonth()] + " " + now.getDate()+ ", " + now.getFullYear();
     document.getElementById("spanDate"). innerHTML = dtString;
});

jQuery(function() {
    // Form Datepicker
    jQuery(".FormPanel .formDatepicker").datepicker({
        minDate: ('+0D')
    });
    jQuery(".FormPanel .formDatepicker").prop("readonly", true);

    // Form Datepicker (Start Date)
    jQuery(".FormPanel .formDatepickerFrom").datepicker({
        //minDate: ('+0D'),
        onClose: function( selectedDate ) {
            jQuery(".FormPanel .formDatepickerTo").datepicker( "option", "minDate", selectedDate );
        }
    });
    jQuery(".FormPanel .formDatepickerFrom").prop("readonly", true);
    //jQuery(".FormPanel .formDatepickerFrom").datepicker("setDate", new Date());

    // Form Datepicker (End Date)
    jQuery(".FormPanel .formDatepickerTo").datepicker({
        //minDate: ('+0D'),
        onClose: function( selectedDate ) {
            jQuery(".FormPanel .formDatepickerFrom").datepicker( "option", "maxDate", selectedDate );
        }
    });
    jQuery(".FormPanel .formDatepickerTo").prop("readonly", true);
    //jQuery(".FormPanel .formDatepickerTo").datepicker("setDate", new Date());
  
    // Form Datepicker (Start Date - month/year dropdowns)
    jQuery(".FormPanel .formDatepickerFromMY").datepicker({
        changeMonth: true,
        changeYear: true,
        onClose: function( selectedDate ) {
            jQuery(".FormPanel .formDatepickerToMY").datepicker( "option", "minDate", selectedDate );
        }
    });
    jQuery(".FormPanel .formDatepickerFromMY").prop("readonly", true);

    // Form Datepicker (End Date - month/year dropdowns)
    jQuery(".FormPanel .formDatepickerToMY").datepicker({
        changeMonth: true,
        changeYear: true,
        onClose: function( selectedDate ) {
            jQuery(".FormPanel .formDatepickerFromMY").datepicker( "option", "maxDate", selectedDate );
        }
    });
    jQuery(".FormPanel .formDatepickerToMY").prop("readonly", true);
});

//--News Archive Form
    jQuery(function() {
        var archiveForm = jQuery('.FormPanel.newsArchive'),
            archiveFormInputs = archiveForm.find('input'),
            archiveFormSubmit = archiveForm.find('input[type="submit"]');
        // Submit functions
        function submitArchiveForm() {
        	var values = [],
        		url = '';

        	archiveFormInputs.not('input[type="submit"]').each(function(i) {
        		var val = jQuery(this).val(),
        			label = jQuery(this).attr('label');

        		if (val.length > 0) {
        			values.push(label+'='+val);
        		};
        	});

        	for (i=0; i<values.length; i++) {
        		if (i==0) { var val='?'+values[i]; } else { var val="&"+values[i]; };
        		url = url + val;
        	};

            document.location.href = (url);
        };
        archiveFormInputs.on('focus', function() {
            jQuery(document.body).delegate('input:text', 'keypress', function(e) {
                if (e.which === 13) {
                    e.preventDefault();
                    submitArchiveForm();
                };
            });
        });
        archiveFormSubmit.on('click', function(e) {
            e.preventDefault();
            submitArchiveForm();
        });
    });

//--Vendor Category Search Form
    jQuery(function() {
        var catSearchForm = jQuery('.FormPanel.catSearch'),
            catSearchFormInputs = catSearchForm.find('input'),
            catSearchFormSubmit = catSearchForm.find('input[type="submit"]');
        // Submit functions
        function submitcatSearchForm() {
        	var values = [],
        		url = '';

        	catSearchFormInputs.not('input[type="submit"]').each(function(i) {
        		var val = jQuery(this).val(),
        			label = jQuery(this).attr('label');

    			// Custom checkbox workaround
    			if (jQuery(this).attr('type') == 'checkbox') {
    				if (jQuery(this).parent().hasClass('checked')) {
    					values.push(label+'=y');
	        		};
        		} else {
	        		if (val.length > 0) {
	        			values.push(label+'='+val);
	        		};
    			}
        	});

        	for (i=0; i<values.length; i++) {
        		if (i==0) { var val='?'+values[i]; } else { var val="&"+values[i]; };
        		url = url + val;
        	};

            document.location.href = (url);
        };
        catSearchFormInputs.on('focus', function() {
            jQuery(document.body).delegate('input:text', 'keypress', function(e) {
                if (e.which === 13) {
                    e.preventDefault();
                    submitcatSearchForm();
                };
            });
        });
        catSearchFormSubmit.on('click', function(e) {
            e.preventDefault();
            submitcatSearchForm();
        });
    });

//--Industry Installations Search Form
    jQuery(function() {
        var installSearchForm = jQuery('.FormPanel.installSearch'),
            installSearchFormInputs = installSearchForm.find('select'),
            installSearchFormSubmit = installSearchForm.find('input[type="submit"]');
        // Submit functions
        function submitinstallSearchForm() {
          var values = [],
            url = '';

          installSearchFormInputs.not('input[type="submit"]').each(function(i) {
            var val = jQuery(this).val(),
              label = jQuery(this).attr('label');

          // Custom checkbox workaround
          if (jQuery(this).attr('type') == 'checkbox') {
            if (jQuery(this).parent().hasClass('checked')) {
              values.push(label+'=y');
              };
            } else {
              if (val.length > 0) {
                values.push(label+'='+encodeURIComponent(val));
              };
          }
          });

          for (i=0; i<values.length; i++) {
            if (i==0) { var val='?'+values[i]; } else { var val="&"+values[i]; };
            url = url + val;
          };

            document.location.href = (url);
        };
        installSearchFormInputs.on('focus', function() {
            jQuery(document.body).delegate('input:text', 'keypress', function(e) {
                if (e.which === 13) {
                    e.preventDefault();
                    submitinstallSearchForm();
                };
            });
        });
        installSearchFormSubmit.on('click', function(e) {
            e.preventDefault();
            submitinstallSearchForm();
        });
    });

//--Remove empty tech provider details
    jQuery('.tech-provider-details .panel-heading, .tech-provider-details-redirect .panel-heading').each(function() {
        if (jQuery(this).text().trim() == "") {
            jQuery(this).parent().remove();
        };
    });

//--Remove empty issue data
    jQuery('.issueFeatured').each(function() {
        if (jQuery(this).text().trim() == "") {
            jQuery(this).remove();
        };
    });

//--Polls (Survey Manipulations)
  jQuery(function(){
    jQuery('.home-page-poll').find('.PollTitle').wrap( "<h3></h3>" );
    
    if ( jQuery('.PollVoteButton').length ) {
      jQuery('.PollVoteButton').addClass("btn-1");
      jQuery('.home-page-poll').find('.PollVoteButton').after('<a href="/survey-results/" class="btn-1 PollVoteButton">Archives</a>');
    } else {
      jQuery('.home-page-poll .PollAnswers').after('<div><a href="/survey-results/" class="btn-1 PollVoteButton">Archives</a></div>');
    }

    jQuery(".PollAnswers").find("td").each(function(){
      if (!(jQuery(this).hasClass("PollAnswer") || jQuery(this).hasClass("PollCount"))){
        jQuery(this).remove();
      }
    }); 
    jQuery('.PollAnswer').parent('tr').each(function(){
      jQuery(this).append(function() { 
      var data = jQuery(this).next('tr').contents();
      return jQuery(data); 
      });
    });
  });


//--Email Signup TopBar
jQuery(function() {
  var emailForm = jQuery('.topSubscribe'),
     emailFormInput = emailForm.find('.inputstyle'),
            defaultValue = "";
        // Submit functions
        function submitEmailForm(val) {
            var email = val;
            if (email == defaultValue || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
                alert("Please enter a valid email address.");
                return false;
            };
            document.location.href = ('/Subscribe-Magazine/?em=' + email);
        };
        emailFormInput.on('focus', function() {
            jQuery(document.body).delegate('input:text', 'keypress', function(e) {
                if (e.which === 13) {
                    e.preventDefault();
                    var val = jQuery(this).val();
                    submitEmailForm(val);
                };
            });
        });
        emailForm.find('button').on('click', function(e) {
            e.preventDefault();
            var val = jQuery(this).parent().find('.inputstyle').val();
            submitEmailForm(val);
        });
    });

//--Top Search Box
    jQuery(function() {
        var searchForm = jQuery('.topSearch'),
            searchFormInput = searchForm.find('.inputstyle'),
            defaultValue = "";

        // Submit functions
        function submitSearchForm(val) {
            var search = val;
            if (search == defaultValue) {
                alert("Please enter a search term.");
                return false;
            };
            document.location.href = ('/search-results/?s=' + encodeURIComponent(search));
        };
        searchFormInput.on('focus', function() {
            jQuery(document.body).delegate('input:text', 'keypress', function(e) {
                if (e.which === 13) {
                    e.preventDefault();
                    var val = jQuery(this).val();
                    submitSearchForm(val);
                };
            });
        });
        searchForm.find('button').on('click', function(e) {
            e.preventDefault();
            var val = jQuery(this).parent().find('.inputstyle').val();
            submitSearchForm(val);
        });
    });

//--Mobile Search Box
    jQuery(function() {
        var searchBox = jQuery('.topSearch'),
            searchClone = searchBox.clone();
        jQuery('.navigation .main-nav').prepend(searchClone);
        jQuery('.navigation .main-nav .topSearch').removeClass('topSearch').addClass('searchMobile').wrapAll('<li class="searchLI"></li>');
        
        var MsearchForm = jQuery('.searchMobile'),
            MsearchFormInput = MsearchForm.find('.inputstyle'),
            defaultValue = "";

        // Submit functions
        function submitMSearchForm(val) {
            var Msearch = val;
            if (Msearch == defaultValue) {
                alert("Please enter a search term.");
                return false;
            };
            document.location.href = ('/search-results/?s=' + encodeURIComponent(Msearch));
        };
        MsearchFormInput.on('focus', function() {
            jQuery(document.body).delegate('input:text', 'keypress', function(e) {
                if (e.which === 13) {
                    e.preventDefault();
                    var val = jQuery(this).val();
                    submitMSearchForm(val);
                };
            });
        });
        MsearchForm.find('button').on('click', function(e) {
            e.preventDefault();
            var val = jQuery(this).parent().find('.inputstyle').val();
            submitMSearchForm(val);
        });
    });

//--Email Signup Sidebar
jQuery(function() {
  var emailForm = jQuery('.form-signup .row'),
     emailFormInput = emailForm.find('.input'),
            defaultValue = "";
        // Submit functions
        function submitEmailForm(val) {
            var email = val;
            if (email == defaultValue || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
                alert("Please enter a valid email address.");
                return false;
            };
            document.location.href = ('/Subscribe-Magazine/?em=' + email);
        };
        emailFormInput.on('focus', function() {
            jQuery(document.body).delegate('input:text', 'keypress', function(e) {
                if (e.which === 13) {
                    e.preventDefault();
                    var val = jQuery(this).val();
                    submitEmailForm(val);
                };
            });
        });
        emailForm.find('button').on('click', function(e) {
            e.preventDefault();
            var val = jQuery(this).parent().find('.input').val();
            submitEmailForm(val);
        });
    });  

 
//--Sidebar Subscription form
jQuery(function() {
    var collectionOfInputs = jQuery('.s5bcover').find('input');
    var hrefString = '/Subscribe-Magazine/';
    var val = jQuery('#em').val()
        function submitEmailForm(val) {
          var email = val;
          var defaultValue = "";
          if (email == defaultValue || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
            alert("Please enter a valid email address.");
            return false;
          }
          else{
            collectionOfInputs.each(function(index){
              if (jQuery(this).attr('type') == 'checkbox') {
                hrefString = hrefString + ((index==0) ? '?' : '&') + jQuery(this).attr('id') + '=' + (jQuery(this).is(':checked') ? 'Yes' : 'No');
                console.log (hrefString);
              }
              else { 
                hrefString = hrefString + ((index==0) ? '?' : '&') + jQuery(this).attr('id') + '=' + jQuery(this).val(); 
                  console.log (hrefString);
              }
            });
            document.location.href = hrefString;
          }
        };
    
   //submit if press enter
   jQuery('#em').on('focus', function() { 
            jQuery(document.body).delegate('input:text', 'keypress', function(e) {
                if (e.which === 13) {
                    e.preventDefault();
                    var val = jQuery(this).val();
                    console.log("This is val" + val);
                    submitEmailForm(val);
                    console.log("Submit Form");
                };
            });
        });
  
  
    //submit form button
    jQuery('#btnSubmit').click(function () {
      submitEmailForm(jQuery('#em').val());      
    });  
  
  
  });


/* select all above start */   
  jQuery('#allabove').change(function () {    
    if (jQuery("#allabove").prop('checked')) {       
      jQuery('input').prop('checked', true);   
      jQuery('.customCheckbox').addClass("checked");
    } else {        
      jQuery('input').prop('checked', false); 
      jQuery('.customCheckbox').removeClass("checked");
    }
  });
  jQuery('#ss').change(function () {
    if (jQuery("#ss").prop('checked')) {
        jQuery('#langles').prop('checked', true);  
        //jQuery('#langles').parent().addClass("checked");
   } else {  
         jQuery('#langles').prop('checked', false); 
   }
  });  
jQuery('#langles').change(function () {
    if (jQuery("#langles").prop('checked')) {
        jQuery('#ss').prop('checked', true);  
        //jQuery('#ss').parent().addClass("checked");
      } else {  
         jQuery('#ss').prop('checked', false); 
   }
  });  
/*select all above end */ 

//--Vendors - scroll through news listings
	jQuery('.vendor-accordion').each(function() {
		
		var items = jQuery(this).find('li'),
			amount = 10;
        
        if (jQuery(this).hasClass('search')) {
            amount = 5;
        };

		// Only if more than X items
		if (items.length > amount) {

			// Seperate into sections
			items.unwrap();
			for(var i=0; i<items.length; i+=amount) {
				items.slice(i, i+amount).wrapAll("<ul></ul>");
				if (i==0) {
					items.parent('ul').addClass('visible');
				};
			};

			// Create navigation
			jQuery(this).append("<div class='arrow prev inactive'></div>");
			jQuery(this).append("<div class='arrow next'></div>");

			// Make it work
			jQuery(this).find('.arrow').on('click', function() {
				if (jQuery(this).hasClass('inactive')) { return false; }

				var speed = 450,
					openSection = jQuery(this).parent().find('ul.visible'),
					prevSection = openSection.prev('ul'),
					nextSection = openSection.next('ul');

				// Prev
				if (jQuery(this).hasClass('prev')) {
					if (prevSection.length > 0) {
						openSection.removeClass('visible');
						prevSection.addClass('visible');

						openSection.slideUp(speed);
						prevSection.slideDown(speed);

						openSection.parent().find('.arrow').removeClass('inactive');

						if (prevSection.prev('ul').length == 0) {
							openSection.parent().find('.prev').addClass('inactive');
						}
					}
				}

				// Next
				if (jQuery(this).hasClass('next')) {
					if (nextSection.length > 0) {
						openSection.removeClass('visible');
						nextSection.addClass('visible');

						openSection.slideUp(speed);
						nextSection.slideDown(speed);

						openSection.parent().find('.arrow').removeClass('inactive');

						if (nextSection.next('ul').length == 0) {
							openSection.parent().find('.next').addClass('inactive');
						}
					}
				}
			});
		} else {
            jQuery(this).addClass('noScroll');
        }
	});

//--Polls (Survey Manipulations)
//Vendor list adjustments
function createVendorListColumns(columns) {
     var items;
     if(jQuery('.whole-list').length){
        jQuery('.vendor-list li').unwrap();
        items = jQuery('.whole-list').find('li');
     }
     else{
      //jQuery('.vendor-list').remove();
       items = jQuery('.vendor-list').find('li');
       jQuery('.vendor-list li').unwrap();
       items.wrapAll("<div class='whole-list'></div>");
     }
    var amount = Math.ceil(items.length / columns);
      
    // Only if more than X items
    //if (items.length > amount) {
      
    // Seperate into sections
      for(var i=0; i<items.length; i+=amount) {
        items.slice(i, i+amount).wrapAll("<ul class='vendor-list'></ul>");
        };
    //}
    if(jQuery(window).width() < 1200)
    {
      jQuery(".vendor-list").removeClass("three-col-list"); 
      jQuery(".vendor-list").addClass("two-col-list");
    } else {
       jQuery(".vendor-list").removeClass("two-col-list"); 
       jQuery(".vendor-list").addClass("three-col-list");
    }

   
}

jQuery(function(){
  if(jQuery(window).width() > 1200)
   createVendorListColumns(3);
  else if (jQuery(window).width() > 767)
    createVendorListColumns(2);
});
jQuery(window).resize(function(){
  if(jQuery(window).width() > 1200)
   createVendorListColumns(3);
  else if (jQuery(window).width() > 767)
    createVendorListColumns(2);
  else
    createVendorListColumns(1);
    if(!jQuery('.vendor-list').length)jQuery('.whole-list li').wrapAll("<ul class='vendor-list'></ul>");
  //createVendorListColumns();
});

//--Mobile Banner Copy
    //jQuery(window).load(function(){
        //jQuery('.header-middle .hmbanner').clone().removeClass('hmbanner').addClass('hmbanner-mobile').prependTo(jQuery('.midd-container'));
    //});

//--Tech Banner Heights
    jQuery(function() {
	    var elems = jQuery('.techSpotDetails.col');
	    var wrapper = jQuery('<div class="techRow" />');
	    var pArrLen = elems.length;
	    for (var i = 0;i < pArrLen;i+=2){
	        elems.filter(':eq('+i+'),:eq('+(i+1)+')').wrapAll(wrapper);
	    };
    });

//--Reprint Button
	jQuery('.reprint, .reprintClose').click(function(e) {
        e.preventDefault();
		jQuery('#reprintOl').slideToggle(300);
	});

//--Slideshow active slide
    jQuery(function() {
        jQuery('.bmt-list li').removeClass('active');
        jQuery('.bmt-list li').first().addClass('active');
    });