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
const TipoProjeto = require("../../models/TipoProjeto");
const router = express.Router();
router.post("/create", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let p = req.body;
    let erro = yield TipoProjeto.create(p);
    console.log(req.body);
    if (erro) {
        res.statusCode = 400;
        res.json(erro);
    }
    else {
        res.json("Tipo de projeto criado");
    }
})));
router.get("/list", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let lista = yield TipoProjeto.list();
    res.json(lista);
})));
router.post("/delete", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let idTipoProjeto = req.body.idTipoProjeto;
    let p = yield TipoProjeto.delete(idTipoProjeto); //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {
        res.json("Tipo de projeto não encontrado");
    }
    else {
        res.json("Tipo de projeto deletado");
    }
})));
router.post("/read", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let idTipoProjeto = req.body.idTipoProjeto;
    let p = yield TipoProjeto.read(idTipoProjeto);
    res.json(p);
})));
router.post("/update", wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    let p = req.body;
    let erro = yield TipoProjeto.update(p);
    console.log(erro);
    if (erro) {
        res.json("Este tipo de projeto não existe");
    }
    else {
        res.json("Tipo de projeto alterado!");
    }
})));
module.exports = router;
//# sourceMappingURL=tipoProjeto.js.map