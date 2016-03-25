var app = angular.module('designer', ['ngSanitize']);

var spectrumInit;

app.controller('designer', ['$scope', '$rootScope', '$timeout', '$http', function ($scope, $rootScope, $timeout, $http) {
	var dictionary = {
		"tips-and-tricks":"<ul><li>Consider using quotes or motivational phrases in your design</li><li>Make each word it's own layer for added flexibility in color, size, and layout</li><li>Layer, scale, and alter 'pre-approved artwork'</li><li>Use 3rd party illustration software (such as Adobe Illustrator, Photoshop, or Corel Draw, etc.) to create a design and upload it to your bottle</li><li>Consider echoing colors from the bottle in your designs for a integrated look</li><li>Consider keeping the BlenderBottle logo on the bottle, and simply picking unique bottle color combos</li></ul>"
	}
	$scope.products = [{
		name:'28oz SportMixer Grip',
		id:'gripColor',
		parts:[
		'bottle',
		'lid',
		'cap',
		'grip'
		]
	}];
	$scope.product = {
		name:'28oz SportMixer Grip',
		id:'gripColor',
		parts:[
		'bottle',
		'lid',
		'cap',
		'grip'
		]
	};
	$scope.fonts = [
	{
		id:'Arial',
		name:'Arial'
	},
	{
		id:'Georgia',
		name:'Georgia'
	},
	{
		id:'GoudyOldStyle',
		name:'Goudy Old Style'
	},
	{
		id:'1942',
		name:'1942'
	},
	{
		id:'Abel',
		name:'Abel'
	},
	{
		id:'Aclonica',
		name:'Aclonica'
	},
	{
		id:'Akashi',
		name:'Akashi'
	},
	{
		id:'Alegreya',
		name:'Alegreya'
	},
	{
		id:'AlexBrush',
		name:'Alex Brush'
	},
	{
		id:'Allura',
		name:'Allura'
	},
	{
		id:'AnnieUseYourTelescope',
		name:'Annie Use Your Telescope'
	},
	{
		id:'Anton',
		name:'Anton'
	},
	{
		id:'armalite_rifle',
		name:'armalite_rifle'
	},
	{
		id:'Arvo',
		name:'Arvo'
	},
	{
		id:'Audiowide',
		name:'Audiowide'
	},
	{
		id:'AutourOne',
		name:'Autour One'
	},
	{
		id:'azoft-sans',
		name:'azoft-sans'
	},
	{
		id:'Bangers',
		name:'Bangers'
	},
	{
		id:'BadScript',
		name:'Bad Script'
	},
	{
		id:'belligerent',
		name:'belligerent'
	},
	{
		id:'black_jack',
		name:'black_jack'
	},
	{
		id:'BlackOpsOne',
		name:'Black Ops One'
	},
	{
		id:'BOYCOTT_',
		name:'BOYCOTT_'
	},
	{
		id:'BPdots',
		name:'BPdots'
	},
	{
		id:'BPdotsSquareBold',
		name:'BPdotsSquareBold'
	},
	{
		id:'CaesarDressingregular',
		name:'CaesarDressingregular'
	},
	{
		id:'Capture_it',
		name:'Capture_it'
	},
	{
		id:'Capture_it_2',
		name:'Capture_it_2'
	},
	{
		id:'Chewy',
		name:'Chewy'
	},
	{
		id:'Codystar',
		name:'Codystar'
	},
	{
		id:'COLLEGEB',
		name:'COLLEGEB'
	},
	{
		id:'CoveredByYourGrace',
		name:'Covered By Your Grace'
	},
	{
		id:'DaysOne',
		name:'Days One'
	},
	{
		id:'Ewert',
		name:'Ewert'
	},
	{
		id:'IndieFlower',
		name:'Indie Flower'
	},
	{
		id:'JosefinSans',
		name:'Josefin Sans'
	},
	{
		id:'Lato',
		name:'Lato'
	},
	{
		id:'Lobster',
		name:'Lobster'
	},
	{
		id:'Lora',
		name:'Lora'
	},
	{
		id:'Monoton',
		name:'Monoton'
	},
	{
		id:'Orbitron',
		name:'Orbitron'
	},
	{
		id:'Rationale',
		name:'Rationale'
	},
	{
		id:'RockSalt',
		name:'Rock Salt'
	},
	{
		id:'ShadowsIntoLight',
		name:'Shadows Into Light'
	},
	{
		id:'TradeWinds',
		name:'Trade Winds'
	},
	{
		id:'UnifrakturMaguntia',
		name:'UnifrakturMaguntia'
	},
	{
		id:'VastShadow',
		name:'Vast Shadow'
	}
	];
	$scope.textControl = 'font';
	$scope.selectedPart = $scope.product.parts[0];
	$scope.partSelected = function(part){
		if (part === $scope.selectedPart){
			return 'selected';
		}
	}
	$scope.selectPart = function(part){
		$scope.selectedPart = part;
	}
	$scope.dict = function(key){
		return dictionary[key];
	}
	$scope.loadSpectrum = function(){
		var self = this;
		$(".spectrum").each(function(e){
			$(this).spectrum({
				clickoutFiresChange: true,
				showButtons: false,
				showPalette: false,
				flat: true,
				showSelectionPalette: false,
				palette: [
				['black', 'cyan', 'blue'],
				['lime', 'orange', 'deeppink'],
				['red', 'purple', 'white']
				],
				move: function (color) {
					colorValue = blacktitude(color.toHexString());
					if (this.dataset.part == 'selectedText'){
						if ($scope.selectedObject){
							$scope.selectedObject.setFillColor(colorValue);
						}
					} else {
						PaperItems[$scope.product.id]._namedChildren[this.dataset.part].forEach(function(e){
							e.setFillColor(colorValue);
						});
					}
					
				},
				change: function (color) {
					colorValue = blacktitude(color.toHexString());
					if (this.dataset.part == 'selectedText'){
						if ($scope.selectedObject){
							$scope.selectedObject.setFillColor(colorValue);
						}
					} else {
						PaperItems[$scope.product.id]._namedChildren[this.dataset.part].forEach(function(e){
							e.setFillColor(colorValue);
						});
					}		
				}
			});
		});
	};
	$scope.addText = function(){
		PaperLayers.text.activate();
		var obj = new paper.PointText({
			point:[50,50],
			content:'This is my point text',
			fontSize:30
		})
		PaperText.push(obj);
		PaperText[PaperText.length-1].bounds.setCenter(innerWidth/2, innerHeight/2);
		$scope.textControl = 'font';
		$scope.selectedObject = PaperText[PaperText.length-1]
		PaperFunctions.createBoundingBox($scope.selectedObject.bounds);
		paper.view.draw()
	};
	$scope.setFont = function(fontName){
		if ($scope.selectedObject){
			$scope.selectedObject.fontFamily = fontName;
		}
		paper.view.draw()
	};
	$scope.setText = function(event){
		$scope.selectedObject.setContent(event.target.value);
		paper.view.draw()
	};
	$scope.openFile = function(){
		$('#imageUpload').show();
		$('#imageUpload').focus();
		$('#imageUpload').click();
		$('#imageUpload').hide();
	}
	$scope.accessFile = function(event){
		previewFile(event.target.files[0]);
	}
	$scope.moveSelectedObject = function(direction){
		debugger;
		switch(direction){
			case 'back':

			break;
			case 'toBack':
			$scope.selectedObject.moveBelow(PaperText[0]);
			break;
			case 'toFront':
			$scope.selectedObject.moveAbove(PaperText[PaperText.length - 1]);
			break;
			case 'front':
			break;

		}
		paper.view.draw()
	}
	$scope.snapshot = function(){
		$('#snapshotCover').addClass('click');
		setTimeout(function(){
			$('#snapshotCover').addClass('fade');
		},10);
		setTimeout(function(){
			$('#snapshotCover').removeClass('fade');
			$('#snapshotCover').removeClass('click');
			//$('.imageModal').modal();
		},300);
		$scope.previewImageSource = $('#myCanvas')[0].toDataURL();
		$scope.previewImageSVG = project.exportSVG({asString:true});
		//Create the DOM element, add the SVG to it, and turn it into a blob
		var dom = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
		var body = dom.createElement('body');
		body.appendChild(project.exportSVG());
		var sXML = new XMLSerializer().serializeToString(body);
		var blob = new Blob([sXML], {type : 'text/html'});
		var formData = new FormData();
		formData.append("html", blob);
		var request = new XMLHttpRequest();
		request.open("POST", "http://localhost:8081/api/svg");
		request.send(formData);

	}
	
	$timeout($scope.loadSpectrum)
}]);


