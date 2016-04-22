var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var uuid = require('uuid');
// used for file uploading
var multer = require('multer');
var upload = multer({dest: './public/uploads/'});
var busboy = require('connect-busboy');

var routes = require('./routes/index');
var users = require('./routes/users');
var db = require('./routes/db');
var main = require('./routes/main');

//var fs = require('fs');
var fs = require('fs-extra');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.set('trust proxy', 1);


// file upload stuff ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.use(busboy());
// end of file upload stuff ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));


// should replace this with redis
app.use(session({
	genid: function(req) {
		return uuid.v1();
	},
	secret: 'somes',
	cookie: {
		secure: 'auto'
	},
	resave: true,
	saveUninitialized: false
}));


app.use('/', routes);
app.use('/users', users);
app.use('/main', main);
app.use('/db', db);

app.post('/uploadHouseFiles', upload.array('userFiles[]'), function(req, res) {
    console.log("uploading file...");
    console.dir(req.files);
    console.log("upload complete. redirecting...");

	var houseid = req.session.house.active_house_id;

	for (var i = 0; i < req.files.length; i++){
		var file = req.files[i];
		fs.move(file.path, 'public/uploads/'+houseid+'/'+file.originalname, function (err) {
			 if (err) return console.error(err)
			 console.log("success!")
		 });
	}


    res.redirect('/main/documents');
});

app.post('/uploadprofilepicture', upload.array('userFiles[]'), function(req, res) {
    console.log("uploading file...");
    console.dir(req.files);
    console.log("upload complete. redirecting...");

	var file = req.files[0];
	fs.move(file.path, 'public/uploads/userpics/'+req.session.user.uid, function (err) {
		 if (err) return console.error(err)
		 console.log("success!")
	 });


    res.redirect('/main/documents');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err,
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {},
	});
});


//lol noobs
module.exports = app;
