var express = require('express');
var router = express.Router();
var db = require('./db-con');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('authentication interface');
});

router.post('/signup', function(req, res, next) {
	var email = req.body.email;
	var password = req.body.password;

	var bcrypt = require('bcryptjs');

	// Generate a salt
	var salt = bcrypt.genSaltSync(10);
	// Hash the password with the salt
	var hash = bcrypt.hashSync(password, salt);

	db.query('INSERT INTO "user"(email, password) values($1, $2)', [email, hash])
		.then(function(data) {
			res.send('{"success":true}');
		}).catch(function(error) {
			res.send(error);
		});
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

	db.query('SELECT * from "user" WHERE email = $1', [email])
		.then(function(data) {
			if (data.length === 0) {
				res.send('failed - err code 1');
			} else {

				if (!bcrypt.compareSync(password, data[0].password.trim())) {
					res.send('failed - err code 2');
				} else {
					req.session.user = {
						uid: data[0]["user_id"],
						email: email
					};
					console.log(req.session.user);
					res.send('{"success":true}');
				}
			}
		})
		.catch(function(error) {
			res.send('failed');
		});
});


module.exports = router;
