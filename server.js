var express = require ('express');
var browserifyMiddleware = require ('browserify-middleware');
var jade = require ('jade');
var lessMiddleware = require ('less-middleware');
var logger = require ('express-logger');

// Set up the Server
module.exports = exports = function createServer() {
	var app = express ();

	app.set ('views', __dirname + '/views');
	app.set ('view engine', 'jade');

	app.use (logger ({
		path: './log'
	}));

	app.use ('/scripts', browserifyMiddleware ('./scripts/'));
	app.use (lessMiddleware (__dirname + '/public'));
	app.use (express.static (__dirname + '/public'));

	return app;
};
