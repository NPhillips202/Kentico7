// timers //

var timer_show_scroll;
var timer_show_pay;
var slider_focus;
//

var menu_moving = true;
var sliding = false;
var isHandheld =  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);


jQuery(document).ready(function() {
  full_slider_setup();
  menu_position();
  
  
  
  /*if(!Modernizr.pointerevents){
    jQuery('.logo_container').hide();
  }*/
  
  /*jQuery('.logo_container').bind(_click,function(){
    window.location.href = '/'+lang+'/home';
  })*/
  
  jQuery('.slider').swipe({
        swipe : function(event, direction) {
      
            if (direction === 'left') {
              if(isHandheld){
            jQuery('#header').addClass('no_opacity');
          }
              if(jQuery('.slider_controls .item.current',jQuery(this)).next().length != 0){
              jQueryitem_clicked = jQuery('.slider_controls .item.current',jQuery(this)).next();
              slide_to(jQuery(this));
              }
            
            
            } else  if (direction === 'right') {
              if(isHandheld){
            jQuery('#header').addClass('no_opacity');
          }
              if(jQuery('.slider_controls .item.current',jQuery(this)).prev().length != 0){
              jQueryitem_clicked = jQuery('.slider_controls .item.current',jQuery(this)).prev()
              slide_to(jQuery(this));
              }
            }
        },
        allowPageScroll:"vertical"
    });
  
  jQuery('#scroll_down .vertical').height(0);
  jQuery('#menu .controls').bind(_click,manage_menu);
  jQuery('#credits_button').bind(_click,launch_form);
  jQuery('#book_panel,.book_now_room').bind(_click,manage_book);
  jQuery('#langs ul li').bind(_click,manage_langs);
  
  jQuery('.menu_button a').each(function(){
    if(jQuery(this).html().indexOf('<br') == -1){
      jQuery(this).css('margin-top','2px');
    }
  });
  
  jQuery('#scroll_down').click(function(){
    open_menu();
    if(current != "index"){
      jQuery('html,body').animate({
           scrollTop:jQuery(window).height()-124
        }, 1000, "easeInOutQuint");
    } else {
      jQuery('html,body').animate({
             scrollTop:jQuery(window).height()-85
          }, 1000, "easeInOutQuint");
    }
  });
  
  if(jQuery('#submenu').length != 0){
    if(!isHandheld){
      jQuery('#submenu').bind(_mouseenter,open_submenu).bind(_mouseleave,close_submenu);
    } else {
      jQuery('#submenu').bind(_mouseenter,open_submenu);
      jQuery('#submenu ul li a').css('pointer-events','none');
    }
    
    if(jQuery('#submenu ul li.active').length != 0){
      jQuery('#submenu ul li.active').prependTo(jQuery('#submenu ul'));
    }
    if(jQuery('#submenu ul li:first').height() < 30){
      jQuery('#submenu ul').css('padding-top','8px');
    }
  }
  
  window[current+'_ready']();
  
  if(current == "index"){
    setTimeout(show_menu,1600);
  } else {
    setTimeout(show_menu,800);
    set_booking_css_long();
  }
  
  jQuery('.slider_controls .item').bind(_click, function(){jQueryitem_clicked = jQuery(this);slide_to(jQuery(this).parent().parent())})
  jQuery('.enlarge').bind(_click,enlarge_pic);
  
  // DATEPICKER CONFIG //
  
  if(jQuery('.form_box .hasDatePicker').length != 0){
    if (lang == "it") {
        jQuery(".hasDatePicker").datepicker({
          dateFormat:'dd-mm-yy',
            minDate: new Date,
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true, 
            closeText: 'Chiudi',
            gotoCurrent : true
        });
        jQuery.datepicker.setDefaults(jQuery.datepicker.regional["it"])
        
    } else if (lang == "fr") {
       jQuery(".hasDatePicker").datepicker({
         dateFormat:'dd-mm-yy',
             minDate: new Date,
             changeMonth: true,
             changeYear: true,
             showButtonPanel: true, 
             closeText: 'Chiudi',
             gotoCurrent : true
         });
         jQuery.datepicker.setDefaults(jQuery.datepicker.regional["fr"])
    } else {
        jQuery(".hasDatePicker").datepicker({
          dateFormat:'mm-dd-yy',
            minDate: new Date,
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true, 
            closeText: 'Close',
            gotoCurrent : true
            
        });
        jQuery.datepicker.setDefaults(jQuery.datepicker.regional[""])
    }

    if (Modernizr.touch) {
        jQuery(".hasDatePicker").attr("readonly", "readonly")
    }
    
  }
  
  
  jQuery(window).scroll(function(){
    if(jQuery(window).height() >600){
      if(jQuery(window).scrollTop() >= jQuery(window).height()/2-45 && !jQuery('#menu').hasClass('opened') && !jQuery('#menu').hasClass('forced')){
        if(!menu_moving){
          menu_moving = true;
          open_menu();
        }
      }
    }
    
    
    
    if(jQuery(window).scrollTop() >= 0 && !jQuery('#scroll_down').hasClass('hidden')){
      clearTimeout(timer_show_scroll);
      jQuery('#scroll_down').addClass('hidden');
      hide_scroll();
    }
    
    if(jQuery(window).scrollTop() == 0){
      show_scroll();
      if(!menu_moving){
        if(jQuery('#menu').hasClass('opened')){
          close_menu();
        }
      }
    }

  })
  
  if(jQuery(window).scrollTop() >= 0) {
    setTimeout(function(){jQuery(window).trigger('scroll');},100);
  }
  
  // CSS HOVERS TRANSLATIONS //
  
  jQuerymoving = false;

  
  jQuery('.lower > div.w35, .triple_tray .third, .grey_block.wedding').bind(_mouseenter,function(e){
    jQuery(this).find('.expandable').addClass('lower_expandable_hover')
    jQuery(this).find('.frame').addClass('lower_frame_hover')
    jQuery(this).find('.title').addClass('lower_frame_title_hover')
    jQuery(this).find('.view').addClass('view_hover')
    
    if(current == "index" && jQuery(this).parent().hasClass('_2')){
      jQuery('#index .lower._2 .discover_more:eq('+jQuery(this).index('.lower._2 .w35')+')').css('color','#678594').children('img').addClass('rotate_90');
    }
    
  }).bind(_mouseleave,function(e){
    jQuery(this).find('.expandable').removeClass('lower_expandable_hover');
    jQuery(this).find('.frame').removeClass('lower_frame_hover');
    jQuery(this).find('.title').removeClass('lower_frame_title_hover');
    jQuery(this).find('.view').removeClass('view_hover');
    
    if(current == "index" && jQuery(this).parent().hasClass('_2')){
      jQuery('#index .lower._2 .discover_more:eq('+jQuery(this).index('.lower._2 .w35')+')').css('color','#999792').children('img').removeClass('rotate_90');
    }
  });
  
  

  
  if(isHandheld){
    jQuery('body').addClass('handheld');
    jQuery('input.hasDatepicker').attr('readonly','readonly');
    
    jQuery(document).bind(_mousemove,function(){
      jQuerymoving = true;
    });
    
    
    jQuery('.lower > div.w35 a, .hotel_tray .third a, .grey_block.wedding a').bind('click',function(e){
      e.preventDefault();
    }).bind(_click,function(){
      if(!jQuerymoving){
        jQuery('.lower > div.w35, .hotel_tray .third,.grey_block.wedding').unbind(_mouseleave);
        jQueryurl = jQuery(this);
        setTimeout(function(){
          
          window.location.href = jQueryurl.attr('href');
        },600);
      } else {
        jQuerymoving = false;
      }
    }); 
    
    // MENU POSITION HACK FOR IPAD (REMOVE POSITION FIXED)
    
    jQuery('#header').css('position','absolute');
    jQuery('#header').addClass('has_transition_top');
    var startY;
    var currentY;
    var absolute_scroll;
    var trigger_treshold = 40;
    
    function lock_menu_on_top(){
      if(!jQuery('#overlay').hasClass('active') && !jQuery('input,textarea').is(":focus")){
        clearTimeout(absolute_scroll);
        jQuery('input.hasDatepicker').datepicker("hide");
        jQuery('#header').css('opacity','0');
        setTimeout(function(){
          if(jQuery(window).scrollTop() >= jQuery(window).height()/2-45){
            jQuery('#header').css('top',jQuery(window).scrollTop()-130+'px')
          }
        },480);
        absolute_scroll = setTimeout(function(){
          if(jQuery(window).scrollTop() >= jQuery(window).height()/2-45){
            jQuery('#header').removeClass('has_transition_top');
            jQuery('#header').css('opacity','1');
            jQuery('#header').addClass('has_transition_top');
            jQuery('#header').css('top',jQuery(window).scrollTop()+'px');
          } else if(jQuery(window).scrollTop() < jQuery(window).height()/2-45) {
            jQuery('#header').css('top','50%');
            jQuery('#header').css('opacity','1');
          }
        },1000);
      
      }
    }


    
    
    jQuery(document).on('touchmove scroll',function(e) {     
        lock_menu_on_top();
        jQuery('#header').removeClass('no_opacity');
  
    });
    
    
    lock_menu_on_top();

    
    jQuery('#overlay .form_box select').css('height','26px').css('margin-top','3px');
    jQuery('#overlay .form_box input[type="checkbox"]').css('margin-top','3px');
  
  }
  
});

