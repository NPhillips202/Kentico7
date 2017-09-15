// JavaScript Document

// check for IE
var ua = window.navigator.userAgent;
//var ua = navigator.appVersion.indexOf("MSIE ");
//var ua = navigator.appVersion.indexOf("MSIE 7.");
var msie = ua.indexOf('MSIE '); // < IE10
var trident = ua.indexOf('Trident/'); // IE11
var edge = ua.indexOf('Edge/'); // IE12
//var ie = ua.match(/MSIE|Trident/);
if(msie != -1 || trident != -1 || edge != -1) {
	jQuery('html').addClass('ie');
}
jQuery(document).ready(function() {
	// slideshow
	var slideshow_wrap = jQuery('#slideshow'),
		slideshow = slideshow_wrap.find('.slideshow'),
		slideshow_prev = slideshow_wrap.find('.prev'),
		slideshow_next = slideshow_wrap.find('.next'),
		slideshow_imgs = slideshow.find('img');
	if(slideshow_imgs.length == 1) {
		slideshow_imgs.css('opacity', 1);
		slideshow_prev.addClass('hide');
		slideshow_next.addClass('hide');
	}
	slideshow.cycle({
		/*before : function(currSlideElement, nextSlideElement){
			console.log(jQuery(nextSlideElement).parent().parent().height());
			slideshow.css('height', jQuery(nextSlideElement).parent().parent().height() + 'px');
		},*/
		timeout : 7500,
		fx: 'fade',
		next: '.next',
		prev: '.prev',
		fit: true,
	});
	/*
	// do onload
	var height = jQuery('.slideshow img').height();
	console.log(height);
	jQuery('.slideshow').height(height);
	// do onresize
	jQuery(window).resize(function() {
		var height = jQuery('.slideshow img').height();
		console.log(height);
		jQuery('.slideshow').height(height);
	});
	*/

	// add class to 1st & last container
	jQuery('#wrapper > .container:first').addClass('first');
	jQuery('#wrapper > .container:last').addClass('last');

	// main menu toggle
	//jQuery('.navicon-button').on('click', function(){
	jQuery('#mainnav-toggle').click(function (e) {
		e.preventDefault();
		jQuery(this).find('> .navicon-button').toggleClass('open');
		jQuery('body').toggleClass('hide-overflow');
		jQuery('#mainnav.full-menu').toggleClass('full-menu--open');
	});

	// sub nav toggle
	jQuery('#subnav-toggle').click(function(e) {
		e.preventDefault();
		jQuery(this).find('> .navicon-button').toggleClass('open');
		jQuery('.subhead>nav:visible').stop().slideUp().fadeOut(400, function() {
			jQuery(this).css('display','none');
		});
		jQuery('.subhead>nav').not(":visible").stop().slideDown().fadeIn(400, function() {
			jQuery(this).css('display','inline-block');
		});
	});

    // Email Form in Footer //
    var emailForm = jQuery('.email-form');
    var defaultValue = "Enter eMail Address";
    // Clear text in field when focused
    /*emailForm.find('.emailSignUp').focus(function() {
        if (jQuery(this).val() == defaultValue) {
            jQuery(this).val('');
        };
    });
    emailForm.find('.emailSignUp').blur(function() {
        if (jQuery(this).val() == '') {
            jQuery(this).val(defaultValue);
        };
    });*/
    // Submit functions
    function submitEmailForm() {
		var email = emailForm.find('.emailSignUp').val();
        alert(email);
		if (email == defaultValue || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
			alert("Please enter a valid email address.");
			return false;
		};
		document.location.href = ('/email-sign-up/?em=' + email);
    };
    emailForm.find('.emailSignUp').focus(function() {
        jQuery(document.body).delegate('input:text', 'keypress', function(e) {
            if (e.which === 13) {
                e.preventDefault();
                submitEmailForm();
            };
        });
    });
	emailForm.find('.button').click(function(e) {
		e.preventDefault();
		submitEmailForm();
	});
	
	// Sitemap
	jQuery(".sitemap-toggle > a").live('click',function(e) {
        e.preventDefault();
        if (jQuery('.sitemap-float').is(':visible')) {
            jQuery(".sitemap-float").fadeOut(500);
        } else {
            jQuery(".sitemap-float").fadeIn(500);
        };
    });
  
    // selectbox
    jQuery('.selectbox').selectbox();
  
    // Datepicker
    jQuery('.datepicker').datepicker({
		buttonImage: "/getmedia/4d28a446-9d0c-4ba8-b124-2f0e10c63d9d/cal",
		buttonImageOnly: true,
        showOn: 'both',
        minDate: ('+0D'),
		onSelect: function() {
            jQuery('.hasDatepicker').datepicker("hide");
		}
    });    
    // Close Datepicker
    jQuery(document).click(function(e) { 
        var ele = jQuery(e.target);
        if (jQuery(ele).attr('class') !== undefined) {
            var eleClass = jQuery(ele).attr('class');
        } else {
            var eleClass = '';
        };
        if (!ele.hasClass("hasDatepicker") && !ele.hasClass("ui-datepicker") && !ele.hasClass("ui-icon") && !jQuery(ele).parent().parents(".ui-datepicker").length && (eleClass.indexOf('ui-datepicker') == -1))
            jQuery(".hasDatepicker").datepicker("hide"); 
    });

});
jQuery(window).bind('load resize', function() {
//jQuery(window).resize(function() {
	var height = jQuery('.slideshow img').height();
	//console.log(height);
	jQuery('.slideshow').css('height', height + 'px');
	//jQuery('.slideshow').height(height);
});

