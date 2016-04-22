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
        //req.session.user = {};
        //req.session.user.uid = 6;
        next();
    }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('db finance interface');
});


router.get('/addBill', function(req,res,next){
    var data = req.query;
    db.query("Insert into finance (house_id,owner_id,bill_type,bill_date) values ($1,$2,$3,$4)",[req.session.house.active_house_id,req.session.user.uid, data.bill_type, data.bill_date])
        .then(function(data){
            res.send("{}");
        })
        .catch(function(error){
            res.send(error);
        });
});

router.get('/addPayee',function(req,res,next){
    var data = req.query;
    for ( i = 0;i<data.owedByList.length();i++){
        db.query ("Insert into bill_owed (bill_id,house_id,user_id,amount,paid) values ($1,$2,$3,$4)",[data.bill_id,data.owedByList[i],data.owedAmount[i],false]).then(function(data){
                res.send("{}");
            })
            .catch(function(error){
                res.send(error);
            });
    }
});

module.exports = router;
