"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const wrap = require("express-async-error-wrapper");
const AchievementUsuario = require("../../models/AchievementUsuario");
const router = express.Router();
router.post("/create", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ra = req.body.ra;
    let id = req.body.id_achievement;
    let erro = yield AchievementUsuario.create(ra, id);
    if (erro) {
        res.statusCode = 400;
        res.json(erro);
    }
    else {
        res.json("Achievement do usuário criado");
    }
})));
router.get("/list", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let lista = yield AchievementUsuario.list();
    res.json(lista);
})));
router.post("/delete", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let idAchievementUsuario = req.body.idAchievementUsuario;
    let a = yield AchievementUsuario.delete(idAchievementUsuario);
    if (a == false) {
        res.json("O usuário não possui esse achievement");
    }
    else {
        res.json("Achievement do usuário deletado");
    }
})));
router.post("/read", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let idAchievementUsuario = req.body.idAchievementUsuario;
    let a = yield AchievementUsuario.read(idAchievementUsuario);
    res.json(a);
})));
router.post("/readFromUserID", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ra = req.body.ra;
    let a = yield AchievementUsuario.readFromUserID(ra);
    res.json(a);
})));
router.post("/readMissingAchievements", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ra = req.body.ra;
    let a = yield AchievementUsuario.readMissingAchievements(ra);
    res.json(a);
})));
router.post("/readFeaturedAchievements", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ra = req.body.ra;
    let a = yield AchievementUsuario.readFeaturedAchievements(ra);
    res.json(a);
})));
router.post("/update", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let a = req.body;
    let erro = yield AchievementUsuario.update(a);
    if (erro) {
        res.json("O usuário não possui esse Achievement");
    }
    else {
        res.json("Achievement do usuário alterado");
    }
})));
module.exports = router;
//# sourceMappingURL=achievementUsuario.js.map