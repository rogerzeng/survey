
var Survey = require('../models/survey');

var filePath = 'survey\\routes\\management.js';

exports.login = function(req, res){
    console.log(filePath + ' exports.login');
    
    res.render('management/login');
};

exports.doLogin = function(req, res){
    console.log(filePath + ' exports.doLogin');
    
    if(req.body.pwd == '123') {
        req.session.login = true;
        return res.redirect('/management/list');
    }
    
    res.redirect('/management/login');
};

exports.list = function(req, res){
    console.log(filePath + ' exports.list');
    
    res.render('management/list');
};

exports.surveys = function(req, res){
    console.log(filePath + ' exports.surveys');
    
	Survey.getByName(req.query.surveyName, function(err, result) {
        if(err) {
			console.log(err);
            req.flash('error', err);
            return res.send({success: false});
        }
        
        res.send(result);
    });
    
    
};

exports.test = function(req, res){
    console.log(filePath + ' exports.test');
    
    req.session.login = false;
    
    res.send(req.session.login);
};