jQuery(window).resize(function() {
  full_slider_setup();
  menu_position();
});
  
var slide_timeout;

function full_slider_setup() {
    viewport_height = jQuery(window).height()-(jQuery(window).width()/98)*2
    viewport_width = jQuery(window).width()-(jQuery(window).width()/100)*2
    screen_ratio = viewport_width / viewport_height;
    pic_ratio = 1880 / 1060;

    jQuery('.slider:not(.pic_block)').height(viewport_height);
    
    if(jQuery('.slider.pic_block').length != 0){
       viewport_height = jQuery('.slider.pic_block').height();
       screen_ratio = viewport_width / viewport_height;
    }

    if (pic_ratio > screen_ratio) {
        jQuery('.slider .slide > img').css({
            height: viewport_height,
            width: Math.round(viewport_height * pic_ratio),
            marginLeft: Math.round(-(viewport_height * pic_ratio - viewport_width) / 2),
            marginTop: 0
        })
    } else {
        jQuery(".slider .slide > img").css({
            width: viewport_width,
            height: Math.round(viewport_width / pic_ratio),
            marginTop: Math.round(-(viewport_width / pic_ratio - viewport_height) / 2),
            marginLeft: 0
        })
    }
   
    jQuery('.slider').each(function(){
      jQuerythis = jQuery(this);
      jQuerythis.children('.slider_controls').width((jQuery('.slide',jQuerythis).length*49)+49).css('margin-left',-(((jQuery('.slide',jQuerythis).length*49)+49)/2)+'px');
    });
};

