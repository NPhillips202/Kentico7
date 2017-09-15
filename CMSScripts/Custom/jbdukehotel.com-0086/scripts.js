jQuery(function() {
  //Press
  jQuery('.main-press-wrapper h2:first-child').removeClass('expand');
  jQuery('.main-press-wrapper h2:first-child').next().css('display','block');
  
  jQuery('.main-press-wrapper h2').click(function() {
      console.log(jQuery(this).next().html());
      jQuery(this).next().stop().slideToggle('slow');
  });
  
  //accorion set for career/job application
jQuery(document).ready(function() {
    jQuery('#section1').next().css('display','block');
        
  // If error is found on form submission, highlight the heading in red
    jQuery('.FormPanel .container').each(function(){
        if (jQuery(this).find('.EditingFormErrorLabel').length) {
            jQuery(this).prevUntil('.container').css('color','red');
        };
    });
    
    var formSpeed = 500;
    jQuery('.openThisSection').click(function(){
       jQuery('div .container').hide();
       jQuery(this).next().slideDown(formSpeed);
       jQuery('html, body').animate({scrollTop:jQuery(this).offset().top}, formSpeed);
       
    });
      
    jQuery('.toNextSection').click(function(){
       jQuery(this).closest('.container').slideUp(formSpeed);
       jQuery(this).parent().parent().parent().parent().parent().parent().next().next().slideDown(formSpeed);
       jQuery('html, body').animate({scrollTop:jQuery(this).parent().parent().parent().parent().parent().parent().offset().top}, formSpeed);
     });
});

  
 //add target attribute to career link
  jQuery("a[href='/careers/']").attr("target","_blank");

  
});