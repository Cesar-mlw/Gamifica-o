"use strict";
const express = require("express");
const wrap = require("express-async-error-wrapper");
const Area = require("../../models/Area");
const router = express.Router();
router.post("/create", wrap(async (req, res) => {
    let p = req.body;
    let erro = await Area.create(p);
    if (erro) {
        res.statusCode = 400;
        res.json(erro);
    }
    else {
        res.json("Area criada");
    }
}));
router.get("/list", wrap(async (req, res) => {
    let lista = await Area.list();
    res.json(lista);
}));
router.post("/delete", wrap(async (req, res) => {
    let idArea = req.body.idArea;
    let p = await Area.delete(idArea); //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {
        res.json("Area não encontrada");
    }
    else {
        res.json("Area deletada");
    }
}));
router.get("/read", wrap(async (req, res) => {
    let idArea = req.query.idArea;
    let p = await Area.read(idArea);
    res.json(p);
}));
router.post("/update", wrap(async (req, res) => {
    let p = req.body;
    let erro = await Area.update(p);
    if (erro) {
        res.json("Esta Area não existe");
    }
    else {
        res.json("Area alterada!");
    }
}));
module.exports = router;
//# sourceMappingURL=area.js.map