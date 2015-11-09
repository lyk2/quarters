var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dev Tools' });
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

router.get('/restart', function(req, res, next) {
	var exec = require('child_process').exec,
	child;

	child = exec('quarters-web devmode',
		function (error, stdout, stderr) {
			res.render('dev', {content : stdout});
		});
});

router.get('/app.log', function(req, res, next) {
	var exec = require('child_process').exec,
	child;

	child = exec('quarters-web app-log',
		function (error, stdout, stderr) {
			res.render('dev', {content : stdout});
		});
});

router.get('/output.log', function(req, res, next) {
	var exec = require('child_process').exec,
	child;

	child = exec('quarters-web output-log',
		function (error, stdout, stderr) {
			res.render('dev', {content : stdout});
		});
});

router.get('/error.log', function(req, res, next) {
	var exec = require('child_process').exec,
	child;

	child = exec('quarters-web error-log',
		function (error, stdout, stderr) {
			res.render('dev', {content : stdout});
		});
});


module.exports = router;
