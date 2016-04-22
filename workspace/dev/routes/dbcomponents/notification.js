/**
 * Created by wenqiang on 4/22/2016.
 */
var express = require('express');
var router = express.Router();
var db = require('./db-con');

router.post('/getNotification',function(req,res,next){
    db.query('select description, viewed,action, (select extract (\'epoch\' from (now()-time))) time_passed  from notification,notification_view where notification.house_id=$1 and notification_view.user_id=$2 and notification.notification_id = notification_view.notification_id limit 20;;',[req.session.house.active_house_id,req.session.user.uid])
        .then(function(data){
            res.send(data);
        }).catch(function (error) {
            res.send(error);
    });
});
module.exports = router;
