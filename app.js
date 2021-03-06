﻿
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
  , util = require('util')
  , routes = require('./routes')
  , management = require('./routes/management')
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

app.locals({
    inspect: function(obj) {
        return util.inspect(obj, false);
    } 
});

app.get('/', routes.index);
app.get('/success', routes.success);
app.get('/error', routes.error);

//app.get('/survey/:id', routes.survey);
//app.post('/survey/submit', routes.submit);

app.post('/online/readSurvey', management.readSurvey);
app.post('/online/submit', routes.submit);

app.get('/management/login', management.login);
app.post('/management/login', management.doLogin);


app.get('/management/*', function(req, res, next) { // login check
    if(!req.session.login) {
        if(req.xhr) { // ajax request
            return res.send({login: false});
        } else {
            return res.redirect('/management/login');
        }
    }
    
    next();
});

app.get('/management/test', management.test);

app.get('/management/list', management.list);
app.get('/management/surveys', management.surveys);
app.post('/management/createSurvey', management.createSurvey);
app.post('/management/readSurvey', management.readSurvey);
app.post('/management/updateSurvey', management.updateSurvey);
app.post('/management/deleteSurvey', management.deleteSurvey);
app.post('/management/openSurvey', management.openSurvey);
app.post('/management/copySurvey', management.copySurvey);

app.post('/management/createQuestion', management.createQuestion);
app.post('/management/updateQuestion', management.updateQuestion);
app.post('/management/deleteQuestion', management.deleteQuestion);

app.post('/management/createItem', management.createItem);
app.post('/management/updateItem', management.updateItem);
app.post('/management/deleteItem', management.deleteItem);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
