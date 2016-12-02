var banana = function () {
    var mysql = require('mysql');

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'uchat'
    });


    connection.connect();


    connection.query('select * from rooms', function (err, rows, fields) {
        console.log(err);
        console.log(rows);
    });

    connection.end();
}

module.exports = banana;

