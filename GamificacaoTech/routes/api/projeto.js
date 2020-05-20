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
const Projeto = require("../../models/Projeto");
const router = express.Router();
router.post("/create", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let p = req.body;
    let erro = yield Projeto.create(p);
    let achievement = yield Projeto.checkForAchievements(p.ra_usuario, p.id_tipo_projeto);
    if (erro) {
        res.status(400).send({ status: "error", message: erro });
    }
    else {
        if (achievement.length > 0) {
            res.status(200).send(achievement);
        }
        else {
            res.status(200).send({ status: "success", message: `projeto ${p.id_projeto} created` });
        }
    }
})));
router.get("/list", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let lista = yield Projeto.list();
    res.json(lista);
})));
router.post("/delete", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let idProjeto = req.body.idProjeto;
    let p = yield Projeto.delete(idProjeto); //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {
        res.status(404).send({ status: "error", message: `projeto ${idProjeto} not found` });
    }
    else {
        res.status(200).send({ status: "success", message: `projeto ${idProjeto} deleted` });
    }
})));
router.post("/read", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ra = req.body.ra_usuario;
    let p = yield Projeto.read(ra);
    res.json(p);
})));
router.post("/readTipoProjetoCount", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ra = req.body.ra;
    let p = yield Projeto.readTipoProjetoCounts(ra);
    res.json(p);
})));
router.post("/update", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let p = req.body;
    let erro = yield Projeto.update(p);
    console.log(erro);
    if (erro) {
        res.status(404).send({ status: "error", message: `projeto ${p.id_projeto} not found` });
    }
    else {
        res.status(200).send({ status: "success", message: `projeto ${p.id_projeto} altered` });
    }
})));
module.exports = router;
//# sourceMappingURL=projeto.js.map