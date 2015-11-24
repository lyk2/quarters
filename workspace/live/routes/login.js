var express = require('express');
var router = express.Router();

var pg = require("pg");

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login');
});

router.post('/', function (req, response) {

    var email = req.body.email;
    var password = req.body.password;
    var error = null;
    var bcrypt = require('bcryptjs');

    var client = new pg.Client(req.app.locals.db.connect);
    client.connect();
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
                req.session.user = {uid : email, password : password};
                response.redirect("../main");
            }
        }
    });
});

module.exports = router;
