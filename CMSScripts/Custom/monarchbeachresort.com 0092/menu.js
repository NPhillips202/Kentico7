/**
 * Create an anonymous function to avoid library conflicts
 */
(function(jQuery) {
    /**
     * Add our plugin to the jQuery.fn object
     */
    jQuery.fn.responsiveMenu = function(options) {
        /**
         * Define some default settings
         */

        jQuery.fn.responsiveMenu.defaultOptions = {
            "menuIcon_text":'menu',
			"menuslide_overlap":false,
            "menuslide_push":false,
            "menuslide_direction":''
        };
        /**
         * Merge the runtime options with the default settings
         */
        var options = jQuery.extend({}, jQuery.fn.responsiveMenu.defaultOptions, options);
        /**
         * Iterate through the collection of elements and
         * return the object to preserve method chaining
         */
        return this.each(function(i) {
            var menuobj = jQuery(this);
            var mobileSubMenu;
            var subMenuArrows;
            var mobFlag = false;
            var deskFlag = false;
            var defaultMenu = false;
            createMobileStructure(menuobj);
            mobileMenuInit(menuobj);

            function removeDesktopMenu(menuobj) {
                menuobj.removeClass('desk');
                mobileSubMenu.next().stop(true, true).slideUp();
                subMenuArrows.removeClass('up');
                if(defaultMenu){
                    menuobj.slideUp();
                }
                menuobj.find(".menu-icon").removeClass('active');
            }

            function createMobileStructure(menuobj) {
                if (menuobj.prev('.menu-icon').length == 0) {
                    menuobj.wrapAll('<div class="enumenu_container"></div>');
                    //jQuery('<div class="menu-icon">' + options.menuIcon_text + '</div>').insertBefore(menuobj);
                    jQuery('<div class="menu-icon"> <div class="menu-box"><span></span><span></span><span></span></div>' + options.menuIcon_text + '</div>').insertBefore(menuobj);
                    //menuobj.find('ul').prev('a').addClass('menubelow');
                    jQuery("> li > a", menuobj).addClass("firstLevel");
                    menuobj.find("li").each(function() {
                        if (jQuery(this).children("ul") || jQuery(this).children("div")) {
                            jQuery(this).children().prev('a').addClass('menubelow');
                        }
                    });
                }
                mobileSubMenu = menuobj.find('a.menubelow');
                if (menuobj.find('.arrow').length == 0) {
                    mobileSubMenu.each(function() {
                        jQuery(this).closest('li').prepend('<span class="arrow"></span>');
                        jQuery(this).next().addClass("sb-menu");
                    });
                    subMenuArrows = menuobj.find('.arrow');
                }
                
                
                if(options.menuslide_overlap){
                    jQuery('body').addClass('menuOverlap');
                   
                } else if(options.menuslide_push){
                    jQuery('body').addClass('menuslide_push');
                    
                }
                if((options.menuslide_overlap || options.menuslide_push) && options.menuslide_direction==""){
                    jQuery('body').addClass('slidemenuRight');
                }
                if(options.menuslide_direction=="left"){
                    jQuery('body').addClass('slidemenuLeft');
                    
                }else if(options.menuslide_direction=="right"){
                    jQuery('body').addClass('slidemenuRight');
                    
                }
            }

            function bindClickonMobilemenu(menuobj) {
                menuobj.find('.arrow').on('touchstart click', function(e) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    var submenu = jQuery(this).closest('li').children('.sb-menu');
                    var sibilingsOfCurrent_obj = jQuery(this).closest('li').siblings();
                    var this_parentLi = jQuery(this).closest('li');
                    if (jQuery(".menu-icon").is(":visible")) {
                        if (submenu.length > 0) {
                            sibilingsOfCurrent_obj.find('.sb-menu').stop(true, true).slideUp(); // comment to close
                            sibilingsOfCurrent_obj.find('.sb-menu').each(function() {
                                jQuery(this).closest('li').find('>span').removeClass('up'); // 
                            });
                        }
                        if (!submenu.is(':visible')) {
                            submenu.find('.sb-menu').each(function() {
                                jQuery(this).stop().slideUp();
                                jQuery(this).closest('li').find('span').removeClass('up')
                            });
                            submenu.stop().slideDown();
                            this_parentLi.find('>span').addClass('up');
                        } else {
                            submenu.slideUp();
                            this_parentLi.find('>span').removeClass('up');
                        }
                    }
                });
            }

            function removeMobileMenu(menuobj) {
                menuobj.find('.menubelow').each(function() {
                    jQuery(this).removeAttr('style');
                    jQuery(this).next().removeAttr('style');
                });
                menuobj.find('.arrow').remove();
                menuobj.prev(".menu-icon").removeClass('active');
                menuobj.addClass('desk').removeAttr("style");
                menuobj.removeAttr("style");
                jQuery("body").removeClass("menu-open");
                deskFlag = false;
            }

            jQuery(window).resize(function(e) {
                mobileMenuInit(menuobj);
            });

            function mobileMenuInit(menuobj) {
                if((options.menuslide_overlap == false && options.menuslide_push == false) || (options.menuslide_overlap == true && options.menuslide_push == true)){
                   defaultMenu = true; 
                }
                if (jQuery(".menu-icon").is(":visible")) {
                    if (!mobFlag) {
                        removeDesktopMenu(menuobj);
                        createMobileStructure(menuobj);
                        bindClickonMobilemenu(menuobj);
                        mobFlag = true;
                        deskFlag = false;
                        menuobj.removeClass('desk');
                        jQuery('body').removeClass('desk');
                        menuobj.addClass('mob');
                        jQuery('body').addClass('mob');
                    }
                } else {
                    if (!deskFlag) {
                        removeMobileMenu(menuobj);
                        mobFlag = false;
                        deskFlag = true;
                        menuobj.removeClass('mob');
                        jQuery('body').removeClass('mob');
                        menuobj.addClass('desk');
                        jQuery('body').addClass('desk');

                    }
                }
            }
            // Toggle menu
            menuobj.prev(".menu-icon").on('click', function(e){
            //$(document).on('click', ".menu-icon", function(e) {
                //e.preventDefault();
                if (jQuery(this).hasClass('active')) {
                    closeMobileMenu(menuobj);
                } else {
                    if(defaultMenu){
                        jQuery(this).next().slideDown();
                    }
                    jQuery(this).addClass("active");
                    jQuery("body").addClass("menu-open");
                }
            });
            jQuery('body').on('click touchstart', function(e) {
                if (jQuery(".menu-icon").is(":visible")) {
                    if (jQuery(e.target).closest(".enumenu_container").length == 0) {
                        closeMobileMenu(menuobj);
                    }
                }
            });

            function closeMobileMenu(menuobj) {
                jQuery("body").removeClass("menu-open");
                if(defaultMenu){
                    menuobj.stop().slideUp();
                }
                menuobj.prev(".menu-icon").removeClass('active');
                menuobj.find('.arrow').removeClass('up');
                menuobj.find('.sb-menu').stop(true, true).slideUp();
            }

                if ( 'ontouchstart' in window ) {

                    //$(".enumenu_ul > li > a, .enumenu_ul.desk li > ul > li > a").click(function(e) {
                    menuobj.find("a").click(function(e) {
                            if (!jQuery(this).hasClass("link") && !jQuery("body").hasClass("mob") && jQuery(this).next().length > 0) {
                                e.preventDefault();
                                if (jQuery(this).hasClass("firstLevel")) {
                                    menuobj.find("a").removeClass("link");
                                    menuobj.find("a").parent().removeClass("hover");
                                }
                                jQuery(this).addClass("link");
                                jQuery(this).parent().addClass('hover');
                            }
                    })
                    jQuery('body').on('click touchstart', function(e) {
                        if (jQuery(e.target).closest(".enumenu_container").length == 0) {
                            menuobj.find("a").each(function(){
                                jQuery(this).removeClass("link");
                                jQuery(this).parent().removeClass("hover");
                            });
                        }
                    });
                  
                } else {
                    
                    menuobj.find("li").mouseenter(function() {
                        jQuery(this).addClass('hover');
                    });
                    menuobj.find("li").mouseleave(function() {
                        jQuery(this).removeClass('hover');
                    });
                }
            
        });
    };
})(jQuery);