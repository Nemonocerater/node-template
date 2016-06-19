var fs = require('fs');
var process_markdown = require('node-markdown').Markdown;

var blogs = require('./views/blogs/blogs.js');

// Process Command Line Arguments
var port = process.argv.length > 2 ? parseInt (process.argv[2]) : 80;

// Set up the Server
var app = require('./server.js')();

app.get ('/', function (req, res) {
	res.render ('home', {
		title: "Home Page"
	});
});

app.get ('/blog/list', function (req, res) {
	res.render ('blog_list', {
		title: 'Blog',
		blogs: blogs
	});
});

app.get ('/blog/:blog_name', function (req, res, next) {
	var blog_name = req.params['blog_name'];

	fs.readFile('./views/blogs/' + blog_name, 'utf8', function (err, data) {
		if (err) {
			console.log(err);
			next();
			return;
		}

		res.render ('blog', {
			title: 'Blog',
			markdown_data: data,
			process_markdown: process_markdown
		});
	});
});

app.get ('/contact', function (req, res) {
	res.render ('contact', {
		title: 'Contact Us',
	});
});

// If all else fails return a 404 error
app.use (function (req, res) {
	console.log ("404: " + req.originalUrl);
	res.render ('404', {
		title: "404 Page not found"
	});
});

// Run the Server
app.listen (port);
console.log ("Server is now listening on port " + port);
