
var db = require('./db');

function Item() {

};

module.exports = Item;

Item.create = function(params, callback) {
    console.log('Item.create');
	var connection = db.createConnection();
	connection.connect();
    
    var sql = 'insert into item set q_id = ?, `desc` =  ?';
    console.log(sql);
    
    connection.query(sql, [params.questionId, params.desc], function(err, result) {
    
    	if (err) {
            console.log(err);
            return callback(err);
    	}
        
    	return callback(err, {success: true, item: {id: result.insertId, desc: params.desc}});
    });
    
    connection.end();
};


Item.update = function(params, callback) {
    console.log('Item.update');
	var connection = db.createConnection();
	connection.connect();
    
    var sql = 'update item set `desc` = ? where id = ?';
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

Item.delete = function(id, callback) {
    console.log('Item.delete');
	var connection = db.createConnection();
	connection.connect();
    
    var sql = 'delete from item where id = ?';
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