function set_booking_css_long() {
  jQuery('#searchbox form').attr('target','_blank');
  
  if(jQuery('#searchbox form').length != 0 && booking_is_ready){
    if(navigator.userAgent.match(/iPad/i) != null){
      jQuery('#searchbox input.hasDatepicker, input.hasDatePicker').datepicker('destroy').removeClass('hasDatepicker').removeClass('hasDatePicker').attr('type','date');
      jQuery('#searchbox input[type="date"]').css('margin-top','-1px').css('width','100px');
      jQuery('#searchbox select').css('margin-top','2px');
    }
    
    if(lang == 'it'){
      jQuery('.searchboxTitle').html('PRENOTA ORA!');
      jQuery('#searchbox form > div:eq(0)').css({
        'width': '180px',
        'height': '20px',
        'float': 'left'
      });
      jQuery('#searchbox form > div:eq(1)').css({
        'width': '203px',
        'height': '20px',
        'float': 'left',
        'margin-left':'25px'
      });
      jQuery('#searchbox form > div:eq(2)').css({
        'width': '105px',
        'float': 'left',
        'margin-left':'25px'
      });
      
      jQuery('#searchbox form > div:eq(3)').css({
        'width': '175px',
        'float': 'left',
        'margin-left':'25px'
      });
      
      jQuery('#searchbox form > div:eq(2) select').css({
        'margin-top':'-3px',
        'height': '20px',
        'float': 'right',
        'position': 'relative',
        'border': '1px solid #FFFFFF'
      });
      
      jQuery('#searchbox form > div:eq(3) select').css({
        'margin-top':'-3px',
        'height': '20px',
        'float': 'right',
        'position': 'relative',
        'border': '1px solid #FFFFFF',
        'width':'45px',
        'text-align':'center'
      });
    } else {
      jQuery('.searchboxTitle').html('BOOK NOW!');
      jQuery('#searchbox form > div:eq(0)').css({
        'width': '185px',
        'height': '20px',
        'float': 'left'
      });
      jQuery('#searchbox form > div:eq(1)').css({
        'width': '210px',
        'height': '20px',
        'float': 'left',
        'margin-left':'25px'
      });
      jQuery('#searchbox form > div:eq(2)').css({
        'width': '105px',
        'float': 'left',
        'margin-left':'25px'
      });
      
      jQuery('#searchbox form > div:eq(3)').css({
        'width': '170px',
        'float': 'left',
        'margin-left':'25px'
      });
      
      jQuery('#searchbox form > div:eq(2) select').css({
        'margin-top':'-3px',
        'height': '20px',
        'float': 'right',
        'position': 'relative',
        'border': '1px solid #FFFFFF'
      });
      
      jQuery('#searchbox form > div:eq(3) select').css({
        'margin-top':'-3px',
        'height': '20px',
        'float': 'right',
        'position': 'relative',
        'border': '1px solid #FFFFFF',
        'width':'45px',
        'text-align':'center'
      });
    }
    
  
    
    
    jQuery('#searchbox form > div:eq(4),#searchbox form > div:eq(5)').hide();
    
    
  } else {
    setTimeout(set_booking_css_long,100);
  }
}

