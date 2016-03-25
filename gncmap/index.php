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
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>GNC GoStak® Promotion</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
	<link rel="stylesheet" href="style.css">

</head>
<body>
	<header class="container-fluid">
		<div class="container">
			<div class="row header-row">
				<div class="col-md-3 col-sm-4 col-xs-12">
					<a href="http://blenderbottle.com">
						<div class="logo-bb">
						</div>
					</a>
				</div>
				<div class="col-md-3 col-md-offset-6 col-sm-3 col-sm-offset-4 hidden-xs">
					<div class="logo-gnc">
					</div>
				</div>
			</div>
		</div>
	</header>
	<div class="container-fluid">
		<div class="container">
			<section id="video" class="row">
			<div class="col-sm-7 visible-xs-block">
					<div class="embed-responsive embed-responsive-16by9">
						<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/LVMojwJANWE" frameborder="0" allowfullscreen></iframe>
					</div>
				</div>
				<div class="col-sm-5">
					<div class="row headspace">
						<div class="side-text">
							<span class="top-text">Simple</span><span class="span-inline">.</span>
							<span class="middle-text">Portable</span><span>.</span>
							<span>Versatile.</span>
							<span class="small-text">Find a GoStak® in a GNC near you.</span>
						</div>
					</div>
					<div class="row">
						<div class="zip-search">
							<input type="number" id="zip" class="form-control" placeholder="Zip/Postal Code" onkeyup="keyCheck(event)">
							<button class="search-btn btn btn-default" type="button" onclick="centerMap()">Search</button>
						</div>
					</div>
				</div>
				<div class="col-sm-7 hidden-xs">
					<div class="embed-responsive embed-responsive-16by9">
						<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/LVMojwJANWE" frameborder="0" allowfullscreen></iframe>
					</div>
				</div>
			</section>
		</div>
		<section id="gostak" class="row">
			<div class="container">
				<div class="col-sm-7">
					<img class="img-responsive" src="gostak.jpg" />
				</div>
				<div class="col-sm-5 text-content">
				<h3>Take only what you need</h3>
					<p>The GoStak jars are designed to be sleek and compact, giving you just enough room for your supplements, without invading your gym bag.</p>
					<p>Heading out of town? Take a handful of 150cc jars filled with your post-workout supplements, and you've got an instant recovery shake for every day of the week.</p>
				</div>
			</div>
		</section>
	</div>
			<div id="map" class="container-fluid">
			</div>
	<div class="container">
		<footer class="row">
			<div class="col-sm-12 text-center">
				<p>©2016 BlenderBottle Company. U.S. and Foreign Utility and Design Patents Issued and Pending. All Rights Reserved.</p>
			</div>
		</footer>
	</div>
	<script>
		geoip_lat = <?php print $xml->geoplugin_latitude; ?>;
		geoip_long = <?php print $xml->geoplugin_longitude; ?>;
	</script>
	<script src="maps.js"></script>
	<script src="locations.js"></script>
	<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBLRVMQ-CFuPa09aLjBic8MG2e6z1WIkeM&callback=initMap" type="text/javascript"></script>
</body>
</html>