/*var currentHeight;
var currentWidth;
$(window).resize(function () {
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();

	if (currentHeight == undefined || currentHeight != windowHeight
	  || currentWidth == undefined || currentWidth != windowWidth) {

		// redraw the chart here will make IE8 fire resize event again
		// ...

		currentHeight = windowHeight;
		currentWidth = windowWidth;
	}
});*/


//<![CDATA[
jQuery(window).load(function() {
	// Disable scroll zooming and bind back the click event
	var onMapMouseleaveHandler = function (event) {
		var that = jQuery(this);
		that.on('click', onMapClickHandler);
		that.off('mouseleave', onMapMouseleaveHandler);
		that.find('iframe').css("pointer-events", "none");
	}
	var onMapClickHandler = function (event) {
		var that = jQuery(this);
		// Disable the click handler until the user leaves the map area
		that.off('click', onMapClickHandler);
		// Enable scrolling zoom
		that.find('iframe').css("pointer-events", "auto");
		// Handle the mouse leave event
		that.on('mouseleave', onMapMouseleaveHandler);
	}
	// Enable map zooming with mouse scroll when the user clicks the map
	jQuery('.maps.embed_code').on('click', onMapClickHandler);
});
//]]>


/**
**/
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}



function openWindow(url)
   {
   window.open(url,'','resizable,scrollbars,width=800,height=600,top=500,left=500,toolbar=yes');
   }





//v1.0
//Copyright 2006 Adobe Systems, Inc. All rights reserved.
function AC_AddExtension(src, ext)
{
  if (src.indexOf('?') != -1)
    return src.replace(/\?/, ext+'?'); 
  else
    return src + ext;
}

function AC_Generateobj(objAttrs, params, embedAttrs) 
{ 
  var str = '<object ';
  for (var i in objAttrs)
    str += i + '="' + objAttrs[i] + '" ';
  str += '>';
  for (var i in params)
    str += '<param name="' + i + '" value="' + params[i] + '" /> ';
  str += '<embed ';
  for (var i in embedAttrs)
    str += i + '="' + embedAttrs[i] + '" ';
  str += ' ></embed></object>';

  document.write(str);
}

function AC_FL_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
     , "application/x-shockwave-flash"
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_SW_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".dcr", "src", "clsid:166B1BCA-3F9C-11CF-8075-444553540000"
     , null
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_GetArgs(args, ext, srcParamName, classid, mimeType){
  var ret = new Object();
  ret.embedAttrs = new Object();
  ret.params = new Object();
  ret.objAttrs = new Object();
  for (var i=0; i < args.length; i=i+2){
    var currArg = args[i].toLowerCase();    

    switch (currArg){	
      case "classid":
        break;
      case "pluginspage":
        ret.embedAttrs[args[i]] = args[i+1];
        break;
      case "src":
      case "movie":	
        args[i+1] = AC_AddExtension(args[i+1], ext);
        ret.embedAttrs["src"] = args[i+1];
        ret.params[srcParamName] = args[i+1];
        break;
      case "onafterupdate":
      case "onbeforeupdate":
      case "onblur":
      case "oncellchange":
      case "onclick":
      case "ondblClick":
      case "ondrag":
      case "ondragend":
      case "ondragenter":
      case "ondragleave":
      case "ondragover":
      case "ondrop":
      case "onfinish":
      case "onfocus":
      case "onhelp":
      case "onmousedown":
      case "onmouseup":
      case "onmouseover":
      case "onmousemove":
      case "onmouseout":
      case "onkeypress":
      case "onkeydown":
      case "onkeyup":
      case "onload":
      case "onlosecapture":
      case "onpropertychange":
      case "onreadystatechange":
      case "onrowsdelete":
      case "onrowenter":
      case "onrowexit":
      case "onrowsinserted":
      case "onstart":
      case "onscroll":
      case "onbeforeeditfocus":
      case "onactivate":
      case "onbeforedeactivate":
      case "ondeactivate":
      case "type":
      case "codebase":
        ret.objAttrs[args[i]] = args[i+1];
        break;
      case "width":
      case "height":
      case "align":
      case "vspace": 
      case "hspace":
      case "class":
      case "title":
      case "accesskey":
      case "name":
      case "id":
      case "tabindex":
        ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
        break;
      default:
        ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
    }
  }
  ret.objAttrs["classid"] = classid;
  if (mimeType) ret.embedAttrs["type"] = mimeType;
  return ret;
}
