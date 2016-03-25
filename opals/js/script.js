 $(function () {
     if (window != window.top) { // inside iframe
         document.body.style.backgroundColor = 'transparent';
         // or document.body.style.background = 'none';
     }
     $('[data-toggle="popover"]').popover({
         html: true
     });
     closeModal = function () {
         $('[data-toggle="popover"]').popover('hide');

     };
     $('#finishedForm').submit(function () {
            $('.submitModal').modal('hide');
            $('.loadingModal').modal('show');
            layer.fire('selection:cleared');
           layer._discardActiveObject();
            classicColor.sendToBack();
            maskBackground.opacity = 1;
            maskBackground.bringToFront();
            bbLogo.bringToFront();
            classicCap.bringToFront();
            classicLid.bringToFront();
            bottleMask.bringToFront();
            classicBottle.bringToFront();
            blenderball.bringToFront();
            layer.renderAll();

         var canvas = document.getElementById('container');
         var img = canvas.toDataURL('image/png');
         $('<input type="hidden" name="EntryForm[bottleData]"/>').val(img).appendTo('#finishedForm');
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
            maskBackground.opacity = 0;

            layer.renderAll()
         $.post($(this).attr('action'), {
             'EntryForm[bottleData]': img,
             'EntryForm[name]': $('#name').val(),
             'EntryForm[email]': $('#email').val()
         }, function (r) {
             // The following should be revised to appropriately handle errors and tell the user what to do
             // A growl-esque notification or even an inline error would be appropriate
             // Then forwarding to a receipt page to let them know they built their bottle could be in order.
             if (r.error) {
                 console.error(r.errorMsg);
                 $('.loadingModal').modal('hide');
                 $('.errorModal').modal('show');
             } else {
                 console.log("It worked!");
                 $('.loadingModal').modal('hide');
                 $('.socialModal').modal('show');
             }
         });
         return false;
     });

     validateForm = function () {
        console.log('blah');
        var x = $('#email').val();
        var atpos = x.indexOf("@");
        var dotpos = x.lastIndexOf(".");
        if (atpos< 1 || dotpos<atpos+2 || dotpos+2>=x.length) {
            $('input[type="email"]').addClass('error');
            return false;
        }
        $('input[type="email"]').removeClass('error');
        return true;
    }

    checkForm = function() {
        if (validateForm() && $('#termsCheckbox')[0].checked && $('#name').val() != false){
            $('#finishedForm button[type="submit"]').removeAttr('disabled');
         } else {
             $('#finishedForm button[type="submit"]').attr('disabled', 'disabled');
         }

    }
    termsCheck = function (checkbox) {
         checkForm();
     };
     document.querySelector('#fileSelect').addEventListener('click', function (e) {
         // Use the native click() of the file input.
         document.querySelector('#imageUpload').click();
     }, false);
     $('#textFont').click(function (e) {
         if (e.target.getAttribute('data-font')) {
             var FontSelection = (e.target.getAttribute('data-font'));
             layer.getActiveObject().fontFamily = FontSelection;
             layer.renderAll();
         }
     });
     insertText = function () {
         layer.getActiveObject().text = $("#textContent").val();
         layer.renderAll();
     };
     changeLineHeight = function () {
         console.log('dragging!');
         layer.getActiveObject().lineHeight = ($('#lineHeight').val() / 100);
         layer.renderAll();

     };
     sumbitImage = function() {
         layer.fire('selection:cleared');
           layer._discardActiveObject();
            classicColor.sendToBack();
            maskBackground.opacity = 1;
            maskBackground.bringToFront();
            bbLogo.bringToFront();
            classicCap.bringToFront();
            classicLid.bringToFront();
            bottleMask.bringToFront();
            classicBottle.bringToFront();
            blenderball.bringToFront();
            layer.renderAll();
        var canvas = document.getElementById('container');
         var img = canvas.toDataURL('image/png');
                 $('#submitImage').attr('src', img);
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
            maskBackground.opacity = 0;

            layer.renderAll()

                      };
     saveImage = function () {
         invisibleBoundingBox.sendToBack();
         classicColor.sendToBack();
         maskBackground.bringToFront();
         bbLogo.bringToFront();
         classicCap.bringToFront();
         classicLid.bringToFront();
         bottleMask.bringToFront();
         boundingBox.bringToFront();
         classicBottle.bringToFront();
         blenderball.bringToFront();
         layer.renderAll();


         localStorage.blenderBottleSave = JSON.stringify(layer);


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
            layer.renderAll()
     };
     loadImage = function () {
         if (localStorage.blenderBottleSave) {
             layer.clear();
             layer.loadFromJSON(localStorage.blenderBottleSave);
             setTimeout(function () {
                 layer.renderAll();
                 layer._objects.forEach(function (obj) {
                     if (!(obj instanceof fabric.Image || obj instanceof fabric.Text || obj.strokeLineCap == "round")) {
                         obj.selectable = false;
                     }
                 });
                 classicColor = layer._objects[0];
                 invisibleBoundingBox = layer._objects[1];
                 maskBackground = layer._objects[layer._objects.length - 8];
                 bbLogo = layer._objects[layer._objects.length - 7];
                 classicCap = layer._objects[layer._objects.length - 6];
                 classicLid = layer._objects[layer._objects.length - 5];
                 bottleMask = layer._objects[layer._objects.length - 4];
                 boundingBox = layer._objects[layer._objects.length - 3];
                 classicBottle = layer._objects[layer._objects.length - 2];
                 blenderball = layer._objects[layer._objects.length - 1];
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
                    layer.renderAll()

             }, 500);
         }

     };
     $('.delete-button').click(function (e) {
         deleteObj = layer.getActiveObject();
         deleteObj.remove();
         deleteObj.remove();
         deleteObj = '';
         e.preventDefault();
     });
     $('#snapshot').click(function (e) {
        layer.fire('selection:cleared');
        layer._discardActiveObject();
        classicColor.sendToBack();
        maskBackground.opacity = 1;
        maskBackground.bringToFront();
        bbLogo.bringToFront();
        classicCap.bringToFront();
        classicLid.bringToFront();
        bottleMask.bringToFront();
        classicBottle.bringToFront();
        blenderball.bringToFront();

        layer.renderAll();
        var canvas = document.getElementById('container');
        var img = canvas.toDataURL('image/png');
        $('#snapshotImage').attr('src', img);
        $('#snapshotDownload').attr('href', img);
        $('#snapshotDownload').attr('download', 'DYOBB_Snapshot.png');

        $('#snapshotCover').addClass('click');
          //  console.log('click');
            setTimeout(function () {
                 $('#snapshotCover').css('opacity', 0);
            }, 100);
            setTimeout(function () {
                $('#snapshotCover').removeClass('click');
                $('#snapshotCover').css('opacity', 1);
                //console.log('clickOff');
                $('.imageModal').modal('show');

                boundingBox.sendToBack();
                invisibleBoundingBox.sendToBack();
                classicBottle.sendToBack();
                classicColor.sendToBack();
                classicLid.sendToBack();
                classicCap.sendToBack();
                bbLogo.sendToBack();
                bottleMask.sendToBack();
                maskBackground.opacity = 0;
                maskBackground.sendToBack();
                blenderball.bringToFront();

                layer.renderAll();

             }, 350);

     });
     $('#feedbackButton').click(function (e) {
         $('#feedback').toggleClass('open');

     });
     $('#sidebarButtons a').click(function (e) {
         var target = e.target;
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
         $('#' + target.dataset.controls).removeClass('hidden');
     });

     $('#imageControlsPicker a').click(function (e) {
         var target = e.target;
         //Make the one toggle selected
         $('#imageControlButtons #artPick').parent().removeClass('selected');
         $('#imageControlButtons #colorPick').parent().removeClass('selected');
         $('#imageControlButtons #layersPick').parent().removeClass('selected');
         $(target).parent().addClass('selected');

         //Hide all the unused controls
         $('#imageControlButtons #colorControl').addClass('hidden');
         $('#imageControlButtons #artControl').addClass('hidden');
         $('#imageControlButtons #layersControl').addClass('hidden');
         //Show the needed controls
         $('#imageControlButtons #' + target.dataset.controls).removeClass('hidden');
     });

     $('#textControlsPicker a').click(function (e) {
         var target = e.target;
         //Make the one toggle selected
         $('#textControlButtons #fontPick').parent().removeClass('selected');
         $('#textControlButtons #colorPick').parent().removeClass('selected');
         $('#textControlButtons #alignPick').parent().removeClass('selected');
         $('#textControlButtons #layersPick').parent().removeClass('selected');
         $(target).parent().addClass('selected');

         //Hide all the unused controls
         $('#textControlButtons #colorControl').addClass('hidden');
         $('#textControlButtons #FontControl').addClass('hidden');
         $('#textControlButtons #alignControl').addClass('hidden');
         $('#textControlButtons #layersControl').addClass('hidden');
         //Show the needed controls
         $('#textControlButtons #' + target.dataset.controls).removeClass('hidden');
     });
     $('#alignControl a').click(function (e) {
         var target = e.target;
         //Make the one toggle selected
         $('.alignLeft').parent().removeClass('selected');
         $('.alignRight').parent().removeClass('selected');
         $('.alignCenter').parent().removeClass('selected');
         $('.alignJustify').parent().removeClass('selected');
         $(target).parent().addClass('selected');
         switch (target.className) {
             case 'alignRight':
                 layer.getActiveObject().textAlign = 'right';
                 break;
             case 'alignCenter':
                 layer.getActiveObject().textAlign = 'center';
                 break;
             case 'alignLeft':
                 layer.getActiveObject().textAlign = 'left';
                 break;
             case 'alignJustify':
                 bbLogo.setFill(colorValue);
                 break;
         }
         layer.renderAll();
     });
     $('#layersControl a').click(function (e) {
         var target = e.target;
         switch (target.className) {
             case 'moveBack':
                 layer.getActiveObject().sendBackwards();
                 break;
             case 'moveToBack':
                 layer.getActiveObject().sendToBack();
                 break;
             case 'moveToFront':
                 layer.getActiveObject().bringToFront();
                 break;
             case 'moveForward':
                 layer.getActiveObject().bringForward();
                 break;
         }
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

     });
     $('#artwork').click(function (e) {
         targetImage = e.target.dataset.art;
         fabric.loadSVGFromURL(('SVG/artwork/' + targetImage + '.svg'), function (objects, options) {
             userArt = fabric.util.groupSVGElements(objects, options);
             userArt.set({
                 width: 190,
                 left: 175,
                 top: 200,
                 fill: '#000',
                 selectable: true,
                 strokeLineCap: 'round'
             });
             layer.add(userArt);
             layer.setActiveObject(userArt);
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
         });
     });
     $('.colorPalette li').click(function (e) {
         var colorParent = e.target;
         changePalette(colorParent);
     });
     changePalette = function (colorElem) {
         var colorParent = '.' + colorElem.parentElement.className;
         $(colorParent + ' .white').removeClass('selected');
         $(colorParent + ' .black').removeClass('selected');
         $(colorParent + ' .cyan').removeClass('selected');
         $(colorParent + ' .blue').removeClass('selected');
         $(colorParent + ' .purple').removeClass('selected');
         $(colorParent + ' .deeppink').removeClass('selected');
         $(colorParent + ' .red').removeClass('selected');
         $(colorParent + ' .orange').removeClass('selected');
         $(colorParent + ' .yellow').removeClass('selected');
         $(colorParent + ' .b8e81d').removeClass('selected');
         $(colorParent + ' .brown').removeClass('selected');
         $(colorParent + ' .transparent').removeClass('selected');
         $(colorParent + ' .gray').removeClass('selected');
         $(colorParent + ' .eyedropper').removeClass('selected');
         //if colorElem
         var colorTarget = colorElem.parentElement.className;
         var colorValue = $(colorElem).attr('data-color');
         if (colorValue == "eyedropper") {
             //colorValue = $('.user').attr('data-color');
             $('canvas').addClass('eyedropping');
             layer.defaultCursor = "crosshair";
         } else {
             $(colorElem).addClass('selected');
             $('canvas').removeClass('eyedropping');
             console.log(colorValue);
             if (colorValue != 'transparent') {colorValue = blacktitude(colorValue);}
             $("#" + colorTarget).spectrum("set", colorValue);

             switch (colorTarget) {
                 case 'classicColor':
                     classicColor.setFill(colorValue);
                     bottleMask.setFill(colorValue);
                     break;
                 case 'lidColor':
                     classicLid.setFill(colorValue);
                     break;
                 case 'capColor':
                     classicCap.setFill(colorValue);
                     break;
                 case 'logoColor':
                     bbLogo.setFill(colorValue);
                     break;
                 case 'imageColor':
                     layer.getActiveObject().setFill(colorValue);
                     break;
                 case 'textColor':
                     layer.getActiveObject().setFill(colorValue);
                     break;
             }
             layer.renderAll();
         }
     };
     $('.rightArrow').click(function (e) {
         if ($(e.target.parentElement)[0].id != $('#imageControls')[0].id) {
             $(e.target.parentElement).addClass('hidden');
             $(e.target.parentElement).next().removeClass('hidden');

             $('#textPick').parent().removeClass('selected');
             $('#bottlePick').parent().removeClass('selected');
             $('#lidPick').parent().removeClass('selected');
             $('#capPick').parent().removeClass('selected');
             $('#overmoldPick').parent().removeClass('selected');
             $('#imagePick').parent().removeClass('selected');
             switch ($(e.target.parentElement).next()[0].id) {
                 case 'textControls':
                     $('#textPick').parent().addClass('selected');
                     break;
                 case 'capControls':
                     $('#capPick').parent().addClass('selected');
                     break;
                 case 'overmoldControls':
                     $('#overmoldPick').parent().addClass('selected');
                     break;
                 case 'lidControls':
                     $('#lidPick').parent().addClass('selected');
                     break;
                 case 'bottleControls':
                     $('#bottlePick').parent().addClass('selected');
                     break;
                 case 'imageControls':
                     $('#imagePick').parent().addClass('selected');
                     break;
             }
         }
     });
     $('.leftArrow').click(function (e) {
         if ($(e.target.parentElement)[0].id != $('#bottleControls')[0].id) {
             $(e.target.parentElement).addClass('hidden');
             $(e.target.parentElement).prev().removeClass('hidden');
             $('#textPick').parent().removeClass('selected');
             $('#bottlePick').parent().removeClass('selected');
             $('#lidPick').parent().removeClass('selected');
             $('#capPick').parent().removeClass('selected');
             $('#overmoldPick').parent().removeClass('selected');
             $('#imagePick').parent().removeClass('selected');
             switch ($(e.target.parentElement).prev()[0].id) {
                 case 'textControls':
                     $('#textPick').parent().addClass('selected');
                     break;
                 case 'capControls':
                     $('#capPick').parent().addClass('selected');
                     break;
                 case 'overmoldControls':
                     $('#overmoldPick').parent().addClass('selected');
                     break;
                 case 'lidControls':
                     $('#lidPick').parent().addClass('selected');
                     break;
                 case 'bottleControls':
                     $('#bottlePick').parent().addClass('selected');
                     break;
                 case 'imageControls':
                     $('#imagePick').parent().addClass('selected');
                     break;
             }
         }
     });
     
     jQuery('.scrollbar').jScrollPane({
         autoReinitialise: true,
         verticalGutter: 0
     });
     //     submitImage = function () {
     //         var canvas = document.getElementById('container');
     //         var img = canvas.toDataURL('image/png');
     //         // document.write('<img src="'+img+'"/>');
     //         $('#submissionForm').post(url, {}, function (e) {
     //
     //         });
     //
     //     };
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

     function colorNameToHex(color) {
         var colors = {
             "black": "#000000",
                 "blue": "#0000ff",
                 "brown": "#a52a2a",
                 "cyan": "#00ffff",
                 "deeppink": "#ff1493",
                 "gray": "#808080",
                 "lime": "#00ff00",
                 "orange": "#ffa500",
                 "purple": "#800080",
                 "red": "#ff0000",
                 "white": "#ffffff",
                 "yellow": "#ffff00"
         };

         if (typeof colors[color.toLowerCase()] != 'undefined') return colors[color.toLowerCase()];

         return false;
     }

     //The startup functions//
     if (localStorage.blenderBottleSave) {
         loadImage();
     } else {
         resetCanvas();
     }
 });