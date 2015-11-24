var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	var user = req.session.user;
	if (user)
  		res.redirect('../main/bulletin');
  	else 
  		res.redirect('../');
});

router.get('/bulletin', function(req, res, next) {
  res.render('app/bulletin', genPageData(req.session));  
});

router.get('/calendar', function(req, res, next) {
  res.render('app/calendar', genPageData(req.session));
});

router.get('/finances', function(req, res, next) {
  res.render('app/finances', genPageData(req.session));
});

router.get('/maintenance', function(req, res, next) {
  res.render('app/maintenance', genPageData(req.session));
});

router.get('/messages', function(req, res, next) {
  res.render('app/messages', genPageData(req.session));
});

router.get('/userprofile', function(req, res, next) {
  res.render('app/userprofile', genPageData(req.session));
});

router.get('/accountsettings', function(req, res, next) {
  res.render('app/accountsettings', genPageData(req.session));
});

router.get('/documents', function(req, res, next) {
  res.render('app/documents', genPageData(req.session));
});

router.get("/logout", function(req, res, next) {

	res.redirect('../');

	req.session.destroy();
});

function genPageData (session) {

	var data = {};
	data.firstname = session.user.uid;
	data.house = "1280 Main St West";

	return data;
};







module.exports = router;
