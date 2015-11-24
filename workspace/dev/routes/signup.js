var express = require('express');
var router = express.Router();
var pg = require("pg");
var port = 5433;
var host = 'system.space.quarters';

/* GET signup page. */
router.get('/', function (req, res, next) {
    res.render('signup');
    //res.send('respond with a resource');
});

/*
 // ajax target for checking username
 router.post('/check/username', function(req, res) {
 var username = req.body.username;
 // check if username contains non-url-safe characters
 if (username !== encodeURIComponent(username)) {
 res.json(403, {
 invalidChars: true
 });
 return;
 }*/
/*
 // check if username is already taken - query your db here
 var usernameTaken = false;
 for (var i = 0; i < dummyDb.length; i++) {
 if (dummyDb[i].username === username) {
 usernameTaken = true;
 break;
 }
 }
 if (usernameTaken) {
 res.json(403, {
 isTaken: true
 });
 return
 }
 // looks like everything is fine
 res.send(200);
 });
 */
// target for form submit
var conString = "pg://quarters:qadmin@system.quarters.space/quarters";
var client = new pg.Client(conString);
client.connect();

router.post('/', function (req, response) {


    // var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var verification = req.body.verification;
    var error = null;
    // regexp from https://github.com/angular/angular.js/blob/master/src/ng/directive/input.js#L4
    var EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;

    // check for valid inputs
    if (!email || !password || !verification) {
        error = 'All fields are required';
    } else if (!email.match(EMAIL_REGEXP)) {
        error = 'Email is invalid';
    } else if (password !== verification) {
        error = 'Passwords don\'t match';
    }

    if (error) {
        response.status(403);
        response.render('signup', {
            error: error
        });
        return
    }

    // Load the bcrypt module
    var bcrypt = require('bcrypt');
    // Generate a salt
    var salt = bcrypt.genSaltSync(10);
    // Hash the password with the salt
    var hash = bcrypt.hashSync(password, salt);

    client.query("INSERT INTO users(user_name, password) values($1, $2)", [email, hash]);

});

module.exports = router;

