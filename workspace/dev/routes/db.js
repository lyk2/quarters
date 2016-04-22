var express = require('express');
var router = express.Router();

var house = require('./dbcomponents/house');
var auth = require('./dbcomponents/authentication');
var finance  = require('./dbcomponents/finance');
var calendar = require('./dbcomponents/calendar');
var bulletin = require('./dbcomponents/bulletin-db');
var ticket = require('./dbcomponents/ticket-db');
var notification = require('./dbcomponents/notification');

var app = express();

/* GET users listing. */
router.get('/', function(req, res, next) {

  console.log(req.session);
  res.send('respond with a DB INTERFACE');
});

router.use('/house', house);
router.use('/auth', auth);
router.use('/finance',finance);
router.use('/calendar',calendar);
router.use('/bulletin', bulletin);
router.use('/ticket', ticket);
router.use('/notification',notification);







module.exports = router;
