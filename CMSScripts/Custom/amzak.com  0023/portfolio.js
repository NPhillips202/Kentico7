
/*
====================================================================================================
@name			Amzak - portfolio.js (customized)
@version		1.0.0
@author			Les Fleurimond / Cendyn/ONE, Viral Patel / viralpatel.net
@author-uri		http://cendynone.com, http://viralpatel.net/blogs/dynamically-shortened-text-show-more-link-jquery/
@copyright		2014 Les Fleurimond / Cendyn/ONE
====================================================================================================
*/

    showChar = 0,
	ellipsestext = '...',
	moretext = 'read more <i class="fa fa-caret-right"></i>',//'read more &raquo;',
	lesstext = '<i class="fa fa-caret-left"></i> close',//'&laquo; close',
    baseLang = null,
	portfolio_content = jQuery('.portfolio').find('span.portfolio-content');

jQuery(function() {
	// Shorten text - Read more and Read less link
	// ref: http://viralpatel.net/blogs/dynamically-shortened-text-show-more-link-jquery/
  
  
  
       /*
  -if userLanguage exists they're in IE, else firefox
  -get the first two letters in lowercase to guarantee 
   an easily evaluated base language
  */
  
  if (window.location.search) {
    baseLang = window.location.search.substring(6,8).toLowerCase();
  } else if (navigator.userLanguage) {
    baseLang = navigator.userLanguage.substring(0,2).toLowerCase();
  } else if (navigator.language) {
    baseLang = navigator.language.substring(0,2).toLowerCase();
  } else {
    baseLang = 'en';
  }

  //check languages
  switch(baseLang)
  {
    case 'es':
      //Spanish
      moretext = 'Ver más <i class="fa fa-caret-right"></i>';
      lesstext = '<i class="fa fa-caret-left"></i> cerca';
      break;
    default:
      moretext = 'read more <i class="fa fa-caret-right"></i>';
      lesstext = '<i class="fa fa-caret-left"></i> close';
  }
  
	portfolio_content.each(function(index) {
		var content = jQuery(this).html(),
			set_content_id = jQuery(this).attr('id','content-' + index),
			content_id = set_content_id.attr('id');
		if(content.length > showChar) {
            var c = jQuery(this).find('span.teaser').text();
            //var h = content.substr(showChar-1, content.length - showChar);
            var html = '<span class="shortDescrip">' + c + '</span><span class="morecontent"><span>' + content + '</span>&nbsp;<a href="#' + content_id + '" class="more">' + moretext + '</a></span>';
			jQuery(this).html(html);
          };	
	}); 
	jQuery('.portfolio .more').click(function(){
        jQuery('.portfolio').find('.teaser').removeClass('hide');
		var morelink = jQuery(this);
		if(morelink.hasClass('less')) {
			//morelink.removeClass('less');
			jQuery('.portfolio .more').removeClass('less');
			//if (!morelink.find('img').hasClass('circle')) 
				//morelink.not(':has(img)').html(moretext);
			morelink.html(moretext);
            //morelink.closest('li').css('float','right');
			morelink.closest('li').removeClass('shadow');
			jQuery('.portfolio .more').closest('li').removeClass('hide');
			jQuery(this).parent().parent().children('.shortDescrip').show();
		} else {
			//morelink.addClass('less');
            jQuery('.portfolio').find('.teaser').addClass('hide');
			jQuery('.portfolio .more').addClass('less').attr('href','#portfolio');
			morelink.html(lesstext);
			morelink.closest('li').addClass('shadow');
            jQuery('.shadow').css('float','left');
			jQuery('.portfolio .more').closest('li:not(.shadow)').addClass('hide');
			//morelink.closest('p').outerHeight();
			//console.log(morelink.closest('p').height());
			jQuery(this).parent().parent().children('.shortDescrip').hide();
          
		}
		//morelink.parent().prev().toggle({easing:'linear',specialEasing:'linear'});
		//morelink.prev().toggle({easing:'linear',specialEasing:'linear'});
		morelink.parent().prev().toggle();
		morelink.prev().toggle();
		//morelink.delay().fadeOut('slow').addClass('hide');

		//return false;
	});
});
