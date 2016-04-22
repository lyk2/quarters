var express = require('express');
var router = express.Router();
var db = require('./db-con');



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

router.post('/rmPost', function(req,res,next){
    var data = req.body;
    db.query("delete from bulletin_posts where post_id=$1;",
            data.postid)
        .then(function(data){
            res.send('{"done":true}');
        })
        .catch(function(error){
            res.send(error);
        });
});

router.post('/rmSubPost', function(req,res,next){
    var data = req.body;
    var subpost_id = data.postid;
    db.query("delete from bulletin_replies where subpost_id=$1;",
            data.postid)
        .then(function(data){
            res.send('{"subpostid": ' + subpost_id + '}');
        })
        .catch(function(error){
            res.send(error);
        });
});

router.post('/newSubPost', function(req, res, next){
    var data = req.body;

    function getTimeStamp(date) {
        var now = new Date(date);
       return (now.getFullYear()  + '-' + (now.getMonth() + 1) + '-' + (now.getDate()) + " " + now.getHours() + ':'
                     + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now
                     .getSeconds()) : (now.getSeconds())));
                 }

    console.log(getTimeStamp(data.date_time));
    db.query("insert into bulletin_replies (user_id, house_id, comment, date_time, post_id) values($1, $2, $3, $4, $5) returning * ",
            [req.session.user.uid, req.session.house.active_house_id, data.comment, getTimeStamp(data.date_time), data.post_id])
        .then(function(data){
            res.send(data);
        })
        .catch(function(error){
            res.send(error);
        });
});


router.post('/getSubPost', function(req, res, next) {
    var data = req.body;
    db.query('select * from bulletin_replies as a, user_info as b where a.post_id=$1 and a.user_id=b.user_id ORDER BY date_time ASC;', data.postid)
        .then(function(data){
            res.send(data);
        })
        .catch(function(error){
            res.send(error);
        });

});


module.exports = router;
