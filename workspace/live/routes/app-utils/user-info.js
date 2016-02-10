var express = require('express');
var db = require('../dbcomponents/db-con');

var info = {};

info.render = function (session, res, otheruser) {

    var user;
    if(otheruser)
        user = otheruser;
    else
        user = session.user.uid;

        console.log(user);

    db.query('select full_name,email,date_of_birth,cell_num,description from "user",user_info where "user".user_id = user_info.user_id and "user".user_id=$1', user)
        .then(function (data) {
            if (data.length > 0) {
                // calc dob
                if (data[0].date_of_birth) {
                    var currentYear = new Date().getFullYear();
                    var birthYear = data[0].date_of_birth.getFullYear();
                    var dob = data[0].date_of_birth.getMonth() + '/' + data[0].date_of_birth.getDay() + '/' + data[0].date_of_birth.getFullYear();

                    //need to check for month and day aswell, but w/e for now
                    data[0].age = currentYear - birthYear;

                    data[0].date_of_birth = dob;
                }else{
                    data[0].age = "";
                    data[0].date_of_birth="";
                }
                var renderdata = Object.create(session);
                renderdata.profile = data[0];
                res.render('app/userprofile', renderdata);
            } else {
                res.send("404");
            }
        }).catch(function (error) {
            console.log(error);
            res.send(error);
    });
};


module.exports = info;
