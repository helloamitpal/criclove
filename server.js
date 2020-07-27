const express = require('express');
const http = require('http');
const request = require('request');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cheerio = require('cheerio');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(morgan());
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
const { API_KEY } = process.env;

// creating JSON for matches
const getParsedResponse = (html) => {
  const $ = cheerio.load(html);
  const matches = [];
  const allMatches = $('a');

  for (let index = 0, len = allMatches.length; index < len; index++) {
    const anchor = $(allMatches[index]);

    anchor.find('*').removeAttr('style', '');
    matches.push({
      live: anchor.find('.cb-text-live').length > 0,
      url: anchor.attr('href'),
      content: anchor.html()
    });
  }

  return matches;
};

/**
 * Live Match APIs
 */
app.get('/api/matches', function (req, res) {
  request('http://www.cricbuzz.com/api/html/homepage-scag', (err, resp, body) => {
    if (err) {
      res.status(500).send({ error: 'Something went wrong' });
    }
    const output = getParsedResponse(body);
    res.json(output);
  });
});

/**
 * Match news
 */
app.get('/api/news', function(req, res) {
  request(`http://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=${API_KEY}`, (err, resp) => {
    if (err) {
      res.status(500).send({ error: 'Something went wrong' });
    }

    res.json(resp);
  });
});

const server = http.createServer(app);

// start web server
server.listen(app.get('port'), function () {
  console.log('Web server listening on port ' + app.get('port'))
});
