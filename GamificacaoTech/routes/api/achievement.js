"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const wrap = require("express-async-error-wrapper");
const Achievement = require("../../models/Achievement");
const router = express.Router();
router.post("/create", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let a = req.body;
    let erro = yield Achievement.create(a);
    if (erro) {
        res.statusCode = 400;
        res.json(erro);
    }
    else {
        res.json("Achievement criado");
    }
})));
router.get("/list", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let lista = yield Achievement.list();
    res.json(lista);
})));
router.post("/delete", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let idAchievement = req.body.idAchievement;
    let a = yield Achievement.delete(idAchievement);
    if (a == false) {
        res.json("Achievement não encontrado");
    }
    else {
        res.json("Achievement deletado");
    }
})));
router.post("/read", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let idAchievement = req.body.idAchievement;
    let a = yield Achievement.read(idAchievement);
    res.json(a);
})));
router.post("/update", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let a = req.body;
    let erro = yield Achievement.update(a);
    if (erro) {
        res.json("Achievement inexistente");
    }
    else {
        res.json("Achievement alterado!");
    }
})));
module.exports = router;
//# sourceMappingURL=achievement.js.map