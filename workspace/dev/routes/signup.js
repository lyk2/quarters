var express = require('express');
var router = express.Router();
var pg = require("pg");
var port = 5433;
var host = 'system.space.quarters';

/* GET signup page. */
router.get('/', function (req, res, next) {
    res.render('signup');
});

router.post('/', function (req, response) {

    var email = req.body.email;
    var password = req.body.password;
    var error = null;

    var client = new pg.Client(req.app.locals.db.connect);
    client.connect();

    client.query("SELECT user_name from \"users\" WHERE user_name = $1", [email], function (err, result) {
        if (result.rows.length != 0) {
            error = 'Email is already taken, please try something else.';
        }
        errorOut(error);
    });
    function errorOut(error) {
        if (error) {
            response.status(403);
            response.render('signup', {
                error: error
            });
            return
        } else {
            // Load the bcrypt module
            var bcrypt = require('bcryptjs');
            // Generate a salt
            var salt = bcrypt.genSaltSync(10);
            // Hash the password with the salt
            var hash = bcrypt.hashSync(password, salt);
            client.query("INSERT INTO users(user_name, password) values($1, $2)", [email, hash]);
            req.session.user = {uid: email};
            response.redirect("../main");
        }
    }

});

module.exports = router;

