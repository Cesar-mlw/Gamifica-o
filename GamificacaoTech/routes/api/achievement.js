"use strict";
const express = require("express");
const wrap = require("express-async-error-wrapper");
const Achievement = require("../../models/Achievement");
const router = express.Router();
router.post("/create", wrap(async (req, res) => {
    let a = req.body;
    let erro = await Achievement.create(a);
    if (erro) {
        res.statusCode = 400;
        res.json(erro);
    }
    else {
        res.json("Achievement criado");
    }
}));
router.get("/list", wrap(async (req, res) => {
    let lista = await Achievement.list();
    res.json(lista);
}));
router.post("/delete", wrap(async (req, res) => {
    let idAchievement = req.body.idAchievement;
    let a = await Achievement.delete(idAchievement);
    if (a == false) {
        res.json("Achievement não encontrado");
    }
    else {
        res.json("Achievement deletado");
    }
}));
router.post("/read", wrap(async (req, res) => {
    let idAchievement = req.body.idAchievement;
    let a = await Achievement.read(idAchievement);
    res.json(a);
}));
router.post("/update", wrap(async (req, res) => {
    let a = req.body;
    let erro = await Achievement.update(a);
    if (erro) {
        res.json("Achievement inexistente");
    }
    else {
        res.json("Achievement alterado!");
    }
}));
module.exports = router;
//# sourceMappingURL=achievement.js.map