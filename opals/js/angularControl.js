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
		{
			name:'bottle',
			colors:[
			{
				paletteColor: 'white',
				isBlack:true,
				partColors: {
					cap:'#fff',
					lid:'#222',
					bottle:'#222',
					grip:'#222'
				}
			},
			{
				paletteColor: '#333',
				isBlack:true,
				partColors: {
					cap:'#222',
					lid:'#222',
					bottle:'#222',
					grip:'#222'
				}
			},
			{
				paletteColor: 'red',
				isBlack:true,
				partColors: {
					cap:'#ff0000',
					lid:'#222',
					bottle:'#222',
					grip:'#222'
				}
			},
			{
				paletteColor: 'blue',
				isBlack:true,
				partColors: {
					cap:'#0033ff',
					lid:'#222',
					bottle:'#222',
					grip:'#222'
				}
			},
			{
				paletteColor: '#b8e81d;',
				isBlack:true,
				partColors: {
					cap:'#b8e81d',
					lid:'#222',
					bottle:'#222',
					grip:'#222'
				}
			},
			{
				paletteColor: 'orange',
				partColors: {
					cap:'white',
					lid:'orange',
					bottle:'orange',
					grip:'orange'
				}
			},
			{
				paletteColor: 'cyan',
				partColors: {
					cap:'white',
					lid:'cyan',
					bottle:'cyan',
					grip:'cyan'
				}
			},
			{
				paletteColor: 'blue',
				partColors: {
					cap:'white',
					lid:'blue',
					bottle:'blue',
					grip:'blue'
				}
			},
			{
				paletteColor: 'deeppink',
				partColors: {
					cap:'white',
					lid:'deeppink',
					bottle:'deeppink',
					grip:'deeppink'
				}
			},
			{
				paletteColor: 'red',
				partColors: {
					cap:'white',
					lid:'red',
					bottle:'red',
					grip:'red'
				}
			},
			{
				paletteColor: 'purple',
				partColors: {
					cap:'white',
					lid:'purple',
					bottle:'purple',
					grip:'purple'
				}
			},
			{
				paletteColor: '#b8e81d',
				selected:true,
				partColors: {
					cap:'white',
					lid:'#b8e81d',
					bottle:'#b8e81d',
					grip:'#b8e81d'
				}
			},
			]
		}
		]
	}];
	$scope.product = $scope.products[0];
	$scope.textControl = 'font';
	$scope.selectedPart = $scope.product.parts[0].name;
	$scope.setColor = function(color,part){
		for (var prop in color.partColors){
			PaperItems[$scope.product.id]._namedChildren[prop].forEach(function(e){
				e.setFillColor(color.partColors[prop]);
			});
		}
		part.colors.forEach(function(e){
			e.selected = false;
		});
		paper.view.draw();
		color.selected = true;
	};
	$scope.partSelected = function(part){
		if (part === $scope.selectedPart){
			return 'selected';
		}
	};
	$scope.selectPart = function(part){
		$scope.selectedPart = part;
	};
	$scope.dict = function(key){
		return dictionary[key];
	};
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
					paper.view.draw();	
				},
			});
		});
	};
	$scope.addText = function(){
		PaperLayers.content.activate();
		var obj = new paper.PointText({
			point:[0,50],
			content:'Text',
			fontSize:30,
			name:"PaperText"
		});
		obj.name = "PaperText";
		PaperText.push(obj);
		PaperText[PaperText.length-1].position = paper.view.bounds.center;
		$scope.textControl = 'font';
		$scope.selectedObject = PaperText[PaperText.length - 1];
		PaperFunctions.createBoundingBox($scope.selectedObject.bounds);
	};
	$scope.setFont = function(fontName){
		if ($scope.selectedObject){
			$scope.selectedObject.fontFamily = fontName;
		}
		PaperFunctions.updateBoundingBox($scope.selectedObject.bounds);
	};
	$scope.setText = function(event){
		$scope.selectedObject.setContent(event.target.value);
		PaperFunctions.updateBoundingBox($scope.selectedObject.bounds);
	};
	$scope.openFile = function(){
		$('#imageUpload').show();
		$('#imageUpload').focus();
		$('#imageUpload').click();
		$('#imageUpload').hide();
	};
	$scope.accessFile = function(event){
		previewFile(event.target.files[0]);
	};
	$scope.moveSelectedObject = function(direction){
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
		paper.view.draw();
	};
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
	};
	function runSubmit(upload){
		if (upload){
			$('.loadingModal').modal('show');
			$('.submitModal').modal('hide');
			var a = new Date();
			var exportActivate = PaperLayers.export.activate();
			var overlay = new paper.Symbol(PaperLayers.overlay.clone());
			var product = new paper.Symbol(PaperLayers.product.clone());
			//Crop the content
			var raster = PaperLayers.content.rasterize(30);
			var logo = PaperLayers.content.rasterize(300);
			var image = new Image();
			var canvas = document.createElement('canvas');
			image.src = logo.toDataURL();
			//The timeouts are to ensure that the functions are actually completing before going to the next step;
			//They aren't entirely synchronous.
			setTimeout(function(){
				raster.remove();
				logo.remove();
				canvas.width = 2000;
				canvas.height = 1000;
				canvas.getContext('2d').drawImage(image,((PaperLayers.content.bounds.left - 170)*300/72),((PaperLayers.content.bounds.top - 330)*300/72));
				var data = canvas.toDataURL();
				data = data.replace(/^data:image\/png;base64,/, "");
				setTimeout(function(){
					for (var i = PaperLayers.export.children.length - 1; i >= 0; i--){
						PaperLayers.export.children[i].remove();
					}
					PaperLayers.template.activate();
					setTimeout(function(){
						overlay.place(PaperLayers.overlay.bounds.center);
						product.place(PaperLayers.product.bounds.center);
						var raster = new paper.Raster({
							source: canvas.toDataURL(),
							position: PaperLayers.content.bounds.center
						});
						raster.scale(0.24);
						raster.position.set(410,450);
						setTimeout(function(){
							var data2 = PaperLayers.template.rasterize(300).toDataURL();
							$scope.previewImageSource = PaperLayers.template.rasterize(72).toDataURL();
							data2 = data2.replace(/^data:image\/png;base64,/, "");
							var blob = new Blob([data], {type : 'image/png'});
							var blob2 = new Blob([data2],{type: 'image/png'});
							if (upload){
								var formData = new FormData();
								formData.append("logo", blob);
								formData.append("template",blob2);
								formData.append("entry",JSON.stringify($scope.submitForm));
								$scope.submitForm = {};
								var request = new XMLHttpRequest();
								request.open("POST", "http://138.68.192.142:8081/api/svg");
								//console.log(formData, blob, blob2, data2.length, data.length);
								request.send(formData);
								$('.loadingModal').modal('hide');
							} else {
								//Open up the preview modal
								$('.submitModal').modal();
							}
							for (var i = PaperLayers.template.children.length - 1; i >= 0; i--){
								PaperLayers.template.children[i].remove();
							}
							console.log('Rasterize time:', new Date() - a);
						},500);
					},500);
				},500);
			},500);
		} else {
			$scope.previewImageSource = $('#myCanvas')[0].toDataURL();
			//Open up the preview modal
			$('.submitModal').modal();
		}
	}
	$scope.loadPreview = function(){
		runSubmit(false);
	};
	$scope.submit = function(){
		runSubmit(true);
	};
	$timeout($scope.loadSpectrum);
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