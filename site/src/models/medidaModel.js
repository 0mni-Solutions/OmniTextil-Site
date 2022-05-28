var database = require("../database/config");

function buscarUltimasMedidas(idAquario, limite_linhas) {
  instrucaoSql = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    // select top ${limite_linhas}
    //     temperatura, 
    //     umidade,  
    //     data_hora,
    //         CONVERT(varchar, data_hora, 108) as momento_grafico
    //     from Dados
    //     where fkSensor = 1
    //     order by idDados desc
    instrucaoSql = `
    SELECT TOP ${limite_linhas} AVG (temperatura) AS temperatura, AVG (umidade) AS umidade, CONVERT(varchar, data_hora, 108) AS momento_grafico 
      FROM Dados JOIN Sensor ON idSensor = fkSensor 
        JOIN Setor ON idSetor = fkSetor 
          GROUP BY data_hora ORDER BY MAX(idDados) DESC;
    `;
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
    fkSensor = 1`;
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
    // select top 1
    //     temperatura, 
    //     umidade,  
    //     CONVERT(varchar, data_hora, 108) as momento_grafico, 
    //     fkSensor 
    //     from Dados where fkSensor = 1
    // order by idDados desc
    instrucaoSql = `
    SELECT TOP 1 AVG (temperatura) AS temperatura, AVG (umidade) AS umidade, CONVERT(varchar, data_hora, 108) AS momento_grafico 
    FROM Dados JOIN Sensor ON idSensor = fkSensor 
      JOIN Setor ON idSetor = fkSetor 
          GROUP BY data_hora ORDER BY MAX(idDados) DESC;
    `;
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

function getHistorico(tipoUmidade, escalaUmidade, tipoTemperatura, escalaTemperatura) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", tipoUmidade, escalaUmidade, tipoTemperatura, escalaTemperatura);
  // let instrucao = ``;
  var instrucao = `
      INSERT INTO Analytics (tipo, escala) VALUES ('${tipoUmidade}', '${escalaUmidade}');
      `
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  buscarUltimasMedidas,
  buscarMedidasEmTempoReal,
  buscarMedidasSemanais,
  getHistorico,
};
