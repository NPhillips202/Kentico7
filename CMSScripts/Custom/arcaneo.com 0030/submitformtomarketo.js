Munchkin.init('266-IRM-445');

jQuery(function () {
  
  jQuery('.contactForm input[type=submit]').on('click', function (e) {
    
    e.preventDefault();
    
    
    
    var munchkinid = '266-IRM-445',
        formid = '1009',
        firstName = 'Dylan',
        lastName = 'Whitley',
        email = 'dwhitley@cendyn.com';
        
    var myData = {
          "data": {
            "munchkinid": munchkinid,
            "formid": formid,
            "FirstName": firstName,
            "LastName": lastName,
            "Email": email
          }
        };
    
    jQuery.ajax({
      type: 'post',
      contentType: "application/x-www-form-urlencoded",
      url: 'https://app-sjp.marketo.com/index.php/leadCapture/save',
      data: myData,
      success: function () {
        console.log('SUCCESS');
        return true;
        
      },
      error: function() {
        console.log('FAILED');
        return false;
      }
    });
  });
});