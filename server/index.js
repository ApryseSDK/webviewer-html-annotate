const express = require('express');
const cors = require('cors');
const scrape = require('website-scraper');
// const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const cors_proxy = require('cors-anywhere');
var http = require('http');
var httpProxy = require('http-proxy');

const PORT = 3001;

const app = express();

app.use(express.static('public'));
app.use(cors());

// // Listen on a specific host via the HOST environment variable
// var host = process.env.HOST || '0.0.0.0';
// // Listen on a specific port via the PORT environment variable
// var port = process.env.PORT || 8080;

// const CORS_SERVER = cors_proxy.createServer({
//   originWhitelist: [],
//   // requireHeader: [ 'origin', 'x-requested-with' ],
//   removeHeaders: [ 'cookie', 'cookie2' ]
// }).listen(port, host, function() {
//   console.log('Running CORS Anywhere on ' + host + ':' + port);
// });



// var proxy = httpProxy.createProxyServer(options); // See (†)
// http.createServer(function(req, res) {
//   proxy.web(req, res, { target: 'http://localhost:8080' });
// });

//


//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  proxy.web(req, res, { target: 'http://127.0.0.1:5050' });
});

console.log("listening on port 5050")
server.listen(5050);

// endpoint to scrape the website and generate a thumb preview
app.get('/website', (req, res) => {
  const { url } = req.query;
  res.status(200).json({
    status: 'success',
    data: {
      url,
      // thumb: prefix + data,
      thumb: '',
    },
  });


  // const timestamp = Date.now();
  // if (!url) {
  //   res.status(400).json({
  //     status: 'Bad Request',
  //     data: 'Please provide URL of the website you want to scrape as a query parameter.',
  //   });
  // }
  // const urlToConvert = new URL(url);
  // const pagePath = `${urlToConvert.hostname}${timestamp}`;
  // const directory = path.resolve(__dirname, `./public/${pagePath}`);

  // const options = {
  //   urls: [url],
  //   directory,
  //   filenameGenerator: `${pagePath}`,
  // };

  // req.url = `/${url}`;
  // // CORS_SERVER.emit("request", req, res);

  // scrape(options).then(async (result) => {
  //   // get the screenshot with puppeteer after the scrape is complete
  //   const browser = await puppeteer.launch({
  //     defaultViewport: {
  //       width: Number(width),
  //       height: Number(height),
  //     },
  //   });
  //   const page = await browser.newPage();
  //   await page.goto(`http://127.0.0.1:${PORT}/${pagePath}/index.html`);
  //   const thumbPath = path.resolve(__dirname, `./public/${pagePath}/thumb.png`);
  //   await page.screenshot({
  //     path: thumbPath,
  //   });

  //   // read the file from the filepath and respond to server with URL and thumb
  //   await fs.readFile(thumbPath, { encoding: 'base64' }, (err, data) => {
  //     if (err) throw err;
  //     const prefix = 'data:image/png;base64,';
  //     res.status(200).json({
  //       status: 'success',
  //       data: {
  //         url: `${pagePath}/index.html`,
  //         thumb: prefix + data,
  //       },
  //     });
  //   });

  //   await browser.close();
  // });
});

// app.get('/getpdf', async (req, res) => {
//   const { url, width, height } = req.query;
//   const pagePath = path.resolve(__dirname, `./public/pdf/html.pdf`);
//   const browser = await puppeteer.launch({
//     defaultViewport: {
//       width: Number(width),
//       height: Number(height),
//     },
//   });
//   const page = await browser.newPage();
//   await page.goto(`http://127.0.0.1:${PORT}/${url}/index.html`);
//   await page.pdf({
//     path: pagePath,
//     width: Number(width),
//     height: Number(height),
//     printBackground: true,
//     pageRanges: '1',
//   });
//   await browser.close();

//   // read the file from the filepath and respond to server
//   res.sendFile(pagePath);
// });

app.listen(PORT, () => {
  console.log(`Server is now live at ${PORT}`);
});
