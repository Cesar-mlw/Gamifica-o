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
const Habilidade = require("../../models/Habilidade");
const router = express.Router();
router.post("/create", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let p = req.body;
    let erro = yield Habilidade.create(p);
    if (erro) {
        res.statusCode = 400;
        res.json(erro);
    }
    else {
        res.json("Habilidade Registrada");
    }
})));
router.get("/list", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let lista = yield Habilidade.list();
    res.json(lista);
})));
router.post("/delete", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let idHabilidade = req.body.idHabilidade;
    let a = yield Habilidade.delete(idHabilidade);
    if (a == false) {
        res.json("Habilidade não encontrada");
    }
    else {
        res.json("Habilidade deletada");
    }
})));
router.post("/read", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ra = req.body.ra;
    let a = yield Habilidade.read(ra);
    res.json(a);
})));
router.post("/update", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let h = req.body;
    let erro = yield Habilidade.update(h);
    if (erro) {
        res.json("Habilidade inexistente");
    }
    else {
        res.json("Habilidade alterada!");
    }
})));
module.exports = router;
//# sourceMappingURL=habilidade.js.map