var express = require('express');
var router = express.Router();

var sys = require('util');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/update', function(req, res, next) {
	var exec = require('child_process').exec,
    child;

	child = exec('quarters-web update',
	  function (error, stdout, stderr) {
	    res.send(stdout);
	});
});

router.get('/status', function(req, res, next) {
	var exec = require('child_process').exec,
    child;

	child = exec('quarters-web status',
	  function (error, stdout, stderr) {
	    res.send(stdout);
	});
});

router.get('/htop', function(req, res, next) {
	var exec = require('child_process').exec,
    child;

	child = exec('htop',
	  function (error, stdout, stderr) {
	    res.send(stdout);
	});
});




module.exports = router;
