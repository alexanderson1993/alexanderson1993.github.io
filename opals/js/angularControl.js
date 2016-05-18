var app = angular.module('designer', ['ngSanitize']);

var spectrumInit;

app.controller('designer', ['$scope', '$rootScope', '$timeout', '$http', function ($scope, $rootScope, $timeout, $http) {
	var dictionary = {
		"tips-and-tricks":"<ul><li>Consider using quotes or motivational phrases in your design</li><li>Make each word it's own layer for added flexibility in color, size, and layout</li><li>Layer, scale, and alter 'pre-approved artwork'</li><li>Use 3rd party illustration software (such as Adobe Illustrator, Photoshop, or Corel Draw, etc.) to create a design and upload it to your bottle</li><li>Consider echoing colors from the bottle in your designs for a integrated look</li><li>Consider keeping the BlenderBottle logo on the bottle, and simply picking unique bottle color combos</li></ul>",
		"contest-description":"<p>Use the palette at the side to pick what color you would like your bottle to be. Online Private Label Designed bottles can only be stock SportMixer&trade; colors.</p><p>Switch to the text or image controls with the icons to the side of the design palette.</p><p>Designs must fit within the red printable area on the bottle. Any content outside of the red box will automatically be cropped from the bottle design.</p>",
		"terms-and-conditions":"<ul><li>You represent and warrant that you legally own the trademarks, logos, designs, or other identifiers (“Marks”) depicted on the template(s) associated with this order. &nbsp;You hereby grant to Sundesa (dba BlenderBottle) authorization to use the Marks in the production of this order. You authorize Sundesa to use images and physical copies of the products created by Sundesa for your company in Sundesa’s marketing and other promotional materials including its website. The use of the Marks is authorized until revoked in writing.</li><li>You hereby agree to pay in full the charges associated with this order, and further agree to indemnify Sundesa (dba BlenderBottle) and hold it harmless for all claims and liability of any kind arising out of Sundesa's incorporation of any Marks, logos and other subject matter in and on any private label products made for you, including any fees, costs and expenses for defense of any claim related to or arising out of use of the requested private labeling.</li><li>You agree not to take any steps to challenge the validity of any of Sundesa’s patents, patents pending, or patent applications, such as through IPR, re-examination or post-grant review.<br></li><li>Extra fees may apply for items requested or changed after final order approval. &nbsp;Rush fees may apply for expedited orders.<br></li><li>Any changes to the Marks after approving this form will result in an additional $200 change fee. Once production on the order has begun no changes will be allowed.<br></li><li>All shipping dates are subject to change due to unforeseen production or shipping delays.<br></li><li>Lift gate, residential delivery, or inside delivery services will result in additional fees not included in standard (ground) shipping charges. If any of these services are requested after the order has been processed, fees will be charged at the time of delivery.<br></li><li>Warehouse fees may be applied if product is to be warehoused by Sundesa or stored for more than seven days from agreed upon ship date.</li></ul>"
	};
	$scope.tipsOpen = false;
	$scope.products = [{
		name:'28oz SportMixer Grip',
		id:'gripColor',
		printableSizes:[
		{
			name:'Small',
			width:200,
			height:240,
			originX:282,
			originY:330
		},
		{
			name:'Medium',
			width:340,
			height:240,
			originX:220,
			originY:330
		},
		{
			name:'Full Size',
			width:480,
			height:240,
			originX:170,
			originY:330
		}

		],
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
	$('[data-toggle="popover"]').popover({html:true});
	$scope.submitting = false;
	$scope.product = $scope.products[0];
	$scope.printableSize = $scope.products[0].printableSizes[0];
	$scope.textControl = 'font';
	$scope.selectedPart = $scope.product.parts[0].name;
	$scope.openTips = function(){
		if (!$scope.tipsOpen){
			$scope.tipsOpen = 'open';
		} else {
			$scope.tipsOpen = false;
		}
	};
	$scope.changePrintableArea = function($event){
		$scope.printableSize = $scope.product.printableSizes.filter(function(e){
			if ($event.target.value === e.name) return e;
		})[0];
		PaperFunctions.resetBounds();
	};
	$scope.setColor = function(color,part){
		for (var prop in color.partColors){
			//Find the correct child of the Product paperlayer
			PaperLayers.product.children.forEach(function(e){
				if (e._namedChildren[prop]){
					e._namedChildren[prop].forEach(function(r){
						r.setFillColor(color.partColors[prop]);
					});
				}
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
	$scope.saveCanvas = function(){

	};
	$scope.loadSpectrum = function(){
		var self = this;
		setTimeout(function(){
			PaperFunctions.resetBounds();
		},1000);
		var card = new Card({
		    // a selector or DOM element for the form where users will
		    // be entering their information
		    form: 'form', // *required*
		    // a selector or DOM element for the container
		    // where you want the card to appear
		    container: '.card-wrapper', // *required*

		    formSelectors: {
		        numberInput: 'input#number', // optional — default input[name="number"]
		        expiryInput: 'input#expiry', // optional — default input[name="expiry"]
		        cvcInput: 'input#cvc', // optional — default input[name="cvc"]
		        nameInput: 'input#name' // optional - defaults input[name="name"]
		    },

		    width: 200, // optional — default 350px
		    formatting: true, // optional - default true

		    // Strings for translation - optional
		    messages: {
		        validDate: 'valid\ndate', // optional - default 'valid\nthru'
		        monthYear: 'mm/yyyy', // optional - default 'month/year'
		    },

		    // Default placeholders for rendered fields - optional
		    placeholders: {
		    	number: 'xxxx xxxx xxxx xxxx',
		    	name: 'Full Name',
		    	expiry: 'xx/xx',
		    	cvc: 'xxx'
		    },

		    // if true, will log helpful messages for setting up Card
		    debug: true // optional - default false
		});
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
			$scope.submitting = true;
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
			image.onload = function(){
				raster.remove();
				logo.remove();
				canvas.width = $scope.printableSize.width * 300 / 72;
				canvas.height = $scope.printableSize.height * 300 / 72;
				canvas.getContext('2d').drawImage(image,((PaperLayers.content.bounds.left - $scope.printableSize.originX) * 300 / 72),((PaperLayers.content.bounds.top - $scope.printableSize.originY) * 300 / 72));
				var data = canvas.toDataURL();
				data = data.replace(/^data:image\/png;base64,/, "");
				for (var i = PaperLayers.export.children.length - 1; i >= 0; i--){
					PaperLayers.export.children[i].remove();
				}
				PaperLayers.template.activate();
				setTimeout(function(){
					overlay.place(PaperLayers.overlay.bounds.center);
					product.place(PaperLayers.product.bounds.center);
					var canvasRaster = new paper.Raster({
						source: canvas.toDataURL(),
						position: PaperLayers.content.bounds.center
					});
					canvasRaster.scale(0.24);
					var rasterPosX = $scope.printableSize.originX + ($scope.printableSize.width / 2);
					var rasterPosY = $scope.printableSize.originY + ($scope.printableSize.height / 2);
					canvasRaster.position.set(rasterPosX,rasterPosY);
					setTimeout(function(){
						var data2 = PaperLayers.template.rasterize(300).toDataURL();
						//$scope.previewImageSource = PaperLayers.template.rasterize(72).toDataURL();
						data2 = data2.replace(/^data:image\/png;base64,/, "");
						var blob = new Blob([data], {type : 'image/png'});
						var blob2 = new Blob([data2],{type: 'image/png'});
						if (upload){
							var formData = new FormData();
							formData.append("logo", blob);
							formData.append("template",blob2);
							formData.append("entry",JSON.stringify($scope.submitForm));
							formData.append("sizes",JSON.stringify($scope.printableSize));
							formData.append("templateSize",JSON.stringify({width:PaperLayers.template.bounds.width,height:PaperLayers.template.bounds.height}));
							$scope.submitForm = {};
							var request = new XMLHttpRequest();
							request.open("POST", "http://localhost:4456/api/svg");
							request.send(formData);
							$scope.submitting = false;
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
			};
			image.src = logo.toDataURL();
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
	$scope.frontsideClass = 'frontside';
	$scope.submitNext = function(){
		$scope.backsideClass = 'backside';
		$scope.frontsideClass = '';
	};
	$scope.submitBack = function(){
		$scope.backsideClass = '';
		$scope.frontsideClass = 'frontside';
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

	};
});
function closePopover(){
	$('[data-toggle="popover"]').popover('hide');
}
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