function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

jQuery(function() {
	var ReturnUrl = getParameterByName('blReturnUrl');
	
	if (ReturnUrl.length > 0) {
		ReturnUrl = encodeURIComponent(ReturnUrl);
		var BuildingLinkUrl = "https://vanguardchelsea.buildinglink.com/v2/global/login/loginwidget.aspx?ReturnUrl=" + ReturnUrl;
		var iFrame = "<iframe id='buildinglink-login-iframe' width='100%' height='375' frameborder='0' src='" + BuildingLinkUrl + "'></iframe>";
		jQuery('#buildingLinkIframe').html(iFrame);
	} else {
		var BuildingLinkUrl = "https://vanguardchelsea.buildinglink.com/v2/global/login/loginwidget.aspx";
		var iFrame = "<iframe id='buildinglink-login-iframe' width='100%' height='375' frameborder='0' src='" + BuildingLinkUrl + "'></iframe>";
		jQuery('#buildingLinkIframe').html(iFrame);
	};
});