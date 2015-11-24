var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  	res.redirect('../main/bulletin');
});

router.get('/bulletin', function(req, res, next) {
  res.render('app/bulletin', {firstname :"Test", lastname:"awfasdf", house :"1280 Main St West"});  
});

router.get('/calendar', function(req, res, next) {
  res.render('app/calendar');
});

router.get('/finances', function(req, res, next) {
  res.render('app/finances');
});

router.get('/maintenance', function(req, res, next) {
  res.render('app/maintenance');
});

router.get('/messages', function(req, res, next) {
  res.render('app/messages');
});

router.get('/userprofile', function(req, res, next) {
  res.render('app/userprofile');
});

router.get('/accountsettings', function(req, res, next) {
  res.render('app/accountsettings');
});








module.exports = router;
