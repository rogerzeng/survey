
var Survey = require('../models/survey');

// routers

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.survey = function(req, res){
  var result = Survey.get(req.params.id);
  console.log(result);
  res.render('survey', { result: result });
};