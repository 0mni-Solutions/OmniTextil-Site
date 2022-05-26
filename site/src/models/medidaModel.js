var database = require("../database/config");

function buscarUltimasMedidas(idAquario, limite_linhas) {
  instrucaoSql = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `select top ${limite_linhas}
        temperatura, 
        umidade,  
        data_hora,
            CONVERT(varchar, data_hora, 108) as momento_grafico
        from Dados
        where fkSensor = 2
        order by idDados desc`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `SELECT 
        fksensor,
          temperatura,
        umidade,
          DATE_FORMAT(data_hora, '%H:%i:%s') AS momento_grafico
          
      FROM
          dados
      WHERE
          fksensor = 1
      ORDER BY idDados DESC
      LIMIT ${limite_linhas}`;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
function buscarMedidasSemanais() {
  instrucaoSql = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = ``;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `SELECT AVG (temperatura), AVG (umidade), 
    fkSensor, 
    DATE_FORMAT(data_hora, '%D:%M') 
    AS 
    data_hora from 
    Dados WHERE 
    fkSensor = 2`;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAquario) {
  instrucaoSql = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `select top 1
        temperatura, 
        umidade,  
        CONVERT(varchar, data_hora, 108) as momento_grafico, 
        fkSensor 
        from Dados where fkSensor = 2 
    order by idDados desc`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `SELECT 
        fksensor,
          temperatura,
        umidade,
          DATE_FORMAT(data_hora, '%H:%i:%s') AS momento_grafico
          
      FROM
          dados
      WHERE
          fksensor = 1
      ORDER BY idDados DESC
      LIMIT 1`;
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarUltimasMedidas,
  buscarMedidasEmTempoReal,
  buscarMedidasSemanais,
};
