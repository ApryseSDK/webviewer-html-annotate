// TAKEN FROM: https://stackoverflow.com/a/63602976
const express = require('express');
const cors = require('cors');
const https = require('https');
const http = require('http');

const app = express();
app.use(cors());

const PORT = 3100;
const PATH = `0.0.0.0:${PORT}`;

const getHostPortSSL = (url) => {
  const parsedHost = url.split('/').splice(2).splice(0, 1).join('/')
  let parsedPort;
  let parsedSSL; 
  if (url.startsWith('https://')) {
    parsedPort = 443;
    parsedSSL = https;
  } else if (url.startsWith('http://')) {
    parsedPort = 80;
    parsedSSL = http;
  }
  return {
    parsedHost,
    parsedPort,
    parsedSSL,
  }  
}

const isUrlAbsolute = (url) => (url.indexOf('://') > 0 || url.indexOf('//') === 0);

var url;

app.get('/website', function (req, res, next) {
  url = req.query.url;
  next("route");
});

app.use('/', function(clientRequest, clientResponse) {
    const {
      parsedHost,
      parsedPort,
      parsedSSL, 
    } = getHostPortSSL(url);

    var options = { 
      hostname: parsedHost,
      port: parsedPort,
      path: url,
      method: clientRequest.method,
      headers: {
        'User-Agent': clientRequest.headers['user-agent']
      }
    };  
    console.log('options', options);

    const callback = (serverResponse, clientResponse) => {
      // Delete 'x-frame-options': 'SAMEORIGIN'
      // so that the page can be loaded in an iframe
      delete serverResponse.headers['x-frame-options'];
      delete serverResponse.headers['content-security-policy'];

      // if a url is blown up, make sure to reset cache-control
      // if (!!serverResponse.headers['cache-control'] && /max-age=[^0]/.test(String(serverResponse.headers['cache-control']))) {
      //   serverResponse.headers['cache-control'] = 'max-age=0';
      // }
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
      console.log('serverResponse', serverResponse.statusCode, serverResponse.headers)
      // This is the case of urls being redirected -> retrieve new headers['location'] and request again
      if (serverResponse.statusCode > 299 && serverResponse.statusCode < 400) {
        var location = serverResponse.headers['location'];
        var parsedLocation = isUrlAbsolute(location) ? location : `https://${parsedHost}${location}`;

        const {
          parsedHost: newParsedHost,
          parsedPort: newParsedPort,
          parsedSSL: newParsedSSL, 
        } = getHostPortSSL(parsedLocation);

        var newOptions = {
          hostname: newParsedHost,
          port: newParsedPort,
          path: parsedLocation,
          method: clientRequest.method,
          headers: {
            'User-Agent': clientRequest.headers['user-agent']
          }
        };
        console.log('newOptions', newOptions);

        var newServerRequest = newParsedSSL.request(newOptions, newResponse => {
          console.log('new serverResponse', newResponse.statusCode, newResponse.headers)
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