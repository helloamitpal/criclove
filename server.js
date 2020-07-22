const express = require('express');
const http = require('http');
const request = require('request');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(morgan());
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

app.get('/api/matches', function (req, res) {
  request('http://www.cricbuzz.com/api/html/homepage-scag', (err, resp, body) => {
    if (err) {
      res.send(500, "Something went wrong");
    }
    res.send(body);
  });
});

const server = http.createServer(app);

// start web server
server.listen(app.get('port'), function () {
  console.log('Web server listening on port ' + app.get('port'))
});