function show_menu(){
  if(jQuery('#submenu').length != 0){
    jQuery('#submenu').stop().animate({
          opacity:1,
          right:0
      }, 600, "easeOutExpo");
    
    jQuery('#menu').css('right','40px');
    
    jQuery('#menu').stop().delay(300).animate({
          opacity:1,
          right:130
      }, 600, "easeOutExpo");
    
    jQuery('#header').css('pointer-events','none');
    setTimeout(function(){
      jQuery('#book_panel').css('opacity','1').addClass('booking_label_in');
      jQuery('#header').css('width','61%');
      jQuery('#book_panel').on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function() {
        jQuery('#book_panel').unbind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd');
        jQuery('#header').width('20%');
      });
    },300);
    
    delay_lines = 300;
  } else {
    jQuery('#menu').stop().animate({
          opacity:1,
          right:0
      }, 600, "easeInOutExpo");
    
    delay_lines = 0;
  }
  
  jQuery('#menu .lines hr').each(function(i){
    setTimeout(function(){
      jQuery('#menu .lines hr:eq('+i+')').removeClass('rotated');
      menu_moving = false;
      jQuery('#header').css('pointer-events','all');
    },(delay_lines+500)+(100*i));
  });
  
  if(current=="index"){
    jQuery('.menu_label').delay(delay_lines+800).fadeIn(500,'easeOutQuart');
    
    jQuery('#langs ul li').each(function(i){
      setTimeout(function(){
        jQuery('#langs ul li:eq('+i+')').removeClass('top_single');
      },delay_lines+800+(50*i));
    });
  }
}

function manage_langs (e) {
  e.preventDefault();
  current_url = window.location.href;
  
  if(current_url.indexOf('/'+lang+'/') == -1){
    window.location = '/'+jQuery(this).attr('rel')+'/home'
  }  else {
    new_url = current_url.replace("/"+lang+"/", "/"+jQuery(this).attr('rel')+"/");
    window.location = new_url;
  }
  
  
}
 
  
 function manage_menu(){
 if(!jQuery('#menu').hasClass('opened')){
   open_menu();
  } else {
   close_menu();
   /*jQuery('#menu').addClass('forced');*/
  // if(current == "index"){timer_show_pay = setTimeout(show_pay,1000);};
  // if(current == "index" && !jQuery('#index').hasClass('error')){start_slider();};
 }
}

//window.onload = manage_menu;
 
 
//function manage_menu(){
 //if(!jQuery('#menu').hasClass('opened')){
//   open_menu();
//  } else {
//    close_menu();
   /*jQuery('#menu').addClass('forced');*/
//   if(current == "index"){timer_show_pay = setTimeout(show_pay,1000);};
//   if(current == "index" && !jQuery('#index').hasClass('error')){start_slider();};
 //}
//}




function manage_book(){
  if(!jQuery('#menu').hasClass('opened')){
    jQuery('#menu .controls').trigger(_click);
    setTimeout(function(){
      jQuery('.book_content input[name="checkin"]').focus();
      jQuery('.book_content input[name="checkin"]').datepicker('show');},1200);
  } else {
    jQuery('.book_content input[name="checkin"]').focus();
    jQuery('.book_content input[name="checkin"]').datepicker('show');
  }
}

