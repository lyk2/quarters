var express = require('express');
var router = express.Router();

// this is occurs on every request, use to check against session for valid use
router.use(function timeLog(req, res, next) {

	if (req.session.user && req.session.house) {
		next();
	}
	else if (req.session.user &&!req.session.house) {
		// get default house
		var db = require('./dbcomponents/db-con');
		db.query('select address, house_id from user_info, house where user_id=$1 and house.house_id=user_info.default_house_id', req.session.user.uid)
			.then(function(data){
				req.session.house = {
					active_house_id: data[0].house_id,
					address: data[0].address.trim()
				};
				next();
			})
			.catch(function(error){
				console.log(error);
			});
	}
	else {
		req.session.user = {
			uid: 6,
			email: "mem1@hello.ca"
		};
		req.session.house = {
			active_house_id : 26,
			address : "NO IDEA"
		};
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
	//res.render('app/userprofile', genPageData(req.session));
	// load application module
	var userinfo = require('./app-utils/user-info');
	var data={};

	if(req.query.uid)
		data.user_id = req.query.uid;
	else
		data.user_id =  req.session.user.uid;

	userinfo.render(data, res);
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

function genPageData(x) {

	x.user = {
		uid : 6,
	};
	x.house = {
		hid: 30,
		address: ""
	}

	return x;
}

module.exports = router;
