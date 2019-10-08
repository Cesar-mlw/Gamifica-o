"use strict";
const express = require("express");
const wrap = require("express-async-error-wrapper");
const Estado = require("../../models/Estado");
const router = express.Router();
router.post("/create", wrap(async (req, res) => {
    let p = req.body;
    let erro = await Estado.create(p);
    if (erro) {
        res.statusCode = 400;
        res.json(erro);
    }
    else {
        res.json("Estado criado - Glory to Arstotzka!");
    }
}));
router.get("/list", wrap(async (req, res) => {
    let lista = await Estado.list();
    res.json(lista);
}));
router.post("/delete", wrap(async (req, res) => {
    let idEstado = req.body.idEstado;
    let p = await Estado.delete(idEstado); //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {
        res.json("Estado não encontrado");
    }
    else {
        res.json("Estado deletado");
    }
}));
router.post("/read", wrap(async (req, res) => {
    let idEstado = req.body.idEstado;
    let p = await Estado.read(idEstado);
    res.json(p);
}));
router.post("/update", wrap(async (req, res) => {
    let p = req.body;
    let erro = await Estado.update(p);
    if (erro) {
        res.json("Este Estado não existe");
    }
    else {
        res.json("Estado alterado!");
    }
}));
module.exports = router;
//# sourceMappingURL=estado.js.map