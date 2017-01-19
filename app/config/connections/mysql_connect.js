var mysql = require('mysql');

/*var connection = mysql.createConnection({
	host: 'localhost',
	user: 'jose',
	password: 'af<Y%sdfe1%',
	database: 'users'
});*/
var connection = mysql.createPool({
	connectionLimit : 10,
	host: 'localhost',
	user: 'root',
	password: 'qwerty',
	database: 'eloc'
});

module.exports = connection;