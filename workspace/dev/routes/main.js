var express = require('express');
var router = express.Router();

// this is occurs on every request, use to check against session for valid use
router.use(function timeLog(req, res, next) {
	if(req.session.user)
		next();
	else {
		//res.send('please log in');
		// uncomment this to allow testing
		req.session.user = {};
		req.session.user.uid = 6;
		next();
	}
});

router.get('/', function(req, res, next) {
	res.render('app/bulletin', genPageData(req.session));
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

	// load application module
	var houseinfo = require('./app-utils/house-info');
	var data = genPageData();

	//hard set
	data.active_house_id = "26";

	houseinfo.render(data, res);
});

router.get("/logout", function(req, res, next) {

	res.redirect('../');

	req.session.destroy();
});

function genPageData() {

	var data = {
		name: "some name here",
		address: "123 idk",
		uid: 3
	};

	return data;
}

module.exports = router;