app.filter('caps',function(){
	return function(input, all){
		var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
		return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';

	}
})

function blacktitude(hex) {
    // Limit blacktitude
    // colorValue = (colorValue);
    function rgbToHex(R, G, B) {
    	return toHex(R) + toHex(G) + toHex(B);
    }

    function toHex(n) {
    	n = parseInt(n, 10);
    	if (isNaN(n)) return "00";
    	n = Math.max(0, Math.min(n, 255));
    	return "0123456789ABCDEF".charAt((n - n % 16) / 16) + "0123456789ABCDEF".charAt(n % 16);
    }

    function hexToR(h) {
    	return parseInt((cutHex(h)).substring(0, 2), 16);
    }

    function hexToG(h) {
    	return parseInt((cutHex(h)).substring(2, 4), 16);
    }

    function hexToB(h) {
    	return parseInt((cutHex(h)).substring(4, 6), 16);
    }

    function cutHex(h) {
    	return (h.charAt(0) == "#") ? h.substring(1, 7) : h;
    }
    var r = hexToR(hex);
    var g = hexToG(hex);
    var b = hexToB(hex);

    if (r < 25) {
    	r = 25;
    }
    if (g < 25) {
    	g = 25;
    }
    if (b < 25) {
    	b = 25;
    }

    return "#" + rgbToHex(r, g, b);
}
function guid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	s4() + '-' + s4() + s4() + s4();
}