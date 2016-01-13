var map;
function initMap(){
	var apiKey = "AIzaSyDm-K4-kDFiCg0Z3vkGVERLou78dJZWWCE";
	var myLatlng = new google.maps.LatLng(-34.397, 150.644);
	var mapOptions = {
		zoom: 10,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.HYBRID
	};
	var map = new google.maps.Map(document.getElementById("map"),
		mapOptions);
	map.setTilt(0);
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			var mapOptions = {
				zoom: 12,
				center: myLatlng,
				mapTypeId: google.maps.MapTypeId.HYBRID
			};
			var map = new google.maps.Map(document.getElementById("map"),
				mapOptions);
			map.setTilt(0);
			for (i = 6; i> 0; i--){
				var myLatlng = new google.maps.LatLng(position.coords.latitude + (Math.random() - .5)/10, position.coords.longitude + (Math.random() - .5)/10);
				var marker = new google.maps.Marker({
					position: myLatlng,
					map: map,
					animation: google.maps.Animation.DROP,
					title: 'Hello World!'
				});
			}
			
		});
	} else {
		/* geolocation IS NOT available */
	}
}
