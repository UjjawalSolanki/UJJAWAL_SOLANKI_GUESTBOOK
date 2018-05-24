var express = require('express');
var router = express.Router();
var request = require('request');

router.post('/login', function (req, res, next) {
  var options = {
    method: 'POST',
    url: process.env.baseUrl + '/api/auth/login',
    headers: { 'content-type': 'application/json' },
    body: req.body,
    json: true
  };
  request(options, function (error, response, body) {
    if (error) {
      res.status(500);
      res.send('Something went wrong');
    }else if (body.status_code) {
      res.status(body.status_code);
      res.send(body);
    }else {
      res.send(body);
    }
  });
});

router.post('/register', function (req, res, next) {
  var options = {
    method: 'POST',
    url: process.env.baseUrl + '/api/auth/register',
    headers: { 'content-type': 'application/json' },
    body: req.body,
    json: true
  };
  request(options, function (error, response, body) {
    if (error) {
      res.status(500);
      res.send('Something went wrong');
    }else if (body.status_code) {
      res.status(body.status_code);
      res.send(body);
    }else {
      res.send(body);
    }
  });
});

module.exports = router;
