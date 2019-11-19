var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Students', {useNewUrlParser: true, useUnifiedTopology: true});


var studentSchema = new mongoose.Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	degree: String,
	program: String
})

var Student = mongoose.model('Student', studentSchema);


var joeb = new Student({firstName: "Joe", lastName: "Biden", degree: "Bachelors", program: "Computer Science"});
var joes = new Student({firstName: "Joe", lastName: "Snowden", degree: "Bachelors", program: "Marketing"});
var tim = new Student({firstName: "Tim", lastName: "McCrickard", degree: "Bachelors", program: "Computer Science"});
var don = new Student({firstName: "Donald", lastName: "Joseph", degree: "Bachelors", program: "Art"});

joeb.save(function (err, joeb) {
	if (err) return console.error(err);
});
joes.save(function (err, joes) {
    if (err) return console.error(err);
});
tim.save(function (err, tim) {
    if (err) return console.error(err);
});
don.save(function (err, don) {
    if (err) return console.error(err);
});

/**
* function with DB call
*/
async function getStudents(firstName){
	let students;
	try{
		students = await Student.find({firstName: firstName});
		return students;
	}catch(err){
		console.log(err);
	}
}
async function getAllStudents(){
	let students;
	try{
		students = await Student.find();
		return students;
	}catch(err){
		console.log(err);
	}
}
module.exports = Student;
module.exports.getStudents = getStudents;
module.exports.getAllStudents = getAllStudents;

