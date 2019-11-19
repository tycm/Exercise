var express = require('express');
var session = require('express-session');
var numFormSubmissions = 1;

var app = express();
var router = express.Router();


app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.use(session({
	secret: 'ilovebread',
	resave: false,
	saveUninitialized: true
}))

var myCounter = function(req, res, next){
	if(req.path == '/studentInfo' && req.method == 'POST'){
		console.log('The number of form submissions is ' + numFormSubmissions);
		req.session.count = numFormSubmissions++;
	}
	next();
}
app.use(myCounter);
var studentInfo = require('./routes/studentInfo.js')
var index = require('./routes/index.js')
app.use('/studentInfo', studentInfo);
app.use('/', index);



app.listen(8080);

module.exports.counter = numFormSubmissions;
