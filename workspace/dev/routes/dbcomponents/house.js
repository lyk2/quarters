var express = require('express');
var router = express.Router();
var db = require('./db-con');


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

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('db house interface');
});

router.get('/create', function(req, res, next) {

	var data = req.query;

	// generate auth code
	var date = new Date();
	var invitecode = "" + req.session.user.uid + date.getMonth() + date.getDate()+ date.getMilliseconds();

	if (Object.keys(data).indexOf('address') !== 0) {
		var error = {
			errorcode: 'no address provided'
		};

		res.send(JSON.stringify(error));
		return;
	}

	db.query("INSERT INTO house (address, invite_code) VALUES ($1, $2) RETURNING *;", [data.address, invitecode])
		.then(function(data) {
			res.send(JSON.stringify(data[0]));

			console.log(data);
		}).catch(function(error) {
			res.send(error);
		});
});

router.get('/join', function(req,res,next){
	var data = req.query;
	console.log(data);
	//	db.query("Insert into role (user_id,house_id,role) values (1,23,1)")
	db.query("Insert into role (user_id,house_id,role) values ($1,$2,$3)",[data.userId,data.houseId,data.role])
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



function dbquery() {

}








module.exports = router;
