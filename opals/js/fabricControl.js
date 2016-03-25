$(function () {
    boundingBox = '';
    layer = new fabric.Canvas('container');
    layer.perPixelTargetFind = true;
    var shiftDown = false;
    window.addEventListener("keydown", keyboardEvent, false);
    window.addEventListener("keyup", keyboardUpEvent, false);

    function keyboardUpEvent(e) {
        if (e.which == 16) {
            shiftDown = false;
        }
    }

    function keyboardEvent(e) {
        e = window.event || e;
        if (e.which == 16) {
            shiftDown = true;
           // console.log(window.focus());
        }
        if (e.which == 8 || e.which == 46) {
            if (layer.getActiveObject()) {
                if (document.activeElement != $('#textContent')[0]) {
                    deleteObj = layer.getActiveObject();
                    deleteObj.remove();
                    deleteObj.remove();
                    deleteObj = '';
                    e.preventDefault();
                }
            }
        }
    }

    addText = function () {
        var text = new fabric.Text('Enter Text', {
            left: 60,
            top: 275,
            hasControls: true
        });
        layer.add(text);

         boundingBox.sendToBack();
        invisibleBoundingBox.sendToBack();
        classicBottle.sendToBack();
        classicColor.sendToBack();
        classicLid.sendToBack();
        classicCap.sendToBack();
        bbLogo.sendToBack();
        bottleMask.sendToBack();
        maskBackground.sendToBack();
        blenderball.bringToFront();

        layer.setActiveObject(text);
        $('#textControlsButtons').removeClass('hidden');
    };
    $('#upperBackground, #lowerBackground').click(function (e) {
        layer.fire('selection:cleared');
        layer._discardActiveObject();
        layer.renderAll();
    });
    layer.on('object:selected', function (e) {
        var obj = e.target;
        var target;
        selectedObject = obj;
        var oldObject = layer.oldActiveObject;
        layer.oldActiveObject = layer.getActiveObject();
        boundingBox.opacity = 1;
        invisibleBoundingBox.opacity = 1;
        $('.delete-button').removeClass('hidden');
        layer.renderAll();
        if (layer.getActiveObject().text) {
            $('#textControlButtons').removeClass('hidden');
            $('#textContent').val(layer.getActiveObject().text);
            $('#imageControlButtons #colorPick').addClass('hidden');
            $('#imageControlButtons #layersPick').addClass('hidden');

            //Show the text controls when text is selected.
            target = $('#textPick');
            //Make the one toggle selected
            $('#textPick').parent().removeClass('selected');
            $('#bottlePick').parent().removeClass('selected');
            $('#lidPick').parent().removeClass('selected');
            $('#capPick').parent().removeClass('selected');
            $('#overmoldPick').parent().removeClass('selected');
            $('#imagePick').parent().removeClass('selected');
            $(target).parent().addClass('selected');

            //Hide all the unused controls
            $('#textControls').addClass('hidden');
            $('#bottleControls').addClass('hidden');
            $('#lidControls').addClass('hidden');
            $('#capControls').addClass('hidden');
            $('#overmoldControls').addClass('hidden');
            $('#imageControls').addClass('hidden');
            //Show the needed controls
            $('#' + target.data().controls).removeClass('hidden');

        } else if (layer.getActiveObject() instanceof fabric.Image) {
            $('#imageControlButtons #colorPick').addClass('hidden');
            $('#imageControlButtons #layersPick').removeClass('hidden');
            $('#textControlButtons').addClass('hidden');
            //Show the text controls when text is selected.
            target = $('#imagePick');
            //Make the one toggle selected
            $('#textPick').parent().removeClass('selected');
            $('#bottlePick').parent().removeClass('selected');
            $('#lidPick').parent().removeClass('selected');
            $('#capPick').parent().removeClass('selected');
            $('#overmoldPick').parent().removeClass('selected');
            $('#imagePick').parent().removeClass('selected');
            $(target).parent().addClass('selected');

            //Hide all the unused controls
            $('#textControls').addClass('hidden');
            $('#bottleControls').addClass('hidden');
            $('#lidControls').addClass('hidden');
            $('#capControls').addClass('hidden');
            $('#overmoldControls').addClass('hidden');
            $('#imageControls').addClass('hidden');
            //Show the needed controls
            $('#' + target.data().controls).removeClass('hidden');
        } else if (layer.getActiveObject() instanceof fabric.Path) {

            //Show the text controls when text is selected.
            target = $('#imagePick');
            //Make the one toggle selected
            $('#textPick').parent().removeClass('selected');
            $('#bottlePick').parent().removeClass('selected');
            $('#lidPick').parent().removeClass('selected');
            $('#capPick').parent().removeClass('selected');
            $('#overmoldPick').parent().removeClass('selected');
            $('#imagePick').parent().removeClass('selected');
            $(target).parent().addClass('selected');

            //Hide all the unused controls
            $('#textControls').addClass('hidden');
            $('#bottleControls').addClass('hidden');
            $('#lidControls').addClass('hidden');
            $('#capControls').addClass('hidden');
            $('#overmoldControls').addClass('hidden');
            $('#imageControls').addClass('hidden');
            //Show the needed controls
            $('#' + target.data().controls).removeClass('hidden');

            $('#textControlButtons').addClass('hidden');
            $('#imageControlButtons #colorPick').removeClass('hidden');
            $('#imageControlButtons #layersPick').removeClass('hidden');

        } else {
            $('#textControlButtons').addClass('hidden');
            $('#imageControlButtons #colorPick').addClass('hidden');
            $('#imageControlButtons #layersPick').addClass('hidden');
            $('#imageControlButtons #artPick').parent().addClass('selected');
            $('#imageControlButtons #colorPick').parent().removeClass('selected');
            $('#imageControlButtons #layersPick').parent().removeClass('selected');
            $('#imageControlButtons #colorControl').addClass('hidden');
            $('#imageControlButtons #artControl').removeClass('hidden');
            $('#imageControlButtons #layersControl').addClass('hidden');
        }


    });
    layer.on("object:rotating", function (e) {
        var obj = e.target;
        if (shiftDown) {
            var angle = obj.angle;
            angle = 45 * (Math.round(angle / 45));
            obj.angle = angle;
        }
    });
    layer.on('selection:cleared', function (e) {
        if ($('canvas').hasClass('eyedropping')) {
            return null;
        }
        $('#textControlButtons').addClass('hidden');
        $('#imageControlButtons #colorPick').addClass('hidden');
        $('#imageControlButtons #layersPick').addClass('hidden');
        $('#imageControlButtons #artPick').parent().addClass('selected');
        $('#imageControlButtons #colorPick').parent().removeClass('selected');
        $('#imageControlButtons #layersPick').parent().removeClass('selected');
        $('#imageControlButtons #colorControl').addClass('hidden');
        $('#imageControlButtons #artControl').removeClass('hidden');
        $('#imageControlButtons #layersControl').addClass('hidden');
        $('.delete-button').addClass('hidden');
        if (boundingBox) {
            boundingBox.opacity = 0;
            invisibleBoundingBox.opacity = 0;
        }
        layer.renderAll();
    });

    layer.on('mouse:up', function (e) {
        var obj = e.target;
        var target;
        if ($('canvas').hasClass('eyedropping')) {
            var colorVal = obj.fill;
            if ($('#textPick').parent().hasClass('selected')) {
                target = selectedObject;
                layer.setActiveObject(selectedObject);
                $('#textControls .colorPalette .eyedropper').css('background-color', colorVal);
            }
            if ($('#bottlePick').parent().hasClass('selected')) {
                target = classicColor;
                $('#bottleControls .colorPalette .eyedropper').css('background-color', colorVal);
            }
            if ($('#lidPick').parent().hasClass('selected')) {
                target = classicLid;
                $('#lidControls .colorPalette .eyedropper').css('background-color', colorVal);
            }
            if ($('#capPick').parent().hasClass('selected')) {
                target = classicCap;
                $('#capControls .colorPalette .eyedropper').css('background-color', colorVal);
            }
            if ($('#overmoldPick').parent().hasClass('selected')) {
                target = bbLogo;
                $('#overmoldControls .colorPalette .eyedropper').css('background-color', colorVal);
            }
            if ($('#imagePick').parent().hasClass('selected')) {
                target = selectedObject;
                layer.setActiveObject(selectedObject);
                $('#imageControls .colorPalette .eyedropper').css('background-color', colorVal);
            }
            target.fill = colorVal;
            if (target == classicColor) {
                bottleMask.fill = colorVal;
            }
            layer.renderAll();
            layer.defaultCursor = "default";
            $('canvas').removeClass('eyedropping');
        } else {
            if (obj == classicLid) {
               target = $('#lidPick');
            }
            if (obj == classicCap) {
                target = $('#capPick');
            }
            if (obj == classicColor) {
                target = $('#bottlePick');
            }
            if (obj == bbLogo) {
                target = $('#overmoldPick');
            }
            if (target) {
                //Make the one toggle selected
                $('#textPick').parent().removeClass('selected');
                $('#bottlePick').parent().removeClass('selected');
                $('#lidPick').parent().removeClass('selected');
                $('#capPick').parent().removeClass('selected');
                $('#overmoldPick').parent().removeClass('selected');
                $('#imagePick').parent().removeClass('selected');
                $(target).parent().addClass('selected');
                //Hide all the unused controls
                $('#textControls').addClass('hidden');
                $('#bottleControls').addClass('hidden');
                $('#lidControls').addClass('hidden');
                $('#capControls').addClass('hidden');
                $('#overmoldControls').addClass('hidden');
                $('#imageControls').addClass('hidden');
                //Show the needed controls
                $('#' + target.data().controls).removeClass('hidden');
            }
        }
    });
    $('#textFont').change(function () {
        var FontSelect = $('#textFont')[0];
        var FontSelection = (FontSelect.options[FontSelect.selectedIndex].value);
        layer.getActiveObject().fontFamily = FontSelection;
        layer.renderAll();
        console.log(FontSelection);

    });


    function imageUpload() {

        readfiles();
    }
    $('#bottleType').change(function () {
        var BottleSelect = $('#bottleType')[0];
        var BottleSelection = (BottleSelect.options[BottleSelect.selectedIndex].value);

        switch (BottleSelection) {
            case 'classic28':
                //  default:
                fabric.loadSVGFromURL('SVG/classic/classicColor.svg', function (objects, options) {
                    classicColor = fabric.util.groupSVGElements(objects, options);
                    classicColor.set({
                        left: 3,
                        top: 142,
                        fill: '#fff',
                        selectable: false
                    });
                    layer.renderAll();
                });
                fabric.loadSVGFromURL('SVG/classic/classicBottle.svg', function (objects, options) {
                    classicBottle = fabric.util.groupSVGElements(objects, options);
                    classicBottle.set({
                        left: 0,
                        top: 0,
                        fill: '#000',
                        selectable: false
                    });
                    layer.add(classicBottle);

                });
                break;
            case 'classic20':

                break;
        }

    });


    $(function () {



        //            var goodtop, goodleft, boundingObject;
        //
        //            layer.on ("object:moving", function (event) {
        //                var el = event.target;
        //                var bounds = boundingBox;
        //
        //                // suppose el coords is center based
        //
        //                el.left = el.left < el.getBoundingRectWidth() / 2 ? el.getBoundingRectWidth() / 2 : el.left;
        //                el.top = el.top < el.getBoundingRectHeight () / 2 ? el.getBoundingRectHeight() / 2 : el.top;
        //
        //                var right = el.left + el.getBoundingRectWidth() / 2;
        //                var bottom = el.top + el.getBoundingRectHeight() / 2;
        //
        //                el.left = right > bounds.width - el.getBoundingRectWidth() / 2 ? bounds.width - el.getBoundingRectWidth() / 2 : el.left;
        //                el.top = bottom > bounds.height - el.getBoundingRectHeight() / 2 ? bounds.height - el.getBoundingRectHeight() / 2 : el.top;
        //            });


        //            layer.on("object:moving", function(){
        //                var obj = this.relatedTarget;
        //                var bounds = invisibleBoundingBox;
        //                obj.setCoords();
        //                if(!obj.intersectsWithRect(bounds.getBoundingRect())){
        //
        //                    //obj.remove();
        //                    goodtop = obj.top;
        //                    goodleft = obj.left;
        //                    layer.renderAll();
        //                } else {
        //                    obj.setTop(goodtop);
        //                    obj.setLeft(goodleft);
        //                }
        //            });




        //Classic
        /* setTimeout(function(){
            fabric.loadSVGFromURL('SVG/classic/classicCap.svg', function(objects, options) {
                classicCap = fabric.util.groupSVGElements(objects, options);
                classicCap.set({left:44, top:0, fill:'#fff', selectable:false});
                layer.add(classicCap);

            });
        },10);
        setTimeout(function(){
            fabric.loadSVGFromURL('SVG/classic/classicLid.svg', function(objects, options) {
                classicLid = fabric.util.groupSVGElements(objects, options);
                classicLid.set({left:1, top:1, fill:'#f00', selectable:false});
                layer.add(classicLid);
            });
        },50);
        setTimeout(function(){
            fabric.loadSVGFromURL('SVG/classic/classicColor.svg', function(objects, options) {
                classicColor = fabric.util.groupSVGElements(objects, options);
                classicColor.set({left:3, top:142, fill:'#fff', selectable:false});
                layer.add(classicColor);
            });
        },100);
        setTimeout(function(){
             fabric.loadSVGFromURL('SVG/classic/classicBottle.svg', function(objects, options) {
                classicBottle = fabric.util.groupSVGElements(objects, options);
                classicBottle.set({left:0, top:0, fill:'#000', selectable:false});
                layer.add(classicBottle);
            });
        },150);
        setTimeout(function(){
            fabric.loadSVGFromURL('SVG/bblogo.svg', function(objects, options) {
                bbLogo = fabric.util.groupSVGElements(objects, options);
                bbLogo.set({left:83, top:555, fill:'#f00', selectable:false});
                layer.add(bbLogo);
            });
                    },250);
        });*/
    });

    resetCanvas = function () {
        localStorage.blenderBottleSave = '';
        layer.clear();
        fabric.loadSVGFromURL('SVG/classicLoop/classicLoopOutline.svg', function (objects, options) {
            classicBottle = fabric.util.groupSVGElements(objects, options);
            classicBottle.set({
                left: 244,
                top: 45,
                fill: '#000',
                selectable: false
            });
            layer.add(classicBottle);
        });
        boundingBox = new fabric.Rect({
            fill: "rgba(0,0,0,0)",
            /*
          width: 300,
          height: 640,
            top: 0,
            left:0,
            */
            width: 187,
            height: 405,
            top: 235,
            left: 305,
            selectable: false,
            hasBorders: false,
            hasControls: false,
            lockMovementX: true,
            lockMovementY: true,
            evented: false,
            stroke: "red",
            opacity: 0
        });
        layer.add(boundingBox);

        invisibleBoundingBox = new fabric.Rect({
            fill: "rgba(255,0,0,1)",
            /*
          width: 300,
          height: 640,
            top: 0,
            left:0,
            */
            width: 1,
            height: 225,
            top: 320,
            left: 400,
            selectable: false,
            hasBorders: false,
            hasControls: false,
            lockMovementX: true,
            lockMovementY: true,
            evented: false,
            opacity: 0
        });
        layer.add(invisibleBoundingBox);
        layer.renderAll();

        fabric.loadSVGFromURL('SVG/classicLoop/classicLoopCap.svg', function (objects, options) {
            classicCap = fabric.util.groupSVGElements(objects, options);
            classicCap.set({
                left: 249,
                top: 39,
                fill: '#fff',
                selectable: false
            });
            layer.add(classicCap);

        });

        fabric.loadSVGFromURL('SVG/classicLoop/loopLid.svg', function (objects, options) {
            classicLid = fabric.util.groupSVGElements(objects, options);
            classicLid.set({
                left: 259,
                top: 79,
                fill: '#b8e81d',
                selectable: false
            });
            layer.add(classicLid);
        });

        fabric.loadSVGFromURL('SVG/classicLoop/classicLoopColor.svg', function (objects, options) {
            classicColor = fabric.util.groupSVGElements(objects, options);
            classicColor.set({
                left: 266,
                top: 227,
                fill: '#c0e640',
                selectable: false
            });
            layer.add(classicColor);
        });

        fabric.loadSVGFromURL('SVG/classicLoop/loopColor.svg', function (objects, options) {
            bbLogo = fabric.util.groupSVGElements(objects, options);
            bbLogo.set({
                left: 251,
                top: 45,
                fill: '#b8e81d',
                selectable: false
            });
            layer.add(bbLogo);
        });
        fabric.loadSVGFromURL('SVG/classicLoop/bottleMask.svg', function (objects, options) {
            bottleMask = fabric.util.groupSVGElements(objects, options);
            bottleMask.set({
                left: 277,
                top: 230,
                fill: '#c0e640',
                selectable: false,
                opacity: 1
            });
            layer.add(bottleMask);
        });

        fabric.loadSVGFromURL('SVG/submitbackground.svg', function (objects, options) {
            maskBackground = fabric.util.groupSVGElements(objects, options);
            maskBackground.set({
                left: 0,
                top: 0,
                selectable: false,
                opacity: 0
            });
            layer.add(maskBackground);
            maskBackground.sendToBack();
        });

        var imageObj = new Image();
        imageObj.onload = function () {
            blenderball = new fabric.Image(imageObj, {
                top: 565,
                left: 474,
                selectable: false
            });
            layer.add(blenderball);
            layer.renderAll();
        };
        imageObj.src = 'SVG/blenderball.png';

        setTimeout(function () {
             boundingBox.sendToBack();
            invisibleBoundingBox.sendToBack();
            classicBottle.sendToBack();
            classicColor.sendToBack();
            classicLid.sendToBack();
            classicCap.sendToBack();
            bbLogo.sendToBack();
            bottleMask.sendToBack();
            maskBackground.sendToBack();
            blenderball.bringToFront();

            layer.renderAll();
        }, 1100);
    };
});