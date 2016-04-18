var express = require('express');
var router = express.Router();
var db = require('./db-con');

router.get('/', function(req, res, next) {
    res.send('db ticket interface');
});

router.post('/new', function(req, res, next){
  var data = req.body;
  console.log(req.session.user);
  res.send(JSON.stringify(data));
});

module.exports = router;
