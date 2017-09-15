jQuery(function() {
    // Function to get element with largest width
    function getMaxWidth(element) {
        var maxWidth = Math.max.apply(null, element.map(function () {
            return jQuery(this).outerWidth(false);
        }).get());
        //console.log(maxWidth);
        return maxWidth;
    };
    // Divide ads into columns and set even spacing
    if (jQuery('#triple').hasClass('3col') {
        jQuery('.ads li:nth-child(3n+1)').addClass('clear');
        jQuery('.ads li:nth-child(3n)').width(getMaxWidth(jQuery('.ads li:nth-child(3n)'));
        jQuery('.ads li:nth-child(3n+1)').width(getMaxWidth(jQuery('.ads li:nth-child(3n+1)'));
        jQuery('.ads li:nth-child(3n+2)').width(getMaxWidth(jQuery('.ads li:nth-child(3n+2)'));
    } else {
        jQuery('.ads li:even').addClass('clear');
        jQuery('.ads li:even').width(getMaxWidth(jQuery('.ads li:even'));
        jQuery('.ads li:odd').width(getMaxWidth(jQuery('.ads li:odd'));
    }
  
	var wrapper = jQuery('#main.ads');
	// Only display this if it's a banner ad page
	if (wrapper.length > 0) {
		// Render first banner ad when page loads
		var firstImage = wrapper.find('a').first().attr('url');
		jQuery('.imageHolder').html('<img src="' + firstImage + '" />');
		// Add active class
		wrapper.find('a').first().addClass('active');
	};
	
	// Switch the banner ad when a link is clicked on
    //bannerAds(jQuery(this));
    // apply click event
	wrapper.find('a').each(function(){
        bannerAds(jQuery(this));
        jQuery(this).click(function(e) {
            e.preventDefault();
            // Remove all active classes and then add to clicked button
            wrapper.find('a').removeClass('active');
            jQuery(this).addClass('active');
            bannerAds(jQuery(this));
        });
    });
    //list-style
    if (jQuery('#main #triple li').length == 1){
      jQuery('ol#triple').addClass('singleCol');
    }
  
    // Remove button wrapper if no buttons
    if (!jQuery('#navigation').find('li').length > 0) {
        jQuery('#navigation').remove();
    }
    
    // Send mobile site to email
    var emailForm = jQuery('.email');
    var defaultValue = "Enter email address";
    // Clear text in field when focused
    emailForm.find('#enterEmail').focus(function() {
        if (jQuery(this).val() == defaultValue) {
            jQuery(this).val('');
        }
    });
    emailForm.find('#enterEmail').blur(function() {
        if (jQuery(this).val() == '') {
            jQuery(this).val(defaultValue);
        }
    });
    // 
    function bannerAds(link) {  
		// Replace image
		var url = link.attr('url'),
            width = link.attr('width'),
            height = link.attr('height'),
            html;
        if (url.indexOf('.swf') > 0) {
            var html = '<object type="application/x-shockwave-flash" width="' + width + '" height="' + height + '" data="' + url + '">'
                html += '<param name="classid" value="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" />'
                html += '<param name="codebase" value="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" />'
                html += '<param name="movie" value="' + url + '" />'
                html += '<param name="quality" value="best" />'
                html += '<param name="scale" value="default" />'
                html += '<param name="allowFullScreen" value="False" />'
                html += '<param name="play" value="True" />'
                html += '<param name="loop" value="True" />'
                html += '<param name="pluginurl" value="http://www.adobe.com/go/getflashplayer" />'
                html += '<param name="wmode" value="transparent" />'
                html += '</object>'
        } else if (url.indexOf('.html') > 0) {
            var html = '<iframe src="' + url + '" width="' + width + '" height="' + height + '" target="internal" '
                html += 'wmode="opaque" scrolling="no" marginwidth="0" marginheight="0" frameborder="0" vspace="0" hspace="0">'
                html += '</iframe>'
        } else {
                html = '<img src="' + url + '" />'
        }
        
        if(link.hasClass('active')) {
            jQuery('.imageHolder').fadeOut(300, function() {
                jQuery('.imageHolder').html(html);
                jQuery('.imageHolder').fadeIn(300);
            });
        } else { 
            jQuery('.imageHolder').html(html);       
        }
    };
    // Submit functions
    function submitEmailForm() {
        var email = emailForm.find('#enterEmail').val();
        if (email == defaultValue || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
            alert("Please enter a valid email address.");
            return false;
        }
        var campaign = jQuery('#property-title h1').text();
        var url = jQuery('a.mobile').attr('href');
        document.location.href = ('mailto:' + email + '?subject=' + campaign + '&body=View this link on your mobile device - ' + url);
    };
    emailForm.find('#enterEmail').focus(function() {
        jQuery(document.body).delegate('input:text', 'keypress', function(e) {
            if (e.which === 13) {
                e.preventDefault();
                submitEmailForm();
            }
        });
    });
    emailForm.find('.submit').click(function(e) {
        e.preventDefault();
        submitEmailForm();
    });
});