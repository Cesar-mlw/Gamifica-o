"use strict";
const express = require("express");
const wrap = require("express-async-error-wrapper");
const Projeto = require("../../models/Projeto");
const router = express.Router();
router.post("/create", wrap(async (req, res) => {
    let p = req.body;
    console.log(p);
    let erro = await Projeto.create(p);
    console.log(req.body);
    if (erro) {
        res.statusCode = 400;
        res.json(erro);
    }
    else {
        res.json("Projeto criado");
    }
}));
router.get("/list", wrap(async (req, res) => {
    let lista = await Projeto.list();
    res.json(lista);
}));
router.post("/delete", wrap(async (req, res) => {
    let idProjeto = req.body.idProjeto;
    let p = await Projeto.delete(idProjeto); //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {
        res.json("Projeto não encontrado");
    }
    else {
        res.json("Projeto deletado");
    }
}));
router.get("/read", wrap(async (req, res) => {
    let ra = req.query.ra;
    let p = await Projeto.read(ra);
    res.json(p);
}));
router.post("/update", wrap(async (req, res) => {
    let p = req.body;
    let erro = await Projeto.update(p);
    console.log(erro);
    if (erro) {
        res.json("Este projeto não existe");
    }
    else {
        res.json("Projeto alterado!");
    }
}));
module.exports = router;
//# sourceMappingURL=projeto.js.map