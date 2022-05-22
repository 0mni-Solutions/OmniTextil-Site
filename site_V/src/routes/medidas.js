var express = require('express');
var router = express.Router();

var medidaController = require('../controllers/medidaController');

router.get('/ultima/temperatura/:idSetor', function(req, res) {
    medidaController.buscarUltimaTemperatura(req, res);
});

router.get('/ultima/umidade/:idSetor', function (req, res){
    medidaController.buscarUltimaUmidade (req, res);
});

router.get('/tempo-real/temperatura/idSetor', function (req, res){
    medidaController.buscarMedidasEmTempoRealTemperatura (req, res);
});

router.get('/tempo-real/umidade/idSetor', function (req, res){
    medidaController.buscarMedidasEmTempoRealUmidade (req, res);
});

module.exports = router;

/* - Foram criadas novas rotas */