module.exports = function(app) {

	var mongoose = require('mongoose');
	var Quote      = require('./models/Quote');
	var db       = require('../config/db');

 // Get search form for quote(s)
 app.get('/search', function(req, res) {
				res.render('search');
 });

 app.get('/search/:id', function(req, res) {
				if(mongoose.connection.readyState != 1) {
						mongoose.connect(db.url);
				}
				mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
				Car.find({_id: req.params.car_id}, function(err, cars) {
							if (err) {
									throw err;
							}
							// Find returns an array of collection
							return res.render('car', {car: cars[0]});
				});
	});

 // return new jade file with quote(s)
 app.post('/search', function(req, res) {
	 	var quotes;
		 if(mongoose.connection.readyState != 1) {
				 mongoose.connect(db.url);
		 }

		 mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
		 Quote.find({"quotes": { $regex: req.body.zoekterm, $options: 'i' }}, function(err, quotes) {
								if (err) {
											throw err;
								}

									console.log(quotes);
							});
				res.render('results', {quotes: quotes});
 });

	// Main page
	app.get('/', function(req, res) {
				 if(mongoose.connection.readyState != 1) {
							mongoose.connect(db.url);
					}
				 mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
								return res.render('index');
	});

	// Get save form for new quote(s)
	app.get('/add', function(req, res) {
					res.render('add');
	});

 // Save new quote(s)
	app.post('/add', function(req, res) {
		  if(mongoose.connection.readyState != 1) {
				  mongoose.connect(db.url);
		  }
			//var insertedQuotes = req.body.quote;
			//var separatedQuotes = insertedQuotes.split(",");
			//var amount = insertedQuotes.length;
			//for()

				Quote.update({firstname: "Steve"}, { $addToSet: {quotes: [req.body.quote]}}, function(err, quote){
					if (err){
						throw err;
					}
					return res.render('index');
				});

	});
};
