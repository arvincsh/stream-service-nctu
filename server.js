var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var cv = require('opencv');
var axios = require('axios');
var bodyParser = require('body-parser');


http.listen(4002, function() {
  console.log('Server is running on port 4002');
});
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));


//var c2i_1='';
//var c2i_2='';
var camera= new cv.VideoCapture('http://admin:admin@140.113.179.14:8085/channel1');
//cam2img();

app.get('/NCTUstream', function(req, res) {
  //console.log(req.body.imarray);
  //console.log(req.body.imtype);
  //console.log(test);
  camera.read(function(err, im) {
    im.detectObject('./node_modules/opencv/data/haarcascade_frontalface_alt2.xml', {}, function(err, faces) {
      if (err) throw err;
      for (var i = 0; i < faces.length; i++) {
        if (err) throw err;
        face = faces[i];
        im.rectangle([face.x, face.y], [face.width, face.height], [0, 255, 0], 2, function(err){
          if (err) throw err;
        });
      }
      var returnData=im.toBuffer(".jpg").toString("base64")
      res.send(returnData);
    });
  });
});
/*
function cam2img() {
  camera.read(function(err, im) {
    if (err) throw err;
        c2i_1=im;
        c2i_2=c2i_1;
        cam2img();
  });
}
*/
