 //Drag'n'drop
 var holder = document.getElementById('canvas'),
 tests = {
   filereader: typeof FileReader != 'undefined',
   dnd: 'draggable' in document.createElement('span'),
   formdata: !! window.FormData,
   progress: "upload" in new XMLHttpRequest
 },
 support = {
   filereader: document.getElementById('filereader'),
   formdata: document.getElementById('formdata'),
   progress: document.getElementById('progress')
 },
 acceptedTypes = {
   'image/png': true,
   'image/jpeg': true,
   'image/gif': true,
   'image/svg+xml': true
 },
 progress = document.getElementById('uploadprogress'),
 fileupload = document.getElementById('upload');

 "filereader formdata progress".split(' ').forEach(function (api) {
   if (tests[api] === false) {
     support[api].className = 'fail';
   } else {
         // FFS. I could have done el.hidden = true, but IE doesn't support
         // hidden, so I tried to create a polyfill that would extend the
         // Element.prototype, but then IE10 doesn't even give me access
         // to the Element object. Brilliant.
         support[api].className = 'hidden';
       }
     });

 function previewfile(file) {
   if (tests.filereader === true && acceptedTypes[file.type] === true) {
     var reader = new FileReader();
     reader.onload = function (event) { 
              //check if the file is SVG or not
              if (file.type == 'image/svg+xml'){
                //Import the svg with Paper
                PaperLayers.content.activate();
                var importedSvg = PaperLayers.content.importSVG(event.target.result);
                importedSvg.name = 'import';
                importedSvg.bounds.center = PaperLayers.overlay.bounds.center;
                var aspect = importedSvg.bounds.width/importedSvg.bounds.height;
                var width = PaperLayers.overlay.bounds.width;
                var height = width/aspect;
                importedSvg.bounds.width = width;
                importedSvg.bounds.height = height;
                paper.view.draw();
                } else {
               var imageObj = new Image();
               imageObj.onload = function () {
                 imgHeight = imageObj.naturalHeight;
                 imgWidth = imageObj.naturalWidth;
                 aspect = imgWidth / imgHeight;
                 PaperLayers.content.activate();
                 var raster = new paper.Raster({
                  source: imageObj.src,
                  position: paper.view.center,
                });
                 raster.onLoad = function(){
                   raster.bounds.width = 190;
                   raster.bounds.height = 190/aspect;
                   raster.bounds.center = PaperLayers.overlay.bounds.center;
                 }
               };
               imageObj.src = event.target.result;
             }

           };

           if (file.type == 'image/svg+xml'){
             reader.readAsText(file);
           } else {
             reader.readAsDataURL(file);
           }
         } else {
           console.log(file);
         }
         imageObj = '';
         userImage = '';
         $('#imageUpload').val('');
       }

       function readfiles(files) {
         var formData = tests.formdata ? new FormData() : null;
         for (var i = 0; i < files.length; i++) {
           if (tests.formdata) formData.append('file', files[i]);
           previewfile(files[i]);
         }

       }


       if (tests.dnd) {
         holder.ondragover = function () {
           this.className = 'hover';
           return false;
         };
         holder.ondragend = function () {
           this.className = '';
           return false;
         };
         holder.ondrop = function (e) {
           this.className = '';
           e.preventDefault();
           readfiles(e.dataTransfer.files);
         };
       } else {
         fileupload.className = 'hidden';
         fileupload.querySelector('input').onchange = function () {
           readfiles(this.files);
         };
       }