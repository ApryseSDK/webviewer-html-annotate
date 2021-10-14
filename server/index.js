// const express = require('express');
// const cors = require('cors');
// const scrape = require('website-scraper');
// // const puppeteer = require('puppeteer');
// // const path = require('path');
// // const fs = require('fs');
// // const cors_proxy = require('cors-anywhere');

// const http = require('http');
// const httpProxy = require('http-proxy');

// const proxy = httpProxy.createProxyServer({});
// http.createServer(function(req, res) {
//   console.log('Request', req.method, req.url, `${req.protocol}://${req.hostname}`);
//   proxy.web(req, res, { target: 'http://info.cern.ch/' });
// }).listen(3000);

// // (async () => {
// //   // const express = require('express');
// //   const httpProxy = require('http-proxy');

// //   // Create a proxy and listen on port 3000
// //   const proxy = httpProxy.createProxyServer({});
// //   const app = express();
// //   app.get('*', function(req, res) {
// //     // Prints "Request GET https://httpbin.org/get?answer=42"
// //     console.log('Request', req.method, req.url);
// //     proxy.web(req, res, { target: `${req.protocol}://${req.hostname}` });
// //   });
// //   const server = await app.listen(3000);

// //   const axios = require('axios');
// //   const res = await axios.get('http://httpbin.org/get?answer=42', {
// //     // `proxy` means the request actually goes to the server listening
// //     // on localhost:3000, but the request says it is meant for
// //     // 'http://httpbin.org/get?answer=42'
// //     proxy: {
// //       host: 'localhost',
// //       port: 3000
// //     }
// //   });
// //   console.log(res.data);
// // })();


// // var http = require('http');
// // var httpProxy = require('http-proxy');

// // const PORT = 3001;

// // const app = express();

// // app.use(express.static('public'));
// // app.use(cors());


// // var http = require('http'),
// //     httpProxy = require('http-proxy');

// // //
// // // Create a proxy server with custom application logic
// // //
// // var proxy = httpProxy.createProxyServer({});

// // //
// // // Create your custom server and just call `proxy.web()` to proxy
// // // a web request to the target passed in the options
// // // also you can use `proxy.ws()` to proxy a websockets request
// // //
// // var server = http.createServer(function(req, res) {
// //   // You can define here your custom logic to handle the request
// //   // and then proxy the request.
// //   proxy.web(req, res, { target: 'http://www.google.ca' });
// // });

// // console.log("listening on port 5050")
// // server.listen(5050);

// // // var http = require('http'),
// // //     httpProxy = require('http-proxy');

// // // var addresses = [
// // //     {
// // //         host: '127.0.0.1',
// // //         port: 8000
// // //     },
// // //     {
// // //         host: '127.0.0.1',
// // //         port: 8001
// // //     },
// // //     {
// // //         host: '127.0.0.1',
// // //         port: 8002
// // //     },
// // //     {
// // //         host: '127.0.0.1',
// // //         port: 8003
// // //     }
// // // ];

// // // //
// // // // Create your target server
// // // //
// // // var server = http.createServer(function (req, res) {
// // //     addresses = addresses.concat(addresses.splice(0, 1));
// // //     console.log(addresses);
// // //     var target = { target: addresses };
// // //     //
// // //     // Create your proxy server and set the target in the options.
// // //     //
// // //     // var proxyServer = httpProxy.createProxyServer(target);
    
// // //     res.writeHead(200, { 'Content-Type': 'application/json' });    
// // //     res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
// // //     res.end();
// // // })

// // // server.listen(9000);

// // // // Listen on a specific host via the HOST environment variable
// // // var host = process.env.HOST || '0.0.0.0';
// // // // Listen on a specific port via the PORT environment variable
// // // var port = process.env.PORT || 8080;

// // // const CORS_SERVER = cors_proxy.createServer({
// // //   originWhitelist: [],
// // //   // requireHeader: [ 'origin', 'x-requested-with' ],
// // //   removeHeaders: [ 'cookie', 'cookie2' ]
// // // }).listen(port, host, function() {
// // //   console.log('Running CORS Anywhere on ' + host + ':' + port);
// // // });



// // // var proxy = httpProxy.createProxyServer(options); // See (†)
// // // http.createServer(function(req, res) {
// // //   proxy.web(req, res, { target: 'http://localhost:8080' });
// // // });

// // // //


// // // //
// // // // Create a proxy server with custom application logic
// // // //
// // // var proxy = httpProxy.createProxyServer({});

// // // // Create your custom server and just call `proxy.web()` to proxy
// // // // a web request to the target passed in the options
// // // // also you can use `proxy.ws()` to proxy a websockets request
// // // //
// // // var server = http.createServer(function(req, res) {
// // //   // You can define here your custom logic to handle the request
// // //   // and then proxy the request.
// // //   proxy.web(req, res, { target: 'http://127.0.0.1:5050' });
// // // });

