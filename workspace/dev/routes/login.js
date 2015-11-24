var express = require('express');
var router = express.Router();
var pg = require("pg");
var port = 5433;
var host = 'system.space.quarters';

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login');
});

// target for form submit
var conString = "pg://quarters:qadmin@system.quarters.space/quarters";
var client = new pg.Client(conString);
client.connect();

router.post('/', function (req, response) {

    var email = req.body.email;
    var password = req.body.password;
    var error = null;
    var bcrypt = require('bcryptjs');
    client.query("SELECT user_name,password from \"users\" WHERE user_name = $1", [email], function (err, result) {
        if (result.rows.length == 0) {
            error = 'Incorrect username/password';
            console.log(error);
            response.status(403);
            response.render('login', {
                error: error
            });
        } else {
            if (!bcrypt.compareSync(password, result.rows[0].password)) {
                error = 'Incorrect username/password.';
                console.log(error);
                response.status(403);
                response.render('login', {
                    error: error
                });
            } else {
                console.log('user found');
                response.redirect("../main");
            }
        }
    });
});

module.exports = router;
