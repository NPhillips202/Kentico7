/* Function below will use sessionstorage to  set a variable and allow navigation to remain open throughout site....11/20/16
sdaley*/
//check to make sure browser support
function checkBrowser() {
    if (typeof(Storage) !== "undefined") {
        //alert("Browser Supported");
        console.log("Browser Supported");
        loadingPage();
      
    } else {
        //alert(" Browser dont support sorry");
    }
}

checkBrowser();


//check viewport size
var vh = window.matchMedia("(min-width:990px)");
if (vh.matches) {
    //check if sessionStorage exist
    //checkSessionStatus(); 
    //loadingPage();
} else {
    console.log("screen size not required");
}

//Function to add class upon loading of page
         //remove the class
function loadingPage() {
    jQuery(function() {
            
            console.log(sessionStorage.getItem("anything"));
            if (sessionStorage.getItem("anything") === null) {
                console.log(sessionStorage.getItem("anything"));
            console.log("Session Empty");
            sessionStorage.setItem("anything", 1);
            console.log("Session is created");
           }
           else {
            console.log(sessionStorage.getItem("anything"));
                    console.log("Adding class now");
                    jQuery(".main-menu").addClass("active");
                    jQuery(".header-right").css({
                        "display": "block",
                        "overflow": "hidden"
                    });
                }

            });

    }
      
      

      