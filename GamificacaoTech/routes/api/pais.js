"use strict";
const express = require("express");
const wrap = require("express-async-error-wrapper");
const Pais = require("../../models/Pais");
const router = express.Router();
router.post("/create", wrap(async (req, res) => {
    let p = req.body;
    let erro = await Pais.create(p);
    if (erro) {
        res.statusCode = 400;
        res.json(erro);
    }
    else {
        res.json("Pais criado");
    }
}));
router.get("/list", wrap(async (req, res) => {
    let lista = await Pais.list();
    res.json(lista);
}));
router.post("/delete", wrap(async (req, res) => {
    let idPais = req.body.idPais;
    let p = await Pais.delete(idPais); //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {
        res.json("País não encontrado");
    }
    else {
        res.json("País deletado");
    }
}));
router.post("/read", wrap(async (req, res) => {
    let idPais = req.body.idPais;
    let p = await Pais.read(idPais);
    res.json(p);
}));
router.post("/update", wrap(async (req, res) => {
    let p = req.body;
    let erro = await Pais.update(p);
    if (erro) {
        res.json("Este País não existe");
    }
    else {
        res.json("País alterado!");
    }
}));
module.exports = router;
//# sourceMappingURL=pais.js.map