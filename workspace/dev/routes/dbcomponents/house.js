var express = require('express');
var router = express.Router();
var db = require('./db-con');


/* GET users listing. */
router.get('/', function(req, res, next) {
 	res.send('respond with a house resource');
});

router.get('/connection', function(req, res, next) {
	db.one('SELECT NOW() as "theTime"')
    .then(function (data) {
        res.send('respond with a house resource ' + data.theTime);
    })
    .catch(function (error) {
        res.send('failed');
    });

});


function dbquery(){

};








module.exports = router;
