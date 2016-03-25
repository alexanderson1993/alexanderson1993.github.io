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
   'image/gif': true
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
             //debugger;
             //console.log(file);  

             var imageObj = new Image();
             imageObj.onload = function () {
               imgHeight = imageObj.naturalHeight;
               imgWidth = imageObj.naturalWidth;
               aspect = imgWidth / imgHeight;
               PaperLayers.images.activate();
               var raster = new paper.Raster({
                source: imageObj.src,
                position: paper.view.center,
            });
               raster.onLoad = function(){
                   raster.width = 190;
                   raster.height = 190/aspect;
               }
           };
           imageObj.src = event.target.result;


       };


       reader.readAsDataURL(file);
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