function open_menu(){
  menu_moving = true;
  jQuery('#langs ul li').removeClass('has_transition_400').removeClass('no_opacity').addClass('has_transition_600').addClass('top_single');
  jQuery('#book_panel').css('cursor','default');
  jQuery('#book_panel').unbind();
  jQuery('#header').css('width','98%');
  jQuery('#menu').addClass('opened');
  clearTimeout(timer_show_pay);
  if(current == "index"){
    stop_slider();
    remove_pay();
  }
  if(jQuery('#submenu').length != 0){
    jQuery('#menu').stop().animate({
          width:jQuery(window).width()-130-((jQuery(window).width()/100)*2)
        }, 1000, "easeInOutExpo",function(){
          menu_moving = false;
        });
    jQuery('#book_panel').unbind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd');

  } else {
    jQuery('#menu').stop().animate({
          width:'100%'
        }, 1000, "easeInOutExpo",function(){
          menu_moving = false;
        });
  }

  if(current=="index"){
    jQuery('.menu_label,#langs').fadeOut(400,'easeOutQuart');
  };
  
  //jQuery('.logo_container').delay(600).fadeTo(400,1,'easeOutQuart');
  jQuery('#header .menu_button').each(function(i){
    jQuery(this).delay(650+(50*i)).animate({
          opacity:1,
          top:0
      }, 400, "easeOutQuart",function(){
        if(!Modernizr.pointerevents){
          jQuery(this)[0].style.removeAttribute('filter');
          jQuery(this).css('filter','none');
        }
      });
  });
  
  jQuery('#langs ul li').each(function(i){
    setTimeout(function(){
      jQuery('#langs ul li:eq('+i+')').removeClass('top_single');
    },700+(50*i));
  })
  
  if(jQuery('#book_panel').length != 0){
    jQuery('#book_panel').stop().animate({
          width:'100%',
          height:34
        }, 1000, "easeInOutExpo");
    
    if(!jQuery('#submenu').hasClass('active')){
      jQuery('#header').stop().animate({
            height:124
          }, 1000, "easeInOutExpo");
    } else {
      jQuery('#header').stop().animate({
            height:79 + jQuery('#submenu ul').height()+parseInt(jQuery('#submenu ul').css('padding-top'))
          }, 1000, "easeInOutExpo");
    }
    
    
    jQuery('#book_panel .book_content').stop().animate({
          marginTop:9,
          marginLeft:10
        }, 1000, "easeInOutExpo");
  }
}

function close_menu(){
  menu_moving = true;
  if(current != "index"){
  jQuery('#langs ul li').removeClass('has_transition_600').addClass('has_transition_400').addClass('no_opacity');
  }
  jQuery('#book_panel').css('cursor','pointer');
  jQuery('#book_panel').bind(_click,manage_book);
  jQuery('#menu').removeClass('opened');
  //jQuery('.logo_container').fadeTo(200,0,'easeOutQuart',function(){
  //  if(!Modernizr.pointerevents){
  //    jQuery('.logo_container').hide();
  //  }
  //});
  jQuery('#header .menu_button').each(function(i){
    jQuery(this).delay(10*i).animate({
          opacity:0,
          top:10
      }, 200, "easeOutQuart");
  })
  
  jQuery('#menu').stop().delay(300).animate({
        width:90
      }, 600, "easeOutExpo",function(){
        menu_moving = false;
        if(current=="index"){
      jQuery('.menu_label,#langs').fadeTo(500,1,'easeOutQuart');
        }

        jQuery('#header').css('width','20%');
      });
  
  

  if(jQuery('#book_panel').length != 0){
    jQuery('#book_panel').stop().delay(300).animate({
          width:130,
          height:55
        }, 600, "easeOutExpo");
    
    if(!jQuery('#submenu').hasClass('active')){
    jQuery('#header').stop().delay(300).animate({
          height:145
        }, 600, "easeOutExpo");
    } else {
      jQuery('#header').stop().delay(300).animate({
            height:100 + jQuery('#submenu ul').height()+parseInt(jQuery('#submenu ul').css('padding-top'))
          }, 600, "easeOutExpo");
    }
    jQuery('#book_panel .book_content').stop().animate({
          marginTop:18,
          marginLeft:0
        }, 1000, "easeInOutExpo");
  }
}

