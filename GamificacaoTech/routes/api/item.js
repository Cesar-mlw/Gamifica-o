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
const Item = require("../../models/Item");
const router = express.Router();
router.post("/create", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let p = req.body;
    let erro = yield Item.create(p);
    console.log(req.body);
    if (erro) {
        res.statusCode = 400;
        res.json(erro);
    }
    else {
        res.json("Item criado");
    }
})));
router.get("/list", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let lista = yield Item.list();
    res.json(lista);
})));
router.post("/delete", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let idItem = req.body.idItem;
    let p = yield Item.delete(idItem); //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {
        res.json("Item não encontrado");
    }
    else {
        res.json("Item deletado");
    }
})));
router.post("/read", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let idItem = req.body.idItem;
    let p = yield Item.read(idItem);
    res.json(p);
})));
router.post("/update", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let p = req.body;
    let erro = yield Item.update(p);
    console.log(erro);
    if (erro) {
        res.json("Este item não existe");
    }
    else {
        res.json("Item alterado!");
    }
})));
module.exports = router;
//# sourceMappingURL=item.js.map