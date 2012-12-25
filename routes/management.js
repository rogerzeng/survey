
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
    
	Survey.query(req, function(err, result) {
        if(err) {
			console.log(err);
            req.flash('error', err);
            return res.send({success: false});
        }
        
        res.send(result);
    });
};

exports.createSurvey = function(req, res){
    console.log(filePath + ' exports.createSurvey');
    
	Survey.create(req.body.name, function(err, result) {
        if(err) {
			console.log(err);
            req.flash('error', err);
            return res.send({success: false, error: err});
        }
        
        res.send(result);
    });
};

exports.deleteSurvey = function(req, res){
    console.log(filePath + ' exports.deleteSurvey');
    
	Survey.delete(req.body.id, function(err, result) {
        if(err) {
			console.log(err);
            req.flash('error', err);
            return res.send({success: false, error: err});
        }
        
        console.log(result);
        
        res.send(result);
    });
};

exports.test = function(req, res){
    console.log(filePath + ' exports.test');
    
    req.session.login = false;
    
    res.render('management/test');
    //res.send(req.session.login);
};