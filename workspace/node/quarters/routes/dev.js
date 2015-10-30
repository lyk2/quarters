var express = require('express');
var router = express.Router();

var sys = require('util');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send("dev tools");
});

/* GET users listing. */
router.get('/update', function(req, res, next) {
	var exec = require('child_process').exec,
	child;

	child = exec('quarters-web update',
		function (error, stdout, stderr) {
			res.render('dev', {content : stdout});
		});
});

router.get('/status', function(req, res, next) {
	var exec = require('child_process').exec,
	child;

	child = exec('quarters-web status',
		function (error, stdout, stderr) {
			res.render('dev', {content : stdout});
		});
});

router.get('/dbconnect', function(req, res, next) {

	var pg = require('pg');
	var conString = "postgres://quarters:quarters@localhost:5432/quarters";

	pg.connect(conString, function(err, client, done) {

		if (err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('select * from playground;', function(err, result) {
			done();
			if (err) {
				res.send("LOL");
				return console.error('error running query');
			}
			res.send(result);
		});

	});

	//es.send("test");
});
module.exports = router;
