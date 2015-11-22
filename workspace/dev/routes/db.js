#!/usr/bin/env node
var passport = require('passport');
var pg = require("pg");

var conString = "postgres://quarters:qadmin@system.quarters.space/quarters";

var client = new pg.Client(conString);
client.connect(function(err){
  if(err){
    //check to see if postgres is working
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result){
    if(err){
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    //output: the date
    client.end();
  });
});





//require('./config/passport')(passport); // pass passport for configuration
