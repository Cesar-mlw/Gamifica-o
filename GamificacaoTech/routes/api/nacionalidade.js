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
const Nacionalidade = require("../../models/Nacionalidade");
const router = express.Router();
router.post("/create", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let p = req.body;
    let erro = yield Nacionalidade.create(p);
    if (erro) {
        res.status(400).send({ status: "error", message: erro });
    }
    else {
        res.status(200).send({ status: "success", message: `nacionalidade ${p.id_nacionalidade} created` });
    }
})));
router.get("/list", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let lista = yield Nacionalidade.list();
    res.json(lista);
})));
router.post("/delete", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let idNacionalidade = req.body.idNacionalidade;
    let p = yield Nacionalidade.delete(idNacionalidade); //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {
        res.status(404).send({ status: "error", message: `nacionalidade ${idNacionalidade} not found` });
    }
    else {
        res.status(200).send({ status: "success", message: `nacionalidade ${idNacionalidade} deleted` });
    }
})));
router.post("/read", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let idNacionalidade = req.body.idNacionalidade;
    let p = yield Nacionalidade.read(idNacionalidade);
    res.json(p);
})));
router.post("/update", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let p = req.body;
    let erro = yield Nacionalidade.update(p);
    if (erro) {
        res.status(404).send({ status: "error", message: `nacionalidade ${p.id_nacionalidade} not found` });
    }
    else {
        res.status(200).send({ status: "success", message: `nacionalidade ${p.id_nacionalidade} altered` });
    }
})));
module.exports = router;
//# sourceMappingURL=nacionalidade.js.map