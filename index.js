//Load express module with `require` directive
var express = require('express');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var request = new XMLHttpRequest();

var fs = require('fs');
var https = require('https');

var port1 = 80;
var port2 = 443;

var app1 = express();
var app2 = express();

var newline_regex = /\n/g;
var html_tab = '&nbsp; &nbsp; &nbsp; &nbsp;';

// The "false" makes this a synchronous request
request.open('GET', 'http://169.254.170.2/v2/metadata', false);
request.send(null);

if (request.status === 200) {
  
  var ecsMetadata = JSON.parse(request.responseText);
  
}

//Define request response in root URL (/)
app1.get('/', function (req, res) {
  
  var msg = `Hello World from Express+NodeJS app1! Protocol is ${req.protocol} on port ${port1}.<br/><br/>ECS Metadata:<br/>${(JSON.stringify(ecsMetadata,null,2)).replace(newline_regex, "<br/>")}`;
  res.send(msg);
  
});

//Launch listening server
app1.listen(port1, function () {
  console.log(`app1 listening on port ${port1}!`);
});

//Define request response in root URL (/)
app2.get('/', function (req, res) {
  
  var msg = `Hello World from Express+NodeJS app2! Protocol is ${req.protocol} on port ${port2}.<br/><br/>ECS Metadata:<br/>${(JSON.stringify(ecsMetadata,null,2)).replace(newline_regex, "<br/>")}`;
  res.send(msg);
  
});

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app2)
.listen(port2, function () {
  console.log(`app2 listening on port ${port2}!`);
});
