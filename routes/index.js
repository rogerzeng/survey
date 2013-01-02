
var Survey = require('../models/survey');

var filePath = 'survey\\routes\\index.js';

// routers

exports.index = function(req, res){
    console.log(filePath + ' exports.index');
    
	res.render('index');
};

exports.success = function(req, res){
    console.log(filePath + ' exports.success');
    
    res.render('success');
};

exports.error = function(req, res){
    console.log(filePath + ' exports.error');
    
    res.render('error');
};

exports.survey = function(req, res){
    console.log(filePath + ' exports.survey');
    
    // if survey id is not a number, then redirect to error page
    if(isNaN(req.params.id)) {
        req.flash('error', '错误的问卷编号');
        return res.redirect('error');
    }
    
	Survey.get(req.params, function(err, survey) {
        if(err) {
			console.log(err);
            req.flash('error', err);
            return res.redirect('error');
        }
        
        res.render('survey', { result: survey });
    });
};

exports.submit = function(req, res){
    console.log(filePath + ' exports.submit');
    
	Survey.submit(req, function(err) {
        if(err) {
			console.log(err);
            req.flash('error', err);
            return res.send({success: false, error: err});
        }
        
        req.flash('success', '提交成功');
        res.send({success: true, msg: '提交成功'});
    });
};