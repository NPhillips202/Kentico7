jQuery(document).ready(function() {
   	  
	jQuery('.tab-type01').find('h2').click(function(){ 
      jQuery(this).next('.inside-content02').slideToggle('');
	  jQuery(this).toggleClass('active'); 
      //$(".inside-content02").not($(this).next()).slideUp(''); 
	  //$(".inside-content02").not($(this).next()).prev().removeClass('active'); 
    });
		   

});