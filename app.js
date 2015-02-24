var express = require('express');
//var multer  = require('multer');
var path = require('path');
var http = require('http');
var https = require('https');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var options = {
    key: fs.readFileSync('../key.pem'),
    cert: fs.readFileSync('../cert.pem')
};

/*var routes = require('./routes/index');
 var users = require('./routes/users');*/
//var util = require('./routes/util/vo');
var routes = require('./routes/index');
//var routes2 = require('./test/index');
var sessionjs = require('./routes/session');
var port1 = 3000;
var port2 = 443;
var app = express();
//app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
http.createServer(app).listen(port1, function(){
    console.log("Http server listening on port " + port1);
});


https.createServer(options, app).listen(port2, function(){
    console.log("Https server listening on port " + port2);
});



var session = require('express-session');
var afeelPool = require('./afeel/util/afeelConnectionPool');


/*app.use(multer({
    dest: './public/images/',
    rename: function (fieldname, filename) {
        return filename + Date.now() + '.jpg'
    }
}));*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(session({secret:'test key', key:'test',cookie:{maxAge:60*60*24*30}}));//

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

//app.use('/session', sessionjs);

//app.use('/users', users);s
//app.use('/util', util);


/*

// 패스 지정 전에 선언해야함!!!
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
*/


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
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


/*app.set('port', process.env.PORT || 80);

var server = app.listen(app.get('port'), function(){
    console.log('Express Server listening on port'+server.address().port);
});*/

module.exports = app;
