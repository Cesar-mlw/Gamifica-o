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
const Cidade = require("../../models/Cidade");
const router = express.Router();
router.post("/create", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let p = req.body;
    let erro = yield Cidade.create(p);
    if (erro) {
        res.statusCode = 400;
        res.json(erro);
    }
    else {
        res.json("Cidade criada");
    }
})));
router.get("/list", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let lista = yield Cidade.list();
    res.json(lista);
})));
router.post("/delete", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let idCidade = req.body.idCidade;
    let p = yield Cidade.delete(idCidade); //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {
        res.json("Cidade não encontrada");
    }
    else {
        res.json("Cidade deletada");
    }
})));
router.post("/read", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let idCidade = req.body.idCidade;
    let p = yield Cidade.read(idCidade);
    res.json(p);
})));
router.post("/update", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let p = req.body;
    let erro = yield Cidade.update(p);
    if (erro) {
        res.json("Esta Cidade não existe");
    }
    else {
        res.json("Cidade alterada!");
    }
})));
module.exports = router;
//# sourceMappingURL=cidade.js.map