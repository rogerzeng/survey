
var Survey = require('../models/survey');

// routers

exports.index = function(req, res){
	res.render('index', { title: 'Express' });
};

exports.survey = function(req, res){
	Survey.get(req, res);
};