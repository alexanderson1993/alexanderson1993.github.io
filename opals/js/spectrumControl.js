$(function () {


   
    $("#fontColor").spectrum({
        clickoutFiresChange: true,
        showButtons: false,
        showPalette: false,
        showSelectionPalette: false,
        flat: true,
        palette: [
        ['black', 'cyan', 'blue'],
        ['lime', 'orange', 'deeppink'],
        ['red', 'purple', 'white']
        ],
        move: function (color) {
            colorValue = blacktitude(color.toHexString());
            layer.getActiveObject().setFill(colorValue);
            // $('.user').attr('data-color', color.toHexString());
            // $('.user').css('background-color', color.toHexString());
            // changePalette($('.textColor .user')[0]);
            layer.renderAll();
        }

    });
    $("#imageColor").spectrum({
        clickoutFiresChange: true,
        showButtons: false,
        showPalette: false,
        showSelectionPalette: false,
        flat: true,
        move: function (color) {
            colorValue = blacktitude(color.toHexString());
            layer.getActiveObject().setFill(colorValue);
            layer.renderAll();
        }

    });
    $("#lidColor").spectrum({
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

            classicLid.setFill(colorValue);
            layer.renderAll();
        },
        change: function (color) {
            colorValue = blacktitude(color.toHexString());
            classicLid.setFill(colorValue);
            layer.renderAll();
        }

    });
    $("#logoColor").spectrum({
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

            bbLogo.setFill(colorValue);
            layer.renderAll();
        },
        change: function (color) {
            colorValue = blacktitude(color.toHexString());

            bbLogo.setFill(colorValue);
            layer.renderAll();
        }
    });
    
    $("#classicColor").spectrum({
        allowEmpty: false,
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
            if (!color) {
                fabric.util.loadImage('/transparent.png', function (img) {
                    classicColor.fill = new fabric.Pattern({
                        source: img,
                        repeat: 'repeat'
                    });
                    bottleMask.fill = new fabric.Pattern({
                        source: img,
                        repeat: 'repeat'
                    });
                    layer.renderAll();
                });
            } else {
                console.log(color.toHexString());
                colorValue = blacktitude(color.toHexString());

                classicColor.setFill(colorValue);
                bottleMask.setFill(colorValue);
                layer.renderAll();
            }
        },
        change: function (color) {
            console.log(color.toHexString());
            colorValue = blacktitude(color.toHexString());
            classicColor.setFill(colorValue);
            bottleMask.setFill(colorValue);
            layer.renderAll();
        }
    });
});