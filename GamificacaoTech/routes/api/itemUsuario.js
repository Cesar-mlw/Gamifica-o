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
const ItemUsuario = require("../../models/ItemUsuario");
const Usuario = require("../../models/Usuario");
const Item = require("../../models/Item");
const router = express.Router();
router.post("/create", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let p = req.body;
    let item = yield Item.read(p.id_item);
    if (item === null) {
        res.statusCode = 400;
        res.json("Item não existe");
    }
    else {
        let erro = yield Usuario.buyObject(item.preco_item, p.ra_usuario);
        if (erro) {
            res.statusCode = 400;
            res.json(erro);
        }
        else {
            let resp = yield ItemUsuario.create(p);
            res.json(resp);
        }
    }
})));
router.get("/list", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let lista = yield ItemUsuario.list();
    res.json(lista);
})));
router.post("/delete", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let idItemUsuario = req.body.idItemUsuario;
    let p = yield ItemUsuario.delete(idItemUsuario); //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {
        res.json("Item do usuário não encontrado");
    }
    else {
        res.json("Item do usuário deletado");
    }
})));
router.post("/read", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ra = req.body.ra;
    let p = yield ItemUsuario.read(ra);
    res.json(p);
})));
router.post("/readPlacedItems", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ra = req.body.ra;
    let p = yield ItemUsuario.readPlacedItems(ra);
    res.json(p);
})));
router.post("/readNotPlacedItems", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ra = req.body.ra;
    let p = yield ItemUsuario.readNotPlacedItems(ra);
    res.json(p);
})));
router.post("/readOccupiedPlaces", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ra = req.body.ra;
    let p = yield ItemUsuario.readOccupiedPlaces(ra);
    res.json(p);
})));
router.post("/readImageStyle", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ra = req.body.ra;
    let p = yield ItemUsuario.readImageStyle(ra);
    res.json(p);
})));
router.post("/readMissingItems", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ra = req.body.ra;
    let p = yield ItemUsuario.readMissingItems(ra);
    res.json(p);
})));
router.post("/readMissingItemsSpecific", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ra = req.body.ra;
    let id_area = req.body.idArea;
    let p = yield ItemUsuario.readMissingItemsSpecific(ra, id_area);
    res.json(p);
})));
router.post("/update", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let p = req.body;
    let erro = yield ItemUsuario.update(p);
    if (erro) {
        res.json("O usuário não possui o item");
    }
    else {
        res.json("Item alterado!");
    }
})));
router.post("/placeObject", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id_item_usuario = req.body.id_item_usuario;
    let cellx = req.body.cellx;
    let celly = req.body.celly;
    let erro = yield ItemUsuario.placeObject(id_item_usuario, cellx, celly);
    if (!erro) {
        res.json("O usuário não possui o item");
    }
    else {
        res.json("Item Colocado!");
    }
})));
router.post("/removeObject", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id_item_usuario = req.body.id_item_usuario;
    let erro = yield ItemUsuario.removeObject(id_item_usuario);
    if (erro == null) {
        res.json("Erro");
    }
    else {
        res.json(erro);
    }
})));
module.exports = router;
//# sourceMappingURL=itemUsuario.js.map