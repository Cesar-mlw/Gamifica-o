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
        res.status(400).send({ status: "error", message: erro });
    }
    else {
        res.status(200).send({ status: "success", message: `achievement usuario ${id} created!` });
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
        res.status(404).send({ status: "error", message: `User does not have achievement ${idAchievementUsuario}` });
    }
    else {
        res.status(200).send({ status: "success", message: `achievement ${idAchievementUsuario} deleted` });
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
        res.status(404).send({ status: "error", message: `achievement usuario ${a.id_achievement_usuario} not found` });
    }
    else {
        res.status(200).send({ status: "success", message: `achievement usuario ${a.id_achievement_usuario} altered!` });
    }
})));
module.exports = router;
//# sourceMappingURL=achievementUsuario.js.map