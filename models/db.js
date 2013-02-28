var mysql = require('mysql');

function handleDisconnect(connection) {
  connection.on('error', function(err) {
    console.log(err);
  
    if (!err.fatal) {
      return;
    }

    if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
      throw err;
    }

    console.log('Re-connecting lost connection: ' + err.stack);

    connection = mysql.createConnection(connection.config);
    handleDisconnect(connection);
    connection.connect();
  });
};

function db() {};

db.createConnection = function() {
	var connection = mysql.createConnection({
	  host : 'localhost',
	  user : 'root',
	  password : 'root',
	  database : 'survey',
      multipleStatements: true
	});
	
	handleDisconnect(connection);
	
	return connection;
};

module.exports = db;