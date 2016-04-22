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

router.post('/getHouseMembers',function(req,res,next){
    var data=[];
    var houseMembers = req.session.house.members;
    for (var i = 0; i < houseMembers.length; i++) {
        if (houseMembers[i].user_id != req.session.user.uid){
            data.push(houseMembers[i]);
        }
    }
    res.send(data);
   /*db.query("select full_name from role,user_info where role.house_id = $1 and role.user_id = user_info.user_id;",[req.session.house.active_house_id])
        .then(function(data){
            res.send('{"name":hahaha}');
        })
        .catch(function(error){
            res.send("error while fetching user info");
        });*/

});

router.post('/getBillTable',function(req,res,next){
    var query = "select allBills.bill_id, allBills.owned_by owed_by, "+req.session.user.uid+" owed_to, full_name, bill_type, '--' you_owed, concat(amount,' ') you_are_owed, TO_CHAR(bill_date, 'Mon DD YYYY HH:MI AM') bill_date, paid from (select finance.bill_type,finance.bill_date, bill_owed.* from finance,bill_owed where house_id=$1 and finance.bill_id = bill_owed.bill_id and owed_to = $2) allBills left join (select full_name,user_info.user_id from role,user_info where role.house_id = $1 and role.user_id=user_info.user_id) allUser on allBills.owned_by = allUser.user_id union select allBills.bill_id, "+req.session.user.uid+" owed_by, allBills.owed_to, full_name, bill_type, concat(amount,' ') you_owed, '--' you_are_owed, TO_CHAR(bill_date, 'Mon DD YYYY HH:MI AM') bill_date, paid from (select finance.bill_type,finance.bill_date, bill_owed.* from finance,bill_owed where house_id=$1 and finance.bill_id = bill_owed.bill_id and owned_by = $2) allBills left join (select full_name,user_info.user_id from role,user_info where role.house_id = $1 and role.user_id=user_info.user_id) allUser on allBills.owed_to = allUser.user_id order by bill_date desc;"
    db.query(query,[req.session.house.active_house_id,req.session.user.uid])
     .then(function(data){
        res.send(JSON.stringify(data));
     })
     .catch(function(error){
        res.send("error while fetching finance data");
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

router.post('/payBill', function(req,res,next){
    var bill_id = req.body.bill_id;
    var to_id = req.body.to;
    var from_id = req.body.from;
    db.query("update bill_owed set paid=true where bill_id = $1 and owed_to = $2 and owned_by = $3;",[bill_id, to_id, from_id])
        .then(function(data){
            res.send('{}');
        })
        .catch(function(error){
            res.send('error occured while updating bills');
        });
});



router.post('/addPayer',function(req,res,next){
    var payerList = req.body.payerList.split(',')
    var i;
    var err = false;
    for (i = 0; i < payerList.length; i++){
        var payer=payerList[i].split(':');
        var uid = payer[0];
        var amount = payer[1];

        db.query ("Insert into bill_owed (bill_id,owed_to,owned_by,paid,amount) values ($1,$2,$3,$4,$5);",[req.body.bill_id,req.session.user.uid,uid,false,amount])
            .then(function(data){
            })
            .catch(function(error){
                err = true;
            });
    }
    if (err){
        res.send({});
    }
});

module.exports = router;
