var express = require('express');
var router = express.Router();
var db = require('./db-con');


// this is occurs on every request, use to check against session for valid use
router.use(function timeLog(req, res, next) {
	if(req.session.user)
		next();
	else {
		res.send('please log in');
	}
});

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('db house interface');
});

router.get('/create', function(req, res, next) {

	var data = req.query;

	// generate auth code
	var date = new Date();
	var invitecode = "" + req.session.user.uid + date.getMonth() + date.getDate() + date.getHours() + date.getMilliseconds();

	data.invite = invitecode;
	if (Object.keys(data).indexOf('address') !== 0) {
		var error = {
			errorcode: 'no address provided'
		};

		res.send(JSON.stringify(error));
		return;
	}

	if (!data.city) data.city = "";
	if (!data.province) data.province = "";
	if (!data.country) data.country = "";
	if (!data.postalCode) data.postalCode = "";

	db.task(function (t) {
        return t.one("insert into house (address, city, province, country, postal_code, invite_code) values (${address}, ${city}, $(province), $(country), $(postalCode), $(invite)) returning *", data)
            .then(function (house) {
				req.session.house.all_houses.push({house_id:house.house_id, address:house.address});
                return t.one("insert into role (user_id, house_id, role) values ($1, $2, $3) returning *", [req.session.user.uid, house.house_id, 1])
				.then(function(d){
					res.send(house);
				});
            });
    })
    .then(function (events) {
        res.send(events);
    })
    .catch(function (error) {
        res.send(error);
    });


});

router.get('/join', function(req,res,next){
	var data = req.query;

	if (!data.invite) {
		res.send("enter invite code");
	}

	db.task(function (t) {
		return t.one("select * from house where invite_code=$1", req.query.invite)
			.then (function(house){
				console.log(house);
				return t.one("insert into role (user_id, house_id, role) values ($1, $2, $3) returning *", [req.session.user.uid, house.house_id, 0])
					.then (function(d){
						console.log(d);
						var newHouse = {house_id:house.house_id, address: house.address.trim()};
						req.session.house.all_houses.push(newHouse);
						res.send(house);
					})
					.catch(function (error) {
						console.log(error);
						res.send(error);
					});
			})
			.catch(function (error) {
				console.log(error);
				res.send(error);
			});
		})
		.then(function (events) {
			res.send(events);
		})
		.catch(function (error) {
			console.log(error);
			res.send(error);
		});
});


router.post('/checkInvite', function(req, res, next) {
	var inviteCode = req.body.invite;

	db.query('select invite_code from "house" where invite_code=$1', inviteCode)
			.then(function(data){
				if (data.length > 0)
					res.send('{"valid":true}');
				else
					res.send('{"valid":false}');
			}).catch(function(error){
		res.send(error);
	});
});

router.get('/connection', function(req, res, next) {
	db.one('SELECT NOW() as "theTime"')
		.then(function(data) {
			res.send('connection is online: ' + data.theTime);
		})
		.catch(function(error) {
			res.send('failed');
		});

});

router.post('/leave', function(req, res, next) {

	if (!req.body.house_id) {
		res.send("provide house id");
	}

	db.none('delete from role where user_id=$1 and house_id=$2', [req.session.user.uid, req.body.house_id])
		.then(function(data){
			for (i = 0; i < req.session.house.all_houses.length; i++){
				if (req.session.house.all_houses[i].house_id == req.body.house_id) {
					req.session.house.all_houses.splice(i, 1);
				}
			}
			res.send('{"deleted":true}');
		})
		.catch(function(error){
			console.log(error);
			res.send('{"failed":false}');
		})
});

router.get('/test', function(req, res, next) {

	db.tx(function(t) {
			// this = t = transaction protocol context;
			// this.ctx = transaction config + state context;
			return t.batch([
				t.one('SELECT NOW() as "theTime"'),
				t.one('SELECT NOW() as "WTF"')
			]);
		})
		// using .spread(function(user, event)) is best here, if supported;
		.then(function(data) {
			console.log(data[0]); // print new user id;
			console.log(data[1]); // print new event id;

			res.send('asdf');
		})
		.catch(function(error) {
			// error;
		});
});

router.get('/wtf', function(req,res, next) {
	res.send(req.session);
});

router.get('/select', function(req,res, next) {
	if (!req.query.house_id)
		res.send('no house_id provided');

	req.session.house.active_house_id = req.query.house_id;
	req.session.house.address = req.query.address;

	db.query('select distinct * from role, user_info where house_id=$1 and role.user_id=user_info.user_id', req.session.house.active_house_id)
			.then(function(data){
				req.session.house.members = data[0];
				res.send('{"WOO": true}');
			}).catch(function(error){
		res.send(error);
	});



});





module.exports = router;
