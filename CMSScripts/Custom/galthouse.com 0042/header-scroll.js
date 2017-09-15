jQuery(window).load(function(){
jQuery(window).scroll(function(){
  var sticky = jQuery('.header'),
      scroll = jQuery(window).scrollTop();

  if (scroll >= 104) sticky.addClass('fixed');
  else sticky.removeClass('fixed');
});
}); 
