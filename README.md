# webviewer-html-annotate
Annotate live HTML pages by simply providing URL. This way you can preserve all the animations and any interactive content. [Watch the video](https://youtu.be/OGswLirzMW8) to see a demo and walkthrough of the project.

The sample uses [WebViewer HTML by PDFTron](https://www.npmjs.com/package/@pdftron/webviewer-html) for annotating HTML, and [Website-scraper](https://www.npmjs.com/package/website-scraper) for scraping the website from URL. 

## Install

#### Client
```
cd client
npm i
```

#### Server
```
cd server
npm i
```


## Run

#### Client
```
cd client
npm start
```

#### Server
```
cd server
npm start
```

## How it works

1. Client app makes the request to the Node.js Express server.
2. Node.js Express server serves the endpoint `/website?url=someurl.com`, 
3. From the `url` query parameter, we download all the website dependencies (HTML, CSS, JS, images).
4. The server responds back with link to access downloaded resources and a thumbnail preview in `base64`.
5. WebViewer then renders out live HTML that can be annotated.
