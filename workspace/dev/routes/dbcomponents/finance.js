var express = require('express');
var router = express.Router();
var db = require('./db-con');


// this is occurs on every request, use to check against session for valid use
router.use(function timeLog(req, res, next) {
    if(req.session.user)
        next();
    else {
        //res.send('please log in');
        // uncomment this to allow testing
        req.session.user = {};
        req.session.user.uid = 6;
        next();
    }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('db finance interface');
});

router.post('/getHouseMembers',function(req,res,next){
    db.query("select full_name from role,user_info where role.house_id = $1 and role.user_id = user_info.user_id;",[req.session.house.active_house_id])
        .then(function(data){
            res.send('{"name":hahaha}');
        })
        .catch(function(error){
            res.send("error while fetching user info");
        });

});

router.post('/addBill', function(req,res,next){
    var bill_type = req.body.bill_type;
    var bill_date = req.body.date;
    var description = req.body.description;
    db.query("Insert into finance (house_id,owner_id,bill_type,bill_date) values ($1,$2,$3,$4) RETURNING bill_id;",[req.session.house.active_house_id,req.session.user.uid, bill_type, bill_date])
        .then(function(data){
            res.send('{"bill_id":'+data[0].bill_id+"}");
        })
        .catch(function(error){
            res.send('error occured while adding bills');
        });
});

router.post('/addPayer',function(req,res,next){
    var payerList = req.body.payerList;
    var bill_type = req.body.bill_type;
    var bill_date = req.body.date;
    var description = req.body.description;
    for (var payer in payerList){
        db.query ("Insert into bill_owed (bill_id,house_id,user_id,amount,paid) values ($1,$2,$3,$4)",[data.bill_id,payer,payerList[payer],false]).then(function(data){
                res.send("{}");
            })
            .catch(function(error){
                res.send(error);
            });
    }
});

module.exports = router;
