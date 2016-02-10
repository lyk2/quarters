var express = require('express');
var router = express.Router();

var house = require('./dbcomponents/house');
var auth = require('./dbcomponents/authentication');
var finance  = require('./dbcomponents/finance')

var app = express();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a DB INTERFACE');
});

router.use('/house', house);
router.use('/auth', auth);
router.use('/finance',finance);







module.exports = router;
