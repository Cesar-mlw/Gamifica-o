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
const Pais = require("../../models/Pais");
const router = express.Router();
router.post("/create", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let p = req.body;
    let erro = yield Pais.create(p);
    if (erro) {
        res.status(400).send({ status: "error", message: erro });
    }
    else {
        res.status(200).send({ status: "success", message: `pais ${p.id_pais} created` });
    }
})));
router.get("/list", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let lista = yield Pais.list();
    res.json(lista);
})));
router.post("/delete", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let idPais = req.body.idPais;
    let p = yield Pais.delete(idPais); //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {
        res.status(404).send({ status: "error", message: `pais ${idPais} not found` });
    }
    else {
        res.status(200).send({ status: "success", message: `Tipo de projeto ${idPais} deleted` });
    }
})));
router.post("/read", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let idPais = req.body.idPais;
    let p = yield Pais.read(idPais);
    res.json(p);
})));
router.post("/update", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let p = req.body;
    let erro = yield Pais.update(p);
    if (erro) {
        res.status(404).send({ status: "error", message: `pais ${p.id_pais} not found` });
    }
    else {
        res.status(200).send({ status: "success", message: `Tipo de projeto ${p.id_pais} altered` });
    }
})));
module.exports = router;
//# sourceMappingURL=pais.js.map