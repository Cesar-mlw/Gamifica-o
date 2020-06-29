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
const Achievement = require("../../models/Achievement");
const router = express.Router();
router.post("/create", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let a = req.body;
    let erro = yield Achievement.create(a);
    if (erro) {
        res.status(400).send({ status: "error", message: erro });
    }
    else {
        res.status(200).send({ status: "success", message: `achievement ${a.id_achievement} created!` });
    }
})));
router.get("/list", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let lista = yield Achievement.list();
    res.json(lista);
})));
router.post("/delete", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let idAchievement = req.body.idAchievement;
    let a = yield Achievement.delete(idAchievement);
    if (a == false) {
        res.status(404).send({ status: "error", message: `achievement ${idAchievement} not found` });
    }
    else {
        res.status(200).send({ status: "success", message: `area ${idAchievement} deleted` });
    }
})));
router.post("/read", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let idAchievement = req.body.idAchievement;
    let a = yield Achievement.read(idAchievement);
    res.json(a);
})));
router.post("/update", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let a = req.body;
    let erro = yield Achievement.update(a);
    if (erro) {
        res.status(404).send({ status: "error", message: `area ${a.id_achievement} not found` });
    }
    else {
        res.status(200).send({ status: "success", message: `area ${a.id_achievement} altered!` });
    }
})));
module.exports = router;
//# sourceMappingURL=achievement.js.map