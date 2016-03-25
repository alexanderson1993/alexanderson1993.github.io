window.PaperLayers = {
	overlay: new Layer({name:'overlay',visible:true}),
	product:new Layer({name:'product'}),
	text: new Layer({name:'text'}),
	images: new Layer({name:'images'}),
	bound: new Layer({name:'bound'})
};
window.PaperItems = {};
window.PaperBounds = {};
window.PaperText = [];
window.PaperFunctions = {};
window.project = this.project;

var rotating = false;
var scaling = false;

var scope = angular.element(document.querySelector('[ng-controller="designer"]')).scope();
PaperLayers.product.activate();
var controlBack = new Path.Rectangle(new Rectangle(0,0,1000,1000));
controlBack.fillColor = '#fff';
controlBack.opacity = 0;
controlBack.bounds.setCenter(window.innerWidth/2,window.innerHeight/2.2);
PaperLayers.product.importSVG('GripColor.svg',function(a,b,c){
	PaperLayers.product.activate();
	PaperItems.gripColor = a;
	PaperItems.gripColor.scale(.21);
	PaperItems.gripColor.bounds.setCenter(view.center);
});
PaperLayers.overlay.activate();
PaperLayers.overlay.importSVG('GripOutline.svg',function(a,b,c){
	PaperLayers.overlay.activate();
	PaperItems.gripOutline = a;
	PaperItems.gripOutline.scale(.21);
	PaperItems.gripOutline.bounds.setCenter(view.center + new Point(2,31));
});

var PaperSelectedObject, dragObject, path;
var movePath = false;
var hitOptions = {
	segments: true,
	stroke: true,
	fill: true,
	tolerance: 5
};
function onMouseDown(event) {
	PaperSelectedObject = path = null;
	if (event.item.className == 'PointText' || event.item.className == 'Raster') {
		PaperSelectedObject = event.item;
		scope.$apply(function(){
			scope.textControl = 'font';
			scope.selectedObject = PaperSelectedObject;
			PaperFunctions.createBoundingBox(event.item.bounds);
		});
	} else if (event.item.name == 'rotate' || event.item.name == 'scale'){

	} else {
		if (event.item.name == 'trash'){
			scope.selectedObject.remove();
		}
		scope.$apply(function(){
			scope.selectedObject = null;
			for (var i = PaperLayers.bound.children.length - 1; i >= 0; i--){
				PaperLayers.bound.children[i].remove();
			};
		});
	}
}

function onMouseUp(event){
	dragObject = null;
	rotating = false;
	scaling = false;
}

function onMouseDrag(event) {
	if (event.item){
		if (event.item.name == 'rotate' || (rotating && !scaling) ){
			rotating = true;
			var center = scope.selectedObject.bounds.center;
			var point = event.point;
			point.x -= center.x;
			point.y -= center.y;
			var angle = Math.abs(radToDeg(Math.atan(point.y/point.x)));
			if (point.x < 0 ) {
				angle -= 180
				angle *= -1;
			};
			if (point.y < 0 ) angle *= -1;
			angle += 10.520784313874362
			scope.selectedObject.rotation = angle;
			PaperFunctions.updateBoundingBox(scope.selectedObject.bounds,scope.selectedObject.rotation);
			scope.$apply(function(){
				scope.currentRotation = angle;
			});
		} else if (event.item.name == 'scale' || (!rotating && scaling)){
			scaling = true;
			scope.selectedObject.scaling += event.delta/100;
			PaperFunctions.updateBoundingBox(scope.selectedObject.bounds,scope.selectedObject.rotation);
		} else {
			if (dragObject){
				dragObject.position += event.delta;
				PaperLayers.bound.position += event.delta;
			} else {
				if (event.item.className === 'PointText' || event.item.className == 'Raster'){
					dragObject = event.item;
				}
			}
		}
	}
	paper.view.draw();
}

PaperFunctions.updateBoundingBox = function(bounds,rotation){
	//Remove the original bounds path and replace it with the updated one.
	for (var i = PaperLayers.bound.children.length - 1; i >= 0; i--){
		if (PaperLayers.bound.children[i].name == 'BoundPath'){
			PaperLayers.bound.children[i].remove();
		}
	};
	var padding = 15;
	var boundPath = new Path();
	boundPath.name = 'BoundPath';
	boundPath.strokeColor = '#0af';
	boundPath.add(new Point(bounds.getTopRight() + 		new Point(padding,-1 * padding)));
	boundPath.add(new Point(bounds.getTopRight() + 		new Point(0, -1 * padding)));
	boundPath.add(new Point(bounds.getTopRight()));
	boundPath.add(new Point(bounds.getTopRight() + 		new Point(padding, 0)));
	boundPath.add(new Point(bounds.getTopRight() + 		new Point(padding,-1 * padding)));

	boundPath.add(new Point(bounds.getBottomRight() + 	new Point(padding,padding)));
	boundPath.add(new Point(bounds.getBottomRight() + 	new Point(padding,0)));
	boundPath.add(new Point(bounds.getBottomRight()));
	boundPath.add(new Point(bounds.getBottomRight() + 	new Point(0,padding)));
	boundPath.add(new Point(bounds.getBottomRight() + 	new Point(padding,padding)));

	boundPath.add(new Point(bounds.getBottomLeft() + 	new Point(-1 * padding,padding)));
	boundPath.add(new Point(bounds.getBottomLeft() + 	new Point(0,padding)));
	boundPath.add(new Point(bounds.getBottomLeft()));
	boundPath.add(new Point(bounds.getBottomLeft() + 	new Point(-1 * padding,0)));
	boundPath.add(new Point(bounds.getBottomLeft() + 	new Point(-1 * padding,padding)));

	boundPath.add(new Point(bounds.getTopLeft() + 		new Point(-1 * padding,-1 * padding)));
	boundPath.add(new Point(bounds.getTopLeft() + 		new Point(-1 * padding,0)));
	boundPath.add(new Point(bounds.getTopLeft()));
	boundPath.add(new Point(bounds.getTopLeft() + 		new Point(0,-1 * padding)));
	boundPath.add(new Point(bounds.getTopLeft() + 		new Point(-1 * padding,-1 * padding)));

	boundPath.add(new Point(bounds.getTopRight() + 		new Point(padding,-1 * padding)));
	PaperBounds.rotate.position.set(bounds.getTopRight().x + padding/2,bounds.getTopRight().y - padding/2);

	PaperBounds.scale.position.set(bounds.getBottomRight().x + padding/2,bounds.getBottomRight().y + padding/2);

	PaperBounds.trash.position.set(bounds.getBottomLeft().x - padding/2,bounds.getBottomLeft().y + padding/2);
};

