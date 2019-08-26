"use strict";
const express = require("express");
const wrap = require("express-async-error-wrapper");
const TipoHabilidade = require("../../models/TipoHabilidade");
const router = express.Router();
router.post("/create", wrap(async (req, res) => {
    let p = req.body;
    let erro = await TipoHabilidade.create(p);
    if (erro) {
        res.statusCode = 400;
        res.json(erro);
    }
    else {
        res.json("Tipo de habilidade Registrada");
    }
}));
router.get("/list", wrap(async (req, res) => {
    let lista = await TipoHabilidade.list();
    res.json(lista);
}));
router.post("/delete", wrap(async (req, res) => {
    let idTipoHabilidade = req.body.idTipoHabilidade;
    let a = await TipoHabilidade.delete(idTipoHabilidade);
    if (a == false) {
        res.json("Tipo de habilidade não encontrada");
    }
    else {
        res.json("Tipo de habilidade deletada");
    }
}));
router.get("/read", wrap(async (req, res) => {
    let idTipoHabilidade = req.query.idTipoHabilidade;
    let a = await TipoHabilidade.read(idTipoHabilidade);
    res.json(a);
}));
router.post("/update", wrap(async (req, res) => {
    let h = req.body;
    let erro = await TipoHabilidade.update(h);
    if (erro) {
        res.json("Tipo de habilidade inexistente");
    }
    else {
        res.json("Tipo de habilidade alterado!");
    }
}));
module.exports = router;
//# sourceMappingURL=tipoHabilidade.js.map