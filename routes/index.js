
var Survey = require('../models/survey');

// routers

exports.index = function(req, res){
    req.flash('success', 'a');
    req.flash('error', 'b');
	res.render('index');
};

exports.success = function(req, res){
    res.render('success');
};

exports.error = function(req, res){
    res.render('error');
};

exports.survey = function(req, res){
	Survey.get(req.params.id, function(err, survey) {
        if(err) {
			console.log(err);
            req.flash('error', err);
            return res.redirect('error');
        }
        
        res.render('survey', { result: survey });
    });
};

exports.submit = function(req, res){
	Survey.submit(req, function(err) {
        if(err) {
			console.log(err);
            req.flash('error', err);
            return res.redirect('error');
        }
        
        req.flash('success', '提交成功');
        res.redirect('success');
    });
};