// Minified version of isMobile included in the HTML since it's small
!function (a) { var b = /iPhone/i, c = /iPod/i, d = /iPad/i, e = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, f = /Android/i, g = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i, h = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i, i = /IEMobile/i, j = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, k = /BlackBerry/i, l = /BB10/i, m = /Opera Mini/i, n = /(CriOS|Chrome)(?=.*\bMobile\b)/i, o = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, p = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)", "i"), q = function (a, b) { return a.test(b) }, r = function (a) { var r = a || navigator.userAgent, s = r.split("[FBAN"); return "undefined" != typeof s[1] && (r = s[0]), s = r.split("Twitter"), "undefined" != typeof s[1] && (r = s[0]), this.apple = { phone: q(b, r), ipod: q(c, r), tablet: !q(b, r) && q(d, r), device: q(b, r) || q(c, r) || q(d, r) }, this.amazon = { phone: q(g, r), tablet: !q(g, r) && q(h, r), device: q(g, r) || q(h, r) }, this.android = { phone: q(g, r) || q(e, r), tablet: !q(g, r) && !q(e, r) && (q(h, r) || q(f, r)), device: q(g, r) || q(h, r) || q(e, r) || q(f, r) }, this.windows = { phone: q(i, r), tablet: q(j, r), device: q(i, r) || q(j, r) }, this.other = { blackberry: q(k, r), blackberry10: q(l, r), opera: q(m, r), firefox: q(o, r), chrome: q(n, r), device: q(k, r) || q(l, r) || q(m, r) || q(o, r) || q(n, r) }, this.seven_inch = q(p, r), this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch, this.phone = this.apple.phone || this.android.phone || this.windows.phone, this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet, "undefined" == typeof window ? this : void 0 }, s = function () { var a = new r; return a.Class = r, a }; "undefined" != typeof module && module.exports && "undefined" == typeof window ? module.exports = r : "undefined" != typeof module && module.exports && "undefined" != typeof window ? module.exports = s() : "function" == typeof define && define.amd ? define("isMobile", [], a.isMobile = s()) : a.isMobile = s() } (this);


var data_ajax, jt;
(function (window, $, mapster) {
  function initMap() {
    var $mapster = $('#map-canvas').mapster(mapster.MAP_OPTIONS);
    //var geocoder = new google.maps.Geocoder();
    /*$mapster.mapster('addMarker', {
      lat: 37.791350,
      lng: -122.435883,
      id: 1,
      events: [{
        name: 'click',
        callback: function (e, marker) {
          console.log('Im clicked');
          console.log(this);
          console.log(e);
          console.log(marker);
          console.log('Im clicked');
          //alert('Im clicked');
        }
      },
        {
          name: 'dragend',
          callback: function (e, marker) {
            console.log('Im dragend');
            console.log(this)
            //alert('Im dragend');
          }
        }]
    });
    $mapster.mapster('addMarker', {
      lat: 37.791500,
      lng: -122.435883,
      id: 2
    });

    $mapster.mapster('removeMarkers', function (marker) {
      return marker.id === 2;
    });*/


    // COMMENTING OUT CALL TO JSON 
    /*$.ajax({
      type: 'GET',
      url: 'https://jsonplaceholder.typicode.com/posts/1', 
      //data: { get_param: 'value' }, 
      dataType: 'json',
      success: function (data) { */
        //console.log(data);
        //data_ajax = data;
        //var j ='[{"id":"1","name":"test1"},{"id":"2","name":"test2"},{"id":"3","name":"test3"},{"id":"4","name":"test4"},{"id":"5","name":"test5"}]';
        //var jt = '[{"Category":"Bon apetit","Business Name":"Blue Island Oyster Bar\'s","A'ddress":"2625 E 2nd Avenue nCherry Creek NorthnDenver, CO 80206","Phone":"303-333-2462","Website":"http://www.blueislandoysterbar.com/","Lat":39.7196643,"Lng":-104.9568074,"Photo":"blue island oyster bar.jpg","Photo_list":"blue island oyster bar.jpg","Gallery":"blue island oyster bar.jpg","Distance":".2 miles, E 2nd Ave"},{"Category":"Bon apetit","Business Name":"Cherry Creek Grill","Address":"184 Steele Street ","Phone":"303-322-3524","Website":"http://www.hillstone.com/cherrycreekgrill/","Lat":39.7191657,"Lng":-104.949573999999,"Photo":"Cherry Creek Grill.jpg","Photo_list":"Cherry Creek Grill.jpg","Gallery":"Cherry Creek Grill.jpg,Cherry Creek Mall.jpg","Distance":".6 miles, E 2nd Ave"},{"Category":"Bon apetit","Business Name":"Cucina Colore","Address":"3401 East 3rd Avenue","Phone":"303-393-6917","Website":"http://www.cucinacolore.com/","Lat":39.7209799,"Lng":-104.947369999999,"Photo":"Cucina Colore.jpg","Photo_list":"Cucina Colore.jpg","Gallery":"Cucina Colore.jpg","Distance":".7 miles, E 3rd Ave"},{"Category":"Bon apetit","Business Name":"Del Frisco\'s Grille","Address":"100 St. Paul Street, Suite 140","Phone":"303-320-8529","Website":"https://delfriscosgrille.com/","Lat":39.7182932,"Lng":-104.9507158,"Photo":"Del Frisco Grill.jpg","Photo_list":"Del Frisco Grill.jpg","Gallery":"Del Frisco Grill.jpg","Distance":".5 miles, E 2nd Ave"},{"Category":"Bon apetit","Business Name":"Departure Elevated","Address":"249 Columbine Street, Rooftop","Phone":"720.772.5030","Website":"http://departureelevated.com/ ","Lat":39.72007691922261,"Lng":-104.9562816870331,"Photo":"DEPARTURE_0105.jpg","Photo_list":"DEPARTURE_0105.jpg","Gallery":"DEPARTURE_0105.jpg,DEPARTURE_0104.jpg,DEPARTURE_03_0979.jpg,DEPARTURE_03_0982.jpg,DEPARTURE_03_0977.jpg,DEPARTURE_03_0966.jpg,DEPARTURE_0098.jpg,DEPARTURE_drink.jpg","Distance":".2 miles, Josephine St and E 2nd Ave"},{"Category":"Bon apetit","Business Name":"Departure Restaurant + Lounge Cherry Creek","Address":"249 Columbine Street","Phone":"720.772.5020","Website":"http://departuredenver.com/","Lat":39.72007691922261,"Lng":-104.95645334841005,"Photo":"Departure Restaurant + Lounge.jpg","Photo_list":"Departure Restaurant + Lounge.jpg","Gallery":"Departure Restaurant + Lounge.jpg","Distance":".2 miles, Josephine St and E 2nd Ave"},{"Category":"Bon apetit","Business Name":"Hapa Sushi","Address":"2780 East 2nd Avenue","Phone":"303-322-9554","Website":"http://hapasushi.com/","Lat":39.7191897,"Lng":-104.9549058,"Photo":"Hapa Sushi.jpg","Photo_list":"Hapa Sushi.jpg","Gallery":"Hapa Sushi.jpg","Distance":".3 miles, E 2nd Ave"},{"Category":"Bon apetit","Business Name":"Little Ollie ","Address":"2364 East 3rd Avenue","Phone":"303-316-8888","Website":"http://www.jingrestaurant.com/littleollies.html","Lat":39.7207969,"Lng":-104.9584797,"Photo":"Little Ollie Restaurant.jpg","Photo_list":"Little Ollie Restaurant.jpg","Gallery":"Little Ollie Restaurant.jpg","Distance":"377 feet"},{"Category":"Bon apetit","Business Name":"Marg Taco Bistro","Address":"200 Filmore Street","Phone":"303-321-6274","Website":"http://www.margstacobistro.com/","Lat":39.7196988,"Lng":-104.9531053,"Photo":"Margs.jpg","Photo_list":"Margs.jpg","Gallery":"Margs.jpg","Distance":".2 miles, E 2nd Ave"},{"Category":"Bon apetit","Business Name":"Matsuhisa Denver","Address":"98 Steele Street ","Phone":"303-329-6628","Website":"http://www.matsuhisarestaurants.com/home/denver/","Lat":39.7177727,"Lng":-104.949724899999,"Photo":"Matsuhisa Denver.jpg","Photo_list":"Matsuhisa Denver.jpg","Gallery":"Matsuhisa Denver.jpg","Distance":".6 miles, E 1st Ave"},{"Category":"Bon apetit","Business Name":"NoRTH Italia","Address":"190 Clayton Lane Denver","Phone":"720-941-7700","Website":"http://www.northitaliarestaurant.com/locations/cherry-creek/","Lat":39.7192109,"Lng":-104.955611799999,"Photo":"North Italia.jpg","Photo_list":"North Italia.jpg","Gallery":"North Italia.jpg","Distance":".2 miles, E 2nd Ave"},{"Category":"Bon apetit","Business Name":"Piatti","Address":"190 St Paul Street Denver","Phone":"303-321-1919","Website":"http://piatti.com/denver/","Lat":39.71919,"Lng":-104.950654999999,"Photo":"Piatti.jpg","Photo_list":"Piatti.jpg","Gallery":"Piatti.jpg","Distance":".5 miles, E 2nd Ave"},{"Category":"Bon apetit","Business Name":"Quality Italian Steakhouse - Opening Soon","Address":"","Phone":"","Website":"http://www.halcyonhotelcherrycreek.com/entertain/quality-italian/","Lat":"","Lng":"","Photo":"Quality Italian Steakhouse.jpg","Photo_list":"Quality Italian Steakhouse.jpg","Gallery":"Quality Italian Steakhouse.jpg","Distance":""},{"Category":"Bon apetit","Business Name":"Syrup","Address":"300 Josephine Street, Suite 20","Phone":"720-945-1111","Website":"http://syruprestaurant.com/","Lat":39.7211787,"Lng":-104.9579799,"Photo":"Syrup.jpg","Photo_list":"Syrup.jpg","Gallery":"Syrup.jpg,Syrup Interior.jpg","Distance":".1 miles"},{"Category":"Bon apetit","Business Name":"The Cherry Cricket","Address":"2641 East 2nd Avenue","Phone":"303-322-7666","Website":"http://www.cherrycricket.com/","Lat":39.7195627,"Lng":-104.956218299999,"Photo":"Cherry Cricket.jpg","Photo_list":"Cherry Cricket.jpg","Gallery":"Cherry Cricket.jpg,Cherry Cricket 9.16.jpg","Distance":".2 miles, E 2nd Ave"},{"Category":"Bon apetit","Business Name":"True Food Kitchen","Address":"2800 East 2nd Avenue","Phone":"720-509-7661","Website":"http://www.truefoodkitchen.com/","Lat":39.7191536,"Lng":-104.954020399999,"Photo":"True Food Kitchen outside.jpg","Photo_list":"True Food Kitchen outside.jpg","Gallery":"True Food Kitchen outside.jpg,True Food Kitchen.jpg","Distance":".3 miles, E 2nd Ave"},{"Category":"Bon apetit","Business Name":"Vinue Food & Wine Bar","Address":"2817 East 3rd Avenue","Phone":"720-287-1156","Website":"http://www.denverwinebar.net/","Lat":39.7212212,"Lng":-104.9543014,"Photo":"Vinue Food & Wine Bar.jpg","Photo_list":"Vinue Food & Wine Bar.jpg","Gallery":"Vinue Food & Wine Bar.jpg","Distance":".4 miles, E 2nd Ave and Detroit St"},{"Category":"Diversions","Business Name":"Cheesman Park","Address":"East 8th Ave & Franklin Street","Phone":"","Website":"https://en.wikipedia.org/wiki/Cheesman_Park,_Denver","Lat":39.7290912,"Lng":-104.9683167,"Photo":"cheesman_park.jpg","Photo_list":"cheesman_park.jpg","Gallery":"cheesman_park.jpg","Distance":"1.2 miles, E 7th Ave"},{"Category":"Diversions","Business Name":"Cherry Creek Shopping Center","Address":"3000 East 1st Avenue","Phone":"303-388-3900","Website":"http://www.shopcherrycreek.com/","Lat":39.7175014,"Lng":-104.952671,"Photo":"Thirsty Lion Cherry Creek.jpg","Photo_list":"Thirsty Lion Cherry Creek.jpg","Gallery":"Thirsty Lion Cherry Creek.jpg","Distance":".5 miles, E 2nd Ave and E 1st Ave"},{"Category":"Diversions","Business Name":"Christy Sports","Address":"201 University Boulevard","Phone":"303-321-3885","Website":"http://www.christysports.com/","Lat":39.7198688,"Lng":-104.959886499999,"Photo":"Christy Sports.jpg","Photo_list":"Christy Sports.jpg","Gallery":"Christy Sports.jpg","Distance":".2 miles, E 2nd Ave"},{"Category":"Diversions","Business Name":"Denver Botanic Gardens","Address":"1007 York Street","Phone":"720-865-3501","Website":"http://www.botanicgardens.org/","Lat":39.7320459,"Lng":-104.9601135,"Photo":"Botanical Garden.jpg","Photo_list":"Botanical Garden.jpg","Gallery":"Botanical Garden.jpg","Distance":".9 miles, via Josephine St"},{"Category":"Diversions","Business Name":"Denver Museum of Nature & Science","Address":"2001 Colorado Boulevard","Phone":"303-370-6000","Website":"http://www.dmns.org/","Lat":39.7475383,"Lng":-104.9428457,"Photo":"Denver Museum of Nature and Science.jpg","Photo_list":"Denver Museum of Nature and Science.jpg","Gallery":"Denver Museum of Nature and Science.jpg","Distance":"3.2 miles, E 6th Ave and Colorado Blvd"},{"Category":"Diversions","Business Name":"Denver Zoo","Address":"2300 Steele Street","Phone":"720-337-1400","Website":"http://www.denverzoo.org/","Lat":39.7502165,"Lng":-104.9501058,"Photo":"Denver Zoo.jpg","Photo_list":"Denver Zoo.jpg","Gallery":"Denver Zoo.jpg","Distance":"2.7 miles, Josephine St"},{"Category":"Diversions","Business Name":"Orvis","Address":"2770 East 2nd Avenue","Phone":"303-355-4554","Website":"http://www.orvis.com/","Lat":39.7191694,"Lng":-104.954997999999,"Photo":"Orvis.jpg","Photo_list":"Orvis.jpg","Gallery":"Orvis.jpg","Distance":".2 miles, E 2nd Ave"},{"Category":"Diversions","Business Name":"Show of Hands","Address":"210 Clayton Street","Phone":"303-399-0201","Website":"http://www.showofhandsdenver.com/","Lat":39.719716,"Lng":-104.955483399999,"Photo":"Show of Hands.jpg","Photo_list":"Show of Hands.jpg","Gallery":"Show of Hands.jpg","Distance":".3 miles, E 2nd Ave"},{"Category":"Diversions","Business Name":"Victoria Chocolates","Address":"2615 East 3rd Avenue","Phone":"303-647-1622","Website":"https://www.victoriaschocolates.com/","Lat":39.721117,"Lng":-104.95666,"Photo":"Victoria Chocolates.jpg","Photo_list":"Victoria Chocolates.jpg","Gallery":"Victoria Chocolates.jpg","Distance":".2 miles, Josephine St and E 3rd Ave"},{"Category":"Diversions","Business Name":"Washington Park","Address":"South Downing & east Louisiana Ave","Phone":"","Website":"https://en.wikipedia.org/wiki/Washington_Park,_Denver","Lat":39.6929737,"Lng":-104.973427399999,"Photo":"Washington Park.jpg","Photo_list":"Washington Park.jpg","Gallery":"Washington Park.jpg,Washington_Park_Denver.jpg","Distance":"2.8 miles, E Louisiana Ave"},{"Category":"Diversions","Business Name":"Whole Foods Market","Address":"2375 East 1st Avenue","Phone":"720-941-4100","Website":"http://www.wholefoodsmarket.com/stores/cherrycreek","Lat":39.7186572,"Lng":-104.957304799999,"Photo":"Whole Foods.jpg","Photo_list":"Whole Foods.jpg","Gallery":"Whole Foods.jpg","Distance":".2 miles, Josephine St"},{"Category":"Home + Wear","Business Name":"A Line Boutique","Address":"5375 Landmark Place, #107","Phone":"303-773-8200","Website":"http://www.aline-online.com/","Lat":39.6188110999999,"Lng":-104.901136899999,"Photo":"A Line Boutique.jpg","Photo_list":"A Line Boutique.jpg","Gallery":"A Line Boutique.jpg","Distance":"8.9 miles, University Blvd and I-25 S"},{"Category":"Home + Wear","Business Name":"Andrisen Morton","Address":"270 St Paul Street","Phone":"303-377-8488","Website":"http://www.andrisenmorton.com/","Lat":39.7206690999999,"Lng":-104.950647099999,"Photo":"Andrisen Morton.jpg","Photo_list":"Andrisen Morton.jpg","Gallery":"Andrisen Morton.jpg","Distance":".5 miles, E 3rd Ave"},{"Category":"Home + Wear","Business Name":"Arc teryx","Address":"250 Columbine Street","Phone":"303-993-5913","Website":"http://stores.arcteryx.com/denver","Lat":39.7201799,"Lng":-104.956698599999,"Photo":"Arc teryx.jpg","Photo_list":"Arcteryx.jpg","Gallery":"Arcteryx.jpg","Distance":".2 miles, Josephine St and E 2nd Ave"},{"Category":"Home + Wear","Business Name":"Design Within Reach","Address":"2500 East 2nd Avenue, #120","Phone":"720-407-0000","Website":"http://www.dwr.com/","Lat":39.7191206,"Lng":-104.957111699999,"Photo":"Design Within Reach.jpg","Photo_list":"Design Within Reach.jpg","Gallery":"Design Within Reach.jpg","Distance":".1 miles, Josephine St and E 2nd Ave"},{"Category":"Home + Wear","Business Name":"Eileen Fisher","Address":"2800 East 2nd Avenue","Phone":"303-322-0344","Website":"http://www.eileenfisher.com/","Lat":39.7191536,"Lng":-104.954020399999,"Photo":"Eileen Fisher.jpg","Photo_list":"Eileen Fisher.jpg","Gallery":"Eileen Fisher.jpg","Distance":".3 miles, E 2nd Ave"},{"Category":"Home + Wear","Business Name":"Evereve","Address":"250 Columbine Street, #140","Phone":"720-399-9945","Website":"https://www.evereve.com/","Lat":39.7201799,"Lng":-104.956698599999,"Photo":"Evereve.jpg","Photo_list":"Evereve.jpg","Gallery":"Evereve.jpg","Distance":".2 miles, Josephine St and E 2nd Ave"},{"Category":"Home + Wear","Business Name":"Garbarini","Address":"239 Detroit Street","Phone":"303-333-8686","Website":"http://garbarinishop.com/","Lat":39.7201957,"Lng":-104.954940099999,"Photo":"Garbarini.jpg","Photo_list":"Garbarini.jpg","Gallery":"Garbarini.jpg","Distance":".3 miles, E 2nd Ave"},{"Category":"Home + Wear","Business Name":"Heloise","Address":"300 University Boulevard","Phone":"303-997-5261","Website":"http://www.heloisechildrensboutique.com/","Lat":39.7211445,"Lng":-104.959109899999,"Photo":"Heloise.jpg","Photo_list":"Heloise.jpg","Gallery":"Heloise.jpg","Distance":".1 miles, Josephine St and E 3rd Ave"},{"Category":"Home + Wear","Business Name":"Hermès","Address":"105 Fillmore Street, #101","Phone":"303-388-0700","Website":"http://www.hermes.com/index_us.html","Lat":39.7186412,"Lng":-104.9537644,"Photo":"Hermes.jpg","Photo_list":"Hermes.jpg","Gallery":"Hermes.jpg","Distance":".4 miles, E 2nd Ave and Detroit St"},{"Category":"Home + Wear","Business Name":"Kate Spade","Address":"105 Fillmore Street","Phone":"303-321-3112","Website":"https://www.katespade.com/","Lat":39.7186602,"Lng":-104.953723999999,"Photo":"Kate Spade.jpg","Photo_list":"Kate Spade.jpg","Gallery":"Kate Spade.jpg","Distance":".4 miles, E 2nd Ave and Detroit St"},{"Category":"Home + Wear","Business Name":"Lawrence Covell","Address":"225 Steele Street","Phone":"303-320-1023","Website":"http://www.lawrencecovell.com/","Lat":39.7200941,"Lng":-104.950153,"Photo":"Lawrence Covell.jpg","Photo_list":"Lawrence Covell.jpg","Gallery":"Lawrence Covell.jpg","Distance":".5 miles, E 2nd Ave"},{"Category":"Home + Wear","Business Name":"Le Creuset Boutique","Address":"158 fillmore Street, #110","Phone":"720-287-2181","Website":"http://www.lecreuset.com/","Lat":39.7189686,"Lng":-104.9531506,"Photo":"Le Creuset.jpg","Photo_list":"Le Creuset.jpg","Gallery":"Le Creuset.jpg","Distance":".5 miles, E 3rd Ave"},{"Category":"Home + Wear","Business Name":"Lucy","Address":"170 Clayton Lane","Phone":"303-355-4300","Website":"http://www.lucy.com/","Lat":39.7187797,"Lng":-104.9555869,"Photo":"Lucy.jpg","Photo_list":"Lucy.jpg","Gallery":"Lucy.jpg","Distance":".2 miles, E 2nd Ave"},{"Category":"Home + Wear","Business Name":"Lululemon Athletica","Address":"158 Fillmore Street, #3","Phone":"720-941-6470","Website":"http://shop.lululemon.com","Lat":39.7189686,"Lng":-104.9531506,"Photo":"Lululemon Athletica.jpg","Photo_list":"Lululemon Athletica.jpg","Gallery":"Lululemon Athletica.jpg","Distance":".5 miles, E 3rd Ave"},{"Category":"Home + Wear","Business Name":"Peter Millar","Address":"250 Columbine, Suite 120","Phone":"303-515-2222","Website":"https://www.petermillar.com/","Lat":39.7201799,"Lng":-104.956698599999,"Photo":"Peter Millar.jpg","Photo_list":"Peter Millar.jpg","Gallery":"Peter Millar.jpg","Distance":".2 miles, Josephine St and E 2nd Ave"},{"Category":"Home + Wear","Business Name":"prAna","Address":"105 Fillmore Street, #109","Phone":"720-377-3017","Website":"http://www.prana.com/","Lat":39.7186412,"Lng":-104.9537644,"Photo":"prAna.jpg","Photo_list":"prAna.jpg","Gallery":"prAna.jpg","Distance":".4 miles, E 2nd Ave and Detroit St"},{"Category":"Home + Wear","Business Name":"Restoration Hardware","Address":"2900 East 1st Avenue","Phone":"303-331-1938","Website":"https://www.restorationhardware.com/","Lat":39.717526,"Lng":-104.953477,"Photo":"Restoration Hardware.jpg","Photo_list":"Restoration Hardware.jpg","Gallery":"Restoration Hardware.jpg","Distance":".4 miles, E 2nd Ave and E 1st Ave"},{"Category":"Home + Wear","Business Name":"Room & Board","Address":"222 Detroit Street ","Phone":"303-388-6462","Website":"http://www.roomandboard.com/","Lat":39.719802527715245,"Lng":-104.9540500891327,"Photo":"Room and Board.jpg","Photo_list":"Room and Board.jpg","Gallery":"Room and Board.jpg","Distance":".3 miles, E 2nd Ave"},{"Category":"Home + Wear","Business Name":"SOL - Store of Lingerie","Address":"3010 East 6th Avenue","Phone":"303-394-1060","Website":"https://www.solgirl.com/","Lat":39.7254092,"Lng":-104.954181,"Photo":"SOL Cocina.jpg","Photo_list":"SOL Cocina.jpg","Gallery":"SOL Cocina.jpg,SOL - Lingerie.jpg","Distance":".6 miles, Josephine St and E 6th Ave"},{"Category":"Home + Wear","Business Name":"St. John Boutique","Address":"3170 East 2nd Avenue","Phone":"303-377-7572","Website":"http://www.stjohnknits.com/","Lat":39.7191778,"Lng":-104.950103399999,"Photo":"St John.jpg","Photo_list":"St John.jpg","Gallery":"St John.jpg","Distance":".5 miles, E 2nd Ave"},{"Category":"Home + Wear","Business Name":"Sur La Table","Address":"121 Clayton Lane","Phone":"303-780-7800","Website":"http://www.surlatable.com","Lat":39.718733,"Lng":-104.956095,"Photo":"Sur La Table.jpg","Photo_list":"Sur La Table.jpg","Gallery":"Sur La Table.jpg","Distance":".2 miles, E 2nd Ave"},{"Category":"Home + Wear","Business Name":"The North Face","Address":"100 Detroit Street","Phone":"303-316-8383","Website":"https://www.thenorthface.com/","Lat":39.7186645,"Lng":-104.9542832,"Photo":"Northface.jpg","Photo_list":"Northface.jpg","Gallery":"Northface.jpg","Distance":".3 miles, E 2nd Ave"},{"Category":"Java Huts","Business Name":"Aviano Coffee","Address":"244 Detroit Street","Phone":"303-399-8347","Website":"http://www.avianocoffee.net/","Lat":39.720378,"Lng":-104.954318199999,"Photo":"Aviano Coffee 2.jpg","Photo_list":"Aviano Coffee 2.jpg","Gallery":"Aviano Coffee 2.jpg,Aviano Coffee.jpg","Distance":".3 miles, E 2nd Ave"},{"Category":"Java Huts","Business Name":"Ink! Coffee","Address":"2415 East 2nd Avenue","Phone":"303-329-7911","Website":"http://inkcoffee.com/","Lat":39.7195578,"Lng":-104.9576872,"Photo":"ink coffee 2.jpg","Photo_list":"ink coffee 2.jpg","Gallery":"ink coffee 2.jpg,ink coffee.jpg","Distance":".1 miles, Josephine St"},{"Category":"Pretty City","Business Name":"BLOOM","Address":"2353 East 3rd Avenue","Phone":"720-941-2862","Website":"http://www.bloomdenver.com/","Lat":39.721109,"Lng":-104.959238,"Photo":"Bloom Cherry Creek.jpg","Photo_list":"Bloom Cherry Creek.jpg","Gallery":"Bloom Cherry Creek.jpg,Bloom.jpg","Distance":".1 miles, E 3rd Ave"},{"Category":"Pretty City","Business Name":"Denver Dry Bar","Address":"3290 East 1st Avenue","Phone":"303-242-3513","Website":"https://www.thedrybar.com/","Lat":39.7175739,"Lng":-104.949051699999,"Photo":"Dry bar.jpg","Photo_list":"Dry bar.jpg","Gallery":"Dry bar.jpg,Dry Bar 2.jpg","Distance":".7 miles, E 1st Ave"},{"Category":"Pretty City","Business Name":"John Atencio Designer Jewelery","Address":"140 Clayton Lane","Phone":"303-377-2007","Website":"http://johnatencio.com","Lat":39.7188459,"Lng":-104.955746299999,"Photo":"John Atencio Designer Jewelry.jpg","Photo_list":"John Atencio Designer Jewelry.jpg","Gallery":"John Atencio Designer Jewelry.jpg","Distance":".2 miles, E 2nd Ave"},{"Category":"Pretty City","Business Name":"Kendra Scott","Address":"175 Fillmore Street","Phone":"720-381-2999","Website":"http://www.kendrascott.com/","Lat":39.7194163,"Lng":-104.9535286,"Photo":"Kendra Scott.jpg","Photo_list":"Kendra Scott.jpg","Gallery":"Kendra Scott.jpg","Distance":".4 miles, E 3rd Ave and E 2nd Ave"},{"Category":"Pretty City","Business Name":"SPAVital at Pura Vida","Address":"2955 East 1st Avenue, #200","Phone":"303-999-2900","Website":"http://www.spavitalpv.com/","Lat":39.7184479,"Lng":-104.9525514,"Photo":"Pura Vida.jpg","Photo_list":"Pura Vida.jpg","Gallery":"Pura Vida.jpg,Pura Vida Aerial.jpg,Pura Vida Spa Day 8.15.jpg,Pura Vida 2.jpg","Distance":".5 miles, E 2nd Ave and Fillmore Plaza"}]';
       
        //console.log('new JSON (repeater): ', j);
        //console.log('hello' + j);
        
        
        //var json = $.parseJSON(jt);
        //var json = $.parseJSON(j);
        var json = $.parseJSON(JSON.stringify(j));
        
        data_ajax = json;
        console.log(json);
        //$(data).each(function (i, val) {
          $(json).each(function (i, val) {
          /*console.log(i + " : " + val);
          console.log("Address : " + val.Address);
          console.log("Lat : " + val.Lat);
          console.log("Lng : " + val.Lng);*/
            console.log("icon" + val.icon);
          var lat = val.Lat;//.trim();
          var lng = val.Lng;//.trim();
          var Pin = val.Pin;
          var ImageAlt = val.photoAlt;
            //console.log("THis is the icon for this address" + pins);
          //if (0 < lat.length && 0 < lng.length) {
          if (0 != lat.length && 0 != lng.length) {
            //console.log("USE LAT LNG");
            $mapster.mapster('addMarker', {
              lat: lat,
              lng: lng,
              //category: val.Category,
              data: val,
              //icon: "http://templates.cendyn.com/halcyonhotelcherrycreek.com-2016/images/icon.png",
              //icon: "/getmedia/5cc480c8-a562-4ec2-9228-ee29a0371cfe/icon",
              icon: Pin,
              events: [{
                name: 'click',
                callback: function (e, marker) {
                  /*console.log('Im clicked **');
                  console.log(this.proj);
                  console.log(this);
                  console.log(e);
                  console.log(marker);
                  console.log('-----');*/
                  var pos = marker.getPosition();
                  var p = this.proj.fromLatLngToContainerPixel(pos);
                  //console.log("x", p.x);
                  //console.log("y", p.y);
                  //$('overlap').offset();
                  //console.log($('#overlap').offset());
                  //console.log($('#map-canvas').offset());
                  //$('#overlap').position
                  $("#overlap").css({ top: $('#map-canvas').offset().top + p.y - 38, left: $('#map-canvas').offset().left + p.x - 12 });

                  /*$('#overlap').popover({

                    //title: 'Default title value'
                    //content: '<div class="container-fluid"><div class="row"><div class="col-md-6">.col-md-6 xx xx xx xx xx xx xxx xx xx xx xx xx xx</div><div class="col-md-6">.col-md-6 xx xx xx xx xx xx xx</div></div><div class="row"><div class="col-md-6">.col-md-6 xx xx xx xx xx xx xxx xx xx xx xx xx xx</div><div class="col-md-6">.col-md-6 xx xx xx xx xx xx xx</div></div></div>',
                    content: function() {
					  return $("#popup_content").html();
					},
                    html:'true',
                    placement: 'auto top',
                    container: 'body',
                    viewport: '#map-area'
                    //"selector": "#map-area", "padding": 0
                  });*/
                  $('#overlap').popover('destroy');
                  setTimeout(function () {
                    //your code to be executed after 1 second

                    $('#overlap').popover({
                      //title: 'Default title value'
                      //content: '<div class="container-fluid"><div class="row"><div class="col-md-6">.col-md-6 xx xx xx xx xx xx xxx xx xx xx xx xx xx</div><div class="col-md-6">.col-md-6 xx xx xx xx xx xx xx</div></div><div class="row"><div class="col-md-6">.col-md-6 xx xx xx xx xx xx xxx xx xx xx xx xx xx</div><div class="col-md-6">.col-md-6 xx xx xx xx xx xx xx</div></div></div>',
                      /* content: function () {
                               //var clone = $($(this).data('popover-content')).clone(true).removeClass('hide');
                               //return clone;
                         return $("#popover_content").html();
                       },*/

                      /*content: function () {
                        $.get('PopupContent.htm').success(function (data) {
                          console.log("PopupContent", data)
                          return data;
                        });
                      },*/

                      content: function () {
                        // Create a random temporary id for the content's parent div
                        // with a unique number just in case.
                        var content_id = "content-id-" + $.now();

                        $.ajax({
                          type: 'GET',
                          //url: $(this).prop('href'),
                          url: '/popupcontent.html',
                          cache: false,
                        }).done(function (d) {
                          //console.log("popover content", this)
                          //console.log("popover content", marker)
                          //console.log("popover content", marker.data)
                          //console.log("popover content marker.data[Gallery].length", marker.data["Gallery"].length)
                          $('#' + content_id).html(d);

                          $('#popover_carousel').hide();

                          $('#popover_local_category').html(marker.data["Category"].toUpperCase());
                          $('#popover_local_name').html(marker.data["Business Name"]);
                          $('#popover_local_address').html(marker.data["Address"]);
                          $('#popover_local_phone').html(marker.data["Phone"]);
                          $('#popover_directions_title').html(marker.data["Distance"]);
                          //$('#popover_local_website').html(marker.data["Website"]);
                          $("#popover_local_website a").attr("href", marker.data["Website"]);
                          $("#popover_directions_link a").attr("href", 'http://maps.google.com/maps?saddr="245 N Columbine Street, Denver, CO 80206"&daddr=' + marker.lat + "," + marker.lng);

                          //$("#popover_details img").attr("src", "http://templates.cendyn.com/halcyonhotelcherrycreek.com-2016/photos_local/" + marker.data["Photo"]);
                          $("#popover_details img").attr("src", marker.data["Photo"]);
                          
                          
                          //var myregexp2 = new RegExp((/,/); 
                          var images = marker.data["Gallery"].split(/,/);
                          if (images.length > 1) {
                            //console.log(images);
                            //console.log("popover content marker.data[Gallery].length", images.length)

                            for (var i = 0; i < images.length; i++) {
                              //$('<div class="item"><img src="http://templates.cendyn.com/halcyonhotelcherrycreek.com-2016/photos_local_gallery/' + images[i] + '"></div>   </div>').appendTo('.carousel-inner');
                              $('<div class="item"><img src="' + images[i] + '" alt=""></div>   </div>').appendTo('.carousel-inner');
                              $('<li data-target="#carousel-example-generic" data-slide-to="' + i + '"></li>').appendTo('.carousel-indicators')

                            }
                            $('.item').first().addClass('active');
                            $('.carousel-indicators > li').first().addClass('active');


                            ////////////////////
						
                            ///////////////////
                            //$('#overlap').popover('show');
                            $(".carousel").swipe({
                              /*swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                                console.log("direction", direction)
                              },*/

                              //Generic swipe handler for all directions 
                              swipeLeft: function (event, direction, distance, duration, fingerCount) {
                                //console.log("swipeLeft");
                                $(this).parent().carousel('prev');
                                $(this).parent().carousel('pause');

                              },
                              swipeRight: function () {
                                //console.log("swipeRight");
                                $(this).parent().carousel('next');
                                $(this).parent().carousel('pause');

                              }, 
                              //Default is 75px, set to 0 for demo so any distance triggers swipe 
                              threshold: 75
                            }); 
                            //$('.carousel-inner').carousel();
                            //$('.carousel').carousel({ keyboard: false, pause: null, interval: 10000 });
                            $('.carousel').carousel({ keyboard: false, pause: null, interval: 0 });
                          } else {
                            /*
                            //$('#popover_carousel').html('');
                            $('#carousel-example-generic').html('<div class="carousel-inner" role="listbox"></div>');
                            //carousel-example-generic
                            if (images.length == 1) {
                              $('<div class="col-md-12"><img src="http://templates.cendyn.com/halcyonhotelcherrycreek.com-2016/photos_local_gallery/' + images[0] + '"></div>').appendTo('#popover_carousel');
                            }
                            */
                            $('#carousel-example-generic').html('<div class="carousel-inner" role="listbox"></div>');
                            //console.log(images);
                            //console.log("popover content marker.data[Gallery].length", images.length)


                            for (var i = 0; i < images.length; i++) {
                             // $('<div class="item"><img src="' + images[i] + '"></div>   </div>').appendTo('.carousel-inner');
                              //$('<div class="item"><img src="http://www.halcyonhotelcherrycreek.com/Halcyonhotelcherrycreek.com-0061-2015Redesign/media/halcyonhotelcherrycreek.com-0061/Interactive%20Map/Photo%20Local/' + images[i] + '"></div>   </div>').appendTo('.carousel-inner');
                              //$('<div class="item"><img src="http://templates.cendyn.com/halcyonhotelcherrycreek.com-2016/photos_local_gallery/' + images[i] + '"></div>   </div>').appendTo('.carousel-inner');
                              $('<div class="item"><img src="' + images[i] + '"></div>   </div>').appendTo('.carousel-inner');
                            }
                            $('.item').first().addClass('active');


                            //$('.carousel-inner').carousel();
                            //$('.carousel').carousel({ keyboard: false, pause: null, interval: 10000 });
                            $('.carousel').carousel({ keyboard: false, pause: null, interval: 0 });
                            
                          }
                        });

                        return '<div id="' + content_id + '" class="loading_container"><div class="loading_container">Loading...</div></div>';

                        // Initially, the content() function returns a parent div, 
                        // which shows "Loading..." message.
                        // As soon as the ajax call is complete, the parent div inside 
                        // the popover gets the ajax call's result.

                      },


                      html: 'true',
                      placement: 'auto top',
                      container: 'body',
                      viewport: '#map-area'/*,
                    "selector": "#map-area", "padding": 0*/
                    });

                    $('#overlap').on('shown.bs.popover', function () {
                      // initialize carousel…
                      //console.log(" ************************ shown.bs.popover");
                      //$('#carousel-example-generic').carousel()
                    
    
                      //$('.carousel').bcSwipe({ threshold: 50 });
                   
                    });
                    //console.log(" ************************ shown popover");

                    $('#overlap').popover('show');

                    //console.log(" ************************ shown popover");
                  }, 200);
                  //$('#carousel-example-generic').carousel()
                  
                }
              }]
            });
          } else if (val.Address.trim()) {
            var location = val.Address.replace(/\n/gi, "");
            //console.log("location", location);
            $mapster.mapster('addMarker', {
              //location: '1111 Main Street'
              //location: val.Address + "Denver, CO 80206",
              location: location + "Denver, CO 80206",
              //lat: 37.791500,
              //lng: -122.435883,
              events: [{
                name: 'click',
                callback: function (e, marker) {
                  /*console.log('Im clicked **');
                  console.log(this.proj);
                  console.log(this);
                  console.log(e);
                  console.log(marker);
                  console.log('-----');*/
                  var pos = marker.getPosition();
                  var p = this.proj.fromLatLngToContainerPixel(pos);
                  //console.log("x", p.x);
                  //console.log("y", p.y);
                  $('overlap').offset();
                  //console.log($('#overlap').offset());
                  //console.log($('#map-canvas').offset());
                  //$('#overlap').position
                  $("#overlap").css({ top: $('#map-canvas').offset().top + p.y - 38, left: $('#map-canvas').offset().left + p.x - 12 });

                  /*$('#overlap').popover({

                    //title: 'Default title value'
                    //content: '<div class="container-fluid"><div class="row"><div class="col-md-6">.col-md-6 xx xx xx xx xx xx xxx xx xx xx xx xx xx</div><div class="col-md-6">.col-md-6 xx xx xx xx xx xx xx</div></div><div class="row"><div class="col-md-6">.col-md-6 xx xx xx xx xx xx xxx xx xx xx xx xx xx</div><div class="col-md-6">.col-md-6 xx xx xx xx xx xx xx</div></div></div>',
                    content: function() {
					  return $("#popup_content").html();
					},
                    html:'true',
                    placement: 'auto top',
                    container: 'body',
                    viewport: '#map-area'
                    //"selector": "#map-area", "padding": 0
                  });*/
                  $('#overlap').popover('show');
                  //var offset = p.offset();
                  /*var overlay = new google.maps.OverlayView();
                  overlay.draw = function () { };
                  overlay.setMap($mapster.gMap);
                  console.log(overlay);
                  var proj = overlay.getProjection();
                  console.log(proj);
                  var pos = marker.getPosition();
                  var p = proj.fromLatLngToContainerPixel(pos);
                  console.log(p);
                  console.log("x", p.x);
                  console.log("y", p.y);*/
                  //console.log($(marker).parent());
                  //console.log('Im clicked');
                  // alert('Im clicked');

                }
              }]
            });
          }
        });
    //END OF SUCCESS FUNCTION  }
   //END OF AJAX CALL FOR JSON });
    if (!isMobile.any) {
      //console.log("CREATE LIST");

      var channel = postal.channel();
      var subscriptionCategorySelected;
      var subscriptionShowAllCategories;


      $.ajax({
        type: 'GET',
        //url: $(this).prop('href'),
        url: '/listcontent.html',
        cache: false,
      }).done(function (d) {
        /*console.log("--------------------------------------------------------------------------------");
        console.log("--------------------------------------------------------------------------------");
        console.log(d);
        console.log("--------------------------------------------------------------------------------");
        console.log("--------------------------------------------------------------------------------");
*/
        subscriptionCategorySelected = channel.subscribe("categorySelected", function (data) {
          $('#list_area').html("");
          $(data_ajax).each(function (i, val) {
            if (val["Category"] != data.category) {
              return;
            }
            //$('.list_local_name', d).html(marker.data["Business Name"]);
            //console.log("---------------------------------------------------------------------------------------------------------------------------------------", i)
            //$('.list_local_name', d).html(val.Address);
            var itemData = d;
            var response = $('<div />').html(d);
            //console.log(i, val);
            //console.log(val["lat"])
            //console.log(val["lng"])
            //console.log("#**", $('#list_local_name', response));

            $('.list_local_category', response).html(val["Category"].toUpperCase());
            $('.list_local_name', response).html(val["Business Name"]);
            $('.list_local_address', response).html(val["Address"]);
            $('.list_local_phone', response).html(val["Phone"]);
            $('.list_local_website a', response).attr("href", val["Website"]);


            $(".list_directions_link a", response).attr("href", 'http://maps.google.com/maps?saddr="245 N Columbine Street, Denver, CO 80206"&daddr=' + val["Lat"] + "," + val["Lng"] );
            //$(".list_directions_link a").attr("href", 'http://maps.google.com/maps?saddr="245 N Columbine Street, Denver, CO 80206"&daddr=' + val.lat + "," + val.lng);


            //$(".list_local_image", response).attr("src", "http://templates.cendyn.com/halcyonhotelcherrycreek.com-2016/photos_local_list/" + val["Photo_list"]);
            $(".list_local_image", response).attr("src", val["Photo_list"]);

           // console.log($(".list_local_image img", response))
                          
            //console.log(".list_local_name find", response.find('.list_local_name'));
            // console.log("#list_local_name find", response.find('#list_local_name'));
            // console.log(".list_local_name", response.filter('.list_local_name'));
            // console.log("#list_local_name", response.filter('#list_local_name'));
            // response.filter('.list_local_name').html(val.Address);
            // console.log("---------------------------------------------------------------------------------------------------------------------------------------")
            //$('#list_local_name', itemData).html("999999999999999999");
            //console.log("------------------------")
            //console.log($(itemData).filter('.list_local_name'));
            //$(itemData).filter('.list_local_name').html(val.Address);
            /* console.log($('.list_local_name', d))
             console.log(i, " : " , val);
             console.log("Address : " + val.Address);
             console.log("Lat : " + val.Lat);
             console.log("Lng : " + val.Lng);*/
            $('#list_area').html($('#list_area').html() + response.html());
            console.log("---------------------------------------------------------------------------------------------------------------------------------------")
          });
        
          //$( "#example1" ).html( "Name: " + data.name );
          /*
          console.log("selector.change", this);
          console.log("selector.change", _self);
          console.log("selector.change", data)
          _self.map.removeBy(function (marker) {
            return marker.data.Category != data.category;
          });
          _self.map.addBy(function (marker) {
            //console.log("marker.data.Category", marker.data.Category)
            return marker.data.Category === data.category;
          });
          _self.map.setViewport(data.zoom, data.lat, data.lng);
          //_self.map.setZoom(data.zoom);
          //_self.map.setCenter(new google.maps.LatLng({lat: data.lat, lng: data.lng}));
          $('#overlap').popover('hide');
          */
          //console.log("selector.change", _self.options.category)
          /*if(data.category ==_self.options.category){
            $(_self.element).removeClass("menu_item_unselected").addClass( "menu_item_selected" );
          }else{
            $(_self.element).removeClass("menu_item_selected").addClass( "menu_item_unselected" );
          }*/
        });

        subscriptionShowAllCategories = channel.subscribe("showAllCategories", function (data) {
          /*_self.map.addBy(function (marker) {
            //console.log("marker.data.Category", marker.data.Category)
            return marker;
          });
          _self.map.setViewport(12, 39.68602753445075, -104.92379477144472);*/
          $('#list_area').html("");
        });
      });

      //var _self = this;
      
    }
  }
  google.maps.event.addDomListener(window, 'load', initMap);

} (window, jQuery, window.Mapster));
$(document).ready(function () {
  //$('[data-toggle="popover"]').popover();
  //$('img').on('dragstart', function (event) { event.preventDefault(); });
  //$("#popup_content").hide();
  /*$('html').on('click', function(e) {
  if (typeof $(e.target).data('original-title') == 'undefined' &&
     !$(e.target).parents().is('.popover.in')) {
	 console.log("hide popover")
    $('[data-original-title]').popover('hide');
  }
});*/
  $('body').on('click', '#btn_about', function () {
    //console.log("click btn_about");
    $('#popover_details').show();
    $('#popover_carousel').hide();
    //$('btn_text','#btn_about').removeClass('popover_image_text_inactive');
    // code here
    
    $('.btn_text', '#btn_images').removeClass('popover_image_text_active').addClass('popover_image_text_inactive');
    $('.popover_image img', '#btn_images').attr("src", "http://templates.cendyn.com/halcyonhotelcherrycreek.com-2016//images/icon_image_gray.png");

    $('.btn_text', '#btn_about').removeClass('popover_image_text_inactive').addClass('popover_image_text_active');
    $('.popover_image img', '#btn_about').attr("src", "http://templates.cendyn.com/halcyonhotelcherrycreek.com-2016//images/icon_info.png");

  });
  $('body').on('click', '#btn_images', function () {
    $('#popover_details').hide();
    $('#popover_carousel').show();

    $('.btn_text', '#btn_images').removeClass('popover_image_text_inactive').addClass('popover_image_text_active');
    $('.popover_image img', '#btn_images').attr("src", "http://templates.cendyn.com/halcyonhotelcherrycreek.com-2016//images/icon_image.png");

    $('.btn_text', '#btn_about').removeClass('popover_image_text_active').addClass('popover_image_text_inactive');
    $('.popover_image img', '#btn_about').attr("src", "http://templates.cendyn.com/halcyonhotelcherrycreek.com-2016//images/icon_info_gray.png");
    // code here
  });
  $('body').on('click', '#btn_popover_close', function () {
    //$('#overlap').popover('hide');
    //console.log("you click me");
    $('#overlap').popover('destroy');

    $('.btn_text', '#btn_popover_close').removeClass('popover_image_text_inactive').addClass('popover_image_text_active');
    $('.popover_image img', '#btn_popover_close').attr("src", "http://templates.cendyn.com/halcyonhotelcherrycreek.com-2016//images/icon_close.png");
    // code here
  });
  
   $('body').on('click', '#map-canvas', function () {
    //$('#overlap').popover('hide');
    console.log("you click me map canvas");
    $('#overlap').popover('hide');
   // $('#overlap').popover('destroy');

    $('.btn_text', '#btn_popover_close').removeClass('popover_image_text_inactive').addClass('popover_image_text_active');
    $('.popover_image img', '#btn_popover_close').attr("src", "http://templates.cendyn.com/halcyonhotelcherrycreek.com-2016//images/icon_close.png");
    // code here
  });
  /*$("#btn_about").mouseup(function (event) {

    console.log("Hbtn_about mouseup.");
    //mydragg.stopMoving("container");
    //onmousedown='mydragg.startMoving(this,"container",event);' onmouseup='mydragg.stopMoving("container");
  });*/

  /*$('#menu_1').click(function () {
    //$('.removeable').remove();
    console.log("I did this");
	//$('#menu_1').css({color:#dd463c}
	//$('#menu_1').css({color: '#dd463c'});
	$('#menu_1').removeClass("menu_item").addClass( "menu_item_selected" );
  });*/
  //$('#map-canvas').mapster(mapster.MAP_OPTIONS);
  $('#menu_1').markerselector({ category: "Culinary Adventures", map_data: { lat: 39.719490999191116, lng: -104.95310595155946, zoom: 17 } });/*17*/
  //$('#menu_1').markerselector({ category: "Bon apetit", map_data: { lat: 39.719490999191116, lng: -104.95310595155946, zoom: 17 } });
  $('#menu_2').markerselector({ category: "Diversions", map_data: { lat: 39.72117447433575, lng: -104.95297184110872, zoom: 13 } });/*12*/
  $('#menu_3').markerselector({ category: "Home + Wear", map_data: { lat: 39.72007247433575, lng: -104.955106, zoom: 17 } });/*12*/
  //$('#menu_3').markerselector({ category: "Home + Wear", map_data: { lat: 39.67390602745684, lng: -104.92764105917207, zoom: 12 } });/*12*//*comment out 12/13/16 for zoom issue*/
  $('#menu_4').markerselector({ category: "Java Huts", map_data: { lat: 39.72007279304248, lng: -104.95701883054964, zoom: 18 } });/*18*/
  // $('#menu_4').markerselector({ category: "Java Huts", map_data: { lat: 39.72007279304248, lng: -104.95601883054964, zoom: 18 } });/*18* comment out 12/13/16/
  $('#menu_5').markerselector({ category: "Pretty City", map_data: { lat: 39.71955701859841, lng: -104.95412519098512, zoom: 16} });/*16*/
});
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
  var msViewportStyle = document.createElement('style')
  msViewportStyle.appendChild(
    document.createTextNode(
      '@-ms-viewport{width:auto!important}'
      )
    )
  document.querySelector('head').appendChild(msViewportStyle)
}