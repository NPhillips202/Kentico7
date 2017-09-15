function closeAllModalWindows(){Windows.closeAllModalWindows();return true;}
function winOpenFlash(winName,wWith,wHight)
{var win=new Window({id:winName,className:"cendyn_gray",width:wWith,height:wHight,minimizable:false,maximizable:false});WindowUtilities.disableScreen(win.options.className,'overlay_modal',win.overlayOpacity,win.getId(),win.options.parent);win.getContent().innerHTML=document.getElementById("divFlash").innerHTML;win.setDestroyOnClose();win.showCenter();win.toFront();}
function winOpenFlash_AreaMap(winName,wWith,wHight)
{document.getElementById("divFlash_AreaMap").innerHTML=("<iframe src=/InteractiveMap/interactivemap4.asp frameborder=0 scrolling=no width=892 height=492></iframe>");var win=new Window({id:winName,className:"cendyn_gray",width:wWith,height:wHight,minimizable:false,maximizable:false});WindowUtilities.disableScreen(win.options.className,'overlay_modal',win.overlayOpacity,win.getId(),win.options.parent);win.getContent().innerHTML=document.getElementById("divFlash_AreaMap").innerHTML;win.setDestroyOnClose();win.showCenter();win.toFront();}
function winOpenFlash_AreaMap_THC(winName,wWith,wHight)
{document.getElementById("divFlash_AreaMap_THC").innerHTML=("<iframe src=/trumpHotel_interactivemap_/interactivemap4.asp frameborder=0 scrolling=no width=892 height=492></iframe>");var win=new Window({id:winName,className:"cendyn_gray",width:wWith,height:wHight,minimizable:false,maximizable:false});WindowUtilities.disableScreen(win.options.className,'overlay_modal',win.overlayOpacity,win.getId(),win.options.parent);win.getContent().innerHTML=document.getElementById("divFlash_AreaMap_THC").innerHTML;win.setDestroyOnClose();win.showCenter();win.toFront();}
function winOpenFlash_booking(winName,wWith,wHight)
{document.getElementById("divFlash_booking").innerHTML=("<iframe src=/booking_mask.asp frameborder=0 scrolling=no width=320 height=420></iframe>");var win=new Window({id:winName,className:"cendyn_gray",width:wWith,height:wHight,minimizable:false,maximizable:false});WindowUtilities.disableScreen(win.options.className,'overlay_modal',win.overlayOpacity,win.getId(),win.options.parent);win.getContent().innerHTML=document.getElementById("divFlash_booking").innerHTML;win.setDestroyOnClose();win.showCenter();win.toFront();}
function winOpen_games(winName,wWith,wHight)
{document.getElementById("divFlash_booking").innerHTML=("<iframe src=/Merchandise/trump_games/TrumpTycoon_1.asp frameborder=0 scrolling=no width=480 height=350></iframe>");var win=new Window({id:winName,className:"cendyn_gray",width:wWith,height:wHight,minimizable:false,maximizable:false});WindowUtilities.disableScreen(win.options.className,'overlay_modal',win.overlayOpacity,win.getId(),win.options.parent);win.getContent().innerHTML=document.getElementById("divFlash_booking").innerHTML;win.setDestroyOnClose();win.showCenter();win.toFront();}
function winOpen_games2(winName,wWith,wHight)
{document.getElementById("divFlash_booking").innerHTML=("<iframe src=/Merchandise/trump_games/TrumpTycoon_2.asp frameborder=0 scrolling=no width=480 height=350></iframe>");var win=new Window({id:winName,className:"cendyn_gray",width:wWith,height:wHight,minimizable:false,maximizable:false});WindowUtilities.disableScreen(win.options.className,'overlay_modal',win.overlayOpacity,win.getId(),win.options.parent);win.getContent().innerHTML=document.getElementById("divFlash_booking").innerHTML;win.setDestroyOnClose();win.showCenter();win.toFront();}
function winOpen_games3(winName,wWith,wHight)
{document.getElementById("divFlash_booking").innerHTML=("<iframe src=/Merchandise/trump_games/TrumpTycoon_3.asp frameborder=0 scrolling=no width=480 height=350></iframe>");var win=new Window({id:winName,className:"cendyn_gray",width:wWith,height:wHight,minimizable:false,maximizable:false});WindowUtilities.disableScreen(win.options.className,'overlay_modal',win.overlayOpacity,win.getId(),win.options.parent);win.getContent().innerHTML=document.getElementById("divFlash_booking").innerHTML;win.setDestroyOnClose();win.showCenter();win.toFront();}
function winOpen_games4(winName,wWith,wHight)
{document.getElementById("divFlash_booking").innerHTML=("<iframe src=/Merchandise/trump_games/TrumpTycoon_4.asp frameborder=0 scrolling=no width=480 height=350></iframe>");var win=new Window({id:winName,className:"cendyn_gray",width:wWith,height:wHight,minimizable:false,maximizable:false});WindowUtilities.disableScreen(win.options.className,'overlay_modal',win.overlayOpacity,win.getId(),win.options.parent);win.getContent().innerHTML=document.getElementById("divFlash_booking").innerHTML;win.setDestroyOnClose();win.showCenter();win.toFront();}
function winOpen_games5(winName,wWith,wHight)
{document.getElementById("divFlash_booking").innerHTML=("<iframe src=/Merchandise/trump_games/TrumpTycoon_5.asp frameborder=0 scrolling=no width=480 height=350></iframe>");var win=new Window({id:winName,className:"cendyn_gray",width:wWith,height:wHight,minimizable:false,maximizable:false});WindowUtilities.disableScreen(win.options.className,'overlay_modal',win.overlayOpacity,win.getId(),win.options.parent);win.getContent().innerHTML=document.getElementById("divFlash_booking").innerHTML;win.setDestroyOnClose();win.showCenter();win.toFront();}
function winOpenFlash_GolfVideo(winName,wWith,wHight){document.getElementById("divFlash_GolfVideo").innerHTML=("<iframe src=/Golf_Clubs/Golf_Video.asp frameborder=0 scrolling=no width=525 height=283></iframe>");var win=new Window({id:winName,className:"cendyn_gray",width:wWith,height:wHight,minimizable:false,maximizable:false});WindowUtilities.disableScreen(win.options.className,'overlay_modal',win.overlayOpacity,win.getId(),win.options.parent);win.getContent().innerHTML=document.getElementById("divFlash_GolfVideo").innerHTML;win.setDestroyOnClose();win.showCenter();win.toFront();}
function openGolfVideo(){winOpenFlash_GolfVideo('GolfVideo','525','283');}
function winOpen_Contact(winName,wWith,wHight,source)
{document.getElementById("divFlash_booking").innerHTML=("<iframe src=/Brokerage_Contact_Us/Contact_Us.asp?"+source+" frameborder=0 scrolling=no width=480 height=502></iframe>");var win=new Window({id:winName,className:"cendyn_gray",width:wWith,height:wHight,minimizable:false,maximizable:false});WindowUtilities.disableScreen(win.options.className,'overlay_modal',win.overlayOpacity,win.getId(),win.options.parent);win.getContent().innerHTML=document.getElementById("divFlash_booking").innerHTML;win.setDestroyOnClose();win.showCenter();win.toFront();}
function openContact(source){winOpen_Contact('divFlash_booking2','480','502',source);}
function winOpen_Contact2(winName,wWith,wHight,source)
{document.getElementById("divFlash_booking").innerHTML=("<iframe src=/Real_Estate_Portfolio/Manila/disclaimer.asp?"+source+" frameborder=0 scrolling=no width=450 height=275></iframe>");var win=new Window({id:winName,className:"cendyn_gray",width:wWith,height:wHight,minimizable:false,maximizable:false});WindowUtilities.disableScreen(win.options.className,'overlay_modal',win.overlayOpacity,win.getId(),win.options.parent);win.getContent().innerHTML=document.getElementById("divFlash_booking").innerHTML;win.setDestroyOnClose();win.showCenter();win.toFront();}
function openContact2(source){winOpen_Contact2('divFlash_booking2','450','275',source);}
//Script for video-Start//
function expandVideo(section, anchorTag) {
	var sectionID = jQuery('#' + section);
	var sectionClass = jQuery('#' + anchorTag);
	
	if (jQuery(sectionID).is(':visible')) {
		jQuery(sectionClass).html('Click to expand videos [+]');
	} else {
		jQuery(sectionClass).html('Click to hide videos [&ndash;]');
	};
	
	jQuery(sectionID).slideToggle("slow");
};

function playVideo(video) {
	jQuery('#videoContainer').attr('src', video);
};

jQuery(document).ready(function() {
	jQuery('#videos a').click (function() {
      var video = jQuery(this).attr('href');
		//alert(video);
		jQuery('#videoContainer').attr('src', video);
		return false;
	});
    
    /** Setting popup top and Left **/
    var window_width = jQuery(window).width();
    var window_height = jQuery(window).height();
    jQuery("#popUpDiv").css('top','calc((100% - 466px) / 2)');
    
    if(window_width > 1201){
        jQuery("#popUpDiv").css('left','calc((100% - 579px) / 2)');
    }
    if(window_width < 1200){
        jQuery("#popUpDiv").css('left','calc((100% - 579px) / 2)');
    }
    if(window_width < 767){
        jQuery("#popUpDiv").css('top','calc((100% - 200px) / 2)');
    }
    if(window_width < 700){
        jQuery("#popUpDiv").css('left','calc((100% - 86%) / 2)');
    }
  
});
//Script for video-End//


    