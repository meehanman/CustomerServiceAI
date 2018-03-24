module.exports = function(server) {
	//Include Mongo Tables
	var customer = require('../models/customers');
	var complaint = require('../models/complaints');
	var employee = require('../models/employees');
	var order = require('../models/orders');
	var product = require('../models/products');
	var review = require('../models/reviews');
  
	//Set a default page for hitting /
	server.get('/',
	  function(req, res) {
		res.json({
		  "version": 1.0,
		  "author": "Hack the Hub Team Wizards"
		});
	  });
  
	//Getting All Customers
	server.get('/customer', function(req, res, next) {
	  customer.find({}).exec(function(error, data) {
		res.json(data);
	  });
	  return next();
	});
  
	//Getting All complaints
	server.get('/complaint', function(req, res, next) {
	  customer.find({}).exec(function(error, data) {
		res.json(data);
	  });
	  return next();
	});
  
	//Getting All employees
	server.get('/employee', function(req, res, next) {
	  customer.find({}).exec(function(error, data) {
		res.json(data);
	  });
	  return next();
	});
  
	//Getting All orders
	server.get('/order', function(req, res, next) {
	  customer.find({}).exec(function(error, data) {
		res.json(data);
	  });
	  return next();
	});
  
	//Getting All products
	server.get('/product', function(req, res, next) {
	  customer.find({}).exec(function(error, data) {
		res.json(data);
	  });
	  return next();
	});
  
	//Getting All reviews
	server.get('/review	', function(req, res, next) {
	  customer.find({}).exec(function(error, data) {
		res.json(data);
	  });
	  return next();
	});
  
	server.get('/getProblems', function(req, res, next) {
  
	  var userInput = req.params;
  
	  //* We will add this if we have time
	  //orderID lookup
	  //edge cases:
	  //The user only has one order -> cool then we proceed
	  //The user has multiple similar orders -> present them to the user and ask them to pick one
	  //We can differentiate this by sending a boolean if they have selected a specific order
  
	  //var reviews = function to gather all reviews for the orderID
  
	  //function produceTopicModel(pass in reviews) - return top 3 reported issues?
  
	  var hardCodedReturn = {
		knownProblems: ["problem1", "problem2", "problem3", "other"]
	  };
	  console.log("Returning", hardCodedReturn);
	  res.send(hardCodedReturn);
	  return next();
	});
  
	server.get('/getResolutions', function(req, res, next) {
  
	  var userProblem = req.params;
	  //scan db for templated responses for the identified user problem
  
	  var hardCodedReturn = {
		resolutions: ["resolution1", "resolution2", "resolution3", "other-call support option"]
	  };
	  console.log("Returning", hardCodedReturn);
	  res.send(hardCodedReturn);
	  return next();
	});
  
  };
  