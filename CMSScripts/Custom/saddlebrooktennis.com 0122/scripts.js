jQuery(function() {
    function u() {
        var i = jQuery(".directionsForm .saddr").val(),
            t = jQuery(".directionsForm .daddr").val(),
            n = "https://maps.google.com/maps?saddr=" + i + "&daddr=" + t;
        window.open(n)
    }
    var f,
        r,
        i,
        t,
        n;
    jQuery(".sitemap-toggle").click(function(n) {
        n.preventDefault(), jQuery(".sitemap-float").is(":visible") ? jQuery(".sitemap-float").fadeOut(500) : jQuery(".sitemap-float").fadeIn(500)
    }), f = jQuery("#topNav > ul > li"), r = 300, jQuery(window).width() > 760 && f.hover(function() {
        jQuery(this).children("ul").length > 0 && (jQuery(this).addClass("active"), jQuery(this).children("ul").stop(!0, !1), jQuery(this).children("ul").hide(), jQuery(this).children("ul").slideDown(r))
    }, function() {
        jQuery(this).removeClass("active"), jQuery(this).children("ul:visible").stop(!0, !1), jQuery(this).children("ul:visible").slideUp(r)
    }), i = jQuery("#topNav"), jQuery("#mobileNavBtn").click(function(n) {
        n.preventDefault(), i.is(":visible") ? i.slideUp(600, function() {
            jQuery("#header").removeClass("navOpen")
        }) : (jQuery("#header").addClass("navOpen"), i.slideDown(600))
    }), t = jQuery("#subNav > ul"), jQuery("#subNav .explore").click(function(n) {
        n.preventDefault(), t.is(":visible") ? t.slideUp(600) : t.slideDown(600)
    }), n = jQuery("#footerContactExpand"), jQuery("#footerContactExpandBtn").click(function(t) {
        t.preventDefault(), n.is(":visible") ? n.slideUp(600) : n.slideDown(600)
    }), jQuery(".directionsForm .saddr").focus(function() {
        jQuery(document.body).delegate("input:text", "keypress", function(n) {
            n.which === 13 && (n.preventDefault(), u())
        })
    }), jQuery(".directionsForm .submitSm").click(function() {
        u()
    })
})
