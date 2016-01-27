var map;
var geocoder;
var markers = {};
var infoWindows = {};
function closestPin(loc){
	var closest = {
		latitude: 0,
		longitude: 0
	};
	locations.forEach(function(e){
		if (distance({x:e.latitude,y:e.longitude},{x:loc.lat(),y:loc.lng()}) < distance({x:closest.latitude,y:closest.longitude},{x:loc.lat(),y:loc.lng()})){
			closest = e;
		}
	});
	map.setCenter({lat:closest.latitude,lng:closest.longitude});
	infoWindows[closest.storeNum].open(map,markers[closest.storeNum]);
}
function distance(a,b){
	return Math.sqrt(Math.pow(a.x - b.x,2) + Math.pow(a.y - b.y,2));
}
function centerMap(){
	var address = document.getElementById('zip').value;
	geocoder = new google.maps.Geocoder();
	geocoder.geocode( { 'address': address}, function(results, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			closestPin(results[0].geometry.location);
		} else {
			alert("Unable to process zip code: " + status);
		}
	});
	location.hash = "map";
}
function keyCheck(e){
	if (e.which === 13){
		centerMap();
	}
}
function initMap(){
	var myLatlng = new google.maps.LatLng(geoip_lat, geoip_long);
	var mapOptions = {
		zoom: 12,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map"),
		mapOptions);
	map.setTilt(0);
	addPins();

	var apiKey = "AIzaSyA_b7MQnxQGupm2TwuAmN7bcHViVzeGqX0";
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			var mapOptions = {
				zoom: 12,
				center: myLatlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			map = new google.maps.Map(document.getElementById("map"),
				mapOptions);
			map.setTilt(0);
			markers = {};
			addPins();
		});
	} else {
		/* geolocation IS NOT available */
	}
	function addPins(){
		var contentString;
		markers = {};
		locations.forEach(function(e){
			var myLatlng = new google.maps.LatLng(e.latitude,e.longitude);
			markers[e.storeNum] = new google.maps.Marker({
				position: myLatlng,
				map: map,
				animation: google.maps.Animation.DROP,
				title: e.centerName
			});
			contentString = "<h3>" + e.centerName + "</h3>" +
			"<p>" + e.address + "</p>" +
			"<p>" + e.city + ", " + e.state + " " + e.zip + "</p>";
			infoWindows[e.storeNum] = new google.maps.InfoWindow({
				content:contentString
			});
			markers[e.storeNum].addListener('click', function() {
				infoWindows[e.storeNum].open(map,markers[e.storeNum]);
			});
		});
	}
	/*for (i = 6; i> 0; i--){
		var myLatlng = new google.maps.LatLng(position.coords.latitude + (Math.random() - .5)/10, position.coords.longitude + (Math.random() - .5)/10);
		markers[positionText] = new google.maps.Marker({
			position: myLatlng,
			map: map,
			animation: google.maps.Animation.DROP,
			title: 'Hello World!'
		});
		var contentString = '<h4>Hello World!</h4>';
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});
		markers[positionText].addListener('click', function() {
			infowindow.open(map, markers[positionText]);
		});
}*/
}