PaperFunctions.createBoundingBox = function(bounds,rotation){
	//gotta check if the SVGs have loaded
	var svgLoads = 3;
	PaperLayers.bound.activate();
	for (var i = PaperLayers.bound.children.length - 1; i >= 0; i--){
		PaperLayers.bound.children[i].remove();
	};
	var padding = 15;
	var boundPath = new Path();
	boundPath.name = 'BoundPath';
	boundPath.strokeColor = '#0af';
	boundPath.add(new Point(bounds.getTopRight() + 		new Point(padding,-1 * padding)));
	boundPath.add(new Point(bounds.getTopRight() + 		new Point(0, -1 * padding)));
	boundPath.add(new Point(bounds.getTopRight()));
	boundPath.add(new Point(bounds.getTopRight() + 		new Point(padding, 0)));
	boundPath.add(new Point(bounds.getTopRight() + 		new Point(padding,-1 * padding)));

	boundPath.add(new Point(bounds.getBottomRight() + 	new Point(padding,padding)));
	boundPath.add(new Point(bounds.getBottomRight() + 	new Point(padding,0)));
	boundPath.add(new Point(bounds.getBottomRight()));
	boundPath.add(new Point(bounds.getBottomRight() + 	new Point(0,padding)));
	boundPath.add(new Point(bounds.getBottomRight() + 	new Point(padding,padding)));

	boundPath.add(new Point(bounds.getBottomLeft() + 	new Point(-1 * padding,padding)));
	boundPath.add(new Point(bounds.getBottomLeft() + 	new Point(0,padding)));
	boundPath.add(new Point(bounds.getBottomLeft()));
	boundPath.add(new Point(bounds.getBottomLeft() + 	new Point(-1 * padding,0)));
	boundPath.add(new Point(bounds.getBottomLeft() + 	new Point(-1 * padding,padding)));

	boundPath.add(new Point(bounds.getTopLeft() + 		new Point(-1 * padding,-1 * padding)));
	boundPath.add(new Point(bounds.getTopLeft() + 		new Point(-1 * padding,0)));
	boundPath.add(new Point(bounds.getTopLeft()));
	boundPath.add(new Point(bounds.getTopLeft() + 		new Point(0,-1 * padding)));
	boundPath.add(new Point(bounds.getTopLeft() + 		new Point(-1 * padding,-1 * padding)));

	boundPath.add(new Point(bounds.getTopRight() + 		new Point(padding,-1 * padding)));

	PaperLayers.bound.importSVG('svg/rotate.svg',function(a,b,c){
		PaperLayers.bound.activate();
		PaperBounds.rotate = a;
		PaperBounds.rotate.name = 'rotate';
		PaperBounds.rotate.position.set(bounds.getTopRight().x + padding/2,bounds.getTopRight().y - padding/2);
		svgLoads --;
	});
	PaperLayers.bound.importSVG('svg/move.svg',function(a,b,c){
		PaperLayers.bound.activate();
		PaperBounds.scale = a;
		PaperBounds.scale.name = 'scale';
		PaperBounds.scale.position.set(bounds.getBottomRight().x + padding/2,bounds.getBottomRight().y + padding/2);
		svgLoads --;
	});
	PaperLayers.bound.importSVG('svg/trash.svg',function(a,b,c){
		PaperLayers.bound.activate();
		PaperBounds.trash = a;
		PaperBounds.trash.name = 'trash';
		PaperBounds.trash.position.set(bounds.getBottomLeft().x - padding/2,bounds.getBottomLeft().y + padding/2);
		svgLoads --;
	});
	/*PaperLayers.bound.importSVG('svg/rotate.svg',function(a,b,c){
		PaperLayers.bound.activate();
		PaperBounds.rotate = a;
		PaperBounds.rotate.name = 'rotate';
		PaperBounds.rotate.position.set(bounds.getTopRight().x + padding/2,bounds.getTopRight().y - padding/2);
	});*/

}

function radToDeg(rad){
	return rad * 180 / Math.PI;
}