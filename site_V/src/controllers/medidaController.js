var medidaModel = require("../models/medidaModel");

function buscarUltimaUmidade(req, res) {
  const limite_linhas = 7;

  var idSetor = req.params.idSetor;

  console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

  medidaModel
    .buscarUltimaUmidade(idSetor, limite_linhas)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("resultados não encontrados!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao buscar as ultimas medidas.",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
    console.log("Log")
   
}

function buscarUltimaTemperatura(req, res) {
  const limite_linhas = 7;

  var idSetor = req.params.idSetor;

  console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

  medidaModel
  .buscarUltimaTemperatura(idSetor, limite_linhas)
  .then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("resultados não encontrados!");
    }
  })
  .catch(function (erro) {
    console.log(erro);
    console.log(
      "Houve um erro ao buscar as ultimas medidas.",
      erro.sqlMessage
    );
    res.status(500).json(erro.sqlMessage);
  });
  console.log("Log")
 
}


function buscarMedidasEmTempoRealUmidade(req, res) {
  console.log("Log")
  var idSetor = req.params.idSetor;

  console.log("recuperando medidas em tempo real");

  medidaModel
    .buscarMedidasEmTempoRealUmidade(idSetor)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao buscar as ultimas medidas.",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
  }

    function buscarMedidasEmTempoRealTemperatura(req, res) {
      console.log("Log")
      var idSetor = req.params.idSetor;
    
      console.log("recuperando medidas em tempo real");

    medidaModel
    .buscarMedidasEmTempoRealTemperatura(idSetor)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao buscar as ultimas medidas.",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
  
}

module.exports = {
  buscarUltimaTemperatura,
  buscarUltimaUmidade,
  buscarMedidasEmTempoRealUmidade,
  buscarMedidasEmTempoRealTemperatura
}

/* Implementação de novas functions para coletar os Selects no BD */