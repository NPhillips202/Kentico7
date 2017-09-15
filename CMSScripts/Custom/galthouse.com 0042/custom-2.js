//email sign up
jQuery(function() {
  var emailForm = jQuery('.emailSignRow .email-signup'),
      emailFormInput = emailForm.find('.emailaddress'),
      defaultValue = "";
  // Submit functions
  function submitEmailForm(val) {
      var email = val;
      if (email == defaultValue || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
          alert("Please enter a valid email address.");
          return false;
      };
      document.location.href = ('/email-sign-up/?em=' + email);
  };
  emailFormInput.on('focus', function() {
    jQuery(document.body).delegate('input:text', 'keypress', function(e) {
        if (e.which === 13) {
            e.preventDefault();
            var val = jQuery(this).val();
            submitEmailForm(val);
        };
    });
  });
  emailForm.find('.button').on('click', function(e) {
      e.preventDefault();
      var val = jQuery(this).parent().find('.emailaddress').val();
      submitEmailForm(val);
  });
  jQuery(".clicker a").attr("onclick", "");
  window.counter=1;
  console.log(counter);
  jQuery(".clicker").on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    //if(counter==undefined)
    // do your worst, i.e. slide down
    console.log(counter);
    if(counter === 2) {
      jQuery(".reservation").slideDown("slow");
      counter = 1;
      console.log(counter);
    }
    else {
      jQuery(".reservation").slideUp("slow");
      counter = 2;
    }
  });
  if(location.href=="https://www.galthouse.com/meetings-groups/meeting-packages/"){
    jQuery(".reservation").hide();
    counter = 2;
  }
  jQuery("#meeting-packagesWrap").on('click', function(e) {
      // slide up
      jQuery(".reservation").slideUp("slow");
      counter = 2;
  });
  
  jQuery(".homepage-slider").on('click', function(e) {
      // slide up
      jQuery(".reservation").slideUp("slow");
      counter = 2;
  });
  jQuery(".sub-wrapper").on('click', function(e) {
      // slide up
      jQuery(".reservation").slideUp("slow");
      counter = 2;
  });
  jQuery(".contentFooter").on('click', function(e) {
      // slide up
      jQuery(".reservation").slideUp("slow");
      counter = 2;
  });
});
