var express = require('express');
var router = express.Router();
var db = require('./db-con');


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
