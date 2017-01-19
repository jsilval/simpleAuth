#!/bin/env node

var server_port = 8080
var server_ip_address = 'localhost';

/**
 * Module dependencies
 */

var express = require('express');
// Para acceder a req.body
var bodyParser = require('body-parser');

var app = express();

// Configuration

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Routes
require('./app/routes/routes')(app);

app.listen(server_port, server_ip_address, function() {
	console.log('Server Started: http://'+server_ip_address+':'+server_port);
});
