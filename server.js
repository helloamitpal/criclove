const express = require('express');
const http = require('http');
const request = require('request');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cheerio = require('cheerio');

const app = express();

app.use(morgan());
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

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

const server = http.createServer(app);

// start web server
server.listen(app.get('port'), function () {
  console.log('Web server listening on port ' + app.get('port'))
});
