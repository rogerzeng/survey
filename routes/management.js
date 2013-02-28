
var Survey = require('../models/survey')
    , Question = require('../models/question')
    , Item = require('../models/item');

var filePath = 'survey\\routes\\management.js';

exports.login = function(req, res){
    console.log(filePath + ' exports.login');
    
    res.render('management/login');
};

exports.doLogin = function(req, res){
    console.log(filePath + ' exports.doLogin');
    
    if(req.body.pwd == 'tjs') {
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
            return res.send({success: false, error: err});
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

exports.readSurvey = function(req, res){
    console.log(filePath + ' exports.readSurvey');
    
	Survey.get(req.body, function(err, survey) {
        if(err) {
			console.log(err);
            req.flash('error', err);
            return res.send({success: false, error: err});
        }
        
        var result = {success: true, survey: survey}
        
        console.log(result);
        
        res.send(result);
    });
};

exports.updateSurvey = function(req, res){
    console.log(filePath + ' exports.updateSurvey');
    
	Survey.update(req.body, function(err, result) {
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
        
        res.send(result);
    });
};

exports.openSurvey = function(req, res){
    console.log(filePath + ' exports.openSurvey');
    
	Survey.open(req.body.id, function(err, result) {
        if(err) {
            console.log(err);
            req.flash('error', err);
            return res.send({success: false, error: err});
        }
        
        res.send(result);
    });
};

exports.copySurvey = function(req, res){
    console.log(filePath + ' exports.copySurvey');
    
	Survey.copy(req.body.id, function(err, result) {
        if(err) {
            console.log(err);
            req.flash('error', err);
            return res.send({success: false, error: err});
        }
        
        res.send(result);
    });
};

exports.createQuestion = function(req, res){
    console.log(filePath + ' exports.createQuestion');
    
	Question.create(req.body, function(err, result) {
        if(err) {
            console.log(err);
            req.flash('error', err);
            return res.send({success: false, error: err});
        }
        
        res.send(result);
    });
};

exports.updateQuestion = function(req, res){
    console.log(filePath + ' exports.updateQuestion');
    
	Question.update(req.body, function(err, result) {
        if(err) {
            console.log(err);
            req.flash('error', err);
            return res.send({success: false, error: err});
        }
        
        res.send(result);
    });
};

exports.deleteQuestion = function(req, res){
    console.log(filePath + ' exports.deleteQuestion');
    
	Question.delete(req.body.id, function(err, result) {
        if(err) {
            console.log(err);
            req.flash('error', err);
            return res.send({success: false, error: err});
        }
        
        res.send(result);
    });
};

exports.createItem = function(req, res){
    console.log(filePath + ' exports.createItem');
    
	Item.create(req.body, function(err, result) {
        if(err) {
            console.log(err);
            req.flash('error', err);
            return res.send({success: false, error: err});
        }
        
        res.send(result);
    });
};

exports.updateItem = function(req, res){
    console.log(filePath + ' exports.updateItem');
    
	Item.update(req.body, function(err, result) {
        if(err) {
            console.log(err);
            req.flash('error', err);
            return res.send({success: false, error: err});
        }
        
        res.send(result);
    });
};

exports.deleteItem = function(req, res){
    console.log(filePath + ' exports.deleteItem');
    
	Item.delete(req.body.id, function(err, result) {
        if(err) {
            console.log(err);
            req.flash('error', err);
            return res.send({success: false, error: err});
        }
        
        res.send(result);
    });
};

exports.test = function(req, res){
    console.log(filePath + ' exports.test');
    
    console.log(req.body);
    
    //res.render('management/test');
    res.send({success: true, msg: 'aaa'});
};