// TAKEN FROM: https://stackoverflow.com/a/63602976
const express = require('express');
const cors = require('cors');
const https = require('https');
const http = require('http');

const app = express();
app.use(cors());

const PORT = 3005;
const PATH = `0.0.0.0:${PORT}`;

var url;

app.get('/website', function (req, res, next) {
  url = req.query.url;
  next("route");
});

app.use('/', function(clientRequest, clientResponse) {
    console.log('----', clientRequest.hostname, clientRequest.url, clientRequest.originalUrl, '--', clientRequest.baseUrl, clientRequest.headers.location);
    var parsedHost = url.split('/').splice(2).splice(0, 1).join('/')
    console.log('parsedHost', parsedHost);
    var parsedPort;
    var parsedSSL;
    if (url.startsWith('https://')) {
        parsedPort = 443;
        parsedSSL = https;
    } else if (url.startsWith('http://')) {
        parsedPort = 80;
        parsedSSL = http;
    }
    var options = { 
      hostname: parsedHost,
      port: parsedPort,
      path: url,
      method: clientRequest.method,
      headers: {
        'User-Agent': clientRequest.headers['user-agent']
      }
    };  

    const callback = (serverResponse, clientResponse) => {
      // console.log('headers------', serverResponse.headers);
      // Delete 'x-frame-options': 'SAMEORIGIN'
      // so that the page can be loaded in an iframe
      delete serverResponse.headers['x-frame-options'];
      delete serverResponse.headers['content-security-policy'];
      var body = '';
      if (String(serverResponse.headers['content-type']).indexOf('text/html') !== -1) {
        serverResponse.on('data', function (chunk) {
          body += chunk;
        });

        serverResponse.on('end', function () {
          // Make changes to HTML files when they're done being read.
          body = body.replace(`example`, `Cat!`);

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
    }

    var serverRequest = parsedSSL.request(options, serverResponse => {
      // This is the case of urls being redirected -> retrieve new headers['location'] and request again
      if (serverResponse.statusCode !== 200) {
        var newOptions = {
          hostname: parsedHost,
          port: parsedPort,
          path: serverResponse.headers['location'],
          method: clientRequest.method,
          headers: {
            'User-Agent': clientRequest.headers['user-agent']
          }
        };

        var newServerRequest = parsedSSL.request(newOptions, newResponse => {
          callback(newResponse, clientResponse);
        }); 
        serverRequest.end();
        newServerRequest.end();
        return;
      }

      callback(serverResponse, clientResponse);
    });
  
    serverRequest.end();

  });    


  app.listen(PORT);
  console.log(`Running on ${PATH}`);