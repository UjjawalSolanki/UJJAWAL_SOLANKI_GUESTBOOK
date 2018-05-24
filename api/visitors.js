var express = require('express');
var router = express.Router();
var request = require('request');


// Get All visitors
router.get('/', function (req, res, next) {
  var options = {
    method: 'GET',
    url: process.env.baseUrl + '/api/visitors',
    headers:
      {
        'Authorization': req.headers.authorization
      },
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


// Get a particular visitor
router.get('/:id', function (req, res, next) {
  var options = {
    method: 'GET',
    url: process.env.baseUrl + '/api/visitors/'+ req.params.id,
    headers:
      {
        'Authorization': req.headers.authorization
      },
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

// add a  visitor
router.post('/store', function (req, res, next) {
  var options = {
    method: 'POST',
    url: process.env.baseUrl + '/api/visitors/store',
    headers:
      {
        'Authorization': req.headers.authorization
      },
    body: req.body,
    json: true
  };
  request(options, function (error, response, body) {
    if (error) {
      res.status(500);
      res.send('Something went wrong');
    } else {
      res.send({message: "Visitor Added Successfully", status_code: 204});
    }
  });
});

// Update a particular visitor
router.post('/:id', function (req, res, next) {
  var options = {
    method: 'POST',
    url: process.env.baseUrl + '/api/visitors/'+ req.params.id,
    headers:
      {
        'Authorization': req.headers.authorization
      },
    body: req.body,
    json: true
  };
  request(options, function (error, response, body) {
    if (error) {
      res.status(500);
      res.send('Something went wrong');
    } else {
      res.send({message: "Visitor Updated Successfully", status_code: 204});
    }
  });
});

// Remove a particular visitor
router.delete('/:id', function (req, res, next) {
  var options = {
    method: 'DELETE',
    url: process.env.baseUrl + '/api/visitors/'+ req.params.id,
    headers:
      {
        'Authorization': req.headers.authorization
      },
    json: true
  };
  request(options, function (error, response, body) {
    if (error) {
      res.status(500);
      res.send('Something went wrong');
    }else {
      res.send({message: "Visitor Removed Successfully", status_code: 204});
    }
  });
});




module.exports = router;
