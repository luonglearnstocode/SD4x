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
	} else { // id unspecified
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
	} else { // all parameter are unspecified
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

app.get('/calculatePrice', (req, res) => {
	var query = {};
	if (req.query.id) {
	    query.id = req.query.id;
	}
	if (req.query.qty) {
	    query.qty = req.query.qty;
	}

	var idToQtyMap = new Map();
	if (query.id.length && query.qty.length && query.id.length == query.qty.length) { // numbers of elements match
		for (var i = 0; i < query.id.length; i++) {
			var key = query.id[i];
			var val = query.qty[i];

			if (!isNaN(val) && val > 0) { // qty> parameter is less than one or non-numeric, then it and the corresponding id> parameter should be ignored
				if (idToQtyMap.has(key)) { // duplicate id
					idToQtyMap.set(key, Number(idToQtyMap.get(key)) + Number(val));
				} else {
					idToQtyMap.set(key, val);	
				}
			}
		}

		var idToPriceMap = new Map();
		var items = [];
		var totalPrice = 0;

		Toy.find( {id : Array.from(idToQtyMap.keys())}, (err, toys) => {
			if (err) {
			    res.type('html').status(500);
			    res.send('Error: ' + err);
			} else {
				toys.forEach((toy) => idToPriceMap.set(toy.id, toy.price));
				
				for (var id of Array.from(idToPriceMap.keys())) {
					var item = {
						item : id,
						qty : idToQtyMap.get(id),
						subtotal : idToQtyMap.get(id) * idToPriceMap.get(id)
					}
					totalPrice += item.subtotal;
					items.push(item);
				}
			    res.json({totalPrice : totalPrice, items : items});
			}
		});	
	} else {
		res.json({});
	}

	
});


app.listen(3000, () => {
	console.log('Now listening on port 3000');
});



// Please do not delete the following line; we need it for testing!
module.exports = app;