function open_submenu () {
  jQuery('#submenu ul li:not(:first-child) a').clearQueue().css('opacity','0').show();
  
  jQuery('#submenu ul li:not(:first-child) a').each(function(i){
    jQuery(this).stop().clearQueue().delay(100*i).fadeTo(500,1,'easeOutQuart');
  });
  
  jQuery('#submenu').addClass('active');
  
  jQuery(this).stop().animate({
      height:45 + jQuery('#submenu ul').height()+parseInt(jQuery('#submenu ul').css('padding-top'))
    }, 400, "easeOutQuint",function(){
      if(isHandheld){
        jQuery('#submenu ul li a').css('pointer-events','all');
      }
    });
  
  if(!jQuery('#menu').hasClass('opened')){
    jQuery('#header').stop().animate({
          height:100 + jQuery('#submenu ul').height()+parseInt(jQuery('#submenu ul').css('padding-top'))
        }, 400, "easeOutQuint");
  } else {
    jQuery('#header').stop().animate({
          height:79 + jQuery('#submenu ul').height()+parseInt(jQuery('#submenu ul').css('padding-top'))
        }, 400, "easeOutQuint");
  }
  
  jQuery('#submenu .more').stop().fadeTo(400,0,'easeOutQuint');
  
  if(isHandheld){
    jQuery(document).on(_mousemove,function(){
      jQuery(document).unbind(_mousemove);
      setTimeout(close_submenu,500);
    });
  }
}

function close_submenu(){
  jQuery('#submenu').removeClass('active');
  if(isHandheld){
    jQuery('#submenu ul li a').css('pointer-events','none');
  }
  jQuery('#submenu ul li:not(:first-child) a').stop().fadeTo(300,0,'easeOutQuart',function(){
    jQuery('#submenu ul li:not(:first-child) a').hide();
    jQuery('#submenu .more').stop().fadeTo(400,1,'easeOutQuint');
  });
  
  jQuery('#submenu').stop().animate({
        height:90
      }, 400, "easeOutQuint");
  
  if(!jQuery('#menu').hasClass('opened')){
    jQuery('#header').stop().animate({
          height:145
        }, 400, "easeOutQuint");
  } else {
    jQuery('#header').stop().animate({
          height:124
        }, 400, "easeOutQuint");
  } 
}



function menu_position () {
  /*if(jQuery(window).width() <= 1365 && jQuery('#menu .upper').length == 0){
    jQuery('#menu .menu_button:eq(0),#menu .menu_button:eq(1),#menu .menu_button:eq(2),#menu .menu_button:eq(3),#menu .menu_button:eq(4),#menu .menu_button:eq(5)').wrapAll('<div class="upper" />');
    jQuery('#menu .buttons > .menu_button').wrapAll('<div class="lower" />');
  } else if(jQuery(window).width() >= 1366 && jQuery('#menu .upper').length != 0){
    jQuery('#menu .menu_button').unwrap();
  }
  if(jQuery('#menu').hasClass('opened') && jQuery('#submenu').length != 0){
    jQuery('#menu').width(jQuery(window).width()-130);
  } else {
    
  }*/
  
  if(jQuery('#menu').hasClass('opened')){
    if(jQuery('#submenu').length != 0){
      jQuery('#menu').width(jQuery(window).width()-130-((jQuery(window).width()/100)*2));
    } 
  }
}


function slide_forward(slider){
    if (!sliding && jQuery('.slide',slider).length > 0) {
        sliding = true;
        if (jQuery('.slide.active',slider).index() < jQuery('.slide',slider).length - 1) {
            jQuery('.slide.active',slider).addClass('navOutNext').next().addClass('navInNext sliding');
            jQuery('.slide.active',slider).on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function() {
                jQuery('.slide.active',slider).unbind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd').removeClass('active').removeClass('navOutNext').next().addClass('active').removeClass('navInNext sliding');
                sliding = false;
            });
        } else {
            jQuery('.slide.active',slider).addClass('navOutNext');
            jQuery('.slide:first-child',slider).addClass('navInNext sliding');
            jQuery('.slide.active',slider).on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function() {
                jQuery('.slide.active',slider).unbind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd').removeClass('active').removeClass('navOutNext');
                jQuery('.slide:first-child',slider).addClass('active').removeClass('navInNext sliding');
                sliding = false;
            });
        }

    }
}

