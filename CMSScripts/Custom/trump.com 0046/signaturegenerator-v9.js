SignatureGenerator = {
	
	locations:[
		{title:'Trump Hotel Collection', address:'725 Fifth Avenue | New York, NY | 10022',
			links:['TrumpHotelCollection.com', 'facebook.com/TrumpHotelCollection', 'twitter.com/TrumpCollection'],
			accolades:[],
			abbr:'THC'},
		{title:'Trump International Hotel & Tower New York', address:'One Central Park West | New York, NY | 10023',
			links:['trumphotelcollection.com/central-park/', 'facebook.com/TrumpNewYork', 'twitter.com/TrumpNewYork'],
			accolades:['The Only Forbes Five-Star & AAA Five-Diamond Hotel with a Five-Star, Five-Diamond & Three Michelin-Star Restaurant in the US','Travel + Leisure World\'s Best Awards 2012 - #1 in New York and #5 in the U.S.'],
			abbr:'NewYork'},
		{title:'Trump SoHo New York', address:'246 Spring Street | New York, NY | 10013',
			links:['trumphotelcollection.com/soho/', 'facebook.com/TrumpSoHoNewYork', 'twitter.com/TrumpSoHo'],
			accolades:['AAA Five-Diamond Award 2014','<a href=\"http://www.cntraveler.com/galleries/2014-10-20/top-10-hotels-in-new-york-city-readers-choice-awards-2014\" target=\"_blank\"><font color="#333">Condé Nast Traveler</font></a> \"Top 10 Hotels in New York City\" 2014'],
			abbr:'SoHo'},
		{title:'Trump International Hotel & Tower Chicago', address:'401 N. Wabash Avenue | Chicago, IL | 60611',
			links:['trumphotelcollection.com/chicago/', 'facebook.com/TrumpChicago', 'twitter.com/TrumpChicago'],
			accolades:['Forbes Five-Star Rating Award 2014','AAA Five-Diamond Award 2014'],
			abbr:'Chicago'},
		{title:'Trump International Hotel & Tower Toronto', address:'325 Bay Street | Toronto, Ontario, Canada | M5H 4G3',
			links:['trumphotelcollection.com/toronto/', 'facebook.com/TrumpToronto', 'twitter.com/TrumpToronto'],
			accolades:['Forbes Five-Star 2015','2015 TripAdvisor Travelers\' Choice Award #1 Luxury Hotel in Canada'],
			abbr:'Toronto'},
		{title:'Trump International Hotel Las Vegas', address:'2000 Fashion Show Drive | Las Vegas, NV | 89109',
			links:['trumphotelcollection.com/las-vegas/', 'facebook.com/TrumpLasVegas', 'twitter.com/TrumpLasVegas'],
			accolades:['U.S News & World Report \"Best Hotels in Las Vegas\" 2014','TripAdvisor \"Certificate of Excellence\" 2014'],
			abbr:'LasVegas'},
		{title:'Trump International Hotel Waikiki Beach Walk', address:'223 Saratoga Road | Honolulu, HI | 96815',
			links:['trumphotelcollection.com/waikiki/', 'facebook.com/Trump.Hotel.Waikiki', 'twitter.com/TrumpWaikiki'],
			accolades:['Forbes Travel Guide Five-Star Rating Award 2015','TripAdvisor Ranking #1 in Honolulu 2011, 2012, 2013, 2014'],
			abbr:'Waikiki'},
		{title:'Trump Ocean Club International Hotel & Tower Panama', address:'Calle Punta Colón | Panama City, Panamá | 0833-00321',
			links:['trumphotelcollection.com/panama/', 'facebook.com/TrumpPanama', 'twitter.com/TrumpPanama'],
			accolades:['Conde\' Nast Traveler "Gold List" 2013','TripAdvisor Winner "Travelers\' Choice" 2013'],
			abbr:'Panama'},
		{title:'Trump National Doral Miami', address:'4400 NW 87th Avenue | Miami, FL | 33178',
			links:['trumphotelcollection.com/miami/', 'facebook.com/TrumpDoral', 'twitter.com/TrumpDoral'],
			accolades:[],
			abbr:'Doral'},
		{title:'Trump National Hotel &amp; Golf Links&trade; Doonbeg, Ireland', address:'Doonbeg, Co.Clare | Ireland',
			links:['trumphotelcollection.com/ireland/'],
			accolades:[],
			abbr:'Doonbeg'},
	 	{title:'Trump International Hotel &amp; Tower Baku', address:'Baku, Azerbaijan',
			links:['trumphotelcollection.com/baku/'],
			accolades:[],
			abbr:'baku'}
	],

	initialize:function(){
		SignatureGenerator.addListeners();
	},

	addListeners:function(){
		//jQuery('input[type="submit"]').on('click', SignatureGenerator.onSubmitHand);
        jQuery('#submitBTN').on('click', SignatureGenerator.onSubmitHand);
	},

	outputHTML:function(){
		var name = jQuery('input[name$="fname"]').val();
		var title = jQuery('input[name$="title"]').val();
		var phone = jQuery('input[name$="phone"]').val();
		var fax = jQuery('input[name$="fax"]').val();
		var mobile = jQuery('input[name$="mobile"]').val();
		var email = jQuery('input[name$="email"]').val();
		var location = SignatureGenerator.locations[Number(jQuery('select').val())];
		//document.write(location.abbr);
		
		var html = '';
		html += '<div><font color="#333333" style="font-family:Arial; font-size:14px"><strong>'+name.toUpperCase()+'</strong></font><br>';
		html += '<font color="#333333" style="font-family:Arial; font-size:12px"><em>'+title+'</em></font><br>';
		html += '<a href="mailto:'+email+'" style="text-decoration:none; color:#333333" style="font-family:Arial; font-size:12px; underline:none;"><font color="#333333" style="font-family:Arial; font-size:12px">'+email+'</font></a><br />';
		//phone numbs
		html += '<font color="#333333" style="font-family:Arial; font-size:12px">p. ';
		if(location.abbr == 'Panama'){
			html += '+';
		}
		html+= phone+'</font>';
		if(fax.length > 0){
			html += '<font color="#333333" style="font-family:Arial; font-size:12px"> | f. ';
			if(location.abbr == 'Panama'){
				html += '+';
			}
			html+= fax+'</font>';
		}
		if(mobile.length > 0){
			html += '<font color="#333333" style="font-family:Arial; font-size:12px"> | m. ';
			if(location.abbr == 'Panama'){
				html += '+';
			}
			html+= mobile+'</font>';
		}
		html += '<font style="font-size:12px;"><br><br></font>'
		html += '<font color="#999999" face="Arial, Helvetica, sans-serif" style="font-size:14px"><strong>'+location.title.toUpperCase()+'</strong></font><br>';
		html += '<font color="#333333" face="Arial, Helvetica, sans-serif" style="font-size:12px">'+location.address+'</font><font style="font-size:12px;"><br></font>';
		for(var i=0; i<location.links.length; i++){
			html += '<font color="#e94b36" style="font-family:Arial; font-size:12px">';
			html += '<a href="http://www.'+location.links[i]+'" style="font-family:Arial; font-size:12px; color: #333333; text-decoration: none;" target="_blank">';
			html += location.links[i]+'</a></font>';
			if(i != location.links.length-1){
				html += ' | ';
			}
		}
		html += '<font style="font-size:12px;"><br><br></font>'
		for(var i=0; i<location.accolades.length; i++){
			html += '<font face="Arial, Helvetica, sans-serif" size="1" color="#333"><em>'+location.accolades[i]+'</em></a></font><br />';
			if(i === location.accolades.length-1){
				html += '<br />';
			}
		}
		html += '<font color="#333" style="font-family:Arial; font-size:12px">NEW YORK: <a href="http://www.trumphotelcollection.com/central-park/" style="font:12px Arial, Helvetica, sans-serif; text-decoration:none;color:#333;">CENTRAL PARK</a> + ';
		html += '<a href="http://www.trumphotelcollection.com/soho/" style="font:12px Arial, Helvetica, sans-serif; text-decoration:none;color:#333;">SOHO</a>&nbsp;&nbsp;';
		html += '<a href="http://www.trumphotelcollection.com/chicago/" style="font:12px Arial, Helvetica, sans-serif; text-decoration:none;color:#333;">CHICAGO</a>&nbsp;&nbsp;';
		html += '<a href="http://www.trumphotelcollection.com/las-vegas/" style="font:12px Arial, Helvetica, sans-serif; text-decoration:none;color:#333;">LAS VEGAS</a>&nbsp;&nbsp;';
		html += '<a href="http://www.trumphotelcollection.com/waikiki/" style="font:12px Arial, Helvetica, sans-serif; text-decoration:none;color:#333;">WAIKIKI</a>&nbsp;&nbsp;';
		html += '<a href="http://www.trumphotelcollection.com/panama/" style="font:12px Arial, Helvetica, sans-serif; text-decoration:none;color:#333;">PANAMA</a>&nbsp;&nbsp;';
		html += '<a href="http://www.trumphotelcollection.com/toronto/" style="font:12px Arial, Helvetica, sans-serif; text-decoration:none;color:#333;">TORONTO</a>&nbsp;&nbsp;';
		html += '<a href="http://www.trumphotelcollection.com/miami/" style="font:12px Arial, Helvetica, sans-serif; text-decoration:none;color:#333;">MIAMI | DORAL</a>&nbsp;&nbsp;';
		html += '<a href="http://www.trumphotelcollection.com/ireland/" style="font:12px Arial, Helvetica, sans-serif; text-decoration:none;color:#333;">IRELAND | DOONBEG</a><br><em>Coming Soon</em> ';
		html += '<a href="http://www.trumphotelcollection.com/vancouver/" style="font:12px Arial, Helvetica, sans-serif; text-decoration:none;color:#333;">VANCOUVER</a>&nbsp;&nbsp;';
		html += '<a href="http://www.trumphotelcollection.com/washington-dc/" style="font:12px Arial, Helvetica, sans-serif; text-decoration:none;color:#333;">WASHINGTON D.C.</a></font>&nbsp;&nbsp;';
		html += '<a href="http://www.trumphotelcollection.com/rio-de-janeiro/" style="font:12px Arial, Helvetica, sans-serif; text-decoration:none;color:#333;">RIO DE JANEIRO</a></font>&nbsp;&nbsp;';
		html += '<a href="http://www.trumphotelcollection.com/bali/" style="font:12px Arial, Helvetica, sans-serif; text-decoration:none;color:#333;">BALI</a></font>&nbsp;&nbsp;';
		html += '<a href="http://www.trumphotelcollection.com/lido/" style="font:12px Arial, Helvetica, sans-serif; text-decoration:none;color:#333;">LIDO</a></font> <br></div>';
		
		if (location.title == "Trump National Doral Miami") {
			html += '<br><a href="https://www.trumphotelcollection.com/miami/doral-miami-resorts.php" target="_blank"><img src="http://www.trump.com/getmedia/5007140d-6e57-4cc1-9b6a-a0520acb8c20/TND_EmailBanner_ANIMATED2-v3/" border="0" /></a><br>'
		};
		
		jQuery('#output').css("display", "block");
		jQuery('#output .textarea').html(html);
		//jQuery('.htmlArea').val(html);
	},

	validateForm:function(){
		var error = '<p>';
		var errorTrigger = false;

		if(!contentTest(jQuery('input[name$="fname"]').val())){
			errorTrigger = true;
			error += "Please input a name<br />";
		}

		if(!contentTest(jQuery('input[name$="title"]').val())){
			errorTrigger = true;
			error += "Please input a job title<br />";
		}

		if(!phoneNumberTest(jQuery('input[name$="phone"]').val())){
			errorTrigger = true;
			error += "Please input a valid phone number i.e. (555.555.5555)<br />";
		}

		if(jQuery('input[name$="fax"]').val().length > 0 && !phoneNumberTest(jQuery('input[name$="fax"]').val())){
			errorTrigger = true;
			error += "Please input a fax number i.e. (555.555.5555)<br />";
		}

		if(jQuery('input[name$="mobile"]').val().length > 0 && !phoneNumberTest(jQuery('input[name$="mobile"]').val())){
			errorTrigger = true;
			error += "Please input a mobile phone number i.e. (555.555.5555)<br />";
		}

		if(!emailTest(jQuery('input[name$="email"]').val())){
			errorTrigger = true;
			error += "Please input a valid email<br />";
		}

		error += '</p>'

		jQuery('#error').css("display", "none");
		if(!errorTrigger){
			SignatureGenerator.outputHTML();
		}else{
			jQuery('#error').css("display", "block");
			jQuery('#error').html(error);
		}
	},

	onSubmitHand:function(){
		SignatureGenerator.validateForm();
	}


}

jQuery(document).ready(SignatureGenerator.initialize);

function htmlEncode(value){
  return jQuery('<div/>').text(value).html();
}

function htmlDecode(value){
  return jQuery('<div/>').html(value).text();
}

function contentTest(value){
    return (/\S/.test(value));
}

function phoneNumberTest(value){
	return (/^\(?(\d{3})\)?[. ](\d{3,4})[. ](\d{4})$/.test(value));
}

function emailTest(value){
	return (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value));
}