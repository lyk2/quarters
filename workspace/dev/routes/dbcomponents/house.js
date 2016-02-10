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
                return t.one("insert into role (user_id, house_id, role) values ($1, $2, $3) returning *", [req.session.user.uid, house.house_id, 1]);
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
	console.log(data);
	db.query("Insert into role (user_id,house_id,role) values ($1,$2,$3)",[req.session.user.uid, data.houseId, 0])
			.then(function(data){
				res.send("{}");
			})
			.catch(function(error){
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

	db.one('delete from role where user_id=$1 and house_id=$2', req.session.user.uid, req.body.house_id)
		.then(function(data){
			res.send('{deleted:true}');
		})
		.catch(function(error){
			console.log(error);
			res.send('{failed:false}');
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





module.exports = router;
