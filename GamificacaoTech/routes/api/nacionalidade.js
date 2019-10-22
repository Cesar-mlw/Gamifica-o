"use strict";
const express = require("express");
const wrap = require("express-async-error-wrapper");
const Nacionalidade = require("../../models/Nacionalidade");
const router = express.Router();
router.post("/create", wrap(async (req, res) => {
    let p = req.body;
    let erro = await Nacionalidade.create(p);
    if (erro) {
        res.statusCode = 400;
        res.json(erro);
    }
    else {
        res.json("Nacionalidade criada");
    }
}));
router.get("/list", wrap(async (req, res) => {
    let lista = await Nacionalidade.list();
    res.json(lista);
}));
router.post("/delete", wrap(async (req, res) => {
    let idNacionalidade = req.body.idNacionalidade;
    let p = await Nacionalidade.delete(idNacionalidade); //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {
        res.json("Nacionalidade não encontrada");
    }
    else {
        res.json("Nacionalidade deletada");
    }
}));
router.post("/read", wrap(async (req, res) => {
    let idNacionalidade = req.body.idNacionalidade;
    let p = await Nacionalidade.read(idNacionalidade);
    res.json(p);
}));
router.post("/update", wrap(async (req, res) => {
    let p = req.body;
    let erro = await Nacionalidade.update(p);
    if (erro) {
        res.json("Esta Nacionalidade não existe");
    }
    else {
        res.json("Nacionalidade alterada!");
    }
}));
module.exports = router;
//# sourceMappingURL=nacionalidade.js.map