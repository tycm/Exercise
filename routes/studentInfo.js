var express = require('express');
var bodyParser = require('body-parser');
var Student = require('../models/student');
var app = require('../app.js');
var mongoose = require('mongoose');

var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });


router.get('/', function(req, res){
	if(req.session.theStudent){
		res.render('main', {student: req.session.theStudent})
	}else{
		if(req.session.count){
			res.render('index', {count: req.session.count});
		}else{
			res.render('index', {count: 0});
		}
	}
	
});
router.post('/', urlencodedParser, async function(req, res){
	req.session.theStudent = new Student({firstName: req.body.firstName, lastName: req.body.lastName, degree: req.body.degree, program: req.body.program});
	var student = await Student.findOne({firstName: req.body.firstName, lastName: req.body.lastName});
	if(student == null){
		student = req.session.theStudent;
	}
	student.degree = req.body.degree;
	student.program = req.body.program;
	await student.save();
res.render('main', {student: req.session.theStudent})
});
router.get('/allstudents', urlencodedParser, async function(req, res){
	let students = await Student.getAllStudents();
	res.render('student', {students: students})
	//res.send(students)
})

router.all('/search', urlencodedParser, async function(req,res){
	let search = await Student.getStudents(req.body.firstName);
	res.render('student', {students: search})
})
router.get('/*', function(req, res){
	res.send('404 page not found')
})





module.exports = router;