var express = require('express');
var app = express();

var Animal = require('./Animal.js');
var Toy = require('./Toy.js');


// app.use('/', (req, res) => {
// 	res.json({ msg : 'It still now works!' });
// });

app.get('/findToy', (req, res) => {
	var query = {};
	if (req.query.id) {
	    query.id = req.query.id;

	    Toy.findOne( query, (err, toy) => {
			if (err) {
			    res.type('html').status(500);
			    res.send('Error: ' + err);
			} else if (toy) {
				res.json(toy);
			}
			else {
			    res.json({});
			}
		});	  
	} else {
        res.json({});
    }  
});

app.get('/findAnimals', (req, res) => {
	var query = {};
	if (req.query.species) {
	    query.species = req.query.species;
	}
	if (req.query.trait) {
	    query.traits = req.query.trait;
	}
	if (req.query.gender) {
	    query.gender = req.query.gender;
	}

	if (Object.keys(query).length) {
		Animal.find( query, '-_id name species breed gender age', (err, animals) => {
			if (err) {
			    res.type('html').status(500);
			    res.send('Error: ' + err);
			}
			else {
			    res.json(animals);
			}
		});
	} else {
		res.json([]);
	}
});

app.get('/animalsYoungerThan', (req, res) => {
	var result = {count : 0, names : []};
	var age = req.query.age;

	if (age && !isNaN(age)) {
		Animal.find({age : {$lt : age}}, (err, animals) => {
			if (err) {
			    res.type('html').status(500);
			    res.send('Error: ' + err);
			}
			else {
				if (animals.length > 0) {
					result.count = animals.length;
					result.names = animals.map(animal => animal.name);
					console.log(result);
				    res.json(result);
				} else { // no animals younger than that age
					res.json({count : 0});
				}
				
			}
		});
	} else { // age unspecified or not a number
		res.json({});
	}
});

app.listen(3000, () => {
	console.log('Now listening on port 3000');
});



// Please do not delete the following line; we need it for testing!
module.exports = app;