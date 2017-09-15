// Easy Responsive Tabs Plugin
// Author: Samson.Onna <Email : samson3d@gmail.com>
(function (jQuery) {
    jQuery.fn.extend({
        easyResponsiveTabs: function (options) {
            //Set the default values, use comma to separate the settings, example:
            var defaults = {
                type: 'default', //default, vertical, accordion;
                width: 'auto',
                fit: true
            }
            //Variables
            var options = jQuery.extend(defaults, options);            
            var opt = options, jtype = opt.type, jfit = opt.fit, jwidth = opt.width, vtabs = 'vertical', accord = 'accordion';

            //Main function
            this.each(function () {
                var jQueryrespTabs = jQuery(this);
                jQueryrespTabs.find('ul.resp-tabs-list li').addClass('resp-tab-item');
                jQueryrespTabs.css({
                    'display': 'block',
                    'width': jwidth
                });

                jQueryrespTabs.find('.resp-tabs-container > div').addClass('resp-tab-content');
                jtab_options();
                //Properties Function
                function jtab_options() {
                    if (jtype == vtabs) {
                        jQueryrespTabs.addClass('resp-vtabs');
                    }
                    if (jfit == true) {
                        jQueryrespTabs.css({ width: '100%', margin: '0px' });
                    }
                    if (jtype == accord) {
                        jQueryrespTabs.addClass('resp-easy-accordion');
                        jQueryrespTabs.find('.resp-tabs-list').css('display', 'none');
                    }
                }

                //Assigning the h2 markup to accordion title
                var jQuerytabItemh2;
                jQueryrespTabs.find('.resp-tab-content').before("<h2 class='resp-accordion' role='tab'><span class='resp-arrow'></span></h2>");

                var itemCount = 0;
                jQueryrespTabs.find('.resp-accordion').each(function () {
                    jQuerytabItemh2 = jQuery(this);
                    var innertext = jQueryrespTabs.find('.resp-tab-item:eq(' + itemCount + ')').html();
                    jQueryrespTabs.find('.resp-accordion:eq(' + itemCount + ')').append(innertext);
                    jQuerytabItemh2.attr('aria-controls', 'tab_item-' + (itemCount));
                    itemCount++;
                });

                //Assigning the 'aria-controls' to Tab items
                var count = 0,
                    jQuerytabContent;
                jQueryrespTabs.find('.resp-tab-item').each(function () {
                    jQuerytabItem = jQuery(this);
                    jQuerytabItem.attr('aria-controls', 'tab_item-' + (count));
                    jQuerytabItem.attr('role', 'tab');

                    //First active tab                   
                    jQueryrespTabs.find('.resp-tab-item').first().addClass('resp-tab-active');
                    jQueryrespTabs.find('.resp-accordion').first().addClass('resp-tab-active');
                    jQueryrespTabs.find('.resp-tab-content').first().addClass('resp-tab-content-active').attr('style', 'display:block');

                    //Assigning the 'aria-labelledby' attr to tab-content
                    var tabcount = 0;
                    jQueryrespTabs.find('.resp-tab-content').each(function () {
                        jQuerytabContent = jQuery(this);
                        jQuerytabContent.attr('aria-labelledby', 'tab_item-' + (tabcount));
                        tabcount++;
                    });
                    count++;
                });

                //Tab Click action function
                jQueryrespTabs.find("[role=tab]").each(function () {
                    var jQuerycurrentTab = jQuery(this);
                    jQuerycurrentTab.click(function () {

                        var jQuerytabAria = jQuerycurrentTab.attr('aria-controls');

                        if (jQuerycurrentTab.hasClass('resp-accordion') && jQuerycurrentTab.hasClass('resp-tab-active')) {
                            jQueryrespTabs.find('.resp-tab-content-active').slideUp('', function () { jQuery(this).addClass('resp-accordion-closed'); });
                            jQuerycurrentTab.removeClass('resp-tab-active');
                            return false;
                        }
                        if (!jQuerycurrentTab.hasClass('resp-tab-active') && jQuerycurrentTab.hasClass('resp-accordion')) {
                            jQueryrespTabs.find('.resp-tab-active').removeClass('resp-tab-active');
                            jQueryrespTabs.find('.resp-tab-content-active').slideUp().removeClass('resp-tab-content-active resp-accordion-closed');
                            jQueryrespTabs.find("[aria-controls=" + jQuerytabAria + "]").addClass('resp-tab-active');

                            jQueryrespTabs.find('.resp-tab-content[aria-labelledby = ' + jQuerytabAria + ']').slideDown().addClass('resp-tab-content-active');
                        } else {
                            jQueryrespTabs.find('.resp-tab-active').removeClass('resp-tab-active');
                            jQueryrespTabs.find('.resp-tab-content-active').removeAttr('style').removeClass('resp-tab-content-active').removeClass('resp-accordion-closed');
                            jQueryrespTabs.find("[aria-controls=" + jQuerytabAria + "]").addClass('resp-tab-active');
                            jQueryrespTabs.find('.resp-tab-content[aria-labelledby = ' + jQuerytabAria + ']').addClass('resp-tab-content-active').attr('style', 'display:block');
                        }
                    });
                    //Window resize function                   
                    jQuery(window).resize(function () {
                        jQueryrespTabs.find('.resp-accordion-closed').removeAttr('style');
                    });
                });
            });
        }
    });
})(jQuery);

