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
const TipoHabilidade = require("../../models/TipoHabilidade");
const router = express.Router();
router.post("/create", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let p = req.body;
    let erro = yield TipoHabilidade.create(p);
    if (erro) {
        res.statusCode = 400;
        res.json(erro);
    }
    else {
        res.json("Tipo de habilidade Registrada");
    }
})));
router.get("/list", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let lista = yield TipoHabilidade.list();
    res.json(lista);
})));
router.post("/delete", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let idTipoHabilidade = req.body.idTipoHabilidade;
    let a = yield TipoHabilidade.delete(idTipoHabilidade);
    if (a == false) {
        res.json("Tipo de habilidade não encontrada");
    }
    else {
        res.json("Tipo de habilidade deletada");
    }
})));
router.post("/read", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let idTipoHabilidade = req.body.idTipoHabilidade;
    let a = yield TipoHabilidade.read(idTipoHabilidade);
    res.json(a);
})));
router.post("/update", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let h = req.body;
    let erro = yield TipoHabilidade.update(h);
    if (erro) {
        res.json("Tipo de habilidade inexistente");
    }
    else {
        res.json("Tipo de habilidade alterado!");
    }
})));
module.exports = router;
//# sourceMappingURL=tipoHabilidade.js.map