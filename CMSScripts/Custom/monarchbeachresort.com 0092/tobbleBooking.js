 jQuery(window).on("load resize", function() {
   
        if (Modernizr.mq('(max-width: 979px)')) {
            jQuery('.test').hide();
            jQuery('#showMore').addClass("more");
            jQuery('.more').click(function() {
              jQuery(this).prev('.test').slideToggle() ;
              jQUery(this).html('close');
            });
            
            jQuery('#reservWrap').click(function() {
              jQuery('.test').slideToggle() ;
              jQUery(this).html('close');
            });
            
          } else { 
              jQuery('.test').show();
              jQuery('.test').css("display", "block");
              jQuery('.more').unbind('click');                 
          }; 
  });