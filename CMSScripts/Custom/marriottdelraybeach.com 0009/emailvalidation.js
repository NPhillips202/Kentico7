function LTrim(str)
        {
               var whitespace = new String(" \t\n\r");
               var s = new String(str);
                if (whitespace.indexOf(s.charAt(0)) != -1) {

                    var j=0, i = s.length;
                    while (j < i && whitespace.indexOf(s.charAt(j)) != -1)
                        j++;
                    s = s.substring(j, i);
                }

                return s;
        }
function RTrim(str)
       {
                var whitespace = new String(" \t\n\r");
                var s = new String(str);
                if (whitespace.indexOf(s.charAt(s.length-1)) != -1) {
                    var i = s.length - 1;       
                    while (i >= 0 && whitespace.indexOf(s.charAt(i)) != -1)
                        i--;
                    s = s.substring(0, i+1);
                }

                return s;
        }


function Trim(str)
        {
                return RTrim(LTrim(str));
        }
function ValidateSignupEmail(theForm) {
   if (Trim(theForm.EmailSignup.value) == "")
  {
    alert("Please enter your email address.");
    theForm.EmailSignup.focus();
    return (false);
  }
	var checkStr = theForm.EmailSignup.value;
	var ch = checkStr.indexOf('@');

	if (ch==0 || ch==-1) {
		alert("Please enter a valid email address.");
		theForm.EmailSignup.focus();
		return (false);
	}
	var checkOK = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzƒŠŒšœŸÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõöøùúûüış0123456789@.-+_'!#$%&()*,/";
	var checkStr = theForm.EmailSignup.value;
	var allValid = true;
	for (i = 0;  i < checkStr.length;  i++) {
		ch = checkStr.charAt(i);
		for (j = 0;  j < checkOK.length;  j++)
			if (ch == checkOK.charAt(j))
				break;
				if (j == checkOK.length) {
					allValid = false;
					break;
				}
	}
	if (!allValid) {
		alert("Please enter a valid email address.");
		theForm.EmailSignup.focus();
		return (false);
	}
		return (true);
}