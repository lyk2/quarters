var express = require('express');
var router = express.Router();
var db = require('./db-con');


// this is occurs on every request, use to check against session for valid use
// router.use(function timeLog(req, res, next) {
//     if(req.session.user)
//         next();
//     else {
//         //res.send('please log in');
//         // uncomment this to allow testing
//         req.session.user = {};
//         req.session.user.uid = 6;
//         next();
//     }
// });

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('db calendar interface');
});

// load all events into calendar
router.post('/getEvents',function(req,res,next){
    var query = "SELECT event_id AS id, event_title AS title, event_start AS start, event_end AS end, event_color AS color, house_id FROM events WHERE house_id=$1 ORDER BY event_id;"
    db.query(query,[req.session.house.active_house_id])
     .then(function(data){
        res.send(data);
     })
     .catch(function(error){
        res.send(error);
     });
});

// add event to calendar
router.post('/addEvent', function(req,res,next){
    var event_title = req.body.event_title;
    var event_start = req.body.event_start;
    var event_end = req.body.event_end;
    var event_color = req.body.event_color;
    var query = "INSERT into events (house_id,event_title,event_start,event_end,event_color) VALUES ($1,$2,$3,$4,$5) RETURNING event_id;"
    db.query(query,[req.session.house.active_house_id,event_title,event_start,event_end,event_color])
        .then(function(data){
            res.send('{"event_id":'+data[0].event_id+"}");
        })
        .catch(function(error){
            res.send('error occured while adding calendar event');
        });
});

// edit calendar event
router.post('/editEvent', function(req,res,next){
	var data = req.body;
	var event_id = req.body.event_id;
    var event_title = req.body.event_title;
    var event_start = req.body.event_start;
    var event_end = req.body.event_end;
    var event_color = req.body.event_color;
    var query = "UPDATE events SET event_title=$1,event_start=$2,event_end=$3,event_color=$4 WHERE event_id=$5 AND house_id=$6;"
    db.query(query,[event_title,event_start,event_end,event_color,event_id,req.session.house.active_house_id])
        .then(function(data){
            // res.send('{"event_start": ' + event_start + ', "event_end": ' + event_end + ', "event_title": ' + event_title + ', "event_color": ' + event_color + '}');
            res.send(data);
        })
        .catch(function(error){
            res.send('error occured while editing calendar event');
        });
});

// delete event from calendar
router.post('/deleteEvent', function(req,res,next){
    var event_id = req.body.event_id;
    var query = "DELETE from events WHERE event_id=$1;"
    db.query(query,req.body.event_id)
        .then(function(data){
            res.send('{"event_id": ' + event_id + '}');
        })
        .catch(function(error){
            res.send('error occured while deleting calendar event');
        });
});

// get all events
// router.get('/myfeed', function(req, res, next) {
// 	var obj = {
// 		title: 'event1',
// 		start: '2016-04-10'
// 	}
// 	res.send(JSON.stringify(obj));
// });



module.exports = router;
