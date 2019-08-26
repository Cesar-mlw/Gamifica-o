"use strict";
const express = require("express");
const wrap = require("express-async-error-wrapper");
const TipoProjeto = require("../../models/TipoProjeto");
const router = express.Router();
router.post("/create", wrap(async (req, res) => {
    let p = req.body;
    let erro = await TipoProjeto.create(p);
    console.log(req.body);
    if (erro) {
        res.statusCode = 400;
        res.json(erro);
    }
    else {
        res.json("Tipo de projeto criado");
    }
}));
router.get("/list", wrap(async (req, res) => {
    let lista = await TipoProjeto.list();
    res.json(lista);
}));
router.post("/delete", wrap(async (req, res) => {
    let idTipoProjeto = req.body.idTipoProjeto;
    let p = await TipoProjeto.delete(idTipoProjeto); //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {
        res.json("Tipo de projeto não encontrado");
    }
    else {
        res.json("Tipo de projeto deletado");
    }
}));
router.get("/read", wrap(async (req, res) => {
    let idTipoProjeto = req.query.idTipoProjeto;
    let p = await TipoProjeto.read(idTipoProjeto);
    res.json(p);
}));
router.post("/update", wrap(async (req, res) => {
    let p = req.body;
    let erro = await TipoProjeto.update(p);
    console.log(erro);
    if (erro) {
        res.json("Este tipo de projeto não existe");
    }
    else {
        res.json("Tipo de projeto alterado!");
    }
}));
module.exports = router;
//# sourceMappingURL=tipoProjeto.js.map