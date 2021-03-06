var express = require('express');
var router = express.Router();

var medidaController = require('../controllers/medidaController');

router.get('/ultimas/:idSensor', function(req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get('/semanais/:idSensor', function (req, res){
    medidaController.buscarMedidasSemanais(req, res);
});

router.get('/tempo-real/:idSensor', function (req, res){
    medidaController.buscarMedidasEmTempoReal (req, res);
});

router.post("/historico", function (req, res) {
    medidaController.pegarHistorico(req, res);
});

module.exports = router;