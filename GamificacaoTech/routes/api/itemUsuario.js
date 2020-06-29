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
        res.status(404).send({ status: "error", message: `item ${p.id_item} not found` });
    }
    else {
        let erro = yield Usuario.buyObject(item.preco_item, p.ra_usuario);
        if (erro) {
            res.status(400).send({ status: "error", message: erro });
        }
        else {
            let resp = yield ItemUsuario.create(p);
            if (resp == undefined)
                resp = "Item Comprado";
            else
                resp = "Item nao comprado";
            res.status(200).send({ status: "success", message: resp });
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
        res.status(404).send({ status: "error", message: `item usuario ${idItemUsuario} not found` });
    }
    else {
        res.status(200).send({ status: "success", message: `item usuario ${idItemUsuario} deleted` });
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
        res.status(404).send({ status: "error", message: `user does not have ${p.id_item}` });
    }
    else {
        res.status(200).send({ status: "success", message: `item usuario ${p.id_item_usuario} altered` });
    }
})));
router.post("/placeObject", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id_item_usuario = req.body.id_item_usuario;
    let cellx = req.body.cellx;
    let celly = req.body.celly;
    let erro = yield ItemUsuario.placeObject(id_item_usuario, cellx, celly);
    if (!erro) {
        res.status(404).send({ status: "error", message: `user does not have ${id_item_usuario}` });
    }
    else {
        res.status(200).send({ status: "success", message: `item ${id_item_usuario} placed` });
    }
})));
router.post("/removeObject", wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id_item_usuario = req.body.id_item_usuario;
    let erro = yield ItemUsuario.removeObject(id_item_usuario);
    if (erro == null) {
        res.status(200).send({ status: "success", message: `item ${id_item_usuario} removed` });
    }
    else {
        res.status(400).send({ status: "error", message: erro });
    }
})));
module.exports = router;
//# sourceMappingURL=itemUsuario.js.map