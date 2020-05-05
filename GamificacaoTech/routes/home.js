"use strict";
const express = require("express");
const wrap = require("express-async-error-wrapper");
const Usuario = require("../models/Usuario");
const Projeto = require("../models/Projeto");
const StringBuilder = require("../utils/stringBuilder");
const Habilidade = require("../models/Habilidade");
const AchievementUsuario = require("../models/AchievementUsuario");
const Achievement = require("../models/Achievement");
const ItemUsuario = require("../models/ItemUsuario");
const Area = require("../models/Area");
const TipoProjeto = require("../models/TipoProjeto");
const TipoHabilidade = require("../models/TipoHabilidade");
const router = express.Router();
//import usuario
router.get('/', wrap(async (req, res) => {
    if (req.cookies.ra_usuario == undefined || req.cookies.logged == undefined) {
        res.redirect("/login");
    }
    else {
        let points = await Usuario.readUserPoints(req.cookies.ra_usuario);
        let books = [];
        for (let i = 0; i < points.length; i++) {
            books.push(StringBuilder.bookSpiller(points[i]['pontos'], points[i]['nome_area'], points[i]['id_area']));
        }
        let allAchievements = await Achievement.listJoin();
        let missingAchievements = await AchievementUsuario.readMissingAchievements(req.cookies.ra_usuario);
        let achieveHTML = StringBuilder.shelfSpiller(allAchievements, missingAchievements);
        let achievePreviewHTML = StringBuilder.shelfPreviewSpiller(allAchievements, missingAchievements);
        let notPlacedItemsJson = await ItemUsuario.readNotPlacedItems(req.cookies.ra_usuario);
        let notPlacedItems = StringBuilder.itemBoxSpiller(await ItemUsuario.readNotPlacedItems(req.cookies.ra_usuario));
        let placedItemsJson = await ItemUsuario.readPlacedItems(req.cookies.ra_usuario);
        let placedItems = StringBuilder.placedItemSpiller(placedItemsJson);
        // Book pile string builder
        res.render('home', { titulo: 'Gamificação TECH',
            books: books,
            achieveHTML: achieveHTML,
            achievePreviewHTML: achievePreviewHTML,
            notPlacedItemsJson: JSON.stringify(notPlacedItemsJson),
            notPlacedItems: notPlacedItems,
            placedItems: placedItems,
            placedItemsJson: JSON.stringify(placedItemsJson) });
    }
}));
router.get('/login', wrap(async (req, res) => {
    res.render('loginRegistro', { titulo: 'Gamificação TECH', layout: 'layoutLogin' });
}));
router.post('/pc', wrap(async (req, res) => {
    if (req.cookies.ra_usuario == undefined && req.cookies.looged == undefined) {
        res.redirect("/login");
    }
    else {
        res.render('pc', { titulo: 'Gamificação TECH' });
    }
}));
router.post('/feed', wrap(async (req, res) => {
    if (req.cookies.ra_usuario == undefined && req.cookies.looged == undefined) {
        res.redirect("/login");
    }
    else {
        res.render('feed', { titulo: 'Gamificação TECH' });
    }
}));
router.post('/achieve', wrap(async (req, res) => {
    if (req.cookies.ra_usuario == undefined && req.cookies.looged == undefined) {
        res.redirect("/login");
    }
    else {
        res.render('achieve', { titulo: 'Gamificação TECH' });
    }
}));
router.post('/formTest', wrap(async (req, res) => {
    res.render('formTest', { titulo: "Gamificação" }); //renderizar a tela
}));
router.post('/portifolio', wrap(async (req, res) => {
    let projetos = await Projeto.read(req.cookies.ra_usuario);
    let projetosHTML = StringBuilder.projectSpiller(await Projeto.read(req.cookies.ra_usuario));
    let numeroDeProjetos = projetos.length;
    let listaArea = StringBuilder.areaSpiller(await Area.list());
    let listaTipoProjeto = StringBuilder.tipoProjetoSpiller(await TipoProjeto.list());
    res.render('portifolio', { layout: 'layoutVazio',
        projetos: projetos,
        projetosHTML: projetosHTML,
        numeroDeProjetos: numeroDeProjetos,
        listaArea: listaArea,
        listaTipoProjeto: listaTipoProjeto }); //renderizar a tela
}));
router.post('/curriculo', wrap(async (req, res) => {
    let habs = await Habilidade.read(req.cookies.ra_usuario);
    res.render('curriculo', { layout: 'layoutVazio',
        habilidades: habs }); //renderizar a tela
}));
router.post('/testeAjax', wrap(async (req, res) => {
    res.render('testeAjax', { layout: 'layoutVazio' }); //renderizar a tela
}));
router.post('/registroProjeto', wrap(async (req, res) => {
    let listaArea = StringBuilder.areaSpiller(await Area.list());
    let listaTipoProjeto = StringBuilder.tipoProjetoSpiller(await TipoProjeto.list());
    let listaTipoHabilidade = StringBuilder.tipoHabilidadeSpiller(await TipoHabilidade.list());
    res.render('registroProjeto', { layout: 'layoutVazio',
        listaArea: listaArea,
        listaTipoProjeto: listaTipoProjeto,
        listaTipoHabilidade: listaTipoHabilidade }); //renderizar a tela
}));
router.post('/loja', wrap(async (req, res) => {
    let storeItems = StringBuilder.storeItemSpiller(await ItemUsuario.readMissingItems(req.cookies.ra_usuario));
    res.render('loja', {
        layout: 'layoutVazio',
        storeItems: storeItems
    }); //renderizar a tela
}));
module.exports = router;
//# sourceMappingURL=home.js.map