var express = require('express');
var router = express.Router();

// this is occurs on every request, use to check against session for valid use
router.use(function timeLog(req, res, next) {

	// req.session.user = {
	// 	uid: 6,
	// 	email: "hacked test"
	// };

	if (req.session.user && req.session.house) {
		next();
	}
	else if (req.session.user &&!req.session.house) {
		// get default house
		var db = require('./dbcomponents/db-con');
		db.tx(function(t) {
			return t.batch([
				t.any('select address, house_id from user_info, house where user_id=$1 and house.house_id=user_info.default_house_id', req.session.user.uid),
				t.query('select house.house_id, house.address from role, house where user_id=$1 and role.house_id = house.house_id;', req.session.user.uid)
			]);
		})
		.then(function(data) {
			console.log(data);
			console.log("here");
			var address = (data[0].address) ? data[0].address.trim() : "";
			var active_house_id = (data[0].house_id) ? data[0].house_id : -1;

			req.session.house = {
				active_house_id: active_house_id,
				address: address,
				all_houses: data[1]
			};
			next();
		})
		.catch(function(error){
			console.log(error);
		});
	}
	else {
		res.send('please log in');
	}
});

router.get('/', function(req, res, next) {
	res.redirect('/main/bulletin');
});

router.get('/bulletin', function(req, res, next) {
	res.render('app/bulletin', req.session);
});

router.get('/calendar', function(req, res, next) {
	res.render('app/calendar', req.session);
});

router.get('/finances', function(req, res, next) {
	res.render('app/finances', req.session);
});

router.get('/maintenance', function(req, res, next) {
	res.render('app/maintenance', req.session);
});

router.get('/messages', function(req, res, next) {
	res.render('app/messages', req.session);
});

router.get('/userprofile', function(req, res, next) {
	var userinfo = require('./app-utils/user-info');

	if(req.query.uid)
		userinfo.render(req.session, res, req.query.uid);
	else
		userinfo.render(req.session, res);

});

router.get('/accountsettings', function(req, res, next) {
	res.render('app/accountsettings', req.session);
});

router.get('/documents', function(req, res, next) {
	// load application module
	var houseinfo = require('./app-utils/house-info');
	houseinfo.render(req.session, res);
});

router.get("/logout", function(req, res, next) {

	res.redirect('../../');

	req.session.destroy();
});

module.exports = router;
