var express = require('express');
var router = express.Router();
var db = require('./db-con');


// this is occurs on every request, use to check against session for valid use
// router.use(function timeLog(req, res, next) {
// 	if(req.session.user)
// 		next();
// 	else {
// 		res.send('please log in');
// 	}
// });

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('db house interface');
});

router.get('/myfeed', function(req, res, next) {

	var obj = {
		title: 'event1',
		start: '2012-06-10'
	}

	res.send(JSON.stringify(obj));

});



module.exports = router;
