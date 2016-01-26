var express = require('express');
var router = express.Router();

var house = require('./dbcomponents/house');

var app = express();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a DB INTERFACE');
});

router.use('/house', house);







module.exports = router;
