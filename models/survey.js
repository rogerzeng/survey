﻿
var db = require('./db');

function Survey() {

};

/*
select s.name survey_name,
q.id question_id,
q.desc question_desc,
q.type question_type,
i.id item_id,
i.desc item_desc
from survey s 
left join survey_question sq on s.id = sq.survey_id 
left join question q on sq.question_id = q.id
left join question_item qi on q.id = qi.question_id
left join item i on qi.item_id = i.id
where s.id = 1
order by q.id
*/
Survey.SELECT_SQL = 'select s.name survey_name, ' +
    				'q.id question_id, ' +
    				'q.desc question_desc, ' +
    				'q.type question_type, ' +
    				'i.id item_id, ' +
    				'i.desc item_desc ' +
    				'from survey s ' +
    				'left join survey_question sq on s.id = sq.survey_id ' +
    				'left join question q on sq.question_id = q.id ' +
    				'left join question_item qi on q.id = qi.question_id ' +
    				'left join item i on qi.item_id = i.id ' +
    				'where s.id = ? ' + 
    				'order by q.id';

/*
INSERT INTO survey_result
(survey_id,
question_id,
item_id,
year,
grade,
class,
no,
name,
shanghaining,
desc)
VALUES
(?,?,?,?,?,?,?,?,?,?)
*/                    
Survey.RESULT_INSERT_SQL = 'INSERT INTO survey_result ' +
                            '(`survey_id`,`year`,`grade`,`class`,`no`,`name`,`shanghaining`,`question_id`,`item_id`,`desc`) ' +
                            'VALUES ';

module.exports = Survey;

Survey.get = function(id, callback) {
    console.log('Survey.get');
	var connection = db.createConnection();
	connection.connect();
				
	connection.query(Survey.SELECT_SQL, [id], function(err, rows, fields) {
    
	  if (err) {
		console.log(err);
		return callback(err);
	  } else if(rows.length == 0) {
		return callback('错误的问卷编号');
      }
	  
	  var survey = {id: id, questions: []};
	  
	  for(var i = 0; i < rows.length; i++) {
		if(i == 0) {
			survey['name'] = rows[0].survey_name;
		}
		
		var question;
		var questionId = rows[i].question_id;
		if(!!questionId && !survey.questions.containsById(questionId)) { // if has question_id in row && it is not in survey yet, add it
			question = {
				id: questionId,
				desc: rows[i].question_desc,
				type: rows[i].question_type,
				items: [],
			};
			survey.questions.push(question);
		}
		
		var itemId = rows[i].item_id;
		if(!!itemId) { // if has item_id in row, add it to question
			question.items.push({
                id: itemId,
                desc: rows[i].item_desc
            });
		}
	  }
	  
	  return callback(err, survey);
	});

	connection.end();
};

Survey.query = function(req, callback) {
    console.log('Survey.query');
	var connection = db.createConnection();
	connection.connect();
    
    var name = req.query.surveyName;
    
    var countSql = 'select count(*) as total from survey';
    if (name) {
        countSql += ' where name like ' + connection.escape('%' + name + '%');
    }
		
	connection.query(countSql, function(err, rows, fields) {
    
    	if (err) {
            console.log(err);
            connection.end(); // connection.end() here b/c logic returns here and won't get to the bottom point of connection.end()
    		return callback(err);
    	}
	  
        var total = rows[0].total;
      
        if (total) {
            var start = req.query.start;
            var limit = req.query.limit;
        
            var sql = 'select * from survey';
            var orderBy = ' order by id desc'
            var pagination = ' limit ' + start + ', ' + limit;
            
            if (name) {
                sql += ' where name like ' + connection.escape('%' + name + '%');
            }
            sql += orderBy;
            sql += pagination;
            
            console.log(sql)
        
            connection.query(sql, function(err, rows, fields) {
            
                if (err) {
                    console.log(err);
                    // no connection.end() here b/c connection should be closed at the same level as innerest connection.query() level
            		return callback(err);
            	}
                
                return callback(err, {
                    success: true,
                    total: total,
                    rows: rows
                });
            });
        } else {
            return callback(err, {
                success: true,
                total: 0,
                rows: []
            });
        }
        
        connection.end();
	});
};

Survey.submit = function(req, callback) {
    console.log('Survey.submit');
    var paramsTemplate = [parseInt(req.body.surveyId), parseInt(req.body.year), parseInt(req.body.grade), parseInt(req.body.classId), req.body.no, req.body.name, parseInt(req.body.shanghaining)];
    var paramsInsert = [];
    
    for(param in req.body) {
        var result = param.match(/question_(\w+)_(\d+)/);
        
        if(result) { // it's a question
        
            // result[0] is the matched text, e.g. 'question_textarea_4'
            var questionType = result[1];
            var questionId = parseInt(result[2]);
            if(questionType === 'textarea') {
                paramsInsert.push(paramsTemplate.concat(questionId, null /*item_id*/, req.body[param] /*desc*/));
            } else if(questionType === 'checkbox' && req.body[param] instanceof Array) { // user selects multi-values
                req.body[param].forEach(function(itemId) {
                    paramsInsert.push(paramsTemplate.concat(questionId, parseInt(itemId), null /*desc*/));
                });
            } else {
                paramsInsert.push(paramsTemplate.concat(questionId, parseInt(req.body[param]) /*item_id*/, null /*desc*/));
            }
        }
    }

    console.log(paramsInsert);
    
	var connection = db.createConnection();
	connection.connect();

    var sql = Survey.RESULT_INSERT_SQL + connection.escape(paramsInsert);
    console.log(sql);
    
    connection.query(sql, function(err, result) {
    
    	if (err) {
            console.log(err);
    	}
        
        return callback(err);
    });
    
    connection.end();
};

Survey.create = function(name, callback) {
    console.log('Survey.create');
	var connection = db.createConnection();
	connection.connect();
    
    connection.query('insert into survey set ?', {name: name}, function(err, result) {
    
    	if (err) {
            console.log(err);
            return callback(err);
    	}
        
    	return callback(err, {success: true, id: result.insertId});
    });
    
    connection.end();
};

Survey.delete = function(id, callback) {
    console.log('Survey.delete');
	var connection = db.createConnection();
	connection.connect();
    
    connection.query('delete from survey where id = ?', [id], function(err, result) {
    
    	if (err) {
            console.log(err);
            return callback(err);
    	}
        
    	return callback(err, {success: true});
    });
    
    connection.end();
};