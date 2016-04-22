var express = require('express');
var db = require('../dbcomponents/db-con');

var info = {};

info.render = function(session, res) {

	db.tx(function(t){
		return t.batch([
			t.any('select full_name, comment, date_time, b.user_id, post_id from bulletin_posts as b, user_info as u where b.house_id=$1 and b.user_id=u.user_id ORDER BY date_time DESC;', session.house.active_house_id)
		]);
	}).then(function(data){
		var renderdata = Object.create(session);

		if (data[0].length == 0){
			renderdata.posts = [];
			res.render('app/bulletin', renderdata);
		}

		renderdata.posts =  data[0];

        for (var i = 0; i < renderdata.posts.length; i++){
            var date = new Date(renderdata.posts[i]['date_time']);
            renderdata.posts[i]['date_time'] = date.toLocaleDateString() +" "+ date.toLocaleTimeString("en-US", {hour: '2-digit', minute:'2-digit'});
        }

		res.render('app/bulletin', renderdata);
	}).catch(function(error){
		console.log(error);
		res.send("404");
	});
};









module.exports = info;
