var express = require('express');
var router = express.Router();

var house = require('./dbcomponents/house');
var auth = require('./dbcomponents/authentication');
var finance  = require('./dbcomponents/finance');
var calendar = require('./dbcomponents/calendar');
var bulletin = require('./dbcomponents/bulletin-db');

var app = express();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a DB INTERFACE');
});

router.use('/house', house);
router.use('/auth', auth);
router.use('/finance',finance);
router.use('/calendar',calendar);
router.use('/bulletin', bulletin);







module.exports = router;
