var express = require('express');
var db = require('../dbcomponents/db-con');

var info = {};


info.render = function(session, res) {
	db.tx(function(t){
		return t.batch([
			t.any('select * from house where house_id=$1', session.house.active_house_id),
			t.any('select role.user_id, role.role, full_name, cell_num, email '+
				'from role, user_info, "user"' +
				'where role.user_id = user_info.user_id and role.user_id = "user".user_id ' +
				'and role.house_id=$1', session.house.active_house_id),
		]);
	}).then(function(data){

		var renderdata = Object.create(session);
		renderdata.info =  data[0][0];
		renderdata.members = data[1];
		res.render('app/house-info', renderdata);
	}).catch(function(error){
		console.log(error);
		res.send("404");
	});
};


module.exports = info;

