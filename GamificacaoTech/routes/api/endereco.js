"use strict";
const express = require("express");
const wrap = require("express-async-error-wrapper");
const Endereco = require("../../models/Endereco");
const router = express.Router();
router.post("/create", wrap(async (req, res) => {
    let p = req.body;
    let erro = await Endereco.create(p);
    if (erro) {
        res.statusCode = 400;
        res.json(erro);
    }
    else {
        res.json("Endereco criado");
    }
}));
router.get("/list", wrap(async (req, res) => {
    let lista = await Endereco.list();
    res.json(lista);
}));
router.post("/delete", wrap(async (req, res) => {
    let idEndereco = req.body.idEndereco;
    let p = await Endereco.delete(idEndereco); //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {
        res.json("Endereco não encontrado");
    }
    else {
        res.json("Endereco deletado");
    }
}));
router.post("/read", wrap(async (req, res) => {
    let idEndereco = req.body.idEndereco;
    let p = await Endereco.read(idEndereco);
    res.json(p);
}));
router.post("/update", wrap(async (req, res) => {
    let p = req.body;
    let erro = await Endereco.update(p);
    if (erro) {
        res.json("Este Endereco não existe");
    }
    else {
        res.json("Endereco alterado!");
    }
}));
module.exports = router;
//# sourceMappingURL=endereco.js.map