"use strict";
const express = require("express");
const wrap = require("express-async-error-wrapper");
const Habilidade = require("../../models/Habilidade");
const router = express.Router();
router.post("/create", wrap(async (req, res) => {
    let p = req.body;
    let erro = await Habilidade.create(p);
    if (erro) {
        res.statusCode = 400;
        res.json(erro);
    }
    else {
        res.json("Habilidade Registrada");
    }
}));
router.get("/list", wrap(async (req, res) => {
    let lista = await Habilidade.list();
    res.json(lista);
}));
router.post("/delete", wrap(async (req, res) => {
    let idHabilidade = req.body.idHabilidade;
    let a = await Habilidade.delete(idHabilidade);
    if (a == false) {
        res.json("Habilidade não encontrada");
    }
    else {
        res.json("Habilidade deletada");
    }
}));
router.get("/read", wrap(async (req, res) => {
    let ra = req.query.ra;
    let a = await Habilidade.read(ra);
    res.json(a);
}));
router.post("/update", wrap(async (req, res) => {
    let h = req.body;
    let erro = await Habilidade.update(h);
    if (erro) {
        res.json("Habilidade inexistente");
    }
    else {
        res.json("Habilidade alterada!");
    }
}));
module.exports = router;
//# sourceMappingURL=habilidade.js.map