jQuery("input[name='phone'], .year").keypress(function (e) {
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        return false;
    }
});
var form1 = "#tickets-form";
jQuery(form1).validate({
    ignore: [],
    rules: {
        fname: {
            required: true
        },
        lname: {
            required: true,
        },
        email:{
            required: true,
            email:true
        },
        phone:{
            required: true,
        }
    },
    errorClass: 'error',
    validClass: 'valid',
    errorElement: 'div',
    highlight: function (element, errorClass, validClass) {
        jQuery(element).addClass(errorClass).removeClass(validClass);
    },
    unhighlight: function (element, errorClass, validClass) {
        var attribute = jQuery(element).attr("name")
        if(attribute == null){
            attribute =0
        }
        if(attribute.length > 0){
            jQuery(element).removeClass(errorClass).addClass(validClass);    
        }
    },
    messages: {
        
    },
    errorPlacement: function (error, element) {
        //error.insertAfter(element);
    },
    submitHandler: function (form) { // for demo
        //form.submit();
        jQuery(form1 + ' .successmsg').fadeIn();
        setTimeout(function () {
            jQuery(form1 + ' .successmsg').fadeOut();
            jQuery(form1)[0].reset();
            jQuery(form1 + " .valid").each(function () {
                jQuery(this).removeClass("valid")
            })
            /*jQuery("select").each(function () {
                jQuery(this).selectbox("detach");
                jQuery(this)[0].selectedIndex = 0;
                jQuery(this).selectbox();
            })*/
            jQuery('input[type="radio"]').attr('checked', false);
            jQuery(".customRadiobox").removeClass("checked");
        }, 3000)
        return false;
    }
});
jQuery(form1 + " input[type='submit']").click(function () {
  setTimeout(function () {
      jQuery("input.error").eq(0).focus();
  }, 50)
})
jQuery(form1+' .inputbox').on('blur',function(){
       //jQuery(form1).validate().element(this);
})