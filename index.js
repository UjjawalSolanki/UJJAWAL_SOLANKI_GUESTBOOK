var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

process.env.baseUrl = 'http://atithi.dev.tudip.com';

var port = process.env.PORT || 5007;

app.use('/api/auth', require('./api/auth'));
app.use('/api/visitors', require('./api/visitors'));

app.use(express.static(path.join(__dirname, '/dist')));

app.use('*', function (req, res, next) {
  res.sendFile('index.html', {root : path.join(__dirname, '/dist')})
});

app.listen(port, function () {
  console.log("app listening on port : ", port);
});
