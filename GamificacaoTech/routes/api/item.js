"use strict";
const express = require("express");
const wrap = require("express-async-error-wrapper");
const Item = require("../../models/Item");
const router = express.Router();
router.post("/create", wrap(async (req, res) => {
    let p = req.body;
    let erro = await Item.create(p);
    console.log(req.body);
    if (erro) {
        res.statusCode = 400;
        res.json(erro);
    }
    else {
        res.json("Item criado");
    }
}));
router.get("/list", wrap(async (req, res) => {
    let lista = await Item.list();
    res.json(lista);
}));
router.post("/delete", wrap(async (req, res) => {
    let idItem = req.body.idItem;
    let p = await Item.delete(idItem); //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {
        res.json("Item não encontrado");
    }
    else {
        res.json("Item deletado");
    }
}));
router.post("/read", wrap(async (req, res) => {
    let idItem = req.body.idItem;
    let p = await Item.read(idItem);
    res.json(p);
}));
router.post("/update", wrap(async (req, res) => {
    let p = req.body;
    let erro = await Item.update(p);
    console.log(erro);
    if (erro) {
        res.json("Este item não existe");
    }
    else {
        res.json("Item alterado!");
    }
}));
module.exports = router;
//# sourceMappingURL=item.js.map