
var db = require('./db');

function Question() {

};

module.exports = Question;

Question.create = function(params, callback) {
    console.log('Question.create');
	var connection = db.createConnection();
	connection.connect();
    
    var sql = 'insert into question set s_id = ?, `desc` =  ?, type = ?';
    console.log(sql);
    
    connection.query(sql, [params.surveyId, params.desc, params.type], function(err, result) {
    
    	if (err) {
            console.log(err);
            return callback(err);
    	}
        
    	return callback(err, {success: true, question: {id: result.insertId, desc: params.desc, type: params.type, items: []}});
    });
    
    connection.end();
};

Question.update = function(params, callback) {
    console.log('Question.update');
	var connection = db.createConnection();
	connection.connect();
    
    var sql = 'update question set `desc` = ? where id = ?';
    console.log(sql);
    
    connection.query(sql, [params.desc, params.id], function(err, result) {
    
    	if (err) {
            console.log(err);
            return callback(err);
    	}
        
    	return callback(err, {success: true});
    });
    
    connection.end();
};

Question.delete = function(id, callback) {
    console.log('Question.delete');
	var connection = db.createConnection();
	connection.connect();
    
    var sql = 'delete from question where id = ?';
    console.log(sql);
    
    connection.query(sql, [id], function(err, result) {
    
    	if (err) {
            console.log(err);
            return callback(err);
    	}
        
    	return callback(err, {success: true});
    });
    
    connection.end();
};