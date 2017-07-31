var express = require('express'); //imports the express library
var app = express(); //make an express instance by calling the express f'n
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5806); 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Handler: if you visit the root URL, you will see this
app.get('/',function(req,res){
	var inParams = [];
	for (var key in req.query) {
		inParams.push({'name': key, 'value': req.query[key]});
	}
	var context = {};
	context.dataList = inParams;
  res.type('text/plain');
  res.send('get', 'context');
});

app.post('/', function(req,res) {
	var inParams = [];
	for (var key in req.query) {
		inParams.push({'name': key, 'value': req.body[key]});
		}
	var bParams = [];
	for (var key2 in req.body) {
		bParams.push({'name': key2, 'value': req.body[key2]});
	}
	var inParams = {};
	inParams.queryList = inParams;
	bParams.bodyList = bParams;
	res.render('post', inParams);
});

//Handler: if you don't match the above, then you get an error
app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

//Handler: this is an error message
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

//takes a single argument and return the value that was saved to port
app.listen(app.get('port'), function(){
  console.log('Express started on http://flip1.engr.oregonstate.edu:5806');
});