var pool = require('../config/connections/mysql_connect');

exports.login = function (username, password, callback) {
	console.log(username+" "+password);
	pool.getConnection(function(err, connection) {
	    if (err) {
	      connection.release();
	      callback({"response" : 'Error en la conexión con la base de datos', 'res' : false});
	      return;
	    }   

	    console.log('connected as id ' + connection.threadId);
	    var sql = 'SELECT * FROM ?? WHERE ??= ? AND ??=?';
	    var inserts = ['Persons', 'id', username, 'Password', password];

		//var json = '';
	    connection.query(sql, inserts, function(err, result) {
	        connection.release();
	        if(!err) {
	        	if (result.length > 0) {
	        		callback({'response': 'Inicio de sesión correcto', 'res': true});
	        	} else {
	        		callback({'response': 'Usuario y contraseña incorrectos', 'res': false});
	        	}
	        /*} else if (err.Error == 'ER_DUP_ENTRY') {
	        	console.log(err)
	        	callback({'response': 'El usuario ya se encuentra registrado.', 'res': false});*/
	        } else {
	        	console.log(err)
	        	callback({'response': 'Ha ocurrido un error inesperado.', 'res': false});
	        }
	    });

	    connection.on('error', function(err) {      
	          callback({'response' : 'Error en la conexión con la base de datos', 'res': false});
	          return;     
	    });
	});
}
 