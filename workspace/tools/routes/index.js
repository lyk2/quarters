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

router.get('/live-start', function(req, res, next) {
	var exec = require('child_process').exec,
	child;

	child = exec('quarters-web live start',
		function (error, stdout, stderr) {
			res.render('dev', {content : stdout});
		});
});

router.get('/dev-start', function(req, res, next) {
	var exec = require('child_process').exec,
	child;

	child = exec('quarters-web dev start',
		function (error, stdout, stderr) {
			res.render('dev', {content : stdout});
		});
});

router.get('/tools-start', function(req, res, next) {
	var exec = require('child_process').exec,
	child;

	child = exec('quarters-web tools start',
		function (error, stdout, stderr) {
			res.render('dev', {content : stdout});
		});
});

router.get('/live-app.log', function(req, res, next) {
	var exec = require('child_process').exec,
	child;

	child = exec('quarters-web live app.log',
		function (error, stdout, stderr) {
			res.render('dev', {content : stdout});
		});
});

router.get('/live-output.log', function(req, res, next) {
	var exec = require('child_process').exec,
	child;

	child = exec('quarters-web live output.log',
		function (error, stdout, stderr) {
			res.render('dev', {content : stdout});
		});
});

router.get('/live-error.log', function(req, res, next) {
	var exec = require('child_process').exec,
	child;

	child = exec('quarters-web live error.log',
		function (error, stdout, stderr) {
			res.render('dev', {content : stdout});
		});
});

router.get('/dev-app.log', function(req, res, next) {
	var exec = require('child_process').exec,
	child;

	child = exec('quarters-web dev app.log',
		function (error, stdout, stderr) {
			res.render('dev', {content : stdout});
		});
});

router.get('/dev-output.log', function(req, res, next) {
	var exec = require('child_process').exec,
	child;

	child = exec('quarters-web dev output.log',
		function (error, stdout, stderr) {
			res.render('dev', {content : stdout});
		});
});

router.get('/dev-error.log', function(req, res, next) {
	var exec = require('child_process').exec,
	child;

	child = exec('quarters-web dev error.log',
		function (error, stdout, stderr) {
			res.render('dev', {content : stdout});
		});
});

router.get('/tools-app.log', function(req, res, next) {
	var exec = require('child_process').exec,
	child;

	child = exec('quarters-web tools app.log',
		function (error, stdout, stderr) {
			res.render('dev', {content : stdout});
		});
});

router.get('/tools-output.log', function(req, res, next) {
	var exec = require('child_process').exec,
	child;

	child = exec('quarters-web tools output.log',
		function (error, stdout, stderr) {
			res.render('dev', {content : stdout});
		});
});

router.get('/tools-error.log', function(req, res, next) {
	var exec = require('child_process').exec,
	child;

	child = exec('quarters-web tools error.log',
		function (error, stdout, stderr) {
			res.render('dev', {content : stdout});
		});
});




module.exports = router;
