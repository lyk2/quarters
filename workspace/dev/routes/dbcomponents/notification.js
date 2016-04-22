/**
 * Created by wenqiang on 4/22/2016.
 */
var express = require('express');
var router = express.Router();
var db = require('./db-con');

router.post('/getNotification',function(req,res,next){
    db.query('select description, viewed,action, (select extract (\'epoch\' from (now()-time))) time_passed  from notification,notification_view where notification.house_id=$1 and notification_view.user_id=$2 and notification.notification_id = notification_view.notification_id order by time_passed, viewed limit 20;',[req.session.house.active_house_id,req.session.user.uid])
        .then(function(data){
            res.send(data);
        }).catch(function (error) {
            res.send(error);
    });
});

router.post('/newNotification',function(req,res,next){
    var description = req.body.description;
    var action = req.body.action;
    db.query('insert into notification (house_id, description, action) values ($1,$2,$3) RETURNING notification_id;',[req.session.house.active_house_id, description,action])
        .then(function(data){
            var notification_id = data[0].notification_id;
            var houseMembers = req.session.house.members;
            for (var i = 0; i < houseMembers.length; i++) {
                db.query ('insert into notification_view (notification_id,user_id) values ($1,$2);',[notification_id,houseMembers[i].user_id])
                    .then(function(data2)
                    {
                        //res.send({});
                    }).catch(function (error2){
                   // res.send(error2)
                });
            }
        }).catch(function (error) {
            //res.send(error);
    });
    res.send({});
});

router.post('/markViewed',function(req,res,next){
    db.query ("update notification_view set viewed = true where notification_id in (select notification_id from notification where house_id = $1) and user_id=$2 and viewed=false",[req.session.house.active_house_id,req.session.user.uid])
        .then(function(data){
            res.send({});
        })
        .catch(function(error){
            res.send(error);
        });
});

module.exports = router;
