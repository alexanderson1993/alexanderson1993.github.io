var fs = require('fs');
var express = require('express');
var app = express();
var PDFDocument = require('pdfkit');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var gm = require('gm');
var router = express.Router();
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://postmaster@sandboxd6d95970a41d4d96bc8162d7999e07f5.mailgun.org:9653f861d91d1ec3fbb0422f108c7510@smtp.mailgun.org');
var server;
var data;
var base64Data;
var binaryData;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
router.post('/svg', function(req, res){
    var form = new formidable.IncomingForm();
    form.uploadDir = "./uploads";       //set upload directory
    form.keepExtensions = true;     //keep file extension
    form.parse(req, function(err, fields, files) {
        var doc;
        //res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        console.log("form.bytesReceived");
        data        = fs.readFileSync(files.logo.path, 'utf8');
        base64Data  =   data.replace(/^data:image\/png;base64,/, "");
        base64Data  +=  base64Data.replace('+', ' ');
        binaryData  =   new Buffer(base64Data, 'base64').toString('binary');
        data        = fs.readFileSync(files.template.path, 'utf8');
        base64Data  = data.replace(/^data:image\/png;base64,/, "");
        base64Data  +=  base64Data.replace('+', ' ');
        binaryData2 = new Buffer(base64Data, 'base64').toString('binary');
        fs.writeFile(files.logo.path + ".png", binaryData, "binary", function (err) {
            if (err) console.log(err); // writes out file without error, but it's not a valid image
            doc = new PDFDocument({size:[567,267]});
            doc.pipe(fs.createWriteStream(files.logo.path + 'output.pdf'));
            doc.image(files.logo.path + ".png",0,0,{width:567});
            doc.save();
            doc.end();
            //Repeat for the white logo
            fs.writeFile(files.logo.path + ".png", binaryData, "binary", function (err) {
                gm(files.logo.path + ".png").recolor('0 0 0 0 0.99, 0 0 0 0 1, 0 0 0 0 1, 0 0 0 1 0, 0 0 0 1 0').write(files.logo.path + "-whitebg.png", function(err){
                    if (err) console.log(err); // writes out file without error, but it's not a valid image
                    doc = new PDFDocument({size:[567,267]});
                    doc.pipe(fs.createWriteStream(files.logo.path + 'whiteOutput.pdf'));
                    doc.image(files.logo.path + "-whitebg.png",0,0,{width:567});
                    doc.save();
                    doc.end();
                    fs.unlink(files.logo.path + "-whitebg.png",function (err) {
                        if (err) console.log(err);
                    });
                    fs.unlink(files.logo.path + ".png",function (err) {
                        if (err) console.log(err);
                    });
                    //Do the same thing with the template, then send the email
                    fs.writeFile(files.template.path + ".png", binaryData2, "binary", function(err){
                        if (err) console.log(err); // writes out file without error, but it's not a valid image
                        doc2 = new PDFDocument({layout:'landscape'});
                        doc2.pipe(fs.createWriteStream(files.logo.path + 'output2.pdf'));
                        doc2.image(files.template.path + ".png",90,26,{width:612});
                        doc2.save();
                        doc2.end();
                        var mailOptions = {
                            from: '"Online Private Label System" <no-reply@blenderbottle.com>',
                            to: 'alexanderson1993@gmail.com',
                            subject: 'New OPaLS Submission',
                            text: 'Hello, \n\nThe following template was just submitted through the Online Private Label System. Attached are the logo, white underlay, and a reference template. \n\n Quantity:\n Color: \n\n\nThanks,\nOPaLS',
                            attachments: [
                            {
                                filename:'OPaLSLogo.pdf',
                                path:files.logo.path + 'output.pdf'
                            },
                                                        {
                                filename:'OPaLSWhiteLogo.pdf',
                                path:files.logo.path + 'whiteOutput.pdf'
                            },
                            {
                                filename:'OPaLSTemplate.pdf',
                                path:files.logo.path + 'output2.pdf'
                            }
                            ]
                        };
                        setTimeout(function(){
                            transporter.sendMail(mailOptions, function(error, info){
                                if(error){
                                    return console.log(error);
                                }
                                console.log('Message sent: ' + info.response);
                                fs.unlink(files.logo.path + 'output.pdf',function (err) {
                                    if (err) console.log(err);
                                });
                                fs.unlink(files.logo.path + 'output2.pdf',function (err) {
                                    if (err) console.log(err);
                                });
                                fs.unlink(files.logo.path + 'whiteOutput.pdf',function (err) {
                                    if (err) console.log(err);
                                });
                                fs.unlink(files.template.path + ".png",function (err) {
                                    if (err) console.log(err);
                                });
                                return true;
                            });
                        },4000);
                        fs.unlink(files.logo.path,function (err) {
                            if (err) console.log(err);
                        });
                        fs.unlink(files.template.path,function (err) {
                            if (err) console.log(err);
                        });
                        res.end();
                    });
                });
            });
});
});
});

app.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' }); 
});

app.use('/api', router);

var server = app.listen(8081, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log("Example app listening at http://%s:%s", host, port);
});
