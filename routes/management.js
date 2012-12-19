
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