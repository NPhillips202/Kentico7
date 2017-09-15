// udpated on feb 2nd following issue #bg2015f2-9lwh
//  #bg2015f2-9lwh (check box value and radio box value not updating )
//  #bg2015m3-9lwh (issues fixed :: default selected, foucs and blur, add custom elemements in label text like in google privicy and policy )
jQuery(document).ready(function(e) {
	jQuery('input:radio').each(function(){
		jQuery(this).wrap('<div class="customRadiobox"></div');
		//jQuery(this).parent().append('<label>'+jQuery(this).data('radiobox-label')+'</label>');
		jQuery(this).css('position','absolute').css('left','-999999px')
		});
	jQuery('input:checkbox').each(function(){
		jQuery(this).wrap('<div class="customCheckbox"></div')
		//jQuery(this).parent().append('<label>'+jQuery(this).data('checkbox-label')+'</label>');
		jQuery(this).css('position','absolute').css('left','-999999px')
		});
		
	jQuery('input:checkbox').each(function(){ 
	 if(jQuery(this).attr('checked')=='checked'){
		jQuery(this).closest('.customCheckbox').addClass('checked'); 
	}
	});
	
	jQuery('input:radio').each(function(){ 
	 if(jQuery(this).attr('checked')=='checked'){
		jQuery(this).closest('.customRadiobox').addClass('checked'); 
	}
	});
	
	jQuery('input').on('blur', function(){
		 jQuery(this).closest('.customCheckbox').removeClass('focused'); 
		 jQuery(this).closest('.customRadiobox').removeClass('focused'); 
     }).on('focus', function(){
		
        jQuery(this).closest('.customCheckbox').addClass('focused'); 
		jQuery(this).closest('.customRadiobox').addClass('focused'); 
    });
	

	
		
	jQuery('.customRadiobox').click(function(){
	  if(jQuery(this).hasClass('checked')){
		//$(this).find($('input[type="radio"]')).removeAttr('checked');
	  }else{
		  jQuery('input[type="radio"][name="' + jQuery(this).find('input:radio').prop('name') + '"]').not(jQuery(this)).parent().removeClass('checked');
		  jQuery('input[type="radio"][name="' + jQuery(this).find('input:radio').prop('name') + '"]').not(jQuery(this)).prop('checked','');
		  jQuery(this).addClass('checked');
		  jQuery(this).find(jQuery('input[type="radio"]')).prop('checked','checked').focus();
	  }
	});
	jQuery('.customCheckbox').click(function(){
		if(jQuery(this).hasClass('checked')){
			jQuery(this).removeClass('checked');
			jQuery(this).find(jQuery('input[type="checkbox"]')).prop('checked','');
	  }else{
		  jQuery(this).addClass('checked');
		  jQuery(this).find(jQuery('input[type="checkbox"]')).prop('checked','checked').focus();
	  }
	});
	
});
// JavaScript Document