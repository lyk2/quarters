var express = require('express');
var router = express.Router();
var db = require('./db-con');

router.get('/', function(req, res, next) {
    res.send('db ticket interface');
});

router.post('/sesh', function(req, res, next){
  res.send(JSON.stringify(req.session));
});

router.post('/new', function(req, res, next){
  var data = req.body;
  var inserts = [req.session.user.uid, req.session.house.active_house_id, data.title, data.description, "New", parseInt(data.urgency), getTimeStamp(data.date_time), getTimeStamp(data.date_time)];
  console.log(inserts);
  db.query("insert into tickets (user_id, house_id, title, description, status, urgency, create_date_time, updated_date_time) values($1, $2, $3, $4, $5, $6, $7, $8) returning *",
            inserts)
        .then(function(data){
            res.send(data);
        })
        .catch(function(error){
            res.send(error);
        });
});

router.post('/show', function(req, res, next){
  db.query("select * from tickets where house_id=$1 ORDER BY updated_date_time ASC", req.session.house.active_house_id)
    .then(function(data){
      res.send(data);
    })
    .catch(function(error){
      res.send(error);
    });
});

router.post('/getreply', function(req, res, next){
  db.query("select * from tickets_replies where ticket_id=$1 ORDER BY date_time ASC", req.body.ticket_id)
    .then(function(data){
      res.send(data);
    })
    .catch(function(error){
      res.send(error);
    });
});

router.post("/reply", function(req, res, next){
  var data = req.body;
  console.log(data);
  db.query("insert into tickets_replies(ticket_id, user_id, comment, date_time) values($1, $2, $3, $4) returning *", [data.ticket_id, req.session.user.uid, data.comment, getTimeStamp(data.date_time)])
    .then(function(data){
      res.send(data);
    })
    .catch(function(error){
      res.send(error);
    });

});


router.post('/rm', function(req, res, next){
  console.log(req.body);
  db.query("delete from tickets where ticket_id=$1", req.body.ticket_id)
    .then(function(data){
      res.send({});
    })
    .catch(function(error){
      res.send(error);
    });
});




function getTimeStamp(date) {
    var now = new Date(date);
   return (now.getFullYear()  + '-' + (now.getMonth() + 1) + '-' + (now.getDate()) + " " + now.getHours() + ':'
                 + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now
                 .getSeconds()) : (now.getSeconds())));
             }

module.exports = router;
