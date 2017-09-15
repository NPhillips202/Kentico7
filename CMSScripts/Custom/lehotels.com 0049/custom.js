/* note: Existing website uses: jQuery v1.8.3 jquery.com | jquery.org/license */

/*
@name			LE Hotels - custom.js
@version		1.0.0
@author-uri		http://cendynone.com
*/

/***************/
/** SET VARS **/
/***************/
//document.getElementsByTagName( 'html' )[0].setAttribute( 'xmlns:og', 'http://opengraphprotocol.org/schema/');
//document.getElementsByTagName( 'html' )[0].className = 'no-js no-svg  stylish-select ' + documentName + ' ' + nodeAlias + ' ' + ((nodeAlias == "search") ? 'header-css3-fix' : '');

//var html = jQuery('html').attr('xmlns:og', 'http://opengraphprotocol.org/schema/').addClass('no-js no-svg ' + documentName + ' ' + nodeAlias + ' ' + ((nodeAlias == "search") ? 'header-css3-fix stylish-select' : ''));
  /*mainnav = jQuery('#main-menu ul'),
    first_lis = mainnav.find('> li:first').addClass('first'),
    last_lis = mainnav.find('> li:last').addClass('last');*/

/***************/
/** Functions **/
/***************/

// init sitemap
var initSiteMap = function() {
	jQuery('.sitemap-toggle > a, a.sitemap-toggle').click(function(e) {
		e.preventDefault();
		if (jQuery('.sitemap-float').is(':visible')) {
			jQuery('.sitemap-float').fadeOut(500);
		} else {
			jQuery(".sitemap-float").fadeIn(500);
		}
	});
};

// tablet schema breadcrumbs
var tabletBreadCrumbs = function() {
    /* 
    Sample:
    <a href="/" itemprop="url" rel="index up">
    <span itemprop="title">Home</span>
    </a> &raquo; 
    <span itemprop="child" itemscope itemtype="http://data-vocabulary.org/Breadcrumb">
    <a href="/oldground" itemprop="url">
    <span itemprop="title">Hotel Overview</span>
    </a>
    </span>
    */
    var child = jQuery('<span itemprop="child" itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb" />'),
        title = jQuery('<span itemprop="title" />'),
        link = jQuery('.content_breadcrumb > div > a');
    link.attr('itemprop','url');
    link.eq(0).attr('rel','index');
    link.not(':first').wrap(child).wrapInner(title);
};

// Submit functions
var submitEmailForm = function(input, value) {
	var email = input.val();
	//console.log(email);
	if (email == value || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
		alert("Please enter a valid email address.");
		//form.find('.emailSignUp').focus();
		input.css( "border", "1px solid red" ).focus();
		return false;
	}
    var m = jQuery('[name="m_alt"]').val();
    var p = jQuery('[name="p"]').val();
    var ea = email;
    //var url = 'http://visitor.constantcontact.com/d.jsp/?ea=' + ea + '&m=' + m + '&p=' + p;
    var url = 'http://visitor.constantcontact.com/d.jsp?ea=' + ea + '&m=' + m + '&p=' + p;
	//console.log(url);
	//return false;
	//document.location.href = (url);
    window.open(url,'_blank');
    //submit.attr('href', url);
};

// init email form events
var initEmailFormEvents = function(){
	
	var emailForm = jQuery('#newsletter > .form'),
		emailInput = emailForm.find('#newsletter-email'),
		emailSubmit = emailForm.find('.button'),
		defaultValue = emailForm.find('input#newsletter-email').val();
		//defaultValue = 'ENTER EMAIL ADDRESS';
		
	//console.log(emailForm.length);
	//console.log(emailSubmit.length);
		
	// Clear text in field when focused
	emailForm.find('#newsletter-email').on('focus blur', function(e){
		if (e.type === 'focus'){
			//alert(e.type);
			if (jQuery(this).val() == defaultValue) {
				jQuery(this).val('');
			}
			jQuery(document.body).delegate('input:text', 'keypress', function(e) {
				if (e.which === 13) {
					e.preventDefault();
					emailInput = jQuery(this);
					submitEmailForm(emailInput, defaultValue);
					//submitEmailForm();
				}
			});
		} else if (e.type === 'blur'){
			//alert(e.type);
			if (jQuery(this).val() === '') {
				jQuery(this).val(defaultValue);
			}
		}
	});	
	emailSubmit.click(function(e) {
		e.preventDefault();
		emailInput = jQuery(this).prev();
		submitEmailForm(emailInput, defaultValue);
	});
	// Form On Focus //
	/*var el = jQuery('input[type=text], textarea');
	el.focus(function(e) {
		if (e.target.value === e.target.defaultValue)
			e.target.value = '';
	});
	el.blur(function(e) {
		if (e.target.value === '')
			e.target.value = e.target.defaultValue;
	});*/
	
};

/***************/
/** BEGIN OF DOC.READY FUNCTION **/
/***************/
jQuery(function(){
    //html.attr('xmlns:og', 'http://opengraphprotocol.org/schema/').addClass('no-js no-svg ' + documentName + ' ' + nodeAlias + ' ' + (nodeAlias == 'search' ? 'header-css3-fix stylish-select' : ''));
	// init Sitemap
	initSiteMap();
    // start breadcrumbs addition for tablet
    tabletBreadCrumbs();	
	// Email Form in Footer
    //alert(jQuery('#newletter > .form').html());
    initEmailFormEvents();
});

