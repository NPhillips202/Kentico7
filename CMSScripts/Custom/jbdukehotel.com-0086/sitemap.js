jQuery(function(){
  jQuery(".site-map a, .sitemap-close").click(function(n){
    n.preventDefault(),
      jQuery(".sitemap-float").is(":visible")?jQuery(".sitemap-float").fadeOut(500):
        jQuery(".sitemap-float").fadeIn(500)
          })
    });

$('.sub-link').click(function(e){
  e.preventDefault();
    var email = $('.email-link').val();
    window.location = '/Footer/Email?email=' + email;
  
});

