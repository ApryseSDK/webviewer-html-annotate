// TAKEN FROM: https://stackoverflow.com/a/63602976
var express = require('express')
var app = express()
var https = require('https');
var http = require('http');
const { response } = require('express');

// app.get('/', function (req, res) {
//   // console.log('hello world');
//   // res.send('root')
// })

app.use('/', function(clientRequest, clientResponse) {
    var url;
    url = 'https://www.teamliquid.com/'
    // url = 'https://www.google.com'
    console.log('----', clientRequest.hostname, clientRequest.url, clientRequest.originalUrl, '--', clientRequest.baseUrl, clientRequest.headers.location);
    // url = 'https://www.pdftron.com';
    var parsedHost = url.split('/').splice(2).splice(0, 1).join('/')
    console.log('parsedHost', parsedHost);
    var parsedPort;
    var parsedSSL;
    if (url.startsWith('https://')) {
        parsedPort = 443
        parsedSSL = https
    } else if (url.startsWith('http://')) {
        parsedPort = 80
        parsedSSL = http
    }
    var options = { 
      hostname: parsedHost,
      port: parsedPort,
      path: clientRequest.url,
      method: clientRequest.method,
      headers: {
        'User-Agent': clientRequest.headers['user-agent']
      }
    };  
  
    var serverRequest = parsedSSL.request(options, function(serverResponse) { 
      // console.log('headers------', serverResponse.headers);
      // Delete 'x-frame-options': 'SAMEORIGIN'
      // so that the page can be loaded in an iframe
      delete serverResponse.headers['x-frame-options'];
      var body = '';   
      if (String(serverResponse.headers['content-type']).indexOf('text/html') !== -1) {
        serverResponse.on('data', function(chunk) {
          body += chunk;
        }); 
  
        serverResponse.on('end', function() {
          // Make changes to HTML files when they're done being read.
          body = body.replace(`example`, `Cat!` );
  
          clientResponse.writeHead(serverResponse.statusCode, serverResponse.headers);
          clientResponse.end(body);
        }); 
      }   
      else {
        serverResponse.pipe(clientResponse, {
          end: true
        }); 
        // Can be undefined
        if (serverResponse.headers['content-type']) {
          clientResponse.contentType(serverResponse.headers['content-type'])
        }
      }   
    }); 
  
    serverRequest.end();
  });    


  app.listen(3000)
  console.log('Running on 0.0.0.0:3000')