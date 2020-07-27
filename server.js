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

const getParsedResponse = (html) => {
  const $ = cheerio.load(html);
  const matches = [];
  const liveMatches = $('.cb-text-live');

  for (let index = 0, len = liveMatches.length; index < len; index++) {
    const anchor = $(liveMatches[index]).parents('a');

    anchor.find('*').removeAttr('style', '');
    matches.push({
      url: anchor.attr('href'),
      content: anchor.html()
    });
  }

  return matches;
};

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
