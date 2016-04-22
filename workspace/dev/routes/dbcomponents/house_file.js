/**
 * Created by wenqiang on 4/22/2016.
 */
var express = require('express');
var router = express.Router();
var db = require('./db-con');

router.post('/getFilePaths',function(req,res,next){
    db.query('select house_id, filepath from house_files where house_id = $1;',[req.session.house.active_house_id])
        .then(function(data){
            res.send(data);
        }).catch(function (error) {
        res.send(error);
    });
});
module.exports = router;
