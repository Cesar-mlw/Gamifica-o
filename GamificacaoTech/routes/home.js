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
router.get('/', wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield Usuario.doesNotExist(req.cookies.ra_usuario)) {
        res.redirect("/login");
    }
    else {
        let points = yield Usuario.readUserPoints(req.cookies.ra_usuario);
        let books = [];
        for (let i = 0; i < points.length; i++) {
            books.push(StringBuilder.bookSpiller(points[i]['pontos'], points[i]['nome_area'], points[i]['id_area']));
        }
        let allAchievements = yield Achievement.listJoin();
        let missingAchievements = yield AchievementUsuario.readMissingAchievements(req.cookies.ra_usuario);
        let achieveHTML = StringBuilder.shelfSpiller(allAchievements, missingAchievements);
        let achievePreviewHTML = StringBuilder.shelfPreviewSpiller(allAchievements, missingAchievements);
        let notPlacedItemsJson = yield ItemUsuario.readNotPlacedItems(req.cookies.ra_usuario);
        let notPlacedItems = StringBuilder.itemBoxSpiller(yield ItemUsuario.readNotPlacedItems(req.cookies.ra_usuario));
        let placedItemsJson = yield ItemUsuario.readPlacedItems(req.cookies.ra_usuario);
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
})));
router.get('/login', wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield Usuario.doesNotExist(req.cookies.ra_usuario))) {
        res.redirect("/");
        res.clearCookie("ra_usuario");
        res.clearCookie("logged");
    }
    else {
        res.render('loginRegistro', { titulo: 'Gamificação TECH', layout: 'layoutLogin' });
    }
})));
router.post('/pc', wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.cookies.ra_usuario == undefined && req.cookies.looged == undefined) {
        res.redirect("/login");
    }
    else {
        res.render('pc', { titulo: 'Gamificação TECH' });
    }
})));
router.post('/feed', wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.cookies.ra_usuario == undefined && req.cookies.looged == undefined) {
        res.redirect("/login");
    }
    else {
        res.render('feed', { titulo: 'Gamificação TECH' });
    }
})));
router.post('/achieve', wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.cookies.ra_usuario == undefined && req.cookies.looged == undefined) {
        res.redirect("/login");
    }
    else {
        res.render('achieve', { titulo: 'Gamificação TECH' });
    }
})));
router.post('/formTest', wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('formTest', { titulo: "Gamificação" }); //renderizar a tela
})));
router.post('/portifolio', wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let projetos = yield Projeto.read(req.cookies.ra_usuario);
    console.log(projetos);
    let projetosHTML = StringBuilder.projectSpiller(yield Projeto.read(req.cookies.ra_usuario));
    let numeroDeProjetos = projetos.length;
    let listaArea = StringBuilder.areaSpiller(yield Area.list());
    let listaTipoProjeto = StringBuilder.tipoProjetoSpiller(yield TipoProjeto.list());
    res.render('portifolio', { layout: 'layoutVazio',
        projetos: projetos,
        projetosHTML: projetosHTML,
        numeroDeProjetos: numeroDeProjetos,
        listaArea: listaArea,
        listaTipoProjeto: listaTipoProjeto }); //renderizar a tela
})));
router.post('/curriculo', wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let habs = yield Habilidade.read(req.cookies.ra_usuario);
    res.render('curriculo', { layout: 'layoutVazio',
        habilidades: habs }); //renderizar a tela
})));
router.post('/info', wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('info', { layout: 'layoutVazio' });
})));
router.post('/testeAjax', wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('testeAjax', { layout: 'layoutVazio' }); //renderizar a tela
})));
router.post('/registroProjeto', wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let listaArea = StringBuilder.areaSpiller(yield Area.list());
    let listaTipoProjeto = StringBuilder.tipoProjetoSpiller(yield TipoProjeto.list());
    let listaTipoHabilidade = StringBuilder.tipoHabilidadeSpiller(yield TipoHabilidade.list());
    res.render('registroProjeto', { layout: 'layoutVazio',
        listaArea: listaArea,
        listaTipoProjeto: listaTipoProjeto,
        listaTipoHabilidade: listaTipoHabilidade }); //renderizar a tela
})));
router.post('/loja', wrap((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let storeItems = StringBuilder.storeItemSpiller(yield ItemUsuario.readMissingItems(req.cookies.ra_usuario));
    res.render('loja', {
        layout: 'layoutVazio',
        storeItems: storeItems
    }); //renderizar a tela
})));
module.exports = router;
//# sourceMappingURL=home.js.map