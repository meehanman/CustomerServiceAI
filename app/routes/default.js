module.exports = function (server) {

	//Set a default page for hitting /
	server.get('/',
		function (req, res) {
			res.json({
				"version": 1.0,
				"author": "Hack the Hub Team Wizards"
			});
		});

	//Adding a Customer
	server.get('/customer', function (req, res, next) {

		var customer = new User({
			name: req.body.name,
			email: req.body.email,
			password: "password"
		})

		customer.save(function (error) {
			if (error) {
				res.json({
					title: "Failed",
					message: "Customer Add Failed",
					error: error
				});
			}
			res.json({
				title: "Success",
				username: req.body.name,
				message: "Customer Successfully Added"
			});
		});
	});

	server.get('/getProblems', function (req, res, next) {

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

	server.get('/getResolutions', function (req, res, next) {

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
