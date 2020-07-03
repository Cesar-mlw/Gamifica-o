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
const Noticia = require("../../models/Noticia");
const router = express.Router();
router.post("/create", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let p = req.body;
    let erro = yield Noticia.create(p);
    console.log(erro);
    if (erro) {
        res.status(400).send({ status: "error", message: erro });
    }
    else {
        res.status(200).send({ status: "success", message: `noticia ${p.id_noticia} created` });
    }
})));
router.post("/delete", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let idNoticia = req.body.idNoticia;
    let p = yield Noticia.delete(idNoticia); //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {
        res.status(404).send({ status: "error", message: `noticia ${idNoticia} not found` });
    }
    else {
        res.status(200).send({ status: "success", message: `noticia ${idNoticia} deleted` });
    }
})));
router.post("/read", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let idNoticia = req.body.idNoticia;
    let p = yield Noticia.read(idNoticia);
    res.json(p);
})));
router.post("/readFromUserID", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ra = req.body.ra;
    let p = yield Noticia.readFromUserId(ra);
    res.json(p);
})));
router.post("/update", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let p = req.body;
    let erro = yield Noticia.update(p);
    if (erro) {
        res.status(404).send({ status: "error", message: `noticia ${p.id_noticia} not found` });
    }
    else {
        res.status(200).send({ status: "success", message: `noticia ${p.id_noticia} altered` });
    }
})));
router.get("/list", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let lista = yield Noticia.list();
    res.json(lista);
})));
module.exports = router;
//# sourceMappingURL=noticia.js.map