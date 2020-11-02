const express = require('express');
const cors = require('cors');
const scrape = require('website-scraper');
const path = require('path');

const PORT = 3001;

const app = express();

app.use(express.static('public'));
app.use(cors());

app.get('/website', (req, res) => {
  const { url } = req.query;
  if (!url) {
    res.status(400).json({
      status: 'Bad Request',
      data:
        'Please provide URL of the website you want to scrape as a query parameter.',
    });
  }
  const urlToConvert = new URL(url);
  const directory = path.resolve(__dirname, `./public/${urlToConvert.hostname}`);

  const options = {
    urls: [url],
    directory,
  };

  scrape(options).then(result => {
    res.status(200).json({
        status: 'success',
        data: `http://127.0.0.1:${PORT}/${urlToConvert.hostname}/index.html`
    })
  });
});

app.listen(PORT, () => {
  console.log(`Server is now live at ${PORT}`);
});
