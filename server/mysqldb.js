var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password :  process.env.MYSQL_LOCAL_PASSWORD || '',
    database : 'wallet'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
