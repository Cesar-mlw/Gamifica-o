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
const TipoHabilidade = require("../../models/TipoHabilidade");
const router = express.Router();
router.post("/create", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let p = req.body;
    let erro = yield TipoHabilidade.create(p);
    if (erro) {
        res.status(400).send({ status: "error", message: erro });
    }
    else {
        res.status(200).send({ status: "success", message: `Tipo de habilidade ${p.id_tipo_habilidade} created` });
    }
})));
router.get("/list", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let lista = yield TipoHabilidade.list();
    res.json(lista);
})));
router.post("/delete", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let idTipoHabilidade = req.body.idTipoHabilidade;
    let a = yield TipoHabilidade.delete(idTipoHabilidade);
    if (a == false) {
        res.status(404).send({ status: "error", message: `Tipo de habilidade ${idTipoHabilidade} not found` });
    }
    else {
        res.status(200).send({ status: "success", message: `Tipo de habilidade ${idTipoHabilidade} deleted` });
    }
})));
router.post("/read", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let idTipoHabilidade = req.body.idTipoHabilidade;
    let a = yield TipoHabilidade.read(idTipoHabilidade);
    res.json(a);
})));
router.post("/update", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let h = req.body;
    let erro = yield TipoHabilidade.update(h);
    if (erro) {
        res.status(404).send({ status: "error", message: `Tipo de habilidade ${h.id_tipo_habilidade} not found` });
    }
    else {
        res.status(200).send({ status: "success", message: `Tipo de habilidade ${h.id_tipo_habilidade} altered` });
    }
})));
module.exports = router;
//# sourceMappingURL=tipoHabilidade.js.map