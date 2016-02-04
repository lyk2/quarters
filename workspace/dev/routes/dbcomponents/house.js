var express = require('express');
var router = express.Router();
var db = require('./db-con');


// this is occurs on every request, use to check against session for valid use
router.use(function timeLog(req, res, next) {
  console.log('check session');
  next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
 	res.send('db house interface');
});

router.get('/create', function(req, res, next) {

	var data = req.query;

	if (Object.keys(data).indexOf('address') != 0) {
		var error = { errorcode: 'no address provided'};

		res.send(JSON.stringify(error));
		return;
	}


	db.query("INSERT INTO house (address) VALUES ($1) RETURNING *;", "123 test")
 	.then(function(data){
 		res.send(JSON.stringify(data[0]));

 		console.log(data);
 	}).catch(function(error){
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
    .then(function (data) {
        res.send('connection is online: ' + data.theTime);
    })
    .catch(function (error) {
        res.send('failed');
    });

});


function dbquery(){

};








module.exports = router;
