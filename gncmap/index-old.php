<?php
function getIP() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (! empty($_SERVER['HTTP_X_FORWARDED_FOR'])) 
    {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}
$xml = simplexml_load_file("http://www.geoplugin.net/xml.gp?ip=" . getIP());
?>
<!DOCTYPE html>
<body>
	<style type="text/css">
		html, body { height: 100%; margin: 0; padding: 0; }
		#map { height: 100%; }
	</style>
	<h1>Maps Test</h1>
	<div id="map"></div>
	<script>
		geoip_lat = <?php print $xml->geoplugin_latitude; ?>;
		geoip_long = <?php print $xml->geoplugin_longitude; ?>;
	</script>
	<script src="maps.js"></script>
	<script src="locations.js"></script>
	<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDm-K4-kDFiCg0Z3vkGVERLou78dJZWWCE&callback=initMap" type="text/javascript"></script>
</body>

</html>

