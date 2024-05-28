// 네이버 Papago Text Translation API 예제
var express = require('express');
var app = express();

var client_id = 'tl35fbwl8i';
var client_secret = 'R9VMF466TYFA2enPzk7eOhQuRx1XJTJYveUSnhLv';
var glossary = 'af93fc9b-c8fe-4dec-9979-c0b3cd82db54';

var query = 'Nottingham Forest';

app.get('/', function (req, res) {
  var api_url = 'https://naveropenapi.apigw.ntruss.com/nmt/v1/translation';
  var request = require('request');

  var options = {
    url: api_url,
    form: { source: 'en', target: 'ko', text: query, glossaryKey: glossary },
    headers: { 'X-NCP-APIGW-API-KEY-ID': client_id, 'X-NCP-APIGW-API-KEY': client_secret },
  };

  request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
  });
});

app.listen(3000, function () {
  console.log('http://127.0.0.1:3000/translate app listening on port 3000!');
});