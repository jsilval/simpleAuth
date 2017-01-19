
var user = require('../actions/db_actions.js');
var login = require('../actions/login.js');

module.exports = function(app) {
	//primero
	app.get('/', function(req, res) {	
        res.send("Blablabla");
    });

	//segundo
	app.post('/register', function(req, res) {
		var profile = req.body;

		user.saveUser(profile, function(response) {
			console.log(response);// Prints the result in console.
	 		res.json(response);// Returns the result to user in JSON format.	
		});
	});

	//tercero
	app.post('/login', function (req, res) {
		var username = req.body.username;
		var password = req.body.password;

		login.login(username, password, function (response) {
            console.log(response);
            res.json(response);
    	});
	});
 };

