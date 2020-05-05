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
const Curso = require("../../models/Curso");
const router = express.Router();
router.post("/create", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let p = req.body;
    let erro = yield Curso.create(p);
    if (erro) {
        res.statusCode = 400;
        res.json(erro);
    }
    else {
        res.json("Curso criado");
    }
})));
router.get("/list", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let lista = yield Curso.list();
    res.json(lista);
})));
router.post("/delete", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let idCurso = req.body.idCurso;
    let p = yield Curso.delete(idCurso); //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {
        res.json("Curso não encontrado");
    }
    else {
        res.json("Curso deletado");
    }
})));
router.post("/read", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let idCurso = req.body.idCurso;
    let p = yield Curso.read(idCurso);
    res.json(p);
})));
router.post("/update", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let p = req.body;
    let erro = yield Curso.update(p);
    if (erro) {
        res.json("Este Curso não existe");
    }
    else {
        res.json("Curso alterado!");
    }
})));
module.exports = router;
//# sourceMappingURL=curso.js.map