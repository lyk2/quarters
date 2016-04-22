var express = require('express');
var router = express.Router();
var db = require('./db-con');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('authentication interface');
});

router.post('/update', function(req, res, next) {

    var name = req.body.full_name;
    var cell = req.body.cell_num;
    var desc = req.body.description;
    var user = req.session.user.uid;

    console.log(name);
    console.log(cell);
    console.log(desc);

    var update_query = "UPDATE user_info SET full_name = ($1), cell_num = ($2), description = ($3) WHERE user_id = ($4)";
    
    db.query(update_query, [name, cell, desc, user])
        .then(function(data) {
            res.redirect('/main/userprofile');
	    //res.send('{"success":true}');
            console.log("ok");
	}).catch(function(error) {
            console.log("nope...");
            res.send(error);
	});
});

router.post('/signup', function(req, res, next) {
	var email = req.body.email;
	var password = req.body.password;

	var bcrypt = require('bcryptjs');

	// Generate a salt
	var salt = bcrypt.genSaltSync(10);
	// Hash the password with the salt
	var hash = bcrypt.hashSync(password, salt);

	db.query('INSERT INTO "user"(email, password) values($1, $2) returning user_id', [email, hash])
		.then(function(data) {
			var uid = data[0].user_id;
			db.query('insert into user_info (user_id) values ($1);',[uid])
					.then(function(data) {
						res.send('{"success":true}');
					}).catch(function(error) {
						res.send(error);
					});
		}).catch(function(error) {
			res.send(error);
		});
	//todo generate user info
});

router.post('/em', function(req, res, next) {
	var email = req.body.email;

	db.query('select email from "user" where email=$1', email)
		.then(function(data) {
			if (data.length > 0)
				res.send('{"taken":true}');
			else
				res.send('{"taken":false}');
		}).catch(function(error) {
			res.send(error);
		});
});

router.post('/login', function(req, res, next) {
	var email = req.body.email;
	var password = req.body.password;
	var bcrypt = require('bcryptjs');

	db.query('select * from "user" as u, user_info as ui where u.user_id=ui.user_id and email=$1', [email])
		.then(function(data) {
			if (data.length === 0) {
				res.send('failed - err code 1');
			} else {

				if (!bcrypt.compareSync(password, data[0].password.trim())) {
					res.send('failed - err code 2');
				} else {
					req.session.user = {
						uid: data[0].user_id,
						email: email,
						full_name:data[0].full_name
					};
					res.send('{"success":true}');
				}
			}
		})
		.catch(function(error) {
			res.send('failed');
		});
});


module.exports = router;
