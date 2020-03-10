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
        console.log(req.cookies.ra_usuario);
        let points = await Usuario.readUserPoints(11710370);
        let books = [];
        for (let i = 0; i < points.length; i++) {
            books.push(StringBuilder.bookSpiller(points[i]['pontos'], points[i]['id']));
        }
        let allAchievements = await Achievement.listJoin();
        let missingAchievements = await AchievementUsuario.readMissingAchievements(11710370);
        let achieveHTML = StringBuilder.shelfSpiller(allAchievements, missingAchievements);
        let achievePreviewHTML = StringBuilder.shelfPreviewSpiller(allAchievements, missingAchievements);
        let notPlacedItemsJson = await ItemUsuario.readNotPlacedItems(11710370);
        let notPlacedItems = StringBuilder.itemBoxSpiller(await ItemUsuario.readNotPlacedItems(11710370));
        let placedItemsJson = await ItemUsuario.readPlacedItems(11710370);
        let placedItems = StringBuilder.placedItemSpiller(placedItemsJson);
        // console.log(StringBuilder.storeItemSpiller(await ItemUsuario.readMissingItems(11710370)))
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
    res.render('loginRegistro', { titulo: 'Gamificação TECH' });
}));
router.get('/pc', wrap(async (req, res) => {
    if (req.cookies.ra_usuario == undefined && req.cookies.looged == undefined) {
        res.redirect("/login");
    }
    else {
        res.render('pc', { titulo: 'Gamificação TECH' });
    }
}));
router.get('/login', wrap(async (req, res) => {
    res.render('login', { titulo: 'Gamificação TECH',
        layout: 'layoutLogin' }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));
router.post('/registro', wrap(async (req, res) => {
    res.render('registro', { titulo: 'Gamificação TECH',
        layout: 'layoutLogin' }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));
router.get('/feed', wrap(async (req, res) => {
    if (req.cookies.ra_usuario == undefined && req.cookies.looged == undefined) {
        res.redirect("/login");
    }
    else {
        res.render('feed', { titulo: 'Gamificação TECH' });
    }
}));
router.get('/achieve', wrap(async (req, res) => {
    if (req.cookies.ra_usuario == undefined && req.cookies.looged == undefined) {
        res.redirect("/login");
    }
    else {
        res.render('achieve', { titulo: 'Gamificação TECH' });
    }
}));
router.get('/formTest', wrap(async (req, res) => {
    res.render('formTest', { titulo: "Gamificação" }); //renderizar a tela
}));
router.get('/portifolio', wrap(async (req, res) => {
    let projetos = await Projeto.read(11710370);
    let projetosHTML = StringBuilder.projectSpiller(await Projeto.read(11710370));
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
router.get('/curriculo', wrap(async (req, res) => {
    let habs = await Habilidade.read(11710370);
    res.render('curriculo', { layout: 'layoutVazio',
        habilidades: habs }); //renderizar a tela
}));
router.get('/testeAjax', wrap(async (req, res) => {
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
router.get('/loja', wrap(async (req, res) => {
    let storeItems = StringBuilder.storeItemSpiller(await ItemUsuario.readMissingItems(11710370));
    res.render('loja', {
        layout: 'layoutVazio',
        storeItems: storeItems
    }); //renderizar a tela
}));
module.exports = router;
//# sourceMappingURL=home.js.map