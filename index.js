// This script starts a simple ExpressJS web server...
// The server listens for HTTP on port 80 and HTTPS on port 443


var express        = require('express');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request        = new XMLHttpRequest();

var fs    = require('fs');
var https = require('https');

var port1 = 80;
var port2 = 443;

var app1 = express();   //app1 will listen for HTTP on port 80
var app2 = express();   //app2 will listen for HTTPS on port 443

var newline_regex = /\n/g;
var html_tab = '&nbsp; &nbsp; &nbsp; &nbsp;';

// Fargate containers provide metadata about the current ECS task 
// at a special endpoint. We read this metadata below:
request.open('GET', 'http://169.254.170.2/v2/metadata', false);   // The "false" makes this a synchronous request, rather than the default async
request.send(null);

if (request.status === 200) {
  var ecsMetadata = JSON.parse(request.responseText);
  
}

// this is the handler for all HTTP requests received on port 80
app1.get('/', function (req, res) {
  
  var msg = `Hello World from Express+NodeJS app1! Protocol is ${req.protocol} on port ${port1}.<br/><br/>ECS Metadata:<br/>${(JSON.stringify(ecsMetadata,null,2)).replace(newline_regex, "<br/>")}`;
  res.send(msg);
  
});

//Enable the HTTP listener
app1.listen(port1, function () {
  console.log(`app1 listening on port ${port1}!`);
});

// this is the handler for all HTTPS requests received on port 443
app2.get('/', function (req, res) {
  
  var msg = `Hello World from Express+NodeJS app2! Protocol is ${req.protocol} on port ${port2}.<br/><br/>ECS Metadata:<br/>${(JSON.stringify(ecsMetadata,null,2)).replace(newline_regex, "<br/>")}`;
  res.send(msg);
  
});

// Enable the HTTPS listener
// Because its HTTPS, we must specify the SSL key and certificate
// Normally, these shouldn't be stored in a public repo, but this is ok for test purposes
// Because I don't use these certs for anything else
https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app2)
.listen(port2, function () {
  console.log(`app2 listening on port ${port2}!`);
});
