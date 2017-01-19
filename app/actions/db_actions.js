var pool = require('../config/connections/mysql_connect');

exports.saveUser = function(profile, callback) {
	var person = {
		idcuidador: profile.idcuidador, 
		nombre: profile.nombre,
		apellido: profile.apellido,
		telefono: profile.telefono,
		usuario: profile.usuario,
		pass: profile.pass
	};

	pool.getConnection(function(err, connection) {
	    if (err) {
	      connection.release();
	      callback({"response" : 'Error en la conexión con la base de datos', 'res' : false});
	      return;
	    }   

	    var sql = 'INSERT INTO cuidador SET ?';
		//var json = '';
	    connection.query(sql, person, function(err, result){
	        connection.release();
	        if(!err) {
	        	callback({'response': 'Usuario registrado correctamente.', 'res': true});
	        } else if (err.code == 'ER_DUP_ENTRY') {
	        	console.log(err)
	        	callback({'response': 'El usuario ya se encuentra registrado.', 'res': false});
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