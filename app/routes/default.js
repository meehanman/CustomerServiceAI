module.exports = function (server) {
	//Include Mongo Tables
	var customer = require('../models/customers');
	var complaint = require('../models/complaints');
	var employee = require('../models/employees');
	var order = require('../models/orders');
	var product = require('../models/products');
	var review = require('../models/reviews');

	//Set a default page for hitting /
	server.get('/',
		function (req, res) {
			res.json({
				"version": 1.0,
				"author": "Hack the Hub Team Ahhhhhh"
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
		var reviews = topicise("");
		res.send(reviews);
		return next();
	});

	server.get('/getResolutions', function (req, res, next) {

		var userProblem = req.params;
		//scan db for templated responses for the identified user problem

		//var resolutions = topicise("busted collapsed  cracked crippled crumbled crushed damaged defective demolished fractured fragmented injured mangled mutilated ruptured severed shattered smashed burst disintegrated dismembered hurt pulverized rent riven separated shivered shredded");
		//res.send(resolutions);

		res.send([{
			"term": "smashed",
			"probability": 0.4
		}, {
			"term": "strap ripped",
			"probability": 0.4
		}, {
			"term": "out of battery",
			"probability": 0.2
		}]);
		return next();
	});

	server.get('/fuckit', function(req, res, next){
		res.send({
			"_id": 234324342,
			"name": "Dean Meehan",
			"email": "d3an.meehan@hotmail.com",
			"order": [{"_id":2423423,"product":"", "description": "<___PRODUCT_DESC___>", "reviews":["","","","","","","","","","",""]},
					{"_id":2423423,"product":"<___PRODUCT_NAME___>", "description": "<___PRODUCT_DESC___>", "reviews":["","","","","","","","","","",""]},
					{"_id":2423423,"product":"<___PRODUCT_NAME___>", "description": "<___PRODUCT_DESC___>", "reviews":["","","","","","","","","","",""]},
					{"_id":2423423,"product":"<___PRODUCT_NAME___>", "description": "<___PRODUCT_DESC___>", "reviews":["","","","","","","","","","",""]},
					{"_id":2423423,"product":"<___PRODUCT_NAME___>", "description": "<___PRODUCT_DESC___>", "reviews":["","","","","","","","","","",""]},
					{"_id":2423423,"product":"<___PRODUCT_NAME___>", "description": "<___PRODUCT_DESC___>", "reviews":["","","","","","","","","","",""]}]
		});
	});


	var lda = new function () {
		var documents, z, nw, nd, nwsum, ndsum, thetasum, phisum, V, K, alpha, beta;
		var THIN_INTERVAL = 20;
		var BURN_IN = 100;
		var ITERATIONS = 1000;
		var SAMPLE_LAG;
		var dispcol = 0;
		var numstats = 0;
		this.configure = function (docs, v, iterations, burnIn, thinInterval, sampleLag) {
			this.ITERATIONS = iterations;
			this.BURN_IN = burnIn;
			this.THIN_INTERVAL = thinInterval;
			this.SAMPLE_LAG = sampleLag;
			this.documents = docs;
			this.V = v;
			this.dispcol = 0;
			this.numstats = 0;
		}
		this.initialState = function (K) {
			var i;
			var M = this.documents.length;
			this.nw = make2DArray(this.V, K);
			this.nd = make2DArray(M, K);
			this.nwsum = makeArray(K);
			this.ndsum = makeArray(M);
			this.z = new Array();
			for (i = 0; i < M; i++) this.z[i] = new Array();
			for (var m = 0; m < M; m++) {
				var N = this.documents[m].length;
				this.z[m] = new Array();
				for (var n = 0; n < N; n++) {
					var topic = parseInt("" + (Math.random() * K));
					this.z[m][n] = topic;
					this.nw[this.documents[m][n]][topic]++;
					this.nd[m][topic]++;
					this.nwsum[topic]++;
				}
				this.ndsum[m] = N;
			}
		}

		this.gibbs = function (K, alpha, beta) {
			var i;
			this.K = K;
			this.alpha = alpha;
			this.beta = beta;
			if (this.SAMPLE_LAG > 0) {
				this.thetasum = make2DArray(this.documents.length, this.K);
				this.phisum = make2DArray(this.K, this.V);
				this.numstats = 0;
			}
			this.initialState(K);
			//document.write("Sampling " + this.ITERATIONS
			//   + " iterations with burn-in of " + this.BURN_IN + " (B/S="
			//   + this.THIN_INTERVAL + ").<br/>");
			for (i = 0; i < this.ITERATIONS; i++) {
				for (var m = 0; m < this.z.length; m++) {
					for (var n = 0; n < this.z[m].length; n++) {
						var topic = this.sampleFullConditional(m, n);
						this.z[m][n] = topic;
					}
				}
				if ((i < this.BURN_IN) && (i % this.THIN_INTERVAL == 0)) {
					//document.write("B");
					this.dispcol++;
				}
				if ((i > this.BURN_IN) && (i % this.THIN_INTERVAL == 0)) {
					//document.write("S");
					this.dispcol++;
				}
				if ((i > this.BURN_IN) && (this.SAMPLE_LAG > 0) && (i % this.SAMPLE_LAG == 0)) {
					this.updateParams();
					//document.write("|");
					if (i % this.THIN_INTERVAL != 0)
						this.dispcol++;
				}
				if (this.dispcol >= 100) {
					//document.write("*<br/>");
					this.dispcol = 0;
				}
			}
		}


		this.sampleFullConditional = function (m, n) {
			var topic = this.z[m][n];
			this.nw[this.documents[m][n]][topic]--;
			this.nd[m][topic]--;
			this.nwsum[topic]--;
			this.ndsum[m]--;
			var p = makeArray(this.K);
			for (var k = 0; k < this.K; k++) {
				p[k] = (this.nw[this.documents[m][n]][k] + this.beta) / (this.nwsum[k] + this.V * this.beta) *
					(this.nd[m][k] + this.alpha) / (this.ndsum[m] + this.K * this.alpha);
			}
			for (var k = 1; k < p.length; k++) {
				p[k] += p[k - 1];
			}
			var u = Math.random() * p[this.K - 1];
			for (topic = 0; topic < p.length; topic++) {
				if (u < p[topic])
					break;
			}
			this.nw[this.documents[m][n]][topic]++;
			this.nd[m][topic]++;
			this.nwsum[topic]++;
			this.ndsum[m]++;
			return topic;
		}

		this.updateParams = function () {
			for (var m = 0; m < this.documents.length; m++) {
				for (var k = 0; k < this.K; k++) {
					this.thetasum[m][k] += (this.nd[m][k] + this.alpha) / (this.ndsum[m] + this.K * this.alpha);
				}
			}
			for (var k = 0; k < this.K; k++) {
				for (var w = 0; w < this.V; w++) {
					this.phisum[k][w] += (this.nw[w][k] + this.beta) / (this.nwsum[k] + this.V * this.beta);
				}
			}
			this.numstats++;
		}

		this.getTheta = function () {
			var theta = new Array();
			for (var i = 0; i < this.documents.length; i++) theta[i] = new Array();
			if (this.SAMPLE_LAG > 0) {
				for (var m = 0; m < this.documents.length; m++) {
					for (var k = 0; k < this.K; k++) {
						theta[m][k] = this.thetasum[m][k] / this.numstats;
					}
				}
			} else {
				for (var m = 0; m < this.documents.length; m++) {
					for (var k = 0; k < this.K; k++) {
						theta[m][k] = (this.nd[m][k] + this.alpha) / (this.ndsum[m] + this.K * this.alpha);
					}
				}
			}
			return theta;
		}

		this.getPhi = function () {
			var phi = new Array();
			for (var i = 0; i < this.K; i++) phi[i] = new Array();
			if (this.SAMPLE_LAG > 0) {
				for (var k = 0; k < this.K; k++) {
					for (var w = 0; w < this.V; w++) {
						phi[k][w] = this.phisum[k][w] / this.numstats;
					}
				}
			} else {
				for (var k = 0; k < this.K; k++) {
					for (var w = 0; w < this.V; w++) {
						phi[k][w] = (this.nw[w][k] + this.beta) / (this.nwsum[k] + this.V * this.beta);
					}
				}
			}
			return phi;
		}

	}

	function makeArray(x) {
		var a = new Array();
		for (var i = 0; i < x; i++) {
			a[i] = 0;
		}
		return a;
	}

	function make2DArray(x, y) {
		var a = new Array();
		for (var i = 0; i < x; i++) {
			a[i] = new Array();
			for (var j = 0; j < y; j++)
				a[i][j] = 0;
		}
		return a;
	}

	function topicise(sentences) {
		// console.log(sentences);
		var documents = new Array();
		var f = {};
		var vocab = new Array();
		var docCount = 0;
		for (var i = 0; i < sentences.length; i++) {
			if (sentences[i] == "") continue;
			var words = sentences[i].split(/[\s,\"]+/);
			if (!words) continue;
			var wordIndices = new Array();
			for (var wc = 0; wc < words.length; wc++) {
				var w = words[wc].toLowerCase()
					.replace(/[^a-z\'A-Z0-9 ]+/g, '');
				if (w == "" || w.length == 1 || stopwords[w] || w.indexOf("http") == 0) continue;
				if (f[w]) {
					f[w] = f[w] + 1;
				} else if (w) {
					f[w] = 1;
					vocab.push(w);
				};
				wordIndices.push(vocab.indexOf(w));
			}
			if (wordIndices && wordIndices.length > 0) {
				documents[docCount++] = wordIndices;
			}
		}

		var V = vocab.length;
		var M = documents.length;
		var K = 4;
		var alpha = 0.1; // per-document distributions over topics
		var beta = .01; // per-topic distributions over words

		lda.configure(documents, V, 10000, 2000, 100, 10);
		lda.gibbs(K, alpha, beta);

		var phi = lda.getPhi();

		//topics
		var topTerms = 20;
		var topicText = new Array();
		var myarr = [];
		for (var k = 0; k < phi.length; k++) {
			var tuples = new Array();
			for (var w = 0; w < phi[k].length; w++) {
				tuples.push("" + phi[k][w].toPrecision(2) + "_" + vocab[w]);
			}
			tuples.sort().reverse();
			if (topTerms > vocab.length) topTerms = vocab.length;
			topicText[k] = '';
			for (var t = 0; t < topTerms; t++) {
				var topicTerm = tuples[t].split("_")[1];
				var prob = parseInt(tuples[t].split("_")[0] * 100);
				if (prob < 0.0001) continue;
				myarr.push({
					Topic: topicTerm,
					Probability: prob
				});
				topicText[k] += (topicTerm + " ");
			}
		}

		myarr.sort(function (a, b) {
			return b.Probability - a.Probability
		});
		console.log(myarr.slice(0, 3));

	};



};
