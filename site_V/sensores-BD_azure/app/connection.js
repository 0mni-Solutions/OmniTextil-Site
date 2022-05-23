var mysql = require('mysql');
var sql = require('mssql');

var connection = mysql.createConnection({
    host     : 'localhost',
    port     : '3306',
    user     : 'sensorOmni',
    password : 'dud@2553',
    database : 'sensor'
});
var sqlServerConfig = {
    server: "svr-omnitextil-grupo7.database.windows.net",
    database: "omnitextil",
    user: "admin-omnitextil-7",
    password: "#Gfgrupo7",
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
    }
}
function getConnAzure(instrucao){
    return new Promise(function (resolve, reject) {
        sql.connect(sqlServerConfig).then(function () {
            return sql.query(instrucao);
        }).then(function (resultados) {
            console.log(resultados);
            resolve(resultados.recordset);
        }).catch(function (erro) {
            reject(erro);
            console.log('ERRO: ', erro);
        });
        sql.on('error', function (erro) {
            return ("ERRO NO SQL SERVER (Azure): ", erro);
        });
    });
}
connection.connect(function(err) {
    if (err) throw err;
    console.log('Conectado ao BD com sucesso!')
});

module.exports = {connection, getConnAzure};