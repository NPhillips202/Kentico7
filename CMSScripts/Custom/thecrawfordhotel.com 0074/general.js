// JavaScript Document
var jQuery = jQuery.noConflict();
jQuery(document).ready(function(jQuery){
	jQuery(".selectbox").selectbox({
        hide_duplicate_option: true
    });
	
	jQuery(".book-btn").click(function() {
        if(jQuery(window).width() <= 767) {
            jQuery(".select-option").slideToggle();
        }
    });
    jQuery('.enumenu_ul').responsiveMenu({
        'menuIcon_text': 'Menu',
        menuslide_overlap: true,
        menuslide_direction: 'left',
        onMenuopen: function() {}
    });
});

jQuery(window).load(function() {
     jQuery("body").css('opacity','1');
 });
 
 