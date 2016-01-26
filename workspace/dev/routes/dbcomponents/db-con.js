var express = require('express');
var pgp = require("pg-promise")();

var connection = {
    host: 'system.quarters.space', // server name or IP address;
    port: 5432,
    database: 'quarters',
    user: 'quarters',
    password: 'qadmin'
};


var db = pgp(connection);

module.exports = db;

// https://github.com/vitaly-t/pg-promise