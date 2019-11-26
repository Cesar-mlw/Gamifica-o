"use strict";
const express = require("express");
const wrap = require("express-async-error-wrapper");
const ItemUsuario = require("../../models/ItemUsuario");
const Usuario = require("../../models/Usuario");
const Item = require("../../models/Item");
const router = express.Router();
router.post("/create", wrap(async (req, res) => {
    let p = req.body;
    let item = await Item.read(p.id_item);
    if (Item === null) {
        res.statusCode = 400;
        res.json("Item não existe");
    }
    else {
        let erro = await Usuario.buyObject(item.preco_item, p.ra_usuario);
        if (erro) {
            res.statusCode = 400;
            res.json(erro);
        }
        else {
            let resp = await ItemUsuario.create(p);
            if (resp) {
                res.statusCode = 400;
                res.json(resp);
            }
            else {
                res.json("Item Usuario criado");
            }
        }
    }
}));
router.get("/list", wrap(async (req, res) => {
    let lista = await ItemUsuario.list();
    res.json(lista);
}));
router.post("/delete", wrap(async (req, res) => {
    let idItemUsuario = req.body.idItemUsuario;
    let p = await ItemUsuario.delete(idItemUsuario); //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {
        res.json("Item do usuário não encontrado");
    }
    else {
        res.json("Item do usuário deletado");
    }
}));
router.post("/read", wrap(async (req, res) => {
    let ra = req.body.ra;
    let p = await ItemUsuario.read(ra);
    res.json(p);
}));
router.post("/readPlacedItems", wrap(async (req, res) => {
    let ra = req.body.ra;
    let p = await ItemUsuario.readPlacedItems(ra);
    res.json(p);
}));
router.post("/readNotPlacedItems", wrap(async (req, res) => {
    let ra = req.body.ra;
    let p = await ItemUsuario.readNotPlacedItems(ra);
    res.json(p);
}));
router.post("/readOccupiedPlaces", wrap(async (req, res) => {
    let ra = req.body.ra;
    let p = await ItemUsuario.readOccupiedPlaces(ra);
    res.json(p);
}));
router.post("/update", wrap(async (req, res) => {
    let p = req.body;
    let erro = await ItemUsuario.update(p);
    if (erro) {
        res.json("O usuário não possui o item");
    }
    else {
        res.json("Item alterado!");
    }
}));
router.post("/placeObject", wrap(async (req, res) => {
    let id_item_usuario = req.body.id_item_usuario;
    let cellx = req.body.cellx;
    let celly = req.body.celly;
    let erro = await ItemUsuario.placeObject(id_item_usuario, cellx, celly);
    if (!erro) {
        res.json("O usuário não possui o item");
    }
    else {
        res.json("Item Colocado!");
    }
}));
router.post("/removeObject", wrap(async (req, res) => {
    let id_item_usuario = req.body.id_item_usuario;
    let erro = await ItemUsuario.removeObject(id_item_usuario);
    if (!erro) {
        res.json("O usuário não possui o item");
    }
    else {
        res.json("Item Retirado!");
    }
}));
module.exports = router;
//# sourceMappingURL=itemUsuario.js.map