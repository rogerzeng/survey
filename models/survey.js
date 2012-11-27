
var db = require('./db');

function Survey() {

};

module.exports = Survey;

Survey.get = function(id, callback) {
	var connection = db.createConnection();
	connection.connect();
	
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
	var sql = 'select s.name survey_name, ' +
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
				
	connection.query(sql, [id], function(err, rows, fields) {
	  if (err) {
		console.log(err);
		connection.end();
		return callback(err);
	  };
	  
	  var survey = {id: id, items: {}, questions: []};
	  
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
			question.items.push(itemId);
			
			if(!survey.items[itemId]) { // if it is not in survey yet, add it
				survey.items[itemId] = rows[i].item_desc;
			}
		}
	  }
	  
	  return callback(err, survey);
	});

	connection.end();
};

Survey.submit = function(req, callback) {
	var connection = db.createConnection();
	connection.connect();
    
    connection.query('select * from survey', function(err, rows, fields) {
        console.log(rows);
        
        return callback(err);
    });
    
    connection.end();
};

/*
var survey = {
    id: 1,
    name: '调查1',
	
	items: {
		'1': '好',
		'2': '不好'
	},
    
    questions: [{
        id: 1,
        desc: '问题1',
        type: 'radio',
        items: [1,2],
    },
    {
        id: 2,
        desc: '问题2',
        type: 'checkbox',
        items: [1,2],
    },
    {
        id: 3,
        desc: '问题3',
        type: 'select',
        items: [1,2],
    },
    {
        id: 4,
        desc: '问题4',
        type: 'textarea'
    }]
};
*/