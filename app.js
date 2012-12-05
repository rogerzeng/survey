
/**
 * Module dependencies.
 */

// TODO: move it to utilits
Array.prototype.containsById = function(id) { 
	var i = this.length;
	while (i--) { 
		if (!!id && this[i].id == id) {
			return true; 
		} 
	} 
	return false; 
} 

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , flashify = require('flashify');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(flashify);
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true}));
});
app.configure('production', function(){
    app.use(express.errorHandler());
});
/*
app.use(function (req, res, next) {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});
*/
app.get('/', routes.index);
app.get('/success', routes.success);
app.get('/error', routes.error);
app.get('/users', user.list);

app.get('/survey/:id', routes.survey);

app.post('/survey/submit', routes.submit);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
