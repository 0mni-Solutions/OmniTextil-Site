var express = require("express");
var router = express.Router();

var avisoController = require("../controllers/avisoController");

router.get("/", function (req, res) {
    avisoController.testar(req, res);
});

router.get("/listar/:fkEmpresa", function (req, res) {
    avisoController.listar(req, res);
});

router.get("/listarUnidades/:fkEmpresa", function (req, res) {
    avisoController.listarUnidades(req, res);
});

router.get("/listarSetores/:fkUnidade", function (req, res) {
    avisoController.listarSetores(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    avisoController.listarPorUsuario(req, res);
});

router.get("/pesquisar/:descricao", function (req, res) {
    avisoController.pesquisarDescricao(req, res);
});

router.post("/publicar/:idUsuario", function (req, res) {
    avisoController.publicar(req, res);
});

router.get("/editarList/:idUsuario", function (req, res) {
    avisoController.editarList(req, res);
});

router.put("/editarUpdate/:idUsuario", function (req, res) {
    avisoController.editarUpdate(req, res);
});

router.delete("/deletar/:idUsuario", function (req, res) {
    avisoController.deletar(req, res);
});

module.exports = router;