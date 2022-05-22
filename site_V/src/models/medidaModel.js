var database = require("../database/config");
var data = new Date();
var dia = String(data. getDate()). padStart(2, '0');
var mes = String(data. getMonth() + 1). padStart(2, '0');
var ano = data. getFullYear();
dataAtual = ano  + "-" + mes + "-" + dia

function buscarUltimaUmidade(idSetor, limite_linhas){
    instrucaoSql = `SELECT umidade FROM Dados WHERE data_hora >= "${dataAtual} 00:00:00" AND data_hora <= "${dataAtual} 23:59:59";` ;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarUltimaTemperatura(idSetor, limite_linhas){
    instrucaoSql = `SELECT temperatura FROM Dados WHERE data_hora >= "${dataAtual} 00:00:00" AND data_hora <= "${dataAtual} 23:59:59";` ;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarMedidasEmTempoRealUmidade(idSetor) {
    instrucaoSql =`SELECT umidade FROM Dados ORDER BY data_hora LIMIT 0,1`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarMedidasEmTempoRealTemperatura(idSetor) {
    instrucaoSql =`SELECT temperatura FROM Dados ORDER BY data_hora LIMIT 0,1`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
module.exports = {
    buscarUltimaUmidade,
    buscarUltimaTemperatura,
    buscarMedidasEmTempoRealUmidade,
    buscarMedidasEmTempoRealTemperatura

}

/* - Functions novas foram criadas para fazer os selects no banco de dados; */