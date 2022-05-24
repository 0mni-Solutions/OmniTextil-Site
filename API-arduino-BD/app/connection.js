var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    port     : '3306',
    user     : 'sensorOmni',
    password : 'dud@2553',
    database : 'omni_textil'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Conectado ao BD com sucesso!')
});

module.exports = connection;