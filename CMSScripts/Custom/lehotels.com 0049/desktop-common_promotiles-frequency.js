var frequencies_json={},
	currentPromo = [];
$(document).ready(function(){
	function setNewPromo(id, key){
		localStorage[key] = id + "," + "1";
		$("#promotile-"+id).show();
	}
	if (window.localStorage) {
		$.each(frequencies_json, function(i, v){
			var key = 'area_'+i;
			if(localStorage[key]){
				currentPromo = localStorage[key].split(",");
				if(isNaN(currentPromo[0]) || isNaN(currentPromo[1]) || frequencies_json[i][currentPromo[0]] == undefined){
					setNewPromo(frequencies_json[i]["first"], key);
					return;
				}
				if(frequencies_json[i][currentPromo[0]]["frequency"]){
					if(frequencies_json[i][currentPromo[0]]["frequency"] > currentPromo[1]){
						$("#promotile-"+currentPromo[0]).show();
						currentPromo[1]++;
						localStorage[key] = currentPromo[0] + "," + currentPromo[1];
					}else{
						setNewPromo(frequencies_json[i][currentPromo[0]]["next_id"], key);
					}
				}else{
					setNewPromo(frequencies_json[i]["first"], key);
				}
			}else{
				setNewPromo(frequencies_json[i]["first"], key);
			}
		});
	}else{
		$('.fr-promo:first-child').show();
	}
});