function slide_to(slider){
  if (!sliding){
      sliding = true;
      if(jQueryitem_clicked.index() >  jQuery('.slider_controls .item.current', slider).index()){
      jQuery('.slide.active', slider).addClass('navOutNext');
      jQuery('.slide:eq('+jQueryitem_clicked.index()+')', slider).addClass('navInNext sliding');
      jQueryitem_clicked.addClass('current').siblings().removeClass('current');
       jQuery('.slide.active', slider).on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function() {
             jQuery('.slide.active', slider).unbind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd').removeClass('active').removeClass('navOutNext');
             jQuery('.slide:eq('+ jQuery('.slider_controls .item.current', slider).index()+')', slider).addClass('active').removeClass('navInNext sliding');
             sliding = false;
         });
      } else {
        jQuery('.slide.active', slider).addClass('navOutPrev');
        jQuery('.slide:eq('+jQueryitem_clicked.index()+')', slider).addClass('navInPrev sliding');
        jQueryitem_clicked.addClass('current').siblings().removeClass('current');
         jQuery('.slide.active', slider).on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function() {
               jQuery('.slide.active', slider).unbind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd').removeClass('active').removeClass('navOutPrev');
               jQuery('.slide:eq('+ jQuery('.slider_controls .item.current', slider).index()+')', slider).addClass('active').removeClass('navInPrev sliding');
               sliding = false;
           });
      }
    }
}

function automatize_slider(slider){
  
}

function show_scroll(){
  jQuery('#scroll_down .round').removeClass('hidden_by_scaling');
  
  jQuery('#scroll_down .vertical').stop().clearQueue().delay(100).animate({
        height:44
    }, 300, "easeOutExpo");
  
  jQuery('#scroll_down .arrow').stop().clearQueue().delay(350).animate({
        opacity:1
    }, 500, "easeOutQuart");
  
  jQuery('#scroll_down p').stop().clearQueue().delay(400).animate({
        opacity:1,
        top:0
    }, 500, "easeOutQuart",function(){
      jQuery('#scroll_down').removeClass('hidden');
      jQuery('#scroll_down p').addClass('opacity_loop');
    });
  
}

function hide_scroll(){
  jQuery('#scroll_down p').removeClass('opacity_loop');
  jQuery('#scroll_down p').stop().fadeTo(300,0,'easeOutQuart');
  jQuery('#scroll_down .arrow').stop().delay(50).fadeTo(300,0,'easeOutQuart');
  jQuery('#scroll_down .vertical').stop().delay(100).animate({
        height:0
    }, 300, "easeOutExpo");
  setTimeout(function(){jQuery('#scroll_down .round').addClass('hidden_by_scaling');jQuery('#scroll_down p').css('top','-10px')},150);
}

function enlarge_pic(){
  if(!jQuery('.first .pic_block').hasClass('enlarged')){
    jQuery('.pic_block').removeClass('has_transition_600').addClass('has_transition_600_easeInOut').addClass('enlarged');
    jQuery('.text_content').css('margin-left','-33.7%');
    jQuery('.first .pic_block').css('width','100%');
    jQuery('.enlarge').addClass('horizontal_mirror');
    jQuery('#menu').stop().clearQueue().delay(600).fadeTo(600,0,'easeOutQuart');
    jQuery('#submenu').stop().clearQueue().delay(650).fadeTo(600,0,'easeOutQuart');
    jQuery('#book_panel').stop().clearQueue().delay(700).fadeTo(600,0,'easeOutQuart');
    jQuery('#header').css('pointer-events','none');
  } else {
    jQuery('#menu').css('right','-90px');
    jQuery('#submenu').css('right','-130px');
    jQuery('#book_panel').removeClass('booking_label_in');
    jQuery('.first .pic_block').removeClass('enlarged')
    jQuery('.pic_block').removeClass('has_transition_600_easeInOut').addClass('has_transition_600');
    jQuery('.text_content').css('margin-left','0%');
    jQuery('.first .pic_block').css('width','66.3%');
    jQuery('.enlarge').removeClass('horizontal_mirror');
    jQuery('#header').css('pointer-events','all');
    setTimeout(show_menu,600);
  }
}



