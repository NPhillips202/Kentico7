
jQuery(document).ready(function() {
    jQuery(".MainGallery.acco ul li:last-child").empty();
    jQuery(".menuElem").removeClass("ON");
    jQuery(".HighLighted a").addClass("ON");
  
 jQuery('.gallery-main').append("<h2 class='acco'>Accommodations</h2><div class='MainGallery acco'><ul>");  
 jQuery('.gallery-main').append("</ul></div>");
  
jQuery('.gallery-main').append("<h2 class='Dining'>Dining</h2><div class='MainGallery Dining'><ul>");  
 jQuery('.gallery-main').append("</ul></div>"); 
  
  jQuery('.gallery-main').append("<h2 class='Spa'>Spa</h2><div class='MainGallery Spa'><ul>");  
 jQuery('.gallery-main').append("</ul></div>");
  
  jQuery('.gallery-main').append("<h2 class='Golf'>Golf</h2><div class='MainGallery Golf'><ul>");  
 jQuery('.gallery-main').append("</ul></div>");
  
  jQuery('.gallery-main').append("<h2 class='Play'>Play</h2><div class='MainGallery Play'><ul>");  
 jQuery('.gallery-main').append("</ul></div>");
  
  jQuery('.gallery-main').append("<h2 class='Meetings'>Meetings</h2><div class='MainGallery Meetings'><ul>");  
 jQuery('.gallery-main').append("</ul></div>");
  
  jQuery('.gallery-main').append("<h2 class='Weddings'>Weddings</h2><div class='MainGallery Weddings'><ul>");  
 jQuery('.gallery-main').append("</ul></div>");
       var arr;
        jQuery( ".gallery-main li" ).each(function( index ) {
          arr=jQuery(this).attr('id').split('/');
            if(arr[0]=='Accommodations')
            {
              jQuery(".acco ul").append('<li>'+jQuery(this).html()+'</li>');
              
            }
            else if(arr[0]=='Dining')
            {
              jQuery(".Dining ul").append('<li>'+jQuery(this).html()+'</li>');
              
            }
            else if(arr[0]=='Spa')
            {
              jQuery(".Spa ul").append('<li>'+jQuery(this).html()+'</li>');
               
            }
            else if(arr[0]=='Golf')
            {
              jQuery(".Golf ul").append('<li>'+jQuery(this).html()+'</li>');
             
            }
            else if(arr[0]=='Play')
            {
              jQuery(".Play ul").append('<li>'+jQuery(this).html()+'</li>');
              
            }
            else if(arr[0]=='Meetings')
            {
              jQuery(".Meetings ul").append('<li>'+jQuery(this).html()+'</li>');
              
            }
            else if(arr[0]=='Weddings')
            {
              jQuery(".Weddings ul").append('<li>'+jQuery(this).html()+'</li>');
             
            }
          
            
        });
        jQuery('.all-li').remove();
        
        if (jQuery( ".gallery-main .acco ul li").length<=0)
        { 
          jQuery('.acco').css("display", "none");
        }
        if (jQuery( ".gallery-main .Dining ul li").length<=0)
        { 
          jQuery('.Dining').css("display", "none");
        }
        if (jQuery( ".gallery-main .Spa ul li").length<=0)
        { 
          jQuery('.Spa').css("display", "none");
        }
        if (jQuery( ".gallery-main .Golf ul li").length<=0)
        { 
          jQuery('.Golf').css("display", "none");
        }
        if (jQuery( ".gallery-main .Play ul li").length<=0)
        { 
          jQuery('.Play').css("display", "none");
        }
        if (jQuery( ".gallery-main .Meetings ul li").length<=0)
        { 
          jQuery('.Meetings').css("display", "none");
        }
        if (jQuery( ".gallery-main .Weddings ul li").length<=0)
        { 
          jQuery('.Weddings').css("display", "none");
        }              
     var pathname = window.location.pathname;
       if(pathname=="/meetings/meeting-rfp/" || pathname=="/portsmouth-wedding-rfp/")
         {
           jQuery("div.proppage").addClass('ref');
         }
         
     /*
	 jQuery("ul li a").filter(function() {
        if(jQuery(this).text() == "Meeting Offers"){ 
        
            jQuery(this).attr("href", "/portsmouth-meeting-offers/");
          }
     }).length;
  
  jQuery("ul li a").filter(function() {
        if(jQuery(this).text() == "Wedding Offers"){ 
         
            jQuery(this).attr("href", "/portsmouth-wedding-offers/");
          }
     }).length;
  
  jQuery("ul li a").filter(function() {
        if(jQuery(this).text() == "Spa Offers"){ 
        
            jQuery(this).attr("href", "/portsmouth-spa-offers/");
          }
     }).length;
  
  jQuery("ul li a").filter(function() {
        if(jQuery(this).text() == "Dining Offers"){ 
         
            jQuery(this).attr("href", "/portsmouth-dining-offers/");
          }
     }).length;
  
   jQuery("ul li a").filter(function() {
        if(jQuery(this).text() == "Offers"){ 
         
            jQuery(this).attr("href", "/portsmouth-hotel-offers/");
          }
     }).length;
   jQuery("ul li a").filter(function() {
        if(jQuery(this).text() == "Events"){ 
         
            jQuery(this).attr("href", "/portsmouth-events-calendar/");
          }
     }).length;
  jQuery("ul li a").filter(function() {
        if(jQuery(this).text() == "Connect"){ 
         
            jQuery(this).attr("href", "/connect-with-us/");
          }
     }).length;*/
  
  
    jQuery("input[id*='_btnOK']").click(function(e)
      {
    
        
        var emailFilter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if(emailFilter.test(jQuery("input[id*='_eMailAddress_textbox']").val()) !=true)
          {
            e.preventDefault();
            alert('Please enter a valid email address.');
           jQuery("label[for*='_eMailAddress_textbox']").css('color','red');
            return;
          }
           else
          {
               jQuery("label[for*='_eMailAddress_textbox']").css('color','#666');
          }
        
        if(
           jQuery.trim(jQuery("input[id*='_eMailAddress_textbox']").val())=='' 
           || jQuery.trim(jQuery("input[id*='_FirstName_textbox']").val())=='' 
           || jQuery.trim(jQuery("input[id*='_LastName_textbox']").val())==''
           || $("select[id*='_State_dropDownList'] option:selected").text()=='Select One'
           || $("select[id*='_State_Province_dropDownList'] option:selected").text()=='Select One'
          )
        {
          
           e.preventDefault();
          
           if( jQuery.trim(jQuery("input[id*='_eMailAddress_textbox']").val())=='' )
             {
               jQuery("label[for*='_eMailAddress_textbox']").css('color','red');
             }
           else
             {
               jQuery("label[for*='_eMailAddress_textbox']").css('color','#666');
             }
          if( jQuery.trim(jQuery("input[id*='_FirstName_textbox']").val())=='' )
             {
               jQuery("label[for*='_FirstName_textbox']").css('color','red');
             }
             else{
               jQuery("label[for*='_FirstName_textbox']").css('color','#666');
             }
          if( jQuery.trim(jQuery("input[id*='_LastName_textbox']").val())=='' )
             {
               jQuery("label[for*='_LastName_textbox']").css('color','red');
             }
             else{
               jQuery("label[for*='_LastName_textbox']").css('color','#666');
             }

          if( jQuery.trim(jQuery("select[id*='_State_dropDownList'] option:selected").text())=='Select One' )
             {
               jQuery("label[for*='_State_dropDownList']").css('color','red');
             }
             else{
               jQuery("label[for*='_State_dropDownList']").css('color','#666');
             }
          if( jQuery.trim(jQuery("select[id*='_State_Province_dropDownList'] option:selected").text())=='Select One' )
             {
               jQuery("label[for*='_State_Province_dropDownList']").css('color','red');
             }
             else{
               jQuery("label[for*='_State_Province_dropDownList']").css('color','#666');
             }
          
          
          
          
           alert('Please fill in the required field in red.');
          return;
          }
          
          if( typeof jQuery("input[id*='_PostalCode_textbox']").val()!='undefined')
          {
            if(jQuery.trim(jQuery("input[id*='_PostalCode_textbox']").val())=='' )
              {
                e.preventDefault();
                alert('Please fill in the required field in red.');
                jQuery("label[for*='_PostalCode_textbox']").css('color','red');
                return;
             }
             else{
                var filter1 =/^[0-9-+]+$/;
                if (filter1.test(jQuery("input[id*='_PostalCode_textbox']").val())!=true) {
                    e.preventDefault();
                    jQuery("label[for*='_PostalCode_textbox']").css('color','red');
                    alert('Please only enter number in postal code.');
                    return;
                }else
                  {
                    jQuery("label[for*='_PostalCode_textbox']").css('color','#666');}
                       
               
             }
          }
           
        if( typeof jQuery("input[id*='_Phone_textbox']").val() !="undefined")
          {
            if(jQuery.trim(jQuery("input[id*='_Phone_textbox']").val()) !="")
            {
              var filter = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
              if (filter.test(jQuery("input[id*='_Phone_textbox']").val())!=true) {
                  e.preventDefault();
                  jQuery("label[for*='_Phone_textbox']").css('color','red');
                  alert('Please enter phone number in correct formate: either (XXX) xxx-xxxx OR xxx-xxx-xxxx.');
                  return;
              }
              else
                {
                  jQuery("label[for*='_Phone_textbox']").css('color','#666');}
            }
         }
         if(typeof jQuery("input[id*='_SecretCode_txtSecurityCode']").val() !='undefined')
           {
             if( jQuery.trim(jQuery("input[id*='_SecretCode_txtSecurityCode']").val())=='' )
             {
               e.preventDefault();
                
               jQuery("label[for*='_SecretCode_txtSecurityCode']").css('color','red');
               alert('Please fill in the required field in red.');
             }
             else{
               jQuery("label[for*='_SecretCode_txtSecurityCode']").css('color','#666');
             }
           }
        
      });
      jQuery(".collection ul li a").filter(function() {
        var urlPath=window.location.pathname;
        if(jQuery(this).attr('href') == urlPath)
        {
          jQuery(this).addClass("ON");
        }
     });
     
       jQuery('.bxslider').bxSlider({
        onSlideAfter: function(){
          // do mind-blowing JS stuff here
          alert('A slide has finished transitioning. Bravo. Click OK to continue!');
       }
       });
  
    });
  
