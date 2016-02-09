var express = require('express');
var db = require('../dbcomponents/db-con');

var info = {};

info.render = function(reqdata, res) {

	db.tx(function(t){
		return t.batch([
			t.one('select * from house where house_id=$1', reqdata.active_house_id),
			t.query('select role.user_id, role.role, full_name, cell_num, email '+
				'from role, user_info, "user"' +
				'where role.user_id = user_info.user_id and role.user_id = "user".user_id ' +
				'and role.house_id=$1', reqdata.active_house_id),
		]);
	}).then(function(data){
		//console.log(data);

		reqdata.info =  data[0];
		reqdata.members = data[1];
		console.log(reqdata.members);
		res.render('app/house-info', reqdata);
	}).catch(function(error){
		console.log(error);
		res.send("404");
	});
};









module.exports = info;