// // // console.log("listening on port 5050")
// // // server.listen(5050);

// // // var httpProxy = require('http-proxy');
// // // var url = require('url');

// // // // var proxy = httpProxy.createProxyServer({});

// // // // http.createServer(function(req, res) {
// // // //   proxy.web(req, res, { target: 'http://mytarget.com:8080' });
// // // // });


// // // var proxy = httpProxy.createProxyServer({
// // //   target: 'http://localhost:9000',
// // //   secure: false,
// // //   // changeOrigin: true,
// // //   xfwd: true,
// // //   // autoRewrite: true
// // //  });

// // //  proxy.on('error', function (err) {
// // //   console.log(err);
// // //   console.log('Listening... [press Control-C to exit]');
// // //  })

// // //  console.log('sdkfjsdlfk');
// // //  proxy.on("proxyReq", function(proxyReq, req, _, options) {
// // //   console.log('bheljkrelrjelwr');
// // // });


// // // endpoint to scrape the website and generate a thumb preview
// // app.get('/website', (req, res) => {
// //   const { url } = req.query;
// //   res.status(200).json({
// //     status: 'success',
// //     data: {
// //       url,
// //       // thumb: prefix + data,
// //       thumb: '',
// //     },
// //   });


// //   // const timestamp = Date.now();
// //   // if (!url) {
// //   //   res.status(400).json({
// //   //     status: 'Bad Request',
// //   //     data: 'Please provide URL of the website you want to scrape as a query parameter.',
// //   //   });
// //   // }
// //   // const urlToConvert = new URL(url);
// //   // const pagePath = `${urlToConvert.hostname}${timestamp}`;
// //   // const directory = path.resolve(__dirname, `./public/${pagePath}`);

// //   // const options = {
// //   //   urls: [url],
// //   //   directory,
// //   //   filenameGenerator: `${pagePath}`,
// //   // };

// //   // req.url = `/${url}`;
// //   // // CORS_SERVER.emit("request", req, res);

// //   // scrape(options).then(async (result) => {
// //   //   // get the screenshot with puppeteer after the scrape is complete
// //   //   const browser = await puppeteer.launch({
// //   //     defaultViewport: {
// //   //       width: Number(width),
// //   //       height: Number(height),
// //   //     },
// //   //   });
// //   //   const page = await browser.newPage();
// //   //   await page.goto(`http://127.0.0.1:${PORT}/${pagePath}/index.html`);
// //   //   const thumbPath = path.resolve(__dirname, `./public/${pagePath}/thumb.png`);
// //   //   await page.screenshot({
// //   //     path: thumbPath,
// //   //   });

// //   //   // read the file from the filepath and respond to server with URL and thumb
// //   //   await fs.readFile(thumbPath, { encoding: 'base64' }, (err, data) => {
// //   //     if (err) throw err;
// //   //     const prefix = 'data:image/png;base64,';
// //   //     res.status(200).json({
// //   //       status: 'success',
// //   //       data: {
// //   //         url: `${pagePath}/index.html`,
// //   //         thumb: prefix + data,
// //   //       },
// //   //     });
// //   //   });

// //   //   await browser.close();
// //   // });
// // });

// // // app.get('/getpdf', async (req, res) => {
// // //   const { url, width, height } = req.query;
// // //   const pagePath = path.resolve(__dirname, `./public/pdf/html.pdf`);
// // //   const browser = await puppeteer.launch({
// // //     defaultViewport: {
// // //       width: Number(width),
// // //       height: Number(height),
// // //     },
// // //   });
// // //   const page = await browser.newPage();
// // //   await page.goto(`http://127.0.0.1:${PORT}/${url}/index.html`);
// // //   await page.pdf({
// // //     path: pagePath,
// // //     width: Number(width),
// // //     height: Number(height),
// // //     printBackground: true,
// // //     pageRanges: '1',
// // //   });
// // //   await browser.close();

// // //   // read the file from the filepath and respond to server
// // //   res.sendFile(pagePath);
// // // });

// // app.listen(PORT, () => {
// //   console.log(`Server is now live at ${PORT}`);
// // });

// TAKEN FROM: https://stackoverflow.com/a/63602976
var express = require('express')
var app = express()
var https = require('https');
var http = require('http');
const { response } = require('express');


app.use('/', function(clientRequest, clientResponse) {
    var url;
    // url = 'https://www.google.com'
    console.log('----', clientRequest.hostname, clientRequest.url);
    url = 'https://www.pdftron.com';
    var parsedHost = url.split('/').splice(2).splice(0, 1).join('/')
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