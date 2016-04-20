window.PaperLayers = {
	background: new Layer({name:'background'}),
	export: new Layer({name:'export'}),
	template: new Layer({name:'template'}),
	product:new Layer({name:'product'}),
	content: new Layer({name:'contentf'}),
	overlay: new Layer({name:'overlay',visible:true}),
	bound: new Layer({name:'bound'}),
};
window.PaperItems = {};
window.PaperBounds = {};
window.PaperText = [];
window.PaperFunctions = {};
window.project = this.project;

var rotating = false;
var scaling = false;
var startBounds;
var startRotation;
var trash,rotate,scale;
var scope = angular.element(document.querySelector('[ng-controller="designer"]')).scope();
var backgroundRect = function(){
	var controlBack = new Path.Rectangle(new Rectangle(0,0,1000,1000));
	controlBack.fillColor = '#000';
	controlBack.opacity = 0;
	controlBack.bounds.setCenter(paper.view.bounds.center);
};
project.view.resolution = 300;
PaperLayers.background.activate();
backgroundRect();
PaperLayers.product.importSVG('GripColor.svg',function(a,b,c){
	PaperItems.gripColor = a;
	PaperLayers.product.addChild(a);
	PaperItems.gripColor.scale(.21);
	PaperItems.gripColor.position.setX(PaperItems.gripColor.bounds.width/2 + 265);
	PaperItems.gripColor.position.setY(PaperItems.gripColor.bounds.height/2);
	//PaperItems.gripColor.bounds.setCenter(view.center);
});
PaperLayers.product.importSVG('GripOutline.svg',function(a,b,c){
	PaperItems.gripOutline = a;
	PaperLayers.product.addChild(a);
	PaperItems.gripOutline.scale(.21);
	PaperItems.gripOutline.position.setX(PaperItems.gripOutline.bounds.width/2 + 265);
	PaperItems.gripOutline.position.setY(PaperItems.gripOutline.bounds.height/2);
		//PaperItems.gripOutline.bounds.setCenter(view.center + new Point(2,31));
	});
PaperLayers.overlay.importSVG('GripTemplate.svg',function(a,b,c){
	PaperItems.gripTemplate = a;
	PaperLayers.overlay.addChild(a);
	PaperItems.gripTemplate.scale(.21);
	PaperItems.gripTemplate.position.setX(PaperItems.gripTemplate.bounds.width/2);
	PaperItems.gripTemplate.position.setY(PaperItems.gripTemplate.bounds.height/2);
	scope.loaded = true;
	//PaperItems.gripOutline.bounds.setCenter(view.center + new Point(2,31));
});
PaperLayers.bound.importSVG('svg/rotate.svg',function(a,b,c){
	PaperLayers.bound.activate();
	a.name = 'rotate';
	rotate = new Symbol(a);
});
PaperLayers.bound.importSVG('svg/move.svg',function(a,b,c){
	PaperLayers.bound.activate();
	a.name = 'scale';
	scale = new Symbol(a);
});
PaperLayers.bound.importSVG('svg/trash.svg',function(a,b,c){
	PaperLayers.bound.activate();
	a.name = 'trash';
	trash = new Symbol(a);
});
PaperLayers.overlay.activate();
var boundsRect = new Rectangle(new Point(170, 330), new Point(650, 570));
var bounds = new Path.Rectangle(boundsRect);
bounds.strokeColor = '#ff0000';

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
	if (event.item.name == 'PaperText' || event.item.className == 'Raster' || event.item.name == 'import') {
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
	startBounds = null;
	startRotation = null;
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
			//Find the angle delta;
			pointDelta = point -= event.delta;
			var angleDelta = Math.abs(radToDeg(Math.atan(pointDelta.y/pointDelta.x)));
			if (point.x < 0 ) {
				angle -= 180;
				angle *= -1;
			}
			if (point.y < 0 ) angle *= -1;
			//Do the same with the angle delta;
			if (pointDelta.x < 0 ) {
				angleDelta -= 180;
				angleDelta *= -1;
			}
			if (pointDelta.y < 0 ) angleDelta *= -1;
			var rotation = scope.selectedObject.rotation;
			rotation += angle - angleDelta;
			scope.selectedObject.rotation = rotation;
			PaperFunctions.updateBoundingBox(scope.selectedObject.bounds,scope.selectedObject.rotation);
			scope.$apply(function(){
				scope.currentRotation = angle;
			});
		} else if (event.item.name == 'scale' || (!rotating && scaling)){
			if (!startBounds){
				startBounds = scope.selectedObject.bounds;
			}
			scaling = true;
			startBounds.width += event.delta.x;
			startBounds.height += event.delta.y;
			scope.selectedObject.bounds = startBounds;
			PaperFunctions.updateBoundingBox(scope.selectedObject.bounds,scope.selectedObject.rotation);
		} else {
			if (dragObject){
				dragObject.position += event.delta;
				PaperLayers.bound.position += event.delta;
			} else {
				if (event.item.className === 'PointText' || event.item.className == 'Raster' || event.item.name == 'import'){
					dragObject = event.item;
				}
			}
		}
	}
	paper.view.draw();
}

PaperFunctions.updateBoundingBox = function(bounds){
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

	PaperBounds.rotate = rotate.place(new Point(bounds.getTopRight().x + padding/2,bounds.getTopRight().y - padding/2));
	PaperBounds.rotate.name = 'rotate';
	PaperBounds.scale = scale.place(new Point(bounds.getBottomRight().x + padding/2,bounds.getBottomRight().y + padding/2));
	PaperBounds.scale.name = 'scale';
	PaperBounds.trash = trash.place(new Point(bounds.getBottomLeft().x - padding/2,bounds.getBottomLeft().y + padding/2));
	PaperBounds.trash.name = 'trash';
};
function onFrame(event) {
	paper.view.draw();
}
function radToDeg(rad){
	return rad * 180 / Math.PI;
}
