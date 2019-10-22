"use strict";
const express = require("express");
const wrap = require("express-async-error-wrapper");
const AchievementUsuario = require("../../models/AchievementUsuario");
const router = express.Router();
router.post("/create", wrap(async (req, res) => {
    let a = req.body;
    let erro = await AchievementUsuario.create(a);
    if (erro) {
        res.statusCode = 400;
        res.json(erro);
    }
    else {
        res.json("Achievement do usuário criado");
    }
}));
router.get("/list", wrap(async (req, res) => {
    let lista = await AchievementUsuario.list();
    res.json(lista);
}));
router.post("/delete", wrap(async (req, res) => {
    let idAchievementUsuario = req.body.idAchievementUsuario;
    let a = await AchievementUsuario.delete(idAchievementUsuario);
    if (a == false) {
        res.json("O usuário não possui esse achievement");
    }
    else {
        res.json("Achievement do usuário deletado");
    }
}));
router.post("/read", wrap(async (req, res) => {
    let idAchievementUsuario = req.body.idAchievementUsuario;
    let a = await AchievementUsuario.read(idAchievementUsuario);
    res.json(a);
}));
router.post("/readFromUserID", wrap(async (req, res) => {
    let ra = req.body.ra;
    let a = await AchievementUsuario.readFromUserID(ra);
    res.json(a);
}));
router.post("/readMissingAchievements", wrap(async (req, res) => {
    let ra = req.body.ra;
    let a = await AchievementUsuario.readMissingAchievements(ra);
    res.json(a);
}));
router.post("/readFeaturedAchievements", wrap(async (req, res) => {
    let ra = req.body.ra;
    let a = await AchievementUsuario.readFeaturedAchievements(ra);
    res.json(a);
}));
router.post("/update", wrap(async (req, res) => {
    let a = req.body;
    let erro = await AchievementUsuario.update(a);
    if (erro) {
        res.json("O usuário não possui esse Achievement");
    }
    else {
        res.json("Achievement do usuário alterado");
    }
}));
module.exports = router;
//# sourceMappingURL=achievementUsuario.js.map