function add_loading(){
  jQuery('.slides_wrap:eq(0)').append('<div id="loading" class="has_transition_600 no_opacity"><img src="/style/images/loading.gif" /></div>');
  
  setTimeout(function(){
    jQuery('#loading').removeClass('no_opacity');
    jQuery('.slide._1 > img').imagesLoaded(function(){
      jQuery('.slide:not(:eq(0)) img').each(function(){
        jQuery(this).attr('src',jQuery(this).attr('wait')).removeAttr('wait');
      });
      jQuery('#loading').addClass('no_opacity');
      setTimeout(function(){
        jQuery('.slide._1 > img').addClass('firstSlide');
        jQuery('#loading').remove();
      },50);
      
      setTimeout(function(){
        jQuery('.enlarge').css('opacity','1');
        jQuery('.pic_block .slider_controls').css('opacity','1');
      },800);
      
    });
  },400);
}

function launch_form (e){
  e.preventDefault();
  jQuery('#overlay').addClass('active');
  if(isHandheld){
    jQuery('#header').css('opacity','0');
    jQuery('#overlay').css('top',jQuery(window).scrollTop());
    jQuery('#overlay').css('position','absolute');
    jQuery(document).on('touchmove scroll',function() {
      if(!jQuery('input,textarea').is(":focus")){
        jQuery('input.hasDatePicker').datepicker("hide");
        setTimeout(function(){jQuery('#overlay').css('top',jQuery(window).scrollTop()+'px');},500);
      }
    });
  }
  
  if(jQuery(this).hasClass('book_restaurant')){
    jQuery('.book_restaurant_form').addClass('active');
    jQueryform = jQuery('.book_restaurant_form');
  };
  
  if(jQuery(this).hasClass('info_courses')){
    jQuery('.info_courses_form').addClass('active');
    jQueryform = jQuery('.info_courses_form');
  };
  
  
  
  if(jQuery(this).hasClass('lower') || jQuery(this).hasClass('info_courses') ) {
    jQuery('#overlay').show();
    jQueryform.show();
    setTimeout(function(){jQuery('#overlay').removeClass('hidden_by_scaling_low');},1);
    setTimeout(function(){jQueryform.removeClass('hidden_by_scaling_low');},100);
    setTimeout(function(){jQuery('.form_close',jQueryform).removeClass('no_opacity');},600);
    
    jQueryform.find('.has_transition_600').each(function(i){
      setTimeout(function(){jQuery('.has_transition_600:eq('+i+')',jQueryform).removeClass('top_single');},400+(50*i));
    });
  } else if(jQuery(this).attr('id','credits_button')){
    jQueryform = jQuery('.credits_container');
    jQuery('#credits').show();
    jQueryform.show();
    setTimeout(function(){jQuery('#credits').removeClass('hidden_by_scaling_low');},1);
    setTimeout(function(){jQueryform.removeClass('hidden_by_scaling_low');},100);
    setTimeout(function(){jQuery('.form_close',jQueryform).removeClass('no_opacity');},600);

    jQueryform.find('.has_transition_600').each(function(i){
      setTimeout(function(){jQuery('.has_transition_600:eq('+i+')',jQueryform).removeClass('top_single');},400+(50*i));
    });

  }
  
  jQuery('.form_close',jQueryform).bind(_click,close_form);
};

function close_form(){
  jQuery('#overlay,#credits').removeClass('active');
  if(isHandheld){
    setTimeout(function(){jQuery(document).trigger('touchmove')},500);
  }
  jQueryform = jQuery(this).parent();
  jQuery(this).unbind(_click);
  jQuery('.form_container').removeClass('active');
  jQuery(this).parent().addClass('hidden_by_scaling_low');
  setTimeout(function(){
    jQuery('#overlay,#credits').addClass('no_opacity');
    jQuery('#overlay,#credits').on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
      jQuery('#overlay,#credits').unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
      jQueryform.find('.has_transition_600:not(.form_close)').addClass('top_single');
      jQuery('.form_container').addClass('hidden_by_scaling_low').hide();
      jQuery('#overlay,#credits').removeClass('no_opacity').addClass('hidden_by_scaling_low').hide();
      jQuery('.form_close',jQueryform).addClass('no_opacity');
    }); 
  },350);
}

