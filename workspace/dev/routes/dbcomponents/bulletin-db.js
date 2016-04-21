var express = require('express');
var router = express.Router();
var db = require('./db-con');


// this is occurs on every request, use to check against session for valid use
router.use(function timeLog(req, res, next) {
    //req.session.user = {
	//	uid: 6,
	//	email: "hacked test"
	//};

    if (req.session.user && req.session.house) {
		next();
	}
	else if (req.session.user &&!req.session.house) {
		// get default house
		db.tx(function(t) {
			return t.batch([
				t.query('select address, house_id from user_info, house where user_id=$1 and house.house_id=user_info.default_house_id', req.session.user.uid),
				t.query('select house.house_id, house.address from role, house where user_id=$1 and role.house_id = house.house_id;', req.session.user.uid)
			]);
		})
		.then(function(data) {
			var address = (data[0][0].address) ? data[0][0].address.trim() : "";
			var active_house_id = (data[0][0].house_id) ? data[0][0].house_id : -1;

			req.session.house = {
				active_house_id: active_house_id,
				address: address,
				all_houses: data[1]
			};

			//console.log(req.session.house);
			next();
		})
		.catch(function(error){
			console.log(error);
		});
	}
	else {
		res.send('please log in');
	}
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('db bulletin interface');
});


router.post('/addPost', function(req,res,next){
    var data = req.body;


    function getTimeStamp(date) {
        var now = new Date(date);
       return (now.getFullYear()  + '-' + (now.getMonth() + 1) + '-' + (now.getDate()) + " " + now.getHours() + ':'
                     + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now
                     .getSeconds()) : (now.getSeconds())));
                 }
    console.log(getTimeStamp(data.date_time));
    db.query("insert into bulletin_posts (user_id, house_id, comment, date_time) values($1, $2, $3, $4) returning post_id",
            [req.session.user.uid, req.session.house.active_house_id, data.comment, getTimeStamp(data.date_time)])
        .then(function(data){
            res.send(data);
        })
        .catch(function(error){
            res.send(error);
        });
});

module.exports = router;
