var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [new Schedule.Range(0,7)];
rule.month = [new Schedule.Range(3,5)];


var scheduler = schedule.scheduleJob(rule, function(){
var JSSoup = require('jssoup').default;
var url = "http://www.lse.co.uk/financial-diary.asp?date=3-MAY-2018";
var request = require('request');
request(url, function(error, response, body){
console.log('error:', error);
console.log('statusCode:', response && response.statusCode);

// saving html in a variable
var htmlBody = body;
});

// Here: parsing all the information from the website table;
// creating an individual list of lists

// Jssoup iterates through the html starting from form and frmFilter
// re-parse the small fragment of the html found
var soup = new JSSoup(htmlBody);
var table = soup.findAll('form', 'name ="frmFilter"');
console.log(table);

// Create a database and a connection to it

var mysql = require('mysql');
var connection = mysql.createConnection({
	host: "localhost",
	user: "username",
	password: "yourpassword"
});

connection.connect(function(err){
	if(err) throw err;
	console.log("Connected!");
	connection.query("CREATE DATABASE financiary_diary", function (err, result){
		if(err) throw err;
		console.log("Database created");
	});


	sql = "CREATE TABLE AGMs(day date,
 	id company_name  varchar(50),
	company_acronym   varchar(10))";
	connection.query(mysql, function(err, result){
		if(err) throw err;
		console.log("Table created");
	})
	

	sql = "CREATE TABLE Final_ExDividend_Date(day date,
 	id company_name  varchar(50),
	company_acronym   varchar(10))";
	connection.query(mysql, function(err, result){
		if(err) throw err;
		console.log("Table created");
	})

	sql = "CREATE TABLE Final_Dividend_Payment_Date(day date,
 	id company_name  varchar(50),
	company_acronym   varchar(10))";
	connection.query(mysql, function(err, result){
		if(err) throw err;
		console.log("Table created");
	})

	sql = "CREATE TABLE Interim_Dividend_Payment_Date(day date,
 	id company_name  varchar(50),
	company_acronym   varchar(10))";
	connection.query(mysql, function(err, result){
		if(err) throw err;
		console.log("Table created");
	})

	sql = "CREATE TABLE Quarterly_Payment_Date(day date,
 	id company_name  varchar(50),
	company_acronym   varchar(10))";
	connection.query(mysql, function(err, result){
		if(err) throw err;
		console.log("Table created");
	})
	

	sql = "CREATE TABLE Special_Dividend_Payment_Date(day date,
 	id company_name  varchar(50),
	company_acronym   varchar(10))";
	connection.query(mysql, function(err, result){
		if(err) throw err;
		console.log("Table created");
	})	
	
	// If we got informationn from the parser => insert it into the tables
	
	sql = "INSERT INTO  AGMs(date,company_name,company_acronym) VALUES ?";
	var values = [
	['04/05/2018','FBD Holdings', 'FBH'],
	['04/05/2018','InterContinental Hotels Group', 'IHG']
	];
	connection.query(mysql, [values], function(err, result){
		if(err) throw err;
		console.log("Number of records inserted: " + result.affectedRows);
	});
});
});