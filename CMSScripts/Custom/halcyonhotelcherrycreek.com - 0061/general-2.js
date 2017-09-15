//first get the value for the header, banner and set the offser value
var banner_height = 618,//jQuery(".banner").height(),
    header_height = jQuery("header").height(),
    offset_val = banner_height - header_height;

//console.log("The banner height" + banner_height + "The header height" + header_height + "offset val" + offset_val);
 //call function to  manipulate the booking mask
 function bookingMaskToggle(){
   //get the current scroll  value for the window
   var scrollval = jQuery(window).scrollTop();
  // console.log("The scrolltop is" + scrollval);
  
       );
   //determine when to show and  hide the  reservation bar 2
   if(scrollval >= offset_val){
  /*jQuery(".reserv_now_area").css({"position":"fixed",
                                    "top":"97px",
                                     "bottom":"auto",
                                     "left": "auto",
                                      "z-index":99999,
                                       "width": "97%"
                                     }
                                    );*/
     jQuery(".reserv_now_area").addClass("reserv_now_area_sticky");
     //console.log("greater");
 
       }else{
        // console.log("change to less");
        jQuery(".reserv_now_area").removeClass("reserv_now_area_sticky");
         /* jQuery(".reserv_now_area").css({"position":"absolute",
                                    "top":"auto",
                                    "bottom": "0px",
                                    "left": "0px",
                                    "z-index":150
                                     }
                                    );*/
       }
       
   }
       
       //when scrol call the function
   jQuery(window).scroll(bookingMaskToggle);



/*open booking when reservation click */
jQuery("#reservationBook").click(function(){
 //alert("you click me");
  jQuery(".reserv_now_area").css("display","inline-block");
   jQuery(".closebtn").css("display","inline-block");
  });


function closeNav(){
  //alert("test close btn");
  jQuery(".reserv_now_area").css("display","none");
  jQuery(".closebtn").css("display","none");
  }



                                 