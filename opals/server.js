var path = require('path')
var express = require('express');
var app = express();
var childProcess = require('child_process');
var phantomjs = require('phantomjs');
var bodyParser = require('body-parser');
var qs = require('querystring');

var binPath = phantomjs.path
var router = express.Router(); 

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
router.post('/svg', function(req, res){
	res.json({ message: 'hooray! welcome to our api!' });  
	var body = '';
	req.on('data', function (data) {
		body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
            	req.connection.destroy();
        }); 
	req.on('end', function () {
		console.log('Request Ending');
		var post = qs.parse(body);
        // use post['blah'], etc.
        console.log('body',body.split('=').length);
        var svg = body.split('=')[1];
        var childArgs = [
        path.join(__dirname, 'render.js'),
        'test.pdf',svg
        ]
        console.log(childArgs);

        childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
        	console.log('Process Finished');
  			// handle results 
  		})
    });
	
})

app.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });   
});

app.use('/api', router);

var server = app.listen(8081, function () {

	var host = server.address().address
	var port = server.address().port

	console.log("Example app listening at http://%s:%s", host, port)

})