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

app.get('/', function(req, res) {
  //console.log(req.body.imarray);
  //console.log(req.body.imtype);
  var im=cv.Matrix.fromArray(req.body.imarray,16);
  //console.log(test);
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
