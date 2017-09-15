jQuery(document).ready(function () {

        //first get the value for the header, banner and set the offser value
        var banner_height = 493;//jQuery(".banner-and-guestroom-section").height();
        var header_height = jQuery("header").height();
        var offset_val = banner_height - header_height;
    
        jQuery(window).scroll(function(){
                setSubMenu();
        });
        jQuery(window).on("resize", (function() {
                setSubMenu();
        });

        function setSubMenu(){
                var scrollval = jQuery(window).scrollTop();
                //adjust sub menues when header changes 
                if (scrollval >= offset_val){
                        //start media queries
                        if(jQuery(window).width() >= 1941) {
                                jQuery(".header-navigation .enumenu_ul ul.desk ul").css('margin-top','-27px');
                                jQuery(".win.gecko .header-navigation .enumenu_ul ul.desk ul").css('margin-top','27px');
                                jQuery(".safari .header-navigation .enumenu_ul ul.desk ul").css('margin-top','-31px');
                                jQuery(".win.ie .header-navigation .enumenu_ul ul.desk ul").css('margin-top','28px');
                        }
                        else if(jQuery(window).width() >= 1900) {
                                jQuery(".header-navigation .enumenu_ul ul.desk ul").css('margin-top','25px');
                                jQuery(".win.gecko .header-navigation .enumenu_ul ul.desk ul").css('margin-top','39px');
                                jQuery(".safari .header-navigation .enumenu_ul ul.desk ul").css('margin-top','25px');
                                jQuery(".win.ie .header-navigation .enumenu_ul ul.desk ul").css('margin-top','28px');
                        }
                        else if(jQuery(window).width() >= 1575) {
                                jQuery(".header-navigation .enumenu_ul ul.desk ul").css('margin-top','39px');
                                jQuery(".win.gecko .header-navigation .enumenu_ul ul.desk ul").css('margin-top','39px');
                                jQuery(".safari .header-navigation .enumenu_ul ul.desk ul").css('margin-top','39px');
                                jQuery(".win.ie .header-navigation .enumenu_ul ul.desk ul").css('margin-top','39px');
                        }
                        else if(jQuery(window).width() >= 1400) {
                                jQuery(".header-navigation .enumenu_ul ul.desk ul").css('margin-top','42px');
                                jQuery(".win.gecko .header-navigation .enumenu_ul ul.desk ul").css('margin-top','42px');
                                jQuery(".safari .header-navigation .enumenu_ul ul.desk ul").css('margin-top','39px');
                                jQuery(".win.ie .header-navigation .enumenu_ul ul.desk ul").css('margin-top','42px');
                        }
                        else if(jQuery(window).width() >= 1320) {
                                jQuery(".header-navigation .enumenu_ul ul.desk ul").css('margin-top','51px');
                                jQuery(".win.gecko .header-navigation .enumenu_ul ul.desk ul").css('margin-top','51px');
                                jQuery(".safari .header-navigation .enumenu_ul ul.desk ul").css('margin-top','42px');
                                jQuery(".win.ie .header-navigation .enumenu_ul ul.desk ul").css('margin-top','51px');
                        }
                        else if(jQuery(window).width() >= 1280) {
                                jQuery(".header-navigation .enumenu_ul ul.desk ul").css('margin-top','51px');
                                jQuery(".win.gecko .header-navigation .enumenu_ul ul.desk ul").css('margin-top','52px');
                                jQuery(".safari .header-navigation .enumenu_ul ul.desk ul").css('margin-top','51px');
                                jQuery(".win.ie .header-navigation .enumenu_ul ul.desk ul").css('margin-top','26px');
                        }
                        else if(jQuery(window).width() >= 1180) {
                                jQuery(".header-navigation .enumenu_ul ul.desk ul").css('margin-top','53px');
                                jQuery(".win.gecko .header-navigation .enumenu_ul ul.desk ul").css('margin-top','52px');
                                jQuery(".safari .header-navigation .enumenu_ul ul.desk ul").css('margin-top','26px');
                                jQuery(".win.ie .header-navigation .enumenu_ul ul.desk ul").css('margin-top','53px');
                        }
                        else if(jQuery(window).width() >= 1020) {
                                jQuery(".header-navigation .enumenu_ul ul.desk ul").css('margin-top','53px');
                                jQuery(".win.gecko .header-navigation .enumenu_ul ul.desk ul").css('margin-top','52px');
                                jQuery(".safari .header-navigation .enumenu_ul ul.desk ul").css('margin-top','53px');
                                jQuery(".win.ie .header-navigation .enumenu_ul ul.desk ul").css('margin-top','53px');
                        }
                        else if(jQuery(window).width() >= 980) {
                                jQuery(".header-navigation .enumenu_ul ul.desk ul").css('margin-top','52px');
                                jQuery(".win.gecko .header-navigation .enumenu_ul ul.desk ul").css('margin-top','52px');
                                jQuery(".safari .header-navigation .enumenu_ul ul.desk ul").css('margin-top','53px');
                                jQuery(".win.ie .header-navigation .enumenu_ul ul.desk ul").css('margin-top','52px');
                        }

                }
                else {
                        //start media queries to return to normal when scrolling back to top
                        if(jQuery(window).width() >= 1941) {
                                jQuery(".header-navigation .enumenu_ul ul.desk ul").css('margin-top','-26px');
                                jQuery(".win.gecko .header-navigation .enumenu_ul ul.desk ul").css('margin-top','33px');
                                jQuery(".safari .header-navigation .enumenu_ul ul.desk ul").css('margin-top','-26px');
                                jQuery(".win.ie .header-navigation .enumenu_ul ul.desk ul").css('margin-top','30px');
                        }
                        else if(jQuery(window).width() >= 1575) {
                                jQuery(".header-navigation .enumenu_ul ul.desk ul").css('margin-top','38px');
                                jQuery(".win.gecko .header-navigation .enumenu_ul ul.desk ul").css('margin-top','38px');
                                jQuery(".safari .header-navigation .enumenu_ul ul.desk ul").css('margin-top','37px');
                                jQuery(".win.ie .header-navigation .enumenu_ul ul.desk ul").css('margin-top','36px');
                        }
                        else if(jQuery(window).width() >= 1400) {
                                jQuery(".header-navigation .enumenu_ul ul.desk ul").css('margin-top','47px');
                                jQuery(".win.gecko .header-navigation .enumenu_ul ul.desk ul").css('margin-top','33px');
                                jQuery(".safari .header-navigation .enumenu_ul ul.desk ul").css('margin-top','33px');
                                jQuery(".win.ie .header-navigation .enumenu_ul ul.desk ul").css('margin-top','47px');
                        }
                        else if(jQuery(window).width() >= 1320) {
                                jQuery(".header-navigation .enumenu_ul ul.desk ul").css('margin-top','47px');
                                jQuery(".win.gecko .header-navigation .enumenu_ul ul.desk ul").css('margin-top','47px');
                                jQuery(".safari .header-navigation .enumenu_ul ul.desk ul").css('margin-top','47px');
                                jQuery(".win.ie .header-navigation .enumenu_ul ul.desk ul").css('margin-top','45px');
                        }
                        else if(jQuery(window).width() >= 1280) {
                                jQuery(".header-navigation .enumenu_ul ul.desk ul").css('margin-top','47px');
                                jQuery(".win.gecko .header-navigation .enumenu_ul ul.desk ul").css('margin-top','28px');
                                jQuery(".safari .header-navigation .enumenu_ul ul.desk ul").css('margin-top','47px');
                                jQuery(".win.ie .header-navigation .enumenu_ul ul.desk ul").css('margin-top','40px');
                        }
                        else if(jQuery(window).width() >= 980) {
                                jQuery(".header-navigation .enumenu_ul ul.desk ul").css('margin-top','27px');
                                jQuery(".win.gecko .header-navigation .enumenu_ul ul.desk ul").css('margin-top','31px');
                                jQuery(".safari .header-navigation .enumenu_ul ul.desk ul").css('margin-top','27px');
                                jQuery(".win.ie .header-navigation .enumenu_ul ul.desk ul").css('margin-top','25px');
                        }  
                        
                }
        }

}

