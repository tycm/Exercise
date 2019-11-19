var express = require('express');
var bodyParser = require('body-parser');
var app = require('../app.js');

var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', function(req, res){
	if(req.session.count){
		res.render('index', {count: req.session.count});
	}else{
		res.render('index', {count: 0});
	}
});
router.get('/studentInfo', function(req, res){
	if(req.session.count){
		res.render('index', {count: req.session.count});
	}else{
		res.render('index', {count: 0});
	}
	
});

router.get('/*', function(req, res){
	res.send('404 Page not found');
});



module.exports = router;